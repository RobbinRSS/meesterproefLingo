export function displayMessage(msg = "", color = "black", time = 0) {
  const msgField = document.getElementById("message");

  msgField.textContent = msg;
  msgField.style.color = color;

  setTimeout(() => {
    msgField.textContent = "";
  }, time);
}

export function drawballInfo(team, ball1, ball2 = "geen") {
  document.getElementById(
    "draw-ball-info"
  ).innerHTML += `<p>${team} pakt de ballen ${ball1} en ${ball2}</p>`;
}
