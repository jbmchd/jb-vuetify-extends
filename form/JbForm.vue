<template>
  <v-form
    ref="v-form"
    v-on="this.$listeners"
    v-bind="this.$attrs"
    enctype="multipart/form-data"
    @submit.stop.prevent="submit"
  >

    <v-col class="text-right">
      <div
        class="text-light"
        style="font-size:12px"
      >{{mensagem_campos_obrigatorio.exibir ? mensagem_campos_obrigatorio.texto : ''}}</div>
    </v-col>

    <slot></slot>
  </v-form>
</template>

<script>
export default {
  props: {
    validar: { type: Boolean, default: true },
    exibirMensagemCamposObrigatorios: { type: Boolean, default: true },
  },
  data () {    return {
      valido: false,
      mensagem_campos_obrigatorio: {
        exibir: this.exibirMensagemCamposObrigatorios,
        texto: 'Todos os campos marcados com * são obrigatórios'
      },
      bolsaCamposInvalidos: []
    }  },
  mounted () {
    //   console.log('mount', this);
    // this.emitInput()
    // this.registrarValidacao()
  },
  //   updated() {
  //     this.validarForm()
  //   },
  methods: {
    resetAll () {
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs['v-form'].reset()
      this.validarForm()
    },
    resetValidation () {
      let campos = this.$refs['v-form'].$children
      campos.forEach(campo => {
        if (campo.hasOwnProperty("$v")) {

          campo.resetValidation()
        }
      });
      this.validarForm()
    },
    // emitInput () {
    //   this.$emit('input', this.valido)
    // },
    // alterarBolsa (uid, invalido) {
    //   let tem_na_bolsa = this.bolsaCamposInvalidos.includes(uid)

    //   if (tem_na_bolsa) {
    //     this.bolsaCamposInvalidos.splice(this.bolsaCamposInvalidos.indexOf(uid), 1);
    //   }

    //   if (invalido) {
    //     this.bolsaCamposInvalidos.push(uid)
    //   }
    // },
    // registrarValidacao () {
    //     console.log('registrar');

    //   let campos = this.$refs['v-form'].$children

    //   for (const key in campos) {
    //     const el = campos[key];

    //     if (el.hasOwnProperty("$v")) {
    //       let uid = el._uid
    //       let vmodel = el.$v.vmodel

    //       this.alterarBolsa(uid, vmodel.$invalid)

    //       this.$watch(() => vmodel.$model, () => {
    //         this.alterarBolsa(uid, vmodel.$invalid)
    //         this.validarForm()
    //       })

    //       this.$watch(() => vmodel.$pending, (pending, old_pending) => {
    //           console.log(pending, old_pending);

    //         let invalid = true
    //         if (!pending) {
    //             invalid = vmodel.$invalid
    //         }
    //         this.alterarBolsa(uid, invalid)
    //         this.validarForm()
    //       })
    //     }
    //   }
    //   this.validarForm()
    // },
    // validarForm () {
    //     this.valido = this.bolsaCamposInvalidos.length < 1
    //     this.emitInput()
    // },
    submit (e) {
      if (this.validar && this.valido) {
        return false
      }
    }
  }
};
</script>
