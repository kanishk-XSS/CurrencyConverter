import React, { useId } from "react";

function Inputbox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const id = useId();

  return (
    <div
      className={`bg-white p-3 rounded-lg text-sm flex items-start gap-3 ${className}`}
    >
      <div className="w-1/2 flex flex-col">
        <label htmlFor={id} className="text-black mb-1">
          {label}
        </label>
        <input
          id={id}
          type="number"
          className="w-full bg-transparent py-1.5 border-b border-gray-300 outline-none"
          placeholder="Amount"
          value={amount}
          disabled={amountDisabled}
          onChange={(e) =>
            onAmountChange && onAmountChange(e.target.value) 
          }
        />
      </div>

      <div className="w-1/2 flex flex-col items-end text-right">
        <label className="text-black/40 mb-1 w-full">Currency Type</label>
        <select
          className="rounded-lg px-2 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Inputbox;