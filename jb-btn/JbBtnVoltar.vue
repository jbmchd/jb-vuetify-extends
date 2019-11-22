<template>

    <v-btn :href="url" :color="color" :fab="fab" :small="small" :icon="icon" :tile="tile" :elevation="elevation">

        <jb-icon dark :color="iconColor" > {{icone}} </jb-icon>
        <slot v-if="!fab"> Voltar </slot>

    </v-btn>

</template>

<script>

import {globalMixin} from '../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
    props:{
        elevation:{type:[Number, String], default:1},
        fab:Boolean,
        icon:Boolean,
        small:Boolean,
        tile:Boolean,
        color:{type:String, default:'white'},

        iconColor:{type:String, default:'primary'},
        icone:{type:String, default:'mdi-arrow-left'},
        url:{type:String, default:"javascript:history.back()"},
    },
    computed:{
        vuetify_ref(){
            return this.ref || 'v-btn-voltar'
        },
    },
}
</script>
