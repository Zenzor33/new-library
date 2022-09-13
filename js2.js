// Event listeners (non-DOM created elements)

const btnAddNewBook = document.querySelector("#btnBook");
btnAddNewBook.addEventListener("click", () => {
  popup = document.querySelector(".form-popup");
  popup.classList.remove("hidden");
});

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", createBook);

const btnCancel = document.querySelector("#btnCancel");
btnCancel.addEventListener("click", resetAndClosePopup);

// Object constructor

let myLibrary = [];

let count = 0;
function counts() {
  count += 1;
  return count;
}

// function Book(title, author, numPages, read, id) {
//   this.title = title;
//   this.author = author;
//   this.numPages = numPages;
//   this.read = read; // 'yes or 'no'
//   this.id = id;
// }

class Book {
  constructor(title, author, numPages, read, id) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = id;
  }

  createCard = function (identifier) {
    const divMain = document.querySelector(".main");
    const divCard = document.createElement("div");
    const divCardTitle = document.createElement("div");
    const divCardAuthor = document.createElement("div");
    const divCardPages = document.createElement("div");
    const divCardFooter = document.createElement("div");
    const divCardDidRead = document.createElement("div");
  
    divCard.classList.add("card");
    divCard.setAttribute("id", `${this.id}`);
    divMain.appendChild(divCard);
  
    divCardTitle.classList.add("card-title");
    divCard.appendChild(divCardTitle);
    let newContent = document.createTextNode(this.title);
    divCardTitle.appendChild(newContent);
  
    divCardAuthor.classList.add("card-author");
    divCard.appendChild(divCardAuthor);
    newContent = document.createTextNode(this.author);
    divCardAuthor.appendChild(newContent);
  
    divCardPages.classList.add("card-pages");
    divCard.appendChild(divCardPages);
    newContent = document.createTextNode(this.numPages);
    divCardPages.appendChild(newContent);
  
    divCardFooter.classList.add("card-footer");
    divCard.appendChild(divCardFooter);
  
    divCardDidRead.classList.add("card-didRead");
    divCardDidRead.setAttribute("data-didRead", `${this.id}`);
  
    // refactor later
    divCardFooter.appendChild(divCardDidRead);
    if (this.read === "yes") {
      newContent = document.createTextNode("I've read it");
      divCardDidRead.appendChild(newContent);
    } else if (this.read === "no") {
      newContent = document.createTextNode("I've not read it");
      divCardDidRead.appendChild(newContent);
    } else {
      console.log("error at book_read y/n");
    }
  
    const divCardIcons = document.createElement("div");
    divCardIcons.classList.add("card-icons");
    divCardFooter.appendChild(divCardIcons);
  
    // the delete button
    // global variable 'eventId' is bad practice?
    const divCardIcon1 = document.createElement("div");
    divCardIcon1.classList.add("card-icon-delete");
  
    let eventId = this.id;
    divCardIcon1.addEventListener("click", function () {
      let index = myLibrary.map((object) => object.id).indexOf(eventId);
      myLibrary.splice(index, 1);
  
      let cardElement = document.getElementById(eventId);
      console.log(eventId);
  
      cardElement.remove();
    });
  
    divCardIcons.appendChild(divCardIcon1);
    const imgDel = document.createElement("img");
    imgDel.setAttribute("src", "img/trash-can-outline.png");
    divCardIcon1.appendChild(imgDel);
  
    const divCardIcon2 = document.createElement("div");
    divCardIcon2.classList.add("card-icon-toggle");
    divCardIcons.appendChild(divCardIcon2);
    const imgToggle = document.createElement("img");
    imgToggle.setAttribute("src", "img/check.png");
    divCardIcon2.appendChild(imgToggle);
  
    divCardIcon2.addEventListener("click", function () {
      // select the textnode
      const cardTextNode = document.querySelector(`[data-didread="${eventId}"]`);
  
      // When button is clicked, change the id in the object
      // After object is updated, write a function to update the text display.
  
      const indexOfTitle = myLibrary.map((object) => object.id).indexOf(eventId);
      let cardReadStatus = myLibrary[indexOfTitle].read;
  
      if (cardReadStatus === "yes") {
        myLibrary[indexOfTitle].read = "no";
        cardTextNode.textContent = "I've not read it";
      } else if (cardReadStatus === "no") {
        myLibrary[indexOfTitle].read = "yes";
        cardTextNode.textContent = "I've read it";
      } else {
        console.log("Error at divCardIcon2 (toggle button)");
      }
    });
  };
}

function createBook(e) {
  e.preventDefault();

  let book_title = document.forms["book_form"].elements["book_title"].value;
  let book_author = document.forms["book_form"].elements["book_author"].value;
  let book_pages = document.forms["book_form"].elements["book_pages"].value;
  let book_read = document.forms["book_form"].elements["book_read"].value;
  let id = counts();

  let book = new Book(book_title, book_author, book_pages, book_read, id);
  myLibrary.push(book);
  book.createCard(id);
  resetAndClosePopup();
}

function resetAndClosePopup() {
  popup = document.querySelector(".form-popup");
  popup.classList.add("hidden");
  book_form.reset();
}
