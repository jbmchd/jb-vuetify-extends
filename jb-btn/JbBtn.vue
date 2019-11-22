<template>

        <v-btn
            :ref="vuetify_ref"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"
        >
            <v-icon x-small class="mr-1" >{{icone}}</v-icon>
            <slot></slot>
        </v-btn>
</template>

<script>

import {globalMixin} from '../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
    props:{
        icone:{type:String}
    },
    computed:{
        vuetify_ref(){
            return this.ref || 'v-btn'
        },
    },
    created(){
        Object.assign(this, this.$attrs)
    },
}
</script>
