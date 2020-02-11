<template>

        <v-autocomplete
            ref="v-autocomplete"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :label="label_comp"
            :error-messages="vmodel_erros"

            @input="$v.vmodel.$touch()"
            @blur="$v.vmodel.$touch()"
        />

</template>

<script>

import inputBaseMixin from './../../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
}
</script>
