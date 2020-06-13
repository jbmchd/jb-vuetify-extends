/** Modelo de array aceito
$array = [
    'operacoes'=>[
        ['action'=>'pessoas','color'=>'orange darken-4','icone'=>'mdi-users','qtd'=>$pessoas_qtd,'titulo'=>'Pessoas','action-text'=>null,'action-icon'=>null, 'id'=>null, 'blocos'=>null]
    ],
];
*/
<template>
<div>

    <v-hover>
        <v-card tile :color="bloco.disabled ? 'grey' : bloco.color" dark :min-height="bloco.height || '140'" class="jb-bloco ma-1" slot-scope="{ hover }" >
            <v-card-text class="headline pa-0"  >
                <v-row align="center" justify="space-between" class="px-3 pt-3">


                    <div class="text-sm-left">
                        <div class="white--text pl-3">
                            <slot></slot>
                        </div>
                    </div>

                    <div v-if="bloco.icone" class="pr-2">
                        <v-icon v-if="bloco.icone" class="icon icon-mdi">{{bloco.icone}}</v-icon>
                    </div>

                    <v-expand-transition v-if="bloco.hoverText">
                        <div v-if="bloco.hover" :class="configuraHoverClasses()"  style="height: 100%;" >
                        {{bloco.hoverText}}
                        </div>
                    </v-expand-transition>


                </v-row>
            </v-card-text>

            <v-card-actions v-if="!bloco.disabled" class="pa-0 fixar">
                <v-btn depressed small block :href="bloco.action" @click=" v => (bloco.action?null:dialog.mostrarDialog = true) " class="pa-0 caption" ><v-icon class="mr-1 body-1">{{bloco.actionIcon || 'mdi mdiarrow-right'}}</v-icon> {{bloco.actionText || 'Entrar'}} </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>

    <!-- <v-dialog v-model="dialog.mostrarDialog" :fullscreen="dialogFullscreen" :persistent="dialogPersistent" :max-width="dialogMaxWidth || '100%'"> -->
    <v-dialog v-model="dialog.mostrarDialog" :fullscreen="bloco.dialogFullscreen" :persistent="bloco.dialogPersistent" :max-width="bloco.dialogMaxWidth">
        <v-card>
            <v-card-title>
                <span class="headline">{{ bloco.dialogTitulo }}</span>
                <v-spacer></v-spacer>
                <jb-icon small tt-text="Fechar" @click="v=>( this.dialog.mostrarDialog = false )">mdi-close</jb-icon>
            </v-card-title>

            <v-card-text>
                <slot name="conteudo-extra"></slot>
            </v-card-text>

        </v-card>
    </v-dialog>

</div>
</template>

<script>
    export default {
        name:"JbBloco",
        props:{
            config:Object,
            height:String, color:{type:String, required:false},
            icone:String,
            action:String, actionText:String, actionIcon:String,
            hoverText:String, hoverColor:String,
            disabled:Boolean,

            //---- Dialog
            dialogTitulo:String,
            dialogPersistent:Boolean,
            dialogMaxWidth:String,
            dialogFullscreen:Boolean,

        },
        data(){
            return {
                bloco:{
                    action:null,
                    actionIcon:null,
                    actionText:null,
                    color:null,
                    disabled:null,
                    height:null,
                    hoverText:null,
                    hoverColor:null,
                    icone:null,
                    id:null,

                    //---- Dialog
                    dialogFullscreen:null,
                    dialogMaxWidth:'100%',
                    dialogPersistent:null,
                    dialogTitulo:null,
                },
                dialog:{
                    mostrarDialog: false,
                    form: {
                        formValid: false,
                        resetValidation: false,
                        mensagens_data: this.mensagens,
                        mensagensTipo_data: this.mensagensTipo,
                    },
                },
            }
        },
        created(){
            this.mesclarConfigBloco()
        },
        methods:{
            mesclarConfigBloco(){
                Object.assign(this.bloco, {},this.config)

                for (const prop in this.bloco) {
                    const config = this.bloco[prop];
                    if(this._props.hasOwnProperty(prop) && this._props[prop]){
                        this.bloco[prop] = this._props[prop]
                    }
                }
            },
            configuraHoverClasses(){
                let base = "d-flex transition-fast-in-fast-out darken-4 subheading v-card--reveal white--text "
                let backColor = this.hoverColor || this.color;
                let classes = base + backColor;
                return classes;
            },
        }
    }
</script>

<style media="screen">

/* .v-dialog {
    width: auto !important;
} */

.jb-bloco.v-card .icon {
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
    z-index: 0;
    opacity: 0.25;
  }

.jb-bloco.v-card .icon.icon-mdi { font-size: 70px; }
.jb-bloco.v-card:hover .icon.icon-mdi { font-size: 75px; }

.jb-bloco.v-card .icon.icon-fa { font-size: 75px; }
.jb-bloco.v-card:hover .icon.icon-fa { font-size: 80px; }

.jb-bloco .v-card__actions.fixar {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.jb-bloco .v-card__actions.fixar button,
.jb-bloco .v-card__actions.fixar a { background-color: rgba(0, 0, 0, 0.25) !important }

.jb-bloco .v-card--reveal {
    align-items: center;
    top: 0;
    position: absolute;
    justify-content: center;
    opacity: .9;
    width: 100%;
}

</style>
