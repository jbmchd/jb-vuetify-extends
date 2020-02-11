<template>

        <jb-autocomplete
            ref="jb-autocomplete"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :items="tipos"
            small-chips
        >
        </jb-autocomplete>

</template>

<script>

import inputBaseMixin from './../../mixins/jb-v-mixin-input-base'
import {comuns, outros} from './../../data/LogradouroTipo'

export default {
    mixins:[inputBaseMixin],
    data() { return {
        tipos: [],
    }},
    created(){
        this.tipos.push({ header: ' # Comuns' },)

        for (const tipo of comuns) {
            this.tipos.push({
                text: tipo.nome,
                value: tipo.value,
            })
        }

        this.tipos.push({ header: ' # Outros' },)

        for (const tipo of outros) {
            this.tipos.push({
                text: tipo.nome,
                value: tipo.value,
            })
        }

    },
    mounted(){
        this.extenderValidacaoDoFilho()
    },
    methods: {
        resetValidation(){
            this.resetarValidacaoNoFilho()
        },
    },

}
</script>
