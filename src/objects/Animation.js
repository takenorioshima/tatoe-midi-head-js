import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

export default class Animation {
  constructor(scene) {

    const initialEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    const durationBase = 100;

    document.addEventListener('keypress', onKeypressEvent, false);
    function onKeypressEvent(e) {
      console.log(e);
      if (window.take && window.eri) {
        if (e.code == 'Digit4' && !e.repeat) {
          scene.switchRotation(true)
        }
        if (e.code == 'Digit6' && !e.repeat) {
          rotate(true);
        }
        if (e.code == 'Digit7' && !e.repeat) {
          scale(true);
        }
        if (e.code == 'Digit8' && !e.repeat) {
          showWireframes(true);
        }
        if (e.code == 'Digit9' && !e.repeat) {
          rotateHat(true);
        }
        if (e.code == 'Digit0' && !e.repeat) {
          reset();
        }
      }
    }

    document.addEventListener('keyup', onKeyupEvent, false);
    function onKeyupEvent(e) {
      if (window.take && window.eri) {
        if (e.code == 'Digit6' && !e.repeat) {
          rotate(false);
        }
        if (e.code == 'Digit7' && !e.repeat) {
          scale(false);
        }
        if (e.code == 'Digit8' && !e.repeat) {
          showWireframes(false);
        }
        if (e.code == 'Digit9' && !e.repeat) {
          rotateHat(false);
        }
      }
    }

    function scale(state) {
      console.log(state);
      if (state) {
        let randomA = Math.random() * 2;
        let randomB = Math.random() * 2;
        let randomC = Math.random() * 2;
        new TWEEN.Tween(take.scale).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
        new TWEEN.Tween(eri.scale).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
      } else {
        new TWEEN.Tween(take.scale).to({ x: 1, y: 1, z: 1 }, durationBase).start();
        new TWEEN.Tween(eri.scale).to({ x: 1, y: 1, z: 1 }, durationBase).start();
      }
    }

    function rotate() {
      let randomA = Math.random() * 3;
      let randomB = Math.random() * 3;
      let randomC = Math.random() * 3;
      new TWEEN.Tween(take.rotation).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
      new TWEEN.Tween(eri.rotation).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
    }

    function rotateHat(state) {
      if(state) {
        new TWEEN.Tween(eri.hat.rotation).to({ y: 90 }, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to({ x: 1.5, y: 1.3, z: 1.5 }, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to({ y: 0.25 }, durationBase).start();
      }else{
        new TWEEN.Tween(eri.hat.rotation).to({ y: 0 }, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to({ x: 1, y: 1, z: 1 }, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to({ y: 0 }, durationBase).start();
      }
    }

    function reset() {
      take.setRotationFromEuler(initialEuler);
      eri.setRotationFromEuler(initialEuler);
      take.scale.set(1, 1, 1);
      eri.scale.set(1, 1, 1);
    }

    function showWireframes(state) {
      scene.traverse((child)=>{
        console.log(child.material);
        if(child.material){
          child.material.wireframe = state;
        }
      });
    }

  }

  init(scene) {
    if (!window.take || !window.eri) {
      window.take = scene.getObjectByName('take');
      window.eri = scene.getObjectByName('eri');
    }
  }
}
