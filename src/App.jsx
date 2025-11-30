import { useState, useEffect } from "react"
import './App.css'

// fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)

const API_URL = 'https://api.frankfurter.dev/v1/'

const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("USD")
  const [amount, setAmount] = useState('1')
  const [convertedAmount, setConvertedAmount] = useState('')

  useEffect(() => {
    async function getCurrencies() {
      const response = await fetch(`${API_URL}latest`)
      const data = await response.json()

      setCurrencies(Object.keys(data.rates))
    }
    getCurrencies()
  },[])

  async function getConverted() {
    const response = await fetch(`${API_URL}latest?base=${fromCurrency}&symbols=${toCurrency}`)
    const data = await response.json()

    setConvertedAmount((data.rates[toCurrency] * amount).toFixed(2))
  }

  return (
    <div className="app">
      <h1 className="app__title">Currency Converter</h1>

      <div className="app__container">
        <p className="error"></p>
        <div className="app__container__group">
          <input
            type="number"
            placeholder="Amount..."
            className="app__container__field"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <select
            className="app__container__dropdown"
            value={fromCurrency}
            onChange={e => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option
                key={currency}
                value={currency}
              >
                {currency}
              </option>
            ))}
          </select>

          <span className="arrow">→</span>

          <select
            className="app__container__dropdown"
            value={toCurrency}
            onChange={e => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option
                key={currency}
                value={currency}
              >
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button className="app__container__button" onClick={getConverted}>Convert</button>
        <p className="loading">Converting...</p>

        <p className="result">{convertedAmount}</p>
      </div>

    </div>
  )
}

export default App
