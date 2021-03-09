const container = document.querySelector("[data-container]");

let myLibrary = [];

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
  "read",
  "https://images.penguinrandomhouse.com/cover/9780553805444"
);
addBookToLibrary(book1);

let book2 = new Book(
  "Sapiens",
  "Nauvo",
  "self-help",
  600,
  "lorem",
  "read",
  "https://images-na.ssl-images-amazon.com/images/I/41+lolL22gL.jpg"
);
addBookToLibrary(book2);

//populating book gallery using DOM -- for each array item -
function populate() {
  //create background
  myLibrary.forEach((book) => {
    //create book box
    let newDiv = document.createElement("div");
    newDiv.classList.add("grid1");
    container.appendChild(newDiv);
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
    buttonDiv.appendChild(editBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
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
}
populate();
