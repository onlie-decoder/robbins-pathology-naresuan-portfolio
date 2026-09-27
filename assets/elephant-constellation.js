(() => {
  const canvas = document.querySelector('#elephant-stars');
  const stage = document.querySelector('.constellation-stage');
  if (!canvas || !stage) return;
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, visible = false, frame = 0, started = null;
  let points = [], paths = [], positions = [];
  function resize() {
    width = stage.clientWidth; height = stage.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduced.matches && points.length) draw(performance.now());
  }
  function draw(now) {
    if (started === null) started = now;
    const elapsed = (now - started) / 1000;
    const progress = reduced.matches ? 1 : Math.min(1, elapsed / 4.8);
    const ease = 1 - Math.pow(1 - progress, 3);
    ctx.clearRect(0, 0, width, height);
    positions = points.map((p, i) => {
      const tx = width * (.07 + p.x * .86), ty = height * (.03 + p.y * .88);
      const sway = reduced.matches ? 0 : Math.sin(now * .0008 + i * 1.7) * .8;
      return { x: p.sx * width * (1-ease) + tx * ease + sway, y: p.sy * height * (1-ease) + ty * ease + sway * .6 };
    });
    const lineAlpha = Math.max(0, (progress-.48) / .52) * .3;
    if (lineAlpha > 0) {
      ctx.lineWidth = .6;
      paths.forEach(path => {
        ctx.strokeStyle = `rgba(135,109,78,${lineAlpha})`;
        ctx.beginPath();
        path.forEach((id,j) => {const q=positions[id];j?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});
        ctx.closePath();ctx.stroke();
      });
    }
    points.forEach((p,i) => {
      const q=positions[i];
      const twinkle = reduced.matches ? .8 : .65 + .35*Math.sin(now*.0017+i*2.4);
      const orange = p.x>.22 && p.y<.57;
      ctx.fillStyle=orange?`rgba(190,105,24,${.4+twinkle*.5})`:`rgba(91,112,129,${.35+twinkle*.5})`;
      const r=(i%13===0?1.75:.9)*(width/760+.35);
      if(i%13===0){
        ctx.shadowColor=orange?'#e3aa54':'#aabaca';ctx.shadowBlur=5;
        ctx.beginPath();ctx.moveTo(q.x,q.y-r*2);ctx.lineTo(q.x+r*.45,q.y-r*.45);ctx.lineTo(q.x+r*2,q.y);ctx.lineTo(q.x+r*.45,q.y+r*.45);ctx.lineTo(q.x,q.y+r*2);ctx.lineTo(q.x-r*.45,q.y+r*.45);ctx.lineTo(q.x-r*2,q.y);ctx.lineTo(q.x-r*.45,q.y-r*.45);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
      }else{ctx.beginPath();ctx.arc(q.x,q.y,r,0,Math.PI*2);ctx.fill()}
    });
    if (visible && !document.hidden && !reduced.matches) frame=requestAnimationFrame(draw);
  }
  function sync(){cancelAnimationFrame(frame);if(visible&&points.length&&!document.hidden)frame=requestAnimationFrame(draw)}
  fetch('assets/elephant-constellation.json').then(r=>{if(!r.ok)throw new Error('constellation');return r.json()}).then(data=>{
    data.paths.forEach(path=>{
      const ids=[];
      path.forEach(([x,y],i)=>{
        const next=path[(i+1)%path.length];
        const distance=Math.hypot((next[0]-x)*790,(next[1]-y)*530);
        const steps=Math.max(1,Math.ceil(distance/12));
        for(let j=0;j<steps;j++){
          const k=points.length, t=j/steps;
          ids.push(k);points.push({x:x+(next[0]-x)*t,y:y+(next[1]-y)*t,sx:((Math.sin(k*127.1)*43758.5453)%1+1)%1,sy:((Math.sin(k*311.7)*12345.678)%1+1)%1});
        }
      });paths.push(ids);
    });resize();sync();
  }).catch(()=>{stage.innerHTML='<img src="assets/naresuan-emblem.jpg" alt="ตรามหาวิทยาลัยนเรศวร" style="height:80%;max-width:80%;object-fit:contain;margin:5% auto;display:block">'});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.18}).observe(stage);
  new ResizeObserver(resize).observe(stage);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
})();
