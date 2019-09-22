var currentStream = {
    "left": "",
    "right": ""
};

function update(field, value) {
    if (field.html() != value) {
        field.html(value);
    }
}

$(document).ready(function() {
    $.ajax({
        cache: false
    });
    setInterval($.get, 2000, "streaminfo.json", { dummy: Math.random() }, function(data) {
        // Global information
        update($("#title"), data["title"]);
        update($("#casters"), data["casters"]);
        update($("#next-song"), data["nextsong"]);
        // Song information
        for (let key in data["song"]) {
            update($("#song-" + key), data["song"][key]);
        }
        // Stream information
        for (let side of ["left", "right"]) {
            update($("#streamer-" + side), data[side]["name"]);
            if (currentStream[side] != data[side]["stream"]) {
                currentStream[side] = data[side]["stream"];
                $("#player-" + side).attr("src",
                    "https://player.twitch.tv/?volume=1&!muted&channel=" + data[side]["stream"]
                );
            }
            update($("#score-" + side), data[side]["score"]);
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