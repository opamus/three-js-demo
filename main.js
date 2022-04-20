import './style.css';

import * as THREE from 'three';
import * as dat from 'dat.gui';

// Debug
const gui = new dat.GUI({ autoplace: false });
gui.domElement.id = 'gui';
gui_container.appendChild(gui.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Textures
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/normalmap.png');

// Canvas
const canvas = document.querySelector('#bg');

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Objects
const geometry = new THREE.SphereGeometry();

// Materials
const material = new THREE.MeshStandardMaterial({
  color: 0x55ada8,
});
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// ------- Lighting --------

// Light 1
const pointLight = new THREE.PointLight(0x4d7e91, 1);
pointLight.position.set(1.5, 1.65, -0.22);
pointLight.intensity = 1.9;
scene.add(pointLight);

const light1 = gui.addFolder('Light 1');

light1.add(pointLight.position, 'x').min(-6).max(6).step(0.01);
light1.add(pointLight.position, 'y').min(-3).max(3).step(0.01);
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01);
light1.add(pointLight, 'intensity').min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

// Light 2
const light2 = gui.addFolder('Light 2');
const pointLight2 = new THREE.PointLight(0x3e805d, 1);
pointLight2.position.set(-1.45, -1.75, 0.3);
pointLight2.intensity = 1.5;
scene.add(pointLight2);

light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLight2Helper);

// Camera
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10);
cameraFolder.open();

scene.add(camera);

// Animate

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = event => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};

document.addEventListener('mousemove', onDocumentMouseMove);

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  targetX = mouseX * 0.0005;
  targetY = mouseY * 0.0005;
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.2 * (targetY - sphere.rotation.x);
  sphere.rotation.z += 0.2 * (targetY - sphere.rotation.x);
  renderer.render(scene, camera);

  // When mouse is not active, animate itself
  window.requestAnimationFrame(animate);
};
animate();
