/* 
Global utilities functions that are not scenes themselves
*/


// Fonction qui affiche la scène de la mort
function mort(newMainText) {
  const overlay = document.querySelector(".fade-overlay");

  // Fade to black
  overlay.style.display = "block";

  // Small delay to allow the display change to take effect, otherwise the screen will fade to black instantly
  setTimeout(() => {
    // Will fade to black slowly due to transition in CSS
    overlay.style.opacity = 1;
  }, 10);

  setTimeout(() => {
    // Will become transparent again slowly due to transition in CSS
    overlay.style.opacity = 0;
  }, 2000); // <== This match the transition time 2s <==> 2000 ms

  setTimeout(() => {
    // Met à jour l'image
    mainImg.setAttribute("src", "img/died.jpg");

    // Met à jour le texte
    // Vide les anciens choix
    choicesText.innerHTML = "";
    mainText.textContent = newMainText;
    mainText.style.color = "#132440";
    mainText.style.fontSize = "24px";
    mainText.style.fontWeight = "bold";

    // Insert a skeleton logo
    const skeleton = document.createElement("img");
    skeleton.setAttribute("src", "img/death.png");
    skeleton.setAttribute("alt", "skeleton");
    skeleton.style.border = "none";

    // Center the skeleton
    choicesText.style.display = "flex";
    choicesText.style.justifyContent = "center";

    // Change the color of the main
    const main = document.querySelector("main");

    // Change the background of the <body> and <main>
    const body = document.querySelector("body");
    body.style.background = "url('img/guts.jpg')";

    main.style.backgroundColor = "#E06B80";

    // Remove unecessary elements
    const storyBorder = document.getElementById("story");
    storyBorder.style.border = "none";

    const notNecessary = document.getElementById("notNecessary");
    notNecessary.style.display = "none";

    choicesText.appendChild(skeleton);
  }, 1000);
}
// Fonction de gestion des images dans l'inventaire

function showInventoryImg() {
  inventoryImgs.innerHTML = "";

  inventory.forEach((item) => {
    // Change depending on the item the correct path to the image
    let imgPath;
    if (item == "Lumiere") {
      imgPath = "img/lumiere.png";
    } else if (item == "Epee") {
      imgPath = "img/epee.png";
    } else if (item == "Bouclier") {
      imgPath = "img/bouclier.png";
    }

    // Create the img and set the right src and alt
    const itemImg = document.createElement("img");
    itemImg.setAttribute("src", imgPath);
    itemImg.setAttribute("alt", item);

    inventoryImgs.appendChild(itemImg);
  });
}

// Fonction ajout d'un objet dans l'inventaire
function inventoryAddItem(item) {
  if (inventory.includes(item)) {
    alert(`Vous posséder déjà l'item : ${item}`);
    return;
  }

  inventory.push(item);
}

const reloadCode = () => {
  // Show items in the inventory
  showInventoryImg();
};