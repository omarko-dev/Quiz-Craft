const CRAFTING_TABLE_ID = "craft-table";
const RESULT_ID = "result";
const CHOICES_ID = "choices";
const SEARCH_BAR_ID = "search-bar";
const DROPDOWN_ID = "dropdown";
const SUBMIT_BUTTON_ID = "submit-button";
const CONTINUE_BUTTON_ID = "continue-button";

const GRID_CELL_CLASS = "gridCell";

class Game {
  constructor() {
    this.selectedInventoryCell = null;
    this.selectedIngredient = null;
    this.newIngredient = null;

    this.bindEvent();

    this.initCraftingTable();
    this.loadRandomRecipe();
  }

  bindEvent() {
    const self = this;
    const submitButton = document.getElementById(SUBMIT_BUTTON_ID);
    const continueButton = document.getElementById(CONTINUE_BUTTON_ID);

    submitButton.addEventListener("click", function () {
      self.checkAnswer();
    });

    continueButton.addEventListener("click", function () {
      self.resetForNextRound();
    });

    const searchBar = document.getElementById(SEARCH_BAR_ID);
    const dropdown = document.getElementById(DROPDOWN_ID);

    searchBar.addEventListener("input", function () {
      self.filterDropdown(searchBar.value);
    });

    searchBar.addEventListener("focus", function () {
      dropdown.style.display = "block";
    });

    searchBar.addEventListener("blur", function () {
      setTimeout(() => {
        dropdown.style.display = "none";
      }, 200);
    });
  }

  initCraftingTable() {
    const craftTableElement = document.getElementById(CRAFTING_TABLE_ID);
    craftTableElement.innerHTML = "";

    this.craftTable = Array(9).fill(0);

    for (let index = 0; index < 9; index++) {
      const newItem = this.createItemElement(
        `craft-table-${index}`,
        GRID_CELL_CLASS,
        () => this.selectCraftTableItem(index),
      );
      craftTableElement.appendChild(newItem);
    }
  }

  selectCraftTableItem(craftCellIndex) {
    const craftTableCell = document.getElementById(`craft-table-${craftCellIndex}`);

    if (craftTableCell.innerHTML === "") {
      if (this.selectedInventoryCell) {
        craftTableCell.innerHTML = this.selectedInventoryCell.innerHTML;
        this.craftTable[craftCellIndex] = this.selectedIngredient;
      }
    } else {
      craftTableCell.innerHTML = "";
      this.craftTable[craftCellIndex] = 0;
    }
  }

  loadRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * RECIPES.length);
    this.currentRecipe = RECIPES[randomIndex];
    this.showRecipe();
    this.populateDropdown();
  }

  showRecipe() {
    for (let index = 0; index < 9; index++) {
      const craftTableCell = document.getElementById(`craft-table-${index}`);
      if (this.currentRecipe[2][index] !== 0) {
        craftTableCell.innerHTML = `<img src="./assets/${this.currentRecipe[2][index]}-0.png" alt="ingredient">`;
      } else {
        craftTableCell.innerHTML = "";
      }
    }
  }

  populateDropdown() {
    const dropdown = document.getElementById(DROPDOWN_ID);
    dropdown.innerHTML = "";

    Object.keys(ITEM_NAMES).forEach(itemId => {
      const itemElement = document.createElement("div");
      itemElement.textContent = ITEM_NAMES[itemId];
      itemElement.onclick = () => this.selectOption(parseInt(itemId));
      dropdown.appendChild(itemElement);
    });
  }

  filterDropdown(query) {
    const dropdown = document.getElementById(DROPDOWN_ID);
    const items = dropdown.getElementsByTagName("div");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
  }

  selectOption(option) {
    this.selectedIngredient = option;
    document.getElementById(SEARCH_BAR_ID).value = ITEM_NAMES[option];
    console.log("Selected ingredient:", this.selectedIngredient);
  }

  checkAnswer() {
    console.log("Checking answer. Selected ingredient:", this.selectedIngredient, "Correct ingredient:", this.currentRecipe[1]);
    if (this.selectedIngredient === this.currentRecipe[1]) {
      this.showContinueButton();
    } else {
      const submitButton = document.getElementById(SUBMIT_BUTTON_ID);
      submitButton.classList.add("shake");
      setTimeout(() => {
        submitButton.classList.remove("shake");
      }, 500);
    }
  }

  showContinueButton() {
    const submitButton = document.getElementById(SUBMIT_BUTTON_ID);
    const continueButton = document.getElementById(CONTINUE_BUTTON_ID);
    const searchBar = document.getElementById(SEARCH_BAR_ID);
    submitButton.style.display = "none";
    continueButton.style.display = "block";
    continueButton.style.width = `${searchBar.offsetWidth + submitButton.offsetWidth + 10}px`;
    searchBar.style.display = "none";
  }

  resetForNextRound() {
    const submitButton = document.getElementById(SUBMIT_BUTTON_ID);
    const continueButton = document.getElementById(CONTINUE_BUTTON_ID);
    const searchBar = document.getElementById(SEARCH_BAR_ID);
    submitButton.style.display = "block";
    continueButton.style.display = "none";
    continueButton.style.width = "";
    searchBar.style.display = "block";
    this.resetCraftingTable();
    this.loadRandomRecipe();
  }

  resetCraftingTable() {
    this.craftTable.fill(0);
    for (let index = 0; index < 9; index++) {
      document.getElementById(`craft-table-${index}`).innerHTML = "";
    }
  }

  createItemElement(id, className, onClickFn) {
    const item = document.createElement("div");
    item.id = id;
    item.className = className;
    item.onclick = onClickFn;
    return item;
  }

  createImageElement(imagePath, alt) {
    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = alt;
    return image;
  }
}

const game = new Game();