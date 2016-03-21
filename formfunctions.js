function forminit() {
    formCity = select('#formCity');
    searchform = select('.searchform');
    searchpage = select('.searchpage');
    submitbutton = select('.submitbutton');
    clearbutton = select('.clearbutton');
    
    formCity.mousePressed(enterFormfield);
    clearbutton.mousePressed(clearPressed);
    submitbutton.mousePressed(submitPressed);
}

function enterFormfield() {
    addsearchpage();
}

function clearPressed() {
    formCity.value(null);		
    addsearchpage();
}

function keyPressed(event) {
    if (keyCode === 13) {
        
        if (checkform()){
            reloadCity();            
            document.activeElement.blur();
            removesearchpage();
        } else if (!checkform()) {
            event.preventDefault();
            return false;
        }
    }
}

function submitPressed() {
    if (checkform()) {
            reloadCity();   
            document.activeElement.blur();
            removesearchpage();
    }
}

var searchpagecounter = 0;
var clearbuttoncounter = 0;

function addsearchpage() {
//    setInterval(checkform, 350);
    if(searchpagecounter < 1) {
        searchpage.addClass('searchpage__show');   
        searchpagecounter++;
    }
    if(clearbuttoncounter < 1) {
        clearbutton.addClass('clearbutton__hide');  
        clearbutton.removeClass('clearbutton__show');  
        clearbuttoncounter++;
    }
}
function removesearchpage() {
//    clearInterval(checkform);
    searchpagecounter = 0;
    clearbuttoncounter = 0;
    searchpage.addClass('searchpage__transout');
    setTimeout(removetransout, 150);
    searchpage.removeClass('searchpage__show');
    clearbutton.removeClass('clearbutton__hide');
    clearbutton.addClass('clearbutton__show');
}

function removetransout() {
    searchpage.removeClass('searchpage__transout');
}

function resetForm(form)  {
    form.myButton.disabled = false;
    form.myButton.value = "Submit";
}

function checkform() {
    var a = formCity.value();
    if (a == '') {
        console.log('checkform false');
        return false;
    } else {
        console.log('checkform true');
        return true;
    }
}