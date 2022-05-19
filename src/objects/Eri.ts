import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Eri extends THREE.Group {

  hat: any;
  hair: any;
  head: any;
  nose: any;
  earL: any;
  earR: any;
  eyes: any;
  strow: any;
  cheese: any;

  constructor(parent: THREE.Group) {
    super();

    const loader = new GLTFLoader();

    loader.load('./models/Eri.glb', (gltf) => {
      this.add(gltf.scene);

      this.hat = this.getObjectByName('hat');
      this.hair = this.getObjectByName('hair');
      this.head = this.getObjectByName('head');
      this.nose = this.getObjectByName('nose');
      this.earL = this.getObjectByName('earL');
      this.earR = this.getObjectByName('earR');
      this.strow = this.getObjectByName('strow');
      this.eyes = this.getObjectByName('eyes');
      this.cheese = this.getObjectByName('cheese');
      this.cheese.visible = false;

      this.traverse((child: any) => {
        if (child.material) {
          child.userData.initialMaterial = child.material.clone();
        }
      });

      parent.add(this);
    });
  }
}
