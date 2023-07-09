import { useState } from "react";
import { CurrenciesBlock } from "./currencies-block";

export interface ICurrencyFormProps {
    currencies: string[],
    onCurrentAmountChange?: (amount: number) => void,
    onCurrencyChange?: (currency: string) => void,
    amount: number
}

export function CurrencyForm({currencies, onCurrencyChange, onCurrentAmountChange, amount}: ICurrencyFormProps) {
    // const [currentAmount, setCurrentAmount] = useState(amount)

    function onCurrentAmountChanged (newValue:any) {
        // setCurrentAmount(newValue)
        if (!!onCurrentAmountChange) {
            onCurrentAmountChange(newValue)
        }
    }

    function onCurrencyChangeHandler(newValue: string) {
        if (!!onCurrencyChange) {
            onCurrencyChange(newValue)
        }
    }

    return (
        <div className="w-1/2 flex-col mx-4">
            <CurrenciesBlock currencies={currencies} onCurrencyChange={onCurrencyChangeHandler}/>
            <input className='border border-gray-300 rounded-xl w-full text-6xl py-4 my-4' 
                   value={amount} onChange={(evt) => {
                    const trimmedValue = evt.target.value.trim().replaceAll(/^0{2,}/gm, '')
                    const changedValue = (trimmedValue === '') ? 0 : trimmedValue

                    // console.debug(changedValue)

                    onCurrentAmountChanged(changedValue === '.' ? '0' + changedValue : changedValue)
                }
            }/>
        </div>
    )
}