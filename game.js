// ============================
// AENO STABLE BUILD
// ============================

const SAVE_PREFIX = "AENO_SAVE_";
const USER_PREFIX = "AENO_USER_";
const SESSION_KEY = "AENO_SESSION";

let state = null;
let sessionUser = null;

let scene, camera, renderer;

function $(id){ return document.getElementById(id); }

// ----------------------------
// 初始資源
// ----------------------------
function createNewState(){
  return {
    gold: 2000,
    wood: 800,
    stone: 800,
    iron: 800,
    food: 800,
    aeno: 0
  };
}

// ----------------------------
// THREE 初始化
// ----------------------------
function initThree(){

  const canvas = $("gameCanvas");

  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0,20,30);
  camera.lookAt(0,0,0);

  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(20,50,20);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff,0.6);
  scene.add(ambient);

  const geo = new THREE.PlaneGeometry(200,200);
  const mat = new THREE.MeshStandardMaterial({color:0x228b22});
  const ground = new THREE.Mesh(geo,mat);
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  animate();
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

// ----------------------------
// UI
// ----------------------------
function refreshUI(){
  $("uiGold").textContent = state.gold;
  $("uiWood").textContent = state.wood;
  $("uiStone").textContent = state.stone;
  $("uiIron").textContent = state.iron;
  $("uiFood").textContent = state.food;
  $("uiAeno").textContent = state.aeno;
}

// ----------------------------
// 手機 + 電腦拖動
// ----------------------------
function makeDraggable(el){

  let isDown=false, offsetX=0, offsetY=0;

  function start(x,y){
    isDown=true;
    offsetX = x - el.offsetLeft;
    offsetY = y - el.offsetTop;
  }

  function move(x,y){
    if(!isDown) return;
    el.style.left = (x-offsetX)+"px";
    el.style.top = (y-offsetY)+"px";
  }

  function end(){ isDown=false; }

  // mouse
  el.addEventListener("mousedown",e=>{
    start(e.clientX,e.clientY);
  });

  document.addEventListener("mousemove",e=>{
    move(e.clientX,e.clientY);
  });

  document.addEventListener("mouseup",end);

  // touch
  el.addEventListener("touchstart",e=>{
    e.preventDefault();
    const t=e.touches[0];
    start(t.clientX,t.clientY);
  },{passive:false});

  document.addEventListener("touchmove",e=>{
    e.preventDefault();
    const t=e.touches[0];
    move(t.clientX,t.clientY);
  },{passive:false});

  document.addEventListener("touchend",end);
}

// ----------------------------
// 進入遊戲
// ----------------------------
function enterGame(){

  $("loginScreen").classList.add("hidden");
  $("gameScreen").classList.remove("hidden");

  refreshUI();
  initThree();
  makeDraggable($("mainPanel"));
}

// ----------------------------
// 註冊
// ----------------------------
function register(){

  const user=$("username").value.trim();
  const pass=$("password").value.trim();

  if(!user||!pass){ alert("請輸入帳號密碼"); return; }

  if(localStorage.getItem(USER_PREFIX+user)){
    alert("帳號已存在"); return;
  }

  localStorage.setItem(USER_PREFIX+user,pass);
  alert("註冊成功");
}

// ----------------------------
// 登入
// ----------------------------
function login(){

  const user=$("username").value.trim();
  const pass=$("password").value.trim();

  const saved=localStorage.getItem(USER_PREFIX+user);

  if(saved!==pass){ alert("登入失敗"); return; }

  sessionUser=user;
  localStorage.setItem(SESSION_KEY,user);

  const raw=localStorage.getItem(SAVE_PREFIX+user);
  state=raw?JSON.parse(raw):createNewState();

  enterGame();
}

// ----------------------------
// 自動登入
// ----------------------------
function autoLogin(){

  const savedUser=localStorage.getItem(SESSION_KEY);
  if(!savedUser) return;

  sessionUser=savedUser;

  const raw=localStorage.getItem(SAVE_PREFIX+savedUser);
  state=raw?JSON.parse(raw):createNewState();

  enterGame();
}

// ----------------------------
// 遊客
// ----------------------------
function guestLogin(){
  state=createNewState();
  enterGame();
}

// ----------------------------
// Boot
// ----------------------------
function boot(){

  $("btnRegister").onclick=register;
  $("btnLogin").onclick=login;
  $("btnGuest").onclick=guestLogin;

  autoLogin();
}

boot();
