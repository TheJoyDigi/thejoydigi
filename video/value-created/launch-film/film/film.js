// Value, Created launch film: dependency-free WebGL2 renderer. window.renderFrame(t) draws one deterministic frame.
const W = 1080, H = 1920;
const cv = document.getElementById("c");
const gl = cv.getContext("webgl2", { antialias: false, preserveDrawingBuffer: true, premultipliedAlpha: false });

// ---------- math ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const eo = (k) => 1 - Math.pow(1 - k, 3);
const eio = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const eexpo = (k) => (k >= 1 ? 1 : 1 - Math.pow(2, -10 * k));
const win = (t, a, b, fi = 0.4, fo = 0.4) => Math.min(prog(t, a, a + fi), 1 - prog(t, b - fo, b));
const m4 = {
  persp(fov, asp, n, f) { const q = 1 / Math.tan(fov / 2), r = 1 / (n - f); return [q / asp, 0, 0, 0, 0, q, 0, 0, 0, 0, (n + f) * r, -1, 0, 0, 2 * n * f * r, 0]; },
  mul(a, b) { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return o; },
  look(e, c, u) {
    const z = norm([e[0] - c[0], e[1] - c[1], e[2] - c[2]]), x = norm(cross(u, z)), y = cross(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, e), -dot(y, e), -dot(z, e), 1];
  },
  tr(x, y, z) { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]; },
  sc(x, y, z) { return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]; },
  ry(a) { const c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; },
  rx(a) { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; },
  rz(a) { const c = Math.cos(a), s = Math.sin(a); return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; },
};
function norm(v) { const l = Math.hypot(...v); return v.map((x) => x / l); }
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
const chain = (...ms) => ms.reduce((a, b) => m4.mul(a, b));

// ---------- gl helpers ----------
function sh(type, src) {
  const s = gl.createShader(type); gl.shaderSource(s, "#version 300 es\nprecision highp float;\n" + src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) + "\n" + src.split("\n").map((l, i) => i + 3 + ": " + l).join("\n"));
  return s;
}
function program(vs, fs) {
  const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
  gl.bindAttribLocation(p, 0, "aPos"); gl.bindAttribLocation(p, 1, "aNrm"); gl.bindAttribLocation(p, 2, "aUv"); gl.bindAttribLocation(p, 3, "aFace");
  gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  const u = {}; const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) { const info = gl.getActiveUniform(p, i); u[info.name.replace("[0]", "")] = gl.getUniformLocation(p, info.name); }
  return { p, u };
}
function use(pr, uni) {
  gl.useProgram(pr.p); let unit = 0;
  for (const [k, v] of Object.entries(uni)) {
    const loc = pr.u[k]; if (loc == null) continue;
    if (v && v.tex) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, v.tex); gl.uniform1i(loc, unit++); }
    else if (typeof v === "number") gl.uniform1f(loc, v);
    else if (v.length === 16) gl.uniformMatrix4fv(loc, false, v);
    else if (v.length === 2) gl.uniform2fv(loc, v); else if (v.length === 3) gl.uniform3fv(loc, v); else if (v.length === 4) gl.uniform4fv(loc, v);
  }
}
function texFrom(src, mip = true) {
  const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
  if (mip) gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mip ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const ext = gl.getExtension("EXT_texture_filter_anisotropic"); if (ext && mip) gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 8);
  return { tex: t, w: src.width, h: src.height };
}
function target(w, h, msaa = 0) {
  const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fb = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  let ms = null;
  if (msaa) {
    ms = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, ms);
    const rb = gl.createRenderbuffer(); gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, msaa, gl.RGBA8, w, h); gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, rb);
    const db = gl.createRenderbuffer(); gl.bindRenderbuffer(gl.RENDERBUFFER, db);
    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, msaa, gl.DEPTH_COMPONENT24, w, h); gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, db);
  }
  return { tex, fb, ms, w, h };
}
function bindTarget(tg) { gl.bindFramebuffer(gl.FRAMEBUFFER, tg ? (tg.ms || tg.fb) : null); gl.viewport(0, 0, tg ? tg.w : W, tg ? tg.h : H); }
function resolve(tg) {
  if (!tg.ms) return; gl.bindFramebuffer(gl.READ_FRAMEBUFFER, tg.ms); gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, tg.fb);
  gl.blitFramebuffer(0, 0, tg.w, tg.h, 0, 0, tg.w, tg.h, gl.COLOR_BUFFER_BIT, gl.LINEAR);
}

// ---------- geometry ----------
function vao(data, stride, layout, idx) {
  const v = gl.createVertexArray(); gl.bindVertexArray(v);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  let off = 0; layout.forEach((n, i) => { if (!n) return; gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i, n, gl.FLOAT, false, stride * 4, off * 4); off += n; });
  let count = data.length / stride;
  if (idx) { const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(idx), gl.STATIC_DRAW); count = idx.length; }
  gl.bindVertexArray(null); return { v, count, indexed: !!idx };
}
function drawV(o, mode = gl.TRIANGLES) { gl.bindVertexArray(o.v); if (o.indexed) gl.drawElements(mode, o.count, gl.UNSIGNED_INT, 0); else gl.drawArrays(mode, 0, o.count); }
const tri = vao([-1, -1, 3, -1, -1, 3], 2, [2]);

// Book box: width 0.6667, height 1, depth 0.056 (6 x 9 in, 224 pages). Faces: 0 front 1 back 2 spine 3 fore-edge 4 top 5 bottom.
const BW = 6 / 9, BH = 1, BD = 0.504 / 9;
const book = (() => {
  const x = BW / 2, y = BH / 2, z = BD / 2, d = [];
  const quad = (p, n, f) => { const uv = [[0, 1], [1, 1], [1, 0], [0, 0]]; [0, 1, 2, 0, 2, 3].forEach((i) => d.push(...p[i], ...n, ...uv[i], f)); };
  quad([[-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]], [0, 0, 1], 0);
  quad([[x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z]], [0, 0, -1], 1);
  quad([[-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z]], [-1, 0, 0], 2);
  quad([[x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z]], [1, 0, 0], 3);
  quad([[-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z]], [0, 1, 0], 4);
  quad([[-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z]], [0, -1, 0], 5);
  return vao(d, 9, [3, 3, 2, 1]);
})();
// Card grid (uv 0..1, 48 x 64) for art and pages; the vertex shader places and curls it.
const grid = (() => {
  const nx = 48, ny = 64, d = [], idx = [];
  for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) d.push(i / nx, j / ny);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const a = j * (nx + 1) + i; idx.push(a, a + nx + 2, a + 1, a, a + nx + 1, a + nx + 2); }
  return vao(d, 2, [0, 0, 2], idx);
})();
const NP = 900;
const parts = (() => { let s = 7, d = []; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647); for (let i = 0; i < NP; i++) d.push(r(), r(), r(), r()); return vao(d, 4, [4]); })();

// ---------- shaders ----------
const FS_VS = `layout(location=0) in vec2 aPos; out vec2 vUv; void main(){ vUv=aPos*.5+.5; gl_Position=vec4(aPos,0,1); }`;
const NOISE = `
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }`;

const bgProg = program(FS_VS, `${NOISE}
in vec2 vUv; out vec4 o; uniform float uT, uRays, uSmoke, uBright; uniform vec2 uLight;
void main(){
  vec2 p=vUv*vec2(1.,1.7778);
  vec2 L=uLight*vec2(1.,1.7778);
  float d=length(p-L);
  vec3 deep=vec3(.012,.018,.06), navy=vec3(.03,.043,.125), lift=vec3(.055,.07,.19);
  vec3 c=mix(lift,navy,smoothstep(0.,.75,d)); c=mix(c,deep,smoothstep(.45,1.5,d));
  float sm=fbm(p*1.6+vec2(uT*.025,-uT*.04)); c+=vec3(.05,.055,.12)*pow(sm,2.5)*uSmoke;
  vec2 dir=p-L; float ang=atan(dir.y,dir.x);
  float rays=pow(noise(vec2(ang*3.2,uT*.12)),4.)*1.2+pow(noise(vec2(ang*7.+4.,uT*.18)),6.)*.5;
  rays*=exp(-d*1.6)*smoothstep(.02,.3,d);
  float haze=fbm(p*3.+vec2(0.,-uT*.08));
  c+=vec3(1.,.74,.36)*rays*uRays*.28*(.6+.6*haze);
  c+=vec3(1.,.76,.4)*exp(-d*d*12.)*.16*uRays;
  o=vec4(c*uBright,1.);
}`);

const meshVS = `
layout(location=0) in vec3 aPos; layout(location=1) in vec3 aNrm; layout(location=2) in vec2 aUv; layout(location=3) in float aFace;
uniform mat4 uVP, uM; uniform float uCard, uFlip, uBend, uAspect, uLift;
out vec3 vN, vW; out vec2 vUv; out float vFace;
void main(){
  vec3 pos=aPos, nrm=aNrm; vFace=aFace; vUv=aUv;
  if(uCard>0.5){
    float th=uFlip*3.14159265, x=0., z=0., u=aUv.x, ph=th;
    for(int i=0;i<24;i++){ float s=(float(i)+.5)/24.*u; ph=th-uBend*sin(th)*s; x+=cos(ph)*u/24.; z+=sin(ph)*u/24.; }
    pos=vec3(x*uAspect,(0.5-aUv.y),z+uLift*sin(3.14159*aUv.x)*sin(th));
    nrm=normalize(vec3(-sin(ph),0.,cos(ph)));
    vFace=6.;
  }
  vec4 w=uM*vec4(pos,1.); vW=w.xyz; vN=normalize(mat3(uM)*nrm);
  gl_Position=uVP*w;
}`;
const meshProg = program(meshVS, `${NOISE}
in vec3 vN, vW; in vec2 vUv; in float vFace; out vec4 o;
uniform sampler2D uFront, uBack, uSpine, uTex, uTexB; uniform vec3 uEye; uniform float uGlint, uKey, uRim, uAlpha, uMode, uT, uRipple, uLod;
vec3 gold(vec3 c){ return clamp((c.r-c.b-.22)*3.,0.,1.)*smoothstep(.42,.72,c.r)*vec3(1.); }
void main(){
  vec3 N=normalize(vN); vec3 V=normalize(uEye-vW);
  if(!gl_FrontFacing) N=-N;
  vec3 L=normalize(vec3(-.55,.65,.85)), R=normalize(vec3(.75,.35,-.6));
  vec3 base; float face=floor(vFace+.5); vec2 uv=vUv; float paper=0.;
  if(face<.5) base=texture(uFront,uv).rgb;
  else if(face<1.5) base=texture(uBack,vec2(uv.x,uv.y)).rgb;
  else if(face<2.5) base=texture(uSpine,vec2(uv.x,uv.y)).rgb;
  else if(face<5.5){
    float across=(face<3.5)?uv.x:uv.y; float along=(face<3.5)?uv.y:uv.x;
    float edge=step(across,.035)+step(.965,across);
    float lines=.92+.08*noise(vec2(across*900.,along*3.));
    float ao=smoothstep(.035,.2,across)*smoothstep(.965,.8,across);
    base=mix(vec3(.93,.9,.82)*lines*(.72+.28*ao),vec3(.05,.07,.19),edge); paper=1.-edge;
  } else {
    vec2 tuv=uv;
    if(uRipple>0.){ vec2 c=vec2(.5,.66); float d=length((uv-c)*vec2(1.,1.)); tuv+=normalize(uv-c+1e-5)*sin(d*90.-uT*3.)*.0022*uRipple*exp(-d*6.); }
    base=gl_FrontFacing?textureLod(uTex,tuv,uLod).rgb:mix(vec3(.95,.93,.88),texture(uTexB,vec2(1.-uv.x,uv.y)).rgb,.12);
    paper=uMode>1.5?1.:0.;
  }
  if(uMode>.5&&uMode<1.5&&face>5.5){ o=vec4(base*uKey,uAlpha*smoothstep(.62,.28,length((vUv-.5)*vec2(1.,1.15)))); return; }
  float dif=max(dot(N,L),0.), rim=pow(1.-max(dot(N,V),0.),3.)*max(dot(N,R),0.)+pow(1.-max(dot(N,V),0.),4.)*.35;
  vec3 Hh=normalize(L+V); float spec=pow(max(dot(N,Hh),0.),60.)*.18;
  vec3 c=base*(.32+.78*dif)*uKey + spec*uKey + vec3(1.,.78,.45)*rim*uRim;
  if(face<.5||face>1.5&&face<2.5){
    float g=gold(base).r; float band=exp(-pow((uv.x*.75+(1.-uv.y)*.65-uGlint)/.075,2.));
    c+=vec3(1.,.86,.55)*g*band*1.6*uKey + base*g*.12;
    c+=vec3(1.)*band*.05*uKey;
  }
  if(paper>.5){ float spot=exp(-dot(vW.xy-vec2(.3,.12),vW.xy-vec2(.3,.12))*2.6); c=base*vec3(.97,.9,.78)*(.2+.8*spot)*(.6+.45*dif)*uKey + vec3(1.,.85,.6)*rim*uRim*.4; }
  o=vec4(c,uAlpha);
}`);

const partProg = program(`
layout(location=0) in vec4 aPos; uniform float uT, uBurst, uDens; out float vA, vS;
float h(float x){ return fract(sin(x*91.7)*4375.5); }
void main(){
  vec4 s=aPos; float z=mix(.35,1.,s.z);
  vec2 p=vec2(s.x*2.-1.,s.y*2.-1.);
  p.y=fract(s.y+uT*.012*(1.4-z))*2.-1.; p.x+=sin(uT*.35+s.w*40.)*.03;
  vec2 dir=normalize(p+1e-4); p+=dir*uBurst*(1.2-z)*.9;
  gl_Position=vec4(p,0,1);
  float tw=.55+.45*sin(uT*(1.5+s.w*3.)+s.w*60.);
  vS=mix(3.,26.,pow(1.-z,2.))*(s.w>.92?2.2:1.);
  gl_PointSize=vS; vA=tw*mix(.25,.9,1.-z)*step(s.w,uDens)*(s.w>.92?.55:1.);
}`, `in float vA, vS; out vec4 o; uniform float uAlpha;
void main(){ vec2 q=gl_PointCoord*2.-1.; float d=length(q); float soft=vS>12.?smoothstep(1.,.55,d)*.55:smoothstep(1.,.0,d);
  o=vec4(vec3(1.,.8,.45)*vA*soft*uAlpha,1.); }`);

const quadVS = `layout(location=0) in vec2 aPos; uniform vec4 uRect; out vec2 vUv;
void main(){ vUv=vec2(aPos.x*.5+.5,1.-(aPos.y*.5+.5)); vec2 px=uRect.xy+vUv*uRect.zw; gl_Position=vec4(px.x/${W}.*2.-1.,1.-px.y/${H}.*2.,0,1); }`;
const quad = vao([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1], 2, [2]);
const textProg = program(quadVS, `in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform float uAlpha, uReveal, uLod, uGold, uShimmer;
void main(){
  float a=textureLod(uTex,vUv,uLod).a;
  float w=uReveal*1.35-.2; a*=smoothstep(w+.15,w-.05,vUv.x*.8+(1.-vUv.y)*.2);
  vec3 cream=vec3(.965,.933,.867);
  vec3 g=mix(vec3(1.,.94,.72),vec3(1.,.83,.49),smoothstep(.0,.4,vUv.y)); g=mix(g,vec3(.95,.66,.11),smoothstep(.4,.75,vUv.y)); g=mix(g,vec3(.69,.48,.12),smoothstep(.75,1.,vUv.y));
  float sh=exp(-pow((vUv.x-uShimmer)/.06,2.));
  vec3 c=mix(cream,g,uGold)+vec3(1.,.95,.8)*sh*.8*uGold;
  o=vec4(c,a*uAlpha);
}`);
const glowProg = program(quadVS, `in vec2 vUv; out vec4 o; uniform float uAlpha; uniform vec3 uCol;
void main(){ vec2 q=vUv*2.-1.; float d=length(q); float g=exp(-d*d*8.)+exp(-d*3.)*.25; float st=exp(-abs(q.y)*60.)*exp(-abs(q.x)*1.6)*.9;
  o=vec4(uCol*(g+st)*uAlpha,1.); }`);

const scrimProg = program(quadVS, `in vec2 vUv; out vec4 o; uniform float uAlpha;
void main(){ float y=smoothstep(0.,.35,vUv.y)*smoothstep(1.,.65,vUv.y); float x=smoothstep(0.,.25,vUv.x)*smoothstep(1.,.75,vUv.x); o=vec4(.012,.02,.07,uAlpha*y*mix(.6,1.,x)); }`);
function scrim(cx, cy, w, h, a) { if (a <= 0) return; gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); use(scrimProg, { uRect: [cx - w / 2, cy - h / 2, w, h], uAlpha: a }); drawV(quad); }
const imgProg = program(quadVS, `in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform float uAlpha, uRad, uAsp;
void main(){ vec2 q=abs(vUv-.5)*vec2(uAsp,1.)*2.; vec2 r=vec2(uAsp,1.)-uRad; float d=length(max(q-r,0.))-uRad;
  o=vec4(texture(uTex,vUv).rgb,uAlpha*smoothstep(.01,-.01,d)); }`);
const panelProg = program(quadVS, `in vec2 vUv; out vec4 o; uniform float uAlpha, uAsp, uRad;
void main(){ vec2 q=abs(vUv-.5)*vec2(uAsp,1.)*2.; vec2 r=vec2(uAsp,1.)-uRad; float d=length(max(q-r,0.))-uRad;
  float fill=smoothstep(.004,-.004,d); float edge=smoothstep(.012,0.,abs(d+.006));
  vec3 c=mix(vec3(.02,.03,.09),vec3(.05,.065,.17),vUv.y); o=vec4(c*fill+vec3(.95,.74,.38)*edge*.9,(fill*.82+edge)*uAlpha); }`);
const barsProg = program(quadVS, `in vec2 vUv; out vec4 o; uniform float uAlpha, uLevel, uT, uProg;
float h(float x){ return fract(sin(x*78.233)*43758.5); }
void main(){ float n=40., i=floor(vUv.x*n), fx=fract(vUv.x*n);
  float amp=.18+.82*uLevel*(.45+.55*h(i+floor(uT*12.)))*(.6+.4*sin(i*.7+uT*5.));
  float y=abs(vUv.y-.5)*2.; float bar=step(.22,fx)*step(fx,.78)*step(y,amp);
  vec3 c=mix(vec3(.55,.42,.2),vec3(1.,.82,.45),step(i/n,uProg));
  o=vec4(c,bar*uAlpha*mix(.45,1.,step(i/n,uProg))); }`);
function img(tex, cx, cy, w, h, a, rad = 0.06) { if (a <= 0) return; gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); use(imgProg, { uTex: tex, uRect: [cx - w / 2, cy - h / 2, w, h], uAlpha: a, uRad: rad, uAsp: w / h }); drawV(quad); }
function panel(cx, cy, w, h, a) { if (a <= 0) return; gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); use(panelProg, { uRect: [cx - w / 2, cy - h / 2, w, h], uAlpha: a, uAsp: w / h, uRad: 0.07 }); drawV(quad); }
const level = (t) => { const e = window.ENV || [0]; const i = Math.min(e.length - 1, Math.max(0, Math.round(t * 30))); return e[i]; };
function bars(cx, cy, w, h, a, t, p) { if (a <= 0) return; gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); use(barsProg, { uRect: [cx - w / 2, cy - h / 2, w, h], uAlpha: a, uLevel: level(t), uT: t, uProg: p }); drawV(quad); }
const brightProg = program(FS_VS, `in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform float uThr;
void main(){ vec3 c=texture(uTex,vUv).rgb; float l=max(c.r,max(c.g,c.b)); o=vec4(c*smoothstep(uThr,uThr+.25,l),1.); }`);
const blurProg = program(FS_VS, `in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uDir;
void main(){ vec3 s=texture(uTex,vUv).rgb*.227; float w[4]=float[](.194,.121,.054,.016);
  for(int i=1;i<5;i++){ vec2 d=uDir*float(i); s+=(texture(uTex,vUv+d).rgb+texture(uTex,vUv-d).rgb)*w[i-1]; } o=vec4(s,1.); }`);
const compProg = program(FS_VS, `${NOISE}
in vec2 vUv; out vec4 o; uniform sampler2D uScene, uBloom, uStreak; uniform float uT, uFrame, uLeak, uLeakSeed, uFlash, uFade, uShake, uBloomAmt;
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.); }
void main(){
  vec2 uv=vUv+vec2(noise(vec2(uT*13.,1.))-.5,noise(vec2(1.,uT*13.))-.5)*.012*uShake;
  vec2 cc=uv-.5; float r2=dot(cc,cc);
  vec3 c; c.r=texture(uScene,uv+cc*r2*.012).r; c.g=texture(uScene,uv).g; c.b=texture(uScene,uv-cc*r2*.012).b;
  c+=texture(uBloom,uv).rgb*uBloomAmt;
  c+=texture(uStreak,uv).rgb*vec3(1.,.82,.55)*.55;
  vec2 lp=vec2(.5+.55*sin(uLeakSeed*6.1),.3+.3*cos(uLeakSeed*4.3));
  float lk=exp(-dot((uv-lp)*vec2(1.,.56),(uv-lp)*vec2(1.,.56))*5.);
  c+=vec3(1.,.55,.18)*lk*uLeak*1.1 + vec3(1.,.82,.5)*uLeak*.25;
  c+=vec3(1.,.9,.72)*uFlash;
  c=aces(c*1.08);
  c=pow(c,vec3(.97,1.,1.04));
  float v=smoothstep(1.05,.25,length(cc*vec2(1.,1.2)));
  c*=mix(.62,1.,v);
  float g=hash(vUv*vec2(${W}.,${H}.)+fract(uFrame*.618)*91.)-.5;
  c+=g*.045*(1.-dot(c,vec3(.33)))*1.2;
  o=vec4(c*uFade,1.);
}`);

// ---------- targets ----------
const scene = target(W, H, 4), br = target(W / 2, H / 2), b1 = target(W / 4, H / 4), b2 = target(W / 4, H / 4), s1 = target(W / 4, H / 16), s2 = target(W / 4, H / 16);
function pass(prog, uni, to) { bindTarget(to); use(prog, uni); drawV(tri); }

// ---------- text ----------
const tcache = {};
function txt(str, font, size, { track = 0, color = "#fff" } = {}) {
  const key = [str, font, size, track].join("|"); if (tcache[key]) return tcache[key];
  const c = document.createElement("canvas"), x = c.getContext("2d");
  x.font = `${font} ${size}px`.replace(/^(\S+) (\S+) (\d+px)$/, "$1 $3 $2");
  const f = font.split("|"); x.font = `${f[0]} ${size}px ${f[1]}`; x.letterSpacing = track + "px";
  const m = x.measureText(str), pad = Math.ceil(size * 0.45);
  c.width = Math.ceil(m.width + pad * 2); c.height = Math.ceil(size * 1.35 + pad * 2);
  x.font = `${f[0]} ${size}px ${f[1]}`; x.letterSpacing = track + "px"; x.fillStyle = color; x.textBaseline = "middle"; x.fillText(str, pad, c.height / 2);
  const t = texFrom(c); t.pad = pad; tcache[key] = t; return t;
}
const LOW_CX = 520;
const SERIF_I = "italic 500|'Cormorant Garamond'", SERIF = "600|'Cormorant Garamond'", CINZEL = "700|Cinzel", CINZEL6 = "600|Cinzel";
const TEXTQ = [];
function text(str, font, size, cx, cy, { a = 1, reveal = 1, gold = 0, shimmer = -1, track = 0, lod = 0, scale = 1 } = {}) {
  if (a <= 0.001) return;
  const t = txt(str, font, size, { track });
  if (cy > 840) { const ink = t.w - 2 * t.pad, maxInk = 500; if (ink * scale > maxInk) scale *= maxInk / (ink * scale); cx = LOW_CX; }
  const w = t.w * scale, h = t.h * scale, rect = [cx - w / 2, cy - h / 2, w, h];
  if (gold) { gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE); use(textProg, { uTex: t, uRect: rect, uAlpha: a * 0.45, uReveal: reveal, uLod: 3.5, uGold: 1, uShimmer: shimmer }); drawV(quad); }
  TEXTQ.push({ t, rect, a, reveal, lod, gold, shimmer });
}
function flushText(fade) {
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  for (const q of TEXTQ) { use(textProg, { uTex: q.t, uRect: q.rect, uAlpha: q.a * fade, uReveal: q.reveal, uLod: q.lod, uGold: q.gold, uShimmer: q.shimmer }); drawV(quad); }
  TEXTQ.length = 0;
}
// staggered two-line reveal helper: blur-to-sharp and a small rise
function lineIn(t, t0, str, font, size, cx, cy, o = {}) {
  const k = eo(prog(t, t0, t0 + (o.dur || 0.7)));
  const out = o.out ? 1 - eio(prog(t, o.out, o.out + 0.35)) : 1;
  text(str, font, size, cx, cy + (1 - k) * 18 - (1 - out) * 10, { ...o, a: k * out * (o.a ?? 1), reveal: k, lod: (1 - k) * 3 + (1 - out) * 3 });
}
function glow(x, y, size, a, col = [1, 0.82, 0.5]) {
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
  use(glowProg, { uRect: [x - size / 2, y - size / 2, size, size], uAlpha: a, uCol: col }); drawV(quad);
}

// ---------- assets ----------
const TEX = {};
const NAMES = ["front", "back", "spine", "art", "page1", "page2", "page3", "podcast"];
window.ready = (async () => {
  await document.fonts.load("700 40px Cinzel"); await document.fonts.load("600 40px Cinzel"); await document.fonts.load("italic 500 40px 'Cormorant Garamond'"); await document.fonts.load("600 40px 'Cormorant Garamond'");
  await document.fonts.ready;
  await Promise.all(NAMES.map((n) => new Promise((res, rej) => { const i = new Image(); i.onload = () => { TEX[n] = texFrom(i); res(); }; i.onerror = () => rej(new Error("missing " + n)); i.src = `../tex/${n}.jpg`; })));
  return true;
})();

// ---------- drawing primitives ----------
let VP, EYE;
function camera(eye, at, fov = 0.5) { EYE = eye; VP = m4.mul(m4.persp(fov, W / H, 0.05, 50), m4.look(eye, at, [0, 1, 0])); }
function drawBook(M, { key = 1, rim = 0.6, glint = -1, alpha = 1, t = 0 } = {}) {
  gl.enable(gl.DEPTH_TEST); gl.disable(gl.BLEND); gl.enable(gl.CULL_FACE);
  use(meshProg, { uVP: VP, uM: M, uEye: EYE, uFront: TEX.front, uBack: TEX.back, uSpine: TEX.spine, uTex: TEX.front, uTexB: TEX.front, uGlint: glint, uKey: key, uRim: rim, uAlpha: alpha, uMode: 0, uCard: 0, uT: t, uRipple: 0, uLod: 0 });
  drawV(book); gl.disable(gl.CULL_FACE); gl.disable(gl.DEPTH_TEST);
}
function drawCard(M, tex, { mode = 2, flip = 0, bend = 0, key = 1, rim = 0.3, alpha = 1, aspect = 1, ripple = 0, t = 0, back = null, lod = 0, lift = 0 } = {}) {
  gl.enable(gl.DEPTH_TEST);
  if (alpha < 1 || mode === 1) { gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); } else gl.disable(gl.BLEND);
  use(meshProg, { uVP: VP, uM: M, uEye: EYE, uFront: tex, uBack: tex, uSpine: tex, uTex: tex, uTexB: back || tex, uGlint: -1, uKey: key, uRim: rim, uAlpha: alpha, uMode: mode, uCard: 1, uFlip: flip, uBend: bend, uAspect: aspect, uT: t, uRipple: ripple, uLod: lod, uLift: lift });
  drawV(grid); gl.disable(gl.DEPTH_TEST);
}
function dust(t, a = 1, burst = 0, dens = 1) {
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
  use(partProg, { uT: t, uBurst: burst, uAlpha: a, uDens: dens }); drawV(parts, gl.POINTS);
}
function bg(t, { rays = 0.6, smoke = 1, light = [0.5, 0.78], bright = 1 } = {}) {
  gl.disable(gl.BLEND); use(bgProg, { uT: t, uRays: rays, uSmoke: smoke, uLight: light, uBright: bright }); drawV(tri);
}

// ---------- scenes ----------
const CX = 540; // below y 840 the TikTok button column narrows the safe area, so lower copy centres a touch left
function sHook(t) {
  const [a, b] = T.hook, k = prog(t, a, b);
  bg(t, { rays: 0.9 * eo(prog(t, 0.15, 1.2)), light: [0.5, 0.72], bright: 0.25 + 0.75 * eo(prog(t, 0.1, 0.8)) });
  dust(t, eo(prog(t, 0.4, 1.8)), eo(prog(t, 0.35, 2.4)) * 0.25, 0.6);
  const flare = Math.exp(-Math.pow((t - 0.22) / 0.2, 2));
  glow(CX, 470, 900, 0.9 * flare + 0.14 * eo(prog(t, 0.2, 1.0)));
  const out = b - 0.45, s = 1 + 0.03 * k;
  lineIn(t, 0.25, COPY.hook1, SERIF_I, 92, CX, 640, { out, scale: s });
  lineIn(t, 0.75, COPY.hook2[0], CINZEL, 56, CX, 750, { gold: 1, track: 6, shimmer: lerp(-0.2, 1.3, prog(t, 1.0, 2.0)), out, scale: s });
  lineIn(t, 0.95, COPY.hook2[1], CINZEL, 56, CX, 822, { gold: 1, track: 6, shimmer: lerp(-0.2, 1.3, prog(t, 1.2, 2.2)), out, scale: s });
}
function sFrozen(t) {
  const [a, b] = T.frozen, k = prog(t, a, b);
  bg(t, { rays: 0.5, light: [0.5, 0.7] });
  const z = lerp(2.45, 1.95, eio(k));
  camera([0, -0.16, z], [0, -0.16, 0], 0.5);
  const M = chain(m4.ry(lerp(0.08, -0.05, k)), m4.tr(-0.5, 0, 0));
  drawCard(M, TEX.art, { mode: 1, aspect: 1, alpha: eo(prog(t, a, a + 0.9)) * (1 - prog(t, b - 0.3, b)), key: 1.15, ripple: 1, t });
  dust(t, 0.8);
  scrim(CX, 1440, 1080, 520, 0.85 * win(t, a + 0.6, b, 0.5, 0.4));
  lineIn(t, a + 0.85, COPY.frozen[0], SERIF_I, 76, LOW_CX, 1390, { out: b - 0.45 });
  lineIn(t, a + 2.75, COPY.frozen[1], CINZEL, 96, LOW_CX, 1495, { gold: 1, track: 10, shimmer: lerp(-0.2, 1.3, prog(t, a + 2.9, a + 3.9)), out: b - 0.45 });
}
function bookM(rotY, rotX, x, y, z, s = 1) { return chain(m4.tr(x, y, z), m4.ry(rotY), m4.rx(rotX), m4.sc(s, s, s)); }
function sReveal(t) {
  const [a, b] = T.reveal, k = prog(t, a, b);
  bg(t, { rays: 0.35 + 0.5 * eo(prog(t, a + 0.8, a + 2.5)), light: [0.62, 0.66] });
  camera([0, 0, lerp(3.55, 3.2, eio(k))], [0, 0, 0], 0.62);
  const r = eio(prog(t, a, a + 3.0));
  const M = bookM(lerp(1.5, -0.36, r) + 0.05 * Math.sin(t * 0.7), lerp(0.18, 0.06, r), lerp(-0.04, 0, r), lerp(0.02, 0.09, r), 0);
  drawBook(M, { key: lerp(0.15, 1.05, eo(prog(t, a, a + 2.2))), rim: lerp(1.6, 0.7, r), glint: lerp(-0.4, 1.6, prog(t, a + 2.6, a + 3.8)), t });
  dust(t, 0.9);
  lineIn(t, a + 0.6, COPY.revealKicker, CINZEL6, 40, CX, 330, { gold: 1, track: 12, out: b - 0.4 });
  lineIn(t, a + 2.2, COPY.revealLine, SERIF_I, 84, LOW_CX, 1500, { out: b - 0.4 });
}
function sInside(t) {
  const [a, b] = T.inside, k = prog(t, a, b);
  bg(t, { rays: 0.3, light: [0.5, 0.9], bright: 0.8 });
  const PA = 6 / 9;
  camera([lerp(0.5, 0.38, k), lerp(-0.46, -0.4, k), lerp(2.7, 2.45, eio(k))], [0.32, -0.12, 0], 0.62);
  const base = chain(m4.rx(-0.32), m4.ry(-0.12), m4.rz(0.03));
  const f1 = eio(prog(t, a + 1.5, a + 2.4)), f2 = eio(prog(t, a + 3.4, a + 4.3));
  drawCard(chain(base, m4.tr(0, 0, -0.004)), TEX.page3, { aspect: PA, key: 0.8 });
  if (f2 < 1) drawCard(chain(base, m4.tr(0, 0, 0)), TEX.page2, { aspect: PA, flip: f2, bend: 0.9, lift: 0.05, back: TEX.page3, key: 0.8 });
  if (f1 < 1) drawCard(chain(base, m4.tr(0, 0, 0.002)), TEX.page1, { aspect: PA, flip: f1, bend: 0.9, lift: 0.05, back: TEX.page2, key: 0.8 });
  dust(t, 0.55);
  lineIn(t, a + 0.3, COPY.insideKicker, CINZEL6, 38, CX, 300, { gold: 1, track: 8, out: b - 0.4 });
  scrim(CX, 1480, 1080, 360, 0.85 * win(t, a + 1.4, b, 0.4, 0.4));
  lineIn(t, a + 1.6, COPY.inside1[0], SERIF_I, 62, LOW_CX, 1450, { out: a + 3.3 });
  lineIn(t, a + 1.75, COPY.inside1[1], SERIF_I, 62, LOW_CX, 1520, { out: a + 3.3 });
  lineIn(t, a + 3.6, COPY.inside2[0], SERIF_I, 62, LOW_CX, 1450, { out: b - 0.4 });
  lineIn(t, a + 3.75, COPY.inside2[1], SERIF_I, 62, LOW_CX, 1520, { out: b - 0.4 });
}
function sSteps(t) {
  const [a, b] = T.steps, step = (b - a) / 5;
  bg(t, { rays: 0.6, light: [0.5, 0.8] });
  camera([0, 0, 1.6], [0, 0, 0], 0.62);
  dust(t, 0.9, 0, 1);
  const NUM = ["I", "II", "III", "IV", "V"];
  for (let i = 0; i < 5; i++) {
    const s0 = a + i * step, on = t >= s0 ? 1 : 0;
    const x = CX + (i - 2) * 110;
    text(NUM[i], CINZEL6, 40, x, 560, { a: 0.35 + 0.65 * on * (t < s0 + step || i === 4 ? 1 : 0.6), gold: on, track: 2 });
  }
  const i = Math.min(4, Math.floor((t - a) / step)), s0 = a + i * step, s1 = s0 + step;
  const [word, l1, l2] = COPY.steps[i];
  const outT = i === 4 ? b - 0.3 : s1 - 0.12;
  const fl = Math.exp(-Math.pow((t - s0) / 0.08, 2)) * 0.12;
  glow(CX, 470, 900, 0.14 + fl * 1.2);
  lineIn(t, s0, word, CINZEL, 118, CX, 800, { gold: 1, track: 10, shimmer: lerp(-0.2, 1.3, prog(t, s0 + 0.1, s0 + 0.9)), dur: 0.35, out: outT });
  lineIn(t, s0 + 0.18, l1, SERIF_I, 64, LOW_CX, 960, { dur: 0.35, out: outT });
  lineIn(t, s0 + 0.3, l2, SERIF_I, 64, LOW_CX, 1035, { dur: 0.35, out: outT });
}
function sClimax(t) {
  const [a, b] = T.climax, hit = T.hit;
  const sw = eio(prog(t, hit - 0.2, hit + 3.2));
  bg(t, { rays: lerp(0.3, 1.25, sw), light: [0.5, 0.74], bright: lerp(0.72, 1, sw) });
  const bt = Math.max(0, t - hit);
  dust(t, 1, sw * 0.35, 1);
  glow(CX, 420, 1300, 0.1 + 0.45 * sw);
  lineIn(t, a + 0.2, COPY.climax1, SERIF_I, 104, CX, 680, { out: b - 0.4 });
  lineIn(t, a + 1.3, COPY.climax2, CINZEL, 110, CX, 820, { gold: 1, track: 6, shimmer: lerp(-0.2, 1.3, prog(t, hit, hit + 1.0)), dur: 0.5, out: b - 0.4, scale: 1 + 0.06 * eo(prog(t, hit, hit + 0.5)) - 0.03 * eo(prog(t, hit + 0.5, b)) });
}
function sFormats(t) {
  const [a, b] = T.formats, mid = a + 4.0;
  bg(t, { rays: 0.6, light: [0.5, 0.4] });
  // READ IT: the paperback turns in the light, then slides away
  const outB = eio(prog(t, mid - 0.3, mid + 0.5));
  if (outB < 1) {
    camera([0, 0, 3.1], [0, 0, 0], 0.62);
    const r = eo(prog(t, a, a + 1.4));
    const turn = eio(prog(t, a + 0.3, mid - 0.2));
    const M = bookM(lerp(-0.3, -2.72, turn) - 0.25 * outB, 0.05, lerp(0, -0.55, outB), 0.27, 0, 1);
    drawBook(M, { key: lerp(0.5, 1.05, r) * (1 - outB), rim: 0.8 * (1 - outB), glint: lerp(-0.4, 1.6, prog(t, a + 0.8, a + 2.2)), t });
  }
  dust(t, 0.85);
  lineIn(t, a + 0.5, COPY.readKicker, CINZEL, 96, CX, 1300, { gold: 1, track: 12, shimmer: lerp(-0.2, 1.3, prog(t, a + 0.7, a + 1.7)), out: mid - 0.35 });
  lineIn(t, a + 0.8, COPY.readLine, SERIF_I, 66, LOW_CX, 1400, { out: mid - 0.35 });
  // LISTEN TO IT: the real audiobook cover in a player card, bars driven by the soundtrack
  const c = eo(prog(t, mid, mid + 0.8)), cOut = 1 - prog(t, b - 0.35, b), ca = c * cOut, rise = (1 - c) * 60;
  panel(CX, 760 + rise, 760, 900, ca);
  img(TEX.podcast, CX, 640 + rise, 600, 600, ca, 0.05);
  text(COPY.cardTitle, SERIF, 50, CX, 1000 + rise, { a: ca });
  text(COPY.cardSub, CINZEL6, 24, CX, 1052 + rise, { a: ca * 0.8, gold: 1, track: 6 });
  bars(CX, 1130 + rise, 600, 70, ca, t, prog(t, mid, b));
  lineIn(t, mid + 0.5, COPY.listenKicker, CINZEL, 96, CX, 1300, { gold: 1, track: 12, shimmer: lerp(-0.2, 1.3, prog(t, mid + 0.7, mid + 1.7)), out: b - 0.35 });
  lineIn(t, mid + 0.8, COPY.listenLine[0], SERIF_I, 62, LOW_CX, 1400, { out: b - 0.35 });
  lineIn(t, mid + 0.95, COPY.listenLine[1], SERIF_I, 62, LOW_CX, 1468, { out: b - 0.35 });
}
function sEnd(t) {
  const [a, b] = T.end, k = prog(t, a, b);
  bg(t, { rays: 0.75, light: [0.5, 0.36] });
  camera([0, 0.0, lerp(3.25, 3.0, eio(k))], [0, 0.0, 0], 0.62);
  const r = eo(prog(t, a, a + 2.2));
  const M = bookM(lerp(-0.75, -0.2, r) + 0.06 * Math.sin((t - a) * 0.7), 0.05, 0, 0.36 + 0.012 * Math.sin(t * 1.3), 0, 1);
  drawBook(M, { key: lerp(0.4, 1.05, r), rim: 0.8, glint: lerp(-0.4, 1.6, prog(t, a + 1.8, a + 3.2)), t });
  dust(t, 0.85);
  lineIn(t, a + 1.0, COPY.endOut, CINZEL, 64, CX, 1270, { gold: 1, track: 16, shimmer: lerp(-0.2, 1.3, prog(t, a + 1.2, a + 2.4)) });
  lineIn(t, a + 1.6, COPY.endCta[0], SERIF_I, 62, LOW_CX, 1372, {});
  lineIn(t, a + 1.75, COPY.endCta[1], SERIF_I, 62, LOW_CX, 1440, {});
  lineIn(t, a + 2.4, COPY.endCredit, CINZEL6, 26, LOW_CX, 1540, { gold: 1, track: 8, a: 0.85 });
}
const SCENES = [[T.hook, sHook], [T.frozen, sFrozen], [T.reveal, sReveal], [T.inside, sInside], [T.steps, sSteps], [T.climax, sClimax], [T.formats, sFormats], [T.end, sEnd]];

// ---------- frame ----------
window.renderFrame = (t, frame = 0) => {
  bindTarget(scene); gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  for (const [[a, b], fn] of SCENES) if (t >= a && t < b) fn(t);
  if (t >= T.dur - 0.0001) sEnd(t);
  gl.disable(gl.BLEND);
  resolve(scene);
  pass(brightProg, { uTex: { tex: scene.tex }, uThr: 0.78 }, br);
  pass(blurProg, { uTex: { tex: br.tex }, uDir: [1.5 / b1.w, 0] }, b1);
  pass(blurProg, { uTex: { tex: b1.tex }, uDir: [0, 1.5 / b1.h] }, b2);
  pass(blurProg, { uTex: { tex: b2.tex }, uDir: [3 / b1.w, 0] }, b1);
  pass(blurProg, { uTex: { tex: b1.tex }, uDir: [0, 3 / b1.h] }, b2);
  pass(blurProg, { uTex: { tex: br.tex }, uDir: [4 / s1.w, 0] }, s1);
  pass(blurProg, { uTex: { tex: s1.tex }, uDir: [12 / s1.w, 0] }, s2);
  pass(blurProg, { uTex: { tex: s2.tex }, uDir: [30 / s1.w, 0] }, s1);
  let leak = 0, seed = 0;
  T.leaks.forEach((c, i) => { const v = Math.exp(-Math.pow((t - c) / 0.32, 2)); if (v > leak) { leak = v; seed = i + 0.37; } });
  const flash = 0;
  const shake = 0;
  const fade = Math.min(eo(prog(t, 0, 0.35)), 1 - prog(t, T.dur - 1.2, T.dur));
  pass(compProg, { uScene: { tex: scene.tex }, uBloom: { tex: b2.tex }, uStreak: { tex: s1.tex }, uT: t, uFrame: frame, uLeak: leak * 0.85, uLeakSeed: seed, uFlash: flash, uFade: fade, uShake: shake, uBloomAmt: 0.45 }, null);
  flushText(fade * (1 - Math.min(0.6, leak * 0.7)));
  return true;
};
