function login(){
const name=document.getElementById("playerName").value;
if(!name) return;
localStorage.setItem("aenoPlayer",name);
document.getElementById("loginScreen").style.display="none";
document.getElementById("gameUI").style.display="block";
document.getElementById("toggleBtn").style.display="block";
startGame();
}

function toggleUI(){
const ui=document.getElementById("gameUI");
ui.style.display= ui.style.display==="none"?"block":"none";
}

window.onload=function(){
if(localStorage.getItem("aenoPlayer")){
document.getElementById("loginScreen").style.display="none";
document.getElementById("gameUI").style.display="block";
document.getElementById("toggleBtn").style.display="block";
startGame();
}
};

let drag=false,offsetX,offsetY;
const panel=document.getElementById("gameUI");

panel.onmousedown=function(e){
drag=true;
offsetX=e.clientX-panel.offsetLeft;
offsetY=e.clientY-panel.offsetTop;
};

document.onmousemove=function(e){
if(drag){
panel.style.left=e.clientX-offsetX+"px";
panel.style.top=e.clientY-offsetY+"px";
}
};

document.onmouseup=function(){ drag=false; };
