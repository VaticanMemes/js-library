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
    myLibrary.push(book)
}

while(true) {
    // blah blah
}