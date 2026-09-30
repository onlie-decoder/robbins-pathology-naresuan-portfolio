const sources={}; const sourcePaths={current:"skill/SKILL.md",early:"skill/SKILL_v1_august.md"}; let sourceRequest=null,sourceSerial=0;
let currentActiveVersion = 'current';

function downloadSkillMd(version){const a=document.createElement('a');a.href=sourcePaths[version||currentActiveVersion];a.download='';a.click();}
function copyCommand(targetId, btnEl) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const text = target.textContent.trim();
  const markCopied = () => {
    const orig = btnEl.textContent;
    btnEl.textContent = 'คัดลอกแล้ว ✓';
    btnEl.classList.add('copied');
    setTimeout(() => {
      btnEl.textContent = orig;
      btnEl.classList.remove('copied');
    }, 2000);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(markCopied).catch(() => {
      fallbackCopy(text, markCopied);
    });
  } else {
    fallbackCopy(text, markCopied);
  }
}

function fallbackCopy(text, callback) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); callback(); } catch (e) {}
  document.body.removeChild(ta);
}

document.querySelectorAll('[data-copy-target]').forEach(b => {
  b.addEventListener('click', () => copyCommand(b.dataset.copyTarget, b));
});

document.querySelectorAll('[data-download-skill]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadSkillMd('current');
  });
});

const skillDialog=document.querySelector('#skill-dialog'),panel=document.querySelector('#skill-source');
async function selectVersion(version){
 currentActiveVersion=version;const serial=++sourceSerial;sourceRequest?.abort();
 panel.setAttribute('aria-labelledby','tab-'+version);document.querySelectorAll('[data-tab]').forEach(b=>{const selected=b.dataset.tab===version;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1});
 document.querySelector('#btn-dialog-download').href=sourcePaths[version];
 panel.scrollTop=0;if(sources[version]){panel.textContent=sources[version];return;}
 panel.textContent='กำลังเปิดไฟล์…';sourceRequest=new AbortController();
 try{const r=await fetch(sourcePaths[version],{signal:sourceRequest.signal});if(!r.ok)throw Error('source');const text=await r.text();sources[version]=text;if(serial===sourceSerial)panel.textContent=text;}
 catch(e){if(e.name!=='AbortError'&&serial===sourceSerial)panel.textContent='เปิดไฟล์ไม่ได้ในขณะนี้ ดาวน์โหลดจากลิงก์ด้านบนได้ครับ';}
}
document.querySelectorAll('[data-skill]').forEach(b=>b.addEventListener('click',()=>{selectVersion(b.dataset.version||'current');skillDialog.showModal()}));
const dialogDlBtn = document.querySelector('#btn-dialog-download');
if (dialogDlBtn) { dialogDlBtn.addEventListener('click', () => {dialogDlBtn.href=sourcePaths[currentActiveVersion]}); }
document.querySelectorAll('[data-tab]').forEach(b=>{b.addEventListener('click',()=>selectVersion(b.dataset.tab));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'current':e.key==='End'?'early':b.dataset.tab==='current'?'early':'current';selectVersion(next);document.querySelector('[data-tab="'+next+'"]').focus()}})});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
const sections=[...document.querySelectorAll('main section[id]')],mainLinks=[...document.querySelectorAll('.main-nav a')];
const anchors=[...document.querySelectorAll('.principle,.roadmap-step')],tocLinks=[...document.querySelectorAll('.principle-toc a,.roadmap-toc a')];
let ticking=false,lastSection=null;
function updateNav(){let active=sections[0];const threshold=innerWidth<=800?180:innerHeight*.25;sections.forEach(el=>{if(el.getBoundingClientRect().top<threshold)active=el});if(active.id!==lastSection){lastSection=active.id;if(innerWidth>800){const groups=document.querySelectorAll('.toc-group');groups[0].open=active.id==='skill'&&document.querySelector('#skill-explainer').open;groups[1].open=active.id==='roadmap';document.querySelector('.toc-scroll').scrollTop=0}}mainLinks.forEach(a=>{const selected=a.hash==='#'+active.id;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});let current=null;anchors.forEach(el=>{if(el.getClientRects().length&&el.getBoundingClientRect().top<threshold)current=el});tocLinks.forEach(a=>{const selected=current&&a.hash==='#'+current.id;a.classList.toggle('active',!!selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});if(innerWidth>800&&current){const link=tocLinks.find(a=>a.hash==='#'+current.id);const scroll=document.querySelector('.toc-scroll');if(link&&link.getClientRects().length){const r=link.getBoundingClientRect(),box=scroll.getBoundingClientRect();if(r.bottom>box.bottom)scroll.scrollTop+=r.bottom-box.bottom+12;else if(r.top<box.top)scroll.scrollTop-=box.top-r.top+12}}const rail=innerWidth>800?280:0;document.querySelector('.progress').style.left=rail+'px';const available=innerWidth-rail;document.querySelector('.progress').style.width=(available*scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))+'px';ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateNav);ticking=true}},{passive:true});addEventListener('resize',()=>{lastSection=null;updateNav()});
const explainer=document.querySelector('#skill-explainer');
function revealPrinciple(hash){if(/^#principle-\d+$/.test(hash)){explainer.open=true;return true}return false}
document.querySelectorAll('a[href^="#principle-"]').forEach(a=>a.addEventListener('click',()=>{revealPrinciple(a.hash)}));
explainer.addEventListener('toggle',()=>{if(innerWidth>800)document.querySelectorAll('.toc-group')[0].open=explainer.open;lastSection=null;updateNav()});
if(revealPrinciple(location.hash)){requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView())}
addEventListener('hashchange',()=>{if(revealPrinciple(location.hash))requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView())});
if(innerWidth<=800)document.querySelectorAll('.toc-group').forEach(d=>d.open=false);document.querySelectorAll('.toc-group a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<=800)a.closest('details').open=false}));updateNav();

skillDialog.addEventListener('close',()=>{sourceRequest?.abort();sourceSerial++});
const menu=document.querySelector('#sidebar-toggle');menu.addEventListener('click',()=>{const open=document.body.toggleAttribute('data-nav-open');menu.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',()=>{document.body.removeAttribute('data-nav-open');menu.setAttribute('aria-expanded','false')}));
addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.removeAttribute('data-nav-open');menu.setAttribute('aria-expanded','false')}});
const range=document.querySelector('#compare-range'),figure=document.querySelector('#compare-figure');figure.dataset.ready='true';range.hidden=false;
function compare(){figure.style.setProperty('--compare',`${100-Number(range.value)}%`);range.setAttribute('aria-valuetext',`เผยฉบับปัจจุบัน ${range.value} เปอร์เซ็นต์`)}range.addEventListener('input',compare);compare();
document.querySelectorAll('.cover-link').forEach(cover=>{cover.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const b=cover.getBoundingClientRect();cover.style.setProperty('--cover-x',`${(e.clientY-b.top)/b.height*-5+2.5}deg`);cover.style.setProperty('--cover-y',`${(e.clientX-b.left)/b.width*5-2.5}deg`)});cover.addEventListener('pointerleave',()=>{cover.style.setProperty('--cover-x','0deg');cover.style.setProperty('--cover-y','0deg')})});
addEventListener('pagehide',()=>{sourceRequest?.abort();sourceSerial++});

const mobileSidebar=matchMedia('(max-width:800px)');
function syncSidebar(){document.querySelector('.sidebar').inert=mobileSidebar.matches&&!document.body.hasAttribute('data-nav-open')}
mobileSidebar.addEventListener('change',syncSidebar);menu.addEventListener('click',syncSidebar);document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',syncSidebar));addEventListener('keydown',e=>{if(e.key==='Escape')syncSidebar()});syncSidebar();
