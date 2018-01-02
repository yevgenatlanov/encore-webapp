$(document).ready(function () {
    $.getJSON("../../app.json", function (json) {
        console.log(json);


        // starting from logo 

        $("#logo-container img").attr("src", json.app_logo);

        // now we move to nav
        var i; 
        var pages = json.pages;
      
        for(i = 0; i < pages.length; i++) {
            $("#navigation").append("<li data-id=" + i + "><a>" + json.pages[i].name + "</a></li>");
        }

        // now lets parse homepage

        var home = json.pages[0];
        $("title").html(home.title);
        //console.log(home);
        //sections

        
        function parsePage(id) {
            
            var page = json.pages[id];
            $("title").html(page.title);
                
        }

        var sections = home.sections;
        for(var j = 0; j < sections.length; j++) {

            var section = home.sections[j];
            $("#"+ section.type + " .header").html(section.title);
            $("#"+ section.type + " .flow-text").html(section.description);

            if (section.image != "undefined") {
                $("#"+ section.type + " img").attr("src", "assets/dev/" + section.image);
            }

        }
    });
});