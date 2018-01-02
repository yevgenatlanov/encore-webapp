// here we will build pages
$(document).ready(function () {

    //ok here we go :)
    $(".dropdown-button").dropdown();

    $.getJSON("../../app.json", function (json) {
        //console.log(json);


        // some magic here 
        // first off all we need to render header and home page

        $("#logo-container img").attr("src", json.app_logo);
        // now we move to nav
        var pages = json.pages;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].name === "Products") {
                $("#navigation").append("<li data-id=" + i + "><a class='dropdown-button' data-activates='dropdown1' href='#!'>" + pages[i].name + "</a></li>");
            } else {
                $("#navigation").append("<li data-id=" + i + "><a>" + pages[i].name + "</a></li>");
            }
        }

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
                        $("#" + collection.slug +" .header").html(collection.title);
                        $("#" + collection.slug +" p").html(collection.description);
                        $("#" + collection.slug +" img").attr("src", "assets/dev/collection-headers/" + collection.mainImage);                        
                    }
                }
            }
        }
    });
});