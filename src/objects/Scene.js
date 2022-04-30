import { Group } from 'three';
import Take from './Take/Take.js';
import Eri from './Eri/Eri.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const take = new Take();
    const eri = new Eri();
    const lights = new BasicLights();

    take.position.set(-0.385, 0, 0);
    eri.position.set(0.385, 0, 0);
    this.add(take, eri, lights);
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / -1000;
  }
}