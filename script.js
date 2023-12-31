/*
Work to do:
- Validate the form ✔️
- Say what went wrong when it fails using bootstrap validators ✔️
- Revert all the boxes to the defaults when form is submitted ✔️
- Enable user to change pages-read ✔️
- Use local storage to save data ✔️
PROJECT DONE... NOT TOUCHING THIS AGAIN
*/

if (localStorage.getItem("myLibrary") === null) {
    var myLibrary = [];
} else {
    var myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

updateTable();

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

function isNumeric(str) {
    // got this off stackoverflow lol - first bit my own addition
    if (str === '') {
        return true
    } else {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
    }
  }

function updateTable() {
    // Update form first
    document.getElementById("title").className = "form-control";
    document.getElementById("author").className = "form-control";
    document.getElementById("pages").className = "form-control";
    document.getElementById("pages-read").className = "form-control";
    const cardsDiv = document.getElementById("cards")
    while (cardsDiv.firstChild) {
        cardsDiv.removeChild(cardsDiv.lastChild)
    }
    for (let i = 0; i < myLibrary.length; i++) {
        // Column created
        const column = document.createElement("div");
        column.className = "col";
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
        // Progress bar maths - pages read can't be more than 100%
        if (parseInt(myLibrary[i].pages_read) > myLibrary[i].pages) {
            myLibrary[i].pages_read = myLibrary[i].pages
        }
        if (!(isNumeric(myLibrary[i].pages_read))) {
            myLibrary[i].pages_read = 0
        }
            //
        var pageFrac = document.createElement("p");
        var pageInput = document.createElement("input");
        pageInput.setAttribute("class", "pages-read-box");
        pageInput.setAttribute("type", "text");
        pageInput.setAttribute("size", "1");
        pageInput.setAttribute("id", String(i));
        pageInput.setAttribute("value", String(myLibrary[i].pages_read));
        pageInput.setAttribute("onfocus", "let value = this.value; this.value = null; this.value=value");
        pageFrac.appendChild(pageInput);
        pageFrac.appendChild(document.createTextNode("/" + String(myLibrary[i].pages)));
            //
        var barPerct = String(Math.round((myLibrary[i].pages_read / myLibrary[i].pages) * 100));
        
        // Card title & pages read
        const cardInfo = document.createElement("p");
        cardInfo.className = "card-text";
        cardInfo.appendChild(document.createTextNode(myLibrary[i].author));
        cardInfo.appendChild(document.createElement('br'));
        cardInfo.appendChild(pageFrac);
        cardBody.appendChild(cardInfo);
        // Progress bar
        const progressBar = document.createElement("div");
        progressBar.className = "progress";
        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("aria-valuenow", barPerct);
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "100");
        const progressBarBar = document.createElement("div");
        if (barPerct === "100") {
            progressBarBar.className = "progress-bar progress-bar-striped";
        } else {
            progressBarBar.className = "progress-bar";
        }
        progressBarBar.setAttribute("style", "width: " + barPerct + "%");
        progressBarBar.appendChild(document.createTextNode(barPerct + "%"));
        progressBar.appendChild(progressBarBar);
        cardBody.appendChild(progressBar);
        // Delete button
        cardBody.appendChild(document.createElement('br'));
        const button = document.createElement("button")
        button.className = "btn btn-outline-danger"
        button.setAttribute("type", "button")
        button.setAttribute("id", i);
        button.setAttribute("onclick", "deleteBook(id)");
        button.appendChild(document.createTextNode("Delete"));
        cardBody.appendChild(button);
        // Finale
        document.getElementById("cards").appendChild(column);
        for (let j = 0; j < document.querySelectorAll(".pages-read-box").length; j++) {
            document.querySelectorAll(".pages-read-box")[j].addEventListener("input", updatePagesRead);
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        }
    }
}

function deleteBook(id) {
    myLibrary.splice(id, 1);
    updateTable();
}

function updatePagesRead(evt) {
    myLibrary[evt.target.id].pages_read = evt.target.value;
    updateTable();
    // document.getElementById(evt.target.id).focus()
    // var val = evt.target.value
    // evt.target.value = ""
    document.getElementById(evt.target.id).focus();
    // evt.target.value = val
}

function validateForm() {
    if (document.getElementById("title").value !== '' 
    && document.getElementById("author").value !== '' 
    && Number.isInteger(parseInt(document.getElementById("pages").value)) 
    && parseInt(document.getElementById("pages").value) >= 1
    && Number.isInteger(parseInt(document.getElementById("pages-read").value))
    && parseInt(document.getElementById("pages-read").value) >= 0) {
        return true;
    } else {
        // Title validation
        if (document.getElementById("title").value !== '') {
            document.getElementById("title").className = "form-control is-valid";
        } else {
            document.getElementById("title").className = "form-control is-invalid";
        }
        // Author validation
        if (document.getElementById("author").value !== '') {
            document.getElementById("author").className = "form-control is-valid";
        } else {
            document.getElementById("author").className = "form-control is-invalid";
        }
        // Pages validation
        if (Number.isInteger(parseInt(document.getElementById("pages").value)) && parseInt(document.getElementById("pages").value) >= 1) {
            document.getElementById("pages").className = "form-control is-valid";
        } else {
            document.getElementById("pages").className = "form-control is-invalid";
        }
        // Pages-read validation
        if (Number.isInteger(parseInt(document.getElementById("pages-read").value)) && parseInt(document.getElementById("pages-read").value) >= 0) {
            document.getElementById("pages-read").className = "form-control is-valid";
        } else {
            document.getElementById("pages-read").className = "form-control is-invalid";
        }
        return false;
    }
}

function addBookToLibrary(evt) {
    evt.preventDefault();
    if (validateForm() === true) {
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let pagesRead = document.getElementById("pages-read").value;
        let book = new Book(title, author, pages, pagesRead);
        myLibrary.push(book);
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("pages").value = '';
        document.getElementById("pages-read").value = '';
        updateTable();
    }
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