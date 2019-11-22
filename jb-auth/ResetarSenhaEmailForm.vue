<template>
<div>
    <jb-loading v-model="loading.mostrar"></jb-loading>

    <v-row align="center" justify="start" class="primary ma-0" >
        <v-col>
            <jb-btn-voltar fab small />
            <div class="white--text pa-0 ma-0 ml-1 mt-8"><h4>Recuperar Senha</h4></div>
        </v-col>
    </v-row>

    <v-card>
        <v-card-text class="pt-4">
            <div>
                <jb-form v-model="form.valid" ref="form" validar :mensagens="form.mensagens.mensagens" :mensagens-tipo="form.mensagens.tipo" :mensagens-detalhes="form.mensagens.detalhes" @submit="enviarEmailResetarSenha">

                    <jb-text-email
                        v-model="form.email"
                        name="email"
                        regras="required"
                        label="Email"
                    ></jb-text-email>

                </jb-form>
            </div>
        </v-card-text>
    </v-card>
</div>
</template>

<script>

import axios from 'axios'

export default {

    data: function () {
        return {
            form: {
                valid: false,
                mensagens:{
                    mensagens: 'Um email será enviado com link de recuperação',
                    tipo: 'info',
                    detalhes:null,
                },
                email:null,
            },
            loading:{
                mostrar:false
            },
        }
    },
    methods: {
        enviarEmailResetarSenha(){
            this.loading.mostrar = true

            let item = {
                email: this.form.email
            }

            axios.post('email', item)
            .then(v => {
                let response = v.data.__response

                if(response.erro){
                    this.form.mensagens = this.$criarObjetoMensagensForm(response.mensagens[0], response.mensagens_tipo);
                }
                else {
                    this.form.mensagens = this.$criarObjetoMensagensForm(response.mensagens.join('-'), 'success');
                }

                this.loading.mostrar = false
            });

        }
    },
}

</script>
