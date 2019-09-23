var currentStream = {
    "left": "",
    "right": ""
};

function pullLS(field, value) {
    if (field.html() != value) {
        field.html(value);
    }
}

$(document).ready(function() {
    $.ajax({
        cache: false
    });
    setInterval($.get, 2000, "streaminfo.json", null, function(data) {
        // Global information
        pullLS($("#title"), data["title"]);
        pullLS($("#casters"), data["casters"]);
        pullLS($("#next-song"), data["nextsong"]);
        // Song information
        for (let key in data["song"]) {
            pullLS($("#song-" + key), data["song"][key]);
        }
        // Stream information
        for (let side of ["left", "right"]) {
            pullLS($("#streamer-" + side), data[side]["streamer"]);
            // TODO: Something with stream url
            if (currentStream[side] != data[side]["stream"]) {
                currentStream[side] = data[side]["stream"];
                $("#player-" + side).attr("src",
                    "https://player.twitch.tv/?muted=true&autoplay=true&channel=" + data[side]["stream"]
                );
            }
            pullLS($("#score-" + side), data[side]["score"]);
            for (let i = 1; i <= 3; i++) {
                if (data[side]["score"] >= i) {
                    $(".points." + side + " > .point:nth-child(" + i + ")").addClass("on");
                } else {
                    $(".points." + side + " > .point:nth-child(" + i + ")").removeClass("on");
                }
            }
        }
    }, "json");
});