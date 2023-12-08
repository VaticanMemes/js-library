/*
Steps:
1. Retrieve data from the form
2. Put the data from the form into an array
3. Spit that data out in the form of cards (the hardest part)
*/

class Book {
    constructor(title, author, pages, pages_read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pages_read = pages_read;
    }

    getInfo() {
        const read_statement = (this.read_status == this.pages_read) ? "read": "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read_statement}`;
    }
}

const myLibrary = [];

document.getElementById("submit-button").addEventListener("click", addBookToLibrary());

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let pagesRead = document.getElementById("pages-read").value;
    let book = new Book(title, author, pages, pagesRead);
    console.log(book);
    myLibrary.push(book);
    console.log(myLibrary);
}