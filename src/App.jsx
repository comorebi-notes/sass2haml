import { useState } from 'react'
import './App.sass'

const App = () => {
  return (
    <main className="main">
      <h1 className="title">
        sass2haml
      </h1>
      <p className="description">
        sass を元に haml のコードを生成します
      </p>
      <div className="forms">
        <div className="forms__form">
          <label className="forms__form__label forms__form__label--sass" htmlFor="form-sass">
            sass
          </label>
          <textarea className="forms__form__textarea forms__form__textarea--sass" id="form-sass" placeholder=".hoge&#10;  &__fuga" />
        </div>
        <div className="forms__form">
          <label className="forms__form__label forms__form__label--haml" htmlFor="form-haml">
            haml
          </label>
          <textarea className="forms__form__textarea forms__form__textarea--haml" id="form-haml" placeholder=".hoge&#10;  .hoge__fuga"/>
        </div>
      </div>
    </main>
  )
}

export default App
