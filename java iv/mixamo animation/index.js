import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1.5, 3);
camera.lookAt(0, 1, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// The AnimationMixer plays the animation clips that come with the model.
let mixer;
const clock = new THREE.Clock();

// Load an animated character exported from Mixamo (.fbx).
const loader = new FBXLoader();
loader.load('Capoeira.fbx', function (model) {
    // Mixamo models are very large, so we scale them down to a human size.
    model.scale.setScalar(0.01);
    scene.add(model);

    // Play the first (and only) animation clip.
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(model.animations[0]).play();
});

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('scene').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    controls.update();
    renderer.render(scene, camera);
}
animate();
