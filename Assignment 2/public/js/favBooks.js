
// arxeio gia diaxeirish bibliwn.

//synarthsh gia emfanish listas, ekteleitai kathe fora pou anoigei h istoselida.

function deployList(){


    document.getElementById("savedBooks").innerHTML = ""; // ekatharish ths listas wste na ginetai updated kathe fora pou diagrafetai kapoio vivlio h edited.

    var titleData = [] // array pou krata tous titlous twn vivliwn gia thn anazhthsh.
    var authorData = [] // array pou krata tous syggrafeis twn vivliwn gia thn anazhthsh.
    var idData = [] // array pou krata ta ID twn vivliwn gia thn anazhthsh.
    var revData = [] // array gia tis kritikes.

    var templates = {}

    fetch('/books' , {
        method : 'GET',
        headers : {
            'Accept' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        for(i = 0; i < data.length; i++){
            titleData[i] = data[i].title;
            authorData[i] = data[i].author;
            idData[i] = data[i].id;
            revData[i] = data[i].review;
        }

        let bookDetailsScript = document.getElementById("saved-book-details-template");
        templates.bookDetails = Handlebars.compile(bookDetailsScript.textContent);

        for (i = 0; i < titleData.length; i++){
            var bookShow = templates.bookDetails({
                book : [
                    {
                        title : titleData[i],
                        author : authorData[i],
                        id : idData[i],
                        review : revData[i]
                    }
                ]
            })
            document.getElementById("savedBooks").innerHTML += bookShow;
        }
    });
}

deployList() // ektelesh ths synarthshs kathe fora pou anoigei h istoselida.

// Diagrafh vivliou apo th vash.
function deleteBook(identity){
    var id = {"id" : identity};
    var data = JSON.stringify(id); // vazw to ID se json morfh wste na stalthei ston server
                                  //  kai na mporesei na ginei swsta h diagrafh.  

    fetch("/books/" + identity , {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : data
    })
    .then(res => res.json())
    alert("Book with ID: " + identity + " has been deleted successfully.");
}


// synarthsh kathysterhshs xronou 0.5 seconds gia th filtering synarthsh.

var delay = 0;
var delayTimeout; // global variables gia xrhsh sthn filterDelay().

function filterDelay(){
    delay = 0.5*1000;
    clearTimeout(delayTimeout);

    delayTimeout = setTimeout(filterBook , delay);
}

// synarthsh gia dhmiourgia koumpiou anaireshs.
function createUndo(){
    document.getElementById("undoButton").innerHTML = "";
    var id = localStorage.getItem("undoID");
    localStorage.clear();
    var code = "<button type = 'submit' id = 'undoBut' onclick = 'deleteBook(" + id + ")'> Undo </button>";
    document.getElementById("undoButton").innerHTML += code;
}

// synarthsh gia filtrarisma
// to filtering ginetai gia titlo kai syggrafea.

function filterBook(){

    document.getElementById("savedBooks").innerHTML = ""; //reset kathe fora th lista wste na exoume mono ta epithymhta apotelesmata apo to filtrarisma.

    var titleData = [] // array pou krata tous titlous twn vivliwn gia thn anazhthsh.
    var authorData = [] // array pou krata tous syggrafeis twn vivliwn gia thn anazhthsh.
    var idData = [] // array pou krata ta ID twn vivliwn gia thn anazhthsh.
    var revData = [] // array gia tis kritikes.

    var templates = {}

    fetch('/books' , {
        method : 'GET',
        headers : {
            'Accept' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        for(i = 0; i < data.length; i++){
            titleData[i] = data[i].title;
            authorData[i] = data[i].author;
            idData[i] = data[i].id;
            revData[i] = data[i].review;
        }
        var input = document.getElementById("input").value;
        var filter = input.toUpperCase();

        let bookDetailsScript = document.getElementById("saved-book-details-template");
        templates.bookDetails = Handlebars.compile(bookDetailsScript.textContent);

        for (i = 0; i < titleData.length; i++){
            var bookShow = templates.bookDetails({
                book : [
                    {
                        title : titleData[i],
                        author : authorData[i],
                        id : idData[i],
                        review : revData[i]
                    }
                ]
            })
            txtValue = titleData[i];
            autxtValue = authorData[i];
            if (txtValue.toUpperCase().indexOf(filter) > -1 || autxtValue.toUpperCase().indexOf(filter) > -1){
                document.getElementById("savedBooks").innerHTML += bookShow;
            }else{
                document.getElementById("savedBooks").innerHTML += "";
            }
        }
    })
}

