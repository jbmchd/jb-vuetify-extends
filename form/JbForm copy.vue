<template>
    <v-form

      ref="v-form"
      v-on="this.$listeners"
      v-bind="this.$attrs"
      enctype="multipart/form-data"
      @submit.stop.prevent="submit"
    >

      <v-col class="text-right">
        <div class="text-light" style="font-size:12px">{{mensagem_campos_obrigatorio.exibir ? mensagem_campos_obrigatorio.texto : ''}}</div>
      </v-col>

      <slot></slot>
    </v-form>
</template>

<script>
export default {
  props: {
    validar: { type: Boolean, default: true },
    exibirMensagemCamposObrigatorios:{type:Boolean, default:true},
  },
  data(){return {
    valid: false,
    mensagem_campos_obrigatorio: {
      exibir: this.exibirMensagemCamposObrigatorios,
      texto: 'Todos os campos marcados com * são obrigatórios'
    }
  }},
  updated() {
    this.validarForm()
  },
  methods: {
    resetAll(){
      this.reset()
      this.resetValidation()
    },
    reset(){
      this.$refs['v-form'].reset()
      this.validarForm()
    },
    resetValidation(){
      let campos = this.$refs['v-form'].$children
      campos.forEach(campo => {
        if (campo.hasOwnProperty("$v")) {

          campo.resetValidation()
        }
      });
      this.validarForm()
    },
    emitInput(){
      this.$emit('input',this.valid)
    },
    validarForm(){
      let valid = true
      let campos = this.$refs['v-form'].$children

      for (const key in campos) {
        const el = campos[key];

        if (el.hasOwnProperty("$v")) {
          let vmodel = el.$v.vmodel
          let value = vmodel.$model
          let e_obrigatorio = Object.keys(vmodel).includes('required')
          if(e_obrigatorio && this.exibirMensagemCamposObrigatorios){
            this.mensagem_campos_obrigatorio.exibir = true
          }
          let validar_campo = e_obrigatorio || value || Object.keys(vmodel).includes('igualA')

          if(validar_campo && vmodel.$invalid){
            valid = false;
            break;
          }

        }
      }
      this.valid = valid
      this.emitInput()
    },
    submit(e) {
      if (this.validar && this.valid) {
        return false
      }
    }
  }
};
</script>
