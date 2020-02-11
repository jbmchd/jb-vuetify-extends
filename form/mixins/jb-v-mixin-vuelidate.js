import Vue from 'vue'
import Vuelidate from 'vuelidate'
import * as validators from 'vuelidate/lib/validators'
import moment from 'moment'

Vue.use(Vuelidate)

const validacaoMixin = {
  data () {
    return {
      custom_validators: {
        cpf: v => this.$jb.validar(v).cpf(),
        cpf_simples: v => this.$jb.validar(v).cpf(true),
        cnpj: v => this.$jb.validar(v).cnpj(),
        cnpj_simples: v => this.$jb.validar(v).cnpj(true),
        cpf_cnpj: v => {
          var numero = v && v.match(/\d+/g) ? v.match(/\d+/g).join('') : 0
          if (numero.length <= 11) {
            return this.$jb.validar(numero).cpf(true)
          }
          else {
            return this.$jb.validar(numero).cnpj(true)
          }

        },
        igualA: v => this.$jb.validar(v).igual_a(this),
        date: () => {
            let date = this.value_data
            return moment(date, moment.ISO_8601).isValid()
        },
        datetime: () => {
            let date = this.value_data
            return moment(date, moment.ISO_8601).isValid()
        },

      },
    }
  },
  computed: {
    vmodel_erros_vuelidate () {
      if (this.$v.vmodel.$anyError) {
        for (const key in this.regras) {
          const regra = this.regras[key];
          let nome_regra = regra
          let params = null
          if (typeof regra != 'string') {
            nome_regra = Object.keys(regra)[0]
            params = regra[nome_regra]
          }

          if (!this.$v.vmodel[nome_regra]) {
            return this.getMessageError(nome_regra, params)
          }
        }
      }
      return null
    }
  },
  methods: {
    resetVuelidateValidation () {
      this.$v.$reset()
    },
    getMessageError (tipo, ...params) {
      let mensagem_erro = ''
      switch (tipo) {
        case 'required':
          mensagem_erro = `Obrigatório`
          break
        case 'email':
          mensagem_erro = `Digite um email válido`
          break
        case 'minLength':
          mensagem_erro = `Digite pelo menos ${params} caracteres`
          break
        case 'maxLength':
          mensagem_erro = `Não digite mais que ${params} caracteres`
          break
        case 'cpf':
        case 'cpf_simples':
          mensagem_erro = `Digite um CPF válido`
          break
        case 'cnpj':
        case 'cnpj_simples':
          mensagem_erro = `Digite um CNPJ válido`
          break
        case 'cpf_cnpj':
        case 'cpf_cnpj_simples':
          mensagem_erro = `Digite um CPF/CNPJ válido`
          break
        case 'igualA':
          params = params.join(',').toUpperCase()
          mensagem_erro = `O valor precisa ser o mesmo do campo ${params}`
          break
        case 'date':
          mensagem_erro = `Digite uma data válida`
          break
        case 'datetime':
          mensagem_erro = `Digite uma data/hora válida`
          break
      }
      return mensagem_erro
    }
  },
  validations () {
    if (typeof this.regras == 'string') {
      this.regras = this.regras.split('|')
    }

    if (!this.regras.length || typeof this.regras != 'object') {
      return { vmodel: {} }
    }

    Object.assign(validators, this.custom_validators)

    let regra_temp = {}

    this.regras.forEach(regra => {

      if (typeof regra == 'string') {
        regra = { [regra]: null }
      }

      let key = Object.keys(regra)[0]

      if (this.$jb.object(validators).hasKey(key)) {
        let validator = regra[key]
          ? validators[key](regra[key])
          : validators[key]

        if (typeof validator != 'function') {
          validator = () => validators[key](regra[key])
        }

        regra_temp = { [key]: validator }

        this.regras_obj = Object.assign({}, this.regras_obj, regra_temp)
      }
    })

    return { vmodel: this.regras_obj }
  }
}

export default validacaoMixin
