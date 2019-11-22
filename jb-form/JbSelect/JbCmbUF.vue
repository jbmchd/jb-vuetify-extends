<template>

    <jb-combobox
        :ref="vuetify_ref"
        v-model="vmodel"
        v-on="this.$listeners"
        v-bind="this.$attrs"

        :items="ufs"
    >
    </jb-combobox>

</template>

<script>

import {globalMixin}    from '../../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
    data() {return {
        ufs:[
            {text:'AC', value:'AC'},
            {text:'AL', value:'AL'},
            {text:'AP', value:'AP'},
            {text:'AM', value:'AM'},
            {text:'BA', value:'BA'},
            {text:'CE', value:'CE'},
            {text:'DF', value:'DF'},
            {text:'ES', value:'ES'},
            {text:'GO', value:'GO'},
            {text:'MA', value:'MA'},
            {text:'MT', value:'MT'},
            {text:'MS', value:'MS'},
            {text:'MG', value:'MG'},
            {text:'PA', value:'PA'},
            {text:'PB', value:'PB'},
            {text:'PR', value:'PR'},
            {text:'PE', value:'PE'},
            {text:'PI', value:'PI'},
            {text:'RJ', value:'RJ'},
            {text:'RN', value:'RN'},
            {text:'RS', value:'RS'},
            {text:'RO', value:'RO'},
            {text:'RR', value:'RR'},
            {text:'SC', value:'SC'},
            {text:'SE', value:'SE'},
            {text:'SP', value:'SP'},
            {text:'TO', value:'TO'},
        ],
    }},
    computed:{
        vuetify_ref(){
            return this.ref || 'jb-combobox'
        }
    }
}
</script>
