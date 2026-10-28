import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const pointLight = new THREE.PointLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight, ambientLight);

const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, wireframe: true });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

const earthOrbit = new THREE.Object3D();

const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x000066, wireframe: true });
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.position.x = 2;
earthOrbit.add(earthMesh);

const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.x = 0.7;
earthMesh.add(moonMesh);

scene.add(earthOrbit);

const marsOrbit = new THREE.Object3D();

const marsGeometry = new THREE.SphereGeometry(0.35, 32, 32);
const marsMaterial = new THREE.MeshStandardMaterial({ color: 0xcc3300, wireframe: true });
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
marsMesh.position.x = 3.5;
marsOrbit.add(marsMesh);

const phobosGeometry = new THREE.SphereGeometry(0.06, 16, 16);
const phobosMaterial = new THREE.MeshStandardMaterial({ color: 0xaa9988 });
const phobosMesh = new THREE.Mesh(phobosGeometry, phobosMaterial);
phobosMesh.position.x = 0.55;
marsMesh.add(phobosMesh);

scene.add(marsOrbit);

camera.position.set(0, 3, 7);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('scene').appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    sunMesh.rotation.y += 0.01;
    earthOrbit.rotation.y += 0.01;
    earthMesh.rotation.y += 0.02;
    marsOrbit.rotation.y += 0.006;
    marsMesh.rotation.y += 0.035;
    renderer.render(scene, camera);
}
animate();
