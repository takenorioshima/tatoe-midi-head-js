import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

export default class Animation {

  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.initialEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    this.initialScale = { x: 1, y: 1, z: 1 };
    this.origin = { x: 0, y: 0, z: 0 };
    this.durationBase = 100;
    this.backgroundColorsIndex = 0;
  }

  /**
    * Animations.
    */

  changeBackgroundColor() {
    const backgroundColors = [0x33BF4F, 0xDC4829, 0xFFD000, 0x2D94CE, 0xB7BC9B];
    this.renderer.setClearColor(backgroundColors[this.backgroundColorsIndex], 1);
    this.backgroundColorsIndex++;
    if (this.backgroundColorsIndex >= backgroundColors.length) {
      this.backgroundColorsIndex = 0;
    }
  }

  changeCameraPosition() {
    const radius = 10;
    const phi = (Math.random() * 360) * Math.PI / 180;
    const theta = (Math.random() * 180) * Math.PI / 180;
    const x = -1 * radius * Math.cos(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.sin(theta);
    this.camera.position.set(x, y, z);
  }

  changeCap() {
    take.cap.visible = !take.cap.visible;
    take.yellowCap.visible = !take.yellowCap.visible;
  }

  changeHat() {
    eri.hat.visible = !eri.hat.visible;
    eri.cheese.visible = !eri.cheese.visible;
  }

  dissolve() {
    const easing = TWEEN.Easing.Quintic.Out;
    const durationBase = this.durationBase;
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
      new TWEEN.Tween(take.yellowCap.position).to({ x: 1, y: 0.3 }, durationBase).easing(easing).start();
      new TWEEN.Tween(take.yellowCap.rotation).to({ y: 0.5, z: 0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(take.yellowCap.scale).to({ x: 1.5, y: 1.5, z: 1.5 }, durationBase).easing(easing).start();

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
      new TWEEN.Tween(eri.cheese.position).to({ x: -1, y: 0.75, z: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(eri.cheese.rotation).to({ z: 3 }, durationBase).easing(easing).start();

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
        take.yellowCap,
        eri.hat,
        eri.hair,
        eri.head,
        eri.eyes,
        eri.nose,
        eri.earL,
        eri.earR,
        eri.strow,
        eri.cheese,
      ];

      objectsToReset.forEach(target => {
        if (target.initialPosition) {
          new TWEEN.Tween(target.position).to(target.initialPosition, durationBase).start();
        } else {
          new TWEEN.Tween(target.position).to(this.origin, durationBase).start();
        }
        new TWEEN.Tween(target.rotation).to(this.origin, durationBase).start();
        new TWEEN.Tween(target.scale).to(this.initialScale, durationBase).start();
      });

      take.isDissolved = false;
    }
  }

  extendGlasses() {
    const durationBase = this.durationBase
    if (!take.glassL.isExtended) {
      new TWEEN.Tween(take.glassL.scale).to({ z: 8 }, durationBase).start();
      new TWEEN.Tween(take.glassR.scale).to({ z: 10 }, durationBase).start();
      take.glassL.isExtended = true;
    } else {
      new TWEEN.Tween(take.glassL.scale).to(this.initialScale, durationBase).start();
      new TWEEN.Tween(take.glassR.scale).to(this.initialScale, durationBase).start();
      take.glassL.isExtended = false;
    }
  }

  rotateHat() {
    if (!eri.hat.isRotated) {
      new TWEEN.Tween(eri.hat.rotation).to({ y: 6 }, this.durationBase).start();
      new TWEEN.Tween(eri.hat.scale).to({ x: 1.75, y: 1.5, z: 1.75 }, this.durationBase).start();
      new TWEEN.Tween(eri.hat.position).to({ y: 0.2 }, this.durationBase).start();

      new TWEEN.Tween(eri.cheese.rotation).to({ y: 6 }, this.durationBase).start();
      new TWEEN.Tween(eri.cheese.scale).to({ x: 1.75, y: 1.5, z: 1.75 }, this.durationBase).start();
      new TWEEN.Tween(eri.cheese.position).to({ y: 0.2 }, this.durationBase).start();

      eri.hat.isRotated = true;
    } else {
      new TWEEN.Tween(eri.hat.rotation).to(this.origin, this.durationBase).start();
      new TWEEN.Tween(eri.hat.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(eri.hat.position).to(this.origin, this.durationBase).start();

      new TWEEN.Tween(eri.cheese.rotation).to(this.origin, this.durationBase).start();
      new TWEEN.Tween(eri.cheese.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(eri.cheese.position).to(this.origin, this.durationBase).start();

      eri.hat.isRotated = false;
    }
  }

  rotateLips() {
    if (!take.lipTop.isRotated) {
      new TWEEN.Tween(take.lipTop.rotation).to({ y: 3 }, this.durationBase * 2).start();
      new TWEEN.Tween(take.lipBottom.rotation).to({ y: -3 }, this.durationBase * 2).start();
      take.lipTop.isRotated = true;
    } else {
      new TWEEN.Tween(take.lipTop.rotation).to(this.origin, this.durationBase * 2).start();
      new TWEEN.Tween(take.lipBottom.rotation).to(this.origin, this.durationBase * 2).start();
      take.lipTop.isRotated = false;
    }
  }

  rotateTatoe() {
    const randomA = (Math.random() * 6) - 3;
    const randomB = (Math.random() * 6) - 3;
    const randomC = (Math.random() * 6) - 3;
    new TWEEN.Tween(take.rotation).to({ x: randomA, y: randomB, z: randomC }, this.durationBase * 20).easing(TWEEN.Easing.Quintic.Out).start();
    new TWEEN.Tween(eri.rotation).to({ x: randomB, y: randomC, z: randomA }, this.durationBase * 10).easing(TWEEN.Easing.Quintic.Out).start();
  }

  scaleTatoe() {
    if (!take.isScaled) {
      const randomA = Math.random() * 2;
      const randomB = Math.random() * 2;
      const randomC = Math.random() * 2;
      new TWEEN.Tween(take.scale).to({ x: randomA, y: randomB, z: randomC }, this.durationBase).start();
      new TWEEN.Tween(eri.scale).to({ x: randomC, y: randomA, z: randomB }, this.durationBase).start();
      take.isScaled = true;
    } else {
      new TWEEN.Tween(take.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(eri.scale).to(this.initialScale, this.durationBase).start();
      take.isScaled = false;
    }
  }

  shrinkHeads() {
    if (!take.head.isShrinked && !eri.head.isShrinked) {
      new TWEEN.Tween(take.head.scale).to(this.origin, this.durationBase).start();
      new TWEEN.Tween(eri.head.scale).to(this.origin, this.durationBase).start();
      take.head.isShrinked = true;
      eri.head.isShrinked = true;
    } else {
      new TWEEN.Tween(take.head.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(eri.head.scale).to(this.initialScale, this.durationBase).start();
      take.head.isShrinked = false;
      eri.head.isShrinked = false;
    }
  }

  swapEyes() {
    if (!eri.eyes.isSwapped) {
      const eriTweens = [
        new TWEEN.Tween(eri.eyes.position).to({ z: 0.3 }, this.durationBase),
        new TWEEN.Tween(eri.eyes.position).to({ x: -0.385 * 2, y: 0.05 }, this.durationBase),
        new TWEEN.Tween(eri.eyes.position).to({ z: 0.02 }, this.durationBase),
      ];
      eriTweens[0].chain(eriTweens[1]);
      eriTweens[1].chain(eriTweens[2]);
      eriTweens[0].start();

      const takeGlassLTweens = [
        new TWEEN.Tween(take.glassL.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(take.glassL.position).to({ x: 0.843, y: 0 }, this.durationBase),
        new TWEEN.Tween(take.glassL.position).to({ z: 0.19 }, this.durationBase),
      ];
      takeGlassLTweens[0].chain(takeGlassLTweens[1]);
      takeGlassLTweens[1].chain(takeGlassLTweens[2]);
      takeGlassLTweens[0].start();

      const takeGlassRTweens = [
        new TWEEN.Tween(take.glassR.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(take.glassR.position).to({ x: 0.7, y: 0 }, this.durationBase),
        new TWEEN.Tween(take.glassR.position).to({ z: 0.19 }, this.durationBase),
      ];
      takeGlassRTweens[0].chain(takeGlassRTweens[1]);
      takeGlassRTweens[1].chain(takeGlassRTweens[2]);
      takeGlassRTweens[0].start();

      const takeGlassFrameTweens = [
        new TWEEN.Tween(take.glassFrame.position).to({ z: 0.5 }, this.durationBase),
        new TWEEN.Tween(take.glassFrame.position).to({ x: 0.771, y: -0.05 }, this.durationBase),
        new TWEEN.Tween(take.glassFrame.position).to({ z: -0.01 }, this.durationBase),
      ];
      takeGlassFrameTweens[0].chain(takeGlassFrameTweens[1]);
      takeGlassFrameTweens[1].chain(takeGlassFrameTweens[2]);
      takeGlassFrameTweens[0].start();

      eri.eyes.isSwapped = true;
    } else {
      const eriBackTweens = [
        new TWEEN.Tween(eri.eyes.position).to({ z: 0.3 }, this.durationBase),
        new TWEEN.Tween(eri.eyes.position).to({ x: 0, y: 0 }, this.durationBase),
        new TWEEN.Tween(eri.eyes.position).to({ z: 0 }, this.durationBase),
      ];
      eriBackTweens[0].chain(eriBackTweens[1]);
      eriBackTweens[1].chain(eriBackTweens[2]);
      eriBackTweens[0].start();

      const takeBackGlassLTweens = [
        new TWEEN.Tween(take.glassL.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(take.glassL.position).to({ x: take.glassL.initialPosition.x, y: take.glassL.initialPosition.y }, this.durationBase),
        new TWEEN.Tween(take.glassL.position).to({ z: take.glassL.initialPosition.z }, this.durationBase),
      ];
      takeBackGlassLTweens[0].chain(takeBackGlassLTweens[1]);
      takeBackGlassLTweens[1].chain(takeBackGlassLTweens[2]);
      takeBackGlassLTweens[0].start();

      const takeBackGlassRTweens = [
        new TWEEN.Tween(take.glassR.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(take.glassR.position).to({ x: take.glassR.initialPosition.x, y: take.glassR.initialPosition.y }, this.durationBase),
        new TWEEN.Tween(take.glassR.position).to({ z: take.glassR.initialPosition.z }, this.durationBase),
      ];
      takeBackGlassRTweens[0].chain(takeBackGlassRTweens[1]);
      takeBackGlassRTweens[1].chain(takeBackGlassRTweens[2]);
      takeBackGlassRTweens[0].start();

      const takeBackGlassFrameTweens = [
        new TWEEN.Tween(take.glassFrame.position).to({ z: 0.5 }, this.durationBase),
        new TWEEN.Tween(take.glassFrame.position).to({ x: take.glassFrame.initialPosition.x, y: take.glassFrame.initialPosition.y }, this.durationBase),
        new TWEEN.Tween(take.glassFrame.position).to({ z: take.glassFrame.initialPosition.z }, this.durationBase),
      ];
      takeBackGlassFrameTweens[0].chain(takeBackGlassFrameTweens[1]);
      takeBackGlassFrameTweens[1].chain(takeBackGlassFrameTweens[2]);
      takeBackGlassFrameTweens[0].start();

      eri.eyes.isSwapped = false;
    }
  }

  switchWireframes() {
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

  changeMaterial() {
    if (take.isWired) {
      this.switchWireframes();
    }
    if (!take.isNormalMaterial) {
      take.traverse((child) => {
        if (child.material) {
          child.material = new THREE.MeshNormalMaterial();
        }
      });
      eri.traverse((child) => {
        if (child.material) {
          child.material = new THREE.MeshNormalMaterial();
        }
      });
      take.isNormalMaterial = true;
    } else {
      take.traverse((child) => {
        child.material = child.initialMaterial;
      });
      eri.traverse((child) => {
        child.material = child.initialMaterial;
      });
      take.isNormalMaterial = false;
    }
  }

  toggleRotation() {
    this.scene.toggleRotation();
  }

  /**
   * Reset animations.
   */

  reset() {
    take.setRotationFromEuler(this.initialEuler);
    eri.setRotationFromEuler(this.initialEuler);

    this.camera.position.set(0, 0, 10);

    take.isNormalMaterial = true;
    this.changeMaterial();

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
    this.scaleTatoe();

    take.isDissolved = true;
    this.dissolve();
  }

  init(scene) {
    if (!take || !eri) {
      take = scene.getObjectByName('take');
      eri = scene.getObjectByName('eri');

      take.glassL.initialPosition = take.glassL.position.clone();
      take.glassR.initialPosition = take.glassR.position.clone();
      take.glassFrame.initialPosition = take.glassFrame.position.clone();
      take.lipTop.initialPosition = take.lipTop.position.clone();
      take.lipBottom.initialPosition = take.lipBottom.position.clone();

      take.traverse((child) => {
        if (child.material) {
          child.initialMaterial = child.material.clone();
        }
      });
      eri.traverse((child) => {
        if (child.material) {
          child.initialMaterial = child.material.clone();
        }
      });
    }
  }
}
