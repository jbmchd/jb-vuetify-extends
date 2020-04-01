<template>

    <span>
        <v-tooltip v-bind="tooltip_options">
            <template v-slot:activator="{ on: onTooltip  }">
                <v-btn
                    ref="v-btn"
                    v-bind="$attrs"
                    v-on="{ ...onTooltip, ...$listeners }"
                >
                    <slot></slot>
                </v-btn>
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
            top:true,
        },
    }},
    computed: {
        tooltip_options(){
            let tooltip = typeof this.tooltip == 'string' ? {message: this.tooltip} : this.tooltip
            tooltip.disabled = !tooltip.message
            tooltip = Object.assign(this.tooltip_default_options, tooltip)
            return tooltip
        }
    },
}
</script>

<style>
.v-tooltip__content {
    background: rgba(0, 0, 0, 0.9) !important;
    font-size: 12px !important;
    padding: 2px 14px !important;
}
</style>

