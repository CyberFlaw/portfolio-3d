import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import Stats from "stats.js";

let size, camera, renderer, clock, scene, controls, light;
let matrixOffsetY = -10;
let matrixOffsetX = 10;
let cameraState = true;
let matrixState = false;
let knitState = false;
let contactState = false;
let stats, gui;

function setup() {
  const canvas = document.querySelector("#render");

  size = {
    width: window.innerWidth / 1.5,
    height: window.innerHeight,
  };

  camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 500);

  renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });

  scene = new THREE.Scene();

  clock = new THREE.Clock();

  light = new THREE.PointLight(0xe7ae46, 10);

  gui = new dat.GUI();
}

function init() {
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
  stats = new Stats();
  stats.showPanel(1);
  document.body.appendChild(stats.dom);

  // const cameraFolder = gui.addFolder("Camera");
  // cameraFolder.add(camera.position, "x", 0, 60);
  // cameraFolder.add(camera.position, "y", 0, 60);
  // cameraFolder.add(camera.position, "z", 0, 60);
  // cameraFolder.open();
}

function matrixInit() {
  const dimention = 14;
  const list = new Array(dimention * dimention * dimention);

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
        const voxelGeometry = new THREE.SphereBufferGeometry(0.2, 8, 8);
        const voxelMaterial = new THREE.MeshStandardMaterial({
          color: 0xe3c180,
        });
        const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);

        voxel.position.set(i, j, k);
        scene.add(voxel);

        list.push(voxel);
      }
    }
  }

  return list;
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  size.width = window.innerWidth;
  size.height = window.innerHeight;
});

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  camera.lookAt(matrixOffsetX, matrixOffsetY, 0);

  spinCamera(cameraState, elapsedTime);
  if (matrixState) spinMatrix(matrix, elapsedTime);
  if (knitState) knitCamera(elapsedTime);
  if (contactState) contactDrift(elapsedTime);

  stats.begin();
  stats.end();

  // controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

// Call stack

setup();
init();
const matrix = matrixInit();
animate();

// console.log(matrix);

// Helper functions

// camera movement
function spinCamera(wiggle, elapsedTime) {
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
}

function spinMatrix(list, elapsedTime) {
  list.forEach((voxel) => {
    voxel.position.set(
      voxel.position.x +
        Math.sin(Math.PI * elapsedTime) * voxel.position.y * 0.1,
      voxel.position.y +
        Math.sin(Math.PI * elapsedTime) * voxel.position.x * 0.1,
      voxel.position.z +
        Math.cos(Math.PI * elapsedTime) *
          (voxel.position.x + voxel.position.y) *
          0.1
    );
  });
}

function knitCamera(elapsedTime) {
  camera.position.set(
    35 * Math.tan((Math.PI / 8) * elapsedTime),
    35 * Math.cos((Math.PI / 8) * elapsedTime),
    35 * Math.sin((Math.PI / 8) * elapsedTime)
  );
}

function contactDrift(elapsedTime) {
  camera.position.set(
    35 * Math.tan((Math.PI / 8) * elapsedTime),
    100 * Math.sin((Math.PI / 8) * elapsedTime),
    35 * Math.cos((Math.PI / 8) * elapsedTime)
  );
}

// adding stars
const addRandomStars = () => {
  const starGeometry = new THREE.SphereBufferGeometry(0.1, 1, 1);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xe3c180 });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};
Array(100).fill().forEach(addRandomStars);

// changing animations
document.querySelector("#home-btn").addEventListener("click", () => {
  cameraState = !cameraState;
});

document.querySelector("#about-btn").addEventListener("click", () => {
  matrixState = !matrixState;
});

document.querySelector("#skills-btn").addEventListener("click", () => {
  knitState = !knitState;
});

document.querySelector("#contact-btn").addEventListener("click", () => {
  contactState = !contactState;
});
