<template>

        <v-textarea
            ref="v-textarea"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :label="label_comp"
            :error-messages="vmodel_erros"

            @input="$v.vmodel.$touch()"
            @blur="$v.vmodel.$touch()"

            :rows="rows"
        ></v-textarea>
</template>

<script>

import inputBaseMixin from './../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props: {
        rows:{type:[Number,String], default:3}
    },
}
</script>
