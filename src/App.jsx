import {useState, useEffect} from "react"
import './App.css'

// fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)

const API_URL = 'https://api.frankfurter.dev/v1/'

const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("USD")
  const [amount, setAmount] = useState('1')
  const [convertedAmount, setConvertedAmount] = useState('1')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getCurrencies() {
      try {
        const response = await fetch(`${API_URL}latest`)
        const data = await response.json()

        setCurrencies(Object.keys(data.rates))
      } catch {
        setError('Failed to fetch currency data')
      }
    }

    getCurrencies()
  }, )

  async function getConverted() {
    if(!amount || amount <= 0 ){
      setError("Amount cannot be less than zero.")
      return
    }

    setError(null)
    setLoading(true)

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount)
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}latest?base=${fromCurrency}&symbols=${toCurrency}`)
      const data = await response.json()

      setConvertedAmount((data.rates[toCurrency] * amount).toFixed(2))
    } catch {
      setError('Failed to convert')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1 className="app__title">Currency Converter</h1>

      <div className="app__container">
        {error && <p className="error">{error}</p>}
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
        {loading && <p className="loading">Converting...</p>}

        {convertedAmount !== null && !loading &&
          <p className="result">{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
        }
      </div>

    </div>
  )
}

export default App
