document.addEventListener("deviceready", function(){
//    navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity, currentlocationerror, { timeout: 30000 });
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    
}, false);
