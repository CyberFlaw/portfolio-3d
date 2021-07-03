import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Debug
import Stats from "stats.js";
// import * as dat from "dat.gui";

import earthBump from "../assets/normalmaps/earth.jpg";
import earthColor from "../assets/texturemaps/earth.jpg";

// const gui = new dat.GUI();
const canvas = document.querySelector("#render");

const textureLoader = new THREE.TextureLoader();
const normalMap = textureLoader.load(earthBump);
const colorMap = textureLoader.load(earthColor);

const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();

const earthGeo = new THREE.SphereBufferGeometry(0.5, 36, 36);
const earthMaterial = new THREE.MeshStandardMaterial();
earthMaterial.roughness = 1;
earthMaterial.metalness = 1;
earthMaterial.normalMap = normalMap;
earthMaterial.map = colorMap;

earthMaterial.color = new THREE.Color(0xf4f1c9);

const earth = new THREE.Mesh(earthGeo, earthMaterial);
scene.add(earth);
earth.rotation.set(Math.PI / 8, Math.PI + Math.PI / 12, 0);

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

Array(200).fill().forEach(addRandomStars);

// Setting up 10 PointLights around The Earth
for (let i = 0; i < 10; i++) {
  const light = new THREE.PointLight(0xf2ebb3, 2);
  light.position.set(0.7 * Math.cos(36 * i), 0.7 * Math.sin(36 * i), 0.1);
  light.castShadow = true;
  scene.add(light);

  // const lightHelper1 = new THREE.PointLightHelper(light, 1);
  // scene.add(lightHelper1);
}

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  (size.width = window.innerWidth), (size.height = window.innerHeight);
});

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.set(0, 0, 1.5);

scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  earth.rotation.y = elapsedTime / 3;

  // controls.update();

  stats.begin();
  stats.end();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
