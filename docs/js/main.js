const a=document.querySelector(".js-input"),d=document.querySelector(".js-search"),u=document.querySelector(".js-container");document.querySelector(".js-container");let c=[],m=[];const s=localStorage.getItem("favorites");s!==null&&(c=s);function p(e,n){n.innerHTML="";for(const t of e){const i=document.createElement("div");i.id=t.mal_id;const r=document.createElement("h2"),l=document.createTextNode(t.title);r.appendChild(l);const o=document.createElement("img");o.setAttribute("src",t.images.jpg.image_url),i.appendChild(r),i.appendChild(o),n.appendChild(i),i.addEventListener("click",h)}}function h(e){const n=e.currentTarget.id;c.find(t=>n==t.mal_id),m.findIndex(t=>(console.log(n),n==t.mal_id))}const f=()=>{a.value,fetch(`https://api.jikan.moe/v4/anime?q=${a.value}`).then(e=>e.json()).then(e=>{c=e.data,p(c,u)})};function g(e){e.preventDefault(),f()}d.addEventListener("click",g);
//# sourceMappingURL=main.js.map
