import { CurrencyDirective, parseCurrency } from 'vue-currency-input'
import createCurrencyFormat from 'vue-currency-input/src/utils/createCurrencyFormat'
import { insertCurrencySymbol } from 'vue-currency-input/src/utils/stringUtils'
import { DEFAULT_OPTIONS } from 'vue-currency-input/src/api'

let options = Object.assign({}, DEFAULT_OPTIONS, {currency: `${process.env.MIX_APP_CURRENCY}`} || 'BRL')

const aplicarFormato = value => {

    let currencyFormat = createCurrencyFormat(options);

    let value_formatted = new Intl.NumberFormat(options.locale, currencyFormat).format(value)

    if(value_formatted == 'NaN') return value
    let value_prefixed = insertCurrencySymbol(value_formatted, currencyFormat, false, false)
    return value_prefixed
}

export default {
    parseCurrency,
    aplicarFormato,
    options,
    bind: (el, binding, vnode) => {
        if(binding.value) {
            options = Object.assign(options, binding.value)
        }

        binding.value = options

        CurrencyDirective.bind(el, binding, vnode)
    },
}
