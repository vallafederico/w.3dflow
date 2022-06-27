import { Clock, AnimationMixer } from "three";

export default class {
  constructor(mesh, anim) {
    this.clock = new Clock();
    this.mixer = new AnimationMixer(mesh);
    this.mesh = mesh;

    this.a = {
      tracks: anim,
      currInd: 0,
      currAct: null,
    };

    // this.loopSingle(0, 0.1);
  }

  /** -------- Play */

  play(index = 0, transitionDuration = 2) {
    if (index === this.a.curr) return;

    if (this.a.currAct != null) {
      const previousAction = this.a.currAct;
      previousAction.fadeOut(transitionDuration);
    }

    if (!this.a.tracks[index]) return;

    this.a.currAct = this.mixer.clipAction(this.a.tracks[index]);
    this.a.currAct
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(transitionDuration)
      .play();
  }

  loopSingle(index, timeScale = 1) {
    const single = this.mixer.clipAction(this.a.tracks[index]);
    single
      .reset()
      .setEffectiveTimeScale(timeScale)
      .setEffectiveWeight(1)
      .play();
  }

  /** -------- Render */

  tick(time) {
    const t = this.clock.getDelta();

    this.mixer.update(t);
  }

  /** -------- Utils */
  findBone(name) {
    this.bones = {};
    this.mesh.traverse((o) => {
      if (o.isBone && o.name === name) this.bones.re = o;
    });

    return this.bones;
  }
}
