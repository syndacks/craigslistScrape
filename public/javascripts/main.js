//immediately invoked function expression (IIFE)
$(function(){
	// CALL BACK 1
 $('#search').on('keyup', function(e){
 	//if user hits Enter key
   if(e.keyCode === 13) {
   	// set the search value equal to 'parameters',
   	// which is an object we pass back to server side
     var parameters = { search: $(this).val() };
    	 // CALL BACK 2
    	 //this is the actual AJAX request
       $.get( '/searching',parameters, function(data) {
       $('#results').html(data);
     });
    };
 });
});
