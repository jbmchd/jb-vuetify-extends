<template>

    <v-tooltip v-if="ttText" :bottom="ttBottom">

        <template v-slot:activator="{ on }">
            <v-icon
                :ref="vuetify_ref"
                v-on="on"

                :color="color"
                :dark="dark"
                :dense="dense"
                :disabled="disabled"
                :large="large"
                :left="left"
                :light="light"
                :right="right"
                :size="size"
                :small="small"
                :tag="tag"
                :xLarge="xLarge"
                :xSmall="xSmall"

                @click="$emit('click')"
                :class="classes"
            >
                <slot></slot>
            </v-icon>
        </template>

        <span style="font-size:small">{{ttText}}</span>

    </v-tooltip>

    <v-icon v-else
        :ref="vuetify_ref"

        :color="color"
        :dark="dark"
        :dense="dense"
        :disabled="disabled"
        :large="large"
        :left="left"
        :light="light"
        :right="right"
        :size="size"
        :small="small"
        :tag="tag"
        :xLarge="xLarge"
        :xSmall="xSmall"

        @click="$emit('click')"
        :class="classes"
    >
        <slot></slot>
    </v-icon>

</template>
<script>

export default {
    props:{
        ttBottom:{type:Boolean, default:true},
        ttText:String,
        type:String,

        // VUETIFY
        color:{type:String, default:'primary'},
        dark: Boolean,
        dense: Boolean,
        disabled: Boolean,
        large: Boolean,
        left: Boolean,
        light: Boolean,
        right: Boolean,
        size: {type:[String,Number]},
        small: Boolean,
        tag: {type:String, default:'i'},
        xLarge: Boolean,
        xSmall: Boolean,
    },
    data(){ return {
        classes:'',
    }},
    computed:{
        vuetify_ref(){
            return this.ref || 'v-icon'
        }
    },
    created(){
        this.classes = this.$vnode.data.staticClass;
    },
    mounted(){
        if( ! this.$listeners.click){
            //remove a classe de link se não passar nenhum evento click
            this.$refs['v-icon'].$el.classList.remove('v-icon--link')
        }
    },
}
</script>
