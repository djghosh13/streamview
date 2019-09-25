function pullLS(field, value) {
    if (field.children("input").val() != value) {
        field.children("input").val(value);
    }
}
function pushLS(field, key) {
    lswrite(key, field.children("input").val());
}

function lsread(key) {
    return localStorage.getItem("cvre_overlay_" + key);
}
function lswrite(key, value) {
    localStorage.setItem("cvre_overlay_" + key, value);
}

$(document).ready(function() {
    receiveAll();
    $("#submit").click(function() {
        // Global information
        pushLS($("#title"), "title");
        pushLS($("#casters"), "casters");
        pushLS($("#next-song"), "nextsong");
        // Song information
        for (let key of ["title", "artist", "bpm", "mapper"]) {
            pushLS($("#song-" + key), "song_" + key);
        }
        // Stream information
        for (let side of ["left", "right"]) {
            pushLS($("#streamer-" + side), side + "_streamer");
            pushLS($("#player-" + side), side + "_stream");
            pushLS($("#score-" + side), side + "_score");
            for (let i = 1; i <= 3; i++) {
                if (lsread(side + "_score") >= i) {
                    $(".points." + side + " > .point:nth-child(" + i + ")").addClass("on");
                } else {
                    $(".points." + side + " > .point:nth-child(" + i + ")").removeClass("on");
                }
            }
        }
    });
});

function receiveAll() {
    let data = localStorage.getItem("cvre_overlay");
    if (data === null) activateLocalStorage();
    // Global information
    pullLS($("#title"), lsread("title"));
    pullLS($("#casters"), lsread("casters"));
    pullLS($("#next-song"), lsread("nextsong"));
    // Song information
    for (let key of ["artist", "bpm", "mapper"]) {
        pullLS($("#song-" + key), lsread("song_" + key));
    }
    // Stream information
    for (let side of ["left", "right"]) {
        pullLS($("#streamer-" + side), lsread(side + "_streamer"));
        pullLS($("#player-" + side), lsread(side + "_stream"));
        pullLS($("#score-" + side), lsread(side + "_score"));

        let npoints = parseInt(lsread("ntowin"));
        $(".points." + side).html("");
        for (let i = 0; i <= npoints; i++) {
            let point = document.createElement("div");
            point.classList.add("point");
            if (i < npoints) {
                point.classList.add("on");
            }
            $(point).click(changeNToWin);
            $(".points." + side).append(point);
        }
    }
}

function changeNToWin() {
    if ($(this).hasClass("on")) {
        lswrite("ntowin", Math.max(parseInt(lsread("ntowin")) - 1, 0));
    } else {
        lswrite("ntowin", parseInt(lsread("ntowin")) + 1);
    }
    $("#submit").click();
    receiveAll();
}

function activateLocalStorage() {
    localStorage.setItem("cvre_overlay", "active");
    lswrite("title", "");
    lswrite("casters", "");
    lswrite("nextsong", "");
    lswrite("ntowin", 0);
    for (let key of ["artist", "bpm", "mapper"]) {
        lswrite("song_" + key, "");
    }
    for (let side of ["left", "right"]) {
        lswrite(side + "_streamer", "");
        lswrite(side + "_stream", "");
        lswrite(side + "_score", 0);
    }
}

function deactivateLocalStorage() {
    localStorage.removeItem("cvre_overlay");
}