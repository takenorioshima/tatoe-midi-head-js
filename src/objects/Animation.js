import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

export default class Animation {
  constructor(scene, camera, renderer) {

    const initialEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    const initialScale = {x: 1, y: 1, z: 1};
    const origin = {x: 0, y: 0, z: 0};
    const durationBase = 100;
    let isWireframed = false;
    const backgroundColors = [0x33BF4F, 0xDC4829, 0xFFD000, 0x2D94CE, 0xB7BC9B];
    let backgroundColorsIndex = 0;

    function targetKey(e, code) {
      if (e.code == code && !e.repeat) {
        return true;
      }
    }

    document.addEventListener('keypress', onKeypressEvent, false);
    function onKeypressEvent(e) {
      console.log(e);
      if (window.take && window.eri) {
        if (targetKey(e, 'KeyB')) {
          changeBackgroundColor();
        }
        if (targetKey(e, 'KeyC')) {
          changeCameraPosition();
        }
        if (targetKey(e, 'KeyL')) {
          rotateLips(true);
        }
        if (targetKey(e, 'KeyS')) {
          shrinkHeads();
        }
        if (targetKey(e, 'KeyW')) {
          isWireframed = !isWireframed;
          switchWireframes(isWireframed);
        }
        if (targetKey(e, 'Digit4')) {
          toggleRotation()
        }
        if (targetKey(e, 'Digit6')) {
          rotate(true);
        }
        if (targetKey(e, 'Digit7')) {
          scale(true);
        }
        if (targetKey(e, 'Digit8')) {
          extendGlasses(true);
        }
        if (targetKey(e, 'Digit9')) {
          rotateHat(true);
        }
        if (targetKey(e, 'Digit0')) {
          reset();
        }
      }
    }

    document.addEventListener('keyup', onKeyupEvent, false);
    function onKeyupEvent(e) {
      if (window.take && window.eri) {
        if (targetKey(e, 'KeyL')) {
          rotateLips(false);
        }
        if (targetKey(e, 'Digit6')) {
          rotate(false);
        }
        if (targetKey(e, 'Digit7')) {
          scale(false);
        }
        if (targetKey(e, 'Digit8')) {
          extendGlasses(false);
        }
        if (targetKey(e, 'Digit9')) {
          rotateHat(false);
        }
      }
    }

    function changeBackgroundColor() {
      renderer.setClearColor(backgroundColors[backgroundColorsIndex], 1);
      backgroundColorsIndex++;
      if (backgroundColorsIndex >= backgroundColors.length) {
        backgroundColorsIndex = 0;
      }
    }

    function changeCameraPosition() {
      const radius = 10;
      const phi = (Math.random() * 360) * Math.PI / 180;
      const theta = (Math.random() * 180) * Math.PI / 180;
      const x = -1 * radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi);
      const z = radius * Math.cos(phi) * Math.sin(theta);
      console.log(x + ', ' + y + ', ' + z);
      camera.position.set(x, y, z);
    }

    function extendGlasses(state) {
      if (state) {
        new TWEEN.Tween(take.glassL.scale).to({ z: 8 }, durationBase).start();
        new TWEEN.Tween(take.glassR.scale).to({ z: 10 }, durationBase).start();
      } else {
        new TWEEN.Tween(take.glassL.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(take.glassR.scale).to(initialScale, durationBase).start();
      }
    }

    function rotate() {
      const randomA = Math.random() * 3;
      const randomB = Math.random() * 3;
      const randomC = Math.random() * 3;
      new TWEEN.Tween(take.rotation).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
      new TWEEN.Tween(eri.rotation).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
    }

    function rotateHat(state) {
      if (state) {
        new TWEEN.Tween(eri.hat.rotation).to({ y: 90 }, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to({ x: 1.5, y: 1.3, z: 1.5 }, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to({ y: 0.25 }, durationBase).start();
      } else {
        new TWEEN.Tween(eri.hat.rotation).to(origin, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to(origin, durationBase).start();
      }
    }

    function rotateLips(state) {
      if (state) {
        new TWEEN.Tween(take.lipTop.rotation).to({ y: 3 }, durationBase * 2).start();
        new TWEEN.Tween(take.lipBottom.rotation).to({ y: -3 }, durationBase * 2).start();
      } else {
        new TWEEN.Tween(take.lipTop.rotation).to(origin, durationBase * 2).start();
        new TWEEN.Tween(take.lipBottom.rotation).to(origin, durationBase * 2).start();
      }
    }

    function scale(state) {
      if (state) {
        const randomA = Math.random() * 2;
        const randomB = Math.random() * 2;
        const randomC = Math.random() * 2;
        new TWEEN.Tween(take.scale).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
        new TWEEN.Tween(eri.scale).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
      } else {
        new TWEEN.Tween(take.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(eri.scale).to(initialScale, durationBase).start();
      }
    }

    function shrinkHeads() {
      if (!take.head.isShrinked && !eri.head.isShrinked) {
        new TWEEN.Tween(take.head.scale).to(origin, durationBase).start();
        new TWEEN.Tween(eri.head.scale).to(origin, durationBase).start();
        take.head.isShrinked = true;
        eri.head.isShrinked = true;
        console.log(take.head.isShrinked);
      } else {
        new TWEEN.Tween(take.head.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(eri.head.scale).to(initialScale, durationBase).start();
        take.head.isShrinked = false;
        eri.head.isShrinked = false;
      }
    }

    function switchWireframes(state) {
      take.traverse((child) => {
        if (child.material) {
          child.material.wireframe = state;
        }
      });
      eri.traverse((child) => {
        if (child.material) {
          child.material.wireframe = state;
        }
      });
    }

    function toggleRotation() {
      scene.toggleRotation();
    }

    function reset() {
      take.setRotationFromEuler(initialEuler);
      eri.setRotationFromEuler(initialEuler);

      camera.position.set(0, 0, 10);

      take.traverse((child) => {
        if (child.material) {
          child.material.wireframe = false;
        }
      });
      eri.traverse((child) => {
        if (child.material) {
          child.material.wireframe = false;
        }
      });
      isWireframed = false;

      new TWEEN.Tween(take.head.scale).to(initialScale, durationBase).start();
      new TWEEN.Tween(eri.head.scale).to(initialScale, durationBase).start();
      take.head.isShrinked = false;
      eri.head.isShrinked = false;
    }

  }

  init(scene) {
    if (!window.take || !window.eri) {
      window.take = scene.getObjectByName('take');
      window.eri = scene.getObjectByName('eri');
    }
  }
}
