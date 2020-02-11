<template>
<div>
    <jb-autocomplete
        ref="jb-autocomplete"
        v-model="cidade"
        v-on="this.$listeners"
        v-bind="this.$attrs"

        :items="cidades"
    >
    </jb-autocomplete>
</div>

</template>

<script>

import inputBaseMixin from './../../mixins/jb-v-mixin-input-base'
import listaCidades from './../../data/Cidades'

export default {
    mixins:[inputBaseMixin],
     props:{
        uf:String,
    },
    data: function () { return {
        cod: null,
        cidades:[],
        cidade: null,
    }},
    created() {
        if(this.uf){
            this.buscar(this.uf)
            if(this.cod) {
                this.selecionar()
            }
        }
    },
    mounted(){
        this.extenderValidacaoDoFilho()
    },
    watch:{
        uf(uf){
            this.cod = null
            this.buscar(uf)
        },
    },
    methods:{
        buscar(uf){
            let cidades = listaCidades.filter(cidade => {
                return cidade.cod_uf == uf
            })

            this.cidades = cidades.map(cidade => {
                cidade.text = cidade.nome
                cidade.value = cidade.cod
                return cidade
            })
        },
        selecionar(){
            for (const cidade of this.cidades) {
                if(cidade.cod == this.cod){
                    this.cidade = cidade
                }
            }
        },
        resetValidation(){
            this.resetarValidacaoNoFilho()
        },
    },
}
</script>
