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
            let score = data[side]["score"];
            update($("#score-" + side), score);
            for (let i = 0; i < 3; i++) {
                if (score > i) {
                    $(".points." + side + " > .point")[i].addClass("on");
                } else {
                    $(".points." + side + " > .point")[i].removeClass("on");
                }
            }
        }
    }, "json");
});