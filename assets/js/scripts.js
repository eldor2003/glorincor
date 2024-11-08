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
        $('.search_overlay').show(); // Elementni ko'rsatish
        $('.search_icon').hide();
        $('.search_clear').show();
    });
    
    $('.search_overlay').on('click', function() {
        $('.search_overlay').hide(); // Elementni yashirish
        $('.search_icon').show();
        $('.search_clear').hide();
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

    $("#search").on("input", function() {
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
        $("#search").val($(this).text());
        $(".search_suggestions").hide(); // Natijalarni yashirish
        $('.search_clear').show();       // Clear tugmasini ko'rsatish
        $('.search_icon').hide();        // Ikonkani yashirish
    });

    // Clear tugmasiga bosilganda inputni tozalash
    $(".search_clear").on('click', function(e) {
        e.preventDefault();
        $("#search").val('');    
        $(".search_suggestions").hide(); // Tavsiyalarni yashirish
        $('.search_clear').hide();       // Clear tugmasini yashirish
        $('.search_icon').show();        // Ikonkani ko'rsatish
    });


    $(".search_clear").on('click', function(e) {
        e.preventDefault();            // Sahifani yangilanishini to'xtatish
        $("#search").val('');    
        $('.search_overlay').hide(); // Elementni yashirish
        $('.search_icon').show();
        $('.search_clear').hide();
    });

    // mobile search
    $(".mobile_search_back").on('click', function(e){
        e.preventDefault();
        $(".mobile_search_block").removeClass('active')
    })
    $(".mobile_search button").on('click', function(e){
        e.preventDefault();
        $(".mobile_search_block").addClass('active')
    })
});