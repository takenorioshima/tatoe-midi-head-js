import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { WebMidi } from 'webmidi';

export default class Animation {
  constructor(scene, camera, renderer) {

    const initialEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    const initialScale = { x: 1, y: 1, z: 1 };
    const origin = { x: 0, y: 0, z: 0 };
    const durationBase = 100;

    const backgroundColors = [0x33BF4F, 0xDC4829, 0xFFD000, 0x2D94CE, 0xB7BC9B];
    let backgroundColorsIndex = 0;

    /**
     * Listen MIDI events.
     */

    WebMidi.enable().then(onMidiEnabled).catch(err => alert(err));

    function onMidiEnabled() {

      let midiInput;
      const pisoundMidiInputName = 'pisound MIDI PS-2ZF0Y18';

      if (WebMidi.inputs.length < 1) {
        console.log('No device detected.');
      } else {
        if (WebMidi.getInputByName(pisoundMidiInputName)) {
          midiInput = WebMidi.getInputByName(pisoundMidiInputName);
        } else {
          midiInput = WebMidi.getInputByName(WebMidi.inputs[0].name);
        }
        console.log(`[tatoe] ${midiInput.name} was detected.`);
        const animationFunctions = [
          reset,
          changeBackgroundColor,
          changeCameraPosition,
          dissolve,
          extendGlasses,
          rotate,
          rotateHat,
          rotateLips,
          scale,
          shrinkHeads,
          switchWireframes,
          toggleRotation,
        ];
        midiInput.addListener("noteon", e => {
          const animationId = e.note.number % animationFunctions.length;
          animationFunctions[animationId].call();
        })
      }
    }

    /**
     * Listen keyboard events.
     */

    function targetKey(e, code) {
      if (e.code == code && !e.repeat) {
        return true;
      }
    }

    document.addEventListener('keypress', e => {
      console.log(e);
      if (window.take && window.eri) {
        if (targetKey(e, 'KeyB')) {
          changeBackgroundColor();
        }
        if (targetKey(e, 'KeyC')) {
          changeCameraPosition();
        }
        if (targetKey(e, 'KeyD')) {
          dissolve();
        }
        if (targetKey(e, 'KeyL')) {
          rotateLips();
        }
        if (targetKey(e, 'KeyS')) {
          shrinkHeads();
        }
        if (targetKey(e, 'KeyW')) {
          switchWireframes();
        }
        if (targetKey(e, 'KeyM')) {
          changeMaterial();
        }
        if (targetKey(e, 'Digit4')) {
          toggleRotation()
        }
        if (targetKey(e, 'Digit6')) {
          rotateTatoe();
        }
        if (targetKey(e, 'Digit7')) {
          scaleTatoe();
        }
        if (targetKey(e, 'Digit8')) {
          extendGlasses();
        }
        if (targetKey(e, 'Digit9')) {
          rotateHat();
        }
        if (targetKey(e, 'Digit0')) {
          reset();
        }
      }
    }, false);

    document.addEventListener('keyup', e => {
      if (window.take && window.eri) {
        if (targetKey(e, 'KeyL')) {
          rotateLips();
        }
        if (targetKey(e, 'Digit6')) {
          rotateTatoe();
        }
        if (targetKey(e, 'Digit7')) {
          take.isScaled = true;
          scaleTatoe();
        }
        if (targetKey(e, 'Digit8')) {
          extendGlasses();
        }
        if (targetKey(e, 'Digit9')) {
          rotateHat();
        }
      }
    }, false);

    /**
     * Animations.
     */

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
      camera.position.set(x, y, z);
    }

    function dissolve() {
      const easing = TWEEN.Easing.Quintic.Out;
      if (!take.isDissolved) {
        new TWEEN.Tween(take.glassL.position).to({ x: 0.5, y: 0.2, z: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.glassL.rotation).to({ x: 1 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.glassL.scale).to({ x: 3, y: 3, z: 0.3 }, durationBase).easing(easing).start();

        new TWEEN.Tween(take.glassR.position).to({ x: -0.2, z: 0.3 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.glassR.rotation).to({ y: -1, z: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.glassR.scale).to({ x: 4, y: 4, z: 0.3 }, durationBase).easing(easing).start();

        new TWEEN.Tween(take.glassFrame.position).to({ x: 1, z: 0.4 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.glassFrame.rotation).to({ z: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.glassFrame.scale).to({ x: 5 }, durationBase).easing(easing).start();

        new TWEEN.Tween(take.cap.position).to({ x: 1, y: 0.3 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.cap.rotation).to({ y: 0.5, z: 0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.cap.scale).to({ x: 1.5, y: 1.5, z: 1.5 }, durationBase).easing(easing).start();

        new TWEEN.Tween(take.head.rotation).to({ x: 0.5, z: 2 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.head.scale).to({ x: 1, y: 1, z: 0.03 }, durationBase).easing(easing).start();

        new TWEEN.Tween(take.nose.position).to({ z: -1 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.nose.rotation).to({ z: 5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.nose.scale).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();

        new TWEEN.Tween(take.lipTop.position).to({ y: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.lipTop.scale).to({ x: 3, y: 3, z: 3 }, durationBase).easing(easing).start();

        new TWEEN.Tween(take.lipBottom.position).to({ x: 1, y: 0.25 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.lipBottom.rotation).to({ z: 1 }, durationBase).easing(easing).start();
        new TWEEN.Tween(take.lipBottom.scale).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.hat.position).to({ x: -1, y: 0.75, z: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.hat.rotation).to({ z: 3 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.hair.position).to({ y: -0.4 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.hair.rotation).to({ x: 0.2, y: 0.1, z: -0.2 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.hair.scale).to({ x: 2, y: 0.1, z: 2 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.head.rotation).to({ x: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.head.scale).to({ x: 1, y: 1, z: 0.03 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.eyes.rotation).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.eyes.scale).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.nose.position).to({ y: -2 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.nose.rotation).to({ x: -1.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.nose.scale).to({ x: 10, y: 10, z: 10 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.earL.position).to({ x: -0.5, z: -1 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.earL.rotation).to({ y: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.earL.scale).to({ x: 4, y: 4 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.earR.position).to({ x: -0.5, z: -0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.earR.rotation).to({ y: 0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.earR.scale).to({ x: 2, y: 2 }, durationBase).easing(easing).start();

        new TWEEN.Tween(eri.strow.position).to({ y: 0.5 }, durationBase).easing(easing).start();
        new TWEEN.Tween(eri.strow.scale).to({ x: 4, y: 4, z: 4 }, durationBase).easing(easing).start();

        take.isDissolved = true;

      } else {

        const objectsToReset = [
          take.glassL,
          take.glassR,
          take.lipTop,
          take.lipBottom,
          take.cap,
          take.glassFrame,
          take.head,
          take.nose,
          eri.hat,
          eri.hair,
          eri.head,
          eri.eyes,
          eri.nose,
          eri.earL,
          eri.earR,
          eri.strow,
        ];

        objectsToReset.forEach(target => {
          new TWEEN.Tween(target.position).to(origin, durationBase).start();
          new TWEEN.Tween(target.rotation).to(origin, durationBase).start();
          new TWEEN.Tween(target.scale).to(initialScale, durationBase).start();
        });

        new TWEEN.Tween(take.glassL.position).to(window.initialPositions.take.glassL, durationBase).start();
        new TWEEN.Tween(take.glassR.position).to(window.initialPositions.take.glassR, durationBase).start();
        new TWEEN.Tween(take.lipTop.position).to(window.initialPositions.take.lipTop, durationBase).start();
        new TWEEN.Tween(take.lipBottom.position).to(window.initialPositions.take.lipBottom, durationBase).start();

        take.isDissolved = false;
      }
    }

    function extendGlasses() {
      if (!take.glassL.isExtended) {
        new TWEEN.Tween(take.glassL.scale).to({ z: 8 }, durationBase).start();
        new TWEEN.Tween(take.glassR.scale).to({ z: 10 }, durationBase).start();
        take.glassL.isExtended = true;
      } else {
        new TWEEN.Tween(take.glassL.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(take.glassR.scale).to(initialScale, durationBase).start();
        take.glassL.isExtended = false;
      }
    }

    function rotateHat() {
      if (!eri.hat.isRotated) {
        new TWEEN.Tween(eri.hat.rotation).to({ y: 6 }, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to({ x: 1.75, y: 1.5, z: 1.75 }, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to({ y: 0.2 }, durationBase).start();
        eri.hat.isRotated = true;
      } else {
        new TWEEN.Tween(eri.hat.rotation).to(origin, durationBase).start();
        new TWEEN.Tween(eri.hat.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(eri.hat.position).to(origin, durationBase).start();
        eri.hat.isRotated = false;
      }
    }

    function rotateLips() {
      if (!take.lipTop.isRotated) {
        new TWEEN.Tween(take.lipTop.rotation).to({ y: 3 }, durationBase * 2).start();
        new TWEEN.Tween(take.lipBottom.rotation).to({ y: -3 }, durationBase * 2).start();
        take.lipTop.isRotated = true;
      } else {
        new TWEEN.Tween(take.lipTop.rotation).to(origin, durationBase * 2).start();
        new TWEEN.Tween(take.lipBottom.rotation).to(origin, durationBase * 2).start();
        take.lipTop.isRotated = false;
      }
    }

    function rotateTatoe() {
      const randomA = (Math.random() * 6) - 3;
      const randomB = (Math.random() * 6) - 3;
      const randomC = (Math.random() * 6) - 3;
      new TWEEN.Tween(take.rotation).to({ x: randomA, y: randomB, z: randomC }, durationBase * 20).easing(TWEEN.Easing.Quintic.Out).start();
      new TWEEN.Tween(eri.rotation).to({ x: randomB, y: randomC, z: randomA }, durationBase * 10).easing(TWEEN.Easing.Quintic.Out).start();
    }

    function scaleTatoe() {
      if (!take.isScaled) {
        const randomA = Math.random() * 2;
        const randomB = Math.random() * 2;
        const randomC = Math.random() * 2;
        new TWEEN.Tween(take.scale).to({ x: randomA, y: randomB, z: randomC }, durationBase).start();
        new TWEEN.Tween(eri.scale).to({ x: randomC, y: randomA, z: randomB }, durationBase).start();
        take.isScaled = true;
      } else {
        new TWEEN.Tween(take.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(eri.scale).to(initialScale, durationBase).start();
        take.isScaled = false;
      }
    }

    function shrinkHeads() {
      if (!take.head.isShrinked && !eri.head.isShrinked) {
        new TWEEN.Tween(take.head.scale).to(origin, durationBase).start();
        new TWEEN.Tween(eri.head.scale).to(origin, durationBase).start();
        take.head.isShrinked = true;
        eri.head.isShrinked = true;
      } else {
        new TWEEN.Tween(take.head.scale).to(initialScale, durationBase).start();
        new TWEEN.Tween(eri.head.scale).to(initialScale, durationBase).start();
        take.head.isShrinked = false;
        eri.head.isShrinked = false;
      }
    }

    function switchWireframes() {
      take.isWired = !take.isWired;
      take.traverse((child) => {
        if (child.material) {
          child.material.wireframe = take.isWired;
        }
      });
      eri.traverse((child) => {
        if (child.material) {
          child.material.wireframe = take.isWired;
        }
      });
    }

    function changeMaterial() {
      if (!take.isNormalMaterial) {
        take.traverse((child) => {
          if (child.material) {
            if (!child.originalMaterial) {
              child.originalMaterial = child.material.clone();
            }
            child.material = new THREE.MeshNormalMaterial();
          }
        });
        eri.traverse((child) => {
          if (child.material) {
            if (!child.originalMaterial) {
              child.originalMaterial = child.material.clone();
            }
            child.material = new THREE.MeshNormalMaterial();
          }
        });
        take.isNormalMaterial = true;
      } else {
        take.traverse((child) => {
          child.material = child.originalMaterial;
        });
        eri.traverse((child) => {
          child.material = child.originalMaterial;
        });
        take.isNormalMaterial = false;
      }
    }

    function toggleRotation() {
      scene.toggleRotation();
    }

    /**
     * Reset animations.
     */

    function reset() {
      take.setRotationFromEuler(initialEuler);
      eri.setRotationFromEuler(initialEuler);

      camera.position.set(0, 0, 10);

      if (take.isNormalMaterial != null) {
        take.isNormalMaterial = true;
        changeMaterial();
      }

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
      take.isWired = false;

      take.isScaled = true;
      scaleTatoe();

      take.isDissolved = true;
      dissolve();
    }

  }

  init(scene) {
    if (!window.take || !window.eri) {
      window.take = scene.getObjectByName('take');
      window.eri = scene.getObjectByName('eri');
      window.initialPositions = {
        take: {
          glassL: { x: 0.07000001519918442, y: 0.047531530261039734, z: 0.19383010268211365 },
          glassR: { x: -0.07000000774860382, y: 0.045752037316560745, z: 0.19389592111110687 },
          lipTop: { x: 0.0017224252223968506, y: -0.0844118595123291, z: 0.18164539337158203 },
          lipBottom: { x: 0.0017224233597517014, y: -0.11786344647407532, z: 0.18164539337158203 },
        },
      }
    }
  }
}
