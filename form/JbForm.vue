<template>
  <v-form
    ref="v-form"
    v-on="this.$listeners"
    v-bind="this.$attrs"
    enctype="multipart/form-data"
    @submit.stop.prevent="submit"
  >

    <v-row>
      <v-col class="text-right">
        <div
          class="text-light"
          style="font-size:12px"
        >{{mensagem_campos_obrigatorio.exibir ? mensagem_campos_obrigatorio.texto : ''}}</div>
      </v-col>
    </v-row>

    <slot></slot>
  </v-form>
</template>

<script>
export default {
  props: {
    validar: { type: Boolean, default: true },
    exibirMensagemCamposObrigatorios: { type: Boolean, default: null },
  },
  data () {    return {
      valid: false,
      bolsaCamposInvalidos: [],
      tem_campos_obrigatorios: false,
    }  },
  computed: {
    mensagem_campos_obrigatorio () {
      let exibir = this.exibirMensagemCamposObrigatorios === null ? this.tem_campos_obrigatorios : this.exibirMensagemCamposObrigatorios
      let mensagem_campos_obrigatorio = {
        exibir: exibir,
        texto: 'Todos os campos marcados com * são obrigatórios'
      }

      return mensagem_campos_obrigatorio
    }
  },
  mounted () {
    this.registrarValidacao()
    this.validarForm()
  },
  updated () {
    this.validarForm()
  },
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
    },
    emitInput () {
      this.$emit('input', this.valid)
    },
    alterarBolsa (uid, invalido) {
      let tem_na_bolsa = this.bolsaCamposInvalidos.includes(uid)

      if (tem_na_bolsa) {
        this.bolsaCamposInvalidos.splice(this.bolsaCamposInvalidos.indexOf(uid), 1);
      }

      if (invalido) {
        this.bolsaCamposInvalidos.push(uid)
      }
    },
    registrarValidacao () {
      let campos = this.$refs['v-form'].$children

      for (const key in campos) {
        const el = campos[key];

        if (el.hasOwnProperty("$v")) {
          let uid = el._uid
          let vmodel = el.$v.vmodel
          if (vmodel.hasOwnProperty('required')) {
            this.tem_campos_obrigatorios = true
          }


          this.alterarBolsa(uid, vmodel.$invalid)

          this.$watch(() => el.vmodel_erros_vuex, result => {
              let invalid = typeof result === 'string'
              this.alterarBolsa(uid, invalid)
              this.validarForm()
          })

          this.$watch(() => vmodel.$model, () => {
            this.alterarBolsa(uid, vmodel.$invalid)
            this.validarForm()
          })

          this.$watch(() => vmodel.$pending, pending => {
            let invalid = true
            if (!pending) {
              invalid = vmodel.$invalid
            }
            this.alterarBolsa(uid, invalid)
            this.validarForm()
          })
        }
      }
      this.validarForm()
    },
    validarForm () {
      this.valid = this.bolsaCamposInvalidos.length < 1
      this.emitInput()
    },
    submit (e) {
      if (this.validar && this.valid) {
        return false
      }
    }
  }
};
</script>
