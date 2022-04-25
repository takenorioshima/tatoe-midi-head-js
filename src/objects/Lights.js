import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight, Color } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const point = new PointLight(0xFF0000, 100, 1000, 1000);
    const dir = new SpotLight(0xFFFFFF, 0.8, 7, 0.8, 1, 1);
    const ambi = new AmbientLight( 0x404040 , 2);
    const hemi = new HemisphereLight( 0xffffbb, 0x080820, 1.15 )

    dir.position.set(1000, 100, 500);
    dir.target.position.set(0,0,0);

    point.position.set(1000, 1000, 500);
    point.intensity = 0.5;

    this.add(point, ambi, hemi, dir);

  }
}
