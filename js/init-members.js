$( document ).ready(function(){

  $(".button-collapse").sideNav();

  $('select').material_select();

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on click
      alignment: 'right',
      gutter: 0,
    }
  );

  $(document).ready(function(){
    $('.modal-trigger').leanModal();
  });

})
