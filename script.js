const container = document.querySelector("[data-container]");
let grid1 = document.querySelectorAll(".grid1");
const addBook = document.querySelector("[data-addBook]");
let modal = document.querySelector("[data-modal]");
let cancel = document.querySelector("[data-cancel]");
let submit = document.querySelector("[data-submit]");
let bookForm = document.querySelector("[data-bookForm]");
let del = document.querySelectorAll(".deleteBtn");
let bookCount = document.querySelector("[data-bookCount");
let completedCount = document.querySelector("[data-completedCount");
let inProgress = document.querySelector("[data-progressCount");

let myLibrary = "";
//returning empty library if there is no localestorage to avoid error
function libraryVar() {
  if (localStorage.length == 0) {
    myLibrary = [];
  } else myLibrary = JSON.parse(localStorage["myLibrary"]);
}

libraryVar();
let index = 0;

function updateLocalStorage() {
  localStorage.clear();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

//book constructor
function Book(title, author, genre, pages, comment, status, img) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages + " pages";
  this.comment = comment;
  this.status = status;
  this.img = img;
}

function countReader() {
  let count = 0;
  let readBtn = document.querySelectorAll(".readBtn");
  readBtn.forEach((btn) => {
    if (btn.dataset.read == 1) count++;
  });
  return count;
}
// count function update
function count() {
  bookCount.textContent = myLibrary.length;
  completedCount.textContent = countReader();
  inProgress.textContent = `${myLibrary.length - completedCount.textContent}`;
}
count();
//adding book to array which will be used to display on page
function addBookToLibrary(book) {
  myLibrary.push(book);
}

//creating a book
let book1 = new Book(
  "Run",
  "bodoho",
  "fiction",
  500,
  "lorem",
  "1",
  "https://images.penguinrandomhouse.com/cover/9780553805444"
);

let book2 = new Book(
  "Sapiens",
  "Nauvo",
  "self-help",
  600,
  "lorem",
  "",
  "https://images-na.ssl-images-amazon.com/images/I/41+lolL22gL.jpg"
);

function readBtn() {
  let readBtn = document.querySelectorAll(".readBtn");
  readBtn.forEach((btn) =>
    btn.addEventListener("change", (e) => {
      index = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
      if (e.target.checked) {
        e.target.dataset.read = 1;
        myLibrary[index].status = 1;
      } else {
        e.target.dataset.read = 0;
        myLibrary[index].status = 0;
      }
      updateLocalStorage();
      count();
    })
  );
}

//delete button - using index-- when used without function. it only runs once at beggining and then event listener is lost once populated is ran a second time.
function deleter() {
  del.forEach((button) =>
    button.addEventListener("click", (e) => {
      index = e.target.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
      myLibrary.splice(index, 1);
      updateLocalStorage();
      populate();
    })
  );
}

//populating book gallery using DOM -- for each array item -
function populate() {
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  index = -1;
  //create background
  myLibrary.forEach((book) => {
    index += 1;
    //create book box
    let newDiv = document.createElement("div");
    newDiv.classList.add("grid1");
    container.appendChild(newDiv);
    newDiv.dataset.index = `${index}`;
    // add title
    let title = document.createElement("div");
    title.classList.add("title");
    title.textContent = book.title;
    newDiv.appendChild(title);
    //create sidebar
    let sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    newDiv.appendChild(sidebar);
    //add author
    let author = document.createElement("div");
    author.classList.add("author");
    author.textContent = book.author;
    sidebar.appendChild(author);
    //add Genre
    let genre = document.createElement("div");
    genre.classList.add("genre");
    genre.textContent = book.genre;
    sidebar.appendChild(genre);
    //add number of pages
    let pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = book.pages;
    sidebar.appendChild(pages);
    //add comments
    let comment = document.createElement("div");
    comment.classList.add("comment");
    comment.textContent = book.comment;
    newDiv.appendChild(comment);
    //add bottom
    let bottom = document.createElement("div");
    bottom.classList.add("bottom");
    newDiv.appendChild(bottom);
    //add status/read box
    let status = document.createElement("div");
    status.classList.add("status");
    let label = document.createElement("label");
    label.classList.add("switch");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("readBtn");
    if (book.status == 1) {
      input.dataset.read = 1;
      input.checked = true;
    } else {
      input.dataset.read = 0;
      input.checked = false;
    }
    let span = document.createElement("span");
    span.classList.add("slider");
    label.appendChild(input);
    label.appendChild(span);
    status.appendChild(label);
    bottom.appendChild(status);
    //add buttons to bottom
    let buttonDiv = document.createElement("div");
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    buttonDiv.appendChild(editBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    buttonDiv.appendChild(deleteBtn);
    bottom.appendChild(buttonDiv);
    //append image
    let img = document.createElement("img");
    //only set img if the entry exists
    if (book.img) {
      newDiv.style.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.5)
      ),url(${book.img})`;
      newDiv.style.color = "white";
      //   ).setAttribute("src", book.img);
      //   newDiv.appendChild(img);
    }
  });
  del = document.querySelectorAll(".deleteBtn");
  deleter();
  count();
  countReader();
  editer();
  readBtn();
}
populate();

//form

//add book button - toggles visiblility of form
addBook.addEventListener("click", function (e) {
  modal.classList.toggle("show-modal");
  bookForm.reset();
});

// add cancel -- removes visibility of form
cancel.addEventListener("click", function (e) {
  modal.classList.toggle("show-modal");
  container.dataset.mode = "";
});

//creates object based on form data
submit.addEventListener("click", function (e) {
  if (container.dataset.mode == "editing") {
    myLibrary[editIndex].title = bookForm.title.value;
    myLibrary[editIndex].author = bookForm.author.value;
    myLibrary[editIndex].genre = bookForm.genre.value;
    myLibrary[editIndex].pages = bookForm.pages.value;
    myLibrary[editIndex].comment = bookForm.comment.value;
    myLibrary[editIndex].status = bookForm.status.value;
    myLibrary[editIndex].img = bookForm.image.value;
    populate();
    modal.classList.toggle("show-modal");
  } else {
    let title = bookForm.title.value;
    let author = bookForm.author.value;
    let genre = bookForm.genre.value;
    let pages = bookForm.pages.value;
    let comment = bookForm.comment.value;
    let status = bookForm.status.value;
    let img = bookForm.image.value;
    if (
      title == "" ||
      author == "" ||
      genre == "" ||
      pages == "" ||
      comment == ""
    ) {
      return alert("Fill in all input fields");
    } else {
      addBookToLibrary(
        new Book(title, author, genre, pages, comment, status, img)
      );
      console.log(myLibrary);
      populate();
      modal.classList.toggle("show-modal");
    }
  }
  updateLocalStorage();
});

//read button functionality - if read - toggle read checkbox to on-- add to completed book count

//editing helper variables
editIndex = "";

// using edit btn
function editer() {
  let edit = document.querySelectorAll(".editBtn");
  edit.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      index = e.target.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
      editIndex = index;
      e.target.parentNode.parentNode.parentNode.parentNode.dataset.mode =
        "editing";
      modal.classList.toggle("show-modal");
      bookForm.title.value = myLibrary[index].title;
      bookForm.author.value = myLibrary[index].author;
      bookForm.genre.value = myLibrary[index].genre;
      bookForm.pages.value = myLibrary[index].pages.match(/\d+/g).join("");
      bookForm.comment.value = myLibrary[index].comment;
      bookForm.status.value = myLibrary[index].status;
      bookForm.image.value = myLibrary[index].img;
    })
  );
}
