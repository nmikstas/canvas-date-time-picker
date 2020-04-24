let scrollLink, scrollArray, subsections;

let doScroll = () =>
{
    let scrollLocation = $(this).scrollTop();    
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

//Listener for month view next button.
let monthNextClickCb = (e) =>
{
    $("#oldYear1").text(e.oldYear);
    $("#oldMonth1").text(e.oldMonth);
    $("#newYear1").text(e.newYear);
    $("#newMonth1").text(e.newMonth);
}
new CanvDTP(document.getElementById("monthNextClickCb"), {monthNextClickCb: monthNextClickCb});

//Listener for month view previous button.
let monthPrevClickCb = (e) =>
{
    $("#oldYear2").text(e.oldYear);
    $("#oldMonth2").text(e.oldMonth);
    $("#newYear2").text(e.newYear);
    $("#newMonth2").text(e.newMonth);
}
new CanvDTP(document.getElementById("monthPrevClickCb"), {monthPrevClickCb: monthPrevClickCb});

//Listener for year view next button.
let yearNextClickCb = (e) =>
{
    $("#oldYear3").text(e.oldYear);
    $("#newYear3").text(e.newYear);
}
new CanvDTP(document.getElementById("yearNextClickCb"), {yearNextClickCb: yearNextClickCb});

//Listener for year view previous button.
let yearPrevClickCb = (e) =>
{
    $("#oldYear4").text(e.oldYear);
    $("#newYear4").text(e.newYear);
}
new CanvDTP(document.getElementById("yearPrevClickCb"), {yearPrevClickCb: yearPrevClickCb});

//Listener for decade view next button.
let decadeNextClickCb = (e) =>
{
    $("#oldDecade1").text(e.oldDecade);
    $("#newDecade1").text(e.newDecade);
}
new CanvDTP(document.getElementById("decadeNextClickCb"), {decadeNextClickCb: decadeNextClickCb});

//Listener for decade view previous button.
let decadePrevClickCb = (e) =>
{
    $("#oldDecade2").text(e.oldDecade);
    $("#newDecade2").text(e.newDecade);
}
new CanvDTP(document.getElementById("decadePrevClickCb"), {decadePrevClickCb: decadePrevClickCb});

//Listener for century view next button.
let centuryNextClickCb = (e) =>
{
    $("#oldCentury1").text(e.oldCentury);
    $("#newCentury1").text(e.newCentury);
}
new CanvDTP(document.getElementById("centuryNextClickCb"), {centuryNextClickCb: centuryNextClickCb});

//Listener for century view previous button.
let centuryPrevClickCb = (e) =>
{
    $("#oldCentury2").text(e.oldCentury);
    $("#newCentury2").text(e.newCentury);
}
new CanvDTP(document.getElementById("centuryPrevClickCb"), {centuryPrevClickCb: centuryPrevClickCb});
