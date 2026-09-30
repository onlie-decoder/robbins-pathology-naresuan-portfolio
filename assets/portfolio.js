(() => {
  'use strict';
  // A single lifecycle owns listeners, async work, observers and frame scheduling.
  const lifecycle = new AbortController();
  const { signal } = lifecycle;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('#motion-toggle');
  const dialog = document.querySelector('#skill-dialog');
  const panel = document.querySelector('#skill-source');
  const status = document.querySelector('#skill-status');
  const cache = new Map();
  const paths = {current:'skill/SKILL.md',early:'skill/SKILL_v1_august.md'};
  let paused = motion.matches;
  let pageVisible = true;
  let version = 'current';
  let requestId = 0;
  let skillRequest = null;
  let copyTimer = 0;
  let copyButton = null;
  let navFrame = 0;
  let tiltFrame = 0;
  let disposeElephant = () => {};
  let syncElephant = () => {};

  function updateMotion() {
    document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
    motionButton.setAttribute('aria-pressed', String(paused));
    const label = paused ? 'เปิดภาพเคลื่อนไหว' : 'หยุดภาพเคลื่อนไหว';
    motionButton.setAttribute('aria-label', label);
    motionButton.querySelector('span').textContent = label;
    syncElephant();
  }
  motionButton.addEventListener('click', () => {paused = !paused; updateMotion();}, {signal});
  motion.addEventListener('change', () => {paused = motion.matches; updateMotion();}, {signal});
  updateMotion();

  // The cover reacts only to pointer input; it never runs an idle animation loop.
  const specimen=document.querySelector('[data-tilt]');
  let pointerX=.5,pointerY=.5;
  specimen.addEventListener('pointermove',event=>{
    if(paused||motion.matches||event.pointerType!=='mouse'||innerWidth<801)return;
    const box=specimen.getBoundingClientRect();
    pointerX=(event.clientX-box.left)/box.width;pointerY=(event.clientY-box.top)/box.height;
    if(tiltFrame)return;
    tiltFrame=requestAnimationFrame(()=>{
      tiltFrame=0;
      specimen.style.setProperty('--tilt-x',`${(pointerY-.5)*-5}deg`);
      specimen.style.setProperty('--tilt-y',`${(pointerX-.5)*5}deg`);
      specimen.style.setProperty('--light-x',`${pointerX*100}%`);
      specimen.style.setProperty('--light-y',`${pointerY*100}%`);
      specimen.style.setProperty('--light-on','1');
    });
  },{passive:true,signal});
  specimen.addEventListener('pointerleave',()=>{
    cancelAnimationFrame(tiltFrame);tiltFrame=0;
    specimen.style.setProperty('--tilt-x','0deg');specimen.style.setProperty('--tilt-y','0deg');specimen.style.setProperty('--light-on','0');
  },{signal});
  const compare=document.querySelector('#compare-figure'),range=document.querySelector('#compare-range');
  if(compare&&range){
    compare.dataset.ready='true';range.hidden=false;
    const updateCompare=()=>{compare.style.setProperty('--compare',`${100-Number(range.value)}%`);range.setAttribute('aria-valuetext',`เผยฉบับนำเสนอ ${range.value} เปอร์เซ็นต์`);};
    range.addEventListener('input',updateCompare,{signal});updateCompare();
  }

  async function selectVersion(next, focus = false) {
    version = next;
    const id = ++requestId;
    skillRequest?.abort();
    document.querySelectorAll('[data-version]').forEach(button => {
      const active = button.dataset.version === next;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
    panel.setAttribute('aria-labelledby', `tab-${next}`);
    const download = document.querySelector('#dialog-download');
    download.href = paths[next];
    panel.scrollTop = 0;
    status.textContent = '';
    if (cache.has(next)) {panel.textContent = cache.get(next); return;}
    panel.textContent = 'กำลังเปิดไฟล์ต้นฉบับ…';
    skillRequest = new AbortController();
    try {
      const response = await fetch(paths[next], {signal:skillRequest.signal});
      if (!response.ok) throw new Error('Skill source unavailable');
      const source = await response.text();
      cache.set(next, source);
      if (id === requestId && !signal.aborted) panel.textContent = source;
    } catch (error) {
      if (error.name === 'AbortError' || signal.aborted || id !== requestId) return;
      panel.textContent = 'เปิดตัวอย่างไม่ได้ในขณะนี้ สามารถเปิดไฟล์หรือดาวน์โหลดจากลิงก์ด้านล่างได้';
      status.textContent = 'โหลดไฟล์ไม่สำเร็จ';
    }
  }
  document.querySelectorAll('[data-skill]').forEach(button => button.addEventListener('click', () => {
    if (!dialog.open) dialog.showModal();
    selectVersion(button.dataset.skill);
  }, {signal}));
  document.querySelectorAll('[data-version]').forEach(button => {
    button.addEventListener('click', () => selectVersion(button.dataset.version), {signal});
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 'current' : event.key === 'End' ? 'early' : version === 'current' ? 'early' : 'current';
      selectVersion(next, true);
    }, {signal});
  });
  dialog.addEventListener('close', () => {skillRequest?.abort(); requestId++;}, {signal});
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }, {signal});

  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const text = document.getElementById(button.dataset.copy)?.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (signal.aborted) return;
      clearTimeout(copyTimer);
      if (copyButton) copyButton.textContent = 'คัดลอกคำสั่ง';
      copyButton = button;
      button.textContent = 'คัดลอกแล้ว ✓';
      document.querySelector('#copy-status').textContent = 'คัดลอกคำสั่งแล้ว';
      copyTimer = setTimeout(() => {button.textContent = 'คัดลอกคำสั่ง'; copyButton = null;}, 1800);
    } catch {
      document.querySelector('#copy-status').textContent = 'คัดลอกอัตโนมัติไม่ได้ โปรดเลือกข้อความแล้วคัดลอก';
      button.textContent = 'เลือกข้อความเพื่อคัดลอก';
    }
  }, {signal}));

  // Scroll work runs only after input, rather than keeping a full-page RAF alive.
  const navLinks = [...document.querySelectorAll('.site-header nav a')];
  const navTargets = navLinks.map(link => document.querySelector(link.hash));
  const progress = document.querySelector('.read-progress');
  function updateNav() {
    navFrame = 0;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${maxScroll > 0 ? Math.min(1, scrollY/maxScroll) : 0})`;
    const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
    let active = -1;
    navTargets.forEach((target, index) => {const box=target.getBoundingClientRect();if (box.top <= header + 90 && box.bottom > header) active = index;});
    if (document.querySelector('#naresuan-finale').getBoundingClientRect().top < header + 90) active = -1;
    navLinks.forEach((link, index) => {if (index === active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');});
  }
  const scheduleNav = () => {if (!navFrame) navFrame = requestAnimationFrame(updateNav);};
  addEventListener('scroll', scheduleNav, {passive:true,signal});
  addEventListener('resize', scheduleNav, {passive:true,signal});
  updateNav();
  addEventListener('hashchange', () => {
    if (/^#principle-/.test(location.hash)) document.querySelector('#skill-explainer').open = true;
    scheduleNav();
  }, {signal});
  if (/^#principle-/.test(location.hash)) document.querySelector('#skill-explainer').open = true;

  // Star art is confined to the finale; SVG remains visible if fetch/canvas fails.
  function createElephant() {
    const art = document.querySelector('.elephant-art');
    const canvas = document.querySelector('#elephant-stars');
    const replay = document.querySelector('#replay-elephant');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let visible = false, ready = false, frame = 0, lastFrame = -Infinity;
    let started = null, elapsed = 0, width = 0, height = 0;
    let points = [], contourPaths = [];
    const random = seed => {const n = Math.sin(seed * 127.1 + 71.7) * 43758.5453;return n - Math.floor(n);};
    const smooth = value => {const n = Math.max(0, Math.min(1, value)); return n*n*(3-2*n);};
    const running = () => ready && visible && pageVisible && !document.hidden && !paused && !dialog.open;
    function resize() {
      const bounds = art.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      if (ready) draw(elapsed, paused);
    }
    function draw(time, staticFrame = false) {
      ctx.clearRect(0,0,width,height);
      const form = staticFrame ? 1 : smooth(time/2600);
      const t = time/1000;
      const wave = staticFrame ? 0 : Math.max(0,1-Math.abs(t-3.4)/1.1);
      const sweep = (t-2.3)/2.2;
      const positions = points; // Positions are reused; no map/object allocation per frame.
      for (let i=0;i<points.length;i++) {
        const p=points[i];
        const drift = staticFrame ? 0 : Math.sin(t*.7+p.phase)*(1-form)*5;
        p.px = (p.sx*(1-form)+p.x*form)*width+drift;
        p.py = (p.sy*(1-form)+p.y*form)*height;
      }
      if (form>.7) {
        ctx.strokeStyle = `rgba(218,186,140,${(form-.7)*.75})`; ctx.lineWidth=.65;
        for (const contour of contourPaths) {
          ctx.beginPath();
          for (let i=0;i<contour.length;i++) {const p=positions[contour[i]];if(i)ctx.lineTo(p.px,p.py);else ctx.moveTo(p.px,p.py);}
          ctx.closePath(); ctx.stroke();
        }
      }
      for (let i=0;i<points.length;i++) {
        const p=points[i];
        const twinkle = staticFrame ? .9 : .72+.28*Math.sin(t*1.4+p.phase);
        const shine = wave*Math.exp(-(((p.x-sweep)/.09)**2));
        ctx.globalAlpha = (.45+.45*form)*twinkle;
        ctx.fillStyle = shine>.1 ? '#fff8e4' : p.spark ? '#f2d5a6' : '#b3c39d';
        const radius=(p.spark?1.55:.7)*(width/650+.3)*(1+shine*1.2);
        ctx.shadowBlur=p.spark ? 5+shine*7 : 0; ctx.shadowColor='#dfbd80';
        ctx.beginPath();
        if (p.spark) {
          ctx.moveTo(p.px,p.py-radius*2.3);ctx.lineTo(p.px+radius*.45,p.py-radius*.45);
          ctx.lineTo(p.px+radius*2.3,p.py);ctx.lineTo(p.px+radius*.45,p.py+radius*.45);
          ctx.lineTo(p.px,p.py+radius*2.3);ctx.lineTo(p.px-radius*.45,p.py+radius*.45);
          ctx.lineTo(p.px-radius*2.3,p.py);ctx.lineTo(p.px-radius*.45,p.py-radius*.45);ctx.closePath();
        } else ctx.arc(p.px,p.py,radius,0,Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha=1; ctx.shadowBlur=0;
      canvas.dataset.phase = form < 1 ? 'forming' : 'elephant';
    }
    function tick(now) {
      frame=0;
      if(!running()) return;
      if(started===null) started=now-elapsed;
      if(now-lastFrame>=1000/30) {
        elapsed=now-started;lastFrame=now;
        draw(elapsed);
      }
      frame=requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); frame=0;started=null;lastFrame=-Infinity;
      if(!ready) return;
      replay.hidden=paused;
      if(running()) frame=requestAnimationFrame(tick);
      else if(visible && !document.hidden) draw(elapsed,true);
    }
    syncElephant=sync;
    const intersection = new IntersectionObserver(entries => {
      visible=entries[0].isIntersecting;
      sync();
    }, {threshold:.1});
    intersection.observe(art);
    const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(art);
    const dialogObserver=new MutationObserver(sync);dialogObserver.observe(dialog,{attributes:true,attributeFilter:['open']});
    document.addEventListener('visibilitychange',sync,{signal});
    replay.addEventListener('click',()=>{elapsed=0;sync();},{signal});
    fetch('assets/elephant-constellation.json',{signal}).then(response=>{
      if(!response.ok)throw new Error('Elephant contour unavailable');return response.json();
    }).then(data=>{
      if(signal.aborted)return;
      for(const path of data.paths) {
        const ids=[];
        for(let j=0;j<path.length;j++) {
          const [x,y]=path[j],next=path[(j+1)%path.length];
          const count=Math.max(1,Math.ceil(Math.hypot((next[0]-x)*790,(next[1]-y)*530)/14));
          for(let k=0;k<count;k++) {
            const id=points.length,f=k/count;
            ids.push(id);points.push({x:x+(next[0]-x)*f,y:y+(next[1]-y)*f,sx:random(id+1),sy:random(id+23),phase:random(id+55)*Math.PI*2,spark:random(id+77)>.94,px:0,py:0});
          }
        }
        contourPaths.push(ids);
      }
      ready=true;art.dataset.active='true';replay.hidden=false;resize();sync();
    }).catch(()=>{canvas.hidden=true;replay.hidden=true;delete art.dataset.active;});
    disposeElephant=()=>{cancelAnimationFrame(frame);intersection.disconnect();sizeObserver.disconnect();dialogObserver.disconnect();points=[];contourPaths=[];};
  }
  createElephant();
  addEventListener('pagehide',event=>{
    pageVisible=false;
    cancelAnimationFrame(navFrame);navFrame=0;cancelAnimationFrame(tiltFrame);tiltFrame=0;syncElephant();
    if(event.persisted)return; // Keep listeners available when restored from BFCache.
    lifecycle.abort();skillRequest?.abort();clearTimeout(copyTimer);disposeElephant();cache.clear();
  });
  addEventListener('pageshow',event=>{if(event.persisted){pageVisible=true;syncElephant();scheduleNav();}});
})();
