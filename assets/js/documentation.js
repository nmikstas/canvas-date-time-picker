let scrollLink, scrollArray, subsections;

let doScroll = () =>
{
    //Scroll the navbar with the document.
    let headerHeight = $(".header-class").outerHeight();
    let scrollLocation = $(this).scrollTop();
    let containerPosition = $(".doc-container").offset().top;
    let navPadding = (scrollLocation > containerPosition) ? scrollLocation : containerPosition;
    $(".sidenav").css({marginTop: navPadding - headerHeight, left: 200}); 
    
    let index = 0;
    let latched = false;

    for(let i = 0; i < scrollLink.length; i++)
    {
        let sectionOffset = $(scrollLink[i].hash).offset().top - 20;

        if (sectionOffset >= scrollLocation)
        {
            if(!latched)
            {
                latched = true;
                index = i - 1;
            }
        }
    }

    let parentDiv;

    for(let i = 0; i < scrollLink.length; i++)
    {
        if(index === i)
        {
            $(scrollLink[i]).addClass("active");
            if($(scrollLink[i]).hasClass("subsection-link"))
            {
                parentDiv = $(scrollLink[i]).parent().attr("id");
            }
            else
            {
                parentDiv = $(scrollLink[i]).attr("subclass");
            }
        }
        else
        {
            $(scrollLink[i]).removeClass("active");
        }
    }

    for(let i = 0; i < subsections.length; i++)
    {
        thisDiv = $(subsections[i]).attr("id");
        if(parentDiv === thisDiv)
        {
            $(subsections[i]).addClass("show-div");
            $(subsections[i]).removeClass("hide-div");
        }
        else
        {
            $(subsections[i]).addClass("hide-div");
            $(subsections[i]).removeClass("show-div");
        }
    }
}

$(document).ready(() =>
{
    scrollLink = $(".scroll-link");
    scrollArray = new Array(scrollLink.length);
    subsections = $(".subsection");

    $(window).scroll(() => doScroll());
    doScroll();
});

let calcEaster = () =>
{
    let year = parseInt($("#easter-text").val());
    if(!year) return;
    let date = CanvDTP.getEaster(year);
    if(date.month === -1)
    {
        $("#easter-month").text(-1);
        $("#easter-day").text(-1);
        return;
    }
    $("#easter-month").text(date.month === 3 ? "March" : "April");
    $("#easter-day").text(date.day);
}

let calcThanksgiving = () =>
{
    let year = parseInt($("#thanksgiving-text").val());
    if(!year) return;
    let date = CanvDTP.getThanksgiving(year);
    $("#thanksgiving-month").text("November");
    $("#thanksgiving-day").text(date.day);
}

let calcMLK = () =>
{
    let year = parseInt($("#mlk-text").val());
    if(!year) return;
    let date = CanvDTP.getMLK(year);
    $("#mlk-month").text("January");
    $("#mlk-day").text(date.day);
}

let calcMothers = () =>
{
    let year = parseInt($("#mothers-text").val());
    if(!year) return;
    let date = CanvDTP.getMothers(year);
    $("#mothers-month").text("May");
    $("#mothers-day").text(date.day);
}

let calcFathers = () =>
{
    let year = parseInt($("#fathers-text").val());
    if(!year) return;
    let date = CanvDTP.getFathers(year);
    $("#fathers-month").text("June");
    $("#fathers-day").text(date.day);
}

let calcWashington = () =>
{
    let year = parseInt($("#washington-text").val());
    if(!year) return;
    let date = CanvDTP.getWashington(year);
    $("#washington-month").text("January");
    $("#washington-day").text(date.day);
}

let calcMemorial = () =>
{
    let year = parseInt($("#memorial-text").val());
    if(!year) return;
    let date = CanvDTP.getMemorial(year);
    $("#memorial-month").text("May");
    $("#memorial-day").text(date.day);
}

let calcLabor = () =>
{
    let year = parseInt($("#labor-text").val());
    if(!year) return;
    let date = CanvDTP.getLabor(year);
    $("#labor-month").text("September");
    $("#labor-day").text(date.day);
}

let calcColumbus = () =>
{
    let year = parseInt($("#columbus-text").val());
    if(!year) return;
    let date = CanvDTP.getColumbus(year);
    $("#columbus-month").text("October");
    $("#columbus-day").text(date.day);
}
