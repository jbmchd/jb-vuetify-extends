<template>

        <v-menu
            ref="dtp_menu"
            v-model="menu.exibir"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <jb-text
                    ref="jbtext"

                    v-model="vmodel"

                    :id="id"
                    :placeholder="placeholder"
                    :name="name"
                    :disabled="disabled"

                    :label="label"
                    :hint="hint"
                    :persistent-hint="persistentHint"
                    :append-icon="input.appendIcon"
                    :readonly="readonly"
                    clearable

                    :regras="rules_validacao"
                    :mascara="picker.tipo"

                    v-on="on"

                    @input="textFieldEmitInput"
                ></jb-text>
            </template>

            <jb-datetime-picker
                v-model="picker.value"
                :ref="vuetify_ref"
                :tipo="picker.tipo"
                :reactive="reactive"
                :min="min"
                :max="max"
                :historic="historic"

                @input="datetimepickerEmitInput"
                @click:date="datePickerEmitClickDate"

                @click:minute="timeMinutePickerEmitClick"
            >

            </jb-datetime-picker>

        </v-menu>

</template>

<script>

import moment from 'moment'
import {inputBaseMixin} from '../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        label:String, id:String, type:String, placeholder:String, name:String, disabled:Boolean, readonly:Boolean,

        autofocus:Boolean,
        counter:{type:[Boolean, Number, String]},
        appendIcon:String,
        iconClickAppend:{type:Function, default:v=>(v)},
        hint:String,
        persistentHint:Boolean,

        tipo:{type:String},
        historic:Boolean,
        reactive:Boolean,
        min:String,max:String,
    },

    data () {return{
        menu:{
            exibir: false
        },
        input:{
            appendIcon: this.appendIcon
        },
        picker:{
            value: this.value,
            tipo: null,
        },
    }},

    computed: {
        vuetify_ref(){
            return this.ref || 'jb-text-datetime'
        },
        vmodel:{
            get(){
                let value = moment(this.value)

                if(value.isValid()){
                    if(this.picker.tipo == 'datetime'){
                        return value.format('DD/MM/YYYY HH:mm')
                    }
                    if(this.picker.tipo == 'date')
                    {
                        return value.format('DD/MM/YYYY')
                    }
                    else if(this.picker.tipo == 'time') {
                        return this.value
                    }
                }

                return null
            },
            set(v){
                this.value_data = v
            },
        },
        rules_validacao()
        {
            let rules = [this.tipo]
            if(this.regras){
                rules.push(this.regras)
            }

            return rules
        },
    },
    created(){
        this.setarIconeInput()
        this.definirTipo()
    },
    methods: {
        fechar(){
            this.menu.exibir = false
        },
        definirTipo(tipo){
            if(tipo){
                this.picker.tipo = tipo
            }
            else if(this.tipo){
                this.picker.tipo = this.tipo
            }
            else {
                let v = this.value

                if(this.$regex('date_us',v)){
                    this.picker.tipo = 'date'
                }
                else if (this.$regex('datetime_us',v)){
                    this.picker.tipo = 'datetime'
                }
                else if(this.$regex('time',v)){
                    this.picker.tipo = 'time'
                }
                else {
                    console.error('tipo de data/time invalido')
                    this.picker.tipo = null

                }
            }
        },
        datePickerEmitClickDate(v){
            if(this.picker.tipo=='date'){
                this.fechar()
            }
            this.$emit('click:date', v)
        },
        datetimepickerEmitInput(v){
            this.$emit('input', v)
        },
        timeMinutePickerEmitClick(v){
            this.fechar()
        },
        textFieldEmitInput(v){
            if(this.$regex('date_us',v) || this.$regex('datetime_us',v)){
                this.$emit('input', v)
            }
            this.fechar()
        },
        setarIconeInput(){
            let icone = null

            if(this.appendIcon){ icone = this.appendIcon }
            else if(this.tipo=='time'){ icone = 'access_time' }
            else { icone = 'event' }

            this.input.appendIcon = icone
        },
    }
}
</script>

