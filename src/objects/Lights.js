import { Group, AmbientLight, DirectionalLight, DirectionalLightHelper } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const dir = new DirectionalLight(0xCCCCCC);
    const ambi = new AmbientLight(0xCCCCCC);
    dir.position.set(1, 1, 1);
    dir.target.position.set(0, 0, 0);

    const lightHelper = new DirectionalLightHelper( dir );
    
    this.add(ambi, dir, lightHelper);
  }
}
