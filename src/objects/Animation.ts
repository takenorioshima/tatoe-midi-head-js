import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

export default class Animation {

  tatoe: THREE.Group | any;
  camera: THREE.OrthographicCamera;
  controls: THREE.OrbitControls;
  renderer: THREE.WebGLRenderer;
  initialEuler: THREE.Euler;
  initialScale: { [axis: string]: number };
  origin: THREE.Vector3;
  durationBase: number;
  backgroundColorsIndex: number;

  constructor(tatoe: THREE.Group | any, camera: THREE.OrthographicCamera, controls: THREE.OrbitControls, renderer: THREE.WebGLRenderer) {
    this.tatoe = tatoe;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.initialEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    this.initialScale = { x: 1, y: 1, z: 1 };
    this.origin = new THREE.Vector3(0, 0, 0);
    this.durationBase = 100;
    this.backgroundColorsIndex = 0;
    this.changeBackgroundColor();
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
    const zoomMin = Math.ceil(1);
    const zoomMax = Math.floor(4);
    const zoom = Math.floor(Math.random() * (zoomMax - zoomMin) + zoomMin) + 0.5;
    const x = -1 * radius * Math.cos(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.sin(theta);
    this.camera.position.set(x, y, z);
    this.camera.zoom = zoom;
    this.camera.updateProjectionMatrix();
  }

  changeCap() {
    this.tatoe.take.cap.visible = !this.tatoe.take.cap.visible;
    this.tatoe.take.yellowCap.visible = !this.tatoe.take.yellowCap.visible;
  }

  changeHat() {
    this.tatoe.eri.hat.visible = !this.tatoe.eri.hat.visible;
    this.tatoe.eri.cheese.visible = !this.tatoe.eri.cheese.visible;
  }

  changeMaterial() {
    if (this.tatoe.userData.isWired) {
      this.switchWireframes();
    }
    if (!this.tatoe.userData.isNormalMaterial) {
      this.tatoe.take.traverse((child: THREE.Mesh) => {
        child.material = new THREE.MeshNormalMaterial();
      });
      this.tatoe.eri.traverse((child: THREE.Mesh) => {
        child.material = new THREE.MeshNormalMaterial();
      });
      this.tatoe.userData.isNormalMaterial = true;
    } else {
      this.tatoe.take.traverse((child: THREE.Mesh) => {
        child.material = child.userData.initialMaterial;
      });
      this.tatoe.eri.traverse((child: THREE.Mesh) => {
        child.material = child.userData.initialMaterial;
      });
      this.tatoe.userData.isNormalMaterial = false;
    }
  }

  dissolve() {
    const easing = TWEEN.Easing.Quintic.Out;
    const durationBase = this.durationBase;
    let target;
    if (!this.tatoe.userData.isDissolved) {
      target = this.tatoe.take.glassL;
      new TWEEN.Tween(target.position).to({ x: 0.5, y: 0.2, z: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ x: 1 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 3, y: 3, z: 0.3 }, durationBase).easing(easing).start();

      target = this.tatoe.take.glassR;
      new TWEEN.Tween(target.position).to({ x: -0.2, z: 0.3 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ y: -1, z: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 4, y: 4, z: 0.3 }, durationBase).easing(easing).start();

      target = this.tatoe.take.glassFrame;
      new TWEEN.Tween(target.position).to({ x: 1, z: 0.4 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ z: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 5 }, durationBase).easing(easing).start();

      target = this.tatoe.take.cap;
      new TWEEN.Tween(target.position).to({ x: 1, y: 0.3 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ y: 0.5, z: 0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 1.5, y: 1.5, z: 1.5 }, durationBase).easing(easing).start();

      target = this.tatoe.take.yellowCap;
      new TWEEN.Tween(target.position).to({ x: 1, y: 0.3 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ y: 0.5, z: 0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 1.5, y: 1.5, z: 1.5 }, durationBase).easing(easing).start();

      target = this.tatoe.take.head;
      new TWEEN.Tween(target.rotation).to({ x: 0.5, z: 2 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 1, y: 1, z: 0.03 }, durationBase).easing(easing).start();

      target = this.tatoe.take.nose;
      new TWEEN.Tween(target.position).to({ z: -1 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ z: 5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();

      target = this.tatoe.take.lipTop;
      new TWEEN.Tween(target.position).to({ y: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 3, y: 3, z: 3 }, durationBase).easing(easing).start();

      target = this.tatoe.take.lipBottom;
      new TWEEN.Tween(target.position).to({ x: 1, y: 0.25 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ z: 1 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.hat;
      new TWEEN.Tween(target.position).to({ x: -1, y: 0.75, z: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ z: 3 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.cheese;
      new TWEEN.Tween(target.position).to({ x: -1, y: 0.75, z: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ z: 3 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.hair;
      new TWEEN.Tween(target.position).to({ y: -0.4 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ x: 0.2, y: 0.1, z: -0.2 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 2, y: 0.1, z: 2 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.head;
      new TWEEN.Tween(target.rotation).to({ x: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 1, y: 1, z: 0.03 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.eyes;
      new TWEEN.Tween(target.rotation).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 2, y: 2, z: 2 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.nose;
      new TWEEN.Tween(target.position).to({ y: -2 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ x: -1.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 10, y: 10, z: 10 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.earL;
      new TWEEN.Tween(target.position).to({ x: -0.5, z: -1 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ y: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 4, y: 4 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.earR;
      new TWEEN.Tween(target.position).to({ x: -0.5, z: -0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.rotation).to({ y: 0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 2, y: 2 }, durationBase).easing(easing).start();

      target = this.tatoe.eri.strow;
      new TWEEN.Tween(target.position).to({ y: 0.5 }, durationBase).easing(easing).start();
      new TWEEN.Tween(target.scale).to({ x: 4, y: 4, z: 4 }, durationBase).easing(easing).start();

      this.tatoe.userData.isDissolved = true;

    } else {

      const objectsToReset = [
        this.tatoe.take.glassL,
        this.tatoe.take.glassR,
        this.tatoe.take.lipTop,
        this.tatoe.take.lipBottom,
        this.tatoe.take.cap,
        this.tatoe.take.glassFrame,
        this.tatoe.take.head,
        this.tatoe.take.nose,
        this.tatoe.take.yellowCap,
        this.tatoe.eri.hat,
        this.tatoe.eri.hair,
        this.tatoe.eri.head,
        this.tatoe.eri.eyes,
        this.tatoe.eri.nose,
        this.tatoe.eri.earL,
        this.tatoe.eri.earR,
        this.tatoe.eri.strow,
        this.tatoe.eri.cheese,
      ];

      objectsToReset.forEach(target => {
        if (target.userData.initialPosition) {
          new TWEEN.Tween(target.position).to(target.userData.initialPosition, durationBase).start();
        } else {
          new TWEEN.Tween(target.position).to(this.origin, durationBase).start();
        }
        new TWEEN.Tween(target.rotation).to(this.origin, durationBase).start();
        new TWEEN.Tween(target.scale).to(this.initialScale, durationBase).start();
      });

      this.tatoe.userData.isDissolved = false;
    }
  }

  extendGlasses() {
    if (!this.tatoe.take.glassL.userData.isExtended) {
      new TWEEN.Tween(this.tatoe.take.glassL.scale).to({ z: 8 }, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.take.glassR.scale).to({ z: 10 }, this.durationBase).start();
      this.tatoe.take.glassL.userData.isExtended = true;
    } else {
      new TWEEN.Tween(this.tatoe.take.glassL.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.take.glassR.scale).to(this.initialScale, this.durationBase).start();
      this.tatoe.take.glassL.userData.isExtended = false;
    }
  }

  moveShape(shapeIndex: number = 1) {
    const objects = [
      this.tatoe.shape.ta1,
      this.tatoe.shape.ta2,
      this.tatoe.shape.ta3,
      this.tatoe.shape.ta4,
      this.tatoe.shape.to1,
      this.tatoe.shape.to2,
      this.tatoe.shape.e1,
      this.tatoe.shape.e2,
      this.tatoe.shape.e3,
    ];
    const target = objects[shapeIndex];

    console.log(target.userData.isAffected);

    if (!target.userData.isAffected) {
      let property;
      switch (~~(2 * Math.random())) {
        case 0: property = target.scale; break;
        case 1: property = target.rotation; break;
      }
      new TWEEN.Tween(property).to({ x: 2, y: 2, z: 2 }, this.durationBase).easing(TWEEN.Easing.Elastic.Out).start();
      target.userData.isAffected = true;
    } else {
      new TWEEN.Tween(target.scale).to(this.initialScale, this.durationBase).easing(TWEEN.Easing.Elastic.Out).start();
      new TWEEN.Tween(target.rotation).to(this.origin, this.durationBase).easing(TWEEN.Easing.Elastic.Out).start();
      target.userData.isAffected = false;
    }
  }

  rotateHat() {
    if (!this.tatoe.eri.hat.userData.isRotated) {
      new TWEEN.Tween(this.tatoe.eri.hat.rotation).to({ y: 6 }, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.hat.scale).to({ x: 1.75, y: 1.5, z: 1.75 }, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.hat.position).to({ y: 0.2 }, this.durationBase).start();

      new TWEEN.Tween(this.tatoe.eri.cheese.rotation).to({ y: 6 }, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.cheese.scale).to({ x: 1.75, y: 1.5, z: 1.75 }, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.cheese.position).to({ y: 0.2 }, this.durationBase).start();

      this.tatoe.eri.hat.userData.isRotated = true;
    } else {
      new TWEEN.Tween(this.tatoe.eri.hat.rotation).to(this.origin, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.hat.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.hat.position).to(this.origin, this.durationBase).start();

      new TWEEN.Tween(this.tatoe.eri.cheese.rotation).to(this.origin, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.cheese.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.cheese.position).to(this.origin, this.durationBase).start();

      this.tatoe.eri.hat.userData.isRotated = false;
    }
  }

  rotateLips() {
    if (!this.tatoe.take.lipTop.userData.isRotated) {
      new TWEEN.Tween(this.tatoe.take.lipTop.rotation).to({ y: 3 }, this.durationBase * 2).start();
      new TWEEN.Tween(this.tatoe.take.lipBottom.rotation).to({ y: -3 }, this.durationBase * 2).start();
      this.tatoe.take.lipTop.userData.isRotated = true;
    } else {
      new TWEEN.Tween(this.tatoe.take.lipTop.rotation).to(this.origin, this.durationBase * 2).start();
      new TWEEN.Tween(this.tatoe.take.lipBottom.rotation).to(this.origin, this.durationBase * 2).start();
      this.tatoe.take.lipTop.userData.isRotated = false;
    }
  }

  rotateTatoe() {
    new TWEEN.Tween(this.tatoe.take.rotation).to(this.randomVector3(3, 6), this.durationBase * 20).easing(TWEEN.Easing.Quintic.Out).start();
    new TWEEN.Tween(this.tatoe.eri.rotation).to(this.randomVector3(3, 6), this.durationBase * 10).easing(TWEEN.Easing.Quintic.Out).start();
  }

  scaleTatoe() {
    if (!this.tatoe.userData.isScaled) {
      new TWEEN.Tween(this.tatoe.take.scale).to(this.randomVector3(0.1, 2), this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.scale).to(this.randomVector3(0.1, 2), this.durationBase).start();
      this.tatoe.userData.isScaled = true;
    } else {
      new TWEEN.Tween(this.tatoe.take.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.scale).to(this.initialScale, this.durationBase).start();
      this.tatoe.userData.isScaled = false;
    }
  }

  shrinkHeads() {
    if (!this.tatoe.userData.isShrinked) {
      new TWEEN.Tween(this.tatoe.take.head.scale).to(this.origin, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.head.scale).to(this.origin, this.durationBase).start();
      this.tatoe.userData.isShrinked = true;

    } else {
      new TWEEN.Tween(this.tatoe.take.head.scale).to(this.initialScale, this.durationBase).start();
      new TWEEN.Tween(this.tatoe.eri.head.scale).to(this.initialScale, this.durationBase).start();
      this.tatoe.userData.isShrinked = false;
    }
  }

  swapEyes() {
    if (!this.tatoe.eri.eyes.userData.isSwapped) {
      const eriTweens = [
        new TWEEN.Tween(this.tatoe.eri.eyes.position).to({ z: 0.3 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.eri.eyes.position).to({ x: -0.385 * 2, y: 0.05 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.eri.eyes.position).to({ z: 0.02 }, this.durationBase),
      ];
      eriTweens[0].chain(eriTweens[1]);
      eriTweens[1].chain(eriTweens[2]);
      eriTweens[0].start();

      const takeGlassLTweens = [
        new TWEEN.Tween(this.tatoe.take.glassL.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassL.position).to({ x: 0.843, y: 0 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassL.position).to({ z: 0.19 }, this.durationBase),
      ];
      takeGlassLTweens[0].chain(takeGlassLTweens[1]);
      takeGlassLTweens[1].chain(takeGlassLTweens[2]);
      takeGlassLTweens[0].start();

      const takeGlassRTweens = [
        new TWEEN.Tween(this.tatoe.take.glassR.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassR.position).to({ x: 0.7, y: 0 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassR.position).to({ z: 0.19 }, this.durationBase),
      ];
      takeGlassRTweens[0].chain(takeGlassRTweens[1]);
      takeGlassRTweens[1].chain(takeGlassRTweens[2]);
      takeGlassRTweens[0].start();

      const takeGlassFrameTweens = [
        new TWEEN.Tween(this.tatoe.take.glassFrame.position).to({ z: 0.5 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassFrame.position).to({ x: 0.771, y: -0.05 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassFrame.position).to({ z: -0.01 }, this.durationBase),
      ];
      takeGlassFrameTweens[0].chain(takeGlassFrameTweens[1]);
      takeGlassFrameTweens[1].chain(takeGlassFrameTweens[2]);
      takeGlassFrameTweens[0].start();

      this.tatoe.eri.eyes.userData.isSwapped = true;
    } else {
      const eriBackTweens = [
        new TWEEN.Tween(this.tatoe.eri.eyes.position).to({ z: 0.3 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.eri.eyes.position).to({ x: 0, y: 0 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.eri.eyes.position).to({ z: 0 }, this.durationBase),
      ];
      eriBackTweens[0].chain(eriBackTweens[1]);
      eriBackTweens[1].chain(eriBackTweens[2]);
      eriBackTweens[0].start();

      const takeBackGlassLTweens = [
        new TWEEN.Tween(this.tatoe.take.glassL.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassL.position).to({
          x: this.tatoe.take.glassL.userData.initialPosition.x,
          y: this.tatoe.take.glassL.userData.initialPosition.y
        }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassL.position).to({
          z: this.tatoe.take.glassL.userData.initialPosition.z
        }, this.durationBase),
      ];
      takeBackGlassLTweens[0].chain(takeBackGlassLTweens[1]);
      takeBackGlassLTweens[1].chain(takeBackGlassLTweens[2]);
      takeBackGlassLTweens[0].start();

      const takeBackGlassRTweens = [
        new TWEEN.Tween(this.tatoe.take.glassR.position).to({ z: 0.7 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassR.position).to({
          x: this.tatoe.take.glassR.userData.initialPosition.x,
          y: this.tatoe.take.glassR.userData.initialPosition.y
        }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassR.position).to({
          z: this.tatoe.take.glassR.userData.initialPosition.z
        }, this.durationBase),
      ];
      takeBackGlassRTweens[0].chain(takeBackGlassRTweens[1]);
      takeBackGlassRTweens[1].chain(takeBackGlassRTweens[2]);
      takeBackGlassRTweens[0].start();

      const takeBackGlassFrameTweens = [
        new TWEEN.Tween(this.tatoe.take.glassFrame.position).to({ z: 0.5 }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassFrame.position).to({ x: this.tatoe.take.glassFrame.userData.initialPosition.x, y: this.tatoe.take.glassFrame.userData.initialPosition.y }, this.durationBase),
        new TWEEN.Tween(this.tatoe.take.glassFrame.position).to({ z: this.tatoe.take.glassFrame.userData.initialPosition.z }, this.durationBase),
      ];
      takeBackGlassFrameTweens[0].chain(takeBackGlassFrameTweens[1]);
      takeBackGlassFrameTweens[1].chain(takeBackGlassFrameTweens[2]);
      takeBackGlassFrameTweens[0].start();

      this.tatoe.eri.eyes.userData.isSwapped = false;
    }
  }

  switchWireframes() {
    this.tatoe.userData.isWired = !this.tatoe.userData.isWired;
    this.tatoe.take.traverse((child: any) => {
      if (child.material) {
        child.material.wireframe = this.tatoe.userData.isWired;
      }
    });
    this.tatoe.eri.traverse((child: any) => {
      if (child.material) {
        child.material.wireframe = this.tatoe.userData.isWired;
      }
    });
  }

  toggleRotation() {
    this.controls.autoRotate = !this.controls.autoRotate;
  }

  zoomOut() {
    console.log(this.tatoe.userData.isZoomOut);
    let scale;
    let easing;
    if (!this.tatoe.userData.isZoomOut) {
      scale = { x: 0.005, y: 0.005, z: 0.005 };
      easing = TWEEN.Easing.Exponential.Out;
      this.tatoe.shape.traverse((child: any) => {
        if (child.material) {
          new TWEEN.Tween(child.material).to({ opacity: 1 }).start();
        }
      });
      this.tatoe.userData.isZoomOut = true;
    } else {
      scale = this.initialScale;
      easing = TWEEN.Easing.Exponential.InOut;
      this.tatoe.userData.isZoomOut = false;
      this.tatoe.shape.traverse((child: any) => {
        if (child.material) {
          new TWEEN.Tween(child.material).to({ opacity: 0 }).start();
        }
      });
    }
    const tween: any = new TWEEN.Tween(this.tatoe.scale).to(scale, this.durationBase * 10).easing(easing);
    tween.paused = true;
    tween.start();
  }

  reset() {
    this.tatoe.take.setRotationFromEuler(this.initialEuler);
    this.tatoe.eri.setRotationFromEuler(this.initialEuler);

    this.camera.zoom = 2;
    this.camera.position.set(10, 5, 0);
    this.camera.updateProjectionMatrix();

    this.tatoe.userData.isNormalMaterial = true;
    this.changeMaterial();

    this.tatoe.take.traverse((child: any) => {
      if (child.material) {
        child.material.wireframe = false;
      }
    });
    this.tatoe.eri.traverse((child: any) => {
      if (child.material) {
        child.material.wireframe = false;
      }
    });
    this.tatoe.userData.isWired = false;

    this.tatoe.userData.isScaled = true;
    this.scaleTatoe();

    this.tatoe.userData.isDissolved = true;
    this.dissolve();

    this.tatoe.shape.traverse((child: THREE.Mesh) => {
      if (child instanceof THREE.Mesh) {
        new TWEEN.Tween(child.scale).to(this.initialScale, this.durationBase).start();
        new TWEEN.Tween(child.rotation).to(this.origin, this.durationBase).start();
      }
    })
  }

  private randomVector3(min: number, max: number): THREE.Vector3 {
    const ra = Math.random() * (max - min) + min;
    const rb = Math.random() * (max - min) + min;
    const rc = Math.random() * (max - min) + min;
    return new THREE.Vector3(ra, rb, rc);
  }
}
