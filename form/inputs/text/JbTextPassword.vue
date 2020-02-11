<template>
  <jb-text
        ref="jb-text"

        v-model="$v.vmodel.$model"
        v-bind="this.$attrs"
        v-on="this.$listeners"
        :label="_label"
        :type="_type"

        :append-icon="_append_icon"
        @click:append="alternarExibicao"
    ></jb-text>
</template>

<script>
import inputBaseMixin from "../../mixins/jb-v-mixin-input-base";

export default {
  mixins: [inputBaseMixin],
  data() {
    return {
      senha_visivel: false
    };
  },
  computed: {
    _label() {
      return this.label || "Senha";
    },
    _type() {
      return this.senha_visivel ? "text" : "password";
    },
    _append_icon() {
      return this.senha_visivel
        ? "mdi mdi-eye-outline"
        : "mdi mdi-eye-off-outline";
    }
  },
  mounted(){
    this.extenderValidacaoDoFilho()
  },
  methods: {
    resetValidation(){
    //   this.$refs['jb-text'].resetValidation()
        this.resetarValidacaoNoFilho()
    },
    alternarExibicao() {
      this.senha_visivel = !this.senha_visivel;
    }
  }
};
</script>
