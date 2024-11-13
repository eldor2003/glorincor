$(document).ready(function(){
    
    // hamburger
    $(".hamurger_menu").on('click', function(e) {
        e.preventDefault();
        $(".header_right").slideDown(); // Sekin pastga ochiladi
        $(".header_bottom").addClass("active");
        $(".hamurger_menu").hide();
        $("header .close").show();
    });

    $(".close").on('click', function(e) {
        e.preventDefault();
        $(".header_right").slideUp(); // Sekin yuqoriga yopiladi
        $(".header_bottom").removeClass("active");
        $(".hamurger_menu").show();
        $("header .close").hide();
    });


    // search
    $(".header_search input").on('focus', function() {
        $('.header_search').css("z-index", "99999");
        $('.search_suggestions').css("z-index", "99999");
        $('.search_overlay').show(); // Elementni ko'rsatish
        $('body').addClass('overlay');
        $('.search_icon').hide();
        $('.search_clear').show();
    });
    
    $('.search_overlay').on('click', function() {
        $('body').removeClass('overlay');
        $('.search_overlay').hide(); // Elementni yashirish
        $('.search_icon').show();
        $('.search_clear').hide();
        $('.header_search').css("z-index", "1");
        $('.search_suggestions').css("z-index", "1");
        $('.search_suggestions').hide();
        $('.search_input').each(function() {
            $(this).val('');
        });
    });


    // search_results_block kartalari uchun cardData massivini yaratish
    let cardData = [];
    $(".search_results_block .search_card").each(function() {
        let cardName = $(this).find(".search_card_name").text().trim();
        let cardId = $(this).data("id");
        let cardImg = $(this).find(".search_card_img img").attr("src");
        cardData.push({
            name: cardName,
            id: cardId,
            img: cardImg
        });
    });

    // search_suggestions_block kartalari uchun suggestCardData massivini yaratish
    let suggestCardData = [];
    $(".search_suggestions_block .search_card").each(function() {
        let cardName = $(this).find(".search_card_name").text().trim();
        let cardId = $(this).data("id");
        let cardImg = $(this).find(".search_card_img img").attr("src");
        suggestCardData.push({
            name: cardName,
            id: cardId,
            img: cardImg
        });
    });

    $(".search_input").on("input", function() {
        $('.header_search').css("z-index", "99999");
        $('.search_suggestions').css("z-index", "99999");
        let query = $(this).val().toLowerCase();
        $('.search_suggestions').show();

        // Ikon va Clear tugmachalarini ko'rsatish/qaytarish
        if (query !== '') {
            $('.search_clear').show();
            $('.search_icon').hide();
        } else {
            $('.search_clear').hide();
            $('.search_icon').show();
        }

        // Tavsiyalarni tozalash va ko'rsatish
        $(".search_suggestions").empty();

        if (query) {
            // Filtrlash
            let filteredItems = cardData.filter(item => item.name.toLowerCase().includes(query));

            // Agar mos elementlar bo'lsa
            if (filteredItems.length > 0) {
                let resultsHTML = `
                    <div class="search_title">Результаты поиска</div>
                    <div class="search_results_block">
                        <div class="search_cards">
                            ${filteredItems.map(item => `
                                <a href="#" class="search_card" data-id="${item.id}">
                                    <div class="search_card_img">
                                        <img src="${item.img}" alt="">
                                    </div>
                                    <div class="search_card_name">${item.name}</div>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `;
                $(".search_suggestions").append(resultsHTML);
            } else {
                // Mos keladigan natijalar topilmasa, suggestCardData ni qo'shamiz
                let suggestionsHTML = `
                    <div class="search_title">Результаты не найдены</div>
                    <div class="search_suggestions_block">
                        <div class="search_note">Наши новинки для здоровья волос и кожи</div>
                        <div class="search_cards">
                            ${suggestCardData.map(item => `
                                <a href="#" class="search_card" data-id="${item.id}">
                                    <div class="search_card_img">
                                        <img src="${item.img}" alt="">
                                    </div>
                                    <div class="search_card_name">${item.name}</div>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `;
                $(".search_suggestions").append(suggestionsHTML);
            }
        } else {
            $(".search_suggestions").hide();
        }
    });

    

    // Tavsiyani tanlaganda inputga qo'shish
    $(document).on("click", ".suggestion-item", function() {
        $(".search_input").val($(this).text());
        $(".search_suggestions").hide(); // Natijalarni yashirish
        $('.search_clear').show();       // Clear tugmasini ko'rsatish
        $('.search_icon').hide();        // Ikonkani yashirish
    });

    // Clear tugmasiga bosilganda inputni tozalash
    $(".search_clear").on('click', function(e) {
        e.preventDefault();
        $('.search_input').each(function() {
            $(this).val('');
        });
        $(".search_suggestions").hide(); // Tavsiyalarni yashirish
        $('.search_clear').hide();       // Clear tugmasini yashirish
        $('.search_icon').show();        // Ikonkani ko'rsatish
    });


    $(".search_clear").on('click', function(e) {
        e.preventDefault();            // Sahifani yangilanishini to'xtatish
        $('.search_input').each(function() {
            $(this).val('');
        }); 
        $('.search_overlay').hide(); // Elementni yashirish
        $('.search_icon').show();
        $('.search_clear').hide();
    });

    // mobile search
    $(".mobile_search_back").on('click', function(e){
        e.preventDefault();
        $(".mobile_search_block").removeClass('active')
        $('.search_input').each(function() {
            $(this).val('');
        });
        $(".search_suggestions").empty(); 
        $('body').removeClass('overlay');
        $('.search_overlay').hide(); // Elementni yashirish
    })
    $(".mobile_search button").on('click', function(e){
        e.preventDefault();
        $(".mobile_search_block").addClass('active')
    })





    // MAIN SWIPER
    var mainSwiper = new Swiper(".mainSwiper", {
        navigation: {
          nextEl: ".swiper_next",
          prevEl: ".swiper_prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 1500,
        autoplay: {
            delay: 2500, // Har bir slayd qancha vaqt ekranda turishini belgilaydi (millisekundlarda)
            disableOnInteraction: false, // Foydalanuvchi o‘zaro aloqada bo‘lganda ham davom ettiradi
          },
      });
    // PRODUCT SWIPER
    var productSwiper = new Swiper(".productSwiper", {
        slidesPerView: 3,
        spaceBetween: 18,
        loop: true,
        navigation: {
            nextEl: ".product_swiper_next",
            prevEl: ".product_swiper_prev",
        },
        pagination: {
            el: ".products_swiper_pagination",
            type: "progressbar",
        },
        speed: 1000,
        breakpoints: {
            // when window width is >= 1200px
            768: {
                slidesPerView: 1,
                centeredSlides: true,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: true,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 18,
            }
          }
      });
        var gloricorNews = new Swiper(".glorincorNewsSwiper", {
        navigation: {
          nextEl: ".glorincor_news_next",
          prevEl: ".glorincor_news_prev",
        },
        pagination: {
            el: ".glorincor_news-pagination",
            clickable: true,
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 1500,
        autoplay: {
            delay: 2500, // Har bir slayd qancha vaqt ekranda turishini belgilaydi (millisekundlarda)
            disableOnInteraction: false, // Foydalanuvchi o‘zaro aloqada bo‘lganda ham davom ettiradi
          },
      });
        var reviewsSwiper = new Swiper(".reviewsSwiper", {
        navigation: {
          nextEl: ".reviews_swiper_next",
          prevEl: ".reviews_swiper_prev",
        },
        pagination: {
            el: ".reviews_swiper_pagination",
            clickable: true,
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 1500,
      });
      

      function updateShowAllButton() {
        // Agar birorta checkbox tanlangan bo'lsa
        if ($('.filterCheckbox:checked').length > 0) {
            $(".catalog_filter_main .show_all").removeClass('active');
        } else {
            $(".catalog_filter_main .show_all").addClass('active');
        }
    }

    // filterCheckbox holatini kuzatish
    $('.filterCheckbox').each(function() {
        var $checkbox = $(this);
        var $desc = $checkbox.closest('li').find('.desc'); // .desc ni topish

        // Initial holatni tekshirib chiqish (yani checkbox belgilangan yoki yo'q)
        if ($checkbox.prop('checked')) {
            $desc.css('color', '#20335D'); // $main-color
            $desc.css('font-weight', '600'); // font-weight
        } else {
            $desc.css('color', '#6F7984'); // Asl rangini qaytarish
            $desc.css('font-weight', '500'); // Asl font weightni qaytarish
        }
    });

    // Boshlang'ich holat uchun updateShowAllButton funksiyasini chaqirish
    updateShowAllButton();

    // filterCheckbox holatini o'zgartirishni kuzatish
    $('.filterCheckbox').change(function() {
        var $checkbox = $(this);
        var $desc = $checkbox.closest('li').find('.desc'); // .desc ni topish

        // Agar checkbox belgilangan bo'lsa
        if ($checkbox.prop('checked')) {
            $desc.css('color', '#20335D'); // $main-color
            $desc.css('font-weight', '600'); // font-weight
        } else {
            // Agar checkbox belgilangan bo'lmasa, rangni va font weightni default holatiga qaytarish
            $desc.css('color', '#6F7984'); // Asl rangini qaytarish
            $desc.css('font-weight', '500'); // Asl font weightni qaytarish
        }

        // Har bir checkbox o'zgartirilganda updateShowAllButton funksiyasini chaqirish
        updateShowAllButton();
    });

     // .reset_filter ni bosganda barcha checkboxlarni uncheck qilish
     $(".reset_filter").click(function() {
        $('.filterCheckbox').prop('checked', false);  // Barcha checkbox'larni uncheck qilish
        
        // Barcha .desc ranglarini va font weight'larini asl holatiga qaytarish
        $('.filterCheckbox').each(function() {
            var $checkbox = $(this);
            var $desc = $checkbox.closest('li').find('.desc'); // .desc ni topish
            
            // Rang va font weightni asl holatiga qaytarish
            $desc.css('color', '#6F7984'); // Asl rangini qaytarish
            $desc.css('font-weight', '500'); // Asl font weightni qaytarish
        });

        // Reset filter tugmasini bosganda, .show_all elementiga active klassini qo'shish
        $(".catalog_filter_main .show_all").addClass('active');
    });
    
});