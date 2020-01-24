import Vue from 'vue'
import Vuelidate from 'vuelidate'
import * as validators from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

const validacaoMixin = {
  data() {
    return {
      regras: [],
      regras_obj: {},
      custom_validators: {
        cpf: v => this.$jb.validar.cpf(v),
        cpf_simples: v => this.$jb.validar.cpf(v, true),
        cnpj: v => this.$jb.validar.cnpj(v),
        cnpj: v => this.$jb.validar.cnpj(v, true),
        cpf_cnpj: v => {
          var numero = v && v.match(/\d+/g) ? v.match(/\d+/g).join('') : 0
          if(numero.length <= 11){
            return this.$jb.validar.cpf(numero, true)
          }
          else {
            return this.$jb.validar.cnpj(numero, true)
          }
          
        },
        igualA: v => this.$jb.validar.igual_a(v, this)
      }
    }
  },
  computed: {
    eObrigatorio() {
      return Object.keys(this.regras_obj).indexOf('required') > -1
    },
    validacao_com_erro() {
      return this.$v.vmodel.$dirty ? this.$v.vmodel.$error : null
    },
    vmodel_erros(){
      if(this.$v.vmodel.$anyError) {
        for (const key in this.regras) {
          const regra = this.regras[key];
          let nome_regra = regra 
          let params = null
          if(typeof regra != 'string'){
            nome_regra = Object.keys(regra)[0]
            params = regra[nome_regra]
          }
          
          if(!this.$v.vmodel[nome_regra]){
            return this.getMessageError(nome_regra, params)
          }
        }
      }

      return []
    }
  },
  methods: {
    resetValidation(){
      this.$v.$reset()
    },
    getMessageError(tipo, ...params) {
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
      }
      return mensagem_erro
    }
  },
  validations() {
    if(typeof this.regras=='string'){
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
      
      if (this.$jb.object.hasKey(key, validators)) {
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
