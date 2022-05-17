import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Eri.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

export default class Eri extends Group {
  constructor() {
    const loader = new GLTFLoader();

    super();

    this.name = 'eri';

    loader.load(MODEL, (gltf) => {
      this.add(gltf.scene);
      this.hat = this.getObjectByName('hat');
      this.hair = this.getObjectByName('hair');
      this.head = this.getObjectByName('head');
      this.earL = this.getObjectByName('earL');
      this.earR = this.getObjectByName('earR');
      this.eyes = this.getObjectByName('eyes');
      this.nose = this.getObjectByName('nose');
      this.strow = this.getObjectByName('strow');
      this.cheese = this.getObjectByName('cheese');
      this.cheese.visible = false;
      window.objectsLoaded++;
    });
  }
}
