import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

export default class Animation {
  constructor(scene, camera, renderer) {

    const initialEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    const durationBase = 100;
    let isWireframed = false;
    const backgroundColors = [0x33BF4F, 0xDC4829, 0xFFD000, 0x2D94CE, 0xB7BC9B];
    let backgroundColorsIndex = 0;

    document.addEventListener('keypress', onKeypressEvent, false);
    function onKeypressEvent(e) {
      console.log(e);
      if (window.take && window.eri) {
        if (e.code == 'KeyB' && !e.repeat) {
          changeBackgroundColor();
        }
        if (e.code == 'KeyC' && !e.repeat) {
          changeCameraPosition();
        }
        if (e.code == 'KeyL' && !e.repeat) {
          rotateLips(true);
        }
        if (e.code == 'KeyW' && !e.repeat) {
          switchWireframes(true);
        }
        if (e.code == 'Digit4' && !e.repeat) {
          toggleRotation()
        }
        if (e.code == 'Digit6' && !e.repeat) {
          rotate(true);
        }
        if (e.code == 'Digit7' && !e.repeat) {
          scale(true);
        }
        if (e.code == 'Digit8' && !e.repeat) {
          extendGlasses(true);
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
        if (e.code == 'KeyL' && !e.repeat) {
          rotateLips(false);
        }
        if (e.code == 'Digit6' && !e.repeat) {
          rotate(false);
        }
        if (e.code == 'Digit7' && !e.repeat) {
          scale(false);
        }
        if (e.code == 'Digit8' && !e.repeat) {
          extendGlasses(false);
        }
        if (e.code == 'Digit9' && !e.repeat) {
          rotateHat(false);
        }
      }
    }

    function changeBackgroundColor(){
      renderer.setClearColor(backgroundColors[backgroundColorsIndex], 1);
      backgroundColorsIndex++;
      if( backgroundColorsIndex >= backgroundColors.length){
        backgroundColorsIndex = 0;
      }
    }

    function changeCameraPosition() {
      let radius = 10;
      let phi = ( Math.random() * 360 ) * Math.PI / 180;
      let theta = ( Math.random() * 180 ) * Math.PI / 180;
      let x =  -1 * radius * Math.cos(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi);
      let z = radius * Math.cos(phi) * Math.sin(theta);
      console.log(x +', '+ y + ', ' + z);
      camera.position.set(x, y, z);
    }

    function scale(state) {
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

    function toggleRotation(){
      scene.toggleRotation();
    }

    function rotate() {
      let randomA = Math.random() * 3;
      let randomB = Math.random() * 3;
      let randomC = Math.random() * 3;
      new TWEEN.Tween(take.rotation).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
      new TWEEN.Tween(eri.rotation).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
    }

    function rotateHat(state) {
      if (state) {
        new TWEEN.Tween(eri.hat.rotation).to({ y: 90 }, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to({ x: 1.5, y: 1.3, z: 1.5 }, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to({ y: 0.25 }, durationBase).start();
      } else {
        new TWEEN.Tween(eri.hat.rotation).to({ y: 0 }, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to({ x: 1, y: 1, z: 1 }, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to({ y: 0 }, durationBase).start();
      }
    }

    function extendGlasses(state) {
      if (state) {
        new TWEEN.Tween(take.glassL.scale).to({ z: 8 }, durationBase).start();
        new TWEEN.Tween(take.glassR.scale).to({ z: 10 }, durationBase).start();
      } else {
        new TWEEN.Tween(take.glassL.scale).to({ z: 1 }, durationBase).start();
        new TWEEN.Tween(take.glassR.scale).to({ z: 1 }, durationBase).start();
      }
    }

    function rotateLips(state) {
      if (state) {
        new TWEEN.Tween(take.lipTop.rotation).to({ y: 3 }, durationBase * 2).start();
        new TWEEN.Tween(take.lipBottom.rotation).to({ y: -3 }, durationBase * 2).start();
      } else {
        new TWEEN.Tween(take.lipTop.rotation).to({ y: 0 }, durationBase * 2).start();
        new TWEEN.Tween(take.lipBottom.rotation).to({ y: 0 }, durationBase * 2).start();
      }
    }

    function reset() {
      take.setRotationFromEuler(initialEuler);
      eri.setRotationFromEuler(initialEuler);
      take.scale.set(1, 1, 1);
      eri.scale.set(1, 1, 1);
      camera.position.set(10, 10, 10);
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
    }

    function switchWireframes() {
      take.traverse((child) => {
        if (child.material) {
          child.material.wireframe = !isWireframed;
        }
      });
      eri.traverse((child) => {
        if (child.material) {
          child.material.wireframe = !isWireframed;
        }
      });
      isWireframed = !isWireframed;
    }

  }

  init(scene) {
    if (!window.take || !window.eri) {
      window.take = scene.getObjectByName('take');
      window.eri = scene.getObjectByName('eri');
    }
  }
}
