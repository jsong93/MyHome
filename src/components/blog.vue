<template>
  <three2></three2>
</template>

<script>
// import G3D from "g3d";
import g3d1 from "@/components/g3d/start1";
import g3d2 from "@/components/g3d/rotation";
import g3d3 from "@/components/g3d/Coordinate1";
import g3d4 from "@/components/g3d/Coordinate2";
import g3d5 from "@/components/g3d/buffer";
import g3d6 from "@/components/g3d/mesh";
import g3d7 from "@/components/g3d/cube";
import three from "@/components/three/rotation"
import three2 from "@/components/three/rotation2"
export default {
  components: {
    g3d1,
    g3d2,
    g3d3,
    g3d4,
    g3d5,
    g3d6,
    g3d7,
    three,
    three2
  }
  // data() {
  //   return {
  //     engine: null
  //   };
  // },
  // created() {},
  // mounted() {
  //   document.body.onload = () => {
  //     this.init();
  //   };
  // },
  // methods: {
  //   init() {
  //     const canvas = document.getElementById("canvas"),
  //       clientWidth = document.documentElement.clientWidth,
  //       clientHeight = document.documentElement.clientHeight;
  //     // 该 Window 属性 devicePixelRatio 能够返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率
  //     canvas.width = clientWidth * devicePixelRatio;
  //     canvas.height = clientHeight * devicePixelRatio;
  //     canvas.style.width = clientWidth / 4 + "px";
  //     canvas.style.height = clientHeight / 4 + "px";
  //     const scene = this.main(canvas);
  //     this.controlRotateCamera(
  //       canvas,
  //       G3D.Engine.instance.currentScene.activeCamera
  //     );
  //   },
  //   main(canvas) {
  //     // 引擎
  //     this.engine = this.engine ? this.engine : new G3D.Engine(canvas);
  //     // 场景
  //     const scene = new G3D.Scene(this.engine),
  //       //透视相机
  //       camera = new G3D.RotatePerspectiveCamera(scene);
  //     camera.alpha = 45;
  //     camera.beta = 30;
  //     camera.redius = 20;
  //     // 平行光
  //     const light1 = new G3D.DirectionalLight(scene);
  //     // 颜色
  //     light1.color = { r: 255, g: 200, b: 200 };
  //     // 方向
  //     light1.direction = { x: 1, y: 0, z: 1 };
  //     // 亮度
  //     light1.intensity = 0.8;
  //     // 通过不同方式创建各种网格体的工厂函数集合 每一个方法返回一个创建好的网格体 scene ,x,y
  //     const m1 = G3D.MeshBuilder.createPlane(scene, 60, 4);
  //     m1.position.z = -4;
  //     const m2 = G3D.MeshBuilder.createSphere(scene, 1);
  //     m2.position.z = 4;
  //     function render() {
  //       scene.render();
  //       requestAnimationFrame(render);
  //     }
  //     render();
  //   },
  //   controlRotateCamera(canvas, camera) {
  //     function clamp(min, max, v) {
  //       return v < min ? min : v > max ? max : v;
  //     }
  //     var isDragging = false,
  //       lx = null,
  //       ly = null,
  //       r = 0,
  //       radius = camera.radius;
  //     function start() {
  //       isDragging = true;
  //     }
  //     function end() {
  //       isDragging = false;
  //       lx = ly = null;
  //     }
  //     function move(x, y) {
  //       if (!isDragging) {
  //         return;
  //       }
  //       if (lx === null) {
  //         lx = x;
  //         ly = y;
  //       } else {
  //         camera.alpha += (x - lx) / 5;
  //         camera.beta = clamp(-90, 90, camera.beta - (y - ly) / 5);
  //         lx = x;
  //         ly = y;
  //       }
  //     }
  //     function wheel(deltaY) {
  //       r += deltaY / 100;
  //       r = clamp(-1, 1, r);
  //       camera.radius = radius * (1 + r * 0.6);
  //     }
  //     canvas.addEventListener("mousedown", start);
  //     canvas.addEventListener("mouseup", end);
  //     canvas.addEventListener("mousemove", function(e) {
  //       move(e.offsetX, e.offsetY);
  //     });
  //     canvas.addEventListener("touchstart", start);
  //     canvas.addEventListener("touchend", end);
  //     canvas.addEventListener("touchmove", function(e) {
  //       move(e.touches[0].screenX, e.touches[0].screenY);
  //     });
  //   },
};
</script>

<style></style>
