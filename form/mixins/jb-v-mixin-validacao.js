import validacaoVuelidate from '../mixins/jb-v-mixin-vuelidate'
import validacaoAsync from '../mixins/jb-v-mixin-validacao-async'

const validacaoMixin = {
    mixins: [validacaoVuelidate, validacaoAsync],
    data () {
        return {
            regras: [],
            regras_obj: {},
        }
    },
    computed: {
        eObrigatorio () {
            return Object.keys(this.regras_obj).indexOf('required') > -1
        },
        validacao_com_erro () {
            return this.$v.vmodel.$dirty ? this.$v.vmodel.$error : null
        },
        vmodel_erros () {
            let mensagem = ''
            if (this.vmodel_erros_vuelidate && this.vmodel_erros_vuelidate.length) {
                mensagem = this.vmodel_erros_vuelidate
            }
            else {
                mensagem = this.vmodel_erros_vuex
            }

            return mensagem

        },
    },
    mounted () {
        let vuex_dados = this.getVuexDados
        if(vuex_dados){
            this.validarPeloVuex()
            this.$watch(() => this.vmodel, () => {
                this.validarPeloVuex()
            })
        }
    },
    methods: {
        resetValidation () {
            this.resetVuelidateValidation()
        },
        async validarPeloVuex(){
            if (this.vmodel_erros_vuelidate) {
                this.vmodel_erros_vuex = null
                return
            }
            this.isLoading = true
            await this.vuex()
            this.isLoading = false
        }
    },

}

export default validacaoMixin
