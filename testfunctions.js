function removeFromArray(num) {
  // functie de geselecteerde bingo bal gaat uit de arr van bingo ballen
  const arr = [2, 4, 6, 8, 10, 12, 16];
  return arr.splice(num, 1)[0]; // verwijdert de nummer zes en muteert de array
}

function newWord() {
  // function dat elke keer word aangeroepen, zodra alle gokken zijn uitgevoerd
  const words = ["ja", "nee", "test", "Robbin", "Cool"];
  randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  //   currentRowIndex = 0; dit was voor de rijen van het lingo bord

  console.log("Nieuw woord:", randomWord);

  // hier kan verder nog wat styling opties komen
}

newWord();
console.log(removeFromArray());
