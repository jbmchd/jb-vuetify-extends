
const validacaoMixin = {
    data () {
        return {
            vmodel_erros_servidor: null,
            dados: {},
        }
    },
    computed: {
        getServidorDados(){
            for (const key in this.regras) {
                const regra = this.regras[key];
                if (typeof regra == 'object' && regra.hasOwnProperty('servidor')) {
                    return regra.servidor
                }
            }
        }
    },
    methods: {
        async servidor () {
            let dados = this.getServidorDados

            let response = await this.$store.dispatch(dados.nome, dados.params)

            if (response.dados === true) {
                this.vmodel_erros_servidor = null
                return true
            }
            else {
                this.vmodel_erros_servidor = response.dados
                return false
            }
        },
    },
}

export default validacaoMixin
