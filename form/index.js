import Vue from 'vue'

import JbForm from './JbForm.vue'
import JbText from './inputs/text/JbText.vue'
import JbTextPassword from './inputs/text/JbTextPassword.vue'
import JbTextDatetime from './inputs/text/JbTextDatetime.vue'
import JbSelect from './inputs/select/JbSelect.vue'
import JbAutocomplete from './inputs/autocomplete/JbAutocomplete.vue'
import JbAutoLogradouroTipos from './inputs/autocomplete/JbAutoLogradouroTipos.vue'
import JbAutocompleteUf from './inputs/autocomplete/JbAutoUf.vue'
import JbAutoCidades from './inputs/autocomplete/JbAutoCidades.vue'
import JbCombobox from './inputs/combobox/JbCombobox.vue'

Vue.component('jb-form', JbForm)
Vue.component('jb-text', JbText)
Vue.component('jb-text-password', JbTextPassword)
Vue.component('jb-text-datetime', JbTextDatetime)
Vue.component('jb-select', JbSelect)

Vue.component('jb-autocomplete', JbAutocomplete)
Vue.component('jb-auto-logradouro-tipos', JbAutoLogradouroTipos)
Vue.component('jb-auto-uf', JbAutocompleteUf)
Vue.component('jb-auto-cidades', JbAutoCidades)

Vue.component('jb-combobox', JbCombobox)
