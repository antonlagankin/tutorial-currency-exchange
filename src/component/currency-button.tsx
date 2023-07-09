import { useState } from "react"

export interface ICurrencyButtonProps {
    className?: string,
    children?: React.ReactNode,
    currency: string,
    onSelected?: (currency: string) => void
}

export function CurrencyButton({currency, className, children, onSelected}: ICurrencyButtonProps) {

    const [isSelected, setIsSelected] = useState(false)
    const [currentCurrency, setCurrencCurrency] = useState(currency)

    function onSelectedHandler() {
        setIsSelected(true)
        if (!!onSelected) {
            onSelected(currentCurrency)
        }
    }

    return (
        <button className={className} onClick={() => onSelectedHandler()}>
            {currency}
            {children}
        </button>
    )
}