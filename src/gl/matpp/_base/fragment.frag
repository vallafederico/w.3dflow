#include <common>

uniform sampler2D tDiffuse;
uniform float u_time;
varying vec2 v_uv;

void main() {
    vec3 tx = texture2D( tDiffuse, v_uv ).rgb;

    gl_FragColor.rgb = tx;
    gl_FragColor.a = 1.;
}