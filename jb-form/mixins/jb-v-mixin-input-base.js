
import {globalMixin}    from '../../jb-global/jb-v-mixin-global'
import {validacaoMixin} from '../mixins/jb-v-mixin-validacao'

export const inputBaseMixin = {
    mixins:[globalMixin, validacaoMixin],
    props:{
        validarNaCriacao:Boolean,
        mascara:String,
        regras:{type:[String,Array,Object]},
    },
    data() {return{
        error_messages:null,
        validar:false,
        vmodelRules:[],
    }},
    computed: {
        regras_validacao(){
            return this.regras || this.rules
        },
        eObrigatorio(){
            return this.$typeof(this.regras_validacao,'object') ? {}.hasOwnProperty.call(this.regras_validacao,'required') : this.regras_validacao.indexOf('required') > -1
        },
        label_comp(){
            return this.regras_validacao && this.label && this.eObrigatorio ? `${this.label} *` : this.label
        },
        vmodelMask(){
            return this.mascara
        },
    },
    created(){
        Object.assign(this, this.$attrs)

        this.validar = this.validarNaCriacao
        this.rules = []
    },
    watch:{
        validar(v){
            if(v){
                this.vmodelRules = this.executarValidacao(this.regras_validacao)
            }
        },
        value(v){
            if(this.validar){
                this.vmodelRules = this.executarValidacao(this.regras_validacao)
            }
        },
        atualizar_componente(v){
            if(this.validar){
                this.vmodelRules = this.executarValidacao(this.regras_validacao)
            }
        }
    },
  }
