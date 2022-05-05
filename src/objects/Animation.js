import * as THREE from 'three';

export default class Animation {
  constructor( scene ){

    const initialEuler = new THREE.Euler( 0, 0, 0, 'XYZ' );

    document.addEventListener('keypress', onKeypressEvent, false);
    function onKeypressEvent(e){
      console.log(e);
      if( window.take && window.eri ){
        if(e.code=='Digit6'){
          rotate();
        }
        if(e.code=='Digit7'){
          scale();
        }
        if(e.code=='Digit0'){
          reset();
        }
      }
    }

    function scale(){
      let randomA = Math.random() * 2;
      let randomB = Math.random() * 2;
      let randomC = Math.random() * 2;
      take.scale.set( randomA, randomB, randomC );
      eri.scale.set( randomB, randomC, randomA );
    }

    function rotate(){
      let randomA = Math.random() * 3;
      let randomB = Math.random() * 3;
      let randomC = Math.random() * 3;
      take.rotation.set( randomA, randomB, randomC );
      eri.rotation.set( randomB, randomC, randomA );
    }

    function reset(){
      take.setRotationFromEuler(initialEuler);
      eri.setRotationFromEuler(initialEuler);
      take.scale.set(1, 1, 1);
      eri.scale.set(1, 1, 1);
    }

  }
}
