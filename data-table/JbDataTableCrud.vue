<template>
<div
  ref="jb-data-table-crud"
>

  <jb-data-table
    v-bind="this.$attrs"
    v-on="this.$listeners"
    :search="table.search"
    show-empty
    ref="jb-data-table"
  >

  <template #top>
    <v-row  class="col-12 p-0 m-0">
      <slot name="top-left">
        <v-col class="col-2">
          <v-btn v-if="podeAdicionar" small outlined color="primary" class="mb-2" ref="btn-novo" @click="novo()"> <v-icon small>mdi mdi-plus-circle-outline</v-icon> {{btnAddTexto || 'Adicionar'}}</v-btn>
        </v-col>
      </slot>

      <v-spacer></v-spacer>

      <slot name="top-right">
        <v-col class="col-4 ">
          <jb-text v-model="table.search" placeholder="Pesquisar" >
            <v-btn #append color="primary" :disabled="!table.search" @click="table.search = ''"> <v-icon>mdi mdi-close-circle-outline</v-icon> </v-btn>
          </jb-text>
        </v-col>
      </slot>
    </v-row>
  </template>

    <template v-slot:item.actions="{ item, header, value }" >
      <div class="mr-2">

          <slot name="actions-prepend" :item="item" :header="header" :value="value" :index="$attrs.items.indexOf(item)" ></slot>

          <jb-btn v-if="podeEditar" text x-small color="amber" @click="editar(item, $attrs.items.indexOf(item))" class="my-2" tooltip="Editar" > <v-icon small> mdi mdi-pencil </v-icon> </jb-btn>
          <jb-btn v-if="podeAtivarInativar" text x-small color="primary" @click="ativarInativarConfirm(item, $attrs.items.indexOf(item))" class="my-2" :tooltip="item.ativo ? 'Inativar' : 'Ativar'" > <v-icon small> mdi {{ item.ativo ? 'mdi-arrow-down' : 'mdi-arrow-up'}} </v-icon> </jb-btn>
          <jb-btn v-if="podeDeletar" text x-small color="red" @click="deletarConfirm(item, $attrs.items.indexOf(item))" class="my-2" tooltip="Deletar"> <v-icon small> mdi mdi-delete </v-icon> </jb-btn>

          <slot name="actions-append" :item="item" :header="header" :value="value" :index="$attrs.items.indexOf(item)"></slot>

      </div>
  </template>

  </jb-data-table>

  <jb-dialog
    v-if="dialog_options.abrir"
    ref="jb-dialog"
    v-bind="dialog_options"
    v-model="dialog_options.abrir"
    :titulo="formTitulo"
  >

    <template v-slot:top>
        <span class="headline">{{ formTitulo }}</span>
        <v-spacer></v-spacer>
        <v-icon small tt-text="Manter aberto" @click="v=>{dialog_options.manter_aberto = !dialog_options.manter_aberto}" :color="dialog_options.manter_aberto ? 'primary' :  'grey lighten-2'" class="mr-2"> mdi-pin </v-icon>
        <v-icon small tt-text="Fechar" @click="dialogCancel()">mdi-close</v-icon>
    </template>

    <jb-form ref="jb-form" v-bind="form_options" v-model="form.valido">
      <slot name="form" :valido="form.valido">
        <slot></slot>
      </slot>
    </jb-form>

    <template #actions>
      <v-row no-gutters>
        <v-col cols="12" align="end">
          <slot name="form-botao-cancelar" :cancelar="dialogCancel">
            <v-btn small text color="grey" @click="dialogCancel()"> Cancelar </v-btn>
          </slot>
          <slot name="form-botao-salvar" :salvarConfirm="salvarConfirm">
            <v-btn small text color="primary" @click="salvarConfirm()" :disabled="!formValido" > Confirmar </v-btn>
          </slot>
        </v-col>
      </v-row>
    </template>

  </jb-dialog>

</div>
</template>


<script>

import globalMixin from "./../../jb-v-global/jb-v-mixin-global";

export default {
  mixins:[globalMixin],
  props:{
    podeAdicionar:{type:Boolean, default:true},
    podeEditar:{type:Boolean, default:true},
    podeAtivarInativar:{type:Boolean, default:true},
    podeDeletar:{type:Boolean, default:true},

    btnAddTexto:String,
    loadingColor: { type: String, default: '#0079bf' },

    formOptions:Object,
    dialogOptions:Object,

    formResetar:[Function, Object],
  },
  data() {return {
      popover:{
        show: false
      },
      form:{
        valido:false,
        dados:this.value,
      },
      loading:{
        abrir:false
      },
      table:{
        search: this.tableSearch,
        index_selecionado: -1,
      },
      dialog_options_default: {
          abrir: false,
            maxWidth: '750px',
            persistent: true,
            manter_aberto: false,
            titulo: {
                novo: "Adicionar",
                editar: "Editar",
            },
      },
      form_options_default: {
          valido:true
      }
  }},
  computed: {
    dialog_options(){ return Object.assign( this.dialog_options_default, this.dialogOptions ) },
    form_options(){ return Object.assign( this.form_options_default, this.formOptions) },
    tituloNovo(){ return typeof this.dialog_options.titulo=='string' ? this.dialog_options.titulo : this.dialog_options.titulo.novo},
    tituloEditar(){return typeof this.dialog_options.titulo=='string' ? this.dialog_options.titulo : this.dialog_options.titulo.editar},
    formTitulo() { return this.table.index_selecionado === -1 ? this.tituloNovo :  this.tituloEditar },
    formValido() {return this.form.valido && this.form_options.valido},
    tableSearch(){ return this.search || this.table.search },
    tableItems(){ return this.$attrs.items },

  },
  created () {
    this.table.index_selecionado = -1
  },
  watch: {
      value(v){
          this.form.dados = v
      }
  },
  methods: {
    preNovo(...params){this.$emit('pre-novo', ...params)},
    preEditar(item, index, ...params){
      this.$emit('pre-editar', item, index, ...params)
      return item;
    },
    preDeletar(...params){this.$emit('pre-deletar', ...params)},
    preAtivarInativar(...params){this.$emit('pre-ativar-inativar', ...params)},
    posNovo(...params){this.$emit('pos-novo', ...params)},
    posEditar(...params){this.$emit('pos-editar', ...params)},
    posDeletar(...params){this.$emit('pos-deletar', ...params)},
    posAtivarInativar(...params){this.$emit('pos-ativar-inativar', ...params)},
    posFechar(...params){this.$emit('pos-fechar', ...params)},

    emitInput(){
      this.$emit('input',this.form.dados)
    },
    atualizarVModel(novos_dados){
      this.form.dados = Object.assign({}, this.form.dados, novos_dados)
      this.emitInput()
    },
    resetar(){
      this.table.index_selecionado = -1

      if (this.formResetar){
        let obj = typeof this.formResetar == 'function' ? this.formResetar() : this.formResetar
        this.atualizarVModel(obj)
      }

      this.$refs['jb-form'].resetValidation()
    },
    abrirDialog(){
      this.dialog_options.abrir = true
    },
    dialogCancel() {

        if( ! this.dialog_options.manter_aberto){
            this.dialog_options.abrir = false
      }

      this.resetar()
      this.posFechar()
    },

    // ==== Operações das Actions do Datatable
    novo(){
      this.preNovo()
      this.abrirDialog()
    },
    editar (item, index) {
      this.table.index_selecionado = index

      item = this.tableItems[index]
      item = this.preEditar(item, index)

      this.atualizarVModel(item)
      this.abrirDialog()
    },
    ativarInativarConfirm (item, index) {
      this.$jb.confirm({
        text: "Tem certeza que quer alterar?",
        confirmButtonText: 'Sim, pode alterar',
      })
      .then((result) => {
        if (result.value) {
          if(this.$listeners.hasOwnProperty('ativar-inativar')){
            this.$emit('ativar-inativar',item,index)
          }
          else {
            item.ativo = !item.ativo
            this.$emit('salvar',item, this)
          }

        }
      })
    },
    salvarConfirm () {

      this.form.valido = false

      let item = this.form.dados

      this.$jb.confirm({
        text: "Tem certeza que quer salvar?",
        confirmButtonText: 'Sim, pode salvar',
      })
      .then((result) => {
        if (result.value) {
          this.$emit('salvar',item, this)
        }
        this.form.valido = true
        this.dialogCancel()
      })
    },
    deletarConfirm (item, index) {
      this.$jb.confirm({
        text: "Tem certeza que quer DELETAR?",
        confirmButtonText: 'Sim, pode DELETAR',
      })
      .then((result) => {
        if (result.value) {
          this.$emit('deletar',item,index)
        }
      })
    },
  },

}
</script>
