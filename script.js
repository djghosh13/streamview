$(document).ready(function() {
    setInterval($.get, 2000, "streaminfo.json", "", function(data) {
        $("#title").text(data["title"]);
    }, "json");
});