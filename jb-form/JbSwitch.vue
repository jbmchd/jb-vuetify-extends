<template>

  <label class="switch switch-primary mr-3">
    <span><slot></slot></span>
    <input type="checkbox" :checked="vmodel" @change="$emit('change', $event.target.checked)" />
    <span class="slider"></span>
  </label>

</template>

<script>
import inputBaseMixin from "./mixins/jb-v-mixin-input-base";

export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props:{
    checked: Boolean,
  },
  data(){return{
    vmodel: this.checked
  }},
  watch: {
    checked(v){
      this.vmodel = v
    },
  },
}
</script>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    height: 16px;
}
.switch span:not(.slider) {
    position: relative;
    top: -2px;
    cursor: pointer;
}
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.switch .slider {
    position: absolute;
    cursor: pointer;
    width: 42px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background-color: #dee2e6;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}
.switch .slider:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: -1px;
    bottom: -4px;
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

</style>
