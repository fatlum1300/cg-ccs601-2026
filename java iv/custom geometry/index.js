import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

camera.position.z = 3;

const geometry = new THREE.BufferGeometry();
 
const positions = new Float32Array([
   0, 0, 0,   // kulmi 0
   1, 0, 0,   // kulmi 1
   0, 1, 0,   // kulmi 2
]);
geometry.setAttribute('position',
   new THREE.BufferAttribute(positions, 3)); // 3 për kulm
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.AmbientLight(0xffffff, 0.6); 

scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('scene').appendChild(renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();