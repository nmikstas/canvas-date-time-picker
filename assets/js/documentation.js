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

//getDateTimeString
let canDTP1 = new CanvDTP(document.getElementById("dtp55"), {isCollapsible: false});

let dateTimeSpan1 = document.getElementById("date-time-span1");

let getDateTimeString = () =>
{
    let data = canDTP1.getDateTimeString();
    dateTimeSpan1.innerHTML = data;
}

//getDateTimeJSON
let canDTP2 = new CanvDTP(document.getElementById("dtp56"), {isCollapsible: false});

let jsonPickedSpan1     = document.getElementById("json-picked-span1");
let jsonStringSpan1     = document.getElementById("json-string-span1");
let jsonMonthSpan1      = document.getElementById("json-month-span1");
let jsonDaySpan1        = document.getElementById("json-day-span1");
let jsonYearSpan1       = document.getElementById("json-year-span1");
let jsonHourSpan1       = document.getElementById("json-hour-span1");
let jsonMilHourSpan1    = document.getElementById("json-mil-hour-span1");
let jsonMinuteSpan1     = document.getElementById("json-minute-span1");
let jsonIsAMSpan1       = document.getElementById("json-am-pm-span1");
let jsonDayOfWeekSpan1  = document.getElementById("json-day-of-week-span1");
let jsonDayOfYearSpan1  = document.getElementById("json-day-of-year-span1");
let jsonWeekOfYearSpan1 = document.getElementById("json-week-of-year-span1");

let getDateTimeJSON = () =>
{
    let json = canDTP2.getDateTimeJSON();

    jsonPickedSpan1.innerHTML     = json.isPicked;
    jsonStringSpan1.innerHTML     = json.string;
    jsonMonthSpan1.innerHTML      = json.month;
    jsonDaySpan1.innerHTML        = json.day;
    jsonYearSpan1.innerHTML       = json.year;
    jsonHourSpan1.innerHTML       = json.hour;
    jsonMilHourSpan1.innerHTML    = json.milHour;
    jsonMinuteSpan1.innerHTML     = json.minute;
    jsonIsAMSpan1.innerHTML       = json.ampm;
    jsonDayOfWeekSpan1.innerHTML  = json.dayOfWeek;
    jsonDayOfYearSpan1.innerHTML  = json.dayOfYear;
    jsonWeekOfYearSpan1.innerHTML = json.weekOfYear;
}

//get/set picker type.
let canDTP3 = new CanvDTP(document.getElementById("dtp57"), {isCollapsible: false});

let ptype1 = document.getElementById("ptype1");

let setPickerTypeB = () => canDTP3.setPickerType(CanvDTP.PICK_BOTH);
let setPickerTypeD = () => canDTP3.setPickerType(CanvDTP.PICK_DATE);
let setPickerTypeT = () => canDTP3.setPickerType(CanvDTP.PICK_TIME);

let getPickerType = () =>
{
    let ptype = canDTP3.getPickerType();
    if(ptype === CanvDTP.PICK_BOTH) ptype1.innerHTML = "Both Date and Time";
    if(ptype === CanvDTP.PICK_TIME) ptype1.innerHTML = "Time Only";
    if(ptype === CanvDTP.PICK_DATE) ptype1.innerHTML = "Date Only";
}

//Get/set day exclusions.
let canDTP4 = new CanvDTP(document.getElementById("dtp58"),
{
    isCollapsible: false,
    dayExcludeArray: 
    [
        {
            daysOfWeek: [CanvDTP.MONDAY, CanvDTP.TUESDAY, CanvDTP.WEDNESDAY, CanvDTP.THURSDAY, CanvDTP.FRIDAY],
            excluded: true,
            color: "#ff000080",
            info: "All Weekdays Excluded"
        }
    ]
});

let exclusions1 = document.getElementById("exclusions1");

let SetExcludeWeekdays = () => 
{  
    canDTP4.setDayExcludeArray
    (
        [
            {
                daysOfWeek: [CanvDTP.MONDAY, CanvDTP.TUESDAY, CanvDTP.WEDNESDAY, CanvDTP.THURSDAY, CanvDTP.FRIDAY],
                excluded: true,
                color: "#ff000080",
                info: "All Weekdays Excluded"
            }
        ]
    );
}
let setExcludeWeekends = () =>
{
    canDTP4.setDayExcludeArray
    (
        [
            {
                daysOfWeek: [CanvDTP.SUNDAY, CanvDTP.SATURDAY],
                excluded: true,
                color: "#ff000080",
                info: "All Weekends Excluded"
            }
        ]
    );
}

let getExcludedDays = () =>
{
    exclusions1.innerText = JSON.stringify(canDTP4.getDayExcludeArray());
}

//dateTimeStringCb.
let dateTimeSpan        = document.getElementById("date-time-span");
let jsonPickedSpan      = document.getElementById("json-picked-span");
let jsonStringSpan      = document.getElementById("json-string-span");
let jsonMonthSpan       = document.getElementById("json-month-span");
let jsonDaySpan         = document.getElementById("json-day-span");
let jsonYearSpan        = document.getElementById("json-year-span");
let jsonHourSpan        = document.getElementById("json-hour-span");
let jsonMilHourSpan     = document.getElementById("json-mil-hour-span");
let jsonMinuteSpan      = document.getElementById("json-minute-span");
let jsonIsAMSpan        = document.getElementById("json-am-pm-span");
let jsonDayOfWeekSpan   = document.getElementById("json-day-of-week-span");
let jsonDayOfYearSpan   = document.getElementById("json-day-of-year-span");
let jsonWeekOfYearSpan  = document.getElementById("json-week-of-year-span");

let showDateTimeJSON = (dateTimeJSON) =>
{
    jsonPickedSpan.innerHTML     = dateTimeJSON.isPicked;
    jsonStringSpan.innerHTML     = dateTimeJSON.string;
    jsonMonthSpan.innerHTML      = dateTimeJSON.month;
    jsonDaySpan.innerHTML        = dateTimeJSON.day;
    jsonYearSpan.innerHTML       = dateTimeJSON.year;
    jsonHourSpan.innerHTML       = dateTimeJSON.hour;
    jsonMilHourSpan.innerHTML    = dateTimeJSON.milHour;
    jsonMinuteSpan.innerHTML     = dateTimeJSON.minute;
    jsonIsAMSpan.innerHTML       = dateTimeJSON.ampm;
    jsonDayOfWeekSpan.innerHTML  = dateTimeJSON.dayOfWeek;
    jsonDayOfYearSpan.innerHTML  = dateTimeJSON.dayOfYear;
    jsonWeekOfYearSpan.innerHTML = dateTimeJSON.weekOfYear;
}

new CanvDTP(document.getElementById("dateTimeJSONCb"), {dateTimeJSONCb: showDateTimeJSON});

//dateTimeStringCb
let showDateTimeString = (dateTimeString) => dateTimeSpan.innerHTML = dateTimeString;
new CanvDTP(document.getElementById("ateTimeStringCb"), {dateTimeStringCb: showDateTimeString});

//openCb
let openCb = () =>
{
    console.log("Opened!");
    document.getElementById("openCb-span").innerHTML = "Opened!";
}
new CanvDTP(document.getElementById("openCb"), {openCb: openCb});

//closeCb
let closeCb = () =>
{
    console.log("Closed!");
    document.getElementById("closeCb-span").innerHTML = "Closed!";
}
new CanvDTP(document.getElementById("closeCb"), {closeCb: closeCb});

//hourChangeCb
let oldMilHourSpan1 = document.getElementById("oldMilHour-span1");
let oldHourSpan1    = document.getElementById("oldHour-span1");
let oldMinSpan1     = document.getElementById("oldMin-span1");
let oldIsAmSpan1    = document.getElementById("oldIsAm-span1");
let newMilHourSpan1 = document.getElementById("newMilHour-span1");
let newHourSpan1    = document.getElementById("newHour-span1");
let newMinSpan1     = document.getElementById("newMin-span1");
let newIsAmSpan1    = document.getElementById("newIsAm-span1");

let hourChangeCb = (data) =>
{
    oldMilHourSpan1.innerHTML = data.oldMilHour;
    oldHourSpan1.innerHTML = data.oldHour;
    oldMinSpan1.innerHTML = data.oldMin;
    oldIsAmSpan1.innerHTML = data.oldIsAm;
    newMilHourSpan1.innerHTML = data.newMilHour;
    newHourSpan1.innerHTML = data.newHour;
    newMinSpan1.innerHTML = data.newMin;
    newIsAmSpan1.innerHTML = data.newIsAm;
}
new CanvDTP(document.getElementById("hourChangeCb"), {hourChangeCb: hourChangeCb});

//minuteChangeCb
let oldMilHourSpan2 = document.getElementById("oldMilHour-span2");
let oldHourSpan2    = document.getElementById("oldHour-span2");
let oldMinSpan2     = document.getElementById("oldMin-span2");
let oldIsAmSpan2    = document.getElementById("oldIsAm-span2");
let newMilHourSpan2 = document.getElementById("newMilHour-span2");
let newHourSpan2    = document.getElementById("newHour-span2");
let newMinSpan2     = document.getElementById("newMin-span2");
let newIsAmSpan2    = document.getElementById("newIsAm-span2");

let minuteChangeCb = (data) =>
{
    oldMilHourSpan2.innerHTML = data.oldMilHour;
    oldHourSpan2.innerHTML = data.oldHour;
    oldMinSpan2.innerHTML = data.oldMin;
    oldIsAmSpan2.innerHTML = data.oldIsAm;
    newMilHourSpan2.innerHTML = data.newMilHour;
    newHourSpan2.innerHTML = data.newHour;
    newMinSpan2.innerHTML = data.newMin;
    newIsAmSpan2.innerHTML = data.newIsAm;
}
new CanvDTP(document.getElementById("minuteChangeCb"), {minuteChangeCb: minuteChangeCb});


