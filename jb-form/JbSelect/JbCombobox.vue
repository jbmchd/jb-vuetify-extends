<template>

        <v-combobox
            :ref="vuetify_ref"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :label="label_comp"
            :rules="vmodelRules"
            :error-messages="error_messages"
            :search-input.sync="search"
        >
            <template v-slot:no-data>
                <v-list-item>
                    <v-list-item-content>
                    <v-list-item-title>
                        Nenhum resultado para "<strong>{{ search }}</strong>".
                    </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-combobox>

</template>

<script>

import {inputBaseMixin} from '../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        retornoKey:{type:String, default:null}
    },
    data() {return{
        search:'',
    }},
    computed:{
        vuetify_ref(){
            return this.ref || 'v-combobox'
        },
        vmodel:{
            get(){
                let value = this.value || this.value_data

                if(this.itens && typeof this.itens[0] == 'object'){
                    let result = this.$buscarItemDatatable(this.itens,value)
                    if(result){ return result.result }
                }

                if(this.retornoKey && this.$hasKey(this.retornoKey,value)){
                    return value[this.retornoKey]
                }
                else {
                    return value
                }
            },
            set(v){
                this.value_data = v
            },

        },
        itens(){
            return this.items
        },
    },
}
</script>
