  import { useEffect, useState } from "react";

  function UseCurrencyInfo(){
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
        );
        const json = await res.json();
        setData(Object.keys(json)); 
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchCurrencies();
  }, [])
  return data;

}
  
  
  export default UseCurrencyInfo;