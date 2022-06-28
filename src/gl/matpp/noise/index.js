import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";

export const NoiseShader = {
  uniforms: {
    tDiffuse: { value: null },
    u_time: { value: 0.0 },
  },
  vertexShader,
  fragmentShader,
};
