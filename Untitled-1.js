$(document).ready(function() {
    setInterval($.get, 2000, "Untitled-1.json", "", function(data) {
        console.log(data);
    }, "json");
});