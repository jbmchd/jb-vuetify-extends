<template>

    <v-text-field
        :ref="vuetify_ref"
        v-model="vmodel_comp"
        v-on="inputListeners"
        v-bind="this.$attrs"

        :label="label_comp"
        :error-messages="error_messages"
        :rules="vmodelRules"

        v-mask="vmodelMask"
    >

    </v-text-field>

</template>

<script>

import {inputBaseMixin} from '../mixins/jb-v-mixin-input-base'
import mask from '../jb-v-diretiva-mask'

export default {
    mixins: [inputBaseMixin],
    computed:{
        inputListeners: function () {
            /** pego da documentacao do oficial do VueJs */
            /**
             * `Object.assign` mescla objetos para formar um novo objeto
             *      -> Nós adicionamos todas as escutas do pai
             *      -> Então podemos adicionar escutas personalizadas ou substituir comportamento de algumas escutas.
             *          -> Isso garante que o componente funcione com o v-model
             */
            var vm = this
            return Object.assign({}, this.$listeners, { input: value => {

                if(value){
                    //configurar como os valores colocados pelo usuario devem ser guardados na variavel
                    if((this.mascara == 'dinheiro' || this.mascara == 'currency') &&  this.$regex('currency',value)){
                        value = this.pegarDinheiro(value)
                    }
                    if((this.mascara == 'percentage' || this.mascara == 'porcentagem') &&  this.$regex('currency',value)){
                        value = this.pegarPorcentagem(value)
                    }
                    else if((this.mascara=='date' || this.mascara=='datetime') && (this.$regex('date_ptbr',value) || this.$regex('datetime_ptbr',value)) ){
                        value = this.pegarDatahora(value)
                    }
                }

                vm.$emit('input', value)
            }})
        },
        vmodel_comp: {
            get(){
                return this.vmodel
            },
            set(value){
                /**
                    configurar como os valores devem ser exibidos para usuario
                    o value deve ser sempre no formato bruto (como no banco de dados)
                 */
                if(value){
                    if(this.mascara=='date' || this.mascara=='datetime' || this.mascara=='data' || this.mascara=='datahora' ){
                        value = value.split(' ')
                        value[0] = value[0].split('-').reverse().join('/')
                        value = value.join(' ')
                    }
                    else if(this.mascara == 'dinheiro' || this.mascara == 'currency'){
                        let inteiro = parseInt(value)
                        let restante = parseFloat((value - inteiro).toFixed(2))

                        value = restante ? (inteiro+restante).toFixed(2) : value*100
                    }
                    else if(this.mascara == 'percentage' || this.mascara == 'porcentagem'){
                        value = value.toString().split('.').join(',')
                    }
                }
                this.vmodel = value
            }
        },
    },
    methods: {
        pegarDinheiro(value){
            value = value.match( this.$regex('currency') ).join([]).split('.').join('').split(',').join('.')
            value = parseFloat(value).toFixed(2)
            return value
        },
        pegarPorcentagem(value){
            value = value.match( this.$regex('currency') ).join([]).split(',').join('.')
            value = parseFloat(value).toFixed(2)
            return value
        },
        pegarDatahora(value){
            value = value.split(' ')
            value[0] = value[0].split('/').reverse().join('-')
            value = value.join(' ')
            return value
        },
    },


}
</script>
