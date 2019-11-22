<template>
    <v-list-item :href="href">
        <v-icon class="mr-1">{{icone}}</v-icon>
        <v-list-item-title>{{titulo}}</v-list-item-title>
    </v-list-item>
</template>

<script>
    export default {
        props:{
            titulo:String,
            href:String, icone:String
        },
        data(){return {
        }},

    }
</script>

<style>
.menu_circular_usuario a:hover{
    text-decoration: none;
    color: #212529 !important;
}
</style>
