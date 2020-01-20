import Vue from 'vue'

import globalMixin from '../../../jb-v-global/jb-v-mixin-global'
import validacaoMixin from '../mixins/jb-v-mixin-validacao'
import inputMask from './../directives/jb-v-directive-mask'

import pluginGlobal from './../plugins/jb-v-plugin-form'
Vue.use(pluginGlobal)

const inputBaseMixin = {
  directives: { inputMask },
  mixins: [globalMixin, validacaoMixin],
  props: {
    inputProps: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      mask: null
    }
  },

  computed: {
    vmodel: {
      get() {
        /**
          configurar como os valores devem ser exibidos para usuario
          o value deve ser sempre no formato bruto (como no banco de dados)
        */
        let v = this.value_data || this.value
        return this.mask ? this.vmodel_masked(v) : v
      },
      set(v) {
        this.value_data = v
      }
    },
    label_comp() {
      return this.label && this.eObrigatorio ? `${this.label} *` : this.label
    }
  },

  created() {
    Object.assign(this, this.$attrs)
  },
  watch: {
    value(v) {
      this.vmodel = v
    }
  },
  methods: {
    vmodel_masked(value) {
      if (value) {
        if (this.mask == 'date' || this.mask == 'datetime') {
          value = value.split(' ')
          value[0] = value[0]
            .split('-')
            .reverse()
            .join('/')
          value = value.join(' ')
        } else if (this.mask == 'dinheiro' || this.mask == 'currency') {
          let inteiro = parseInt(value)
          let restante = parseFloat((value - inteiro).toFixed(2))

          value = restante ? (inteiro + restante).toFixed(2) : value * 100
        } else if (this.mask == 'percentage' || this.mask == 'porcentagem') {
          value = value
            .toString()
            .split('.')
            .join(',')
        }
      }
      return value
    }
  }
}

export default inputBaseMixin
