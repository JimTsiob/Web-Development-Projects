/* DOM Queries */ 

/* αλλαγή γραμματοσειράς του h1 σε Charcoal */ 
function fontChange(){
    document.querySelector("h1").style.fontFamily = "Charcoal";
}



/* αλλαγή του χρώματος φόντου του footer */ 
function bgChange(){
    document.querySelector("footer").style.backgroundColor = "limegreen";
}

/* DOM events */

/* άλλαγη όλων των εικόνων της ιστοσελίδας κειμένου. */

document.getElementById("imgbutton").addEventListener("click",imageChange);

function imageChange(){
    document.getElementById("first").src = "swapPhoto.png";
    document.getElementById("second").src = "swapPhoto2.png";
    document.getElementById("third").src = "swapPhoto3.png";
}

/* Μεγέθυνση του κειμένου */

document.getElementById("textButton").addEventListener("click", textFunc);

function textFunc(){
    document.getElementById("par1").style.fontSize = "x-large";
    document.getElementById("par2").style.fontSize = "x-large";
    document.getElementById("par3").style.fontSize = "x-large";
    document.getElementById("par4").style.fontSize = "x-large";
    document.getElementById("par5").style.fontSize = "x-large";
}

/* χρήση του Date */

/* Κάθε μέρα αλλάζει το font family του τίτλου των ιστοσελίδων */
function allDayEveryDay(){
    var d = new Date();
    var n = d.getDay();
    if (n == 0){
        document.querySelector("h1").style.fontFamily = "Arial";
    }else if (n == 1){
        document.querySelector("h1").style.fontFamily = "Sans";
    }else if (n == 2){
        document.querySelector("h1").style.fontFamily = "Courier New";
    }else if (n == 3){
        document.querySelector("h1").style.fontFamily = "Lucida Console";
    }else if (n == 4){
        document.querySelector("h1").style.fontFamily = "Verdana";
    }else if (n == 5){
        document.querySelector("h1").style.fontFamily = "Georgia";
    }else if (n == 6){
        document.querySelector("h1").style.fontFamily = "Garamond";
    }
}


allDayEveryDay();