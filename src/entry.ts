import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import Tatoe from './objects/Tatoe';
import AnimationController from './objects/AnimationController';
import TWEEN from '@tweenjs/tween.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xB7BC9B, 1);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Stats
const stats = Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const tatoe = new Tatoe();
scene.add(tatoe);

camera.zoom = 3;
camera.position.set(5, 2.5, 0);

const animationController = new AnimationController(tatoe, camera, renderer, window);

const tick = (): void => {
  requestAnimationFrame(tick);

  tatoe.update();
  TWEEN.update();

  renderer.render(scene, camera);

  controls.update();
  stats.update();
}
tick();

const windowResizeHanlder = (): void => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);
