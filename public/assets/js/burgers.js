$(document).ready (function(){

    $.ajax("/burgers").then(function(data){
  
      var burgers = data.burgers;
      var len = burgers.length;
  
      var burgers_elem = $("#burgers")
      for(var i = 0; i<len; i++){
        burgers_elem.append("<li><p>"+burgers[i].burger_name+"<button data-burgerid='"+burgers[i].id+"' class='devour'>Devour!</button></p></li>")
      }
  
    })
  
    $(document).on("click",".devour", function(event) {
      var id = $(this).data("burgerid");
  
      $.ajax("/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted id ", id);
          location.reload();
        }
      );
    });
  
    $("#addBurger").on("submit", function(event) {
      event.preventDefault();
  
      var newBurger = {
        burger: $("#addBurger [name=burger]").val().trim(),
      };
  
      $.ajax("/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");

          location.reload();
        }
      );
    });
  
    $("#updateBurger").on("submit", function(event) {

      event.preventDefault();
  
      var id = $("#burger_id").val().trim();
  
      var updatedBurger = {
        burger: $("#updateBurger [name=burger]").val().trim(),
      };
  
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: updatedBurger
      }).then(
        function() {
          console.log("updated id ", id);
          location.reload();
        }
      );
    });
  
  })
  