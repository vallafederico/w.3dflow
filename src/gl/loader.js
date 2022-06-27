import Emitter from "tiny-emitter";

import loadTexture from "./util/texture-loader";
import loadModel from "./util/model-loader";

import { LIB } from "../assets/lib";

export default class extends Emitter {
  constructor() {
    super();

    console.time("loading");
  }

  async load() {
    const [m_robot, t_robot] = await Promise.all([
      loadModel(LIB.m_robot),
      loadTexture(LIB.t_robot),
    ]);

    t_robot.flipY = false;

    const loaded = {
      robot: { m_robot, t_robot },
    };

    console.timeEnd("loading");
    this.emit("loaded", loaded);
  }
}
