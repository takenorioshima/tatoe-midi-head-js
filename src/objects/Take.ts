import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Animation from './Animation';

export default class Take extends THREE.Group {

  cap: any;
  head: any;
  nose: any;
  lipTop: any;
  lipBottom: any;
  glassL: any;
  glassR: any;
  glassFrame: any;
  yellowCap: any;

  constructor(parent: THREE.Group) {
    super();

    const loader = new GLTFLoader();

    this.name = 'take';

    loader.load('./models/Take.glb', (gltf) => {
      this.add(gltf.scene);

      this.cap = this.getObjectByName('cap');
      this.head = this.getObjectByName('head');
      this.nose = this.getObjectByName('nose');
      this.lipTop = this.getObjectByName('lipTop');
      this.lipBottom = this.getObjectByName('lipBottom');
      this.glassL = this.getObjectByName('glassL');
      this.glassR = this.getObjectByName('glassR');
      this.glassFrame = this.getObjectByName('glassFrame');
      this.yellowCap = this.getObjectByName('yellowCap');
      this.yellowCap.visible = false;

      this.glassL.userData.initialPosition = this.glassL.position.clone();
      this.glassR.userData.initialPosition = this.glassR.position.clone();
      this.glassFrame.userData.initialPosition = this.glassFrame.position.clone();
      this.lipTop.userData.initialPosition = this.lipTop.position.clone();
      this.lipBottom.userData.initialPosition = this.lipBottom.position.clone();

      this.traverse((child: any) => {
        if (child.material) {
          child.userData.initialMaterial = child.material.clone();
        }
      });

      parent.add(this);
    });
  }
}
