var lastfmData = {
  baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
  user: "MrPgu",
  api_key: atob("OTExY2MxMzFjYTVhOGJiMWI4NjE1NTIzOTE0MDY1Zjc="),
  additional: "&format=json&limit=1"
};


var getSetLastFM = function() {
  $.ajax({
    type: "GET",
    url:
      lastfmData.baseURL +
      lastfmData.user +
      "&api_key=" +
      lastfmData.api_key +
      lastfmData.additional,
    dataType: "json",
    success: function(resp) {
      var recentTrack = resp.recenttracks.track[0];

      // Track title + link
      $("a#tracktitle")
        .text(recentTrack.name)
        .attr("href", recentTrack.url)
        .attr("title", recentTrack.name + " by " + recentTrack.artist["#text"])
        .attr("target", "_blank");

      // Artist name
      $("a#trackartist")
        .text(recentTrack.artist["#text"])
        .attr("title", "Artist: " + recentTrack.artist["#text"]);

      // Album art
      $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
    },
    error: function() {
      $("a#tracktitle").text("error");
      $("img#trackart").attr("src", "");
      $("a#trackartist").text("error");
    }
  });
};

// Get the new one.
getSetLastFM();
// Refresh every 10 seconds
setInterval(getSetLastFM, 10 * 1000);
