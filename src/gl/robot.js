import { Group } from "three";
import RobotMaterial from "./mat/robot";

export default class extends Group {
  constructor(data) {
    super();
    this.data = data;
    this.shouldRedner = true;

    this.create();
  }

  create() {
    this.material = new RobotMaterial({
      u_t1: this.data.t_robot,
    });

    this.model = this.loop(this.data.m_robot.model);

    this.add(this.model);
  }

  render(t) {
    if (!this.shouldRedner) return;
    // console.log(t);
  }

  /** -------- Utils */
  loop(model) {
    model.traverse((o) => {
      if (o.isMesh) {
        o.material = this.material;
      }
    });

    return model;
  }
}
