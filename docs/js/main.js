const a=document.querySelector(".js-input"),m=document.querySelector(".js-search"),f=document.querySelector(".js-container"),S=document.querySelector(".js-favorites");let c=[],o=[];const d=localStorage.getItem("favorites");d!==null&&(c=JSON.parse(d));function l(e,t){t.innerHTML="";for(const r of e){const n=document.createElement("div");n.id=r.mal_id;const i=document.createElement("h2"),u=document.createTextNode(r.title);i.appendChild(u);const s=document.createElement("img");s.setAttribute("src",r.images.jpg.image_url),n.appendChild(i),n.appendChild(s),t.appendChild(n),n.addEventListener("click",p)}}function p(e){const t=e.currentTarget.id,r=c.find(i=>t==i.mal_id);o.findIndex(i=>(console.log(t),t==i.mal_id))===-1&&(o.push(r),localStorage.setItem("favoritos",JSON.stringify(o)),l(o,S))}const v=()=>{a.value,fetch(`https://api.jikan.moe/v4/anime?q=${a.value}`).then(e=>e.json()).then(e=>{c=e.data,l(c,f)})};function h(e){e.preventDefault(),v()}m.addEventListener("click",h);
//# sourceMappingURL=main.js.map
