/**
 * MYCLIENT.JS
 * an example of a JSON request - an ajax request which returns a JSON object
 *
 * When a user browses to http://localhost:3000, index.html is loaded, which then
 * loads and executes this code
 */

window.onload = function () {
  var url, i;

  for (i = 0; i < 5; i++) {
    url = document.URL + 'songs/' + i;
    console.log("URL is: "+url);
    $.getJSON(url, function (data) {
      console.log('API response received');
<<<<<<< HEAD
      console.log(data);
      $('#songs').append('<p>Link to Track on Spotify: ' + "<a href =" + data.track_href + ">"+ data.track_href + "</a>" + '<br> Danceability: ' + data.danceability + '<br> Heart Rate: '+ data.heart_rate + '<br> Time: '+ data.time + '</p>' );
=======
      $('#songs').append('<p>Link to Track on Spotify: ' +
      "<a href =" + data.track_href + ">"+ data.track_href + "</a>" +
      '<br> Heartrate BPM History: '+ data.heart_rate +
      '<br> Initial BPM: ' + data.init_heart_rate +
      '<br> Total Samples: '+ data.total_samples +
      '</p>');
>>>>>>> 226cb8f08ec70336f3574a47945b94b57e6767ea
    });
  }
};
