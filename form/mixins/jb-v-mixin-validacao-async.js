
const validacaoMixin = {
    data () {
        return {
            vmodel_erros_vuex: null,
            payload: {},
        }
    },
    computed: {
        getVuexDados(){
            for (const key in this.regras) {
                const regra = this.regras[key];
                if (typeof regra == 'object' && regra.hasOwnProperty('vuex')) {
                    return regra.vuex
                }
            }
        }
    },
    methods: {
        async vuex () {
            let payload = this.getVuexDados
            let response = await this.$store.dispatch(payload.action, payload.payload)

            if (response === true) {
                this.vmodel_erros_vuex = null
                return true
            }
            else {
                let msg = typeof response == 'string' ? response : response.toString()
                this.vmodel_erros_vuex = msg
                return false
            }
        },
    },
}

export default validacaoMixin
