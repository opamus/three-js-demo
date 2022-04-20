import './style.css';

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

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

// Lighting
// const light = new THREE.AmbientLight(0x008000); // soft white light
// scene.add(light);

const pointLight = new THREE.PointLight(0x55ada8, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();
