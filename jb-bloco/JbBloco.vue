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
        <v-card tile :color="bloco.disabled ? 'grey' : bloco.color" :outlined="bloco.outlined" dark :min-height="bloco.height || '140'" class="jb-bloco ma-1" slot-scope="{ hover }" >
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
                <v-row no-gutters>
                    <v-col v-if="bloco.action">
                        <v-btn v-if="bloco.action.url" tile depressed small block :href="bloco.action.url" @click="actionClick()" class="pa-0 caption" ><v-icon class="body-1">{{actionIcon(bloco.action)}}</v-icon> {{actionText(bloco.action)}} </v-btn>
                        <v-btn v-else tile depressed small block @click="actionClick()" class="pa-0 caption" ><v-icon class="body-1">{{actionIcon(bloco.action)}}</v-icon> {{actionText(bloco.action)}} </v-btn>
                    </v-col>

                    <v-col v-if="bloco.action2">
                        <v-btn v-if="bloco.action2.url" tile depressed small block :href="bloco.action2.url" @click="actionClick()" class="pa-0 caption" ><v-icon class="body-1">{{actionIcon(bloco.action2)}}</v-icon> {{actionText(bloco.action2)}} </v-btn>
                        <v-btn v-else tile depressed small block @click="action2Click()" class="pa-0 caption" ><v-icon class="body-1">{{actionIcon(bloco.action2)}}</v-icon> {{actionText(bloco.action2)}} </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-hover>

    <v-dialog v-if="criarDialog" v-model="dialog.mostrarDialog" :fullscreen="bloco.dialogFullscreen" :persistent="bloco.dialogPersistent" :max-width="bloco.dialogMaxWidth">
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
            height:String,
            color:{type:String, required:false},
            icone:String,
            action:[Object,String],
            hoverText:String,
            hoverColor:String,
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
                    action:{},
                    color:'primary',
                    disabled:null,
                    height:null,
                    hoverText:null,
                    hoverColor:null,
                    icone:null,
                    id:null,
                    outlined:true,

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
        computed:{
            criarDialog(){
              return !this.action && !this.action2 && !this.$listeners.hasOwnProperty('action') && !this.$listeners.hasOwnProperty('action2')
          }
        },
        created(){
            this.mesclarConfigBloco()
        },
        methods:{
            actionText(action){
                let texto=action.text;
                if( ! texto){
                    texto = action.url ? 'Entrar' : 'Ver'
                }
                return texto
            },
            actionIcon(action){
                let icon=action.icon;
                if( ! icon){
                    icon = action.url ? 'arrow_forward' : 'mdi-eye'
                }
                return icon
            },
            mesclarConfigBloco(){
                for (const prop in this.config) {
                    let config = this.config[prop];

                    let prop_camel_case = this.$toLowerCamelCase(prop)
                    this.bloco[prop_camel_case] = config
                }

                for (const prop in this.bloco) {
                    const config = this.bloco[prop];

                    if(this._props.hasOwnProperty(prop) && this._props[prop]){
                        this.bloco[prop] = this._props[prop]
                    }
                }

                if(this.bloco.hasOwnProperty('action') && ! this.$typeof(this.bloco.action,'object')){

                    this.bloco.action = {
                        url:this.bloco.action,
                        text:null,
                        icon:null,
                    }
                }
                if(this.bloco.hasOwnProperty('action2') && ! this.$typeof(this.bloco.action2,'object')){
                    this.bloco.action2 = {
                        url:this.bloco.action2,
                        text:null,
                        icon:null,
                    }
                }
            },
            configuraHoverClasses(){
                let base = "d-flex transition-fast-in-fast-out darken-4 subheading v-card--reveal white--text "
                let backColor = this.hoverColor || this.color;
                let classes = base + backColor;
                return classes;
            },
            actionClick(){
                if(this.$listeners.hasOwnProperty('action')){
                    this.$emit('action')
                }
                else if( ! this.bloco.action) {
                    this.dialog.mostrarDialog = true
                }
            },
            action2Click(){
                if(this.$listeners.hasOwnProperty('action2')){
                    this.$emit('action2')
                }
                else if( ! this.bloco.action2) {
                    this.dialog.mostrarDialog = true
                }
            },
        }
    }
</script>

<style media="screen">

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
