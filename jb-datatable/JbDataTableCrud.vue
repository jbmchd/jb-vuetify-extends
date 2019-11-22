<template>
<div>

    <jb-datatable
        :headers="headers"
        :items="datatableItems"
        :search="datatableSearch"
        :footer-props="footerProps"
        :items-per-page="itemsPerPage"

        :sortBy.sync="sortBy"
        :sort-desc="sortDesc"
        :multi-sort="multiSort"
        :ref="vuetify_ref"
    >

        <template v-slot:top="{items, options, groupedItems, updateOptions, sort, group}">
            <slot name="top.prepend" :items="items" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group" ></slot>

            <slot name="top" :items="items" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group" >
                <v-toolbar flat color="white">
                    <v-btn v-if="podeAdicionar" color="primary" dark class="mb-2" @click="novo()"> <v-icon >add</v-icon> {{toolbarBtnTitulo || tituloNovo || 'Adicionar'}}</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="datatable.search" append-icon="search" label="Pesquisar" single-line hide-details ></v-text-field>
                </v-toolbar>
            </slot>

            <slot name="top.append" :items="items" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group" ></slot>

        </template>

        <template v-slot:item.actions="{ item, header, value }" >
            <div class="mr-2 mt-3">

                <slot name="item.prepend-actions" :item="item" :header="header" :value="value" :index="datatableItems.indexOf(item)" ></slot>

                <jb-icon v-if="podeEditar" small tt-text="Editar" @click="editar(item, datatableItems.indexOf(item))" > edit </jb-icon>
                <jb-icon v-if="podeAtivarInativar" small :tt-text="item.ativo ? 'Inativar' : 'Ativar'" @click="ativarInativarConfirm(item, datatableItems.indexOf(item))" > {{ item.ativo ? 'mdi-arrow-down' : 'mdi-arrow-up'}} </jb-icon>
                <jb-icon v-if="podeDeletar" small color="red" tt-text="Deletar" @click="deletarConfirm(item, datatableItems.indexOf(item))" > delete </jb-icon>

                <slot name="item.append-actions" :item="item" :header="header" :value="value" :index="datatableItems.indexOf(item)"></slot>

            </div>
        </template>

    </jb-datatable>

    <jb-dialog v-model="dialog.mostrar" :titulo="formTitulo" :fullscreen="dialogFullscreen" :persistent="dialogPersistent" :max-width="dialogMaxWidth || '750px'">
        <template v-slot:top>
            <span class="headline">{{ formTitulo }}</span>
            <v-spacer></v-spacer>

            <jb-icon small tt-text="Manter aberto" @click="v=>{dialog.manter_aberto = !dialog.manter_aberto}" :color="dialog.manter_aberto ? 'primary' :  'grey lighten-2'" class="mr-2"> mdi-pin </jb-icon>
            <jb-icon small tt-text="Fechar" @click="fecharDialog()">mdi-close</jb-icon>
        </template>


        <jb-loading v-model="loading.mostrar"></jb-loading>

        <jb-form validar v-model="form.valid" ref="jb-form" :mensagens="form.mensagens.mensagens" :mensagens-tipo="form.mensagens.tipo" :mensagens-detalhes="form.mensagens.detalhes" :reset="form.reset" @keyup.native.enter="submitEnter">

            <slot name="form" :datatable_form="form" :cancelar="fecharDialog" :salvar="saveConfirm"></slot>

            <slot name="form.actions"  >
                <div slot="botoes">
                    <v-row v-if="!formOcultarBotoes">

                        <v-spacer></v-spacer>

                        <v-col cols="12" md="4" class="pa-0">
                            <slot v-if="!formOcultarCancelar" name="botao-cancelar">
                                <v-btn color="primary" text class="pa-0" @click="fecharDialog()">Cancelar</v-btn>
                            </slot>
                            <slot v-if="!formOcultarSalvar" name="botao-salvar">
                                <v-btn color="primary" text class="pa-0" @click="saveConfirm()" :disabled="!form.valid || !formValid">Salvar</v-btn>
                            </slot>
                        </v-col>
                    </v-row>
                </div>
            </slot>
        </jb-form>

    </jb-dialog>

</div>
</template>


<script>

import {globalMixin} from '../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
    props:{
        podeAdicionar:{type:Boolean, default:true},
        podeEditar:{type:Boolean, default:true},
        podeAtivarInativar:{type:Boolean, default:true},
        podeDeletar:{type:Boolean, default:false},

        tituloNovo:String,
        tituloEditar:String,

        //---- Form
        action:String, csrf:String,
        formValid:{type:Boolean, default:true},
        formMensagens:{type:Object, default(){return{mensagens:null, tipo:null, detalhes:null}}},
        resetValidation:Boolean,
        formOcultarCancelar:Boolean,
        formOcultarSalvar:Boolean,
        formOcultarBotoes:Boolean,

        //---- Toolbar
        toolbarBtnTitulo:String,

        //---- Datatable
        headers:Array,
        items:Array,
        itemsPerPage:{type:Number, default:50},
        footerProps:{type:Object, default:v=>({itemsPerPageOptions:[50,100,150,{"text":"Todos","value":-1}]})},

        sortBy:{type:[String,Array]},
        sortDesc:{type:[Boolean,Array]},
        multiSort:Boolean,

        search:String,

        //---- Dialog
        dialogPersistent:Boolean,
        dialogMaxWidth:String,
        dialogFullscreen:Boolean,
        dialogMostrar:Boolean,
        dialogManterAberto:Boolean,

        posFechar:{type:Function, default:v=>(v)},

        //actions
        preNovo:{type:Function, default:v=>(v)},
        posNovo:{type:Function, default:v=>(v)},
        preEditar:{type:Function, default:v=>(v)},
        posEditar:{type:Function, default:v=>(v)},
        preAtivarInativar:{type:Function, default:v=>(v)},
        posAtivarInativar:{type:Function, default:v=>(v)},
        preDeletar:{type:Function, default:v=>(v)},
        posDeletar:{type:Function, default:v=>(v)},

        preSalvar:{type:Function, default:v=>(v)},

        //model
        vueapiqueryModel:Object,
        httpUrl:String,

    },
    data() {return {
            modeloDefaultSave:this.$copiarObjeto(this.value),
            AxiosModel: this.vueapiqueryModel,

            dialog:{
                mostrar: this.dialogMostrar,
                manter_aberto: this.dialogManterAberto,
            },
            form: {
                valid: false,
                reset: false,
                resetValidation: this.resetValidation,
                mensagens:{
                    mensagens:null,
                    tipo:null,
                    detalhes:null,
                },
            },
            loading:{
                mostrar:false
            },
            datatable:{
                items:[],
                indexItem: -1,
            },
    }},
    computed: {
        formTitulo() { return this.datatable.indexItem === -1 ? this.tituloNovo :  this.tituloEditar },
        datatableSearch(){ return this.search || this.datatable.search },
        datatableItems(){ return this.datatable.items },
        vuetify_ref(){ return this.ref || 'jb-datatable' }
    },
    created () {
        this.datatable.items = this.$copiarObjeto(this.items)
        this.initialize()
    },
    mounted(){
        let vuetify_comp = this.$refs[this.vuetify_ref]
    },
    watch:{
        formMensagens:{
            handler(){
                this.form.mensagens = this.$criarObjetoMensagensForm(this.formMensagens.mensagens, this.formMensagens.tipo, this.formMensagens.detalhes);
            },
            deep:true
        },
        items:{
            handler(v){
                this.datatable.items = v
            },
            deep:true
        }
    },
    methods: {
        initialize(){
            if(Object.keys(this._events).indexOf('dialog-inicializar') > -1){
                this.$emit('dialog-inicializar', this);
            }
            else {
                this.form.mensagens = this.$criarObjetoMensagensForm(this.formMensagens.mensagens, this.formMensagens.tipo, this.formMensagens.detalhes);
                this.reiniciarForm()

                this.datatable.indexItem = -1
            }

        },
        reiniciarForm(){
            if(this.$refs['jb-form'])
            {
                let jb_form = this.$refs['jb-form']
                let vform = this.$refs['jb-form'].$refs[jb_form.vuetify_ref]

                vform.reset()
                vform.resetValidation()
            }
        },
        abrirDialog(){
            this.dialog.mostrar = true
        },
        fecharDialog() {
            if( ! this.dialog.manter_aberto){
                this.dialog.mostrar = false
            }
            this.initialize()
            this.posFechar()
        },

        // ==== Operações das Actions do Datatable
        novo(){
            this.reiniciarForm()
            Object.assign(this.value, this.modeloDefaultSave)

            this.preNovo()
            this.abrirDialog()
        },
        editar (item, index) {
            // this.datatable.indexItem = this.datatable.items.indexOf(item)
            this.datatable.indexItem = index

            item = this.buscarDatatableItem(this.datatable.indexItem)
            item = this.preEditar(item, index)

            Object.assign(this.value, item)

            this.abrirDialog()
        },
        buscarDatatableItem(index){
            return this.datatable.items[index]
        },
        submitEnter(){
            if(this.form.valid && this.formValid){
                this.saveConfirm()
            }
        },
        ativarInativarConfirm (item) {
            this.$dialog.confirm({
                title: 'Alerta!',
                text: 'Tem certeza que deseja inativar?',
                persistent: true,
                actions: {
                    false: 'Não',
                    true: {
                        color: 'red',
                        text: 'Sim',
                        handle: () => {
                            return new Promise(resolve => {
                                this.ativarInativar(item)
                                setTimeout(resolve, 300)
                            })
                        }
                    }
                }
            })
        },
        deletarConfirm (item) {
            this.$dialog.confirm({
                title: 'Alerta!',
                text: 'Tem certeza que deseja excluir este item?',
                persistent: true,
                actions: {
                    false: 'Não',
                    true: {
                        color: 'red',
                        text: 'Sim',
                        handle: () => {
                            return new Promise(resolve => {
                                this.deletar(item)
                                setTimeout(resolve, 300)
                            })
                        }
                    }
                }
            })
        },
        saveConfirm () {

            this.form.valid = false

            let item = this.value

            this.$dialog.confirm({
                title: 'Alerta!',
                text: 'Tem certeza que quer salvar?',
                persistent: true,
                actions: {
                    false: {
                        color: 'blue',
                        text: 'Não',
                        handle: () => {
                            this.form.valid = true
                        }
                    },
                    true: {
                        color: 'red',
                        text: 'Sim',
                        handle: () => {
                            return new Promise(resolve => {
                                this.save(item)
                                setTimeout(resolve, 300)
                            })
                        }
                    }
                }
            })
        },


        // ==== Operações HTTP
        ativarInativar(item, index){

            item = this.preAtivarInativar(item)
            item.ativo = item.ativo ? 0 : 1

            this.AxiosModel
                .preparaRequest({url:this.httpUrl})
                .preparaItem(item)
                .createAndSave()
                .then(v => {
                    this.loading.mostrar = false
                    let response = v.__response

                    if(response.erro){
                        this.form.mensagens = this.$criarObjetoMensagensForm(response.mensagens[0], response.mensagens_tipo, response.exception);
                    }
                    else {
                        let indexItem = this.datatable.indexItem = index


                        Object.assign(this.datatable.items[indexItem], response.dados)
                        this.$dialog.message.success(response.mensagens.join('-'), {timeout: 5000});
                    }
            });
        },
        deletar(item, index){

            item = this.preDeletar(item, index)


            this.AxiosModel
                .preparaRequest({url:this.httpUrl})
                .createAndDelete(item)
                .then(v => {
                    let response = v.data.__response
                    if(response.erro){
                        //deu erro
                        this.$dialog.message.error(response.mensagens.join('-'), {timeout: 5000})
                    }
                    else {
                        //deu certo
                        this.$dialog.message.success(response.mensagens.join('-'), {timeout: 3000})
                        this.datatable.items.splice(index, 1)

                    }
            });
        },
        save (item) {

            this.loading.mostrar = true

            item = this.preSalvar(item)

            let indexItem = this.datatable.indexItem

            this.AxiosModel
                .preparaRequest({url:this.httpUrl})
                .preparaItem(item)
                .createAndSave()
                .then(v => {

                    this.loading.mostrar = false
                    let response = v.__response

                    if(response.erro){
                        this.form.mensagens = this.$criarObjetoMensagensForm(response.mensagens[0], response.mensagens_tipo, response.exception);
                    }
                    else {
                        if (indexItem > -1) {
                            Object.assign(this.datatable.items[indexItem], response.dados)
                        } else {
                            this.datatable.items.push(response.dados)
                        }
                        this.$dialog.message.success(response.mensagens.join('-'), {timeout: 5000});

                        this.fecharDialog()

                        this.posNovo(response, item)
                        this.posEditar(response, item, indexItem)

                    }
            });

            this.form.valid = true
        },
    },

}
</script>
