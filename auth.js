function login() {
  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Enter username");

  localStorage.setItem("aeno_user", name);
  location.reload();
}

function logout() {
  localStorage.removeItem("aeno_user");
  location.reload();
}
