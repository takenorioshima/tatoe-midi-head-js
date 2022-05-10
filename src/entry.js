/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, Scene } from 'three';
import TatoeScene from './objects/Scene';
import Camera from './objects/Camera';
import Animation from './objects/Animation';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new Scene();
const camera = new Camera();
const renderer = new WebGLRenderer({ antialias: true });
const tatoeScene = new TatoeScene();
const controls = new OrbitControls(camera, renderer.domElement);
const animation = new Animation(tatoeScene, camera, renderer);

// Stats
const stats = new Stats();
stats.showPanel(0);

// load state
window.objectsLoaded = 0;
window.take = null;
window.eri = null;

// scene
scene.add(tatoeScene);

// orbit controls
controls.update();

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xB7BC9B, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  TWEEN.update();
  stats.update();
  renderer.render(scene, camera);
  tatoeScene.update && tatoeScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
  controls.update();
  if (window.objectsLoaded >= 2) {
    animation.init(scene);
  }
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const size = 2;
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  const aspect = innerWidth / innerHeight;
  camera.left = size * aspect / -2;
  camera.right = size * aspect / 2;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.dom);
