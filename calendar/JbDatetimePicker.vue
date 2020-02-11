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
                    ref="v-date-picker"
                    v-model="date_picker"
                    v-bind="this.$attrs"
                    v-on="this.$listeners"

                    @input="datePickerEmitInput"
                    @click:date="datePickerEmitClickDate"
                ></v-date-picker>
            </v-tab-item>
            <v-tab-item v-if="picker_tipo=='datetime' || picker_tipo=='time'" >
                <v-time-picker
                    ref="v-time-picker"
                    v-model="time_picker"

                    format="24hr"

                    @input="timePickerEmitInput"
                    @change="timePickerEmitChange"
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
import globalMixin from './../../jb-v-global/jb-v-mixin-global'

export default {
    mixins: [globalMixin],
    props:{
        tipo:{type:String, default:'date'},
        historic:Boolean
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
        data_ptbr(){
            let partes = this.vmodel.split(' ')
            partes[0] = partes[0].split('-').reverse().join('/')
            return partes.join(' ')
        }
    },
    created(){
        this.definirTipo()
        this.separarDateTime()
        this.ativarHistorica()
    },
    methods: {
        definirTipo(){
            this.picker_tipo = this.tipo
        },
        ativarHistorica(){
            if(this.picker_tipo!='time' && this.historic){

                !this.selecionou && setTimeout(() => (this.$refs['v-date-picker'].activePicker = 'YEAR'))
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
        timePickerEmitChange(v){
            let picker = this.$refs['v-time-picker']

            if(this.picker_tipo=='datetime'){
                this.tabs.index = 0
                picker.selecting = 1
            }

            this.$emit('change', v)
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

