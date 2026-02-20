// ============================
// AENO LOGIN FIXED VERSION
// ============================

const SAVE_PREFIX = "AENO_SAVE_";
const USER_PREFIX = "AENO_USER_";
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
// 註冊
// ----------------------------
function register(){
  const user = $("username").value.trim();
  const pass = $("password").value.trim();

  if(!user || !pass){
    alert("請輸入帳號密碼");
    return;
  }

  if(localStorage.getItem(USER_PREFIX + user)){
    alert("帳號已存在");
    return;
  }

  localStorage.setItem(USER_PREFIX + user, pass);
  alert("註冊成功，請登入");
}

// ----------------------------
// 登入
// ----------------------------
function login(){
  const user = $("username").value.trim();
  const pass = $("password").value.trim();

  if(!user || !pass){
    alert("請輸入帳號密碼");
    return;
  }

  const saved = localStorage.getItem(USER_PREFIX + user);

  if(saved === null){
    alert("帳號不存在，請先註冊");
    return;
  }

  if(saved !== pass){
    alert("密碼錯誤");
    return;
  }

  sessionUser = user;
  localStorage.setItem(SESSION_KEY, user);

  loadGame(user);
  enterGame();
}

// ----------------------------
// 遊客
// ----------------------------
function guestLogin(){
  sessionUser = "GUEST";
  state = createNewState();
  enterGame();
}

// ----------------------------
// Boot
// ----------------------------
function boot(){

  // 清除舊 session（測試階段避免自動登入問題）
  localStorage.removeItem(SESSION_KEY);

  $("loginScreen").classList.remove("hidden");
  $("gameScreen").classList.add("hidden");

  $("btnRegister").onclick = register;
  $("btnLogin").onclick = login;
  $("btnGuest").onclick = guestLogin;
}

boot();
