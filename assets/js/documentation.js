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



//Intro DTP.
new CanvDTP(document.getElementById("intro-dtp"));

//Not collapsible, top.
new CanvDTP(document.getElementById("dtp1"), {bodyPosition: CanvDTP.POS_TOPRIGHT, isCollapsible: false, zIndex: 0});

//Not collapsible bottom.
new CanvDTP(document.getElementById("dtp2"), {bodyPosition: CanvDTP.POS_BOTRIGHT, isCollapsible: false, zIndex: 0});

//Not collapsible, not textbox.
new CanvDTP(document.getElementById("dtp3-hidden"), {bodyPosition: CanvDTP.POS_TOPRIGHT, isCollapsible: false, zIndex: 0});

//Bottom right picker.
new CanvDTP(document.getElementById("dtp4"), {bodyPosition: CanvDTP.POS_BOTRIGHT});

//Top left picker.
new CanvDTP(document.getElementById("dtp5"), {bodyPosition: CanvDTP.POS_TOPLEFT});

//Top right picker.
new CanvDTP(document.getElementById("dtp6"), {bodyPosition: CanvDTP.POS_TOPRIGHT});

//250 pixels max.
new CanvDTP(document.getElementById("dtp7"), {maxPixelWidth: 250});

//No animation.
new CanvDTP(document.getElementById("dtp11"), {isAnimated: false});

//Date picker only.
new CanvDTP(document.getElementById("dtp13"), {pickerType: CanvDTP.PICK_DATE});

//Time picker only.
new CanvDTP(document.getElementById("dtp14"), {pickerType: CanvDTP.PICK_TIME});

//Custom date/time string.
new CanvDTP(document.getElementById("dtp18"), {dateTimeFormat: "dddd, MMMM Do YYYY, h:mm A"});

//Arial black font style.
new CanvDTP(document.getElementById("dtp19"), {fontStyle: "Arial Black", bannerScale: .70, yearScale: .55});

//Comic Sans font style.
new CanvDTP(document.getElementById("dtp20"), {fontStyle: "Comic Sans MS", bannerScale: .70, yearScale: .55});

//Lucinda Console font style.
new CanvDTP(document.getElementById("dtp21"), {fontStyle: "Lucida Console", bannerScale: .70, yearScale: .55});

//Auto pick disabled.
new CanvDTP(document.getElementById("dtp22"), {autoPick: false});

//No calendar icon.
new CanvDTP(document.getElementById("dtp23"), {calendarIcon: false});

//Alternate text colors.
new CanvDTP(document.getElementById("dtp24"), {textMainColorn: "#0000ff", textMainColorh: "#00ffff",
    textAltColorn: "#ff0000", textAltColorh: "#ffff00"});

//Month, year and decade views.
new CanvDTP(document.getElementById("dtp25"), {topView: CanvDTP.CAL_DECADE});

//Month, and year views.
new CanvDTP(document.getElementById("dtp26"), {topView: CanvDTP.CAL_YEAR});

//Month only view.
new CanvDTP(document.getElementById("dtp27"), {topView: CanvDTP.CAL_MONTH});

//First date Jan 1, 2000, Last date Dec 31, 2030.
new CanvDTP(document.getElementById("dtp28"), {firstDate: {month: CanvDTP.JANUARY, day: 1, year: 2000},
    lastDate: {month: CanvDTP.DECEMBER, day: 31, year: 2030}});

//Default date Date Dec 25, 1980.
new CanvDTP(document.getElementById("dtp29"), {initDate: {month: CanvDTP.DECEMBER, day: 25, year: 1980}});

//Custom Month Background Images.
new CanvDTP(document.getElementById("dtp30"),
{
    monthImages:
    [
        {image: document.getElementById("january"), opacity: 0.4},
        {image: document.getElementById("february"), opacity: 0.4},
        {image: document.getElementById("march"), opacity: 0.4},
        {image: document.getElementById("april"), opacity: 0.4},
        {image: document.getElementById("may"), opacity: 0.4},
        {image: document.getElementById("june"), opacity: 0.4},
        {image: document.getElementById("july"), opacity: 0.4},
        {image: document.getElementById("august"), opacity: 0.4},
        {image: document.getElementById("september"), opacity: 0.4},
        {image: document.getElementById("october"), opacity: 0.4},
        {image: document.getElementById("november"), opacity: 0.4},
        {image: document.getElementById("december"), opacity: 0.4},
    ]
});

//Debug enabled.
new CanvDTP(document.getElementById("dtp31"), {debug: true});

//Modified z-index.
new CanvDTP(document.getElementById("dtp32"), {zIndex: 0});

//Month Days Excluded, Weekends Whitelisted.
new CanvDTP(document.getElementById("dtp33"),
{
    dayExcludeArray: 
    [
        {
            excluded: true,
            color: "#ff000080",
            info: "All Weekdays Excluded"
        }
    ],
    dayWhiteArray:
    [
        {   //Whitelist the weekends in May from exclusion.
            daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY], 
            type: CanvDTP.WHITE_BLOCK
        }
    ]
});

//Weekends spotlighted.
new CanvDTP(document.getElementById("dtp34"),
{
    dayExcludeArray: 
    [
        {
            daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY], 
            color: "#0000ff50"
        }
    ]
});

//1/1/2020, 12/31/2021 Excluded.
new CanvDTP(document.getElementById("dtp35"),
{
    dayExcludeArray: 
    [
        {
            days: [1],
            months: [1],
            years: [2020],
            excluded: true,
            color: "#ff0000",
            info: "New Year's Excluded"
        },
        {
            days: [31],
            months: [12],
            years: [2021],
            excluded: true,
            color: "#ff0000",
            info: "Date Excluded"
        },
    ]
});

//Mondays and Wednesdays Spotlighted Except in Februarys.
new CanvDTP(document.getElementById("dtp36"),
{
    dayExcludeArray: 
    [
        {
            daysOfWeek: [CanvDTP.MONDAY, CanvDTP.WEDNESDAY],
            color: "#00ff00",
            info: "Spotlighted Day"
        }
    ],
    dayWhiteArray:
    [
        {   
            months: [CanvDTP.FEBRUARY], 
            type: CanvDTP.WHITE_SPTLT
        }
    ]
});

//All Months Spotlighted, January Whitelisted
new CanvDTP(document.getElementById("dtp37"),
{
    monthSpotlightArray: 
    [
        {
            color: "#00ff00",
            info: "Spotlighted Month"
        }
    ],
    monthWhiteArray:
    [
        {   
            months: [CanvDTP.JANUARY], 
        }
    ]
});

//January, March in 2020 Spotlighted.
new CanvDTP(document.getElementById("dtp38"),
{
    monthSpotlightArray: 
    [
        {
            months: [CanvDTP.JANUARY, CanvDTP.MARCH],
            years: [2020],
            color: "#00ffff",
            info: "Another Spotlighted Month"
        }
    ]
});

//July Spotlighted in All Years.
new CanvDTP(document.getElementById("dtp39"),
{
    monthSpotlightArray: 
    [
        {
            months: [CanvDTP.JULY],
            color: "#0000ff80",
            info: "July"
        }
    ]
});

//Today's date indicator disabled.
new CanvDTP(document.getElementById("dtp40"), {todaysDate: false});

//Years 2010 - 2029 Spotlighted.
new CanvDTP(document.getElementById("dtp41"),
{
    yearSpotlightArray: 
    [
        {
            years: [2010, 2011,  2012,  2013,  2014,  2015,  2016,  2017,  2018,  2019,
                    2020, 2021,  2022,  2023,  2024,  2025,  2026,  2027,  2028,  2029],
            color: "#ff00ff",
            info: "Spotlighted Years"
        }
    ]
});

//All Years Spotlighted, 2010 - 2029 Whitelisted.
new CanvDTP(document.getElementById("dtp42"),
{
    yearSpotlightArray: 
    [
        {
            color: "#ffff00",
            info: "More Spotlighted Years"
        }
    ],
    yearWhiteArray:
    [
        {
            years: [2010, 2011,  2012,  2013,  2014,  2015,  2016,  2017,  2018,  2019,
                    2020, 2021,  2022,  2023,  2024,  2025,  2026,  2027,  2028,  2029],
        }
    ]
});

//Custom Calendar Icon Parameters.
new CanvDTP(document.getElementById("dtp43"),
{
    iBorderColorn: "#0000ff", iFillColorn: "#c000c0", iCalColorn: "#00ff00", iBorderColorh: "#ff0000",
    iFillColorh: "#30ff30", iCalColorh: "#ff00ff", iBorderRadius: 0, iBorderWeight: .10,
    iXPadding: .15, iYPadding: .15, iLineWidth: .001
});

//Custom Body Canvas Parameters.
new CanvDTP(document.getElementById("dtp44"),
{
    bBorderColor: "#0000ff", bFillColor: "#d0d0fff0", bBorderRadius: 0.5,
    bBorderWeight: .001, bXPadding: .15, bYPadding: .40, bLineWidth: .2
});

//Custom Info Text Parameters.
new CanvDTP(document.getElementById("dtp45"),
{
    infoPointerSize: "75px",
    infoBackColor: "#c0c000",
    infoTextColor: "#ff0000",
    infoPadding: "2px, 5px",
    infoWidth: "150px",
    infoBorderRadius: "10px 10px 0px 0px",
    dayExcludeArray: 
    [
        {
            daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY], 
            color: "#0000ff80",
            info: "Weekend Days Spotlighted"
        }
    ]
});

//Custom Selectable Items Parameters.
new CanvDTP(document.getElementById("dtp46"),
{
    selectBorderColor: "#ff0000", selectFillColor: "#80000040", selectRadius: .50, selectWeight: .01
});

//Custom Previous/Next Parameters.
new CanvDTP(document.getElementById("dtp47"), {prevNextXPad: 0, prevNextYPad: .35});

//Custom Clock Graphic Parameters.
new CanvDTP(document.getElementById("dtp48"), {clockPad: .20, clockWeight: .15});

//Custom Calendar Graphic Parameters.
new CanvDTP(document.getElementById("dtp49"), {calXPadding: .001, calYPadding: .20, calLineWidth: .015});

//Custom Days of Week Header Parameters.
new CanvDTP(document.getElementById("dtp50"), {headerColor: "#ffff00", headerScale: .40});

//Custom Currently Selected Day Parameters.
new CanvDTP(document.getElementById("dtp51"),
{
    currentBorderColor: "#ff0000", currentFillColor: "#d0000080", currentRadius: .50, currentWeight: .10
});

//Custom Today's Date Parameters.
new CanvDTP(document.getElementById("dtp52"), {nowColor: "#0000ff", nowWeight: .30});

//Custom Increment/Decrement Parameters.
new CanvDTP(document.getElementById("dtp53"), {incXPad: .40, incYPad: .40, incWeight: .10});

//Custom Text Scale Parameters.
new CanvDTP(document.getElementById("dtp54"), 
{
    bannerScale: .50, dayScale: .30, monthScale: .30, yearScale: .30, decadeScale: .20,
    timeScale: .30, timeAmPmScale: .30, minuteScale: .30, hourScale: .30
});
