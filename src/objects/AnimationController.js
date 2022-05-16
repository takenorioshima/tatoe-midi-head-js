import { WebMidi } from 'webmidi';
import Animation from './Animation';

export default class AnimationController {
  constructor(scene, camera, renderer) {

    const animation = new Animation(scene, camera, renderer);

    /**
     * Listen MIDI events.
     */

    WebMidi.enable().then(onMidiEnabled).catch(err => console.log(err));

    function onMidiEnabled() {

      let midiInput;
      const pisoundMidiInputName = 'pisound MIDI PS-2ZF0Y18';

      if (WebMidi.inputs.length < 1) {
        console.log('No device detected.');
      } else {
        if (WebMidi.getInputByName(pisoundMidiInputName)) {
          midiInput = WebMidi.getInputByName(pisoundMidiInputName);
        } else {
          midiInput = WebMidi.getInputByName(WebMidi.inputs[0].name);
        }
        console.log(`[tatoe] ${midiInput.name} was detected.`);

        let animationFunctions = Object.getOwnPropertyNames(Animation.prototype);
        const filter = ['constructor', 'init'];
        animationFunctions = animationFunctions.filter(function (v) {
          return !filter.includes(v);
        });
        console.log(`[tatoe] ${animationFunctions.length} animations are detected. ${animationFunctions}`);

        midiInput.addListener("noteon", e => {
          const noteGroup = e.note.number % animationFunctions.length;
          console.log(`[tatoe] note.number = ${e.note.number} | noteGroup = ${noteGroup}`);
          if (e.note.number == 36) {
            animation.reset();
          } else {
            if (noteGroup == 1) {
              animation.changeBackgroundColor();
            }
            if (noteGroup == 2) {
              animation.changeCameraPosition();
            }
            if (noteGroup == 3) {
              animation.dissolve();
            }
            if (noteGroup == 4) {
              animation.extendGlasses();
            }
            if (noteGroup == 5) {
              animation.rotateHat();
            }
            if (noteGroup == 6) {
              animation.rotateLips();
            }
            if (noteGroup == 7) {
              animation.rotateTatoe();
            }
            if (noteGroup == 8) {
              animation.scaleTatoe();
            }
            if (noteGroup == 9) {
              animation.shrinkHeads();
            }
            if (noteGroup == 10) {
              animation.swapEyes();
            }
            if (noteGroup == 11) {
              animation.switchWireframes();
            }
            if (noteGroup == 12) {
              animation.changeMaterial();
            }
            if (noteGroup == 13) {
              animation.toggleRotation();
            }
            if (noteGroup == 14) {
              animation.reset();
            }
          }
        })
      }
    }

    /**
     * Listen keyboard events.
     */

    function targetKey(e, code) {
      if (e.code == code && !e.repeat) {
        return true;
      }
    }

    document.addEventListener('keypress', e => {
      console.log(e);
      if (window.take && window.eri) {
        if (targetKey(e, 'KeyB')) {
          animation.changeBackgroundColor();
        }
        if (targetKey(e, 'KeyC')) {
          animation.changeCameraPosition();
        }
        if (targetKey(e, 'KeyD')) {
          animation.dissolve();
        }
        if (targetKey(e, 'KeyE')) {
          animation.swapEyes();
        }
        if (targetKey(e, 'KeyL')) {
          animation.rotateLips();
        }
        if (targetKey(e, 'KeyS')) {
          animation.shrinkHeads();
        }
        if (targetKey(e, 'KeyW')) {
          animation.switchWireframes();
        }
        if (targetKey(e, 'KeyM')) {
          animation.changeMaterial();
        }
        if (targetKey(e, 'Digit4')) {
          animation.toggleRotation()
        }
        if (targetKey(e, 'Digit6')) {
          animation.rotateTatoe();
        }
        if (targetKey(e, 'Digit7')) {
          animation.scaleTatoe();
        }
        if (targetKey(e, 'Digit8')) {
          animation.extendGlasses();
        }
        if (targetKey(e, 'Digit9')) {
          animation.rotateHat();
        }
        if (targetKey(e, 'Digit0')) {
          animation.reset();
        }
      }
    }, false);

    document.addEventListener('keyup', e => {
      if (window.take && window.eri) {
        if (targetKey(e, 'KeyL')) {
          animation.rotateLips();
        }
        if (targetKey(e, 'Digit6')) {
          animation.rotateTatoe();
        }
        if (targetKey(e, 'Digit7')) {
          take.isScaled = true;
          animation.scaleTatoe();
        }
        if (targetKey(e, 'Digit8')) {
          animation.extendGlasses();
        }
        if (targetKey(e, 'Digit9')) {
          animation.rotateHat();
        }
      }
    }, false);
  }
}
