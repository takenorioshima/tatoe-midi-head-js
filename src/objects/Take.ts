import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Take extends THREE.Group {

  cap: THREE.Object3D | undefined;
  head: THREE.Object3D | undefined;
  nose: THREE.Object3D | undefined;
  lipTop: THREE.Object3D | undefined;
  lipBottom: THREE.Object3D | undefined;
  glassL: THREE.Object3D | undefined;
  glassR: THREE.Object3D | undefined;
  glassFrame: THREE.Object3D | undefined;
  yellowCap: THREE.Object3D | undefined;

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
      (this.yellowCap as THREE.Object3D).visible = false;

      (this.glassL as THREE.Object3D).userData.initialPosition = (this.glassL as THREE.Object3D).position.clone();
      (this.glassR as THREE.Object3D).userData.initialPosition = (this.glassR as THREE.Object3D).position.clone();
      (this.glassFrame as THREE.Object3D).userData.initialPosition = (this.glassFrame as THREE.Object3D).position.clone();
      (this.lipTop as THREE.Object3D).userData.initialPosition = (this.lipTop as THREE.Object3D).position.clone();
      (this.lipBottom as THREE.Object3D).userData.initialPosition = (this.lipBottom as THREE.Object3D).position.clone();

      this.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.userData.initialMaterial = (child.material as THREE.Material).clone();
        }
      });

      parent.add(this);
    });
  }

}
