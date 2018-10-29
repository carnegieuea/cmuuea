$(document).ready(function(){
  var p = $('#js-init').attr('p');

  showHideNavBar(96, 5);
  $('.button-collapse').sideNav();
  $(".sideNavPush").sideNavPush("sideMenuOutBody", "sideMenuOut");

  $('.slider').sliderfooter({height: 100, interval: 2000, transition: 1000});

  $('.parallax').parallax();

  $(".img-bg-cover").imgbgcover();

  $(".circle-trans-link").circularTransitionButton();

  $(".force-square-by-width").forceRatio(1, true);

  switch (p) {
    case "home":
      showStaggeredListVert('#herolist', 1600, 480);
      showStaggeredListVert('#newslist', 1000, 180);
      $(".img-bg-cover").imgbgcover();
      $("#signup-button").circularTransitionButton();
      $("#more-news").circularTransitionButton();
      break;

    case "about":
      showStaggeredListVert('#herolist', 1600, 480);
      showStaggeredListVert('#aboutlist', 1000, 180);
      var options = [
        {selector: '#leaderslist', offset: 100, callback: 'showStaggeredList("#leaderslist")' },
        {selector: '#profilepiclist', offset: 100, callback: 'showStaggeredList("#profilepiclist")' }
      ];
      scrollFire(options);
      break;

    case "profile":
      //$('ul.tabs').tabsPaul('init', 0);
      break;

    case "partners":
      showStaggeredListVert('#herolist', 1600, 480);
      showStaggeredListVert('#aboutlist', 1000, 180);
      var options = [
        {selector: '#partner1', offset: 200, callback: 'showStaggeredListCustom("#partner1", -100, 0, 1000, 180)' },
        {selector: '#partner2', offset: 200, callback: 'showStaggeredListCustom("#partner2", 100, 0, 1000, 180)' },
        {selector: '#partner3', offset: 200, callback: 'showStaggeredListCustom("#partner3", -100, 0, 1000, 180)' }
      ];
      console.log(options);
      scrollFire(options);
      break;

    default:
      showStaggeredListVert('#herolist', 1600, 480);
      break;
  }
});
