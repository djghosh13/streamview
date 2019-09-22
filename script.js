$(document).ready(function() {
    setInterval($.get, 2000, "streaminfo.json", "", function(data) {
        console.log(data);
    }, "json");
});