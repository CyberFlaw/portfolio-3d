import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import Stats from "stats.js";

let size, camera, renderer, clock, scene, controls, light, stats, gui;

function setup() {
  const canvas = document.querySelector("#render");

  size = {
    width: window.innerWidth,
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

  gui = new dat.GUI();
}

function init() {
  camera.position.set(35, 35, 35);
  camera.lookAt(0, 0, 0);

  light.position.set(0, 0, -15);
  light.castShadow = true;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;

  stats = new Stats();
  stats.showPanel(1);
  document.body.appendChild(stats.dom);

  // const cameraFolder = gui.addFolder("Camera");
  // cameraFolder.add(camera.position, "x", 0, 60);
  // cameraFolder.add(camera.position, "y", 0, 60);
  // cameraFolder.add(camera.position, "z", 0, 60);
  // cameraFolder.open();
}

function matrix() {
  const dimention = 17;

  for (let i = -(dimention / 2); i < dimention / 2; i++) {
    for (let j = -(dimention / 2); j < dimention / 2; j++) {
      for (let k = -(dimention / 2); k < dimention / 2; k++) {
        const voxelGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const voxelMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
        });
        const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);

        voxel.position.set(i, j, k);
        scene.add(voxel);
      }
    }
  }
}

setup();
init();
matrix();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  size.width = window.innerWidth;
  size.height = window.innerHeight;
});

scene.add(camera);
scene.add(light);
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const animate = () => {
  spinCamera(true);

  controls.update();

  stats.begin();
  stats.end();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

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
}
