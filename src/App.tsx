import React, { useEffect, useState } from 'react';
import './App.css';
import { CurrencyForm } from './component/currency-form';
import axios from 'axios';

interface IExchangeRate {
  result: string,
  rates: {
    "USD": string,
    "AED": string,
    "AFN": string,
    "ALL": string,
    "AMD": string,
    "ANG": string,
    "AOA": string,
    "ARS": string,
    "AUD": string,
    "AWG": string,
    "AZN": string,
    "BAM": string,
    "BBD": string,
    "BDT": string,
    "BGN": string,
    "BHD": string,
    "BIF": string,
    "BMD": string,
    "BND": string,
    "BOB": string,
    "BRL": string,
    "BSD": string,
    "BTN": string,
    "BWP": string,
    "BYN": string,
    "BZD": string,
    "CAD": string,
    "CDF": string,
    "CHF": string,
    "CLP": string,
    "CNY": string,
    "COP": string,
    "CRC": string,
    "CUP": string,
    "CVE": string,
    "CZK": string,
    "DJF": string,
    "DKK": string,
    "DOP": string,
    "DZD": string,
    "EGP": string,
    "ERN": string,
    "ETB": string,
    "EUR": string,
    "FJD": string,
    "FKP": string,
    "FOK": string,
    "GBP": string,
    "GEL": string,
    "GGP": string,
    "GHS": string,
    "GIP": string,
    "GMD": string,
    "GNF": string,
    "GTQ": string,
    "GYD": string,
    "HKD": string,
    "HNL": string,
    "HRK": string,
    "HTG": string,
    "HUF": string,
    "IDR": string,
    "ILS": string,
    "IMP": string,
    "INR": string,
    "IQD": string,
    "IRR": string,
    "ISK": string,
    "JEP": string,
    "JMD": string,
    "JOD": string,
    "JPY": string,
    "KES": string,
    "KGS": string,
    "KHR": string,
    "KID": string,
    "KMF": string,
    "KRW": string,
    "KWD": string,
    "KYD": string,
    "KZT": string,
    "LAK": string,
    "LBP": string,
    "LKR": string,
    "LRD": string,
    "LSL": string,
    "LYD": string,
    "MAD": string,
    "MDL": string,
    "MGA": string,
    "MKD": string,
    "MMK": string,
    "MNT": string,
    "MOP": string,
    "MRU": string,
    "MUR": string,
    "MVR": string,
    "MWK": string,
    "MXN": string,
    "MYR": string,
    "MZN": string,
    "NAD": string,
    "NGN": string,
    "NIO": string,
    "NOK": string,
    "NPR": string,
    "NZD": string,
    "OMR": string,
    "PAB": string,
    "PEN": string,
    "PGK": string,
    "PHP": string,
    "PKR": string,
    "PLN": string,
    "PYG": string,
    "QAR": string,
    "RON": string,
    "RSD": string,
    "RUB": string,
    "RWF": string,
    "SAR": string,
    "SBD": string,
    "SCR": string,
    "SDG": string,
    "SEK": string,
    "SGD": string,
    "SHP": string,
    "SLE": string,
    "SLL": string,
    "SOS": string,
    "SRD": string,
    "SSP": string,
    "STN": string,
    "SYP": string,
    "SZL": string,
    "THB": string,
    "TJS": string,
    "TMT": string,
    "TND": string,
    "TOP": string,
    "TRY": string,
    "TTD": string,
    "TVD": string,
    "TWD": string,
    "TZS": string,
    "UAH": string,
    "UGX": string,
    "UYU": string,
    "UZS": string,
    "VES": string,
    "VND": string,
    "VUV": string,
    "WST": string,
    "XAF": string,
    "XCD": string,
    "XDR": string,
    "XOF": string,
    "XPF": string,
    "YER": string,
    "ZAR": string,
    "ZMW": string,
    "ZWL": string
  }
}

export default function App() {
  const currencies = ['RUB', 'USD', 'EUR', 'GBP', 'CAD']

  async function fetchCurrencyRate(currency: string): Promise<IExchangeRate> {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${currency}`)
    return response.data as IExchangeRate
  }

  const [fromCurrency, setFromCurrency] = useState(currencies[0])
  const [toCurrency, setToCurrency] = useState(currencies[0])
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)
  const [refreshingFrom, setRefreshingFrom] = useState(true)

  function onChange(newFromCurrency: string, newFromAmount: number, newToCurrency: string, newToAmount: number) {
    let refreshFrom = false
    let refreshTo = false

    console.debug(`from: ${newFromCurrency}  to: ${newToCurrency}`)

    if (fromCurrency !== newFromCurrency) {
      setFromCurrency(newFromCurrency)
    }

    if (fromAmount !== newFromAmount) {
      setFromAmount(newFromAmount)

      refreshTo = true
      refreshFrom =  false
    }
    if (toCurrency !== newToCurrency) {
      setToCurrency(newToCurrency)

    }
    if (toAmount !== newToAmount) {
      setToAmount(newToAmount)

      refreshTo = false
      refreshFrom =  true
    }

    console.debug(`from 1: ${refreshFrom} to: ${refreshTo}`)

    if (refreshFrom || refreshTo) {
      setRefreshingFrom(refreshFrom)
    } else {
      refreshFrom = refreshingFrom
      refreshTo = !refreshingFrom
    }

    fetchCurrencyRate(refreshTo ? newFromCurrency : newToCurrency)
      .then(x => {
        if (refreshTo) {
          const rate = (x.rates as any)[newToCurrency]
          const r = newFromAmount * rate
          setToAmount(r)
        }
        else if (refreshFrom) {
          const rate = (x.rates as any)[newFromCurrency]
          const r = newToAmount * rate
          setFromAmount(newToAmount * rate)
        }
      })

  }

  return (
    <div className='container flex'>
      <CurrencyForm 
          currencies={currencies} 
          onCurrencyChange={(cur) => onChange(cur, fromAmount, toCurrency, toAmount)}
          onCurrentAmountChange = {(amount) => onChange(fromCurrency, amount, toCurrency, toAmount)}
          amount = {fromAmount}
      />
      <CurrencyForm currencies={currencies}
          onCurrencyChange={(cur) => onChange(fromCurrency, fromAmount, cur, toAmount)}
          onCurrentAmountChange = {(amount) => onChange(fromCurrency, fromAmount, toCurrency, amount)}
          amount = {toAmount}
      />
    </div>
  )
}
