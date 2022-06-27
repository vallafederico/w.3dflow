uniform float u_time;
uniform sampler2D u_t1; 

varying vec2 v_uv;


void main() {

  vec3 img = texture2D(u_t1, v_uv).rgb;


  gl_FragColor = vec4(img, 1.);
  // gl_FragColor = vec4(1., 0., 0., 1.);
}
