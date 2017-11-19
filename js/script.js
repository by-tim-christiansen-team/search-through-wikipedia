$(document).ready(function () {
  $(".search").focus();

  // run ajaxRequest when 'enter' is pressed //
  $(document).keypress(function(event) {

    if (event.keyCode == 13) {
      ajaxRequest($(".search").val())

    }
  })
});
// make ajax request with user input //
function ajaxRequest(keyword) {
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",

    dataType: "JSONP",

    success: function(data) {

      // check for results //
      if (data.query.searchinfo.totalhits > 0) {
        showResult(data);
      }
      // if there are no results: //
      else {
        // show message instead of results //
        $(".container").addClass("resultspage");
        $(".results").append($(".no-results"));
        $(".no-results").css("display", "block");
      }

    },
    // if ajax request fails: //
    error: function() {

      // show error box instead of results //
      $(".container").addClass("resultspage");
      $(".results").append($(".error"));
      $(".error").css("display", "block");

    }
  });

}

function showResult(data) {

  // declare variables //
  var results = data.query.search;
  var toAppend = "";

  // create result-box for each hit //
  for (var i = 0; i < results.length; i++) {
    toAppend += "<a href='https://en.wikipedia.org/wiki/" + results[i].title + "' target='_blank'> <div class='result show'> <h2 class='result-title'>" + results[i].title + "</h2> <p class='description'>" + results[i].snippet + "</p> </div> </a>";
  }

  // show result-page: //
  $(".container").addClass("resultspage");
  // show result-boxes: //
  $(".results").html(toAppend);
  // show the amount of hits: //
  $(".num-res").text(data.query.searchinfo.totalhits + " Hits");

}

// calculate approximate reading time //
function readingTime(words) {
  return words * 0.3;
}
