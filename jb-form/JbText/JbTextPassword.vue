<template>

    <jb-text
        :ref="vuetify_ref"
        v-model="vmodel"
        v-bind="this.$attrs"
        v-on="this.$listeners"

        :label="label_cp"
        :type="type_cp"
        :append-icon="append_icon_cp"
        :regras="regras"

        @click:append="alternarExibicao"
    ></jb-text>

</template>

<script>

import {inputBaseMixin} from '../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    data() { return {
        senha_visivel:false,
    }},
    computed:{
        label_cp(){
            return this.label || 'Senha'
        },
        type_cp(){
            return this.senha_visivel ? 'text' : 'password'
        },
        append_icon_cp(){
            return this.senha_visivel ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
        },
        vuetify_ref(){
            return this.ref || 'jb-text'
        }
    },
    methods:{
        alternarExibicao(){
            this.senha_visivel = !this.senha_visivel
        },
    }
}
</script>
