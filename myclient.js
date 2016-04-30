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
    url = document.URL + 'quote/' + i;
    console.log("URL is: "+url);
    $.getJSON(url, function (data) {
      console.log('API response received');
      $('#input').append('<p>Author: ' + data.author + ' Text: ' + data.text + '</p>');
    });
  }
};
