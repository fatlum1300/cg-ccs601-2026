import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9ed0f0);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 4, 8);

const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xe8d8b0 });
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xa83232 });
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6b3f1d });
const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x66ccff });
const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x7a4a3a });
const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x5a3a1a });
const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x2e8b3d });
const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x5fae4a });

const groundGeometry = new THREE.CylinderGeometry(7, 7, 0.4, 64);
const ground = new THREE.Mesh(groundGeometry, grassMaterial);
ground.position.y = -0.2;
scene.add(ground);

const wallGeometry = new THREE.CylinderGeometry(2, 2, 2.4, 4);
wallGeometry.rotateY(Math.PI / 4);
const walls = new THREE.Mesh(wallGeometry, wallMaterial);
walls.position.y = 1.2;
scene.add(walls);

const roofGeometry = new THREE.ConeGeometry(2.6, 1.8, 4);
roofGeometry.rotateY(Math.PI / 4);
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 2.4 + 0.9;
scene.add(roof);

const chimneyGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.2, 4);
chimneyGeometry.rotateY(Math.PI / 4);
const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
chimney.position.set(0.7, 3.4, -0.5);
scene.add(chimney);

const doorGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 4);
doorGeometry.rotateY(Math.PI / 4);
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.scale.set(1, 1, 0.1);
door.position.set(0, 0.75, 1.42);
scene.add(door);

const knobGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 16);
knobGeometry.rotateX(Math.PI / 2);
const knob = new THREE.Mesh(knobGeometry, roofMaterial);
knob.position.set(0.22, 0.75, 1.5);
scene.add(knob);

const windowGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 4);
windowGeometry.rotateY(Math.PI / 4);

const frontWindowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
frontWindowLeft.scale.set(1, 1, 0.1);
frontWindowLeft.position.set(-0.95, 1.5, 1.42);
scene.add(frontWindowLeft);

const frontWindowRight = new THREE.Mesh(windowGeometry, windowMaterial);
frontWindowRight.scale.set(1, 1, 0.1);
frontWindowRight.position.set(0.95, 1.5, 1.42);
scene.add(frontWindowRight);

const sideWindow = new THREE.Mesh(windowGeometry, windowMaterial);
sideWindow.scale.set(0.1, 1, 1);
sideWindow.position.set(1.42, 1.5, 0);
scene.add(sideWindow);

function addTree(x, z, scale) {
    const trunkGeometry = new THREE.CylinderGeometry(0.15, 0.2, 1, 16);
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5;

    const leavesGeometry = new THREE.ConeGeometry(0.8, 2, 16);
    const leaves = new THREE.Mesh(leavesGeometry, leafMaterial);
    leaves.position.y = 2;

    const tree = new THREE.Group();
    tree.add(trunk, leaves);
    tree.position.set(x, 0, z);
    tree.scale.setScalar(scale);
    scene.add(tree);
}

addTree(-3.5, 1, 1);
addTree(-4.2, -2, 1.3);
addTree(3.8, -2.5, 0.9);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 6);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById('scene').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
