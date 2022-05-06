import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

export default class Animation {
  constructor(scene) {

    const initialEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    const durationBase = 100;
    let is_scene_rolling = false;

    document.addEventListener('keypress', onKeypressEvent, false);
    function onKeypressEvent(e) {
      console.log(e);
      if (window.take && window.eri) {
        if (e.code == 'Digit6') {
          rotate();
        }
        if (e.code == 'Digit7') {
          scale();
        }
        if (e.code == 'Digit0') {
          reset();
        }
      }
    }

    document.addEventListener('keydown', onKeydownEvent, false);
    function onKeydownEvent(e) {
      4
      if (window.take && window.eri) {
        if (e.code == 'Digit4') {
          scene.switchRotation(true)
        }
      }
    }

    function scale() {
      let randomA = Math.random() * 2;
      let randomB = Math.random() * 2;
      let randomC = Math.random() * 2;
      new TWEEN.Tween(take.scale).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
      new TWEEN.Tween(eri.scale).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
      console.log(window.eriScale);
    }

    function rotate() {
      let randomA = Math.random() * 3;
      let randomB = Math.random() * 3;
      let randomC = Math.random() * 3;
      new TWEEN.Tween(take.rotation).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
      new TWEEN.Tween(eri.rotation).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
    }

    function reset() {
      take.setRotationFromEuler(initialEuler);
      eri.setRotationFromEuler(initialEuler);
      take.scale.set(1, 1, 1);
      eri.scale.set(1, 1, 1);
    }

  }

  init(scene) {
    if (!window.take || !window.eri) {
      console.log('init');
      window.take = scene.getObjectByName('take');
      window.eri = scene.getObjectByName('eri');
    }
  }
}
