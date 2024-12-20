class Node {
  constructor(type, value) {
    this.type = type
    this.value = value
    this.children = []
  }
}

export const parser = (sass) => {
  const lines = sass.split('\n')
  const root = new Node('root', null)
  const stack = [root]

  lines.forEach((line) => {
    const indentLevel = line.match(/^\s*/)[0].length
    const content = line.trim()
    if (content === '') return

    const node = new Node(nodeType(line), content)
    if (node.type === 'property') return

    while (stack.length > 1 && stack[stack.length - 1].indentLevel >= indentLevel) {
      stack.pop()
    }

    node.indentLevel = indentLevel
    stack[stack.length - 1].children.push(node)
    stack.push(node)
  })

  return root
}

const nodeType = (line) => /(:|^\+|^\$|^@|^from$|^to$|^\/\/)/.test(line.trim()) ? 'property' : 'rule'

const indentLength = 2

export const renderHaml = (parsedSass) => {
  const haml = parsedSass.children.map((child) => (
    renderNode(child, '', 0)
  ))
  return haml.filter((haml) => haml).join('\n')
}

const renderNode = (node, parentClassName, level) => {
  let haml = []
  if (node.type === 'rule') {
    const className = node.value.replace(/&/, parentClassName)
    const indent = ' '.repeat(level * indentLength)
    haml.push(`${indent}${className}`)
    node.children.forEach((child) => {
      haml.push(renderNode(child, className, level + 1))
    })
  }
  return haml.length === 0 ? null : haml.join('\n')
}
