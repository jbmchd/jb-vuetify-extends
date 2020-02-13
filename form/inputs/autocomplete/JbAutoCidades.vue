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
        cidades:[],
        cidade: null,
    }},
    created() {

        if(this.uf){
            this.buscar(this.uf)

            if(this.vmodel) {
                this.selecionar()
            }
        }
    },
    mounted(){
        this.extenderValidacaoDoFilho()
    },
    watch:{
        uf(uf){
            this.buscar(uf)
        },
        vmodel(){
            this.selecionar()
        }
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
            this.cidade = null
            for (const cidade of this.cidades) {
                if(cidade.cod == this.vmodel){
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
