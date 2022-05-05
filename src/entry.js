/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, OrthographicCamera, Scene, Vector3 } from 'three';
import TatoeScene from './objects/Scene.js';
import Animation from './objects/Animation.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new Scene();
const camera = new OrthographicCamera();
const renderer = new WebGLRenderer({antialias: true});
const tatoeScene = new TatoeScene();
const controls = new OrbitControls(camera, renderer.domElement);
const animation = new Animation();

// load state
window.objectsLoaded = 0;

// scene
scene.add(tatoeScene);

// camera
camera.position.set(1,1,1);
camera.zoom = 1.5;
camera.lookAt(new Vector3(0,0,0));

// orbit contolls
controls.update();

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xB7BC9B, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  tatoeScene.update && tatoeScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
  controls.update();
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
document.body.appendChild( renderer.domElement );
