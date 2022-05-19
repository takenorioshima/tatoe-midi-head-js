import * as THREE from 'three';
import Take from './Take';
import Eri from './Eri';

export default class Tatoe extends THREE.Group {

  take: any;
  eri: any;
  cube: any;

  constructor() {
    super();

    this.userData = {
      isRotation: true
    };

    this.take = new Take(this);
    this.eri = new Eri(this);
    this.take.position.set(-0.385, 0, 0);
    this.eri.position.set(0.385, 0, 0);

    const directionLight = new THREE.DirectionalLight(0xCCCCCC);
    const ambientLight = new THREE.AmbientLight(0xAAAAAA);
    directionLight.position.set(1, 1, 1);
    ambientLight.position.set(0, 0, 0);
    const lightHelper = new THREE.DirectionalLightHelper(directionLight);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.material.wireframe = true;

    this.add(this.cube, directionLight, ambientLight, lightHelper);
  }

  update() {
    if (this.userData.isRotation) {
      this.rotation.y += 0.01;
    }
    this.cube.rotation.x += -0.02;
    this.cube.rotation.y += -0.02;
  }
}
