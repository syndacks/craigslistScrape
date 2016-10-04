//immediately invoked jQuery function expression (IIFE)
$(function(){

  var source = $("#search-results").html();
  var dataTemplate = Handlebars.compile(source);
  $results = $('#results');

  // When search bar is triggered (event handler), then use the
  // callback function that takes parameter 'e'
  $('#search').on('keyup', function(e){
    //if user hits Enter key
    if(e.keyCode === 13) {
      // set the search value equal to 'parameters',
      // which is an object we pass back to server side
      var parameters = { search: $(this).val() };
      // CALL BACK 2
      // this is the actual AJAX request
      $.get('/searching', parameters, function(data) {
        //test if returned data is array, if so, 'data' is passed to Handlebars
        if(data instanceof Array){
          $results.html(dataTemplate({resultsArray:data}));
        } else {
          $results.html(data);
        };
      });
    };
  });
});

