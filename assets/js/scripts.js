$(document).ready(function () {

    // hamburger
    $(".hamurger_menu").on('click', function (e) {
        e.preventDefault();
        $(".header_right").slideDown(); // Sekin pastga ochiladi
        $(".header_bottom").addClass("active");
        $(".hamurger_menu").hide();
        $("header .close").show();
        $(".header_overlay").show();
        $(".header_overlay").css("z-index", "1");
    });

    $(".close").on('click', function (e) {
        e.preventDefault();
        $(".header_right").slideUp(); // Sekin yuqoriga yopiladi
        $(".header_bottom").removeClass("active");
        $(".hamurger_menu").show();
        $("header .close").hide();
        $(".header_overlay").hide();
    });
    $(".header_overlay").on('click', function (e) {
        e.preventDefault();
        $(".header_right").slideUp(); // Sekin yuqoriga yopiladi
        $(".header_bottom").removeClass("active");
        $(".hamurger_menu").show();
        $("header .close").hide();
        $(".header_overlay").hide();
    });


    // search
    $(".header_search input").on('focus', function () {
        $('.header_search').css("z-index", "99999");
        $('.search_suggestions').css("z-index", "99999");
        $('.search_overlay').show(); // Elementni ko'rsatish
        $('body').addClass('overlay');
        $('.search_icon').hide();
        $('.search_clear').show();
    });

    $('.search_overlay').on('click', function () {
        $('body').removeClass('overlay');
        $('.search_overlay').hide(); // Elementni yashirish
        $('.search_icon').show();
        $('.search_clear').hide();
        $('.header_search').css("z-index", "1");
        $('.search_suggestions').css("z-index", "1");
        $('.search_suggestions').hide();
        $('.search_input').each(function () {
            $(this).val('');
        });
    });


    // search_results_block kartalari uchun cardData massivini yaratish
    let cardData = [];
    $(".search_results_block .search_card").each(function () {
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
    $(".search_suggestions_block .search_card").each(function () {
        let cardName = $(this).find(".search_card_name").text().trim();
        let cardId = $(this).data("id");
        let cardImg = $(this).find(".search_card_img img").attr("src");
        suggestCardData.push({
            name: cardName,
            id: cardId,
            img: cardImg
        });
    });

    $(".search_input").on("input", function () {
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
    $(document).on("click", ".suggestion-item", function () {
        $(".search_input").val($(this).text());
        $(".search_suggestions").hide(); // Natijalarni yashirish
        $('.search_clear').show();       // Clear tugmasini ko'rsatish
        $('.search_icon').hide();        // Ikonkani yashirish
    });

    // Clear tugmasiga bosilganda inputni tozalash
    $(".search_clear").on('click', function (e) {
        e.preventDefault();
        $('.search_input').each(function () {
            $(this).val('');
        });
        $(".search_suggestions").hide(); // Tavsiyalarni yashirish
        $('.search_clear').hide();       // Clear tugmasini yashirish
        $('.search_icon').show();        // Ikonkani ko'rsatish
    });


    $(".search_clear").on('click', function (e) {
        e.preventDefault();            // Sahifani yangilanishini to'xtatish
        $('.search_input').each(function () {
            $(this).val('');
        });
        $('.search_overlay').hide(); // Elementni yashirish
        $('.search_icon').show();
        $('.search_clear').hide();
    });

    // mobile search
    $(".mobile_search_back").on('click', function (e) {
        e.preventDefault();
        $(".mobile_search_block").removeClass('active')
        $('.search_input').each(function () {
            $(this).val('');
        });
        $(".search_suggestions").empty();
        $('body').removeClass('overlay');
        $('.search_overlay').hide(); // Elementni yashirish
    })
    $(".mobile_search button").on('click', function (e) {
        e.preventDefault();
        $(".mobile_search_block").addClass('active')
    })

    // Mobile filter toggling
    $(".show_filter").on('click', function (e) {
        e.preventDefault();
        $(".catalog_left").addClass('active');
        $(".filter_overlay").show();
        $("body").addClass("overlay");
    });

    // Mobile filter back button or clicking on filter_overlay
    $(document).on('click', '.mobile_filter_back, .filter_overlay', function (e) {
        e.preventDefault();
        $(".catalog_left").removeClass('active');
        $(".filter_overlay").hide();
        $("body").removeClass("overlay");
        $(".modal").hide();
    });




    // BLOG NEWS swiper
    if ($(window).width() <= 576) {
        // Mavjud elementlarni olamiz
        const $newsBlock = $(".blog_news .news_block");
        const $newsItems = $(".blog_news .news_block .news_item");

        // Swiper uchun yangi tuzilma yaratamiz
        const $swiperWrapper = $('<div class="swiper-wrapper"></div>');

        $newsItems.each(function () {
            // Har bir .news_item'ni swiper-slide ichiga joylashtiramiz
            const $swiperSlide = $('<div class="swiper-slide"></div>');
            $swiperSlide.append($(this)); // .news_item ni joylashtirish
            $swiperWrapper.append($swiperSlide);
        });

        // Swiper konteynerini yaratamiz
        const $swiperContainer = $('<div class="swiper"></div>');
        $swiperContainer.append($swiperWrapper);

        // Yangi struktura news_block o'rniga joylashtiriladi
        $newsBlock.replaceWith($swiperContainer);

        // Swiperni ishga tushiramiz
        const swiper = new Swiper('.swiper', {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 16,
        });
    }


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
            320: { // Ekran kengligi 320px va undan yuqori
                loop: false,
                slidesPerView: "auto", // Ko'rinadigan slaydlar soni
                centeredSlides: true, // Slayd markazga joylashadi
                spaceBetween: 10, // Slaydlar orasidagi masofa
            },
            768: {
                // slidesPerView: 2,
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 30,
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
    // OUR PRODUCT SWIPER
    var ourProductsSwiper = new Swiper(".ourProductsSwiper", {
        loop: false,
        slidesPerView: "auto", // Ko'rinadigan slaydlar soni
        centeredSlides: true, // Slayd markazga joylashadi
        spaceBetween: 10, // Slaydlar orasidagi masofa
        pagination: {
            el: ".our_products_pagination",
            type: "progressbar",
        },
        speed: 1000,
    });
    // NEWS SWIPER
    var newsSwiper = new Swiper(".newsSwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 16,
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
        breakpoints: {
            320: { // Ekran kengligi 320px va undan yuqori
                loop: false,
                slidesPerView: "auto", // Ko'rinadigan slaydlar soni
                centeredSlides: true, // Slayd markazga joylashadi
                spaceBetween: 10, // Slaydlar orasidagi masofa
                pagination: {
                    el: ".reviews_swiper_pagination",
                    clickable: false,
                    type: "progressbar"
                },
            },
        }
    });

    //   single gallery swiper
    var singleGallerySwiper = new Swiper(".singleGallerySwiper", {
        loop: false,
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        direction: "vertical",
    });
    var singleSwiper = new Swiper(".singleSwiper", {
        loop: false,
        spaceBetween: 10,
        navigation: {
            nextEl: ".single_swiper_next",
            prevEl: ".single_swiper_prev",
        },
        thumbs: {
            swiper: singleGallerySwiper,
        },
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
    $('.filterCheckbox').each(function () {
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
    $('.filterCheckbox').change(function () {
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
    $(".reset_filter").click(function () {
        $('.filterCheckbox').prop('checked', false);  // Barcha checkbox'larni uncheck qilish

        // Barcha .desc ranglarini va font weight'larini asl holatiga qaytarish
        $('.filterCheckbox').each(function () {
            var $checkbox = $(this);
            var $desc = $checkbox.closest('li').find('.desc'); // .desc ni topish

            // Rang va font weightni asl holatiga qaytarish
            $desc.css('color', '#6F7984'); // Asl rangini qaytarish
            $desc.css('font-weight', '500'); // Asl font weightni qaytarish
        });

        // Reset filter tugmasini bosganda, .show_all elementiga active klassini qo'shish
        $(".catalog_filter_main .show_all").addClass('active');
    });


    // SINGLE TAB
    $('.tab_content:first').show()
    $('.tab_navigation li:first').addClass('active')

    $('.tab_navigation li').click(function (event) {
        index = $(this).index();
        $('.tab_navigation li').removeClass('active')
        $(this).addClass('active')
        $('.tab_content').hide()
        $('.tab_content').eq(index).show()
    })

    // CUSTOM MODAL
    $(".reviews_send a").on('click', function () {
        $("body").addClass("overlay");
        $(".modal_box").fadeIn();
        $(".modal_box").fadeIn(); // Modalni ko'rsatish
        $(".commend_modal").show();
    });
    $(".read_full_blog").on('click', function () {
        $("body").addClass("overlay");
        $(".modal_box").fadeIn();
        $(".modal_box").fadeIn(); // Modalni ko'rsatish
        $(".commend_modal").show();
    });
    $(document).on('click', ".modal_close", ".modal_box", function () {
        $("body").removeClass("overlay");
        $(".modal_box").fadeOut();
        $(".modal_box").fadeOut(); // Modalni ko'rsatish
        $(".modal").hide();
    });

    // CUSTOM SELECT
    $(".custom-select").each(function () {
        var classes = $(this).attr("class"),
            id = $(this).attr("id"),
            name = $(this).attr("name");
        var template = '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function () {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function () {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function () {
        $('html').one('click', function () {
            $(".custom-select").removeClass("opened");
            $(".product_select_label").removeClass('active');
        });
        $(this).parents(".custom-select").toggleClass("opened");
        $(".product_select_label").toggleClass('active');
        event.stopPropagation();
    });
    $(".custom-option").on("click", function () {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });


    // BLOG MODAL TEXT SCROLL PROGRESS
    function progressBarScroll() {
        let scrollTop = $(".blog_modal_body").scrollTop(),
            scrollHeight = $(".blog_modal_body")[0].scrollHeight - $(".blog_modal_body").outerHeight(),
            scrolled = (scrollTop / scrollHeight) * 100;
        $("#progressBar").css("width", scrolled + "%");
    }

    $(".blog_modal_body").on("scroll", function () {
        progressBarScroll();
    });

    // Blog copy tugmasini va "Saqlandi" elementini aniqlash
    const $copyButton = $(".blog_copy_btn");
    const $copySuccess = $(".copy_success");

    $copyButton.on("click", function () {
        // "Saqlandi" matnini buferga yozish
        navigator.clipboard.writeText("Saqlandi").then(function () {
            // Agar animatsiya ishlayotgan bo'lsa, to'xtatib qayta ishga tushirish
            $copySuccess.stop(true, true);

            // "Saqlandi" alertini animatsiya bilan ko'rsatish
            $copySuccess
                .css({ display: "flex" }) // Ko'rinadigan qilish
                .hide() // Dastlab yashirish
                .fadeIn(500) // Sekin-asta chiqish (500ms)
                .delay(2000) // 2 soniya davomida ko'rinib turish
                .fadeOut(1500); // Sekin-asta yo'qolish (1500ms)
        }).catch(function (err) {
            console.error("Matnni nusxalashda xatolik yuz berdi: ", err);
        });
    });
});