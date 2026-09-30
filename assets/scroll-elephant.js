(() => {
  const canvas=document.querySelector('#elephant-stars'),stage=document.querySelector('.constellation-stage'),finale=document.querySelector('#naresuan-finale'),roadmap=document.querySelector('#roadmap'),latest=document.querySelector('#roadmap-latest');
  if(!canvas||!stage||!finale||!roadmap||!latest)return;
  const ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,height=0,frame=0,previous=0,formation=0,animatedScroll=scrollY,celebrated=false,celebrationStart=-Infinity,lastScroll=scrollY,scrollingDown=false,snapArmed=true,autoPulling=false,autoStarted=0,autoLastMotion=0;
  const points=[],paths=[],waveDuration=2.1,clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>x*x*(3-2*x);
  const random=k=>{const n=Math.sin(k*127.1+71.7)*43758.5453;return n-Math.floor(n)};
  function resize(){width=document.documentElement.clientWidth;height=document.documentElement.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);sync()}
  function draw(now){
    frame=0;if(document.hidden)return;if(now-previous<1000/30){frame=requestAnimationFrame(draw);return;}
    const delta=Math.min(64,previous?now-previous:16);previous=now;
    const scroll=scrollY,road=roadmap.getBoundingClientRect(),roadTop=road.top+scroll,roadEnd=road.bottom+scroll;
    const finalRect=finale.getBoundingClientRect(),nav=document.querySelector('.sidebar').getBoundingClientRect(),navHeight=width<=1100?Math.max(0,Math.min(nav.bottom,nav.height)):0;
    const maxScroll=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    const finalScroll=Math.min(finalRect.top+scroll-navHeight,maxScroll),latestStart=latest.getBoundingClientRect().top+scroll-height*.7,roadEndStart=roadEnd-height;
    const finalThreshold=width<=1100?Math.max(navHeight,Math.min(100,height*.14)):navHeight;
    const atFinal=finalRect.top<=finalThreshold+3||scroll>=maxScroll-3;
    const target=atFinal?1:scroll<latestStart
      ?.08*smooth(clamp(scroll/Math.max(1,latestStart)))
      :scroll<roadEndStart
        ?.08+.26*smooth(clamp((scroll-latestStart)/Math.max(1,roadEndStart-latestStart)))
        :.34+.66*smooth(clamp((scroll-roadEndStart)/Math.max(1,finalScroll-roadEndStart)));
    formation=reduced.matches?target:formation+(target-formation)*(1-Math.exp(-delta/180));
    animatedScroll=reduced.matches?scroll:animatedScroll+(scroll-animatedScroll)*(1-Math.exp(-delta/260));
    if(target===0&&formation<.001)formation=0;
    if(target>.999&&formation>.995)formation=1;
    const movement=scroll-lastScroll;
    if(movement>1)scrollingDown=true;
    else if(movement<-1)scrollingDown=false;
    lastScroll=scroll;
    if(autoPulling&&Math.abs(movement)>1)autoLastMotion=now;
    if(autoPulling&&movement<-2)autoPulling=false;
    if(target<.25)snapArmed=true;
    const intensity=.14+.23*smooth(clamp((scroll+height*.25)/Math.max(1,roadTop+road.height*.75-height*.75)));
    if(snapArmed&&scrollingDown&&formation>=.5&&!atFinal&&!reduced.matches){snapArmed=false;autoPulling=true;autoStarted=now;autoLastMotion=now;scrollTo({top:maxScroll,behavior:'smooth'})}
    if(autoPulling){
      if(atFinal&&now-autoLastMotion>180&&formation>.985){autoPulling=false;celebrated=true;celebrationStart=now}
      if(now-autoStarted>5000)autoPulling=false;
    }
    if(finalRect.top>finalThreshold+24&&scroll<maxScroll-3){celebrated=false;celebrationStart=-Infinity}
    if(!celebrated&&!autoPulling&&atFinal&&formation>.985){celebrated=true;celebrationStart=now}
    const effect=(now-celebrationStart)/1000,wave=!reduced.matches&&effect>=0&&effect<waveDuration;
    const waveFront=wave?effect/waveDuration*1.4-.2:-10;
    const bounce=wave?-Math.sin(Math.PI*effect/waveDuration)*Math.exp(-effect*.6)*Math.min(48,height*.07):0;
    canvas.dataset.phase=wave?'white-wave':formation>.985?'elephant':formation>.01?'assembling':'scattered';
    canvas.dataset.alignment=(formation*100).toFixed(1);
    const box=stage.getBoundingClientRect(),artWidth=Math.min(box.width*.96,box.height*790/530*.93),artHeight=artWidth*530/790;
    const left=box.left+(box.width-artWidth)/2,stageTop=box.top+(box.height-artHeight)/2;
    const approach=smooth(clamp((height-finalRect.top)/height));
    const top=(height-artHeight)/2+(stageTop-(height-artHeight)/2)*approach;
    const fieldLeft=width>1100?nav.right:0,fieldWidth=width-fieldLeft,alpha=intensity*(1-formation)+.83*formation;
    ctx.clearRect(0,0,width,height);
    const positions=points;points.forEach((p,i)=>{
      const t=now*p.speed+p.phase;
      const dx=reduced.matches?0:p.wobble*(Math.sin(t)*.72+Math.sin(t*1.73+p.phase)*.28);
      const dy=reduced.matches?0:p.wobble*.36*(Math.cos(t*.83)*.7+Math.sin(t*1.31+p.phase)*.3);
      const scrollPhase=animatedScroll/420;
      const driftX=reduced.matches?0:p.wobble*.8*(Math.sin(scrollPhase+p.phase)-Math.sin(p.phase));
      const driftY=reduced.matches?0:p.wobble*.6*(Math.cos(scrollPhase*.72+p.phase)-Math.cos(p.phase));
      const sx=fieldLeft+p.sx*fieldWidth+dx+driftX,sy=p.sy*height+dy+driftY;
      p.px=sx*(1-formation)+(left+p.x*artWidth)*formation;p.py=sy*(1-formation)+(top+p.y*artHeight+bounce)*formation;
    });
    if(formation>.7){ctx.lineWidth=.55;ctx.strokeStyle=`rgba(135,109,78,${(formation-.7)*.8})`;paths.forEach(path=>{ctx.beginPath();path.forEach((id,j)=>{const q=positions[id];j?ctx.lineTo(q.px,q.py):ctx.moveTo(q.px,q.py)});ctx.closePath();ctx.stroke()})}
    points.forEach((p,i)=>{
      const q=positions[i],orange=p.x>.22&&p.y<.57,twinkle=reduced.matches?.9:.76+.24*Math.sin(now*.0014+i*2.4);
      const shine=wave?Math.exp(-Math.pow((p.x-waveFront)/.115,2)):0;
      const base=orange?[190,105,24]:[91,112,129];
      const color=`rgba(${Math.round(base[0]+(255-base[0])*shine)},${Math.round(base[1]+(255-base[1])*shine)},${Math.round(base[2]+(255-base[2])*shine)},${alpha*twinkle+shine*(1-alpha*twinkle)})`;
      ctx.fillStyle=color;const scale=(1-formation)*.8+formation*(artWidth/760+.3),r=p.size*scale*(1+shine*(p.size>5?1.35:2.15));
      ctx.shadowColor=orange?'#c67b27':'#7691aa';ctx.shadowBlur=shine*12;
      if(p.spark){ctx.shadowBlur=Math.max(ctx.shadowBlur,(formation*.8+.2)*Math.min(12,p.size*2));ctx.beginPath();ctx.moveTo(q.px,q.py-r*2);ctx.lineTo(q.px+r*.35,q.py-r*.35);ctx.lineTo(q.px+r*1.6,q.py);ctx.lineTo(q.px+r*.35,q.py+r*.35);ctx.lineTo(q.px,q.py+r*2);ctx.lineTo(q.px-r*.35,q.py+r*.35);ctx.lineTo(q.px-r*1.6,q.py);ctx.lineTo(q.px-r*.35,q.py-r*.35);ctx.closePath();ctx.fill()}
      else{ctx.beginPath();ctx.arc(q.px,q.py,r,0,Math.PI*2);ctx.fill()}
      ctx.shadowBlur=0;
    });
    if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(draw);
  }
  function sync(){cancelAnimationFrame(frame);frame=0;if(points.length&&!document.hidden)frame=requestAnimationFrame(draw)}
  const request=new AbortController();
  fetch('assets/elephant-constellation.json',{signal:request.signal}).then(r=>{if(!r.ok)throw Error('constellation');return r.json()}).then(data=>{
    data.paths.forEach(path=>{const ids=[];path.forEach(([x,y],i)=>{const next=path[(i+1)%path.length],steps=Math.max(1,Math.ceil(Math.hypot((next[0]-x)*790,(next[1]-y)*530)/12));for(let j=0;j<steps;j++){const k=points.length,t=j/steps;ids.push(k);points.push({x:x+(next[0]-x)*t,y:y+(next[1]-y)*t,sx:((Math.sin(k*127.1)*43758.5453)%1+1)%1,sy:((Math.sin(k*311.7)*12345.678)%1+1)%1})}});paths.push(ids)});
    points.forEach((p,i)=>{const pick=random(i+1);p.spark=pick>.89;p.size=p.spark?1.35+random(i+81)*2.1:.45+random(i+17)*.85;p.wobble=6+random(i+23)*16;p.speed=.00065+random(i+39)*.0011;p.phase=random(i+51)*Math.PI*2});
    // Emphasize actual contour points at the tusk and ornament tips.
    [[.045,.35],[.10,.58],[.77,.05],[.95,.18],[.94,.31],[.63,.14],[.55,.93]].forEach(([x,y],i)=>{let nearest=points[0],distance=Infinity;points.forEach(p=>{const d=(p.x-x)**2+(p.y-y)**2;if(d<distance){nearest=p;distance=d}});nearest.spark=true;nearest.size=5.4+(i%3)*1.1});
    resize();
  }).catch(()=>{canvas.hidden=true;stage.innerHTML='<img src="assets/naresuan-emblem.jpg" alt="ตรามหาวิทยาลัยนเรศวร" style="width:70%;height:80%;object-fit:contain;position:absolute;inset:10% 15%">'});
  addEventListener('pagehide',event=>{cancelAnimationFrame(frame);frame=0;if(!event.persisted)request.abort()});addEventListener('pageshow',event=>{if(event.persisted){previous=0;sync()}});
  addEventListener('resize',resize,{passive:true});addEventListener('scroll',()=>{if(reduced.matches)sync()},{passive:true});document.addEventListener('visibilitychange',()=>{previous=0;sync()});reduced.addEventListener('change',sync);
})();
