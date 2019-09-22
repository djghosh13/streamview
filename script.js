$(document).ready(function() {
    setInterval($.get, 2000, "streaminfo.json", "", function(data) {
        // Global information
        $("#title").html(data["title"]);
        $("#casters").html(data["casters"]);
        $("#next-song").html(data["nextsong"]);
        // Song information
        for (let key in data["song"]) {
            $("#song-" + key).html(data["song"][key]);
        }
        // Stream information
        for (let side of ["left", "right"]) {
            
        }
    }, "json");
});