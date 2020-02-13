<template>
    <div ref="jb-text-datetime">
        <v-menu
            ref="v-menu"
            v-model="menu.exibir"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on:onMenu }">
                <jb-text
                    ref="jb-text"
                    v-model="vmodel"
                    v-on="{...onMenu, ...$listeners}"
                    v-bind="$attrs"
                    v-rules="regras_validacao"
                    v-mask="tipo"
                    clearable
                    readonly
                    @input="emitInput"
                ></jb-text>
            </template>

            <jb-datetime-picker
                ref="jb-datetime-picker"
                v-model="vmodel"
                :tipo="tipo"
                @change="emitInput"
                no-title
                scrollable
                :historic="historic"
            >

            </jb-datetime-picker>

        </v-menu>
    </div>
</template>

<script>

import inputBaseMixin from './../../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        tipo:{type:String, default:'date'},
        historic:Boolean,
    },

    data () {return{
        menu:{
            exibir: false
        },
        input:{
            appendIcon: this.appendIcon
        },
    }},

    computed: {
        regras_validacao() {
            let rules = this.regras.length ? this.regras : this.tipo
            if(this.regras.length){
                rules.push(this.tipo)
            }
            return rules
        },
    },
    methods: {
        fechar(){
            this.menu.exibir = false
        },
        emitInput(v){
            this.$emit('input', v)
            this.fechar()
        }
    }
}
</script>

