function getURL(theUrl, extraParameters) {
  var extraParametersEncoded = $.param(extraParameters);
  var seperator = theUrl.indexOf('?') == -1 ? "?" : "&";

  return(theUrl + seperator + extraParametersEncoded);
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function css(a) {
  var sheets = document.styleSheets, o = {};
  for (var i in sheets) {
    var rules = sheets[i].rules || sheets[i].cssRules;
    for (var r in rules) {
      if (a.is(rules[r].selectorText)) {
        o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
      }
    }
  }
  return o;
}

function css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
        for (var i in css) {
            if ((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } else if (typeof css == "string") {
        css = css.split("; ");
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        }
    }
    return s;
}

$.fn.cssClone = function (source) {
  $(this).css(css(source));
  $(this).css({
    width: source.outerWidth(),
    height: source.outerHeight(),
    padding: source.css("padding"),
    margin: source.css("margin")
  });
}

$.fn.forceRatio = function (ratio, byWidth) {
  if (byWidth == true) {
    return this.each( function () {
      var cw = ($(this).width())/ratio;
      $(this).css({'height':cw+'px'});
    });
  } else {
    return this.each( function () {
      var ch = ($(this).height())/ratio;
      $(this).css({'width':ch+'px'});
    });
  }
}

// Disable scroll and keep position
var toggleScroll = function () {
  $("body").css({
    overflow: function (index, value) {
      return ((value == "hidden") ? "visible" : "hidden");
    }
  });
}

// Vertical staggered list
showStaggeredListVert = function(selector, dur, interval) {
  var time = 0;
  $(selector).find('li').velocity(
      { translateY: "30px"},
      { duration: 0 });

  $(selector).find('li').each(function() {
    $(this).velocity(
      { opacity: "1", translateY: "0"},
      { duration: dur, delay: time, easing: [60, 10] });
    time += interval;
  });
}

// Custom direction staggered list
showStaggeredListCustom = function(selector, xOffset, yOffset, dur, interval) {
  var time = 0;
  $(selector).find('li').velocity(
      { translateY: yOffset+"px", translateX: xOffset+"px"},
      { duration: 0 });

  if (xOffset < 0 || yOffset < 0) {
    $(selector).find('li').each(function() {
      $(this).velocity(
        { opacity: "1", translateY: "0", translateX: "0"},
        { duration: dur, delay: time, easing: [60, 10] });
      time += interval;
    });
  } else {
    $(selector).find('li').reverse().each(function() {
      $(this).velocity(
        { opacity: "1", translateY: "0", translateX: "0"},
        { duration: dur, delay: time, easing: [60, 10] });
      time += interval;
    });
  }
}

// Show Hide Nav Bar Effect
showHideNavBar = function (height, threshold) {
  var previousTop = 0;
  var previousImmediateTop = 0;
  var goingDown = true;
  $(window).scroll(
    {
      previousTop: 0,
      previousImmediateTop: 0,
      goingDown: true
    },
    function () {
      var currentTop = $(window).scrollTop();
      var currentPos = $("nav").offset();

      if (currentTop > height) {
        if ($("nav").hasClass("nav-scroll") == false) {
          $("nav").addClass("nav-scroll");
          $("nav").removeClass("transparent");
          $("nav").removeClass("shadowless");
        }

        if (currentTop < previousImmediateTop && goingDown == true) {
          goingDown = false;
          previousTop = currentTop;
        } else if (currentTop > previousImmediateTop && goingDown == false) {
          goingDown = true;
          previousTop = currentTop;
        }

        if (goingDown == false && currentTop < previousTop-threshold && currentPos.top-currentTop == -height) {
          $("nav").velocity({top: "0px"});
          previousTop = currentTop;
        } else if (currentTop-threshold > previousTop && currentPos.top-currentTop == 0) {
          $("nav").velocity({top: "-"+height.toString()+"px"});
          previousTop = currentTop;
        }
        previousImmediateTop = currentTop;
      } else {
        if ($("nav").hasClass("nav-scroll") == true) {
          $("nav").velocity({top: "0px"});
          $("nav").removeClass("nav-scroll");
          $("nav").addClass("transparent");
          $("nav").addClass("shadowless");
        }
      }
    }
  );
};

// Dynamic Cover Background Image Cover
$.fn.imgbgcover = function () {
  this.each( function () {
    var bgimg = $(this).find("img.img-bg");
    var imgsrc = bgimg.attr("src");
    bgimg.css({height: 0, width: 0});
    $(this).css("background-image", "url('"+imgsrc+"')");
    $(this).css("background-size", "cover");
  });
};

// Link Circle Effect
$.fn.circularTransitionButton = function() {
  $(this).each( function () {
    var color = $(this).attr("trans-color");
    color = (color ? color : "#cfd8dc");
    var url = $(this).attr("href");
    if (url != "#") {
      $(this).removeAttr("href");
      $(this).css("cursor", "pointer");
      $(this).click( function () {
        var zIndex = $(this).css("z-index");
        var pos = $(this).offset();
        var wx = $(window).width()/2;
        var wy = $(window).height()/2;
        var cx = pos.left + $(this).outerWidth()/2;
        var cy = pos.top + $(this).outerHeight()/2;
        var width = 0;
        var height = 0;
        var sx = cx-width/2;
        var sy = cy-height/2;
        var d = Math.max($(window).width(), $(window).height());
        var l = Math.sqrt(Math.pow(d, 2)*2)+Math.max(Math.abs(cx-wx), Math.abs(cy-wy));
        var ex = cx-l/2;
        var ey = cy-l/2;
        var originalBtn = $(this);
        var cloneBtn = $(this).clone();
        console.log(css($(this)));
        cloneBtn.cssClone($(this));
        cloneBtn.css({
          position: "absolute",
          left: pos.left,
          top: pos.top,
          zIndex: 9999
        }).prependTo("body");
        $("body").prepend("<div id='circularTransitionDiv' style='position: absolute; left: "+sx+"px; top: "+sy+"px; width: "+width+"px; height: "+height+"px; background-color: "+color+"; display: table; z-index: 9998;' class='circle'></div>");
        toggleScroll();
        $("#circularTransitionDiv").animate({width: l, height: l, left: ex, top: ey}, {duration: 500, complete: function () {
          cloneBtn.animate({opacity: 0}, {complete: function() {
            window.location.replace(getURL(url, {"cTBtn":color}));
          }});
        }});
      });
    }
  });
};

var circularTransitionButtonInit = function (colorDefault) {
  var $_GET = getQueryParams(document.location.search);
  var d = Math.max($(window).width(), $(window).height());
  var sy = $(window).height()/2;
  var sx = $(window).width()/2;
  var l = Math.sqrt(Math.pow(d, 2)*2);
  var ex = sx-l/2;
  var ey = sy-l/2;
  toggleScroll();
  var preloaderHTML = '<div style="position: absolute; z-index: 9999; left: '+(sx-32)+'px; top: '+(sy-32)+'px;" id="page-preloader" class="preloader-wrapper big active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';
  if ('cTBtn' in $_GET) {
    var color = $_GET.cTBtn;
    $("body").prepend("<div id='circularTransitionDiv' style='position: absolute; left: "+ex+"px; top: "+ey+"px; width: "+l+"px; height: "+l+"px; background-color: "+color+"; display: table; z-index: 9998;' class='circle'></div>");
    $("body").prepend(preloaderHTML);
    $(window).ready(function(){
      $("#page-preloader").animate({opacity: 0}, {complete: function () {
        $(this).remove();
        toggleScroll();
      }});
      $("#circularTransitionDiv").animate({width: 0, height: 0, left: sx, top: sy}, {durarion: 1000, complete: function () {
        this.remove();
      }});
      $("body").children().not("#page-preloader").animate({opacity: 1});
    });
  } else {
    var color = (colorDefault ? colorDefault : "white");
    $("body").prepend("<div id='transitionDiv' style='position: absolute; left: "+ex+"px; top: "+ey+"px; width: "+l+"px; height: "+l+"px; background-color: "+color+"; display: table; z-index: 9998;'></div>");
    $("body").prepend(preloaderHTML);
    $(window).ready(function(){
      $("#page-preloader").animate({opacity: 0}, {complete: function () {
        $(this).remove();
        $("#transitionDiv").animate({opacity: 0}, {complete: function () {
          $(this).remove();
        }});
        toggleScroll();
      }});
    });
  }
}

// Custom SideNav Bar
$.fn.sideNavPush = function (bodyOutClass, sideMenuOutClass) {
  var target_id = this.attr("data-activates")
  this.click( function () {
    $("body").toggleClass(bodyOutClass);
    $("#"+target_id).toggleClass(sideMenuOutClass);

    if ($('#sideNavBodyPushOverlay').length == 0) {

      $("body").prepend("<div id='sideNavBodyPushOverlay' style='position: absolute; left: 0; top: 0; background: rgba(0,0,0,0.5); height: 100%; width: 100%; z-index: 97; display: block;'>&nbsp;</div>");

    } else {

      $('#sideNavBodyPushOverlay').remove();

    }

    $('#sideNavBodyPushOverlay').click( function () {
      $("body").toggleClass(bodyOutClass, 400);
      $("#"+target_id).toggleClass(sideMenuOutClass);
      this.remove();
      $("nav").hide(0).show(400);
    });

    $("nav").hide(0).show(400);

  });
}

$.fn.sliderfooter = function (options) {
  var defaults = {
    indicators: true,
    height: 400,
    transition: 500,
    interval: 60000
  }
  options = $.extend(defaults, options);

  return this.each(function() {

    // For each slider, we want to keep track of
    // which slide is active and its associated content
    var $this = $(this);
    var $slider = $this.find('ul.slides').first();
    var $slides = $slider.find('li');
    var $active_index = $slider.find('.active').index();
    var $active;
    if ($active_index != -1) { $active = $slides.eq($active_index); }

    // Transitions the caption depending on alignment
    function captionTransition(caption, duration) {
      if (caption.hasClass("center-align")) {
        caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
      }
      else if (caption.hasClass("right-align")) {
        caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
      }
      else if (caption.hasClass("left-align")) {
        caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
      }
      else if (caption.hasClass("left-to-right")) {
        caption.velocity({opacity: 0, translateX: 100}, {duration: duration}).velocity({opacity: 0, translateX: -100}, {duration: duration});
      }
    }

    // This function will transition the slide to any index of the next slide
    function moveToSlide(index) {
      if (index >= $slides.length) index = 0;
      else if (index < 0) index = $slides.length -1;

      $active_index = $slider.find('.active').index();

      // Only do if index changes
      if ($active_index != index) {
        $active = $slides.eq($active_index);
        $caption = $active.find('.caption');

        $active.removeClass('active');
        $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
                          complete: function() {
                            $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
                          } });
        captionTransition($caption, options.transition);


        // Update indicators
        if (options.indicators) {
          $indicators.eq($active_index).removeClass('active');
        }

        $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
        $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
        $slides.eq(index).addClass('active');


        // Update indicators
        if (options.indicators) {
          $indicators.eq(index).addClass('active');
        }
      }
    }

    // Set height of slider
    if (options.height != 400) {
      $this.height(options.height + 40);
      $slider.height(options.height);
    }

    // Set initial positions of captions
    $slides.find('.caption').each(function () {
      captionTransition($(this), 0);
    });

    // Move img src into background-image
    // $slides.find('img').each(function () {
    //   $(this).css('background-image', 'url(' + $(this).attr('src') + ')' );
    //   $(this).attr('src', 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    // });

    // dynamically add indicators
    if (options.indicators) {
      var $indicators = $('<ul class="indicators"></ul>');
      $slides.each(function( index ) {
        var $indicator = $('<li class="indicator-item"></li>');

        // Handle clicks on indicators
        $indicator.click(function () {
          var $parent = $slider.parent();
          var curr_index = $parent.find($(this)).index();
          moveToSlide(curr_index);

          // reset interval
          clearInterval($interval);
          $interval = setInterval(
            function(){
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);

            }, options.transition + options.interval
          );
        });
        $indicators.append($indicator);
      });
      $this.append($indicators);
      $indicators = $this.find('ul.indicators').find('li.indicator-item');
    }

    if ($active) {
      $active.show();
    }
    else {
      $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
      $slides.first().find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});

      $active_index = 0;
      $active = $slides.eq($active_index);

      // Update indicators
      if (options.indicators) {
        $indicators.eq($active_index).addClass('active');
      }
    }

    // Adjust height to current slide
    $active.find('img').each(function() {
      $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
    });

    // auto scroll
    $interval = setInterval(
      function(){
        $active_index = $slider.find('.active').index();
        moveToSlide($active_index + 1);

      }, options.transition + options.interval
    );


    // HammerJS, Swipe navigation

    // Touch Event
    var panning = false;
    var swipeLeft = false;
    var swipeRight = false;

    $this.hammer({
        prevent_default: false
    }).bind('pan', function(e) {
      if (e.gesture.pointerType === "touch") {

        // reset interval
        clearInterval($interval);

        var direction = e.gesture.direction;
        var x = e.gesture.deltaX;
        var velocityX = e.gesture.velocityX;

        $curr_slide = $slider.find('.active');
        $curr_slide.velocity({ translateX: x
            }, {duration: 50, queue: false, easing: 'easeOutQuad'});

        // Swipe Left
        if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
          swipeRight = true;
        }
        // Swipe Right
        else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
          swipeLeft = true;
        }

        // Make Slide Behind active slide visible
        var next_slide;
        if (swipeLeft) {
          next_slide = $curr_slide.next();
          if (next_slide.length === 0) {
            next_slide = $slides.first();
          }
          next_slide.velocity({ opacity: 1
              }, {duration: 300, queue: false, easing: 'easeOutQuad'});
        }
        if (swipeRight) {
          next_slide = $curr_slide.prev();
          if (next_slide.length === 0) {
            next_slide = $slides.last();
          }
          next_slide.velocity({ opacity: 1
              }, {duration: 300, queue: false, easing: 'easeOutQuad'});
        }


      }

    }).bind('panend', function(e) {
      if (e.gesture.pointerType === "touch") {

        $curr_slide = $slider.find('.active');
        panning = false;
        curr_index = $slider.find('.active').index();

        if (!swipeRight && !swipeLeft) {
          // Return to original spot
          $curr_slide.velocity({ translateX: 0
              }, {duration: 300, queue: false, easing: 'easeOutQuad'});
        }
        else if (swipeLeft) {
          moveToSlide(curr_index + 1);
          $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                complete: function() {
                                  $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                } });
        }
        else if (swipeRight) {
          moveToSlide(curr_index - 1);
          $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                complete: function() {
                                  $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                } });
        }
        swipeLeft = false;
        swipeRight = false;

        // Restart interval
        clearInterval($interval);
        $interval = setInterval(
          function(){
            $active_index = $slider.find('.active').index();
            if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
            else $active_index += 1;

            moveToSlide($active_index);

          }, options.transition + options.interval
        );
      }
    });

  });
};

(function ($) {

  var methods = {
    init : function(trans) {
      trans = typeof trans !== 'undefined' ? trans : 500;
      return this.each(function() {

      // For each set of tabs, we want to keep track of
      // which tab is active and its associated content
      var $this = $(this),
          window_width = $(window).width();

      $this.width('100%');
      // Set Tab Width for each tab
      var $num_tabs = $(this).children('li').length;
      $this.children('li').each(function() {
        $(this).width((100/$num_tabs)+'%');
      });
      var $active, $content, $links = $this.find('li.tab a'),
          $tabs_width = $this.width(),
          $tab_width = $this.find('li').first().outerWidth(),
          $index = 0;

      // If the location.hash matches one of the links, use that as the active tab.
      $active = $($links.filter('[href="'+location.hash+'"]'));

      // If no match is found, use the first link or any with class 'active' as the initial active tab.
      if ($active.length === 0) {
          $active = $(this).find('li.tab a.active').first();
      }
      if ($active.length === 0) {
        $active = $(this).find('li.tab a').first();
      }

      $active.addClass('active');
      $index = $links.index($active);
      if ($index < 0) {
        $index = 0;
      }

      $content = $($active[0].hash);

      // append indicator then set indicator width to tab width
      $this.append('<div class="indicator"></div>');
      var $indicator = $this.find('.indicator');
      if ($this.is(":visible")) {
        $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
        $indicator.css({"left": $index * $tab_width});
      }
      $(window).resize(function () {
        $tabs_width = $this.width();
        $tab_width = $this.find('li').first().outerWidth();
        if ($index < 0) {
          $index = 0;
        }
        if ($tab_width !== 0 && $tabs_width !== 0) {
          $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
          $indicator.css({"left": $index * $tab_width});
        }
      });

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });


      // Bind the click event handler
      $this.on('click', 'a', function(e){
        $tabs_width = $this.width();
        $tab_width = $this.find('li').first().outerWidth();

        // Make the old tab inactive.
        $active.removeClass('active');
        $content.hide(trans);

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);
        $links = $this.find('li.tab a');

        // Make the tab active.
        $active.addClass('active');
        var $prev_index = $index;
        $index = $links.index($(this));
        if ($index < 0) {
          $index = 0;
        }
        // Change url to current tab
        // window.location.hash = $active.attr('href');

        $content.show(trans);
        console.log(trans);

        // Update indicator
        if (($index - $prev_index) >= 0) {
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, { duration: 300, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});

        }
        else {
          $indicator.velocity({"left": $index * $tab_width}, { duration: 300, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
        }

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });

    },
    select_tab : function( id ) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };

  $.fn.tabsPaul = function(methodOrOptions) {
    console.log(methodOrOptions);
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      console.log(arguments);
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
    }
  };

  // $(document).ready(function(){
  //   //$('ul.tabs').tabsPaul();
  //   $('ul.tabs').tabsPaul();
  // });
}( jQuery ));
