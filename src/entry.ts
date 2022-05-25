import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import Tatoe from './objects/Tatoe';
import AnimationController from './objects/AnimationController';
import TWEEN from '@tweenjs/tween.js';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xB7BC9B, 1);
document.body.appendChild(renderer.domElement);

// Stats
const stats = Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const tatoe = new Tatoe();
scene.add(tatoe);

camera.zoom = 2;
camera.position.set(10, 5, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const animationController = new AnimationController(tatoe, camera, controls, renderer, window);

const tick = () => {
  requestAnimationFrame(tick);

  tatoe.update();
  TWEEN.update();

  renderer.render(scene, camera);

  controls.update();
  stats.update();
}
tick();

const windowResizeHanlder = () => {
  const size = 3;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;
  renderer.setSize(width, height);
  camera.left = size * aspectRatio / -3;
  camera.right = size * aspectRatio / 3;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);
