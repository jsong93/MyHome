<template>
  <div><canvas id="canvas"></canvas></div>
</template>

<script>
import G3D from "g3d";
import dat from "dat.gui";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = document.getElementById("canvas");
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      canvas.width = clientWidth * devicePixelRatio;
      canvas.height = clientHeight * devicePixelRatio;
      canvas.style.width = clientWidth + "px";
      canvas.style.height = clientHeight - 5 + "px";
      const scene = this.main(canvas);
      this.controlRotateCamera(
        canvas,
        G3D.Engine.instance.currentScene.activeCamera
      );
    },
    main(canvas) {
      const engine = new G3D.Engine(canvas),
        scene = new G3D.Scene(engine),
        camera = new G3D.RotatePerspectiveCamera(scene);
      camera.alpha = 30;
      camera.beta = 30;
      camera.radius = 15;
      const light1 = new G3D.DirectionalLight(scene);
      light1.direction = { x: 1, y: 2, z: 3 };
      // 强度
      light1.intensity = 0.5;
      // 环境光
      const light2 = new G3D.AmbientLight(scene);
      light2.intensity = 0.5;
      // 坐标轴形状的线状网络体 场景，长度
      const coord = G3D.MeshBuilder.createCoordinate(scene, 10);

      const vertices = [
        0,
        1,
        2, // A
        0,
        0,
        2, // B
        1,
        1,
        2, // C
        1,
        0,
        2, // D
        1,
        1,
        2, // E
        1,
        0,
        2, // F
        1,
        1,
        0, // G
        1,
        0,
        0 // H
      ];
      const normals = [];
      const uvs = [];
      for (let i = 0; i < 8; i++) {
        if (i <= 3) {
          normals.push(0, 0, 1);
        } else {
          normals.push(1, 0, 0);
        }
        uvs.push(200, 2220);
      }
      const indices = [0, 1, 2, 1, 3, 2, 4, 5, 7, 7, 6, 4];

      const mesh = new G3D.Mesh(scene);
    // const mesh = G3D.MeshBuilder.createPlane(scene);
      mesh.geometry = new G3D.Geometry({
        vertices,
        normals,
        uvs,
        indices: {
          default: indices
        }
        ,
        // 两面
        facing:G3D.Geometry.FACING.BOTH
      });

      function render() {
        scene.render();
        requestAnimationFrame(render);
      }
      render();
    },
    controlRotateCamera(canvas, camera) {
      function clamp(min, max, v) {
        return v < min ? min : v > max ? max : v;
      }
      var isDragging = false,
        lx = null,
        ly = null,
        r = 0,
        radius = camera.radius;
      function start() {
        isDragging = true;
      }
      function end() {
        isDragging = false;
        lx = ly = null;
      }
      function move(x, y) {
        if (!isDragging) {
          return;
        }
        if (lx === null) {
          lx = x;
          ly = y;
        } else {
          camera.alpha += (x - lx) / 5;
          camera.beta = clamp(-90, 90, camera.beta - (y - ly) / 5);
          lx = x;
          ly = y;
        }
      }
      function wheel(deltaY) {
        r += deltaY / 100;
        r = clamp(-1, 1, r);
        camera.radius = radius * (1 + r * 0.6);
      }
      canvas.addEventListener("mousedown", start);
      canvas.addEventListener("mouseup", end);
      canvas.addEventListener("mousemove", function(e) {
        move(e.offsetX, e.offsetY);
      });
      canvas.addEventListener("touchstart", start);
      canvas.addEventListener("touchend", end);
      canvas.addEventListener("touchmove", function(e) {
        move(e.touches[0].screenX, e.touches[0].screenY);
      });
    }
  }
};
</script>

<style></style>
