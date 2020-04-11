let dateTimeSpan        = document.getElementById("date-time-span");
let jsonPickedSpan      = document.getElementById("json-picked-span");
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
let dateTimeSpan1       = document.getElementById("date-time-span1");
let jsonPickedSpan1     = document.getElementById("json-picked-span1");
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

//Callback functions.
let showDateTimeString = (dateTimeString) => dateTimeSpan.innerHTML = dateTimeString;
let showDateTimeJSON = (dateTimeJSON) =>
{
    jsonPickedSpan.innerHTML     = dateTimeJSON.isPicked;
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

let canDTP = new CanvDTP
(
    document.getElementById("dtp"),
    {
        //debug:            true,
        dateTimeStringCb: showDateTimeString,
        dateTimeJSONCb:   showDateTimeJSON,
        dateTimeFormat:   "dddd, MMMM Do YYYY h:mm a. DDDo [Day of the Year], Wo [Week of the Year]",
        fontStyle: "Arial Black",
        textAltColorn: "#555555",
        bannerScale: .70,
        yearScale: .55,
        dayExcludeArray:
        [
            {   //Highlight, but don't exclude all weekend days.
                daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY],
                color:     "#0000ff30",
                info:      "Weekend"
            },
            {   //Highlight April 2nd, 2020.
                days:      [2],
                months:    [CanvDTP.APRIL],
                years:     [2020],
                color:     "#00ffff30",
                info:      "Deez Nutz Day"
            },
            {   //Exclude the whole month of May in every year.
                months:    [CanvDTP.MAY],
                excluded:  true,
                color:     "#ff000030",
                info:      "Whole month of May blocked out, weekends whitelisted"
            },
        ],
        dayWhiteArray:
        [
            {   //Whitelist the weekends in May from exclusion.
                daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY], 
                months:     [CanvDTP.MAY],
                type:       CanvDTP.WHITE_BLOCK
            }  
        ],
        monthSpotlightArray:
        [
            {   //Spotlight the February months in leap years between 2000 - 2116.
                years:
                [
                    2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036,
                    2040, 2044, 2048, 2052, 2056, 2060, 2064, 2068, 2072, 2076,
                    2080, 2084, 2088, 2092, 2096, 2100, 2104, 2108, 2112, 2116,
                ],
                months: [CanvDTP.FEBRUARY],
                color: "#0000ff50",
                info:  "Extra day"
            },
        ],
        monthWhiteArray:
        [
            {   //Whitelist February 2100.
                years:  [2100],
                months: [CanvDTP.FEBRUARY]
            }
        ],
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
    }
)

//Can only get the textbox ID after the date/time picker has been created.
let tb     = document.getElementById("dtp-tb");
let tbSpan = document.getElementById("tb-span");

//Function calls.
let getData = () =>
{
    let dateTime = canDTP.getDateTimeString();
    let json     = canDTP.getDateTimeJSON();

    //Get the text from the textbox.
    tbSpan.innerHTML = tb.value ? tb.value : "Null";

    dateTimeSpan1.innerHTML       = dateTime ? dateTime : "Null";
    jsonPickedSpan1.innerHTML     = json.isPicked;
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

setInterval(() => getData(), 1000);