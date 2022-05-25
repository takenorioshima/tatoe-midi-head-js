import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Shape extends THREE.Group {

  ta1: THREE.Object3D | undefined;
  ta2: THREE.Object3D | undefined;
  ta3: THREE.Object3D | undefined;
  ta4: THREE.Object3D | undefined;
  to1: THREE.Object3D | undefined;
  to2: THREE.Object3D | undefined;
  e1: THREE.Object3D | undefined;
  e2: THREE.Object3D | undefined;
  e3: THREE.Object3D | undefined;

  constructor(parent: THREE.Group) {
    super();

    this.name = 'shape';
    this.scale.set(200, 200, 200);

    const loader = new GLTFLoader();

    loader.load('./models/Shape.glb', (gltf) => {
      this.add(gltf.scene);

      this.ta1 = this.getObjectByName('ta1');
      this.ta2 = this.getObjectByName('ta2');
      this.ta3 = this.getObjectByName('ta3');
      this.ta4 = this.getObjectByName('ta4');
      this.to1 = this.getObjectByName('to1');
      this.to2 = this.getObjectByName('to2');
      this.e1 = this.getObjectByName('e1');
      this.e2 = this.getObjectByName('e2');
      this.e3 = this.getObjectByName('e3');

      this.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });

      parent.add(this);
    });
  }
}
