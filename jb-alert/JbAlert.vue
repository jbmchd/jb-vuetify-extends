<template>
    <v-alert
        :ref="vuetify_ref"
        v-model="vmodel"
        v-bind="this.$attrs"
        v-on="this.$listeners"

        :color="color || 'info'"
        :class="exibir?'':'display_none'"
        @input="input"
    >
        <div v-if="value_type=='string'">
            {{value}}
        </div>
        <ul v-else class="pl-3">
            <li v-for="(msg, key) in value" :key="key">
                {{msg}}

                <v-tooltip v-if="key==0 && tooltip" bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on" style="cursor:pointer; font-size:21px">help</v-icon>
                    </template>
                    <span> {{tooltip}} </span>
                </v-tooltip>
            </li>
        </ul>
    </v-alert>
</template>

<script>

    import {globalMixin} from '../jb-global/jb-v-mixin-global'

    export default {
        mixins:[globalMixin],
        props: {
            tooltip:String,
        },
        computed:{
            value_type(){
                return this.$typeof(this.value)
            },
            exibir(){
                return this.value && (this.$typeof(this.value,'string') || Object.keys(this.value).length > 0)
            },
            vuetify_ref(){
                return this.ref || 'jb-alert'
            }
        },
        created(){
            Object.assign(this, this.$attrs)
        },
        methods:{
            input(aberto){
                this.$emit('input', aberto);
            }
        }
    }
 </script>

 <style>
 .display_none {
     display: none
 }
 </style>

