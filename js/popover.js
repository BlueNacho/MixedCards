/*
 * Se inicializan los activadores de Popover de bootstrap 
*/

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

//Modulos:
//Modulo registro
$( function () {
  $("#username-reg").popover({
    html : true, 
    content: function() {
      return $("#popover-content").html();

    },
    title: function() {
      return $("#popover-title").html();
    }
  });

  $("#passwd-reg").popover({
    
    html : true, 
    content: function() {
      return $("#popover-content-passwd").html();

    },
    title: function() {
      return $("#popover-title-passwd").html();
    }
  });
//Modulo modificacion
  $("#username-mod").popover({
    html : true, 
    content: function() {
      return $("#popover-content-mod").html();

    },
    title: function() {
      return $("#popover-title-mod").html();
    }
  });

  $("#passwd-mod").popover({
    html : true, 
    content: function() {
      return $("#popover-content-passwd-mod").html();

    },
    title: function() {
      return $("#popover-title-passwd-mod").html();
    }
  });

});



