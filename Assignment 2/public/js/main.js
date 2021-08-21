/* JavaScript file used for search page results and saving books*/

function searchForBook(){
    var titleData = [] // array pou krata tous titlous twn vivliwn gia thn anazhthsh.
    var authorData = [] // array pou krata tous syggrafeis twn vivliwn gia thn anazhthsh.
    var idData = [] // array pou krata ta ID twn vivliwn gia thn anazhthsh.
    var subTitleData = [] // array pou krata thn "perigrafh" twn vivliwn gia anazhthsh. (periexontai lexeis kleidia edw
                         // poy merikes fores den fainontai sto sketo title.)


    document.getElementById("books").innerHTML = ""; // adeiazoume th selida wste na mpoun ta nea dedomena se periptwsh 2hs anazhthshs kai panw.
    var templates = {}
    var keyword = document.getElementById("input").value;
    fetch("https://reststop.randomhouse.com/resources/works?search=" + keyword,{
    method : 'GET',
    headers : {
        'Accept' : 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => {
        for (i = 0; i < data["work"].length; i++){
            titleData[i] = data["work"][i].titleweb;
            subTitleData[i] = data["work"][i].titleSubtitleAuth;
            authorData[i] = data["work"][i].authorweb;
            idData[i] = data["work"][i].workid;
        }
        let bookDetailsScript = document.getElementById("book-details-template");
        templates.bookDetails = Handlebars.compile(bookDetailsScript.textContent);

        for (i = 0; i < titleData.length; i++){ // oi 3 pinakes exoun idio megethos ara den mas endiaferei poianou to length tha paroume.
            var bookShow = templates.bookDetails({
                book : [
                    {   title : titleData[i],
                        subTitle : subTitleData[i], 
                        author : authorData[i],
                        id : idData[i]
                    }
                ]
            });
            document.getElementById("books").innerHTML += bookShow;   
        }
    });
}


function saveBook(identity){
    localStorage.setItem("undoID" , identity); // ayto gia to koumpi anaireshs.
    fetch("https://reststop.randomhouse.com/resources/works/" + identity + "?search=", {
        method : 'GET',
        headers : {
            'Accept' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        var titleData = [] // array pou krata ton titlo tou vivliou pros apothikeysh.
        var authorData = [] // array pou krata ton syggrafea tou vivliou pros apothikeysh.
        var idData = [] // array pou krata to ID tou vivliou pros apothikeysh.
        var subTitleData = [] // array pou krata thn "perigrafh" tou vivliou pros apothikeysh. (periexontai lexeis kleidia edw
                             // poy merikes fores den fainontai sto sketo title.)
                             
        titleData[0] = data.titleweb;
        authorData[0] = data.authorweb;
        idData[0] = data.workid;
        subTitleData[0] = data.titleSubtitleAuth;

        let dataToSend = {
            "title" : titleData[0],
            "subTitle" : subTitleData[0],
            "author" : authorData[0],
            "id" : idData[0]
        };

        var d = JSON.stringify(dataToSend);

        // elegxos an yparxei hdh to vivlio sth Bash.

    
        fetch('/books/' + identity, {
            method : 'GET',
            headers : {
                'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {

            // apothikeysh sth vash dedomenwn. An yparxei hdh den swzetai kai lamvanoume antistoixo mhnyma.

            fetch('/books' , {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : d
            });

            alert("Checking if "+ titleData[0] + " is already on your list. If not it will be added successfully.");

            if(data[0].title == titleData[0] && data[0].author == authorData[0]){
                alert(titleData[0] + " has already been added to your list. You can't add it again.");
                return;
            }
        })
    });
}