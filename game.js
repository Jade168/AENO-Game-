// ============================
// AENO CORE LOGIN VERSION
// ============================

const SAVE_PREFIX = "AENO_SAVE_";
const SESSION_KEY = "AENO_SESSION";

let state = null;
let sessionUser = null;

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
// 儲存 / 讀取
// ----------------------------
function saveGame(){
  if(!sessionUser) return;
  localStorage.setItem(SAVE_PREFIX + sessionUser, JSON.stringify(state));
}

function loadGame(user){
  const raw = localStorage.getItem(SAVE_PREFIX + user);
  if(raw){
    state = JSON.parse(raw);
  }else{
    state = createNewState();
    saveGame();
  }
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
// 進入遊戲
// ----------------------------
function enterGame(){
  $("loginScreen").classList.add("hidden");
  $("gameScreen").classList.remove("hidden");

  refreshUI();
}

// ----------------------------
// 登入邏輯
// ----------------------------
function register(){
  const user = $("username").value.trim();
  const pass = $("password").value.trim();
  if(!user || !pass) return alert("請輸入帳號密碼");

  localStorage.setItem("USER_"+user, pass);
  alert("註冊成功");
}

function login(){
  const user = $("username").value.trim();
  const pass = $("password").value.trim();
  const saved = localStorage.getItem("USER_"+user);

  if(saved !== pass){
    alert("登入失敗");
    return;
  }

  sessionUser = user;
  localStorage.setItem(SESSION_KEY, user);
  loadGame(user);
  enterGame();
}

function guestLogin(){
  sessionUser = "GUEST_"+Date.now();
  state = createNewState();
  enterGame();
}

// ----------------------------
// Boot
// ----------------------------
function boot(){

  // 永遠顯示登入畫面
  $("loginScreen").classList.remove("hidden");
  $("gameScreen").classList.add("hidden");

  $("btnRegister").onclick = register;
  $("btnLogin").onclick = login;
  $("btnGuest").onclick = guestLogin;

}

boot();
