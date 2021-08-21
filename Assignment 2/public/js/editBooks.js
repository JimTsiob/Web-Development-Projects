// epexergasia vivliwn.

function setId(val){
    var id = val;
    localStorage.setItem("id",id); // to local storage xrhsimopoietai gia th metafora tou ID apo to manageFavBooks.html sto editBook.html
}



function editBook(){
    var newTitle = document.getElementById("titleIn").value;
    var newAuthor = document.getElementById("authorIn").value;
    var id = localStorage.getItem("id"); // pairnoume to id tou ekastote vivliou.
    var rev = document.getElementById("txarea").value;
    var jsondata = {"title" : newTitle , "author" : newAuthor , "id" : id , "review" : rev};

    var d = JSON.stringify(jsondata);

    fetch('/books/' , {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body : d
    })

    alert("Book with ID : " + id + " has been updated successfully.");
    localStorage.removeItem("id");
}
