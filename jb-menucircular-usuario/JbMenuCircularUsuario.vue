<template>
    <v-menu offset-y :close-on-content-click="false" class="mx-1" min-width="200">
        <template v-slot:activator="{ on }">
            <v-badge overlap color="deep-orange" >
                <!-- <v-btn color="white" fab small depressed v-on="on" width="32px" height="32px"> <v-icon color="primary">person</v-icon> </v-btn> -->
                <v-btn color="white" fab x-small depressed v-on="on"> <v-icon color="primary">person</v-icon> </v-btn>
            </v-badge>
        </template>

        <v-list class="menu_circular_usuario">
            <v-list-item v-if="titulo">
                <v-list-item-title class="font-italic text-capitalize font-weight-bold" >{{titulo}}</v-list-item-title>
            </v-list-item>

            <slot></slot>

            <!-- efetua logout -->
            <v-list-item @click="logout" >
                <v-icon>exit_to_app</v-icon>
                <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        props:{
            csrf:String,
            logoutHref:String, titulo:String,
        },
        data(){return {
        }},
         methods: {
            logout(){
                var form = document.createElement("form");
                var csrf = document.createElement("input");

                form.method = "POST";
                form.action = this.logoutHref;
                form.id = "logout-form";

                csrf.value=this.csrf;
                csrf.name="_token";
                csrf.type="hidden";
                form.appendChild(csrf);

                document.body.appendChild(form);

                form.submit();
            }
        },
    }
</script>
