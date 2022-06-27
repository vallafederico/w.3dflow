import { Group } from "three";
import RobotMaterial from "./mat/robot";
import Skin from "./skin";

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
    this.position.y = -0.5;

    this.add(this.model);

    if (this.data.m_robot.anim)
      this.skin = new Skin(this.model, this.data.m_robot.anim);
  }

  render(t) {
    if (!this.shouldRedner) return;

    if (this.skin) this.skin.tick(t);
    // console.log(t);
  }

  /** -------- Utils */
  loop(model) {
    model.traverse((o) => {
      /** ALL MESHES */
      if (o.isMesh) {
        // o.frustumCulled = false;
        o.material = this.material;
      }

      /** ALL BONES */
      //   if (o.isBone) {
      //     console.log(o.name);
      //   }
    });

    return model;
  }
}
