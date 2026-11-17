const MENU=[
 {id:'lechon',name:'Lechon Manok',price:280,desc:'Malutong ang balat',img:'images/lechon-manok.jpg',cap:'Lechon Manok — ₱280 | Malutong ang balat'},
 {id:'inasal',name:'Chicken Inasal',price:270,desc:'',img:'images/chicken-inasal.jpg',cap:'Chicken Inasal — ₱270 | May lasang kalamansi at luya'},
 {id:'fried',name:'Fried Chicken',price:80,img:'images/fried-chicken.jpg',cap:'Fried Chicken — ₱80/pc | Crispy sa labas'}
];
const $=id=>document.getElementById(id), peso=n=>'₱'+n.toLocaleString('en-PH');
let cart={};
$('menu').innerHTML=MENU.map(m=>`<div class="item"><img src="${m.img}" alt="${m.name}"><button class="o" data-add="${m.id}">order now</button><p>${m.cap}</p></div>`).join('');
function render(){
  $('rows').innerHTML=MENU.map(m=>{const q=cart[m.id]||0;
    return `<tr class="${q?'':'off'}"><td>${m.name}</td><td class="q"><button data-dec="${m.id}" aria-label="Less">−</button><span>${q}</span><button data-inc="${m.id}" aria-label="More">+</button></td><td>${peso(m.price)}</td></tr>`}).join('');
  $('total').textContent=peso(MENU.reduce((s,m)=>s+m.price*(cart[m.id]||0),0));
}
function flash(t){$('msg').textContent=t;clearTimeout(flash.t);flash.t=setTimeout(()=>$('msg').textContent='',3000)}
document.addEventListener('click',e=>{
  const d=e.target.closest('button')?.dataset;if(!d)return;
  if(d.add){cart[d.add]=(cart[d.add]||0)+1;render();flash(MENU.find(x=>x.id===d.add).name+' added to your order.')}
  if(d.inc){cart[d.inc]=(cart[d.inc]||0)+1;render()}
  if(d.dec&&cart[d.dec]){if(--cart[d.dec]<=0)delete cart[d.dec];render()}
});
$('start').onclick=()=>$('menu').scrollIntoView();
$('cancel').onclick=()=>{cart={};render();flash('Order cancelled.')};
$('purchase').onclick=()=>{
  const ids=Object.keys(cart);
  if(!ids.length){flash('Pumili muna ng order bago mag-purchase.');return}
  $('sum').textContent=ids.map(id=>cart[id]+'× '+MENU.find(x=>x.id===id).name).join(', ')+' — Total '+$('total').textContent;
  $('done').classList.add('on');$('complete').scrollIntoView({block:'center'});
};
$('cont').onclick=()=>{cart={};render();$('done').classList.remove('on');$('sum').textContent='';window.scrollTo(0,0)};
function fit(){const z=Math.min(1,innerWidth/1440);document.body.style.zoom=z}
addEventListener('resize',fit);fit();render();
