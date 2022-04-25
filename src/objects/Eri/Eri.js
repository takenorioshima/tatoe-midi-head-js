import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Eri.glb';

export default class Eri extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'eri';

    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
    });
  }
}
