/*
====================
Global variables
====================
*/ 
let inventory = [];

const mainImg = document.getElementById("scene-image");
const mainText = document.getElementById("story-text");
const choicesText = document.getElementById("choices");
const inventoryImgs = document.getElementById("inventory");

// Initial reloadCode() when first loading index.html
document.addEventListener("DOMContentLoaded", () => {
  reloadCode();
});

// Initial click on start game then remove it
mainImg.addEventListener("click", function initialStartGame(e) {
  sceneForet();

  this.removeEventListener("click", initialStartGame);
});

/*
====================
Scenes functions
====================
*/

// Fonction qui affiche la scène de la forêt
function sceneForet() {
  reloadCode();

  // 1. On change l'image pour celle de la forêt
  mainImg.setAttribute("src", "img/foret.jpg");
  mainImg.setAttribute("alt", "forêt");

  // 2. On met à jour le texte principal
  mainText.textContent = texteForet;
  mainText.style.fontSize = "15px";

  // 3. On vide les anciens choix (pour éviter l’accumulation)
  choicesText.innerHTML = "";
  // 4. On crée les nouveaux choix
  const leftChoice = document.createElement("p");
  leftChoice.textContent =
    "Gauche => une caverne sombre et étroite, d’où s’échappent des échos inquiétants.";
  leftChoice.addEventListener("click", (e) => {
    sceneGrotte();
  });

  const rightChoice = document.createElement("p");
  rightChoice.textContent =
    "Droite => une construction en pierre ancienne, peut-être un fort ou une tour, qui semble encore habitée.";
  rightChoice.addEventListener("click", (e) => {
    sceneTour();
  });

  // 5. On ajoute les choix à la page
  choicesText.appendChild(leftChoice);
  choicesText.appendChild(rightChoice);
}

// Fonction qui affiche la scène de la tour
function sceneTour() {
  reloadCode();

  mainImg.setAttribute("src", "img/tour.jpg");

  mainText.textContent = texteTour;

  choicesText.innerHTML = "";

  const leftChoiceTower = document.createElement("p");
  leftChoiceTower.textContent = "Gauche => rentrer dans la tour";
  leftChoiceTower.addEventListener("click", (e) => {
    sceneMagicien();
  });

  const rightChoiceTower = document.createElement("p");
  rightChoiceTower.textContent = "Droite => partir vers la clairière";
  rightChoiceTower.addEventListener("click", (e) => {
    scenePrairie();
  });

  const returnBackTower = document.createElement("p");
  returnBackTower.textContent = "Arrière : revenir vers la forêt";
  returnBackTower.addEventListener("click", (e) => {
    sceneForet();
  });

  choicesText.appendChild(leftChoiceTower);
  choicesText.appendChild(rightChoiceTower);
  choicesText.appendChild(returnBackTower);
}

// Fonction qui affiche la scène de la prairie
function scenePrairie() {
  reloadCode();

  mainImg.setAttribute("src", "img/prairie.jpg");
  mainImg.setAttribute("alt", "prairie");

  mainText.textContent = textePrairie;

  choicesText.innerHTML = "";

  if (!inventory.includes("Lumiere")) {
    mort(textePrairieMort);
    return;
  }

  setTimeout(() => {
    mainText.textContent = textePrairieLumiere;
    inventoryAddItem("Epee");
    reloadCode();
  }, 3000);

  setTimeout(() => {
    const returnBack = document.createElement("p");
    returnBack.textContent = "Retourner en arrière";
    returnBack.addEventListener("click", (e) => {
      sceneTour();
    });

    const goWoodBuilding = document.createElement("p");
    goWoodBuilding.textContent =
      "Continuer après le lac vers le vieux bâtiment en bois";
    goWoodBuilding.addEventListener("click", (e) => {
      sceneBat();
    });

    choicesText.appendChild(goWoodBuilding);
    choicesText.appendChild(returnBack);
  }, 4000);
}

// Fonction qui affiche la scène du bâtiment
function sceneBat() {
  reloadCode();

  mainImg.setAttribute("src", "img/batiment.jpg");
  mainImg.setAttribute("alt", "batiment");

  mainText.textContent = texteBat;

  choicesText.innerHTML = "";

  const helmetChoice = document.createElement("p");
  helmetChoice.textContent = "Le casque";
  helmetChoice.addEventListener("click", (e) => {
    mort(texteBatMort);
    return;
  });

  const shieldChoice = document.createElement("p");
  shieldChoice.textContent = "Le bouclier";
  shieldChoice.addEventListener("click", (e) => {
    mainText.textContent = texteBatBouclier;
    inventoryAddItem("Bouclier");
    reloadCode();

    choicesText.innerHTML = "";

    const returnBackBuilding = document.createElement("p");
    returnBackBuilding.textContent = "Retourner en arrière";
    returnBackBuilding.addEventListener("click", (e) => {
      sceneTour();
    });

    setTimeout(() => {
      mainText.textContent = texteBatFini;
      choicesText.appendChild(returnBackBuilding);
    }, 3000);
  });

  const swordChoice = document.createElement("p");
  swordChoice.textContent = "L'épée";
  swordChoice.addEventListener("click", (e) => {
    mort(texteBatMort);
    return;
  });

  choicesText.appendChild(helmetChoice);
  choicesText.appendChild(shieldChoice);
  choicesText.appendChild(swordChoice);
}

// Fonction qui affiche la scène du magicien
function sceneMagicien() {
  reloadCode();

  mainImg.setAttribute("src", "img/magicien.jpg");
  mainImg.setAttribute("alt", "magicien");

  mainText.textContent = texteMagicien;

  choicesText.innerHTML = "";

  const wind = document.createElement("p");
  wind.textContent = "Le vent";
  wind.addEventListener("click", (e) => {
    mort(texteMagicienMort);
  });

  const light = document.createElement("p");
  light.textContent = "La lumière";
  light.addEventListener("click", (e) => {
    inventoryAddItem("Lumiere");
    sceneMagicienBonChoix();
  });

  const shadow = document.createElement("p");
  shadow.textContent = "L'ombre";
  shadow.addEventListener("click", (e) => {
    mort(texteMagicienMort);
  });

  choicesText.appendChild(wind);
  choicesText.appendChild(light);
  choicesText.appendChild(shadow);
}

function sceneMagicienBonChoix() {
  reloadCode();

  mainText.textContent = texteMagicienLumiere;

  choicesText.innerHTML = "";

  const goForest = document.createElement("p");
  goForest.textContent =
    "Retourner dans la forêt pour prendre le chemin de la caverne";
  goForest.addEventListener("click", (e) => {
    sceneForet();
  });

  const goPlain = document.createElement("p");
  goPlain.textContent =
    "Aller vers la plaine, un nouveau chemin qui pourrait mener à d’autres surprises.";
  goPlain.addEventListener("click", (e) => {});

  choicesText.appendChild(goForest);
  choicesText.appendChild(goPlain);
}

function sceneGrotte() {
  reloadCode();

  mainImg.setAttribute("src", "img/");
  mainImg.setAttribute("alt", "grotte");

  mainText.textContent = texteGrotte;

  choicesText.innerHTML = "";

  if (!inventory.includes("Lumiere")) {
    mort(texteGrotteMort);
    return;
  }

  const intervalOgre = setInterval(() => {
    sceneOgre();
    clearInterval(intervalOgre);
  }, 2000);
}

function sceneOgre() {
  reloadCode();

  mainImg.setAttribute("src", "img/");
  mainImg.setAttribute("alt", "ogre");

  mainText.textContent = texteOgre;

  choicesText.innerHTML = "";

  if (!inventory.includes("Bouclier") && !inventory.includes("Epee")) {
    mort(texteOgreSansArme);
    return;
  } else if (inventory.includes("Epee") && !inventory.includes("Bouclier")) {
    mort(texteOgreSansBouclier);
    return;
  }

  mainText.textContent = texteOgreVaincu;

  mainImg.setAttribute("src", "img/victory.jpg");
  mainImg.setAttribute("alt", "Victory");
}
