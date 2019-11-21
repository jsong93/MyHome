<template>
  <div></div>
</template>

<script>
import THREE from "three.js";
import TWEEN from "tween.js"
export default {
  data() {
    return {
        camera:null,
        scene:null,
        renderer:null,
        controls:null,
        objects = [],
        targets = {table:[],sphere:[],helix:[],grid:[]}
    };
  },
  created() {},
  mounted() {

  },
  destroyed() {},
  methods:{
      init(){
          this.scene = new THREE.Scene()
          this.camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,10000)
      }
  }
};
</script>

<style></style>
