import { Scene } from "three";

import Robot from "./robot";

export default class extends Scene {
  constructor(data = {}) {
    super();
    this.data = data;
    this.shouldRender = true;

    this.create();
  }

  create() {
    this.robot = new Robot(this.data.robot);
    this.add(this.robot);
  }

  /** Pass
   */

  render(t) {
    if (!this.shouldRender) return;
    if (this.robot) this.robot.render(t);

    // console.log(t);
  }

  resize() {}
}
