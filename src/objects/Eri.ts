import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Eri extends THREE.Group {

  hat: THREE.Object3D | undefined;
  hair: THREE.Object3D | undefined;
  head: THREE.Object3D | undefined;
  nose: THREE.Object3D | undefined;
  earL: THREE.Object3D | undefined;
  earR: THREE.Object3D | undefined;
  eyes: THREE.Object3D | undefined;
  strow: THREE.Object3D | undefined;
  cheese: THREE.Object3D | undefined;

  constructor(parent: THREE.Group) {
    super();

    const loader = new GLTFLoader();

    this.name = 'eri';

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
      (this.cheese as THREE.Object3D).visible = false;

      this.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.userData.initialMaterial = (child.material as THREE.Material).clone();
        }
      });

      parent.add(this);
    });
  }
}
