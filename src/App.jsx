import './App.css'

const App = () => {
  return (
    <div className="app">
      <h1 className="app__title">Currency Converter</h1>

      <div className="app__container">
        <p className="error"></p>
        <div className="app__container__group">
          <input type="number" placeholder="Amount..." className="app__container__field" />
          <select className="app__container__dropdown">
            <option></option>
          </select>
          <span className="arrow">→</span>
          <select className="app__container__dropdown">
            <option></option>
          </select>
        </div>

        <button className="app__container__button">Convert</button>
        <p className="loading">Converting...</p>

        <p className="result"></p>
      </div>

    </div>
  )
}

export default App
