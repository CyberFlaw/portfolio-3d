import * as THREE from "three"

let size, camera, renderer, clock, scene;

function init() {
  const canvas = document.querySelector("#render");

  size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  
  camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    100
  );
  
  renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });

  scene = new THREE.Scene();
  clock = new THREE.Clock();
}

init();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  size.width = window.innerWidth;
  size.height = window.innerHeight;
});

camera.position.set(0, 0, 1.5);

scene.add(camera);
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const animate = () => {
  // const elapsedTime = clock.getElapsedTime();

  // controls.update();

  stats.begin();
  stats.end();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
