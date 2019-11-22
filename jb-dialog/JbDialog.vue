<template>
    <v-dialog
        :ref="vuetify_ref"
        v-model="vmodel"
        v-bind="this.$attrs"
        v-on="this.$listeners"
    >

        <v-card>
            <v-card-title>
                <slot name="top">
                    <span class="headline">{{ getTitulo }}</span>
                    <v-spacer></v-spacer>
                    <jb-icon small tt-text="Fechar" @click="fechar">mdi-close</jb-icon>
                </slot>
            </v-card-title>

            <v-card-text>

                <slot ></slot>

            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script>

    import {globalMixin} from '../jb-global/jb-v-mixin-global'

    export default {
        mixins:[globalMixin],
        props:{
            value:Boolean,
            titulo:String,
        },
        computed:{
            getTitulo(){ return this.titulo },
            vuetify_ref(){
                return this.ref || 'v-dialog'
            }
        },
        methods:{
            fechar(){
                if(this.$hasKey('fechar',this.$listeners)){
                    this.$emit('fechar', this);
                }
                else {
                    this.value_data = false
                }

                this.$emit('input', this.value_data);
            },
        }

    }
</script>
