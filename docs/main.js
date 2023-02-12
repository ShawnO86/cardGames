(()=>{"use strict";class e{constructor(e,a){this.suit=e,this.rank=a}}class a{constructor(){this.cards=[]}createDeck(){const a=["C","D","H","S"],t=["2","3","4","5","6","7","8","9","10","J","Q","K","A"];for(let r=0;r<a.length;r++)for(let s=0;s<t.length;s++)this.cards.push(new e(a[r],t[s]))}deal(){return this.cards.splice(Math.floor(Math.random()*this.cards.length),1)[0]}}class t{constructor(e){this.playerName=e,this.playerCards=[]}addCard(e){this.playerCards.push(e)}calcTotal(){let e=0;for(let a=0;a<this.playerCards.length;a++){let t=this.playerCards[a];"A"===t.rank?e+=e+11<=21?11:1:"J"===t.rank||"Q"===t.rank||"K"===t.rank?e+=10:e+=Number(t.rank)}return e}}class r{constructor(){this.players=[],this.deck=[]}start(e,r,s){const n=new t(e),l=new t(r);this.players.push(n),this.players.push(l);let i=new a;i.createDeck(),this.deck=i;for(let e=0;e<s;e++)n.addCard(i.deal()),l.addCard(i.deal());this.players.forEach((e=>{this.renderInitialHands(e)}))}suitIcon(e){let a;switch(e){case"H":a="&#9829;";break;case"D":a="&#9830;";break;case"S":a="&#9824;";break;case"C":a="&#9827;"}return a}renderInitialHands(e){const a=document.querySelector(".dealerHand"),t=document.querySelector(".playerHand");let r=e.playerCards,s=e.playerName;""==!t.innerHTML&&""==!a.innerHTML&&(t.innerHTML="",a.innerHTML="");for(let n=0;n<r.length;n++){let l=!1;const i=document.createElement("div");i.classList.add("cardHolder");let d=r[n].suit,c=r[n].rank;"Dealer"===e.playerName&&0===n&&(l=!0),i.appendChild(this.renderCard(d,c,l)),"Dealer"===s?a.appendChild(i):t.appendChild(i)}}newCard(e){const a=document.createElement("div"),t=document.querySelector(".dealerHand"),r=document.querySelector(".playerHand"),s=e.playerName,n=this.deck.deal(),l=n.suit,i=n.rank;a.classList.add("cardHolder"),e.addCard(n),a.appendChild(this.renderCard(l,i)),"Dealer"===s?t.appendChild(a):r.appendChild(a)}renderCard(e,a,t){const r=document.createElement("div"),s=document.createElement("div");if(1==t&&r.classList.add("flipCard","in_animation",e,a),r.classList.add("card","in_animation",e,a),"A"===a||"K"===a||"Q"===a||"J"===a)r.innerHTML="A"===a?`<div class="card-value-suit top"> <span>${a}</span> <span>${this.suitIcon(e)}</span></div>\n                        <div class="card-suit ${e} ${a}"> ${this.suitIcon(e)} </div>\n                        <div class="card-value-suit bot"><span>${a}</span> <span>${this.suitIcon(e)}</span></div>`:`<div class="card-value-suit top"> <span>${a}</span> <span>${this.suitIcon(e)}</span></div>\n                        <div class="card-suit ${a}"> ${a} </div>\n                        <div class="card-value-suit bot"><span>${a}</span> <span>${this.suitIcon(e)}</span></div>`;else{s.classList.add("card-suit",a),r.innerHTML=`<div class="card-value-suit top"> <span>${a}</span> <span>${this.suitIcon(e)}</span></div>`;for(let t=0;t<Number(a);t++)s.innerHTML+=`<span>${this.suitIcon(e)}</span>`;r.appendChild(s),r.innerHTML+=`<div class="card-value-suit bot"> <span>${a}</span> <span>${this.suitIcon(e)}</span></div>`}return r}}!function(){const e=document.querySelector(".deal"),a=document.querySelector(".hit"),t=document.querySelector(".stay"),s=document.querySelector(".reDeal"),n=document.querySelector(".gameArea"),l=document.querySelector(".scoreArea"),i=document.querySelector(".dealerHand"),d=document.querySelector(".playerHand"),c=document.querySelector(".headArea"),o=document.getElementById("dealerScore"),u=document.getElementById("playerScore"),p=document.getElementById("resetScoreButton");let L,h,m,y,g,v,H,S=parseInt(localStorage.getItem("playerWins")),T=parseInt(localStorage.getItem("dealerWins"));function M(){c.classList.add("hiddenArea"),a.disabled=!1,t.disabled=!1,a.classList.remove("greyOut"),t.classList.remove("winButton"),t.classList.remove("greyOut"),d.innerHTML="",i.innerHTML="",n.classList.remove("hiddenArea"),n.classList.add("gameArea"),s.classList.add("hiddenArea"),L=new r,L.start("Player","Dealer",2),h=L.players[0],m=L.players[1],y=h.calcTotal(),g=m.calcTotal(),21===y&&g<21?(l.innerHTML="Natural 21! You win!",a.disabled=!0,a.classList.add("greyOut"),t.classList.add("greyOut"),t.disabled=!0,s.classList.remove("hiddenArea"),I(),v+=1,o.innerHTML=H,u.innerHTML=v,localStorage.setItem("playerWins",v.toString()),localStorage.setItem("dealerWins",H.toString())):l.innerHTML=21===y&&21===g?"Push "+C(y,g):`Player current score: ${y}`,n.scrollIntoView({behavior:"smooth",block:"end"})}function C(e,r){t.disabled=!0,a.disabled=!0;let s=e.calcTotal(),n=r.calcTotal();return a.classList.add("greyOut"),t.classList.add("greyOut"),s>21&&n>21?(o.innerHTML=H,u.innerHTML=v,"Both players bust"):s>21?(H+=1,o.innerHTML=H,u.innerHTML=v,localStorage.setItem("playerWins",v.toString()),localStorage.setItem("dealerWins",H.toString()),"Dealer wins with: "+n+" vs "+s):n>21?(v+=1,o.innerHTML=H,u.innerHTML=v,localStorage.setItem("playerWins",v.toString()),localStorage.setItem("dealerWins",H.toString()),"Player 1 wins with: "+s+" vs "+n):s>n?(v+=1,localStorage.setItem("playerWins",v.toString()),localStorage.setItem("dealerWins",H.toString()),"Player 1 wins with: "+s+" vs "+n):n>s?(H+=1,localStorage.setItem("playerWins",v.toString()),localStorage.setItem("dealerWins",H.toString()),o.innerHTML=H,u.innerHTML=v,"Dealer wins with: "+n+" vs "+s):"Tie"}function I(){for(document.querySelector(".flipCard").classList.remove("flipCard");m.calcTotal()<17||m.calcTotal<h.calcTotal;)L.newCard(m)}T||S?(console.log("saved score"),v=S,H=T,o.innerHTML=H,u.innerHTML=v):(v=0,H=0),n.classList.remove("gameArea"),n.classList.add("hiddenArea"),e.addEventListener("click",M),s.addEventListener("click",M),a.addEventListener("click",(()=>{L.newCard(h),y=h.calcTotal(),21===y?(a.disabled=!0,a.classList.add("greyOut"),t.disabled=!0,t.classList.add("greyOut"),s.classList.remove("hiddenArea"),I(),l.innerHTML="Blackjack! -- "+C(h,m),o.innerHTML=H,u.innerHTML=v):y>21?(document.querySelector(".flipCard").classList.remove("flipCard"),a.disabled=!0,a.classList.add("greyOut"),t.classList.add("greyOut"),t.disabled=!0,s.classList.remove("hiddenArea"),l.innerHTML=`You bust! ${C(h,m)}!`):l.innerHTML=`Your current score: ${y}`})),t.addEventListener("click",(()=>{a.disabled=!0,a.classList.add("greyOut"),I();let e=C(h,m);o.innerHTML=H,u.innerHTML=v,l.innerHTML=e,s.classList.remove("hiddenArea")})),p.addEventListener("click",(()=>{localStorage.clear("playerWins"),localStorage.clear("dealerWins"),H=0,v=0,o.innerHTML=H,u.innerHTML=v}))}()})();