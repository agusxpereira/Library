let myLibrary = [];


const buttonForm = document.querySelector("#btn-send"); 
const form = document.querySelector("#form");
const library = document.querySelector(".library");
const buttonShow = document.querySelector("#show-library");
const booksConteiner = document.querySelector("#books");




let dataName = document.querySelector("#title");
let dataAuthor = document.querySelector("#author"); 
let dataPages = document.querySelector("#pages"); 
let dataRead = document.querySelector("#read");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;   
} 

Book.prototype.info = function(){
    let readed = (this.read == true) ? "already read" : "not read yet"; 
    console.log(this.read);
    return `${this.title} by ${this.author}. ${this.pages} pages,${readed}.`;
}



function createLibrary(){
        //1st i delete all, with the for of push again each li
        booksConteiner.textContent = "";
        //library 
        counter = 0;
        
        for (const book of myLibrary) { 
        
            counter++;//counter for dataset
            /*div declare*/ 
            let div = document.createElement("div");
            let divTitle = document.createElement("div"); 
            let divInfo = document.createElement("div");
            let read = document.createElement("div");
    
            div.classList.add("list-card-book"); 
            div.classList.add("flex-column-center")
            div.dataset.indexNumber = counter;
    
            /*div titlte*/ 
            divTitle.classList.add("div-title");
            divTitle.textContent = `${book.title}`;
            
            /*Div info */ 
            divInfo.textContent = `Author: ${book.author}.\n`;
            divInfo.textContent += `Pages: ${book.pages}.`;
    
            /*Div readed */    
    
            read.dataset.indexNumber = counter;
            if (book.read == true) {
                read.classList.add("book-readed"); 
                read.innerHTML = "Readed: Yes";
                
            }else{
                read.classList.add("book-readed"); 
                read.classList.add("no-readed"); 
                read.innerHTML = "Readed: No";
            }


            let button = document.createElement("button"); 
            button.classList.add("delete"); 
            button.dataset.indexNumber = counter;
            button.innerText = "X";
    
    
            div.appendChild(divTitle);
            div.appendChild(divInfo); 
            div.appendChild(read);
            div.appendChild(button);
    
            booksConteiner.appendChild(div);
        } 
        const buttonDelete = document.querySelectorAll(".delete");
            buttonDelete.forEach( button => {
                button.addEventListener('click', ()=>{

                let currentIndex = button.dataset.indexNumber; 
                
                myLibrary.splice(currentIndex-1, 1);
                
                createLibrary(); 
        });  

        const buttonRead = document.querySelectorAll(".book-readed");
        buttonRead.forEach(element =>{
            element.addEventListener('click', ()=>{
                //gonna chanche the value on '.read', also check what classes include or remove 
                let book = myLibrary[element.dataset.indexNumber -1];

                if (book.read == true) {
                    element.classList.add("no-readed");
                    element.innerText = "Readed: No"
                    book.read = false;
                }else if(book.read == false){
                    element.classList.add("book-readed"); 
                    element.classList.remove("no-readed"); 
                     
                    element.innerText = "Readed: Yes";
                    book.read = true; 
                }
            })
        });
    });
        
};



buttonForm.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(dataName);

    let title = dataName.value;
    let author = dataAuthor.value;
    let pages = Number(dataPages.value); 
    let read = dataRead.checked;

    
    let newBook = new Book(title, author, pages, read);
    
    myLibrary.push(newBook);

    dataName.value = ""; 
    dataAuthor.value = ""; 
    dataPages.value = ""; 
    dataRead.value = false;

    createLibrary();
    
});


let counter = 0;

/*https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach */
/**https://developer.mozilla.org/es/docs/Web/HTML/Element/dialog */ 
/**https://developer.mozilla.org/es/docs/Learn/HTML/Howto/Use_data_attributes */