<template>
    <v-card>
        <!-- ===========================
                    Tabs
                =========================== -->
        <v-toolbar v-if="picker_tipo=='datetime'" background-color="primary" tabs >
            <template>
                <v-tabs v-model="tabs.index" color="primary" grow >
                    <v-tab> <v-icon>event</v-icon> </v-tab>
                    <v-tab> <v-icon>access_time</v-icon> </v-tab>

                    <v-tabs-slider color="primary"></v-tabs-slider>
                </v-tabs>
            </template>
        </v-toolbar>

        <!-- ===========================
                    Datepicker (trabalha apenas com datas yyyy-mm-dd)
                =========================== -->
        <v-tabs-items v-model="tabs.index">
            <v-tab-item v-if="picker_tipo=='datetime' || picker_tipo=='date'" >
                <v-date-picker
                    :ref="vuetify_date_ref"
                    v-model="date_picker"

                    @input="datePickerEmitInput"
                    @click:date="datePickerEmitClickDate"
                ></v-date-picker>
            </v-tab-item>
            <v-tab-item v-if="picker_tipo=='datetime' || picker_tipo=='time'" >
                <v-time-picker
                    :ref="vuetify_time_ref"
                    v-model="time_picker"

                    format="24hr"

                    @input="timePickerEmitInput"
                    @click:minute="timeMinutePickerEmitClick"
                ></v-time-picker>
            </v-tab-item>
        </v-tabs-items>


        <!-- ===========================
                    Rodape
                =========================== -->
        <v-col cols="12" v-if="picker_tipo=='date'" class="py-1 text-center">
            <v-btn @click="setarDataHoje" color="primary">Hoje</v-btn>
        </v-col>

        <v-col cols="12" v-if="picker_tipo=='time'" class="py-1 text-center">
            <v-btn @click="setarHoraAgora" color="primary">Agora</v-btn>
        </v-col>

        <v-row v-if="picker_tipo=='datetime'" no-gutters >
            <v-col cols="12" class="py-2 text-center">
                <strong>{{ data_ptbr }}</strong>
            </v-col>

            <v-col cols="12" class="pb-1 text-center">
                <v-btn @click="setarDataHoraAgora" color="primary">Agora</v-btn>
            </v-col>
        </v-row>

    </v-card>
</template>

<script>

import moment from 'moment'
import {globalMixin} from '../jb-global/jb-v-mixin-global'

export default {
    mixins: [globalMixin],
    props:{
        tipo:String,
        historic:Boolean,

        reactive:Boolean,
        min:String,max:String,
    },

    data () {return{
        tabs: {
            index: 0
        },
        date_picker: null,
        time_picker: null,
        picker_tipo: null,
    }},

    computed: {
        vuetify_date_ref(){
            return this.ref || 'v-date-picker'
        },
        vuetify_time_ref(){
            return this.ref || 'v-time-picker'
        },
    },
    created(){
        this.definirTipo()
        this.separarDateTime()
        this.ativarHistorica()
    },
    methods: {
        definirTipo(tipo){
            if(tipo){
                this.picker_tipo = tipo
            }
            else if(this.tipo){
                this.picker_tipo = this.tipo
            }
            else {
                let v = this.value

                if(this.$regex('date_us',v)){
                    this.picker_tipo = 'date'
                }
                else if (this.$regex('datetime_us',v)){
                    this.picker_tipo = 'datetime'
                }
                else if(this.$regex('time',v)){
                    this.picker_tipo = 'time'
                }
                else {
                    console.error('tipo de data/time invalido')
                    this.picker_tipo = null

                }
            }
        },
        ativarHistorica(){
            if(this.picker_tipo!='time' && this.historic){
                !this.selecionou && setTimeout(() => (this.$refs[this.vuetify_date_ref].activePicker = 'YEAR'))
                this.active_date_picker = 'YEAR'
            }
        },
        datePickerEmitInput(v){
            if(this.picker_tipo=='datetime'){
                this.date_picker = v
                v = [this.date_picker,this.time_picker].join(' ')
            }

            this.$emit('input', v)
        },
        timePickerEmitInput(v){
            if(this.picker_tipo=='datetime'){
                this.time_picker = v
                v = [this.date_picker,this.time_picker].join(' ')
            }
            this.$emit('input', v)
        },
        timeMinutePickerEmitClick(v){
            if(this.picker_tipo=='datetime'){ this.tabs.index = 0 }
            this.$emit('click:minute', v)
        },
        datePickerEmitClickDate(v){
            if(this.picker_tipo == 'datetime'){ this.tabs.index = 1 }

            this.$emit('click:date', v)

        },
        separarDateTime(){
            if( ! this.value){
                return
            }

            if(this.picker_tipo == 'time'){
                this.time_picker = this.value
            }
            else {
                [this.date_picker, this.time_picker] = this.value.split(' ')
            }
        },
        setarDataHoje(){
            this.date_picker = moment().format('YYYY-MM-DD')

            this.$emit('input', this.date_picker)
            this.$emit('click:date', this.date_picker)
        },
        setarHoraAgora(){
            this.time_picker = moment().format('HH:mm')

            this.$emit('click:minute', this.time_picker)
            this.$emit('input', this.time_picker)
        },
        setarDataHoraAgora(){
            this.date_picker = moment().format('YYYY-MM-DD')
            this.time_picker = moment().format('HH:mm')
            this.tabs.index = 0

            let datetime = [this.date_picker,this.time_picker].join(' ')

            this.$emit('click:date', datetime)
            this.$emit('input', datetime)
        },
    }
}
</script>

