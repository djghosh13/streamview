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
            $("#streamer-" + side).html(data[side]["name"]);
            let newSrc = "https://player.twitch.tv/?volume=1&!muted&channel=" + data[side]["stream"];
            if ($("#player-" + side).attr("src") != newSrc) {
                $("#player-" + side).attr("src", newSrc);
            }
            let score = data[side]["score"];
            $("#score-" + side).html(score);
        }
    }, "json");
});