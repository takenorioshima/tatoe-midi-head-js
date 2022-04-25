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
    });
  }
}
