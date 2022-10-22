import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";
// import Stats from "stats.js";

let size, camera, renderer, clock, scene, controls, light;
let matrixOffsetY = -5;
let matrixOffsetX = 10;
let state = true;
// let stats, gui;

function setup() {
  const canvas = document.querySelector("#render");

  size = {
    width: window.innerWidth / 1.5,
    height: window.innerHeight,
  };

  camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);

  renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });

  scene = new THREE.Scene();

  clock = new THREE.Clock();

  light = new THREE.PointLight(0x9c9c59, 10);

  // gui = new dat.GUI();
}

function init() {
  // camera.position.set(0, 0, 0);
  camera.position.set(35 + matrixOffsetX, 35, 35);
  camera.lookAt(matrixOffsetX, matrixOffsetY, 0);

  light.position.set(0, 0, -15);
  light.castShadow = true;

  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.enabled = true;

  scene.add(camera);
  scene.add(light);
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // stats = new Stats();
  // stats.showPanel(1);
  // document.body.appendChild(stats.dom);

  // const cameraFolder = gui.addFolder("Camera");
  // cameraFolder.add(camera.position, "x", 0, 60);
  // cameraFolder.add(camera.position, "y", 0, 60);
  // cameraFolder.add(camera.position, "z", 0, 60);
  // cameraFolder.open();
}

function matrixInit() {
  const dimention = 16;

  for (
    let i = -(dimention / 2) + matrixOffsetX;
    i < dimention / 2 + matrixOffsetX;
    i++
  ) {
    for (
      let j = -(dimention / 2) + matrixOffsetY;
      j < dimention / 2 + matrixOffsetY;
      j++
    ) {
      for (let k = -(dimention / 2); k < dimention / 2; k++) {
        const voxelGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const voxelMaterial = new THREE.MeshStandardMaterial({
          color: 0xe3c180,
        });
        const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);

        voxel.position.set(i, j, k);
        scene.add(voxel);
      }
    }
  }
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  size.width = window.innerWidth;
  size.height = window.innerHeight;
});

const animate = () => {
  camera.lookAt(matrixOffsetX, matrixOffsetY, 0);
  spinCamera(state);

  // stats.begin();
  // stats.end();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

// Call stack

setup();
init();
matrixInit();
animate();

// Helper functions

// camera movement
function spinCamera(wiggle) {
  const elapsedTime = clock.getElapsedTime();

  if (wiggle === true) {
    camera.position.set(
      35 + Math.cos(Math.PI * elapsedTime),
      35,
      35 + Math.sin(Math.PI * elapsedTime)
    );
  } else {
    camera.position.set(
      35 * Math.cos((Math.PI / 8) * elapsedTime),
      35,
      35 * Math.sin((Math.PI / 8) * elapsedTime)
    );
  }

  // controls.update();
}

// adding stars
const addRandomStars = () => {
  const starGeometry = new THREE.SphereBufferGeometry(0.1, 13, 13);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xfaec84 });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};
Array(100).fill().forEach(addRandomStars);

// changing animations
document.querySelector("#home").addEventListener("click", () => {
  state = !state;
});
