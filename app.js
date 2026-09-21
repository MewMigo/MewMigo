function productCard(p){
 return `<article class="product-card">
   <div class="product-icon">${p.icon}</div>
   <div class="product-body">
    <span class="pill">${label(p.category)}</span>
    <h3>${p.name}</h3>
    <p class="muted">${p.description}</p>
    <div class="product-meta"><span>Best for: <strong>${p.bestFor}</strong></span></div>
    <a class="btn small primary" href="${p.url}" target="_blank" rel="nofollow sponsored noopener">Check price at ${p.retailer} →</a>
   </div>
 </article>`;
}
function label(c){return ({toys:"Toys",furniture:"Furniture",feeding:"Feeding",litter:"Litter",grooming:"Grooming",travel:"Travel & Safety"})[c]||c;}
function renderProducts(list,target){
 const el=document.querySelector(target); if(!el)return;
 el.innerHTML=list.map(productCard).join("") || `<div class="empty">No products matched your search.</div>`;
}
function initShop(){
 const grid=document.querySelector("#product-grid"); if(!grid)return;
 const params=new URLSearchParams(location.search);
 const initial=params.get("category")||"all";
 document.querySelector("#category").value=initial;
 function update(){
  const q=document.querySelector("#search").value.toLowerCase().trim();
  const cat=document.querySelector("#category").value;
  const filtered=PRODUCTS.filter(p=>(cat==="all"||p.category===cat) && (!q || `${p.name} ${p.description} ${p.bestFor} ${p.category}`.toLowerCase().includes(q)));
  renderProducts(filtered,"#product-grid");
 }
 document.querySelector("#search").addEventListener("input",update);
 document.querySelector("#category").addEventListener("change",update);
 update();
}
document.addEventListener("DOMContentLoaded",()=>{
 renderProducts(PRODUCTS.slice(0,6),"#featured-products");
 initShop();
 const toggle=document.querySelector(".menu-toggle"), nav=document.querySelector(".site-header nav");
 if(toggle)toggle.addEventListener("click",()=>nav.classList.toggle("open"));
});