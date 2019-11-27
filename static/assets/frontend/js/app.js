var quantum = (function() {

  function init() {

    //Initialize all neccessary script
    initBootstrap();    
    initGlobalEvents();
    initTouchEvents();
    initPlugin();
    initPreloading();
  }

  function initBootstrap()  {
    // Enable Tooltip //
    $('.tooltip-default').tooltip({
      container: 'body'
    });

    $('.tooltip-gray').tooltip({
      container: 'body',
      template: '<div class="tooltip tooltip-gray" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
    });

    $('.tooltip-primary').tooltip({
      container: 'body',
      template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
    });

    $('.tooltip-success').tooltip({
      container: 'body',
      template: '<div class="tooltip tooltip-success" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
    });

    $('.tooltip-danger').tooltip({
      container: 'body',
      template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' 
    });

    // Enable Popover //
    $('[data-toggle="popover"]').popover();

    // Animated Dropdown //
    $('.dropdown-hover').hover(function() {
      $(this).find('.dropdown-menu').dropdown('toggle');
    }).click(function(e) {
      e.stopPropagation();
    });

    $('.dropdown, .btn-group').on('show.bs.dropdown', function () {
      var $this = $(this);
      $this.children('.dropdown-animated').removeClass('closed');
      $this.children('.dropdown-animated').addClass('opened');
    }).on('hide.bs.dropdown', function () {
      var $this = $(this);
      $this.children('.dropdown-animated').removeClass('opened');
      $this.children('.dropdown-animated').addClass('closed');
    });

    // Clickable Dropdown //
    $('.clickable-dropdown').click(function(e)  {
      e.stopPropagation();
    });
  }

  function initGlobalEvents() {
    $(window).scroll(function(){
      var position = $(window).scrollTop();
      //Display a scroll to top button
      if(position >= 20)  {
        $('.top-nav').addClass('top-nav-scrolled');
        //$('#scroll-to-top').attr('style','bottom:8px;');  
      }
      else  {
        $('.top-nav').removeClass('top-nav-scrolled');
        //$('#scroll-to-top').removeAttr('style');
      }
    });

    $('#scrolledNav').localScroll({
      duration:800,
      offset: -80
    });

    // Adding class for hover effect
    $('.hover-element').hover(
      function()  {  
        $(this).addClass('hover-effect');
      },
      function()  { 
        $(this).removeClass('hover-effect');
      }
    )
  }

  function initTouchEvents() {
    //Touch Device Only//////////////////
    if(!!('ontouchstart' in window))  { //check for touch device
      
    }
  }

  function initPlugin() {
    
  }

  function initPreloading() {
    //Preloading animation, remove class animsition to disable it
    if($('.wrapper').hasClass('animsition'))  {
      $(".animsition").animsition({
        inClass               :   'fade-in',
        outClass              :   'fade-out',
        inDuration            :    1500,
        outDuration           :    800,
        linkElement           :   '.animsition-link',
        // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
        loading               :    true,
        loadingParentElement  :   'body', //animsition wrapper element
        loadingClass          :   'animsition-loading',
        unSupportCss          : [ 'animation-duration',
                                  '-webkit-animation-duration',
                                  '-o-animation-duration'
                                ],
        overlay               :   false,
        overlayClass          :   'animsition-overlay-slide',
        overlayParentElement  :   'body'
      });
    }
  }

  init();

  return { 
    init : init
  };
})();