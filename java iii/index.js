import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(8, 6, 12);
camera.lookAt(0, 3, 0);

const armMaterial = new THREE.MeshStandardMaterial({color: 0x3399ff});
const jointMaterial = new THREE.MeshStandardMaterial({color: 0x555555});
const handMaterial = new THREE.MeshStandardMaterial({color: 0xffaa55});

const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32);
const base = new THREE.Mesh(baseGeometry, jointMaterial);
scene.add(base);

const shoulder = new THREE.Group();
shoulder.position.y = 0.5;
base.add(shoulder);

const shoulderJoint = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), jointMaterial);
shoulder.add(shoulderJoint);

const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 3, 0.7), armMaterial);
upperArm.position.y = 1.5;
shoulder.add(upperArm);

const elbow = new THREE.Group();
elbow.position.y = 3;
shoulder.add(elbow);

const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), jointMaterial);
elbow.add(elbowJoint);

const forearm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.5, 0.6), armMaterial);
forearm.position.y = 1.25;
elbow.add(forearm);

const wrist = new THREE.Group();
wrist.position.y = 2.5;
elbow.add(wrist);

const wristJoint = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), jointMaterial);
wrist.add(wristJoint);

const palm = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.5, 0.4), handMaterial);
palm.position.y = 0.9;
wrist.add(palm);

const normalColor = 0xffcc88;
const selectedColor = 0xff5533;
const maxCurl = THREE.MathUtils.degToRad(100);
const fingers = [];
let selected = 0;

function addFinger(width, length, x, y, tilt) {
    const mount = new THREE.Group();
    mount.position.set(x, y, 0);
    mount.rotation.z = THREE.MathUtils.degToRad(tilt);
    palm.add(mount);

    const joint = new THREE.Group();
    mount.add(joint);

    const material = new THREE.MeshStandardMaterial({color: normalColor});
    const finger = new THREE.Mesh(new THREE.BoxGeometry(width, length, width), material);
    finger.position.y = length / 2;
    joint.add(finger);

    fingers.push({ joint: joint, material: material });
}

addFinger(0.32, 0.85, -0.9, -0.1, 75);
addFinger(0.28, 1.3, -0.6, 0.75, 0);
addFinger(0.3, 1.6, -0.2, 0.75, 0);
addFinger(0.28, 1.4, 0.2, 0.75, 0);
addFinger(0.24, 1.0, 0.6, 0.75, 0);

function highlight() {
    fingers.forEach(function(finger, index) {
        finger.material.color.set(index === selected ? selectedColor : normalColor);
    });
}
highlight();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: 0xcccccc
    })
);

ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.25;
scene.add(ground);

const grid = new THREE.GridHelper(
    20,
    20
);
scene.add(grid);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.getElementById('scene').appendChild(renderer.domElement);

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.target.set(0, 3, 0);
controls.enableDamping = true;
controls.update();

shoulder.rotation.z = THREE.MathUtils.degToRad(-20);
elbow.rotation.z = THREE.MathUtils.degToRad(40);
wrist.rotation.z = THREE.MathUtils.degToRad(-20);

const rotationStep = THREE.MathUtils.degToRad(5);

function curl(finger, amount) {
    const next = finger.joint.rotation.x + amount;
    finger.joint.rotation.x = THREE.MathUtils.clamp(next, 0, maxCurl);
}

window.addEventListener('keydown', function(event) {

    const key = event.key.toLowerCase();

    if (key === 'q') {
        shoulder.rotation.z += rotationStep;
    }

    if (key === 'a') {
        shoulder.rotation.z -= rotationStep;
    }

    if (key === 'w') {
        elbow.rotation.z += rotationStep;
    }

    if (key === 's') {
        elbow.rotation.z -= rotationStep;
    }

    if (key === 'e') {
        wrist.rotation.z += rotationStep;
    }

    if (key === 'd') {
        wrist.rotation.z -= rotationStep;
    }

    if (key >= '1' && key <= '5') {
        selected = Number(key) - 1;
        highlight();
    }

    if (key === 'r') {
        curl(fingers[selected], rotationStep);
    }

    if (key === 'f') {
        curl(fingers[selected], -rotationStep);
    }

    if (key === 'c') {
        fingers.forEach(function(finger) {
            curl(finger, rotationStep);
        });
    }

    if (key === 'v') {
        fingers.forEach(function(finger) {
            curl(finger, -rotationStep);
        });
    }

});

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();
