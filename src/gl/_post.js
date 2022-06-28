import { Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { NoiseShader } from "./matpp/noise";

export default class {
  constructor(renderer, scene, camera) {
    this.isActive = true;
    // console.log(renderer, scene, camera);

    this.scene = scene;
    this.camera = camera;
    this.composer = new EffectComposer(renderer);

    this.create();
  }

  create() {
    this.rpass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.rpass);

    // this.composer.addPass(this.createNoise());

    this.composer.addPass(this.createBloom());
    this.composer.addPass(this.createBokeh());
  }

  render(t, { x, y }) {
    if (!this.isActive) return;

    if (this.bokehPass) this.bokehPass.uniforms.focus.value = 2.5 + y * 3;
    // if (this.bloomPass) this.bloomPass.threshold = 0.7 + y;
    if (this.noisePass) this.noisePass.uniforms.u_time.value = t;

    this.composer.render(t);
  }

  /** --  Post Passes */
  createBloom() {
    const multiplier = 1;

    const params = {
      size: new Vector2(
        window.innerWidth * multiplier,
        window.innerHeight * multiplier
      ),
      strength: 0.5,
      threshold: 0.7,
      radius: 0.01,
    };

    this.bloomPass = new UnrealBloomPass(
      params.size,
      params.strength,
      params.threshold,
      params.radius
    );

    // console.log(this.bloomPass);
    return this.bloomPass;
  }

  createBokeh() {
    const params = {
      focus: 2.5,
      aperture: 0.001,
      maxblur: 0.01,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.bokehPass = new BokehPass(this.scene, this.camera, params);

    // console.log(this.bokehPass);
    return this.bokehPass;
  }

  createNoise() {
    this.noisePass = new ShaderPass(NoiseShader);

    // console.log(this.noisePass);
    return this.noisePass;
  }
}

/**
 * --- NOTES
 * on BokehPass
 * _ focus is @ 2.5
 *
 *
 */
