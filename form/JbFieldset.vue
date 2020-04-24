<template>

        <fieldset
            class="jb-fieldset"
            ref="jb-fieldset"
            v-on="this.$listeners"
            v-bind="this.$attrs"
        >
            <legend class="theme--light v-label">
                <slot name="legend">
                    {{legend_comp}}
                </slot>
            </legend>

            <slot></slot>

            <div class="v-text-field__details">
                <div class="v-messages theme--light " role="alert">
                    <div class="v-messages__wrapper">
                        <div class="v-messages__message">
                            <slot name="messages"> {{messages}} </slot>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>

</template>

<script>

import inputBaseMixin from './mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        legend:String,
    },
    data(){return {
        // value_inicial:this.$copiarObjeto(this.value),
        // value_inicial:this.$jb.copiar(this.value),
        messages:null,
        // Form:null,
        Fieldset:null,
        // resetando:false,
    }},
    computed:{
        legend_comp(){
            return this.regras_validacao && this.legend && this.eObrigatorio ? `${this.legend} *` : this.legend
        },
    },
    created() {
        // console.log();

    },
    mounted(){
        // this.Fieldset = this.$refs[this.vuetify_ref]
        // this.Form = this.buscarForm(this)

        // this.$set(this.Form.inputs, this.Form.inputs.length, this)
    },
    watch:{
        // value(v){
        //     if(this.regras && !this.resetando){
        //         this.verificarValidacao()
        //     }
        //     this.resetando = false
        // },

    },
    methods:{
        // buscarForm(Inicio){
        //     let Comp = Inicio.$parent
        //     if(Comp && Comp.$el){
        //         if(Comp.$el.tagName == 'FORM'){
        //             return Comp;
        //         }
        //         else {
        //             this.buscarForm(Comp)
        //         }
        //     }
        //     else {
        //         return null
        //     }
        // },
        // emitInput(value){
        //     this.$emit('input',value)
        // },
        // reset(){
        //     this.resetando = true
        //     this.emitInput(this.value_inicial)

        // },
        // resetValidation(){
        //     this.aplicarValidacaoResultado(false, null);
        // },
        // verificarValidacao(){

        //     let validacoes = this.vmodelRules
        //     let erro = false
        //     let result = null

        //     for (const key in validacoes) {
        //         const validacao = validacoes[key];

        //         result = validacao(this.value)
        //         if(this.$typeof(result,'string')){
        //             erro = true
        //             break
        //         }
        //     }

        //     this.aplicarValidacaoResultado(erro, result);

        //     return result
        // },
        // aplicarValidacaoResultado(erro, mensagem){
        //     let Fieldset = this.Fieldset

        //     if(erro){
        //         Fieldset.classList.add('error--text')
        //     }
        //     else {
        //         Fieldset.classList.remove('error--text')
        //     }

        //     this.messages = mensagem
        //     this.Form.errorBag[this._uid] = erro
        // }

    }
}
</script>

<style>

.jb-fieldset {
    border: 1px solid #949494;
    padding: 5px 10px;
    width: 100%;
}

.jb-fieldset .theme--light.v-input {
    color: rgba(0, 0, 0, 0.6) !important;
}

/* .jb-fieldset .v-input--selection-controls {
    margin-right: 4px
} */

.jb-fieldset .v-input--selection-controls__input {
    margin-right: 2px
}

.jb-fieldset > legend {
    color: #949494;
    padding: 0 10px 0 10px;
}

.jb-fieldset.error--text {
    border-color: #ff5252
}
.jb-fieldset.error--text .v-messages {
    color: #ff5252
}
.jb-fieldset.error--text > legend,
.jb-fieldset.error--text div.v-input:not(.rules-ignore) * {
    color: #ff5252
}

</style>
