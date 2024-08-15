import React, { useEffect, useState } from 'react';
import { HiArrowsRightLeft } from "react-icons/hi2";
import CurrencyDropdown from './dropdown';

const CurrencySwapper = () => {

    const[currencies, setCurrencies] = useState([]); 
    const [amount, setAmount] = useState(1);  

    const [fromCurrency, setFromCurrency] = useState("USD"); 
    const [toCurrency, setToCurrency] = useState("INR"); 

    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting, setConverting] = useState(false)

    //currencies -> https://www.frankfurter.app/currencies 
    const fetchCurrencies = async() =>{ 
        try{ 
            const res = await fetch("https://www.frankfurter.app/currencies"); 
            const data = await res.json(); 
            setCurrencies(Object.keys(data)); 
        }catch(error){ 
            console.error("Error Fetching", error)

        }
    }; 

    useEffect(() =>{ 
        fetchCurrencies(); 
    }, [])

    console.log(currencies); 

    //currencies conversion -> https://www.frankfurter.app/latest?amount=1&from=USD&to=INR
    const currencyConvert = async() =>{
        if(!amount) return; 
        setConverting(true);
        try{ 
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`); 
            const data = await res.json(); 
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency); 
        }catch(error){ 
            console.error("Error Fetching", error)

        }finally{ 
            setConverting(false); 
        }
    } 

    const swapCurrencies = () =>{ 
        setFromCurrency(toCurrency); 
        setToCurrency(fromCurrency)
    }


   
  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>
            Currency Converter 
        </h2>

        <div 
        className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
            <CurrencyDropdown
            currencies = {currencies}
            title = "From: "
            currency={fromCurrency}
            setCurrency={setFromCurrency}/> 

            {/*swap currency button*/} 

            <div
            className='flex justify-center -mb-5 sm:mb-0'> 
                <button 
                onClick={swapCurrencies}>
                    <HiArrowsRightLeft /> 
                </button>
            </div>
            <CurrencyDropdown 
            currencies = {currencies} 
            title = "To: "
            currency={toCurrency}
            setCurrency={setToCurrency}
            />
        </div>

        <div>
            <label
              htmlFor = "amount"
              className='block text-sm font-medium text-gray-700'
              >
                Amount: 
              </label>
            <input 
            value = {amount}
            onChange = {(e) => setAmount(e.target.value)}
            type = "number"
            className='' /> 

            <div className='flex justify-end mt-6'>
                <button 
                onClick = {currencyConvert}
                className={`px-5 py-2 bg-indigo-600
                text-white rounded-md however:bg-indigo-700 
                focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:ring-offset-2
                ${converting?"animate-pulse": ""}` }>
                    Convert
                </button>
            </div>
            {convertedAmount && (<div className='mt-4 text-lg font-medium text-right text-green-600'> 
                Swap Amount: {convertedAmount}
            </div>)} 
        </div>
    </div>
  ); 
}

export default CurrencySwapper; 