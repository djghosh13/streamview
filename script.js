var currentStream = {
    "left": "",
    "right": ""
};

function pullLS(field, value) {
    if (field.html() != value) {
        field.html(value);
    }
}

function lsread(key) {
    return localStorage.getItem("cvre_overlay_" + key);
}

$(document).ready(function() {
    setInterval(updateAll, 2000);
});

function updateAll() {
    let data = localStorage.getItem("cvre_overlay");
    if (data === null) return;
    // Global information
    pullLS($("#title"), lsread("title"));
    pullLS($("#casters"), lsread("casters"));
    pullLS($("#next-song"), lsread("nextsong"));
    // Song information
    for (let key of ["title", "artist", "bpm", "mapper"]) {
        pullLS($("#song-" + key), lsread("song_" + key));
    }
    // Stream information
    for (let side of ["left", "right"]) {
        pullLS($("#streamer-" + side), lsread(side + "_streamer"));
        // TODO: Something with stream url
        if (currentStream[side] != lsread(side + "_stream")) {
            currentStream[side] = lsread(side + "_stream");
            $("#player-" + side).attr("src",
                "https://player.twitch.tv/?muted=true&autoplay=true&channel=" + lsread(side + "_stream")
            );
        }
        pullLS($("#score-" + side), lsread(side + "_score"));
        for (let i = 1; i <= 3; i++) {
            if (lsread(side + "_score") >= i) {
                $(".points." + side + " > .point:nth-child(" + i + ")").addClass("on");
            } else {
                $(".points." + side + " > .point:nth-child(" + i + ")").removeClass("on");
            }
        }
    }
}