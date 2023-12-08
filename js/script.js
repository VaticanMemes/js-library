/*
console.log("hello world lmao")

const myLibrary = [];

class Book {
    constructor(title, author, pages, read_status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read_status = read_status;
    }

    getInfo() {
        const read_statement = (this.read_status == true) ? "read": "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read_statement}`;
    }
}

const book = new Book("The Hobbit", "JRR Tolkein", "320", true);

console.log(book.getInfo());

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read_status = document.getElementById("read_status").value;
}

while(true) {
    break;
}
*/

// Bad code lmao - fucked the whole thing up. The new code shall be better

class Book {
    constructor(title, author, pages, pages_read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pages_read = pages_read;
    }

    getInfo() {
        const read_statement = (this.read_status == true) ? "read": "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read_statement}`;
    }
}