import { useState } from 'react'
import './App.css'
import Inputbox from './Components/inputbox'
import UseCurrencyInfo from './Hooks/UseCurrencyInfo';

function App() {
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('')

  const options = UseCurrencyInfo()

  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }
  
  const convert = async() => {
  if (!amount || amount === '0') return;
  let res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
  const data = await res.json()
  setConvertedAmount((data[from][to]*amount).toFixed(2))
};

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