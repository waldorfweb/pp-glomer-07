$(document).ready(function() {
    //Kategorieseite Beschreibung button
    $('.widget_kat_description_2').attr('id', 'secondDesc');
    $('.category-description').after('<a class="weiterlesena" href="#secondDesc"><button type="button" data-dismiss="modal" aria-label="weiter"  class="btn btn-outline-primary btn-medium mr-2 weiterlesen"> <i aria-hidden="true" class="fa fa-chevron-right"></i> weiterlesen </button></a>');


    $("ul.mainmenu > li > a").each(function() {
        $(this).html($(this).text().replace('&', "&<br>", 'g'));
        $(this).html($(this).html().replace(')', ")<br>", 'g'));
        $(this).html($(this).html().replace(',', ",<br>", 'g'));
        //$(this).text($(this).text().replace(/,/g, ",<br>")); 
        //$(this).text($(this).text().replace(/\)/g, ")<br>")); 
        //$(this).text($(this).text().replace(/&amp;/g, '&<br>');
    });

    $(".search-input ").attr("placeholder", "Suche: Titel, Autor, Stichwort, ISBN, GA");
    //$('.single .row .col .widget-two-col:nth-child(2), .single .row .col .widget:nth-child(3)').remove('h1');
    //Bugfix Single Owl-Carousel if only one image
    $('.page-singleitem .owl-stage').each(function() {
        if ($('> div', this).length === 1) {
            console.log('gleich 1');
            $('.page-singleitem .owl-thumbs').css('display', 'none');
            $('.page-singleitem .owl-thumbs').hide();
        } else {}
    });


    //add weiter einkaufen button
    function addweitereinkaufen() {
        setTimeout(function() {
            if ($(".weitereinkaufen").length) {
                //console.log('exist');
            } else {
                $('#add-item-to-basket-overlay .modal-footer').prepend('<button type="button" data-dismiss="modal" aria-label="Close"  class="btn btn-outline-primary btn-medium mr-2 weitereinkaufen"> <i aria-hidden="true" class="fa fa-shopping-bag"></i> weiter einkaufen </button>');
            }
        }, 1000);
    }
    $(".add-to-basket-container .btn").on("click", addweitereinkaufen);
    $(".add-to-basket-lg-container").on("click", addweitereinkaufen);


    //Warenkorb
    // OrderTotals find and replace - patch PMs Mehrsprachigkeit
    // $("dt").text(function(index, text) {
    //     //alert('test');
    //     var text = $(this).text();
    //     $('dt:contains("Warenwert ((Brutto))")').text('Warenwert (Brutto)');
    //     $('dt:contains("Warenwert ((Netto))")').text('Warenwert (Netto)');
    //     $('dt:contains("Versandkosten ((Brutto))")').text('Versandkosten (Brutto)');
    //     $('dt:contains("Versandkosten ((Netto))")').text('Versandkosten (Netto)');
    //     $('dt:contains("Gesamtsumme ((Brutto))")').text('Gesamtsumme (Brutto)');
    //     $('dt:contains("Gesamtsumme ((Netto))")').text('Gesamtsumme (Netto)');
    // });

    //Warenkorb Slidin - weiter einkaufen

    function addweitereinkaufen_cart() {

        // OrderTotals find and replace - patch PMs Mehrsprachigkeit
        // $("dt").text(function(index, text) {
        //     //alert('test');
        //     var text = $(this).text();
        //     $('dt:contains("Warenwert ((Brutto))")').text('Warenwert (Brutto)');
        //     $('dt:contains("Warenwert ((Netto))")').text('Warenwert (Netto)');
        //     $('dt:contains("Versandkosten ((Brutto))")').text('Versandkosten (Brutto)');
        //     $('dt:contains("Versandkosten ((Netto))")').text('Versandkosten (Netto)');
        //     $('dt:contains("Gesamtsumme ((Brutto))")').text('Gesamtsumme (Brutto)');
        //     $('dt:contains("Gesamtsumme ((Netto))")').text('Gesamtsumme (Netto)');
        // });

        setTimeout(function() {
            if ($(".weitereinkaufen_cart").length) {
                //console.log('exist');
                // Close Warenkorbpreview
                function addweitereinkaufencc() {
                    //console.log('close first');
                    $(".open-right").show("slide", { direction: "right" }, 1000);
                }
                $(".weitereinkaufen_cart").on("click", addweitereinkaufencc);
            } else {
                $('.basket-preview-footer').prepend('<button type="button" data-dismiss="modal" aria-label="Close"  class="btn btn-outline-primary btn-medium mr-2 weitereinkaufen weitereinkaufen_cart"> <i aria-hidden="true" class="fa fa-shopping-bag"></i> weiter einkaufen </button>');
                // Close Warenkorbpreview
                function addweitereinkaufencc() {
                    //console.log('close last');
                    $('body').removeClass('basket-open');
                    $(".open-right").show("slide", { direction: "right" }, 1000);
                }
                $(".weitereinkaufen_cart").on("click", addweitereinkaufencc);
            }
        }, 1000);
    }
    $(".toggle-basket-preview").on("click", addweitereinkaufen_cart);




});
// Document Ready End