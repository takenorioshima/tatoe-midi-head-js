import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Shape extends THREE.Group {

  cube: any;

  constructor(parent: THREE.Group) {
    super();

    const loader = new GLTFLoader();

    this.name = 'shape';
    this.scale.set(200, 200, 200);

    loader.load('./models/Shape.glb', (gltf) => {
      this.add(gltf.scene);
      this.traverse((child: any) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });
      parent.add(this);
    });
  }
}
