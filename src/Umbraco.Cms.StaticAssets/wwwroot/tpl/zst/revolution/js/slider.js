/*------------------------------------------------------------------------------*/
/*  Home_Page Slider
/*------------------------------------------------------------------------------*/
var revapi51,
tpj=jQuery;


/* header */
 tpj(document).ready(function() {
  if(tpj("#rev_slider_5_1").revolution == undefined){
      revslider_showDoubleJqueryError("#rev_slider_5_1");
    }else{
      revapi51 = tpj("#rev_slider_5_1").show().revolution({
        sliderType:"standard",
        sliderLayout: "auto",
        dottedOverlay:"none",
        delay:9000,
        navigation: {
          keyboardNavigation:"off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation:"off",
          mouseScrollReverse:"default",
          onHoverStop:"off",
          touch:{
            touchenabled:"on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          }
          ,
          arrows: {
            style:"zeus",
            enable:true,
            hide_under:991,
            hide_onleave:true,
            tmp:'',
            left: {
              h_align:"left",
              v_align:"center",
              h_offset:20,
              v_offset:0
            },
            right: {
              h_align:"right",
              v_align:"center",
              h_offset:20,
              v_offset:0
            }
          }
          ,
          bullets: {
 
            enable: false,
            style: 'uranus',
            direction: 'horizontal',
            rtl: false,
     
            container: 'slider',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 20,
            space: 5,
            tmp: '<span class="tp-bullet-inner"></span>',
     
            hide_onleave: false,
            hide_onmobile: false,
            hide_under: 768,
            hide_over: 9999,
            hide_delay: 200,
            hide_delay_mobile: 1200

          }
        },
         viewPort: {
            enable:true,
            outof:"pause",
            visible_area:"100%",
            presize:false
        },
        responsiveLevels:[1240,1024,778,480],
        visibilityLevels:[1240,1024,778,480],
        gridwidth:[1240,1024,778,480],
        gridheight:[950,784,450,349],
        lazyType:"none",
        parallax: {
            type:"mouse",
            origo:"slidercenter",
            speed:2000,
            levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
            type:"mouse",
        },
        shadow:0,
        spinner:"off",
        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,
        shuffle:"off",
        autoHeight:"off",
        disableProgressBar:"on",
        hideThumbsOnMobile:"off",
        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        debugMode:false,
        fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
        }
      });
    }
  });
 
 /* header-style-02 */

 tpj(document).ready(function() {
  if(tpj("#rev_slider_5_2").revolution == undefined){
      revslider_showDoubleJqueryError("#rev_slider_5_2");
    }else{
      revapi41 = tpj("#rev_slider_5_2").show().revolution({
        sliderType:"standard",
        sliderLayout: "auto",
        dottedOverlay:"none",
        delay:9000,
        navigation: {
          keyboardNavigation:"off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation:"off",
          mouseScrollReverse:"default",
          onHoverStop:"off",
          touch:{
            touchenabled:"on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          }
          ,
          arrows: {
            style:"zeus",
            enable:false,
            hide_under:991,
            hide_onleave:true,
            tmp:'',
            left: {
              h_align:"left",
              v_align:"center",
              h_offset:20,
              v_offset:0
            },
            right: {
              h_align:"right",
              v_align:"center",
              h_offset:20,
              v_offset:0
            }
          }
          ,

          bullets: {
 
            enable: true,
            style: 'uranus',
            direction: 'horizontal',
            rtl: false,
     
            container: 'slider',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 20,
            space: 5,
            tmp: '<span class="tp-bullet-inner"></span>',
     
            hide_onleave: false,
            hide_onmobile: false,
            hide_under: 768,
            hide_over: 9999,
            hide_delay: 200,
            hide_delay_mobile: 1200

          }
        },
     
         viewPort: {
            enable:true,
            outof:"pause",
            visible_area:"100%",
            presize:false
        },
        responsiveLevels:[1240,1024,778,480],
        visibilityLevels:[1240,1024,778,480],
        gridwidth:[1240,1024,778,480],
        gridheight:[900,743,449,349],
        lazyType:"none",
        parallax: {
            type:"mouse",
            origo:"slidercenter",
            speed:2000,
            levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
            type:"mouse",
        },
        shadow:0,
        spinner:"off",
        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,
        shuffle:"off",
        autoHeight:"off",
        disableProgressBar:"on",
        hideThumbsOnMobile:"off",
        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        debugMode:false,
        fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
        }
      });
    }
  });

 /* Home-shop */

 tpj(document).ready(function() {
  if(tpj("#rev_slider_5_3").revolution == undefined){
      revslider_showDoubleJqueryError("#rev_slider_5_3");
    }else{
      revapi41 = tpj("#rev_slider_5_3").show().revolution({
        sliderType:"standard",
        sliderLayout: "auto",
        dottedOverlay:"none",
        delay:9000,
        navigation: {
          keyboardNavigation:"off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation:"off",
          mouseScrollReverse:"default",
          onHoverStop:"off",
          touch:{
            touchenabled:"on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          }
          ,
          arrows: {
            style:"zeus",
            enable:true,
            hide_under:991,
            hide_onleave:true,
            tmp:'',
            left: {
              h_align:"left",
              v_align:"center",
              h_offset:20,
              v_offset:0
            },
            right: {
              h_align:"right",
              v_align:"center",
              h_offset:20,
              v_offset:0
            }
          }
          ,

          bullets: {
 
            enable: false,
            style: 'uranus',
            direction: 'horizontal',
            rtl: false,
     
            container: 'slider',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 20,
            space: 5,
            tmp: '<span class="tp-bullet-inner"></span>',
     
            hide_onleave: false,
            hide_onmobile: false,
            hide_under: 768,
            hide_over: 9999,
            hide_delay: 200,
            hide_delay_mobile: 1200

          }
        },
     
         viewPort: {
            enable:true,
            outof:"pause",
            visible_area:"100%",
            presize:false
        },
        responsiveLevels:[1240,1024,778,480],
        visibilityLevels:[1240,1024,778,480],
        gridwidth:[1240,1024,778,480],
        gridheight:[900,743,449,349],
        lazyType:"none",
        parallax: {
            type:"mouse",
            origo:"slidercenter",
            speed:2000,
            levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
            type:"mouse",
        },
        shadow:0,
        spinner:"off",
        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,
        shuffle:"off",
        autoHeight:"off",
        disableProgressBar:"on",
        hideThumbsOnMobile:"off",
        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        debugMode:false,
        fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
        }
      });
    }
  });
/* Header-style-02 */
 tpj(document).ready(function() {
  if(tpj("#rev_slider_5_4").revolution == undefined){
      revslider_showDoubleJqueryError("#rev_slider_5_4");
    }else{
      revapi54 = tpj("#rev_slider_5_4").show().revolution({
        sliderType:"standard",
        sliderLayout: "auto",
        dottedOverlay:"none",
        delay:9000,
        navigation: {
          keyboardNavigation:"off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation:"off",
          mouseScrollReverse:"default",
          onHoverStop:"off",
          touch:{
            touchenabled:"on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          }
          ,
          arrows: {
            style:"zeus",
            enable:false,
            hide_under:991,
            hide_onleave:true,
            tmp:'',
            left: {
              h_align:"left",
              v_align:"center",
              h_offset:20,
              v_offset:0
            },
            right: {
              h_align:"right",
              v_align:"center",
              h_offset:20,
              v_offset:0
            }
          }
          ,

          bullets: {
 
            enable: true,
            style: 'uranus',
            direction: 'horizontal',
            rtl: false,
     
            container: 'slider',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 20,
            space: 5,
            tmp: '<span class="tp-bullet-inner"></span>',
     
            hide_onleave: false,
            hide_onmobile: false,
            hide_under: 768,
            hide_over: 9999,
            hide_delay: 200,
            hide_delay_mobile: 1200

          }
        },
     
         viewPort: {
            enable:true,
            outof:"pause",
            visible_area:"100%",
            presize:false
        },
        responsiveLevels:[1240,1024,778,480],
        visibilityLevels:[1240,1024,778,480],
        gridwidth:[1240,1024,778,480],
        gridheight:[785,648,449,320],
        lazyType:"none",
        parallax: {
            type:"mouse",
            origo:"slidercenter",
            speed:2000,
            levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
            type:"mouse",
        },
        shadow:0,
        spinner:"off",
        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,
        shuffle:"off",
        autoHeight:"off",
        disableProgressBar:"on",
        hideThumbsOnMobile:"off",
        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        debugMode:false,
        fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
        }
      });
    }
  });
/* Header-style-03 */
 tpj(document).ready(function() {
  if(tpj("#rev_slider_5_5").revolution == undefined){
      revslider_showDoubleJqueryError("#rev_slider_5_5");
    }else{
      revapi55 = tpj("#rev_slider_5_5").show().revolution({
        sliderType:"standard",
        sliderLayout: "auto",
        dottedOverlay:"none",
        delay:9000,
        navigation: {
          keyboardNavigation:"off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation:"off",
          mouseScrollReverse:"default",
          onHoverStop:"off",
          touch:{
            touchenabled:"on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          }
          ,
          arrows: {
            style:"zeus",
            enable:true,
            hide_under:991,
            hide_onleave:true,
            tmp:'',
            left: {
              h_align:"left",
              v_align:"center",
              h_offset:20,
              v_offset:0
            },
            right: {
              h_align:"right",
              v_align:"center",
              h_offset:20,
              v_offset:0
            }
          }
          ,

          bullets: {
 
            enable: false,
            style: 'uranus',
            direction: 'horizontal',
            rtl: false,
     
            container: 'slider',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 20,
            space: 5,
            tmp: '<span class="tp-bullet-inner"></span>',
     
            hide_onleave: false,
            hide_onmobile: false,
            hide_under: 768,
            hide_over: 9999,
            hide_delay: 200,
            hide_delay_mobile: 1200

          }
        },
     
         viewPort: {
            enable:true,
            outof:"pause",
            visible_area:"100%",
            presize:false
        },
        responsiveLevels:[1240,1024,778,480],
        visibilityLevels:[1240,1024,778,480],
        gridwidth:[1240,1024,778,480],
        gridheight:[700,578,449,349],
        lazyType:"none",
        parallax: {
            type:"mouse",
            origo:"slidercenter",
            speed:2000,
            levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
            type:"mouse",
        },
        shadow:0,
        spinner:"off",
        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,
        shuffle:"off",
        autoHeight:"off",
        disableProgressBar:"on",
        hideThumbsOnMobile:"off",
        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        debugMode:false,
        fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
        }
      });
    }
  });