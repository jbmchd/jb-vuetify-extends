<template>
    <div>
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" :color="color" dark app fixed >
            <v-toolbar-items>
                <v-app-bar-nav-icon v-if="comMenu" @click.stop="abrir_menudrawer = !abrir_menudrawer"></v-app-bar-nav-icon>
                <slot name="titulo">
                    <span class="hidden-sm-and-down pt-3"><v-btn text :href="href" class="v-btn-remove-fundo-before">{{titulo}}</v-btn></span>
                </slot>
            </v-toolbar-items>

            <slot></slot>

        </v-app-bar>

        <slot name="menu">
            <!-- <menulateral-principal v-if="comMenu" v-model="abrir_menudrawer" :itens="menuItens" ></menulateral-principal> -->
        </slot>

    </div>
</template>

<script>

    export default {
        props: {
            comMenu:Boolean, menuItens:Array,
            titulo:String, href:{type:String, default:"/"}, color:{type:String, default:"primary"},
        },
        data: () => ({
            abrir_menudrawer: false,
        }),
        methods: {
        },
        mounted(){
        }
    }
</script>

