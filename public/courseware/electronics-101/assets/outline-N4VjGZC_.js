import{C as e,Q as t,U as n,_ as r,et as i,f as a,j as o,t as s,x as c}from"./three-D4ynir_D.js";var l=0,u=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,d=`
  uniform sampler2D tColor;
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform vec2 texel;
  uniform float thickness;
  uniform float depthRange;
  uniform float depthThreshold;
  uniform float normalThreshold;
  uniform vec3 lineColor;
  uniform float lineOpacity;
  uniform bool srgbOut;
  varying vec2 vUv;

  float depthAt(vec2 uv) { return texture2D(tDepth, uv).r * depthRange; }

  // Edge strength between the centre pixel and a pair of opposite neighbours.
  float edgePair(vec2 uv, vec2 off, float d0, vec4 n0) {
    vec4 na = texture2D(tNormal, uv + off);
    vec4 nb = texture2D(tNormal, uv - off);
    float da = depthAt(uv + off);
    float db = depthAt(uv - off);

    // silhouette against empty space
    float e = max(abs(na.a - n0.a), abs(nb.a - n0.a));

    if (n0.a > 0.5) {
      // depth: second derivative ignores sloped planes, catches steps
      float lap = abs(da + db - 2.0 * d0);
      float stepA = (na.a > 0.5) ? abs(da - d0) : 0.0;
      float stepB = (nb.a > 0.5) ? abs(db - d0) : 0.0;
      float dEdge = smoothstep(depthThreshold, depthThreshold * 2.0, min(lap, max(stepA, stepB) * 2.0));
      e = max(e, dEdge);

      // normal creases
      vec3 c = n0.xyz * 2.0 - 1.0;
      float ca = na.a > 0.5 ? 1.0 - dot(c, na.xyz * 2.0 - 1.0) : 0.0;
      float cb = nb.a > 0.5 ? 1.0 - dot(c, nb.xyz * 2.0 - 1.0) : 0.0;
      e = max(e, 0.9 * smoothstep(normalThreshold, normalThreshold * 2.2, max(ca, cb)));
    }
    return e;
  }

  void main() {
    vec4 col = texture2D(tColor, vUv);
    vec4 n0 = texture2D(tNormal, vUv);
    float d0 = depthAt(vUv);

    vec2 o = texel * thickness;
    float e = 0.0;
    e = max(e, edgePair(vUv, vec2(o.x, 0.0), d0, n0));
    e = max(e, edgePair(vUv, vec2(0.0, o.y), d0, n0));
    e = max(e, edgePair(vUv, vec2(o.x, o.y) * 0.7071, d0, n0));
    e = max(e, edgePair(vUv, vec2(o.x, -o.y) * 0.7071, d0, n0));
    // a softer outer ring for smoother line edges
    float e2 = 0.0;
    vec2 o2 = o * 1.5;
    e2 = max(e2, edgePair(vUv, vec2(o2.x, 0.0), d0, n0));
    e2 = max(e2, edgePair(vUv, vec2(0.0, o2.y), d0, n0));
    e = max(e, e2 * 0.35);
    e *= lineOpacity;

    // colour target holds premultiplied linear colour
    vec3 rgb = col.a > 0.0 ? col.rgb / col.a : vec3(0.0);
    float a = col.a;
    float outA = a + e * (1.0 - a);
    // blend un-premultiplied colours weighted by coverage
    vec3 mixed = (rgb * a * (1.0 - e) + lineColor * e) / max(outA, 1e-4);
    gl_FragColor = vec4(mixed, outA);
    #include <colorspace_fragment>
    // offscreen (a picture to read back): plain sRGB with straight alpha;
    // on screen: premultiplied, as the canvas expects
    if (srgbOut) gl_FragColor = sRGBTransferOETF(gl_FragColor);
    else gl_FragColor.rgb *= gl_FragColor.a;
  }
`,f=class{constructor(l,{lineColor:f=`#151a2c`,thickness:p=1,opacity:m=1}={}){this.renderer=l,this.thickness=p,this.colorTarget=new i(1,1,{type:e,samples:4}),this.normalTarget=new i(1,1,{type:e,depthTexture:new r(1,1,c)}),this.normalMaterial=new o,this.material=new n({vertexShader:u,fragmentShader:d,uniforms:{tColor:{value:this.colorTarget.texture},tNormal:{value:this.normalTarget.texture},tDepth:{value:this.normalTarget.depthTexture},texel:{value:new t},thickness:{value:p},depthRange:{value:1},depthThreshold:{value:.35},normalThreshold:{value:.22},lineColor:{value:new a(f)},lineOpacity:{value:m},srgbOut:{value:!1}},depthTest:!1,depthWrite:!1,transparent:!0,blending:0}),this.quad=new s(this.material),this.clearColor=new a}setSize(e,t,n){let r=Math.max(1,Math.round(e*n)),i=Math.max(1,Math.round(t*n));this.colorTarget.setSize(r,i),this.normalTarget.setSize(r,i),this.material.uniforms.texel.value.set(1/r,1/i),this.pixelRatio=n,this.setLineScale(this.lineScale??1)}setLineScale(e){this.lineScale=e,this.material.uniforms.thickness.value=this.thickness*(this.pixelRatio??1)*e}render(e,t,n=null){let r=this.renderer,i=r.getClearAlpha();r.getClearColor(this.clearColor);let a=t.layers.mask;this.material.uniforms.depthRange.value=t.far-t.near,r.setClearColor(0,0),t.layers.set(l),e.overrideMaterial=this.normalMaterial,r.setRenderTarget(this.normalTarget),r.clear(),r.render(e,t),e.overrideMaterial=null,t.layers.enableAll(),r.setRenderTarget(this.colorTarget),r.clear(),r.render(e,t),t.layers.mask=a,this.material.uniforms.srgbOut.value=!!n,r.setRenderTarget(n),r.clear(),this.quad.render(r),n&&r.setRenderTarget(null),r.setClearColor(this.clearColor,i)}dispose(){this.colorTarget.dispose(),this.normalTarget.dispose(),this.normalMaterial.dispose(),this.material.dispose(),this.quad.dispose()}};export{f as t};