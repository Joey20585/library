const myLibrary = [];

function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;


    Book.prototype.toggleReadStatus = function() {
        this.read = !this.read;
    };
    
  
}




function addBookToLibrary() {
    let title = document.querySelector("#title").value.trim();
    let author = document.querySelector("#author").value.trim();
    let pages = document.querySelector("#pages").value.trim();
    let read = document.querySelector("#read").checked;
    let newBook=new Book(title,author,pages,read);
    myLibrary.push(newBook);

    render();



  
}



function render(){
    let libraryEl=document.querySelector("#library");
    libraryEl.innerHTML = ""; 
    libraryEl.style.display = "grid";
    libraryEl.style.gridTemplateColumns = "repeat(5, 1fr)"; 

    libraryEl.style.gap = "10px";
    libraryEl.style.maxHeight = "800px";
    libraryEl.style.overflowY = "auto";

    for (let i = 0; i < myLibrary.length; i++){
        let book=myLibrary[i];
        let bookEl=document.createElement("div");
        bookEl.setAttribute("class","book-card");
        bookEl.style.backgroundColor = book.read ? "pink" : "white";

        bookEl.innerHTML = `<p><strong>${book.title}</strong> by ${book.author}, ${book.pages} pages. Read: ${book.read ? "Yes" : "No"}</p>`;
        
        libraryEl.appendChild(bookEl);
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("class", "remove-btn");
        removeBtn.setAttribute("data-index", i);

        removeBtn.addEventListener("click", function () {
            myLibrary.splice(i, 1);
            render();
        });

        bookEl.appendChild(removeBtn);
        libraryEl.appendChild(bookEl);
    }
}


    



document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        myLibrary.splice(index, 1); 
        render(); 
    });
})

document.addEventListener("DOMContentLoaded", function() {
    let newBookbtn = document.querySelector("#new-book-btn");
    let newBookForm = document.querySelector("#new-book-form");

    newBookbtn.addEventListener("click", function() {
        newBookForm.style.display = "block";
    });
    document.querySelector("#new-book-form").addEventListener("submit",function(event){ 
         event.preventDefault();
         addBookToLibrary();
    
}); 

});


function addBookToLibrary() {
    let title = document.querySelector("#title").value.trim();
    let author = document.querySelector("#author").value.trim();
    let pages = document.querySelector("#pages").value.trim();
    let read = document.querySelector("#read").checked;

if (title === "" || author === "" || pages === "") {
        alert("Please fill in all fields.");
        return;
    }

    let duplicate = myLibrary.some(book => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase());

    if (duplicate) {
        alert("This book is already in the library.");
        return;
    }

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    render();
    document.querySelector("#new-book-form").reset(); // Clear form after adding
}
