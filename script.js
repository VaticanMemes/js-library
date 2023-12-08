/*
Steps:
1. Retrieve data from the form
2. Put the data from the form into an array
3. Spit that data out in the form of cards (the hardest part)
*/
/*
Little test:
const yourLibrary = [{title: 'a', author: 'b', pages: 'c', pages_read: 'd'}, {title: 'e', author: 'f', pages: 'g', pages_read: 'h'}, {title: 'i', author: 'j', pages: 'k', pages_read: 'l'}];

for (let i = 0; i < yourLibrary.length; i++) {
    console.log(yourLibrary[i].title);
}
*/

const myLibrary = [];

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

function updateTable() {
    const cardsDiv = document.getElementById("cards")
    while (cardsDiv.firstChild) {
        cardsDiv.removeChild(cardsDiv.lastChild)
    }
    for (let i = 0; i < myLibrary.length; i++) {
        // Column created
        const column = document.createElement("div");
        column.className = "col";
        // document.getElementById("cards").insertBefore(column, document.getElementById("end-of-cards"));
        // Card created
        const card = document.createElement("div");
        card.className = "card";
        column.appendChild(card);
        // Card body created
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);
        // Card title
        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.appendChild(document.createTextNode(myLibrary[i].title));
        cardBody.appendChild(cardTitle);
        // Card title & pages read
        const cardInfo = document.createElement("p");
        cardInfo.className = "card-text";
        cardInfo.appendChild(document.createTextNode(myLibrary[i].author));
        cardInfo.appendChild(document.createElement('br'));
        cardInfo.appendChild(document.createTextNode(myLibrary[i].pages_read + "/" + myLibrary[i].pages + " pages read"));
        cardBody.appendChild(cardInfo);
        // Progress bar
        const barPerct = String(Math.round((myLibrary[i].pages_read / myLibrary[i].pages) * 100))
        const progressBar = document.createElement("div");
        progressBar.className = "progress";
        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("aria-valuenow", barPerct);
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "100");
        const progressBarBar = document.createElement("div");
        progressBarBar.className = "progress-bar";
        progressBarBar.setAttribute("style", "width: " + barPerct + "%");
        progressBarBar.appendChild(document.createTextNode(barPerct + "%"));
        progressBar.appendChild(progressBarBar);
        cardBody.appendChild(progressBar);
        // Delete button
        cardBody.appendChild(document.createElement('br'));
        const button = document.createElement("button")
        button.className = "btn btn-outline-danger"
        button.setAttribute("type", "button")
        button.setAttribute("id", i)
        button.setAttribute("onclick", "deleteBook(id)")
        button.appendChild(document.createTextNode("Delete"))
        cardBody.appendChild(button)
        // Final
        document.getElementById("cards").appendChild(column);
    }
}

function deleteBook(id) {
    myLibrary.splice(id, 1);
    updateTable();
}

function addBookToLibrary(evt) {
    evt.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let pagesRead = document.getElementById("pages-read").value;
    let book = new Book(title, author, pages, pagesRead);
    myLibrary.push(book);
    updateTable();
}

document.getElementById("submit-button").addEventListener("click", addBookToLibrary);

/*
Prototype
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">The Hobbit</h5>
          <p class="card-text">J.R.R. Tolkein <br> 160/320 pages read</p>
          <div class="progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: 50%">50%</div>
          </div>
          <br>
          <button type="button" class="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
*/