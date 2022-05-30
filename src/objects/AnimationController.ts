import { WebMidi } from 'webmidi';
import Animation from './Animation';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class AnimationController extends Animation {
  constructor(tatoe: THREE.Group | any, camera: THREE.OrthographicCamera, controls: OrbitControls, renderer: THREE.WebGLRenderer, window: Window) {

    super(tatoe, camera, controls, renderer);

    /**
     * Detect MIDI device.
     */

    const onMidiEnabled = () => {

      let midiInput;
      const pisoundMidiInputName = 'pisound MIDI PS-2ZF0Y18';

      if (WebMidi.inputs.length < 1) {
        console.log('[tatoe] No MIDI device detected.');
      } else {

        if (WebMidi.getInputByName(pisoundMidiInputName)) {
          midiInput = WebMidi.getInputByName(pisoundMidiInputName);
        } else {
          midiInput = WebMidi.getInputByName(WebMidi.inputs[0].name);
        }
        console.log(`[tatoe] ${midiInput.name} was detected.`);

        /**
         * Listen MIDI events.
         */

        midiInput.addListener('noteon', e => {
          const noteGroup = e.note.number % 16;
          console.log(`[tatoe] note.number = ${e.note.number} | noteGroup = ${noteGroup}`);
          if (e.note.number == 36) {
            this.reset();
          } else {
            if (noteGroup == 1) {
              this.changeBackgroundColor();
            }
            if (noteGroup == 2) {
              this.changeCameraPosition();
            }
            if (noteGroup == 3) {
              this.dissolve();
            }
            if (noteGroup == 4) {
              this.changeCap();
            }
            if (noteGroup == 5) {
              this.changeHat();
            }
            if (noteGroup == 6) {
              this.changeMaterial();
            }
            if (noteGroup == 7) {
              this.dissolve();
            }
            if (noteGroup == 8) {
              this.extendGlasses();
            }
            if (noteGroup == 9) {
              this.rotateHat();
            }
            if (noteGroup == 10) {
              this.rotateLips();
            }
            if (noteGroup == 11) {
              this.rotateTatoe();
            }
            if (noteGroup == 12) {
              this.scaleTatoe();
            }
            if (noteGroup == 13) {
              this.shrinkHeads();
            }
            if (noteGroup == 14) {
              this.swapEyes();
            }
            if (noteGroup == 15) {
              this.switchWireframes();
            }
            if (noteGroup == 16) {
              this.toggleRotation();
            }
            if (noteGroup == 17) {
              this.reset();
            }
          }
        });
      }
    }
    WebMidi.enable().then(onMidiEnabled).catch(err => console.log(err));

    /**
     * Listen keyboard events.
     */

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log(`keydown: ${e.code}`);
      if (e.code == 'KeyB' && !e.repeat) {
        this.changeBackgroundColor();
      }
      if (e.code == 'KeyC' && !e.repeat) {
        this.changeCameraPosition();
      }
      if (e.code == 'KeyD' && !e.repeat) {
        this.dissolve();
      }
      if (e.code == 'KeyE' && !e.repeat) {
        this.swapEyes();
      }
      if (e.code == 'KeyH' && !e.repeat) {
        this.changeHat();
      }
      if (e.code == 'KeyL' && !e.repeat) {
        this.rotateLips();
      }
      if (e.code == 'KeyM' && !e.repeat) {
        this.changeMaterial();
      }
      if (e.code == 'KeyS' && !e.repeat) {
        this.shrinkHeads();
      }
      if (e.code == 'KeyT' && !e.repeat) {
        this.changeCap();
      }
      if (e.code == 'KeyW' && !e.repeat) {
        this.switchWireframes();
      }
      if (e.code == 'KeyY' && !e.repeat) {
        this.changeCap();
      }
      if (e.code == 'KeyZ' && !e.repeat) {
        this.zoomOut();
      }
      if (e.code == 'Digit1' && !e.repeat) {
        this.moveShape(1);
      }
      if (e.code == 'Digit2' && !e.repeat) {
        this.moveShape(2);
      }
      if (e.code == 'Digit3' && !e.repeat) {
        this.moveShape(3);
      }
      if (e.code == 'Digit4' && !e.repeat) {
        this.toggleRotation();
        this.moveShape(4);
      }
      if (e.code == 'Digit5' && !e.repeat) {
        this.rotateTatoe();
        this.moveShape(5);
      }
      if (e.code == 'Digit6' && !e.repeat) {
        this.scaleTatoe();
        this.moveShape(6);
      }
      if (e.code == 'Digit7' && !e.repeat) {
        this.moveShape(7);
      }
      if (e.code == 'Digit8' && !e.repeat) {
        this.extendGlasses();
        this.moveShape(8);
      }
      if (e.code == 'Digit9' && !e.repeat) {
        this.rotateHat();
      }
      if (e.code == 'Digit0' && !e.repeat) {
        this.moveShape(0);
      }
      if (e.code == 'Escape' && !e.repeat) {
        this.reset();
      }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      console.log(`keyup: ${e.code}`);
      if (e.code == 'KeyL' && !e.repeat) {
        this.rotateLips();
      }
      if (e.code == 'Digit5' && !e.repeat) {
        this.rotateTatoe();
      }
      if (e.code == 'Digit9' && !e.repeat) {
        this.rotateHat();
      }
    });
  }
}
