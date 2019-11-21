<template>
  <div><canvas id="canvas"></canvas></div>
</template>

<script>
import G3D from "g3d";
import dat from "dat.gui";
import jsong from "./jsong.jpg";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    var loader = (function () {
      function request(url, callback, type) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status === 200) { callback(xmlhttp.response); }
        };
        xmlhttp.open('GET', url, true);
        if (type) { xmlhttp.responseType = type; }
        xmlhttp.send();
      }
      function loadBlob(url, callback) { request(url, callback, 'arraybuffer'); }
      function loadText(url, callback) { request(url, callback); }
      function loadImage(url, callback) {
        var image = new Image(); image.onload = function () { callback(image); };
        image.crossOrigin = true; image.src = url;
      }
      function queue(load) {
        return function loadQueue(collection, callback) {
          if (Array.isArray(collection)) {
            var i = collection.length;
            var res = [];
            collection.forEach(function (item, index) {
              load(item, function (data) {
                i--; res[index] = data;
                if (i === 0) { callback(res); }
              })
            })
          } else {
            var keys = Object.keys(collection), map = {};
            loadQueue(keys.map(function (k) { return collection[k] }), function (res) {
              res.forEach(function (data, i) { map[keys[i]] = data; }); callback(map);
            });
          }
        }
      }
      var loadImageQueue = queue(loadImage);
      var loadTextQueue = queue(loadText);
      return {
        loadText: loadText, loadImage: loadImage, loadBlob: loadBlob,
        loadImageQueue: loadImageQueue, loadTextQueue: loadTextQueue
      };
    })();
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

      const mesh = new G3D.Mesh(scene);
      mesh.geometry = new G3D.Geometry({
        vertices: [
          -1,
          -1,
          0, // A
          1,
          -1,
          0, // B
          1,
          1,
          0, // C
          -1,
          1,
          0 // D
        ],
        normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        uvs: [
          0,
          0, // A
          1,
          0, // B
          1,
          1, // C
          0,
          1 // D
        ],
        indices: {
          default: [0, 1, 2, 0, 2, 3]
        }
      });

      const rMtl = new G3D.RawMaterial();
      rMtl.color = { r: 200, g: 100, b: 100 };
      mesh.materials.default = rMtl;

      const data = {
        texture: false
      };
      const gui = new dat.GUI();
      gui.add(rMtl.color, "r", 0, 255);
      gui.add(rMtl.color, "g", 0, 255);
      gui.add(rMtl.color, "b", 0, 255);
      var image = new Image();
      //  image.onload = function () { callback(image); };
      image.crossOrigin = true;
      image.src = jsong;
      rMtl.texture = new G3D.Texture({ image });
      // loader.loadImage(
      //   '//img.alicdn.com/tfs/TB11aE5XKSSBuNjy0FlXXbBpVXa-256-256.png',
      //   function(image){
      // const texture = new G3D.Texture({ image });
      // gui.add(data, "texture").onChange(function() {
      //   if (data.texture === true) {
      //     rMtl.texture = texture;
      //   } else {
      //     rMtl.texture = null;
      //   }
      // });
      //   }
      // );

      function render() {
        scene.render();
        requestAnimationFrame(render);
      }
      render();
    },
    createMeshes(scene) {
      const v1 = [
          1,
          0,
          0, // a
          1,
          1,
          0 // b
        ],
        i1 = [0, 1],
        m1 = new G3D.LineMesh(scene);
      m1.geometry = new G3D.LineGeometry({
        vertices: v1,
        intensity: { default: i1 }
      });

      const v2 = [
        0,
        0,
        1, // C
        0,
        1,
        1 // D
      ];
      const i2 = [0, 1],
        m2 = new G3D.LineMesh(scene);
      m2.geometry = new G3D.LineGeometry({
        vertices: v2,
        indices: { default: i2 }
      });

      return [m1, m2];
    },

    createMeshesBuffers(scene) {
      const v1 = [
          1,
          0,
          0, // a
          1,
          1,
          0 // b
        ],
        v1Buffer = new G3D.Buffer({
          // Float32Array 平台字节顺序为32位的浮点数型数组
          data: new Float32Array(v1)
        }),
        v1BufferView = new G3D.BufferView({ buffer: v1Buffer }),
        i1 = [0, 1],
        // Uint32Array表示一个由基于平台字节序的32位无符号字节组成的数组
        i1Buffer = new G3D.ElementBuffer({ data: new Uint32Array(i1) }),
        i1BufferView = new G3D.ElementBufferView({
          buffer: i1Buffer,
          mode: "LINES",
          count: 2
        }),
        m1 = new G3D.LineMesh(scene);
      m1.geometry = new G3D.LineGeometry({
        vertices: v1BufferView,
        indices: { default: i1BufferView }
      });

      const v2 = [
          0,
          0,
          1, // C
          0,
          1,
          1 // D
        ],
        v2Buffer = new G3D.Buffer({
          data: new Float32Array(v2)
        }),
        v2BufferView = new G3D.BufferView({
          buffer: v2Buffer
        }),
        i2 = [0, 1],
        i2Buffer = new G3D.ElementBuffer({
          data: new Uint32Array(i2)
        }),
        i2BufferView = new G3D.ElementBufferView({
          buffer: i2Buffer,
          mode: "LINES",
          count: 2
        }),
        m2 = new G3D.LineMesh(scene);
      m2.geometry = new G3D.LineGeometry({
        vertices: v2BufferView,
        indices: { default: i2BufferView }
      });

      return [m1, m2];
    },

    createMeshesSharedBuffers(scene) {
      const v = [
        1,
        0,
        0, // A
        1,
        1,
        0, // B
        0,
        0,
        1, // C
        0,
        1,
        1 // D
      ];
      const vBuffer = new G3D.Buffer({
        data: new Float32Array(v)
      });
      const vBufferView = new G3D.BufferView({
        buffer: vBuffer
      });
      const i = [0, 1, 2, 3];
      const iBuffer = new G3D.ElementBuffer({
        data: new Uint32Array(i)
      });

      const iBufferView1 = new G3D.ElementBufferView({
        buffer: iBuffer,
        mode: "LINES",
        count: 2
      });
      const iBufferView2 = new G3D.ElementBufferView({
        buffer: iBuffer,
        mode: "LINES",
        byteOffset: 4 * 2,
        count: 2
      });

      const m1 = new G3D.LineMesh(scene);
      m1.geometry = new G3D.LineGeometry({
        vertices: vBufferView,
        indices: { default: iBufferView1 }
      });

      const m2 = new G3D.LineMesh(scene);
      m2.geometry = new G3D.LineGeometry({
        vertices: vBufferView,
        indices: { default: iBufferView2 }
      });

      return [m1, m2];
    },

    createMeshesSharedBuffersSO(scene) {
      const v = [
        99,
        99,
        1,
        0,
        0,
        99, // A
        1,
        1,
        0,
        99, // B
        0,
        0,
        1,
        99, // C
        0,
        1,
        1,
        99 // D
      ];
      const vBuffer = new G3D.Buffer({
        data: new Float32Array(v)
      });
      const vBufferView = new G3D.BufferView({
        buffer: vBuffer,
        byteOffset: 4 * 2,
        byteStride: 4 * 4
      });
      const i = [0, 1, 2, 3];
      const iBuffer = new G3D.ElementBuffer({
        data: new Uint32Array(i)
      });

      const iBufferView1 = new G3D.ElementBufferView({
        buffer: iBuffer,
        mode: "LINES",
        count: 2
      });
      const iBufferView2 = new G3D.ElementBufferView({
        buffer: iBuffer,
        mode: "LINES",
        byteOffset: 4 * 2,
        count: 2
      });

      const m1 = new G3D.LineMesh(scene);
      m1.geometry = new G3D.LineGeometry({
        vertices: vBufferView,
        indices: { default: iBufferView1 }
      });

      const m2 = new G3D.LineMesh(scene);
      m2.geometry = new G3D.LineGeometry({
        vertices: vBufferView,
        indices: { default: iBufferView2 }
      });

      return [m1, m2];
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
