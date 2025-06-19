// maak 5 rijen aan met de lengte van het woord//
export const createRows = function (word) {
  const blocks = document.getElementById("blocks");
  blocks.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    let html = `<div class="row">`;

    for (let j = 0; j < word.length; j++) {
      if (j === 0) {
        html += `<input class="letter" maxlength="1" value="${word[0]}" disabled />`;
      } else {
        html += `<input class="letter" maxlength="1" />`;
      }
    }

    html += `</div>`;
    blocks.insertAdjacentHTML("beforeend", html);
  }

  // Zet focus op eerste invoerveld na de eerste letter in de eerste rij
  const firstRow = document.querySelector(".row");
  if (firstRow) {
    const secondInput = firstRow.querySelectorAll("input")[1];
    if (secondInput) secondInput.focus();
  }
};
//
