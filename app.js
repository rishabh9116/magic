console.log('Welcome to notes App. This is App js');
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {  // here we are writing what happens after clicking 
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
})

// function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `   
   <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
      
   <div class="card-body">
     <h5 class="card-title">Note ${index + 1}</h5>
     <p class="card-text">${element}</p>
     <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
   </div>
 </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Please Use "Add a note" above to add notes  `
    }
}


// function to delete a note
function deleteNote(index) {
    //console.log('I am deleting', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');// search bar ke content ko search mein lelo
search.addEventListener("input", function () {// hre we typwd "input" for getting input in search bar
    let inputVal = search.value.toLowerCase(); // ab inputVal mein search ka content aa gya {jo bhi type kroge}
    //console.log('Input event fired!', inputVal);// usko console mei print kra diya
    let noteCards = document.getElementsByClassName('noteCard');// sabhi noteCard ko noteCrads var mein lelo
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;// sabhi note cards ke liye unka content cardtxt mein save krdo
        if (cardTxt.includes(inputVal)) {// agar cardtxt inputval{jo search mein type kiya} ko include krta hai{mtlab search mein typed content kisi card ke text se match krta hai } toh
            // ye kro
            element.style.display = "block";
        }

        else {
            element.style.display = "none";

        }
        //console.log(cardTxt);

    })
})



/*
further faetures
1. Add title
2. Mark a note as important 
3. Separate notes by user
4. sync and host to web server
*/
