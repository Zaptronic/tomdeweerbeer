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

function keyPressed() {
    if (keyCode === 13 && checkform()){
            reloadCity();            
            document.activeElement.blur();
//            clearbutton.removeClass('clearbutton__hide');
//            clearbutton.addClass('clearbutton__show');
            removesearchpage();
    }
}

function submitPressed() {
    if (checkform()) {
            reloadCity();   
            document.activeElement.blur();
//            clearbutton.removeClass('clearbutton__hide');
//            clearbutton.addClass('clearbutton__show');
            removesearchpage();
    }
}

var searchpagecounter = 0;
var clearbuttoncounter = 0;

function addsearchpage() {
    setInterval(checkform, 350);
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
    clearInterval(checkform);
    searchpagecounter = 0;
    clearbuttoncounter = 0;
    searchpage.removeClass('searchpage__show');
    clearbutton.removeClass('clearbutton__hide');
    clearbutton.addClass('clearbutton__show');
    console.log('check');
}

function resetForm(form)  {
    //resetform ook op key13? nu lijkt er toch een page refresh te komen indien er geen relaod plaatsvindt kan dit?
    
    form.myButton.disabled = false;
    form.myButton.value = "Submit";
}

function checkform() {
    var a = formCity.value();
    if (a == '') {
        console.log('false');
        return false;
    } else {
        console.log('true');
        return true;
    }
}