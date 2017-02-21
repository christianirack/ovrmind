var loadDocument = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};
 loadDocument(function(event) {
     date = new Date();
     time = date.getTime();
     //linkcss = document.getElementById("link").getAttribute("_href");
    //document.getElementById("link").setAttribute('href', linkcss);
 });