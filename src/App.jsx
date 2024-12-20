import { useState, useEffect } from 'react'
import { TextAreaCodeElement } from 'textarea-code'
import { parser, renderHaml } from './utils/parser'
import './App.sass'

customElements.define('textarea-code', TextAreaCodeElement, { extends: 'textarea' })

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
      console.log('===========================')
      console.log(parsedSass)
      console.log(renderHaml(parsedSass))
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
        Sass を元に Haml のコードを生成します
      </p>
      <div className="forms">
        <div className="forms__form">
          <label className="forms__form__label forms__form__label--sass" htmlFor="form-sass">
            Sass
          </label>
          <textarea
            id="form-sass"
            class="forms__form__textarea forms__form__textarea--sass"
            is="textarea-code"
            tabStyle="spaces"
            placeholder="(例)&#10;.hoge&#10;  &__fuga"
            defaultValue={sass}
            onChange={handleSrcChange}
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
