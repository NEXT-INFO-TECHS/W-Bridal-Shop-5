(function(jQuery) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if(jQuery('.preloader').length){
			jQuery('.preloader').delay(200).fadeOut(500);
		}
	}

	jQuery('.lazy').lazy();

	initBg();
    setHeight();


    jQuery('.main-menu ul li li').each(function() {
        if (jQuery(this).find('.sub-menu').length) {
            jQuery(this).children('a').append('<span class="drop-nav-arrow"></span>')
        }
    });

    jQuery("#nav-mobile").click(function(){
    	jQuery(this).toggleClass("is-active");
  	});
  	jQuery("#menu-icon").click(function(){
    	jQuery(this).toggleClass("is-active");
  	});
  	jQuery(".sidenav-menu-icon").click(function(){
    	jQuery(this).toggleClass("is-active");
    	jQuery('body').toggleClass("sidenav-open");
  	});
  	jQuery(".close-sidenav").click(function(){
    	jQuery('.sidenav-menu-icon').toggleClass("is-active");
    	jQuery('body').toggleClass("sidenav-open");
  	});



	//Update Header Style and Scroll to Top
	function headerStyle() {
		if(jQuery('.main-header').length){
			var windowpos = jQuery(window).scrollTop();
			var siteHeader = jQuery('.main-header');
			var scrollLink = jQuery('.scroll-to-top');
			var sticky_header = jQuery('.main-header');
			if (windowpos > 1) {
				siteHeader.addClass('fixed-header animated slideInDown');
			} else{
				siteHeader.removeClass('fixed-header animated slideInDown');
			}
			if (windowpos > 500) {
				scrollLink.fadeIn(300);
			} else{
				scrollLink.fadeOut(300);
			}
		}
	}
	headerStyle();

	// hide sidenav header when scroll window
	jQuery(function(){
		 var lastScrollTop = 0, delta = 5;
		 jQuery(window).scroll(function(){
			 var nowScrollTop = jQuery(this).scrollTop();
			 if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
			 	if (nowScrollTop > lastScrollTop){
			 		jQuery('body').removeClass("sidenav-open");
					jQuery('.sidenav-menu-icon').removeClass("is-active");
			 	} else {
			 		jQuery('body').removeClass("sidenav-open");
					jQuery('.sidenav-menu-icon').removeClass("is-active");
				}
			 lastScrollTop = nowScrollTop;
			 }
		 });
	 });

	// Initialize scrollbar
     jQuery(".sidenav").mCustomScrollbar({
        theme: "minimal"
     });


	// Mobile Navigation
	if(jQuery('#nav-mobile').length){
		jQuery(function (jQuery) {
		  var jQuerynavbar = jQuery('#navbar');
		  var jQuerymobileNav = jQuery('#nav-mobile');
		  
		  jQuerynavbar
		    .clone()
		    .removeClass('navbar')
		    .appendTo(jQuerymobileNav);
		  
		  jQuerymobileNav.mmenu({
		  	"counters": false,
		  	extensions 	: [ "position-bottom", "fullscreen", "theme-black", ],
		    offCanvas: {
		      position: 'left',
		      zposition: 'front',
		    }
		  });
		});
	}

	jQuery('.minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	jQuery('.plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

	// payment mode
	woocs_init_payment_meth();
            
    function woocs_init_payment_meth() {
        jQuery('ul.wc_payment_methods li input').on('click', function (e) {
            var $input = $('.wc_payment_method input');   // caching our input 

		    $input.filter(':checked').parent().addClass("is-checked");  // filtering out the checked one and adding .is-active to the parten li on inital page load/refresh

		    $input.on('change', function () { // removing and adding our .is-active whnever there is a change
		        $input.parent().removeClass('is-checked');
		        $(this).parent().addClass('is-checked');
		    });     
        });
    }

	// button hover effect....
    jQuery(function() {
        jQuery('.theme-btn')
            .on('mouseenter', function(e) {
                var parentOffset = jQuery(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                jQuery(this).find('span').css({
                    top: relY,
                    left: relX
                })
            })
            .on('mouseout', function(e) {
                var parentOffset = jQuery(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                jQuery(this).find('span').css({
                    top: relY,
                    left: relX
                })
            });
        //jQuery('[href=#]').click(function(){return false});
    });

    /*===========Portfolio isotope js===========*/
    function filTeTiSotOp() {
    	var $grid = jQuery('.portfolioContainer').isotope({
          itemSelector: '.isotope-item',
          layoutMode: 'fitRows',
          percentPosition: true,
          masonry: {
            // use outer width of grid-sizer for columnWidth
            //columnWidth: $container.width() / $resize
            columnWidth: 1
          }
        })


        jQuery(".portfolioFilter a").on('click', function () {
            jQuery(".portfolioFilter a").removeClass("current");
            jQuery(this).addClass("current");

            var selector = jQuery(this).attr("data-filter");
            $grid.isotope({
                filter: selector,
                animationOptions: {
                    animationDuration: 1750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        })
    }
    filTeTiSotOp();

    function masonary() {
    	// var $container = jQuery('.portfolioContainer');
    	// var $resize = jQuery('.portfolioContainer').attr('id');
        var $grid = jQuery('.masonary').isotope({
          itemSelector: '.masonary-item',
          percentPosition: true,
          masonry: {
            // use outer width of grid-sizer for columnWidth
            //columnWidth: $container.width() / $resize
            columnWidth: 1
          }
        })


        jQuery(".portfolioFilter a").on('click', function () {
            jQuery(".portfolioFilter a").removeClass("current");
            jQuery(this).addClass("current");

            var selector = jQuery(this).attr("data-filter");
            $grid.isotope({
                filter: selector,
                animationOptions: {
                    animationDuration: 1750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        })
    }
    masonary();

    // Initialize sidebar-sticky
    if (jQuery('.sidebar').length) {
        var sidebar = new StickySidebar('.content-row .sidebar', {
            containerSelector: '.content-row .row',
            innerWrapperSelector: '.sidebar-inner',
            topSpacing: 130,
            bottomSpacing: 20,
            resizeSensor: true,
            minWidth: 767
        });
    }

	//Banner Carousel one 
	if (jQuery('.banner-carousel').length) {
		jQuery('.banner-carousel').owlCarousel({
			animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
			loop:true,
			thumbs: false,
			margin:0,
			items:1,
			nav:false,
			dots:true,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			touchDrag:false,
			mouseDrag:false,
			navText: [ '<i class="fal fa-long-arrow-left"></i>', '<i class="fal fa-long-arrow-right"></i>' ],
		});    		
	}

	//Banner Carousel two
	if (jQuery('.banner-carousel-two').length) {
		jQuery('.banner-carousel-two').owlCarousel({
			loop:true,
			thumbs: false,
			margin:0,
			items:1,
			nav:true,
			dots:false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			touchDrag:false,
			mouseDrag:false,
			navText: [ '<i class="fal fa-long-arrow-left"></i>', '<i class="fal fa-long-arrow-right"></i>' ],
		});    		
	}

	//Banner Carousel three
	if (jQuery('.banner-carousel-three').length) {
		jQuery('.banner-carousel-three').owlCarousel({
			loop:true,
			thumbs: false,
			margin: 20,
			items:3,
			nav:true,
			dots:false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			touchDrag:false,
			mouseDrag:false,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:3
				}
			}
		});    		
	}

	//Banner Carousel four
	if (jQuery('.banner-carousel-four').length) {
		jQuery('.banner-carousel-four').owlCarousel({
			animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
		    loop:true,
			thumbs: false,
			margin:0,
			items:1,
			nav:false,
			dots:true,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			touchDrag:false,
			mouseDrag:false,
			navText: [ '<i class="fal fa-long-arrow-left"></i>', '<i class="fal fa-long-arrow-right"></i>' ],
		});    		
	}

	//Banner Carousel five
	if (jQuery('.banner-carousel-five').length) {
		jQuery('.banner-carousel-five').owlCarousel({
			animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
		    loop:true,
			thumbs: false,
			margin:0,
			items:1,
			nav:true,
			dots:false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
		});    		
	}

	// Testimonilas Carousel Slider
	if (jQuery('.testımonıals-carousel').length) {
		jQuery('.testımonıals-carousel').owlCarousel({
			loop:true,
			thumbs: true,
			margin:0,
			items:1,
			nav:false,
			dots:false,
			thumbsPrerendered: true,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
		});    		
	}

	// if (jQuery('.testımonıals-carousel').length) {
 //     	var swiper = new Swiper(".testımonıals-carousel-thumb", {
	//         spaceBetween: 7.5,
	//         slidesPerView: 3,
	//         freeMode: true,
	// 		breakpoints: {
	// 		    375: {
	// 		      	slidesPerView: 4,
	// 		    }
	// 		}
 //      	});

 //      	var swiper2 = new Swiper(".testımonıals-carousel", {
	//         spaceBetween: 0,
	//         thumbs: {
	//           swiper: swiper,
	//         },
 //      	});
 //    }


	//Service Carousel 
	if (jQuery('.service-carousel').length) {
		jQuery('.service-carousel').owlCarousel({
			loop:false,
			thumbs: false,
			margin: 30,
			items:4,
			nav:false,
			dots:false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			responsive:{
				0:{
					items:1.3
				},
				600:{
					items:1.3
				},
				768:{
					items:3
				},
				992:{
					items:4
				}
			}
		});    		
	}

	//Product Carousel 
	if (jQuery('.product-carousel').length) {
		jQuery('.product-carousel').owlCarousel({
			loop:false,
			thumbs: false,
			margin: 30,
			items:4,
			nav:true,
			dots:false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			responsive:{
				0:{
					items:1.3
				},
				600:{
					items:1.3
				},
				768:{
					items:3
				},
				992:{
					items:4
				}
			}
		});    		
	}

	// product gallery slider
	if (jQuery('.team-carousel').length) {
		var galleryThumbs = new Swiper(".team-carousel", {
			loop: true,
			centeredSlides: false,
			centeredSlidesBounds: false,
			spaceBetween: 30,
	        centeredSlides: false,
	        autoplay: {
	          delay: 7000,
	          disableOnInteraction: false,
	        },
	        slidesPerView: 1,
		  	speed: 500,
		  	pagination: {
		      el: '.swiper-pagination',
		      clickable: true,
		  	},
			breakpoints: {
			    992: {
			      	slidesPerView: 5,
			    },
			    768: {
			      	slidesPerView: 3,
			    },
			    576: {
			      	slidesPerView: 2,
			    }
			}
		});
	}

	//Gallery Carousel
	if (jQuery('.gallery-carousel').length) {
		jQuery('.gallery-carousel').owlCarousel({
			loop:true,
			thumbs: false,
			margin:0,
			items:1,
			nav:true,
			dots:false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			touchDrag:false,
			mouseDrag:false,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			
		});    		
	}

	//Testimonilas grid Carousel Slider
	// if (jQuery('.testımonıals-carousel-grid').length) {
	// 	jQuery('.testımonıals-carousel-grid').owlCarousel({
	// 		loop:true,
	// 		thumbs:false,
	// 		margin:50,
	// 		items:3,
	// 		slideBy: 1,
	// 		nav:false,
	// 		dots:true,
	// 		smartSpeed: 500,
	// 		autoplay:true,
	// 		autoplayTimeout:5000,
	// 		touchDrag:false,
	// 		mouseDrag:false,
	// 		navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
	// 		responsive:{
	// 			0:{
	// 				items:1
	// 			},
	// 			576:{
	// 				items:1
	// 			},
	// 			768:{
	// 				items:3
	// 			}
	// 		}
	// 	});    		
	// }

	// product gallery slider
	if (jQuery('.testımonıals-carousel-grid').length) {
		var galleryThumbs = new Swiper(".testımonıals-carousel-grid", {
			loop: true,
			centeredSlides: false,
			centeredSlidesBounds: false,
			spaceBetween: 50,
	        centeredSlides: false,
	        autoplay: {
	          delay: 7000,
	          disableOnInteraction: false,
	        },
	        slidesPerView: 1,
		  	speed: 500,
		  	pagination: {
		      el: '.swiper-pagination',
		      clickable: true,
		  	},
		  	breakpoints: {
			    992: {
			      	slidesPerView: 3,
			    },
			    768: {
			      	slidesPerView: 2,
			    },
			    576: {
			      	slidesPerView: 1,
			    }
			}
		});
	}

	//Portfolio Carousel one
	if (jQuery('.portfolio-carousel-one').length) {
		jQuery('.portfolio-carousel-one').owlCarousel({
			loop:false,
			thumbs: false,
			margin: 30,
			items:3,
			nav:false,
			dots:true,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			responsive:{
				0:{
					items:1.3
				},
				600:{
					items:1.3
				},
				768:{
					items:3
				}
			}
		});    		
	}

	//Portfolio Carousel two
	if (jQuery('.portfolio-carousel-two').length) {
		jQuery('.portfolio-carousel-two').owlCarousel({
			loop:true,
			thumbs:false,
			margin:60,
			items:1,
			nav:true,
			dots:false,
			smartSpeed: 500,
			autoplay:false,
			autoplayTimeout:7000,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			responsive:{
				0:{
					items:1,
					margin: 30
				},
				600:{
					items:1,
					margin: 30
				},
				768:{
					items:1,
					margin: 30
				}
			},
			afterAction: function(el){
			   //remove class active
			   this
			   .$owlItems
			   .removeClass('active')

			   //add class active
			   this
			   .$owlItems //owl internal $ object containing items
			   .eq(this.currentItem + 1)
			   .addClass('active')    
			}
		});    		
	}

	//Portfolio Carousel three
	if (jQuery('.portfolio-carousel-three').length) {
		jQuery('.portfolio-carousel-three').owlCarousel({
			loop: true,
			thumbs: false,
			margin: 30,
			items:1,
			nav:false,
			dots:true,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:1
				}
			}
		});    		
	}

	//Gallery Carousel
	if (jQuery('.portfolio-single-slider').length) {
		jQuery('.portfolio-single-slider').owlCarousel({
			loop:true,
			thumbs: false,
			margin:0,
			items:1,
			nav:true,
			dots:false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout:7000,
			touchDrag:false,
			mouseDrag:false,
			navText: [ '<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>' ],
			
		});    		
	}

	// product gallery slider
	if (jQuery('.gallery-thumbs').length) {
		var galleryThumbs = new Swiper(".gallery-thumbs", {
		  centeredSlides: false,
		  centeredSlidesBounds: false,
		  slidesPerView: 3,
		  watchOverflow: true,
		  autoplay: {
	          delay: 7000,
	          disableOnInteraction: false,
	      },
		  watchSlidesVisibility: true,
		  watchSlidesProgress: true,
		  direction: 'horizontal',
		  breakpoints: {
		    768: {
		    	 direction: 'vertical',
		      	slidesPerView: 6,
		    },
		    576: {
		    	direction: 'horizontal',
		      	slidesPerView: 5,
		    },
		    320: {
		    	direction: 'horizontal',
		      	slidesPerView: 3,
		    }
		  }
		});

		var galleryMain = new Swiper(".gallery-main", {
		  watchOverflow: true,
		  watchSlidesVisibility: true,
		  watchSlidesProgress: true,
		  preventInteractionOnTransition: true,
		  navigation: {
		    nextEl: '.swiper-button-next',
		    prevEl: '.swiper-button-prev',
		  },
		  effect: 'fade',
		    fadeEffect: {
		    crossFade: true
		  },
		  thumbs: {
		    swiper: galleryThumbs
		  }
		});

		galleryMain.on('slideChangeTransitionStart', function() {
		  galleryThumbs.slideTo(galleryMain.activeIndex);
		});

		galleryThumbs.on('transitionStart', function(){
		  galleryMain.slideTo(galleryThumbs.activeIndex);
		});
	}
	

	/*=== Header Search Active ===*/
	jQuery(".header-search").on('click',function(){
	  jQuery('.search-bar').slideDown();
	});

	jQuery(".search-close").on('click',function(){
	  jQuery('.search-bar').slideUp();
	});


	//Custom Seclect Box
	if(jQuery('.custom-select-box').length){
		jQuery('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}

	//Chosen Seclect Box
	if(jQuery('.chosen-select').length){
		jQuery(".chosen-select").chosen({
			disable_search_threshold: 10,
			width:'100%',
		});
	}

	//Chosen Search Select
	if(jQuery('.chosen-search-select').length){
		jQuery(".chosen-search-select").chosen({
			width:'100%',
		});
	}

	// Custom Select Box
	if (jQuery('.sortby-select').length) {
    	jQuery('.sortby-select').select2();
	}

	// Tooltip
	if (jQuery('[data-toggle="tooltip"]').length) {
		jQuery(function () {
		  jQuery('[data-toggle="tooltip"]').tooltip()
		})
	}


	//Accordion Box
	if(jQuery('.accordion-box').length){
		jQuery(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = jQuery(this).parents('.accordion-box');
			var target = jQuery(this).parents('.accordion');
			
			if(jQuery(this).hasClass('active')!==true){
				jQuery(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}
			
			if (jQuery(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				jQuery(this).addClass('active');
				jQuery(outerBox).children('.accordion').removeClass('active-block');
				jQuery(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				jQuery(this).next('.acc-content').slideDown(300);	
			}
		});	
	}

	if(jQuery('.countdown').length){

		var dateString = new Date().getFullYear() + "/06/05";
	  	var deadline = new Date(dateString);
	    
	  	function updateClock(){
		  	var today = Date();
		  	var diff = Date.parse(deadline) - Date.parse(today);
		    	if(diff<=0){
		      	clearInterval(interval);
		    	}
		    else{
		  		var seconds = Math.floor((diff/1000)%60);
		  		var minutes = Math.floor((diff/1000/60)%60);
		  		var hours = Math.floor((diff/1000/60/60)%24);
		  		var days = Math.floor(diff/(1000*60*60*24)%30.5);
		  		var months = Math.floor(diff/(1000*60*60*24*30.5)%12);
		    
		     	$("#months").text(('0'+months).slice(-2));
		     	$("#days").text(('0'+days).slice(-2));
		     	$("#hours").text(('0'+hours).slice(-2));
		     	$("#minutes").text(('0'+minutes).slice(-2));
		     	$("#seconds").text(('0'+seconds).slice(-2));
		    
		    }//EOF ELSE
		  
		  }//EOF FUNCTION
	  
	 	var interval = setInterval(updateClock,1000);
	}

	//Fact Counter + Text Count
	if(jQuery('.count-box').length){
		jQuery('.count-box').appear(function(){
	
			var jQueryt = jQuery(this),
				n = jQueryt.find(".count-text").attr("data-stop"),
				r = parseInt(jQueryt.find(".count-text").attr("data-speed"), 10);
				
			if (!jQueryt.hasClass("counted")) {
				jQueryt.addClass("counted");
				jQuery({
					countNum: jQueryt.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						jQueryt.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						jQueryt.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}

	//Progress Bar
	if(jQuery('.progress-line').length){
		jQuery('.progress-line').appear(function(){
			var el = jQuery(this);
			var percent = el.data('width');
			jQuery(el).css('width',percent+'%');
		},{accY: 0});
	}

	//Tabs Box
	if(jQuery('.tabs-box').length){
		jQuery('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = jQuery(jQuery(this).attr('data-tab'));
			
			if (jQuery(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				jQuery(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				jQuery(target).fadeIn(300);
				jQuery(target).addClass('active-tab animated fadeIn');
			}
		});
	}

	//Price Range Slider
	if(jQuery('.price-range-slider').length){
		jQuery( ".price-range-slider" ).slider({
			range: true,
			min: 0,
			max: 90,
			values: [ 0, 84 ],
			slide: function( event, ui ) {
			jQuery( "input.property-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
		
		jQuery( "input.property-amount" ).val( jQuery( ".price-range-slider" ).slider( "values", 0 ) + " - jQuery" + jQuery( ".price-range-slider" ).slider( "values", 1 ) );	
	}

	//Price Range Slider
	if(jQuery('.range-slider-one').length){
		jQuery( ".range-slider-one .range-slider" ).slider({
			range: true,
			min: 1900,
			max: 2030,
			values: [ 1923, 2023 ],
			slide: function( event, ui ) {
			jQuery( ".range-slider-one .count" ).text( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
		
		jQuery( ".range-slider-one .count" ).text( jQuery( ".range-slider" ).slider( "values", 0 ) + " - " + jQuery( ".range-slider" ).slider( "values", 1 ) );	
	}

	//Area Range Slider
	if(jQuery('.area-range-slider').length){
		jQuery( ".area-range-slider" ).slider({
			range: true,
			min: 0,
			max: 100,
			values: [ 0, 50 ],
			slide: function( event, ui ) {
			jQuery( ".area-amount" ).text( ui.values[ 1 ] );
			}
		});
		
		jQuery( ".area-amount" ).text( jQuery( ".area-range-slider" ).slider( "values", 1 ));	
	}

	//Salary Range Slider
	if(jQuery('.salary-range-slider').length){
		jQuery( ".salary-range-slider" ).slider({
			range: true,
			min: 0,
			max: 20000,
			values: [ 0, 15000 ],
			slide: function( event, ui ) {
				jQuery( ".salary-amount .min" ).text( ui.values[0]);
				jQuery( ".salary-amount .max" ).text( ui.values[1]);
			}
		});
		
		jQuery( ".salary-amount .min" ).text( jQuery( ".salary-range-slider" ).slider( "values", 0 )); 
		jQuery( ".salary-amount .max" ).text( jQuery( ".salary-range-slider" ).slider( "values", 1 )); 
	}


	// Initialize fancybox
    jQuery('[data-fancybox="gallery"]', '[data-fancybox]').fancybox({
        buttons: [
            'share',
            'fullScreen',
            'close'
        ]
    });
	
	

	// Scroll to a Specific Div
    // jQuery('.scroll-down').on("click", function() {
    //     var id = jQuery(this).attr('href');
    //     moveTo(id);
    // });

    // Scroll to a Specific Div
	if(jQuery('.scroll-to-target').length){
		jQuery(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   jQuery('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 800);
	
		});
	}


	//Make Content Sticky
	if (jQuery('.sticky-sidebar').length) {
	    jQuery('.sidebar-side').theiaStickySidebar({
	      // Settings
	      additionalMarginTop: 90,
	    });
	}

	
	// Elements Animation
	if(jQuery('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       50,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

	// Initialize sSteller parallax
	if(jQuery('.parallax-div').length){
	    $.stellar({
	        // horizontalScrolling: false,
	        // verticalScrolling: true,
	        // horizontalOffset: 0,
	        // verticalOffset: 0,
	        // responsive: true,
	        // scrollProperty: 'scroll',
	        // positionProperty: 'position',
	        // parallaxBackgrounds: true,
	        // parallaxElements: true,
	        // hideDistantElements: true,
	        // hideElement: function($elem) { $elem.hide(); },
	        // showElement: function($elem) { $elem.show(); }
	    });
	}


	// Chosen touch support.
    if (jQuery('.chosen-container').length > 0) {
      jQuery('.chosen-container').on('touchstart', function(e){
        e.stopPropagation(); 
        e.preventDefault();
        // Trigger the mousedown event.
        jQuery(this).trigger('mousedown');
      });
    }

    


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	jQuery(window).on('scroll', function() {
		headerStyle();

	});

/* ==========================================================================
   When document is resize, do
   ========================================================================== */

   	jQuery(window).on('resize', function() {

	    initBg();
	    setHeight();

	    filTeTiSotOp();

	    //Custom Seclect Box
	if(jQuery('.custom-select-box').length){
		jQuery('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}

	//Chosen Seclect Box
	if(jQuery('.chosen-select').length){
		jQuery(".chosen-select").chosen({
			disable_search_threshold: 10,
			width:'100%',
		});
	}

	//Chosen Search Select
	if(jQuery('.chosen-search-select').length){
		jQuery(".chosen-search-select").chosen({
			width:'100%',
		});
	}

	// Custom Select Box
	if (jQuery('.sortby-select').length) {
    	jQuery('.sortby-select').select2();
	}

	});

/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	jQuery(window).on('load', function() {

		handlePreloader();
		initBg();
    	setHeight();
    	filTeTiSotOp();
	});	

	function initBg() {
	    jQuery('.banner-bg').each(function() {
	        var background = jQuery(this).data('background');
	        jQuery(this).css('background-image', 'url("' + background + '")');
	    });
	}

	function setHeight() {
	    var windowHeight = jQuery(window).innerHeight();
	    //jQuery('body').css('padding-top', jQuery('.header-part').outerHeight());
	    // jQuery('.banner-part').css('height', jQuery(window).height());

	};

	//Custom Seclect Box
	if(jQuery('.custom-select-box').length){
		jQuery('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}

	//Chosen Seclect Box
	if(jQuery('.chosen-select').length){
		jQuery(".chosen-select").chosen({
			disable_search_threshold: 10,
			width:'100%',
		});
	}

	//Chosen Search Select
	if(jQuery('.chosen-search-select').length){
		jQuery(".chosen-search-select").chosen({
			width:'100%',
		});
	}

	// Custom Select Box
	if (jQuery('.sortby-select').length) {
    	jQuery('.sortby-select').select2();
	}



})(window.jQuery);


