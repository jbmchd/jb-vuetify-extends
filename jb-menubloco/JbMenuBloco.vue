
<template>
    <jb-bloco :config="config">
        <div :class="config.qtd !== null ? 'display-1 font-weight-bold':'display-1 font-weight-bold mt-4 pt-3' ">{{config.qtd}}</div>
        <div class="subtitle-1">{{config.titulo}}</div>

        <template slot="conteudo-extra">
            <template v-if="config.blocos">
                <template v-if="$typeof(config.blocos,'array')">
                    <v-row>
                        <v-col v-for="(bloco, i) in config.blocos" :key="i" :cols="bloco.cols?bloco.cols:3">
                            <jb-bloco-rec :config="bloco">
                                <slot v-if="config.id" :name="config.id"> </slot>
                            </jb-bloco-rec>
                        </v-col>
                    </v-row>
                </template>
                <template v-if="$typeof(config.blocos,'object')">
                    <v-col cols="12">
                        <jb-menublocos :itens="config.blocos"></jb-menublocos>
                    </v-col>
                </template>

            </template>

            <slot></slot>

        </template>
    </jb-bloco>
</template>

<script>
    export default {
        name:"jb-bloco-rec",
        props:{
            config: Object
        },
    }
</script>
