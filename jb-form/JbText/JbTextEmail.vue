<template>

    <jb-text
        :ref="vuetify_ref"
        v-model="vmodel"
        v-bind="this.$attrs"
        v-on="this.$listeners"

        :name="name_cp"
        :label="label_cp"
        :regras="regras_cp"
    ></jb-text>

</template>

<script>

import {globalMixin}    from '../../jb-global/jb-v-mixin-global'

export default {
    mixins: [globalMixin],
    props:{
        unique:{type:[Boolean,Object,Array]},
        regras:{type:[String,Array,Object]},
    },
    computed:{
        regras_cp(){
            return this.montarRegras()
        },
        label_cp(){
            return this.label || 'Email'
        },
        name_cp(){
            return this.name || 'email'
        },
        vuetify_ref(){
            return this.ref || 'jb-text'
        }
    },
    methods:{
        montarRegras(){
            let unique = []

            if(this.unique){
                if(this.$typeof(this.unique,'boolean'))
                {
                    unique = ['email-unique']
                }
                else if(this.$typeof(this.unique,'object'))
                {
                    unique = {'email-unique':this.unique}
                }
            }

            let regras = []

            if(this.$typeof(this.regras,'string'))
            {
                regras = [this.regras]
            }
            if(typeof this.regras == 'object')
            {
                regras = this.regras
            }

            return regras.concat(unique).concat(['email'])
        }
    }
}
</script>
