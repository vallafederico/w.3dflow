import { Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BaseShader } from "./matpp/_base";

export default class {
  constructor(renderer, scene, camera) {
    this.isActive = false;
    // console.log(renderer, scene, camera);

    this.scene = scene;
    this.camera = camera;
    this.composer = new EffectComposer(renderer);

    this.create();
  }

  create() {
    this.rpass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.rpass);

    // this.composer.addPass(this.createBase());
    // this.composer.addPass(this.createBloom());
  }

  render(t) {
    if (!this.isActive) return;

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
      strength: 0,
      threshold: 0.9999,
      radius: 0.1,
    };

    this.bloomPass = new UnrealBloomPass(
      params.size,
      params.strength,
      params.threshold,
      params.radius
    );

    return this.bloomPass;
  }

  createBase() {
    this.basePass = new ShaderPass(BaseShader);
    return this.basePass;
  }
}
