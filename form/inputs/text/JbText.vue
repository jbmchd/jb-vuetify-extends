<template>
  <v-text-field
    ref="v-text-field"
    v-on="inputListeners"
    v-bind="this.$attrs"
    v-model.trim="$v.vmodel.$model"
    v-input-mask="mask"

    :error-messages="vmodel_erros"
    :label="label_comp"

    @input="$v.vmodel.$touch()"
    @blur="$v.vmodel.$touch()"

    :autofocus="autofocus"
    :dense="dense"
    :clearable="clearable"
    :readonly="readonly"
    :loading="isLoading"
  ></v-text-field>

</template>

<script>
import inputBaseMixin from '../../mixins/jb-v-mixin-input-base'

export default {
  mixins: [inputBaseMixin],
  props: {
    id: { type: String, default: '' },
    autofocus:Boolean,
    dense:Boolean,
    loading:Boolean,
    clearable:Boolean,
    readonly:Boolean,
  },
  data(){
      return {
          isLoading: true
      }
  },
  computed: {
    inputListeners: function() {
      /** pego da documentacao do oficial do VueJs */
      /**
       * `Object.assign` mescla objetos para formar um novo objeto
       *      -> Nós adicionamos todas as escutas do pai
       *      -> Então podemos adicionar escutas personalizadas ou substituir comportamento de algumas escutas.
       *          -> Isso garante que o componente funcione com o v-model
       */
      var vm = this
      return Object.assign({}, this.$listeners, {
        input: value => {
          if (value) {
            //configurar como os valores colocados pelo usuario devem ser guardados na variavel

            if(this.mask){

                if (this.mask == 'dinheiro' || this.mask == 'currency') {
                value = this.currencyUs(value)
                } else if (this.mask == 'cpf') {
                value = value.replace(/[-_.]/g, '')
                } else if (this.mask == 'cnpj' || this.mask == 'cpf_cnpj' || this.mask == 'cns') {
                value = value.replace(/[-/_.]/g, '')
                } else if (
                this.mask == 'percentage' ||
                this.mask == 'porcentagem'
                ) {
                value = this.pegarPorcentagem(value)
                } else if (this.mask == 'date' || this.mask == 'datetime') {
                value = this.datahoraUs(value)
                } else {
                    value = value.match( /\d+|[a-z]|[A-Z]/g ).join('')
                }

            }
          }
          vm.$emit('input', value)
        }
      })
    }
  },
  created(){
      this.isLoading = this.loading
  },
  mounted() {
    let ref_name = Object.keys(this.$refs)[0]
    Object.assign(this.$refs[ref_name], this.$attrs)
    if (this.vmodel) {
      this.$v.vmodel.$touch()
    }
  },
  methods: {
    currencyUs(value) {
      value = value
        .match(this.$jb.regex.currency)
        .join([])
        .replace(',', '.')
      return value
    },
    pegarPorcentagem(value) {
      value = value
        .match(this.$jb.regex.currency)
        .join([])
        .split(',')
        .join('.')
      value = parseFloat(value).toFixed(2)
      return value
    },
    datahoraUs(value) {
      value = value.split(' ')
      value[0] = value[0]
        .split('/')
        .reverse()
        .join('-')
      value = value.join(' ')
      return value
    }
  }
}
</script>
