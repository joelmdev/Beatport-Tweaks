// ==UserScript==
// @name        Beatport Desuckifier Pro
// @namespace   lowfrequencyresearch
// @description	        Adds a "queue all tracks from all releases" button to the top of My Beatport
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @include     https://pro.beatport.com/my-beatport*
// @grant       none
// ==/UserScript==
$.noConflict();
(function($) {
    console.log("getting started!");
    window.traxx;
    while (!window.traxx) {
        window.traxx = window.Playables.tracks;
    }
    console.log("got them traxx!");
    window.traxx.attributes = [];
    var lastReleaseId;
    window.releaseTracks = "data-tracks='";
    window.traxx.forEach(function(track) {
        if (lastReleaseId != track.release.id) {
            lastReleaseId = track.release.id;
            console.log(lastReleaseId);
            $.ajax({
                type: 'GET',
                url: "/api/releases/" + lastReleaseId + "/tracks",
                dataType: 'json',
                success: function(release) {
                    release.tracks.forEach(function(track) {
                        console.log(track.id);
                        window.releaseTracks += (track.id + ",");
                        window.traxx.attributes[track.id] = track;
                    });
                },
                error: function(data) { alert("Fail!   " + JSON.stringify(data)); },
                data: {},
                async: false
            });
        }
    });
    window.releaseTracks += "'";
    console.log(window.releaseTracks);
    
        var interval = setInterval(function() {
            console.log("not yet");
            if (typeof window.Beatport !== 'undefined' &&
                typeof window.Beatport.Player !== 'undefined' &&
                typeof window.Beatport.Player.playableRegistry !== 'undefined' &&
                typeof window.Beatport.Player.playableRegistry.attributes !== 'undefined') {
                console.log("in thar!");
                window.Beatport.Player.playableRegistry.attributes = window.traxx.attributes;
                $(".bucket.tracks.standard-interior-tracks").prepend('<a class="icon icon-add-queue playable-queue-all" ' + window.releaseTracks + ' href="#">queue all tracks from all releases</a>');
                console.log("wrapping up!");
                clearInterval(interval);
            }
        }, 250);
})(jQuery);
