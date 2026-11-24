(function(){
if(!window.App)return;
var S=document.createElement("style");
S.textContent=`
.ex-vp{margin:0 0 1rem;max-width:100%}
.ex-vp iframe,.ex-vp video{display:block;width:100%;max-width:100%;border-radius:12px;aspect-ratio:16/9;border:0;background:#0F172A}
.ex-vp .ex-miss{background:#F1F5F9;color:#64748B;display:flex;align-items:center;justify-content:center;min-height:180px;border-radius:12px;font:500 15px/1.4 Inter,system-ui,sans-serif}
.ex-tr{border:2px solid #0EA5E9;border-radius:12px;background:#fff;margin-top:.75rem;overflow:hidden}
.ex-tr-hd{display:flex;align-items:center;justify-content:space-between;padding:.65rem 1rem;cursor:pointer;user-select:none;gap:.5rem}
.ex-tr-hd strong{color:#0EA5E9;font:600 15px/1.3 Inter,system-ui,sans-serif}
.ex-tr-ch{width:36px;height:36px;border:0;background:transparent;color:#0EA5E9;font-size:18px;cursor:pointer;border-radius:8px;display:flex;align-items:center;justify-content:center}
.ex-tr-ch:focus-visible{outline:2px solid #4F46E5;outline-offset:2px}
.ex-tr-bd{display:none;padding:0 1rem 1rem;font:400 14.5px/1.55 Inter,system-ui,sans-serif;color:#0F172A}
.ex-tr.open .ex-tr-bd{display:block}
.ex-tr-ln{margin:.35rem 0}
.ex-tr-ln b{font-weight:600}
.ex-vt{background:#fff;border:1px solid #E2E8F0;border-radius:16px;box-shadow:0 1px 3px rgba(15,23,42,.06);padding:1rem;margin:0 0 1rem}
.ex-vt-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 1rem;border-radius:10px;border:1px solid #E2E8F0;background:#EEF2FF;color:#4F46E5;font:600 14px/1 Inter,system-ui,sans-serif;cursor:pointer;margin-bottom:.75rem}
.ex-vt-btn:focus-visible{outline:2px solid #4F46E5;outline-offset:2px}
.ex-vt-btn[aria-pressed="true"]{background:#4F46E5;color:#fff;border-color:#4F46E5}
.ex-vt-sc{overflow-x:auto;-webkit-overflow-scrolling:touch}
.ex-vt table{width:100%;border-collapse:collapse;min-width:480px;font:400 14.5px/1.45 Inter,system-ui,sans-serif}
.ex-vt th{text-align:left;padding:.6rem .75rem;background:#F8FAFC;color:#64748B;font-weight:600;border-bottom:1px solid #E2E8F0;white-space:nowrap}
.ex-vt td{padding:.65rem .75rem;border-bottom:1px solid #F1F5F9;color:#0F172A;vertical-align:top}
.ex-vt tr:last-child td{border-bottom:0}
.ex-blur{filter:blur(5px);cursor:pointer;user-select:none;transition:filter .15s}
.ex-blur.ex-show{filter:none;cursor:default;user-select:text}
.ex-empty{color:#64748B;font:500 14px/1.4 Inter,system-ui,sans-serif;padding:.5rem 0}
.ex-np{position:fixed;z-index:9999;width:320px;height:260px;min-width:240px;min-height:160px;max-width:calc(100vw - 16px);max-height:calc(100vh - 16px);background:#fff;border:1px solid #E2E8F0;border-radius:16px;box-shadow:0 10px 40px rgba(15,23,42,.18);display:flex;flex-direction:column;overflow:hidden;resize:both;font-family:Inter,system-ui,sans-serif}
.ex-np-hd{display:flex;align-items:center;justify-content:space-between;padding:.5rem .75rem;background:#EEF2FF;border-bottom:1px solid #E2E8F0;cursor:grab;user-select:none;touch-action:none;min-height:44px;flex-shrink:0}
.ex-np-hd:active{cursor:grabbing}
.ex-np-hd span{font:600 14px/1 Inter,system-ui,sans-serif;color:#0F172A}
.ex-np-x{width:36px;height:36px;border:0;background:transparent;color:#64748B;font-size:22px;line-height:1;cursor:pointer;border-radius:8px;display:flex;align-items:center;justify-content:center}
.ex-np-x:hover{background:#E2E8F0;color:#0F172A}
.ex-np-x:focus-visible{outline:2px solid #4F46E5;outline-offset:2px}
.ex-np-ta{flex:1;width:100%;border:0;padding:.75rem;resize:none;font:400 14.5px/1.5 Inter,system-ui,sans-serif;color:#0F172A;background:#fff;outline:none}
.ex-np-ta:focus{box-shadow:inset 0 0 0 2px #4F46E5}
`;
document.head.appendChild(S);

function ytId(u){
var m=u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
return m?m[1]:null;
}
function vimId(u){
var m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
return m?m[1]:null;
}

App.renderers.video_player=function(b){
var root=document.createElement("div");
root.className="ex-vp";
if(b.instruction){
var ins=document.createElement("p");
ins.style.cssText="margin:0 0 .5rem;font:500 14.5px/1.4 Inter,system-ui,sans-serif;color:#64748B";
ins.innerHTML=App.wrap(b.instruction);
root.appendChild(ins);
}
var media;
var src=b.src||"";
var yid=ytId(src),vid=vimId(src);
if(yid||vid){
media=document.createElement("div");
media.style.cssText="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;background:#0F172A";
var ifr=document.createElement("iframe");
ifr.src=yid?"https://www.youtube.com/embed/"+yid:"https://player.vimeo.com/video/"+vid;
ifr.allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture";
ifr.allowFullscreen=true;
ifr.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;border:0";
media.appendChild(ifr);
}else{
media=document.createElement("video");
media.controls=true;
media.preload="metadata";
media.src=src;
media.addEventListener("error",function(){
var box=document.createElement("div");
box.className="ex-miss";
box.textContent="Video file not found";
if(media.parentNode)media.parentNode.replaceChild(box,media);
});
}
root.appendChild(media);
if(b.transcript){
var card=document.createElement("div");
card.className="ex-tr";
var hd=document.createElement("div");
hd.className="ex-tr-hd";
hd.setAttribute("role","button");
hd.tabIndex=0;
var tit=document.createElement("strong");
tit.textContent="Transcript";
var ch=document.createElement("button");
ch.type="button";
ch.className="ex-tr-ch";
ch.setAttribute("aria-expanded","false");
ch.textContent="▾";
hd.appendChild(tit);
hd.appendChild(ch);
var bd=document.createElement("div");
bd.className="ex-tr-bd";
(b.transcript+"").split(/\n/).forEach(function(line){
var ln=document.createElement("div");
ln.className="ex-tr-ln";
var m=line.match(/^([^:]{1,40}):\s*(.*)$/);
if(m){
ln.innerHTML="<b>"+m[1]+":</b> "+App.wrap(m[2]);
}else{
ln.innerHTML=App.wrap(line);
}
bd.appendChild(ln);
});
function toggle(){
var open=card.classList.toggle("open");
ch.setAttribute("aria-expanded",open?"true":"false");
ch.textContent=open?"▴":"▾";
}
hd.addEventListener("click",toggle);
hd.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();}});
ch.addEventListener("click",function(e){e.stopPropagation();toggle();});
card.appendChild(hd);
card.appendChild(bd);
root.appendChild(card);
}
return root;
};

App.renderers.vocab_table=function(b){
var root=document.createElement("div");
root.className="ex-vt";
var items=b.items||[];
if(!items.length){
var emp=document.createElement("div");
emp.className="ex-empty";
emp.textContent="No items";
root.appendChild(emp);
return root;
}
var btn=document.createElement("button");
btn.type="button";
btn.className="ex-vt-btn";
btn.setAttribute("aria-pressed","false");
btn.textContent="Hide definitions";
var sc=document.createElement("div");
sc.className="ex-vt-sc";
var tbl=document.createElement("table");
var thead=document.createElement("thead");
thead.innerHTML="<tr><th>Term</th><th>Definition</th><th>Example</th></tr>";
tbl.appendChild(thead);
var tb=document.createElement("tbody");
var cells=[];
items.forEach(function(it){
var tr=document.createElement("tr");
var tdT=document.createElement("td");
tdT.innerHTML=App.wrap(it.term||"");
var tdD=document.createElement("td");
tdD.innerHTML=App.wrap(it.definition||"");
var tdE=document.createElement("td");
tdE.innerHTML=App.wrap(it.example||"");
tr.appendChild(tdT);
tr.appendChild(tdD);
tr.appendChild(tdE);
tb.appendChild(tr);
cells.push(tdD,tdE);
});
tbl.appendChild(tb);
sc.appendChild(tbl);
root.appendChild(btn);
root.appendChild(sc);
var hidden=false;
function setHidden(h){
hidden=h;
btn.setAttribute("aria-pressed",h?"true":"false");
btn.textContent=h?"Show definitions":"Hide definitions";
cells.forEach(function(c){
if(h){c.classList.add("ex-blur");c.classList.remove("ex-show");}
else{c.classList.remove("ex-blur","ex-show");}
});
}
btn.addEventListener("click",function(){setHidden(!hidden);});
cells.forEach(function(c){
c.addEventListener("click",function(){
if(c.classList.contains("ex-blur")&&!c.classList.contains("ex-show")){
c.classList.add("ex-show");
}
});
});
return root;
};

(function(){
var pad=null,btn=null,ta=null,timer=null,dragging=false,ox=0,oy=0,sx=0,sy=0;
function clamp(){
if(!pad)return;
var r=pad.getBoundingClientRect();
var x=Math.max(0,Math.min(window.innerWidth-r.width,r.left));
var y=Math.max(0,Math.min(window.innerHeight-r.height,r.top));
pad.style.left=x+"px";
pad.style.top=y+"px";
pad.style.right="auto";
pad.style.bottom="auto";
}
function open(){
if(!pad){
pad=document.createElement("div");
pad.className="ex-np";
pad.style.right="16px";
pad.style.bottom="16px";
pad.style.left="auto";
pad.style.top="auto";
var hd=document.createElement("div");
hd.className="ex-np-hd";
var sp=document.createElement("span");
sp.textContent="📝 Notes";
var xbtn=document.createElement("button");
xbtn.type="button";
xbtn.className="ex-np-x";
xbtn.setAttribute("aria-label","Close notes");
xbtn.textContent="×";
xbtn.addEventListener("click",close);
hd.appendChild(sp);
hd.appendChild(xbtn);
ta=document.createElement("textarea");
ta.className="ex-np-ta";
ta.placeholder="Your notes…";
ta.value=(App.state&&App.state.notes)||"";
ta.addEventListener("input",function(){
if(!App.state)App.state={};
App.state.notes=ta.value;
clearTimeout(timer);
timer=setTimeout(function(){App.save&&App.save();},400);
});
pad.appendChild(hd);
pad.appendChild(ta);
document.body.appendChild(pad);
function onMove(e){
if(!dragging)return;
var cx=e.touches?e.touches[0].clientX:e.clientX;
var cy=e.touches?e.touches[0].clientY:e.clientY;
var nx=sx+(cx-ox),ny=sy+(cy-oy);
var w=pad.offsetWidth,h=pad.offsetHeight;
nx=Math.max(0,Math.min(window.innerWidth-w,nx));
ny=Math.max(0,Math.min(window.innerHeight-h,ny));
pad.style.left=nx+"px";
pad.style.top=ny+"px";
pad.style.right="auto";
pad.style.bottom="auto";
}
function onUp(){
dragging=false;
document.removeEventListener("mousemove",onMove);
document.removeEventListener("mouseup",onUp);
document.removeEventListener("touchmove",onMove);
document.removeEventListener("touchend",onUp);
}
hd.addEventListener("mousedown",function(e){
if(e.target===xbtn||xbtn.contains(e.target))return;
dragging=true;
ox=e.clientX;oy=e.clientY;
var r=pad.getBoundingClientRect();
sx=r.left;sy=r.top;
document.addEventListener("mousemove",onMove);
document.addEventListener("mouseup",onUp);
e.preventDefault();
});
hd.addEventListener("touchstart",function(e){
if(e.target===xbtn||xbtn.contains(e.target))return;
dragging=true;
ox=e.touches[0].clientX;oy=e.touches[0].clientY;
var r=pad.getBoundingClientRect();
sx=r.left;sy=r.top;
document.addEventListener("touchmove",onMove,{passive:false});
document.addEventListener("touchend",onUp);
},{passive:true});
window.addEventListener("resize",clamp);
}
pad.style.display="flex";
ta.value=(App.state&&App.state.notes)||"";
ta.focus();
clamp();
}
function close(){
if(!pad)return;
pad.style.display="none";
if(btn)btn.focus();
}
function toggle(){
if(pad&&pad.style.display!=="none")close();
else open();
}
function wire(){
btn=document.getElementById("notesBtn");
if(!btn)return;
btn.addEventListener("click",toggle);
document.addEventListener("keydown",function(e){
if(e.key==="Escape"&&pad&&pad.style.display!=="none")close();
});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",wire);
else wire();
})();
})();
