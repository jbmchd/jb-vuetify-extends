<template>
  <v-dialog
    ref="v-dialog"
    v-model="vmodel"
    v-bind="this.$attrs"
    v-on="this.$listeners"
  >

  <v-card>
    <v-card-title>
    <slot name="top">
      <span class="headline">{{ getTitulo }}</span>
      <v-spacer></v-spacer>
      <jb-icon small :tooltip="tooltip" @click="fechar">mdi-close</jb-icon>
    </slot>
    </v-card-title>

    <v-card-text>
      <slot></slot>
    </v-card-text>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>

    
  </v-card>

  </v-dialog>
</template>

<script>

  import globalMixin from '../../jb-v-global/jb-v-mixin-global'

  export default {
  mixins:[globalMixin],
  props:{
    value:Boolean,
    titulo:String,
    tooltip:{type:String, default:'Fechar'},
  },
  computed:{
    getTitulo(){ return this.titulo },
  },
  methods:{
    fechar(){
      if(this.$jb.object.hasKey('fechar',this.$listeners)){
        this.$emit('fechar', this);
      }
      else {
        this.value_data = false
        this.$emit('input', this.value_data);
      }
    },
  }

  }
</script>
