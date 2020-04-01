import directiveMoney from './../directives/jb-v-directive-money'

export default {
  // Tudo criado neste arquivo será global
  install(Vue) {
    //================================================
    // 1.Variaveis
    //================================================

    //================================================
    // 2. Diretivas
    //================================================
    Vue.directive('money', {
        bind: (el, binding, vnode) => directiveMoney.bind(el, binding, vnode)
    })

    Vue.directive('mask', {
      bind: (el, binding, vnode) => {
        let mask = binding.value
        if( mask != 'currency'){
            let componente = vnode.componentInstance
            componente.mask = mask
        }
      }
    })

    Vue.directive('rules', {
      bind: (el, binding, vnode) => {
        let regras = binding.value
        let componente = vnode.componentInstance
        componente.regras = regras
      },
      update: (el, binding, vnode) => {
        let regras = binding.value
        let componente = vnode.componentInstance
        componente.regras = regras
      }
    })

    //================================================
    // 3. Opções no componente
    //================================================

    //================================================
    // 4. Metodos
    //================================================
  }
}
