var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// This exports the plugin object.
export default {
    // Tudo criado neste arquivo será global
    install (Vue, options) {
        //================================================
        // 1.Variaveis
        //================================================
        /**
         * ======================
         * Expressoes regulares
         * ======================
         */
        Vue.prototype.$regex = function (tipo, value_test){

            let regex_tipos = {
                email: /^[^@]+@[^@]+\.[^@]+$/,
                cpf: /\d{3}\.\d{3}\.\d{3}-\d{2}/,
                cnpj: /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/,
                date_ptbr: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)((19|20))(\d{2})$/,
                datetime_ptbr: /^(0[\d]|[12][\d]|3[01])\/(0[\d]|1[0-2])\/\d\d\d\d (00|[\d]|1[\d]|2[0-3]):([\d]|[0-5][\d]):?([\d]|[0-5][\d])$/,
                date_us: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
                datetime_us: /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][\d]|3[01]) (00|[\d]|1[\d]|2[0-3]):([\d]|[0-5][\d]):?([\d]|[0-5][\d])$/,
                time: /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/,
                currency: /\d+|,(\.\d{3})*(,\d+)?/gm,
                espacos: /\s/g,
            }

            let regex = regex_tipos[tipo]

            return value_test ? regex.test(value_test) : regex
        }

        //================================================
        // 2. Diretivas
        //================================================
        Vue.directive('my-directive', {
            bind (el, binding, vnode, oldVnode) {}
        })

        //================================================
        // 3. Opções no componente
        //================================================
        Vue.mixin({
            created: function () {},

        })

        //================================================
        // 4. Metodos
        //================================================

        // ACOES
        Vue.prototype.$redirecionar = function (url) {
            window.location.href = url;
        }
        // OBJETOS
        Vue.prototype.$copiarObjeto = function (obj){
            return JSON.parse(JSON.stringify(obj));
        }
        Vue.prototype.$criarObjetoMensagensForm = function (mensagens, tipo, detalhes) {
            return {
                mensagens: mensagens,
                tipo: tipo,
                detalhes: detalhes
            }
        }
        Vue.prototype.$buscarItemDatatable = function (datatable, valor_procurado, campo_de_busca='value', case_sensitive=false) {

            if( ! valor_procurado || valor_procurado==undefined){
                return {
                    index: -1,
                    result: null,
                }
            }

            if(typeof valor_procurado=='object'){
                valor_procurado = valor_procurado[campo_de_busca]
            }

            if( ! case_sensitive){
                valor_procurado = valor_procurado.toString().toUpperCase()
            }

            let indexItem = -1;
            let result = datatable.filter( dtItem => {
                let item = dtItem[campo_de_busca]
                if(item){
                    let dtitem_valor = ! case_sensitive ? item.toString().toUpperCase() : item

                    if(dtitem_valor == valor_procurado){
                        indexItem = datatable.indexOf(dtItem)
                        return datatable[indexItem];
                    }
                }
            });

            return {
                index: indexItem,
                result: result.length ? result[0] : null,
            }
        }
        Vue.prototype.$hasKey = function (key, obj){
            if(obj){
                return {}.hasOwnProperty.call(obj, key)
            }

            return false
        }

        // ARRAY
        Vue.prototype.$criarArrayParaCombobox = function (obj, campo_text, campo_value){
            if( ! obj.length){
                return []
            }

            let primeira_key = Object.keys(obj)[0]
            let primeiro_item = obj[primeira_key]
            let obj_valido = {}.hasOwnProperty.call(primeiro_item, campo_text) && {}.hasOwnProperty.call(primeiro_item, campo_value)

            if( ! obj_valido){
                return []
            }

            let array = [];
            for (const item of obj ) {
                array.push({text:item[campo_text], value:item[campo_value]})
            }
            return array;
        }
        Vue.prototype.$removerElementosVaziosArray = function (array) {
            return array.filter(function (el) {
                return !!el;
            });
        }
        // DATE
        Vue.prototype.$passaDatetimeParaPtbr = function (datetime) {
            if(this.$regex('datetime_us').test(datetime) || this.$regex('date_us').test(datetime)){
                let [date, time] = datetime.split(' ')
                datetime = [date.split('-').reverse().join('/'), time].join(' ')
            }
            return datetime;
        }
        Vue.prototype.$passaDatatimePtbrParaEn = function (datetime) {
            if(this.$regex('datetime_ptbr').test(datetime) || this.$regex('date_ptbr').test(datetime)){
                let [date, time] = datetime.split(' ')
                datetime = [date.split('/').reverse().join('-'), time].join(' ')
            }
            return datetime;
        }
        Vue.prototype.$resetarObjeto = function (obj, modelo) {

            for (const key in obj) {
                let cada = obj[key];

                if(modelo && this.$hasKey(key, modelo)){
                    cada = modelo[key]
                }
                else {
                    if(this.$typeof(cada,'null')){
                        cada = null
                    }
                    if(this.$typeof(cada,'boolean')){
                        cada = true
                    }
                    else if(this.$typeof(cada,'object')){
                        cada = {}
                    }
                    else if(this.$typeof(cada,'array')){
                        cada = []
                    }
                    else if(this.$typeof(cada,'string')){
                        cada = ''
                    }
                }

                obj[key] = cada
            }

            return obj
        }
        // STRING
        Vue.prototype.$toLowerCamelCase = function (string) {
            return string.split('-').map((string, key) => key>0 ? string[0].toUpperCase() + string.slice(1) : string).join('')
        }
        Vue.prototype.$toUpperCamelCase = function (string) {
            return string.split('-').map(string => string[0].toUpperCase() + string.slice(1)).join('')
        }
        Vue.prototype.$removerEspacos = function (string) {
            let regex = this.$regex('espacos')
            return string.replace(regex, ''); //remove os espaços
        }
        Vue.prototype.$removerAcentos = function (str) {
            str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }
        // MOEDA
        Vue.prototype.$formataNumeroParaMoeda = function (value, digits) {
            if(parseFloat(value)){
                value = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: digits || 2
                }).format(value)
            }

            return value
        }
        // NUMEROS
        Vue.prototype.$formataNumeroParaCartaoCredito = function (numero) {
            var str = this.$removerEspacos(numero)
            var numberChunks = str.match(/.{1,4}/g); //separa o numero em grupos de 4
            var result = numberChunks.join(' ');
            return result
        }
        // OUTROS
        Vue.prototype.$typeof = function (v, eTipo){
            let tipo = typeof v

            if(v===null){
                tipo = 'null'
            }
            else if(v===undefined){
                tipo = 'undefined'
            }
            else if(v===true || v===false){
                tipo = 'boolean'
            }
            else if(tipo=='object' && Array.isArray(v))
            {
                tipo = 'array'
            }

            if(eTipo){
                return eTipo === tipo
            }

            return tipo
        }
        Vue.prototype.$isJson = function (str, pass_object) {
            let isJSON = require('is-json');
            return isJSON(str, pass_object);
        }



        // Vue.prototype.$setFocus = function (ref) {
        //     //seta focus no mozilla firefox e edge principalmente

        //     const element = this.$refs[ref].$el.querySelector('input')
        //     if (element) this.$nextTick(() => { element.focus() })
        // }





    }
}


