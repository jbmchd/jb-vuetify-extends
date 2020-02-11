<template>

    <jb-autocomplete
        ref="jb-autocomplete"
        v-model="$v.vmodel.$model"
        v-on="this.$listeners"
        v-bind="this.$attrs"

        :items="ufs"
        small-chips
    >
    </jb-autocomplete>

</template>

<script>

import inputBaseMixin from './../../mixins/jb-v-mixin-input-base'
import listaUF from './../../data/Ufs'

export default {
    mixins:[inputBaseMixin],
    data() {return {
        ufs:[],
    }},
    created(){
        for (const uf of listaUF) {
            uf.text = uf.nome,
            uf.value = uf.cod,
            this.ufs.push(uf)
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
