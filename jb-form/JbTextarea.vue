<template>

        <v-textarea
            :ref="vuetify_ref"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :label="label_comp"
            :rules="vmodelRules"
            :error-messages="error_messages"
        ></v-textarea>

</template>

<script>

import {inputBaseMixin} from './mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    computed:{
        vuetify_ref(){
            return this.ref || 'v-textarea'
        }
    },
    methods:{
        iconClickAppendFunction(){
            return this.iconClickAppend()
        },
    },
}
</script>
