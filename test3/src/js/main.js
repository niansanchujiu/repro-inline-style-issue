document.addEventListener('DOMContentLoaded', function () {
    $(window).scroll(function(){
        if( 0<$(this).scrollTop() ){
            $("header").addClass("header-sticky");
            $("body").addClass("body-sticky");
        }else{
            $("header").removeClass("header-sticky");
            $("body").removeClass("body-sticky");
        }
    });
    var wpcf7Elm = document.querySelector( '.wpcf7' );
    if(wpcf7Elm ){
        $('.wpcf7-form').on('submit', function() {
            $(this).find('.wpcf7-submit').attr('disabled', true);
        });
        $('.wpcf7').on('wpcf7submit', function (e) {
            console.log('Submit:' + e.detail.apiResponse.message);
            $(this).find('.wpcf7-submit').removeAttr('disabled');
            
        });
        wpcf7Elm.addEventListener( 'wpcf7invalid', function( event ) {
            pi.submit_tips('error','Submission Failed',event.detail.apiResponse.message);
        });
        wpcf7Elm.addEventListener( 'wpcf7spam', function( event ) {
            pi.submit_tips('warning','Submitted successfully',event.detail.apiResponse.message);
            pi.form_reset();
        });
        wpcf7Elm.addEventListener( 'wpcf7mailfailed', function( event ) {
            pi.submit_tips('success','Submitted successfully',event.detail.apiResponse.message);
            pi.form_reset();
        });
        wpcf7Elm.addEventListener( 'wpcf7mailsent', function( event ) {
            pi.submit_tips('success','Submitted successfully',event.detail.apiResponse.message);
            pi.form_reset();
        });
    }
    if (typeof Swiper !== 'undefined') {    
      /* 轮播 */
      // 主页banner
      var swiper = new Swiper('#home-banner', {
          autoplay:true,
          speed: 700,
          loop : true,
          grabCursor : true,
          clickable :true,
          pagination: {
              el: '.swiper-pagination',
              dynamicBullets: true,
          },
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
      });
      // 证书
      var HomeCeSwiper = new Swiper('#home-ce-swiper', {
          loop: true, 
          speed: 700,
          slidesPerView : 2,
          breakpoints: { 
              320: {  //当屏幕宽度大于等于320
                slidesPerView: 2,
                spaceBetween: 10
              },
              768: {  //当屏幕宽度大于等于768 
                slidesPerView: 3,
                spaceBetween: 20
              },
              1280: {  //当屏幕宽度大于等于1280
                slidesPerView: 4,
                spaceBetween: 30
              }
          },
          spaceBetween : 20,
          grabCursor : true,
          clickable :true,
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
      });
      var CatValvePartSwiper = new Swiper('#cat-bflypart-swiper',{
          loop: true, 
          speed: 700,
          slidesPerView : 5,
          breakpoints: { 
              320: {  
                slidesPerView: 3,
                spaceBetween: 10
              },
              768: { 
                slidesPerView: 4,
                spaceBetween: 20
              },
              1280: { 
                slidesPerView: 5,
                spaceBetween: 30
              }
          },
          spaceBetween :10,
          grabCursor : true,
          clickable :true,
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
      });
      var small_valve = new Swiper(".small_valve", {
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesProgress: true,
      });
      var big_valve = new Swiper(".big_valve", {
          spaceBetween: 10,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          thumbs: {
            swiper: small_valve,
          },
      });
    }
    


});


