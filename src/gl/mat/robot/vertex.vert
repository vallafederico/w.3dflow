#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>



uniform float u_time;
varying vec2 v_uv;
varying vec3 v_normal;

void main() {
  #include <uv_vertex>
  #include <skinbase_vertex>
  #include <begin_vertex>


  vec4 tr = modelViewMatrix * vec4(position, 1.0);
  // gl_Position = projectionMatrix * tr;
  v_uv = uv;
  v_normal = normal;

  
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  #include <worldpos_vertex>


}