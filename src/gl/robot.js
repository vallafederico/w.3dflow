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

    if (this.skin) this.bones = this.skin.findBone();
    // console.log(this.bones);
  }

  render(t, { x, y }) {
    if (!this.shouldRedner) return;

    if (this.skin) {
      this.skin.tick(t);

      // ** ----- bones ops
      if (this.bones) {
        // * neck
        this.bones.bb_neck.rotation.y = x * 0.2;
        this.bones.bb_neck.rotation.x = y * 0.2;
        // * eye
        this.bones.bb_eye_ring.rotation.z = x * 0.5;
        this.bones.bb_eye_ring.rotation.x = -1.570796461153735 + y * 0.3;
        // * bust
        this.bones.bb_bust.rotation.x = y * 0.2;
        this.bones.bb_bust.rotation.y = x * 0.2;
      }
    }
  }

  /** -------- Utils */
  loop(model) {
    model.traverse((o) => {
      /** ALL MESHES */
      if (o.isMesh) {
        o.material = this.material;
      }
    });

    return model;
  }
}
