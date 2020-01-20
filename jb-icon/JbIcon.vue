<template>

    <span>
        <v-tooltip top :disabled="!tooltip_options.message">
        <template v-slot:activator="{ on: onTooltip  }">
            <v-icon 
                ref="v-icon"
                v-bind="$attrs"
                v-on="onTooltip"
            >
                <slot></slot>
            </v-icon>
        </template>

        <span>{{tooltip_options.message}}</span>
      </v-tooltip>
    </span>

</template>
<script>

export default {
    props:{
        tooltip:{type:[String, Object]}
    },
    data(){return {
        tooltip_default_options: {
            message: null,
        },
    }},
    computed: {
        tooltip_options(){
            let tooltip = typeof this.tooltip == 'string' ? {message: this.tooltip} : this.tooltip
            tooltip = Object.assign(this.tooltip_default_options, tooltip)
            return tooltip
        }
    },
}
</script>
