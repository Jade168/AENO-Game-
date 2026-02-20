window.addEventListener("load", () => {

  const user = localStorage.getItem("aeno_user");

  if (user) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    startGame();
  }

});
