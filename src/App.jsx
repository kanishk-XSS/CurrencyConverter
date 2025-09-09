import { useState, useEffect } from 'react'
import './App.css'
import Inputbox from './Components/inputbox'

function App() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('')
  const [data, setData] = useState()

  useEffect(() => {
    fetch(`https://api.exchangerate.host/list?access_key=8bf0633db99abfd8ffd0132b9e0e8a91`)
      .then((res) => res.json())
      .then((res) => setData(res.currencies))
      .catch((err) => console.error("API error:", err));
  }, [])

  console.log(data)

  if (!data) {
    return <p className="text-center mt-10">Loading currencies...</p>;
  }

  const options = Object.keys(data)
  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }
  
  const convert = () => {
   
    if (!amount || amount === '0') return;
    
    fetch(
      `https://api.exchangerate.host/convert?access_key=8bf0633db99abfd8ffd0132b9e0e8a91&from=${from}&to=${to}&amount=${amount}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setConvertedAmount(res.result.toString());
        } else {
          console.error("Conversion failed:", res.error);
        }
      })
      .catch((err) => console.error("Conversion error:", err));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    convert()
  }

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-gray/40'>
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-100 rounded-lg p-8 bg-black/30'>
          <form onSubmit={handleSubmit}>
            <div className='w-full mb-1'>
              <Inputbox 
                label='from' 
                amount={amount} 
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)} 
                selectedCurrency={from}
              />
            </div>

            <div className='relative w-full h-1'>
              <button 
                type="button" 
                className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5' 
                onClick={swap}
              >
                Swap
              </button> 
            </div>

            <div className='w-full mt-1'>
              <Inputbox 
                label='to' 
                amount={convertedAmount} 
                currencyOptions={options} 
                onCurrencyChange={(currency) => setTo(currency)}
                onAmountChange={(amount) => setConvertedAmount(amount)}
                selectedCurrency={to} 
                amountDisabled
              />
            </div>
            <button 
              type='submit' 
              className='w-full bg-blue-600 text-white mt-3 py-3 rounded-lg'
            >
              Convert {from} to {to} 
            </button>
          </form>
        </div>
      </div> 
    </div>
  )
}

export default App