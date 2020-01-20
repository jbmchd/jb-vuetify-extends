<template>
    <v-data-table v-bind="this.$attrs" v-on="this.$listeners" hide-default-header :search="search || pesquisar" class="elevation-1" ref="v-data-table" :footer-props="footerProps">

        <template v-slot:top="{ items, pagination, options, groupedItems, updateOptions, sort, group }" >
            <slot name="top" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group">
              <v-row>
                <slot name="top-left">
                  <v-col cols="12" md="6"></v-col>
                </slot>

                <v-spacer></v-spacer>

                <slot name="top-right">
                  <v-col cols="12" md="4">
                    <jb-text v-model="pesquisar" placeholder="Pesquisar" >
                      <v-btn slot="append" variant="primary" :disabled="!pesquisar" @click="pesquisar = ''"> <jb-icone>mdi mdi-close-circle-outline</jb-icone> </v-btn>
                    </jb-text>
                    {{pesquisar}}
                  </v-col> 
                </slot>
              </v-row>
            </slot>
        </template>

        <template v-slot:header="{ props: { headers, options, mobile, showGroupBy, someItems, everyItem } }">
          <thead>
            <tr>
              <th v-for="(header, key) in headers" :key="key" :class="pegarClassePeloAlign(header)">
                {{header.text}}
              </th>
            </tr>
          </thead>
        </template>

        <template v-slot:body.append="{ items, pagination, options, groupedItems, updateOptions, sort, group, headers, isMobile, }" >
            <slot name="body.append" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group" :headers="headers" :isMobile="isMobile" ></slot>
        </template>
        <template v-slot:body.prepend="{ items, pagination, options, groupedItems, updateOptions, sort, group, }" >
            <slot name="body.prepend" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group"></slot>
        </template>

        <template v-slot:item="{ item, select, isSelected, expand, isExpanded, headers, index }" >
            <tr>
                <template v-for="(header, key) in headers" >

                    <td :class="pegarClassePeloAlign(header)" :key="key">
                        <template v-if="header.value!='actions'">
                            {{ formatter(header, item[header.value]) }}
                        </template>
                        <template v-else>
                            <slot name="item.actions" :item="item" :header="header" :value="header.value"></slot>
                        </template>
                    </td>

                </template>
            </tr>
        </template>

        <template v-slot:footer="{ items, pagination, options, groupedItems, updateOptions, sort, group, headers, isMobile, }" >
            <slot name="footer" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group" :headers="headers" :isMobile="isMobile"></slot>
        </template>
        <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength, }" >
            <slot name="footer.page-text" :pageStart="pageStart" :pageStop="pageStop" :itemsLength="itemsLength"></slot>
        </template>

        <template v-slot:loading >
            <slot name="loading"></slot>
        </template>
        <template v-slot:no-data >
            <slot name="no-data"></slot>
        </template>
        <template v-slot:no-results >
            <slot name="no-results"></slot>
        </template>

    </v-data-table>

</template>


<script>

import moment from "moment"
import globalMixin from "./../../jb-v-global/jb-v-mixin-global"

export default {
    mixins: [globalMixin],
    props:{
      search: String,
      footerProps: {type:Object, default:v=>{
        return {
          itemsPerPageOptions: [25, 50, 100, 200, {"text":"Todas","value":-1}]
        }
      }}
    },
    data() {
      return {
        pesquisar: null,
      }
    },
    methods: {
      formatter(header, value){
        if( ! Object.keys(header).includes('formatter')){
          return value
        }

        let formatter = header.formatter
        let tipo = typeof formatter
      
        if(tipo == 'function'){
          return formatter(value)
        }
        else if(tipo == 'object'){
          return formatter[value]
        }
        else if(value) {
          return this[formatter] ? this[formatter](value) : value
        }
        else {
          return value
        }
      },
      date(value){
        let date = moment(value)
        return date.isValid() ? date.format('DD/MM/YYYY') : null
      },
      datetime(value){
        let date = moment(value)
        return date.isValid() ? date.format('DD/MM/YYYY HH:mm:ss') : null
      },
      currency(value){
        return this.$jb.mascara.moeda(value)
      },
      cpf(value){
        return this.$jb.mascara.cpf(value)
      },
      cnpj(value){
        return this.$jb.mascara.cnpj(value)
      },

      pegarClassePeloAlign(header){
          if(header['class']){
              return header['class']
          }
          else if(header['align']) {
              let align = header['align']
              if(align=='start'){ return 'text-left' }
              else if(align=='end'){ return 'text-right' }
              else { return 'text-center' }
          }
          return 'text-center'
      },

    },

}
</script>
