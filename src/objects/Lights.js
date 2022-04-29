import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight, Color } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const pointPink = new PointLight(0xFF6AFE, 0.7, 100, 1, 2);
    const pointGreen = new PointLight(0x66FF81, 0.7, 100, 1, 2);
    const dir = new SpotLight(0xFFFFFF, 0.8, 7, 0.8, 1, 1);
    const ambi = new AmbientLight( 0x404040 , 2);
    
    dir.position.set(0, 1, 5);
    dir.target.position.set(0,0,0);

    pointPink.position.set(-2, -1, 2);
    pointGreen.position.set(2, -1, 2);

    this.add(ambi, pointPink, pointGreen);

  }
}
