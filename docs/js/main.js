const d=document.querySelector(".js-input"),h=document.querySelector(".js-search"),v=document.querySelector(".js-container"),g=document.querySelector(".js-favorites");let s=[],i=[];const u=localStorage.getItem("favorites");u!==null&&(i=JSON.parse(u));function m(e,n){n.innerHTML="";for(const o of e){const t=document.createElement("div");t.id=o.mal_id,i.some(p=>p.mal_id===o.mal_id)&&(t.style.backgroundColor="#f3fbe1",t.style.color="rgb(66, 236, 227)");const a=document.createElement("h2"),f=document.createTextNode(o.title);a.appendChild(f);const r=document.createElement("img"),l=o.images.jpg.image_url;l==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?r.setAttribute("src","https://via.placeholder.com/210x295/ffcc00/666666/?text=Anime"):(r.setAttribute("src",l),r.onerror=function(){r.setAttribute("src","https://via.placeholder.com/210x295/ffcc00/666666/?text=Anime")}),t.appendChild(a),t.appendChild(r),n.appendChild(t),t.addEventListener("click",S)}}function S(e){const n=e.currentTarget.id,o=s.find(c=>n==c.mal_id);i.findIndex(c=>(console.log(n),n==c.mal_id))===-1&&(i.push(o),localStorage.setItem("favoritos",JSON.stringify(i)),console.log("Favoritos actualizados",i),m(i,g))}const x=()=>{d.value,fetch(`https://api.jikan.moe/v4/anime?q=${d.value}`).then(e=>e.json()).then(e=>{s=e.data,m(s,v)})};function y(e){e.preventDefault(),x()}h.addEventListener("click",y);
//# sourceMappingURL=main.js.map
