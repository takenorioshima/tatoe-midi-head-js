import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Take.glb';

export default class Take extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'take';

    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
      this.cap = this.getObjectByName('cap');
      this.head = this.getObjectByName('head');
      this.nose = this.getObjectByName('nose');
      this.lipTop = this.getObjectByName('lipTop');
      this.lipBottom = this.getObjectByName('lipBottom');
      this.glassL = this.getObjectByName('glassL');
      this.glassR = this.getObjectByName('glassR');
      this.glassFrame = this.getObjectByName('glassFrame');
      window.take = this;
    });
  }
}
