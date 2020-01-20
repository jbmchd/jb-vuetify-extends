// 9 : numeric
// a : alphabetical
// * : alphanumeric

import Inputmask from 'inputmask'

let mascaras_padrao = [
  'cssunit',
  'url',
  'ip',
  'email',
  'mac',
  'vin', // https://github.com/RobinHerbots/Inputmask/blob/4.x/README_date.md
  'datetime', // https://github.com/RobinHerbots/Inputmask/blob/4.x/README_other.md
  'numeric',
  'currency',
  'decimal',
  'integer',
  'percentage' // https://github.com/RobinHerbots/Inputmask/blob/4.x/README_numeric.md
]

//================== ALIASES
let mascaras_extendidas = {
  currency: {
    prefix: 'R$ ',
    groupSeparator: '.',
    radixPoint: ',',
    numericInput: true,
    autoGroup: true,
    rightAlign: true
  },
  percentage: {
    suffix: '%',
    radixPoint: ','
  },
  porcentagem: {
    suffix: '%',
    radixPoint: ',',
    alias: 'numeric',
    digitsOptional: true
  },
  date: {
    mask: '99/99/9999'
  },
  time: {
    mask: '99:99[:99]'
  },
  datetime: {
    mask: '99/99/9999 99:99[:99]',
    inputFormat: 'dd/mm/yyyy HH:MM:ss'
  },
  cep: {
    mask: '99999-999'
  },
  cns: {
    mask: '99.999-9'
  },
  cpf: {
    mask: '999.999.999-99'
  },
  cnpj: {
    mask: '99.999.999/9999-99'
  },
  cpf_cnpj: {
    mask: '(999.999.999-99)|(99.999.999/9999-99)'
  },
  telefone: {
    mask: '(99) 9999[9]-9999'
  },
  'telefone-fixo': {
    mask: '(99) 9999-9999'
  },
  'telefone-movel': {
    mask: '(99) 99999-9999'
  },
  cartaocredito: {
    mask: '9999 9999 9999 9999'
  },
  cvc: {
    mask: '999'
  },
  placaveiculo: {
    mask: 'AAA-9999'
  }
}

Inputmask.extendAliases(mascaras_extendidas)

const aplicarMascara = function(el, binding) {
  let alias = binding.value // mascara ou alias

  if (!alias) {
    return alias
  }
  let input = el.tagName == 'INPUT' ? el : el.getElementsByTagName('input')[0]

  let options = null

  let tem_mascara_padrao = mascaras_padrao.indexOf(alias) > -1

  if (tem_mascara_padrao) {
    options = mascaras_extendidas[alias]
  }

  Inputmask(alias, options).mask(input)
}

export default {
  //aplica a mascara ao input
  bind: function(el, binding) {
    aplicarMascara(el, binding)
  },
  update: function(el, binding) {
    aplicarMascara(el, binding)
  }
}
