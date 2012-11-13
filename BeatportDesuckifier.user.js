// ==UserScript==
// @name                Beatport Desuckifier
// @namespace	        lowfrequencyresearch
// @description	        Adds "queue release" link to my track beatport results
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include		http://www.beatport.com/my-beatport*
// ==/UserScript==


$.noConflict();
jQuery(document).ready(function ($)
{
    $("table.track-grid .colPlay").width('126px');
    $(".track-grid-content.altRow-0.playRow.autoscroll, .track-grid-content.altRow-1.playRow.autoscroll").each(function ()
    {
        $(".tile-image-wrapper > a").length
        var href = $(this).find(".tile-box.border-thin > .tile-image-wrapper > a").attr("href");
        var splits = href.split("/");
        var release = splits[splits.length - 1];
        //deprecated with changes to beatport website March 2012
        // var queueReleaseAnchor = '<a href="http://www.beatport.com' + href + '" data-play="release:' + release + '" class="btn-queue evtQueue jsOnly">queue release</a>';
        var queueReleaseAnchor = '<span class="play-queue"><span class="btn-queue" data-item-id="' + release + '" data-item-type="release" data-player-action="queue" style="height:22px;width:50px;border-radius:20px;line-height:.9;color:white;font-size:11px">queue<br/>release</span></span>';
        var html = $(this).find(".playColumn").html($(this).find(".playColumn").html() + queueReleaseAnchor);
    });
});
