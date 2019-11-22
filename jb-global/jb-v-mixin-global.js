
export const globalMixin = {
    props:{
        value:{type:[String,Number,Boolean,Array,Object,Date,Function,Symbol]},
    },
    data() {return{
        atualizar_componente:false,
        value_data:this.value,
    }},
    computed: {
        vmodel: {
            get(){
                return this.value || this.value_data
            },
            set(v){
                this.value_data = v
            },
        },
        vuetify_ref(){
            return this.ref || `uid_${this._uid}`
        }
    },
    watch:{
        value(v){
            this.value_data = v
        }
    },
    methods: {
        atualizarComponente(){
            this.atualizar_componente = ! this.atualizar_componente
        },
    },
  }
