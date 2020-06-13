// let Vue = window.Vue

// Vue.component('jb-menublocos', require('./JbMenuBlocos.vue').default);
// Vue.component('jb-menubloco', require('./JbMenuBloco.vue').default);

import Vue from 'vue'

import JbMenuBlocos from './JbMenuBlocos.vue'
import JbMenuBloco from './JbMenuBloco.vue'

Vue.component('jb-menublocos', JbMenuBlocos);
Vue.component('jb-menubloco', JbMenuBloco);
