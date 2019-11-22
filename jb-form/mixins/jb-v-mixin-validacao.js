import axios from 'axios'

export const validacaoMixin = {
    data() {return{
        validando: false,
    }},
    computed: {
    },
    mounted(){
    },
    methods: {
        executarValidacao(regras){

            if(this.$typeof(regras,'string'))
            {
                regras = [regras]
            }

            for(let i in regras){
                let result = null

                let regra = null
                let params = null

                if(this.$typeof(regras,'object'))
                {
                    params = regras[i]
                    regra = i
                }
                else
                {
                    regra = regras[i]

                    if(this.$typeof(regra,'object')){
                        result = this.executarValidacao(regra)
                        if(result){
                            return result
                        }
                    }
                }

                if(this.validacao_tipo(regra) == 'axios')
                {
                    this.loading = true
                    let Promisse = this.validacao_axios(regra, params)

                    if(Promisse instanceof Promise){
                        Promisse
                            .then( response => {
                                this.error_messages = typeof response=='string' ? response : null
                            })
                            .catch(error => (error))
                            .finally(v => (this.loading = false))
                    }
                    else {
                        this.loading = false
                        this.error_messages = null
                        this.result = null
                    }
                }
                else
                {
                    this.error_messages = null
                    result = this.validacao_regular(regra, params)

                    if(typeof result[0]=='function' && typeof result[0](this.value) == 'string'){
                        return result
                    }
                }

            }

        },
        validacao_tipo(regra){
            return ['email-unique'].indexOf(regra)>-1 ? 'axios' : 'regular'
        },
        validacao_regular(regra, params){

            let result = null

            if(regra == 'required'){
                result = this.__required_regra(params)
            }

            if(regra == 'match'){
                result = this.__match_regra(params);
            }

            if(this.value){

                if(regra == 'email'){
                    result = this.__email_regra()
                }
                if(regra == 'cpf'){
                    result = this.__cpf_regra();
                }
                if(regra == 'cnpj'){
                    result = this.__cnpj_regra();
                }
                if(regra == 'cpf_cnpj'){
                    result = this.__cpf_cnpj_regra();
                }
                if(regra == 'min'){
                    let min = params;
                    result = this.__min_regra(min);
                }
                if(regra == 'max'){
                    let max = params;
                    result = this.__max_regra(max);
                }
                if(regra == 'date'){
                    if(regra == 'datetime'){
                        result = this.__datahora_regra();
                    }
                    else {
                        result = this.__date_regra();
                    }
                }
                if(regra == 'time'){
                    result = this.__time_regra();
                }
                if(regra == 'datahora'){
                    result = this.__datahora_regra();
                }
            }

            return [result]
        },
        validacao_axios(regra, params){
            if(regra == 'email-unique'){
                let email_valido = this.$regex('email').test(this.value)
                if( ! email_valido){ return true }
                return this.__email_unique_regra(params)
            }
        },
        getFormComponent(VueComponent){

            let VueComp = VueComponent ? VueComponent : this
            VueComp = VueComp.$parent
            if(VueComp._vnode.tag == 'form')
            {
                return VueComp
            }
            else if(VueComp.$parent) {
                VueComp = this.getFormComponent(VueComp)
            }
            else {
                VueComp = false
            }

            return VueComp;
        },
        getFormInputsComponents(VueComponent, FormComponent){
            if( ! FormComponent)
            {
                FormComponent = this.getFormComponent(VueComponent)
            }
            return FormComponent ? FormComponent.inputs : null
        },
        getFormInputComponent(idOuName, inputs){
            if( ! inputs || !this.$typeof(inputs,'array'))
            {
                inputs = this.getFormInputsComponents(this)
            }

            for (const i in inputs) {
                const Input = inputs[i];

                let id = Input._props.id
                let name = Input.$attrs.name

                if(id == idOuName || name == idOuName )
                {
                    return Input
                }
            }

            return false;

        },

        /**
         * ======================
         * Regras acumulativas
         * ======================
         */
        __required_regra(subregras){

            let v = this.value
            let msg = ''
            let result = true

            if(subregras && Object.keys(subregras).length)
            {
                for (const subregra in subregras) {
                    let campos = subregras[subregra];
                    campos = this.$typeof(campos,'string') ? [campos] : campos
                    let campos_nomes_exibicao = []
                    switch (subregra) {
                        case 'or': {
                            let values = [v]
                            for (const i in campos) {
                                const Input = this.getFormInputComponent(campos[i]);
                                const input = Input ? Input._props : null
                                if(input)
                                {
                                    campos_nomes_exibicao.push(Input.$parent.label || Input.$parent.id || Input.$parent.name)
                                    values.push(Input.value)
                                }
                            }
                            let array_sem_valores_null = values.filter(Boolean)

                            msg = 'Pelo menos um desses campos é obrigatório: ' + [this.label || this.id || this.name].concat(campos_nomes_exibicao).join(', ')
                            result = () => array_sem_valores_null.length > 0 || msg

                            break;
                        }
                        case 'array': {
                            let msg = 'Pelo menos uma opção deve ser selecionada'
                            result = v => v.length > 0 || msg
                            break;
                        }

                        default:
                            break;
                    }

                }
            }
            else
            {
                msg = 'Este campo é obrigatório.'
                result = v => !!v || msg

            }

            return result
        },
        __min_regra(min){
            let regras = this.regras || this.rules
            let ecurrency = {}.hasOwnProperty.call(regras,'currency')
            let mascara = this.mascara

            if(this.type=='number' || ecurrency || mascara=='integer'){
                let v = this.value
                let msg = 'No mínimo '+min
                return v => (v && parseFloat(v) >= parseFloat(min)) || msg
            }
            else {
                let v = this.value
                let msg = 'No mínimo '+min+' caracteres'
                return v => (v && v.length >= min) || msg
            }
        },
        __max_regra(max){
            let regras = this.regras || this.rules
            if(!max || max<1){
                return true
            }
            let ecurrency = {}.hasOwnProperty.call(regras,'currency')
            let mascara = this.mascara

            if(this.type=='number' || ecurrency || mascara=='percentage' || mascara=='integer'){
                let v = this.value
                let msg = 'No máximo '+max
                return v => (v && parseFloat(v) <= parseFloat(max)) || msg
            }
            else {
                let v = this.value
                let msg = 'No máximo '+max+' caracteres'
                return v => (v && v.length <= max) || msg
            }
        },
        __match_regra(campos){

            // let v = this.value
            let values = []
            let campos_nomes_exibicao = []

            if(this.$typeof(campos,'string')){
                campos = [campos]
            }

            for (const i in campos) {
                const Input = this.getFormInputComponent(campos[i]);

                if(Input)
                {
                    let this_value = this.value ? this.value.trim() : ''
                    let input_value = Input.value ? Input.value.trim() :  ''

                    campos_nomes_exibicao.push(Input.$parent.label || Input.$parent.id || Input.$parent.name)

                    if( this_value == input_value ){

                        values.push(this.value)
                        if( ! Input.valid){
                            Input.$parent.atualizarComponente()
                        }
                    }

                }
            }

            let msg = 'Os seguinte campos precisam ser iguais: ' + [this.label || this.id || this.name].concat(campos_nomes_exibicao).join(', ')

            return () => values.length == campos.length || msg
        },

        /**
         * ======================
         * Regras não acumulativas
         * ======================
         */
        __email_regra(){
            let v = this.value
            let msg = 'Digite um email válido (ex.: usuario@servidor.com).'
            return v => this.$regex('email').test(v) || msg
        },
        __cpf_regra(){
            let cpf_validado = true
            let strCPF = this.value.match( /\d+/g ).join([])

            var Soma;
            var Resto;
            Soma = 0;
            if (strCPF == "00000000000") cpf_validado=false;

            for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(9, 10)) ) cpf_validado=false;

            Soma = 0;
            for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(10, 11) ) ) cpf_validado=false;

            let msg = 'Digite um CPF válido'
            return v => cpf_validado || msg
        },
        __cnpj_regra(){
            let cnpj_validado = true
            let cnpj = this.value

            cnpj = cnpj.replace(/[^\d]+/g,'');

            if(cnpj == '') {cnpj_validado=false};

            if (cnpj.length != 14){
                cnpj_validado=false;
            }

           // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999"){
                cnpj_validado=false;
            }

            if(cnpj_validado){
                // Valida DVs
                let tamanho = cnpj.length - 2
                let numeros = cnpj.substring(0,tamanho);
                let digitos = cnpj.substring(tamanho);
                let soma = 0;
                let pos = tamanho - 7;

                for (let i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2){
                            pos = 9;
                    }
                }
                let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0)){
                    cnpj_validado=false;
                }

                tamanho = tamanho + 1;
                numeros = cnpj.substring(0,tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2){
                            pos = 9;
                    }
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1)){
                    cnpj_validado=false;
                }
            }


            let msg = 'Digite um CNPJ válido'
            return v => cnpj_validado || msg
            // let v = this.value
            // let msg = 'Digite um CNPJ válido (ex.: 00.000.000/0000-00).'
            // return v => this.$buscarRegExp('cnpj').test(v) || msg
        },
        __cpf_cnpj_regra(){

            var numbers = this.value && this.value.match(/\d+/g) ? this.value.match(/\d+/g).join('') : 0;
            if(this.value && numbers.length>11){
                return this.__cnpj_regra()
            }
            else {
                return this.__cpf_regra()
            }
        },
        __date_regra(){
            let v = this.value
            let msg = 'Digite uma data válida'
            return v => this.$regex('date_ptbr').test(v) || msg
        },
        __time_regra(){
            let v = this.value
            let msg = 'Digite um tempo válido'
            return v => this.$regex('time').test(v) || msg
        },
        __datahora_regra(){
            let datahora = this.value

            let msg = null

            if(datahora){
                let parts = datahora.split(' ')

                let date_validate = this.$regex('date_ptbr').test(parts[0])
                let time_validate = this.$regex('time').test(parts[1])

                if( ! date_validate){
                    msg = 'Digite uma data válida'
                }
                else if( ! time_validate){
                    msg = 'Digite uma hora válida'
                }
            }

            return v => msg
        },
        __email_unique_regra(subregras){

            let url = 'verificar-email'
            let ignore_id = null

            for(let subregra in subregras){
                let valor = subregras[subregra]

                switch (subregra) {
                    case 'url':
                        url = valor
                        break;
                    case 'ignore_id':
                        ignore_id = valor
                        break;
                }
            }

            let email = this.value

            if(url=='local'){ /** nada ainda */}
            else {
                url = '/'+url+'/'+email
                if(ignore_id){
                    url += '/'+ignore_id
                }

                let promisse = axios
                    .get(url)
                    .then(v => {
                        let response = v.data.__response
                        if( ! response.erro){
                            let dados = response.dados
                            if(dados.existe){
                                return 'Este email já está cadastrado, tente outro.'
                            }
                            else {
                                return true
                            }
                        }
                    })

                return promisse
            }
        },




    },
  }
