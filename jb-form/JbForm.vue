<template>
    <div>
        <slot name="mensagens">
            <jb-alert v-model="messages" :color="mensagensTipo || 'red'" :tooltip="mensagensDetalhes" dense dark />
        </slot>

        <v-form
            :ref="vuetify_ref"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :method="method"
            :action="action"
            @submit="submit"
            @input="v => this.$emit('input', v)"

            class="pa-2"
            enctype="multipart/form-data"
        >
            <input v-if="csrf" type="hidden" name="_token" :value="csrf" />

            <slot></slot>

            <slot name="botoes">
                <v-row justify="center">
                    <v-btn v-if="podeLimpar" small class="mr-1" @click="resetForm" >{{btnLimparText}}</v-btn>
                    <v-btn v-if="podeEnviar" small type="submit" color="primary" :disabled="validar && !vmodel" class="mr-1" >{{btnEnviarText}}</v-btn>
                </v-row>
            </slot>
        </v-form>

    </div>
</template>

<script>

import {globalMixin}    from '../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
    props: {
        value:Boolean,
        /** ======= FORMULARIO */
        validar:Boolean,
        validarCampos:{type:Boolean, default:true},
        resetValidation:Boolean,
        cancelarActionSubmit:{type:Boolean},
        method:String,action:String,csrf:String,

        /** ======= BOTOES */
        podeLimpar:{type:Boolean, default:true},
        podeEnviar:{type:Boolean, default:true},
        btnEnviarText:{type:String, default:'Enviar'},
        btnLimparText:{type:String, default:'Limpar'},

        /** ======= MENSAGENS */
        mensagens:{type:[Array, String], default:() => ([])},
        mensagensTipo:{type:String},
        mensagensDetalhes:String,
    },
    computed: {
        messages: {
            get(){
                return this.formataMensagensDeAlerta()
            },
            set(aberto){
                if(!aberto){
                    this.mensagens = {}
                }

            },
        },
        vuetify_ref(){
            return this.ref || 'v-form'
        }
    },
    created(){
        Object.assign(this, this.$attrs)
    },
    mounted(){
        if(this.validarCampos)
        {
            this.ativarValidacaoCampos()
        }
    },
    methods: {
        resetForm(){
            this.$refs[this.vuetify_ref].reset();
        },
        resetarValidacao(){
            this.$refs[this.vuetify_ref].resetValidation();
        },
        submit(e) {

            if(Object.keys(this._events).indexOf('submit') > -1){
                // this.$emit('submit', e, this.$refs[this.vuetify_ref].validate());
                e.preventDefault();
            }
            else {
                let form = this.$refs[this.vuetify_ref];
                let tem_action = !!this.action

                if( ! tem_action || this.cancelarActionSubmit || (this.validar && !this.$refs[this.vuetify_ref].validate())){
                    e.preventDefault();
                }
            }

        },
        formataMensagensDeAlerta(){
            let mensagens = this.mensagens

            let retorno = null

            if(typeof mensagens=='string' && /[a-z0-9]/i.test(mensagens)){

                if(this.$isJson(mensagens)){
                    retorno = JSON.parse(mensagens)
                }
                else if(typeof mensagens=='object' && Object.keys(mensagens).length){
                    retorno = mensagens
                }
                else if(typeof mensagens=='string' && /[a-z0-9]/i.test(mensagens)){
                    retorno = {0: mensagens}
                }
                else {
                    return ;
                }

                return retorno;
            }
        },
        ativarValidacaoCampos(){
            let inputs = this.$refs[this.vuetify_ref].inputs
            for (const i in inputs) {
                const input = inputs[i];
                input.$parent.validar = true
            }

            this.$refs[this.vuetify_ref].resetValidation();

        },
    },
}
 </script>
