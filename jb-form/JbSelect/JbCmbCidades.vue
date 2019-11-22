<template>
<div>
    <jb-loading v-model="loading.mostrar"></jb-loading>

    <jb-combobox
        :ref="ref"
        v-model="cidade"
        v-on="this.$listeners"
        v-bind="this.$attrs"

        :items="cidades"
    >
    </jb-combobox>

</div>

</template>

<script>

import axios from 'axios'

import {globalMixin}    from '../../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
     props:{
        uf:String,
    },
    data: function () { return {
        cidade: null,
        cidades:[],
        loading:{
            mostrar:false
        },
    }},
    computed:{
        cidade_cod(){
            return this.value
        },
        vuetify_ref(){
            return this.ref || 'jb-combobox'
        }
    },
    created(){
        if(this.uf){
            this.buscarCidades(this.uf)
        }
    },
    watch:{
        uf(uf){
            this.cidade = null
            this.buscarCidades(uf)
        },
    },
    methods:{
        buscarCidades(uf){
            if(uf && typeof uf == 'object'){
                uf = uf.value
            }

            this.loading.mostrar = true

            axios.get(`buscarCidadesPorEstado/${uf}`)
            .then(v => {
                let response = v.data.__response

                if(response.erro){
                    this.dialog.form.mensagensTipo_data = response.mensagens_tipo
                    this.dialog.form.mensagens_data = response.mensagens
                }
                else {
                    this.cidades = response.dados.length ? this.$criarArrayParaCombobox(response.dados, 'cidade_nome', 'cidade_cod') : [];
                    if(this.cidade_cod){
                        this.selecionarCidade()
                    }
                }
            })
            .finally(v => (this.loading.mostrar = false))
        },
        selecionarCidade(){
            let result = this.$buscarItemDatatable(this.cidades, this.cidade_cod)

            if(result.index < 0){
                return null
            }
            else {
                this.cidade = result.result;
            }
        },
    },
}
</script>
