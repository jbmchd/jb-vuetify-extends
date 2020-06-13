<template>
<v-row align="start">

     <v-col :cols="cols" v-for="(blocos, tipo) in itens" :key="tipo">

        <v-row v-if="tipo">
            <v-col>
                <v-divider></v-divider>
                <v-row justify="end"><span class="title font-italic grey--text mr-3">{{tipo}}</span></v-row>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(bloco, i) in blocos" :key="i" :cols="bloco.cols?bloco.cols:3">
                <jb-menubloco :config="bloco">
                    <slot v-if="bloco.id" :name="bloco.id"> </slot>
                </jb-menubloco>
            </v-col>

        </v-row>

     </v-col>
</v-row>


</template>

<script>
    export default {
        props:{
            itens: Object,
            cols:{type:String, default:'12'},
        },
    }
</script>
