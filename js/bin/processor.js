// here we will build pages
$(document).ready(function () {

    //ok here we go :)
    // $(".dropdown-button").dropdown();
    //$(".dropdown-button").dropdown();



    $.getJSON("../../app.json", function (json) {
        //console.log(json);


        // some magic here 
        // first off all we need to render header and home page


        // now we move to nav
        var pages = json.pages;
        // for (var i = 0; i < pages.length; i++) {
        //     if (pages[i].name === "Products") {
        //         $("#navigation").append("<li data-id=" + i + "><a class='dropdown-button' data-activates='dropdown1' href='#!'>" + pages[i].name + "</a></li>");
        //     } else {
        //         $("#navigation").append("<li data-id=" + i + "><a>" + pages[i].name + "</a></li>");
        //     }
        // }

        // and now we can render home page :)
        pageRender(0);
        $("#preloader")
            .delay(1000)
            .fadeOut();
        // that`s all )) 




        // actually no

        // navigation controller 
        $(document).on("click", "#navigation li", function () {
            var page_id = $(this).attr("data-id");
            pageRender(page_id);
            $("#preloader").fadeIn("slow");
            $("#preloader")
                .delay(1000)
                .fadeOut();


        });

        // functions 
        function pageRender(id) {
            $("#magic-nav").load("nav.html");
            $("#magic-footer").load("footer.html");

            $("#navigation li").removeClass("active");
            $("#navigation li[data-id=" + id + "]").addClass("active");



            var page = json.pages[id];
            $("title").html(page.title);

            var sections = page.sections;
            var collections = json.collections;

            for (var j = 0; j < sections.length; j++) {

                var section = page.sections[j];

                $("#" + section.type + " .header").html(section.title);
                $("#" + section.type + " .flow-text").html(section.description);

                if (section.image != "undefined") {
                    $("#" + section.type + " img").attr("src", "assets/dev/" + section.image);
                }

                // section collections update

                if (section.type === "collections") {
                    for (var c = 0; c < collections.length; c++) {
                        var collection = collections[c];
                        $("#" + collection.slug + " .header").html(collection.title);
                        $("#" + collection.slug + " p").html(collection.description);
                        $("#" + collection.slug + " img").attr("src", "assets/dev/collection-headers/" + collection.mainImage);
                    }
                }
            }
        }


        // lets try to echo collection

        var coll = json.collections;

        var title = $(".title-area b").html();

        for (var c = 0; c < coll.length; c++) {
            var items = coll[c];
            if (title === items.title) {
                var products = items.categories[0].items;
              
                for (var it = 0; it < products.length; it++) {

                    var item = products[it];
                  
                  
                    if (products.lengt <= 4 ) {
                        $("#VintageCuriosity .items").append(`<div data-id="${it}" class="item"><div class="col s3"><div class="card"><div class="card-image parallax"><img  class="materialboxed parallax" data-caption="${item.name}" src="assets/${item.image}"></div><div class="card-content"><p>${item.name}<br>${item.size}</p></div></div></div></div>`);
                    
                    } else {
                        $("#VintageCuriosity .items").append(`<div data-id="${it}" class="item"><div class="col s2"><div class="card"><div class="card-image parallax"><img class="materialboxed parallax" data-caption="${item.name}" src="assets/${item.image}"></div><div class="card-content"><p>${item.name}<br>${item.size}</p></div></div></div></div>`);
                    }



                }

                var Lithia = items.categories[1].items;
                
                for (var lc = 0; lc < Lithia.length; lc++) {

                    var litem = Lithia[lc];
                  
                  
                 
                    $("#LithiaPark .items").append(`<div data-id="${lc}" class="item"><div class="col s2"><div class="card"><div class="card-image"><img  class="materialboxed " data-caption="${litem.name}" src="assets/${litem.image}"></div><div class="card-content"><p>${litem.name}<br>${litem.size}</p></div></div></div></div>`);
                    
                   



                }
            }

        }

    });
});