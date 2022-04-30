export default class Animation {

  update(scene) {
    if( window.objectsLoaded >= 2 ){
        scene.getObjectByName('take').glassR.position.y += 0.001;
        scene.getObjectByName('take').cap.position.y -= 0.001;
        scene.getObjectByName('take').head.position.x -= 0.005;
        scene.getObjectByName('take').glassFrame.position.x -= 0.0003;
    
        scene.getObjectByName('eri').earL.position.x += 0.0001;
        scene.getObjectByName('eri').earR.position.z += 0.0001;
        scene.getObjectByName('eri').hair.position.z += 0.0002;
        scene.getObjectByName('eri').head.position.x -= 0.005;
        scene.getObjectByName('eri').head.position.z += 0.003;
        scene.getObjectByName('eri').hair.position.x += 0.001;
        scene.getObjectByName('eri').hat.position.y += 0.001;
        scene.getObjectByName('eri').nose.position.z += 0.001;
    }
  }
  
}
