import { useState } from "react"
import { CurrencyButton } from "./currency-button"

export interface ICurrenciesBlockProps {
    currencies: string[],
    onCurrencyChange?: (currency: string) => void
}

export function CurrenciesBlock({currencies, onCurrencyChange}: ICurrenciesBlockProps) {
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

    function onSelectionChanged(currency: string) {
        console.debug(currency)
        setSelectedCurrency(currency)

        if (!!onCurrencyChange) {
            onCurrencyChange(currency)
        }
    }

    return (
        <span>
        {
            currencies.map((cur, i) => {
              let className = 'currency-button';
              if (i === 0) {
                className = 'currency-button-left'
              } else if (i === currencies.length - 1) {
                className = 'currency-button-right'
              }
              if (cur === selectedCurrency) {
                className = className + ' selected-button'
              }
              return <CurrencyButton currency={cur} className={className} onSelected={onSelectionChanged} key={`${cur}_${i}`}/>
            })
        }
      </span>
    )
}