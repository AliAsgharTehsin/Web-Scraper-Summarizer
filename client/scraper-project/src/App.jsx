import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [crypto, setCrypto] = useState([])
  const [choice, setChoice] = useState("")

  useEffect(() => {
    const fetchCrypto = async () => {
      const res = await axios.get("http://localhost:5000/api/crypto")
      setCrypto(res.data)
    }
    fetchCrypto()
  }, [])

  const selectedCrypto = crypto.find((c) => c.name === choice);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Crypto Explorer</h1>

      <select
        name="cryptoOptions"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option value="" disabled>Select a cryptocurrency</option>
        {crypto.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md text-center">
        {choice === "" ? (
          <p className="text-gray-500">Nothing to display</p>
        ) : (
          <p className="text-gray-800">{selectedCrypto?.summary || "No summary available."}</p>
        )}
      </div>
    </div>
  )
}

export default App

