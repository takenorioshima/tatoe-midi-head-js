import { OrthographicCamera, Vector3 } from 'three';

export default class Camera extends OrthographicCamera {
  constructor() {
    super();

    this.position.set(10, 10, 10);
    this.zoom = 1.5;
    this.lookAt(new Vector3(0, 0, 0));
  }
}
