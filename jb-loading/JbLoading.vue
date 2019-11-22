<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading" :can-cancel="canCancel" :on-cancel="onCancel" :is-full-page="fullPage" :background-color="backgroundColor" :opacity="opacidade">
            <v-row align="center" justify="center" >
                <div slot="before">
                    <slot name="before"></slot>
                </div>

                <slot name="loader">
                    <v-progress-circular :size="50" :color="color" indeterminate class="my-3" ></v-progress-circular>
                </slot>

                <div slot="after">
                    <slot name="after"></slot>
                </div>
            </v-row>

        </loading>

    </div>

</template>

<script>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        components: { Loading },
        props:{
            value:Boolean,
            cor:{type:String, default:'primary'}, corFundo:{type:String, default:'white'}, opacidade:{type:Number, default:0.9},
            telaCheia:Boolean,
            podeCancelar:{type:Boolean, default:false},
        },
        data() {
            return {
                isLoading: this.value,
                canCancel: this.podeCancelar,
                fullPage: this.telaCheia,
                color: this.cor,
                backgroundColor: this.corFundo,
                opacity: this.opacidade,
            }
        },
        methods: {
            onCancel() {
              console.log('Loading cancelado pelo usuário.')
            }
        },
        watch:{
            value(v){
                this.isLoading = v
            },
        },
        mounted(){
        }
    }
</script>


<style>
    .vld-parent{ position: static; }
    .vld-icon{width:75%}
</style>

