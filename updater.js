function pullLS(field, value) {
    if (field.children("input").val() != value) {
        field.children("input").val(value);
    }
}
function pushLS(field, key, data) {
    data[key] = field.children("input").val();
}

$(document).ready(function() {
    $.ajax({
        cache: false
    });
    $.get("streaminfo.json", "", receiveAll, "json");
    $("#submit").click(function() {
        let data = {};
        // Global information
        pushLS($("#title"), "title", data);
        pushLS($("#casters"), "casters", data);
        pushLS($("#next-song"), "nextsong", data);
        // Song information
        data["song"] = {};
        for (let key of ["title", "artist", "bpm", "mapper"]) {
            pushLS($("#song-" + key), key, data["song"]);
        }
        // Stream information
        for (let side of ["left", "right"]) {
            data[side] = {};
            pushLS($("#streamer-" + side), "streamer", data[side]);
            pushLS($("#player-" + side), "stream", data[side]);
            pushLS($("#score-" + side), "score", data[side]);
            for (let i = 1; i <= 3; i++) {
                if (data[side]["score"] >= i) {
                    $(".points." + side + " > .point:nth-child(" + i + ")").addClass("on");
                } else {
                    $(".points." + side + " > .point:nth-child(" + i + ")").removeClass("on");
                }
            }
        }
        // Write to file
        $.post("saveinfo.php", { data: JSON.stringify(data) }, function() {
            $.get("streaminfo.json", "", receiveAll, "json");
        }, "text");
    });
});

function receiveAll(data) {
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
        pullLS($("#player-" + side), data[side]["stream"]);
        pullLS($("#score-" + side), data[side]["score"]);
        for (let i = 1; i <= 3; i++) {
            if (data[side]["score"] >= i) {
                $(".points." + side + " > .point:nth-child(" + i + ")").addClass("on");
            } else {
                $(".points." + side + " > .point:nth-child(" + i + ")").removeClass("on");
            }
        }
    }
}