import { useState, useEffect } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { parser, renderHaml } from './utils/parser'
import './App.sass'

const App = () => {
  const [sass, setSass] = useState('')
  const [parsedHaml, setParsedHaml] = useState('')

  const handleSrcChange = (e) => setSass(e.target.value)

  useEffect(() => {
    const savedSrc = localStorage.getItem('sass')
    if (savedSrc) {
      setSass(savedSrc)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sass', sass)
  }, [sass])

  useEffect(() => {
    try {
      const parsedSass = parser(sass)
      setParsedHaml(renderHaml(parsedSass))
    } catch (e) {
      setParsedHaml(e.message)
    }
  }, [sass])

  return (
    <main className="main">
      <h1 className="title">
        sass2haml
      </h1>
      <p className="description">
        Sass のクラス名を Haml 用に変換します
      </p>
      <div className="forms">
        <div className="forms__form">
          <label className="forms__form__label forms__form__label--sass" htmlFor="form-sass">
            Sass
          </label>
          <CodeEditor
            id="form-sass"
            className="forms__form__textarea forms__form__textarea--sass"
            language="scss"
            placeholder="(例)&#10;.hoge&#10;  &__fuga"
            value={sass}
            onChange={handleSrcChange}
            padding={0}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return false
            }}
          />
        </div>
        <div className="forms__form">
          <label className="forms__form__label forms__form__label--haml" htmlFor="form-haml">
            Haml
          </label>
          <textarea
            id="form-haml"
            className="forms__form__textarea forms__form__textarea--haml"
            placeholder="(例)&#10;.hoge&#10;  .hoge__fuga"
            readOnly
            value={parsedHaml}
          />
        </div>
      </div>
    </main>
  )
}

export default App
