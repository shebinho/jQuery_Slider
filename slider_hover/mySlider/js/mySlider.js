$.fn.mySlider = function (otpions) {
    // console.log("My first plugin");
    let defaultOptions = {
        auto: true,
        navLinks: true,
        navLinksPosition: "above"
    }

    let opt = $.extend({}, defaultOptions, otpions);
    // console.log(opt);


    $(this).each(function (index, item) {
        let activeSlide = 0;
        let navLinks, ul,interva;

        let slider = $(item);
        let imgs = slider.find("img");
        let wrapper = $("<div>").attr("class", "wrapper");
        imgs.wrapAll(wrapper);

        imgs.each(function (i, img) {
            let content = $("<div>")
                .attr("class", "content")
                .attr("data-id", i);
            $(img).wrapAll(content);
        });
        if (opt.navLinks === true) {

            navLinks = $("<div class='navLinks'>");
             ul = $("<ul>").appendTo(navLinks);
            for (let i = 0; i < imgs.length; i++) {
                $("<li>")
                    .attr("class", "itemLinks")
                    .attr("data-id", i)
                    .on("click", function () {
                        activeSlide = i;
                        removeActive();
                        setActive();

                    })
                    .appendTo(ul);
            }

             //after the wrapper element
            switch (opt.navLinksPosition) {
                case "above":
                    slider.prepend(navLinks);
                    break;
                case "bellow":
                default:
                    slider.append(navLinks);
                    break;
            }
        }
       

        // slider.append(navLinks);

        function removeActive() {
            $(".active").removeClass("active");
        }

        function setActive() {
            //select the image
            slider.children(".wrapper").find('[data-id="' + activeSlide + '"]').addClass('active');
            //select the link
            if (navLinks != undefined) {
                navLinks.find(`[data-id="${activeSlide}"]`).addClass('active');
            }
        }
        setActive();
        if (opt.auto === true) {
           intervar = setInterval(function () {
                if (activeSlide < imgs.length - 1) {
                    activeSlide++;
                } else {
                    activeSlide = 0;
                }

                removeActive();
                setActive();
            }, 1500);
        }
        // clearInterval(interval); -za domasna pomosna funkcija
        //intervall = null;
        //console.log(interval);
    });
    //in order to be able to do chaining
    return $(this);
}