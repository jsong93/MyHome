<template>
  <div>
    <div id="container">
      <page1 class="page"></page1>
      <page2 class="page"></page2>
      <page3 class="page"></page3>
    </div>
    <div id="menu">
      <button id="table">table</button>
      <!-- <button id="sphere">SPHERE</button> -->
      <button id="helix">ratation</button>
      <button id="left">left</button>
      <button id="right">right</button>
      <!-- <button id="grid">GRID</button> -->
    </div>
  </div>
</template>

<script>
import * as THREE from "three/build/three.module.js";
// import THREE from "three.module.js";
import TWEEN from "tween.js";
// import { CSS3DObject, CSS3DRenderer } from "three-css3drenderer";
import { CSS3DObject, CSS3DRenderer } from "@/libs/CSS3DRenderer";
import articlelist from "@/components/article-list";
import blog from "@/components/blog";
import page1 from "@/components/page/page1";
import page2 from "@/components/page/page2";
import page3 from "@/components/page/page3";

// import TrackballControls from "three-trackballcontrols";
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      objects: [],
      middle_r: 1,
      middle_t: 1,
      targets: { table: [], helix: [], scale: [] },
      //   table: [
      //     "H",
      //     "Hydrogen",
      //     "1.00794",
      //     1,
      //     1,
      //     "He",
      //     "Helium",
      //     "4.002602",
      //     2,
      //     1
      //   ]
      width: 700,
      height: 600,
      // 10 7
      table: [
        { x: 0, y: 0, w: 1, h: 1 },
        { x: 1, y: 1, w: 2.8, h: 2.1 },
        { x: 0, y: 1, w: 1, h: 1 }
      ]
    };
  },
  components: {
    articlelist,
    blog,
    page1,
    page2,
    page3
  },
  created() {},
  mounted() {
    this.init();
    this.animate();
  },
  destroyed() {},
  methods: {
    init() {
      const _this = this;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      // this.camera.position.x = 1000;
      this.camera.position.z = 3000;
      this.targets.table = [];
      // table
      for (var i = 0; i < this.table.length; i++) {
        const element = document.querySelectorAll(".page")[i],
          object = new CSS3DObject(element);
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;

        this.scene.add(object);
        this.objects.push(object);

        this.tableModel(i);
        // // 3d 对象 容器
        // const object2 = new THREE.Object3D();
        // object2.position.x =
        //   this.table[i].x * (this.width + 50) +
        //   ((this.table[i].w - 1) * this.width) / 2 -
        //   800;
        // object2.position.y =
        //   this.table[i].y * (this.height + 50) -
        //   ((this.table[i].h - 1) * this.height) / 2 -
        //   400;
        // // object2.position.x = this.table[i].x * (this.width + 50);
        // // object2.position.y = this.table[i].y * (this.height + 50) - 1200;

        // //  object2.position.x = this.table[i].w * 440 ;
        // // object2.position.y = -(this.table[i].h * 180) + 990;
        // // object2.position.z = -3000;
        // object2.scale.x = this.table[i].w;
        // object2.scale.y = this.table[i].h;
        // this.targets.table.push(object2);
      }
      // sphere球体  vector矢量

      this.rotationModel();

      // 3d渲染css
      this.renderer = new CSS3DRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document
        .getElementById("container")
        .appendChild(this.renderer.domElement);
      // 轨迹控制
      // this.controls = new TrackballControls(
      //   this.camera,
      //   this.renderer.domElement
      // );
      // this.controls.minDistance = 500;
      // this.controls.maxDistance = 6000;
      // this.controls.addEventListener("rotation", this.render);
      var button = document.getElementById("table");
      button.addEventListener(
        "click",
        () => {
          _this.targets.table = [];
          for (let i = 0; i < this.objects.length; i++) {
            _this.tableModel(i);
          }
          _this.transform(_this.targets.table, 3000);
        },
        false
      );
      // var button = document.getElementById("sphere");
      // button.addEventListener(
      //   "click",
      //   () => {
      //     _this.transform(_this.targets.sphere, 2000);
      //   },
      //   false
      // );
      var button = document.getElementById("helix");
      button.addEventListener(
        "click",
        () => {
          _this.transform(_this.targets.helix, 3000);
        },
        false
      );
      var button = document.getElementById("left");
      button.addEventListener(
        "click",
        () => {
          if (_this.middle_r > 1) {
            return;
          }
          _this.centerPage(++_this.middle_r);
          _this.middle_t++;
          _this.rotationModel();
          _this.transform(_this.targets.helix, 3000);
        },
        false
      );
      var button = document.getElementById("right");
      button.addEventListener(
        "click",
        () => {
          if (_this.middle_r < 1) {
            return;
          }
          _this.centerPage(--_this.middle_r);
          _this.middle_t--;
          _this.rotationModel();
          _this.transform(_this.targets.helix, 3000);
        },
        false
      );
      // var button = document.getElementById("grid");
      // button.addEventListener(
      //   "click",
      //   () => {
      //     _this.transform(_this.targets.grid, 2000);
      //   },
      //   false
      // );
      this.transform(this.targets.table, 2000);
      //
      window.addEventListener("resize", this.onWindowResize, false);
    },
    rotationModel() {
      // element.style.width = this.width + "px";
      // element.style.height = this.height + "px";
      const vector2 = new THREE.Vector3();
      if (this.targets.helix.length) {
        this.targets.helix = [];
      }
      for (let i = 0, l = this.objects.length; i < l; i++) {
        // var theta = i * 0.175 + Math.PI;

        const theta = (i - this.middle_r) * 0.78,
          y = 200,
          object = new THREE.Object3D();
        // Cylindrical圆柱
        // this.setFromCylindricalCoords.call(object.position, 900, theta, y);
        object.position.setFromCylindricalCoords(1000, theta, y);
        // object.position.x = 900 * Math.sin(theta);
        // object.position.y = y;
        // object.position.z = 900 * Math.cos(theta);
        // vector2.x = object.position.x * 2;
        // vector2.y = object.position.y;
        // vector2.z = object.position.z * 2;
        vector2.x = 900 * Math.sin(theta) * 2;
        vector2.y = object.position.y;
        vector2.z = 900 * Math.cos(theta) * 2;
        object.lookAt(vector2);
        this.targets.helix.push(object);
      }
    },
    tableModel(i) {
      const object2 = new THREE.Object3D();
      object2.position.x =
        this.table[i].x * (this.width + 50) +
        ((this.table[i].w - 1) * this.width) / 2 -
        800;
      object2.position.y =
        this.table[i].y * (this.height + 50) -
        ((this.table[i].h - 1) * this.height) / 2 -
        400;
      object2.scale.x = this.table[i].w;
      object2.scale.y = this.table[i].h;
      this.targets.table.push(object2);
    },
    centerPage(i) {
      const temp = this.table[i];
      this.table[i] = this.table[this.middle_t];
      this.table[this.middle_t] = temp;
    },
    transform(targets, duration) {
      TWEEN.removeAll();
      for (let i = 0; i < this.objects.length; i++) {
        const object = this.objects[i],
          target = targets[i];
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z
            },
            duration
          )
          // 指数
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z
            },
            duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        new TWEEN.Tween(object.scale)
          .to(
            { x: target.scale.x, y: target.scale.y, z: target.scale.z },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      }

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start();
      // this.render()
    },
    onWindowResize() {
      // 方向
      this.camera.aspect = window.innerWidth / window.innerHeight;
      // 矩阵
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.render();
    },
    animate() {
      requestAnimationFrame(this.animate);
      TWEEN.update();
      // this.controls.update();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    }

    // setFromSphericalCoords(radius, phi, theta) {
    //   var sinPhiRadius = Math.sin(phi) * radius;

    //   this.x = sinPhiRadius * Math.sin(theta);
    //   this.y = Math.cos(phi) * radius;
    //   this.z = sinPhiRadius * Math.cos(theta);

    //   return this;
    // },

    // setFromCylindricalCoords: function(radius, theta, y) {
    //   this.x = radius * Math.sin(theta);
    //   this.y = y;
    //   this.z = radius * Math.cos(theta);

    //   return this;
    // }
  }
};
</script>
<style>
a {
  color: #8ff;
}

#menu {
  position: absolute;
  top: 80px;
  /* bottom: 20px; */
  width: 100%;
  text-align: right;
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

button {
  color: rgba(127, 255, 255, 0.75);
  background: transparent;
  outline: 1px solid rgba(127, 255, 255, 0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 255, 255, 0.5);
}

button:active {
  color: #000000;
  background-color: rgba(0, 255, 255, 0.75);
}
.page {
  width: 700px;
  height: 600px;
  background-color: #8ff;
}
</style>
