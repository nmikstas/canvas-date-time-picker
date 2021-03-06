let mlkArr          = [];
let washingtonArr   = [];
let memorialArr     = [];
let laborArr        = [];
let columbusArr     = [];
let thanksgivingArr = [];
let mothersArr      = [];
let fathersArr      = [];
let monthsArr       = [];
let yearsArr        = [];
let easterArr       = [];

//Get all the major U.S. holidays between 1900 and 2020.
for(let i = 1900; i <= 2020; i++)
{
    //Create an array of easter days.
    let easterDate = CanvDTP.getEaster(i);
    easterArr.push
    (
        {
            years:  [i],
            months: [easterDate.month],
            days:   [easterDate.day],
            color:  "#ff00ff80",
            info:   "Easter"
        }
    )

    //Create an array of thanksgiving days.
    let thanksgivingDate = CanvDTP.getThanksgiving(i);
    thanksgivingArr.push
    (
        {
            years:  [i],
            months: [thanksgivingDate.month],
            days:   [thanksgivingDate.day],
            color:  "#ff00ff80",
            info:   "Thanksgiving"
        }
    )

    //Create an array of MLK days.
    let mlkDate = CanvDTP.getMLK(i)
    mlkArr.push
    (
        {
            years:  [i],
            months: [mlkDate.month],
            days:   [mlkDate.day],
            color:  "#ff00ff80",
            info:   "Martin Luther King's Day"
        }
    )

    //Create an array of Mother's days.
    let mothersDate = CanvDTP.getMothers(i);
    mothersArr.push
    (
        {
            years:  [i],
            months: [mothersDate.month],
            days:   [mothersDate.day],
            color:  "#ff00ff80",
            info:   "Mother's Day"
        }
    )

    //Create an array of Father's days.
    let fathersDate = CanvDTP.getFathers(i);
    fathersArr.push
    (
        {
            years:  [i],
            months: [fathersDate.month],
            days:   [fathersDate.day],
            color:  "#ff00ff80",
            info:   "Father's Day"
        }
    )

    //Create an array of Washington's birthdays.
    let washingtonDate = CanvDTP.getWashington(i);
    washingtonArr.push
    (
        {
            years:  [i],
            months: [washingtonDate.month],
            days:   [washingtonDate.day],
            color:  "#ff00ff80",
            info:   "George Washington's Birthday"
        }
    )

    //Create an array of memorial days.
    let memorialDate = CanvDTP.getMemorial(i);
    memorialArr.push
    (
        {
            years:  [i],
            months: [memorialDate.month],
            days:   [memorialDate.day],
            color:  "#ff00ff80",
            info:   "Memorial Day"
        }
    )

    //Create an array of labor days.
    let laborDate = CanvDTP.getLabor(i);
    laborArr.push
    (
        {
            years:  [i],
            months: [laborDate.month],
            days:   [laborDate.day],
            color:  "#ff00ff80",
            info:   "Labor Day"
        }
    )

    //Create an array of Columbus days.
    let columbusDate = CanvDTP.getColumbus(i);
    columbusArr.push
    (
        {
            years:  [i],
            months: [columbusDate.month],
            days:   [columbusDate.day],
            color:  "#ff00ff80",
            info:   "Columbus Day"
        }
    )
}

//Get independence day.
let july4 =
[
    {
        months: [CanvDTP.getIndependence.month],
        days:   [CanvDTP.getIndependence.day],
        color:  "#ff00ff80",
        info:   "Independance Day"
    }
];

//Get christmas day.
let christmas =
[
    {
        months: [CanvDTP.getChristmas.month],
        days:   [CanvDTP.getChristmas.day],
        color:  "#ff00ff80",
        info:   "Christmas"
    }
];

//Get new year's day.
let newYears =
[
    {
        months: [CanvDTP.getNewYears.month],
        days:   [CanvDTP.getNewYears.day],
        color:  "#ff00ff80",
        info:   "New Year's Day"
    }
];

//Get halloween day.
let halloween =
[
    {
        months: [CanvDTP.getHalloween.month],
        days:   [CanvDTP.getHalloween.day],
        color:  "#ff00ff80",
        info:   "Halloween"
    }
];

//Get Valentine's day.
let valentine =
[
    {
        months: [CanvDTP.getValentines.month],
        days:   [CanvDTP.getValentines.day],
        color:  "#ff00ff80",
        info:   "Valentine's Day"
    }
];

//Get St. Patrick's day.
let stPatricks =
[
    {
        months: [CanvDTP.getStPatricks.month],
        days:   [CanvDTP.getStPatricks.day],
        color:  "#ff00ff80",
        info:   "Saint Patrick's Day"
    }
];

//Get Veteran's day.
let veterans =
[
    {
        months: [CanvDTP.getVeterans.month],
        days:   [CanvDTP.getVeterans.day],
        color:  "#ff00ff80",
        info:   "Veteran's Day"
    }
];

//Highlight, but don't exclude all weekend days.
let weekends =
[
    {   
        daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY],
        color:     "#0000ff30",
    },
];

let months =
[
    ["African American History Month", CanvDTP.FEBRUARY],
    ["American Indian Heritage Month", CanvDTP.NOVEMBER],
    ["Asian Pacific Heritage Month", CanvDTP.MAY],
    ["Irish-American Heritage Month", CanvDTP.MARCH],
    ["Jewish American Heritage Month", CanvDTP.MAY],
    ["LGBTQ Pride Month", CanvDTP.JUNE],
    ["National Disability Employment Awareness Month", CanvDTP.OCTOBER],
    ["National Hispanic Heritage Month", CanvDTP.SEPTEMBER],
    ["National Hispanic Heritage Month", CanvDTP.OCTOBER],
    ["Women's History Month", CanvDTP.MARCH]
];

//Create an array of special months.
for(let i = 0; i <months.length; i++)
{
   monthsArr.push
   (
       {
          
           months: [months[i][1]],
           color:  "#0080ff80",
           info:   months[i][0]
        }
    )
}

let presidents =
[
    [1901, "Theodore Roosevelt"],
    [1909, "William H. Taft"],
    [1913, "Woodrow Wilson"],
    [1921, "Warren G. Harding"],
    [1923, "Calvin Coolidge"],
    [1929, "Herbert Hoover"],
    [1933, "Franklin D. Roosevelt"],
    [1945, "Harry S. Truman"],
    [1953, "Dwight D. Eisenhower"],
    [1961, "John F. Kennedy"],
    [1963, "Lyndon B. Johnson"],
    [1969, "Richard M. Nixon"],
    [1974, "Gerald R. Ford"],
    [1977, "Jimmy Carter"],
    [1981, "Ronald Reagan"],
    [1989, "George Bush"],
    [1993, "Bill Clinton"],
    [2001, "George W. Bush"],
    [2009, "Barack Obama"],
    [2017, "Donald J. Trump"]
];

//Create an array of special years.
for(let i = 0; i < presidents.length; i++)
{
   yearsArr.push
   (
       {
          
           years: [presidents[i][0]],
           color:  "#ff800080",
           info:   presidents[i][1]
        }
    )
}

//Default picker.
new CanvDTP(document.getElementById("dtp1"));

//Customized picker.
new CanvDTP
(
    document.getElementById("dtp2"),
    {
        dateTimeFormat:   "dddd, MMMM Do YYYY h:mm a",
        fontStyle:        "Arial Black",
        bannerScale:      .70,
        yearScale:        .55,
        bodyPosition:     CanvDTP.POS_TOPRIGHT,
        maxPixelWidth:    250,
        firstDate:        {month: 1, day: 1, year: 1900},
        lastDate:         {month: 12, day: 31, year: 2020},
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
        ],
        dayExcludeArray:
        [
            ...weekends, ...july4, ...christmas, ...newYears, ...halloween,
            ...valentine, ...stPatricks, ...veterans, ...mlkArr, ...thanksgivingArr,
            ...mothersArr, ...fathersArr, ...washingtonArr, ...memorialArr,
            ...laborArr, ...columbusArr, ...easterArr
        ],
        monthSpotlightArray: [...monthsArr],
        yearSpotlightArray:  [...yearsArr]
    }
);

//Not collapsible, top.
new CanvDTP(document.getElementById("dtp15"), {bodyPosition: CanvDTP.POS_TOPRIGHT, isCollapsible: false, zIndex: 0});

//Not collapsible bottom.
new CanvDTP(document.getElementById("dtp16"), {bodyPosition: CanvDTP.POS_BOTRIGHT, isCollapsible: false, zIndex: 0});

//Not collapsible, not textbox.
new CanvDTP(document.getElementById("dtp17"), {bodyPosition: CanvDTP.POS_TOPRIGHT, isCollapsible: false, zIndex: 0});

//Bottom right picker.
new CanvDTP(document.getElementById("dtp3"), {bodyPosition: CanvDTP.POS_BOTRIGHT});

//Bottom left picker (default).
new CanvDTP(document.getElementById("dtp4"), {bodyPosition: CanvDTP.POS_BOTLEFT});

//Top right picker.
new CanvDTP(document.getElementById("dtp5"), {bodyPosition: CanvDTP.POS_TOPRIGHT});

//Top left picker.
new CanvDTP(document.getElementById("dtp6"), {bodyPosition: CanvDTP.POS_TOPLEFT});

//Bottom right picker, 250 pixels max.
new CanvDTP(document.getElementById("dtp7"), {bodyPosition: CanvDTP.POS_BOTRIGHT, maxPixelWidth: 250});

//Bottom left picker, 250 pixels max.
new CanvDTP(document.getElementById("dtp8"), {bodyPosition: CanvDTP.POS_BOTLEFT, maxPixelWidth: 250});

//Top right picker, 250 pixels max.
new CanvDTP(document.getElementById("dtp9"), {bodyPosition: CanvDTP.POS_TOPRIGHT, maxPixelWidth: 250});

//Top left picker, 250 pixels max.
new CanvDTP(document.getElementById("dtp10"), {bodyPosition: CanvDTP.POS_TOPLEFT, maxPixelWidth: 250});

//Bottom picker, no animation.
new CanvDTP(document.getElementById("dtp11"), {bodyPosition: CanvDTP.POS_BOTRIGHT, isAnimated: false});

//Top picker, no animation.
new CanvDTP(document.getElementById("dtp12"), {bodyPosition: CanvDTP.POS_TOPRIGHT, isAnimated: false});

//Date picker only.
new CanvDTP(document.getElementById("dtp13"), {pickerType: CanvDTP.PICK_DATE});

//Time picker only.
new CanvDTP(document.getElementById("dtp14"), {pickerType: CanvDTP.PICK_TIME});

//Custom date/time string.
new CanvDTP(document.getElementById("dtp18"), {dateTimeFormat: "dddd, MMMM Do YYYY h:mm a"});

//Monday start of week.
new CanvDTP(document.getElementById("dtp19"), {startOfWeek: CanvDTP.MONDAY});

//Military time.
new CanvDTP(document.getElementById("dtp20"), {isMilitaryTime: true, dateTimeFormat: "HH:mm", pickerType: CanvDTP.PICK_TIME});

//Today's date not shown.
new CanvDTP(document.getElementById("dtp21"), {todaysDate: false});

//Arial black font style.
new CanvDTP(document.getElementById("dtp22"), {fontStyle: "Arial Black", bannerScale: .70, yearScale: .55});

//Auto pick disabled.
new CanvDTP(document.getElementById("dtp23"), {autoPick: false});

//No calendar icon.
new CanvDTP(document.getElementById("dtp24"), {calendarIcon: false});

//Alternate text colors.
new CanvDTP(document.getElementById("dtp25"), {textMainColorn: "#0000ff", textMainColorh: "#00ffff",
    textAltColorn: "#ff0000", textAltColorh: "#ffff00"});

//Month and year views only.
new CanvDTP(document.getElementById("dtp26"), {topView: CanvDTP.CAL_YEAR});

//First date Jan 1, 2000.
new CanvDTP(document.getElementById("dtp27"), {firstDate: {month: CanvDTP.JANUARY, day: 1, year: 2000}});

//Last date Dec 31, 2030.
new CanvDTP(document.getElementById("dtp28"), {lastDate: {month: CanvDTP.DECEMBER, day: 31, year: 2030}});

//First date Date Dec 25, 1980.
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

//Month Days Excluded, Weekends Whitelisted.
new CanvDTP(document.getElementById("dtp31"),
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

//Weekends Spotlighted.
new CanvDTP(document.getElementById("dtp32"), 
{
    dayExcludeArray: 
    [
        {
            daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY], 
            color: "#0000ff80",
            info: "All Weekend Days Spotlighted"
        }
    ]
});

//All Months Spotlighted, Feb, Apr, Jun Whitelisted.
new CanvDTP(document.getElementById("dtp33"),
{
    monthSpotlightArray:
    [
        {
            color: "#0000ff80",
            info: "Spotlighted Month"
        }
    ],
    monthWhiteArray:
    [
        {
            months: [CanvDTP.FEBRUARY, CanvDTP.APRIL, CanvDTP.JUNE]
        }
    ]
});

//2010-2030 Spotlighted, 2020 Whitelisted.
new CanvDTP(document.getElementById("dtp34"),
{
    yearSpotlightArray:
    [
        {
            years: 
            [
                2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029,
                2030
            ],
            color: "#0000ff80",
            info: "Spotlighted Year"
        }
    ],
    yearWhiteArray:
    [
        {
            years: [2020]
        }
    ]
});

//Custom Calendar Icon Parameters.
new CanvDTP(document.getElementById("dtp35"),
{
    iBorderColorn: "#0000ff", iFillColorn: "#c000c0", iCalColorn: "#00ff00", iBorderColorh: "#ff0000",
    iFillColorh: "#30ff30", iCalColorh: "#ff00ff", iBorderRadius: 0, iBorderWeight: .10,
    iXPadding: .10, iYPadding: .10, iLineWidth: .001
});

//Custom Body Canvas Parameters.
new CanvDTP(document.getElementById("dtp36"),
{
    bBorderColor: "#0000ff", bFillColor: "#d0d0ffe0", bBorderRadius: 0,
    bBorderWeight: .001, bXPadding: .05, bYPadding: .40, bLineWidth: .2
});

//Custom Info Text Parameters.
new CanvDTP(document.getElementById("dtp37"),
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
new CanvDTP(document.getElementById("dtp38"),
{
    selectBorderColor: "#ff0000", selectFillColor: "#80000040", selectRadius: .50, selectWeight: .01
});

//Custom Previous/Next Parameters.
new CanvDTP(document.getElementById("dtp39"), {prevNextXPad: 0, prevNextYPad: .35});

//Custom Clock Graphic Parameters.
new CanvDTP(document.getElementById("dtp40"), {clockPad: .20, clockWeight: .15});

//Custom Calendar Graphic Parameters.
new CanvDTP(document.getElementById("dtp41"), {calXPadding: .30, calYPadding: .20, calLineWidth: .015});

//Custom Days of Week Header Parameters.
new CanvDTP(document.getElementById("dtp42"), {headerColor: "#ffff00", headerScale: .60});

//Custom Currently Selected Day Parameters.
new CanvDTP(document.getElementById("dtp43"),
{
    currentBorderColor: "#ff0000", currentFillColor: "#d0000080", currentRadius: .50, currentWeight: .10
});

//Custom Today's Date Parameters.
new CanvDTP(document.getElementById("dtp44"), {nowColor: "#0000ff", nowWeight: .30,});

//Custom Increment/Decrement Parameters.
new CanvDTP(document.getElementById("dtp45"), {incXPad: .40, incYPad: .40, incWeight: .10});

//Custom Text Scale Parameters.
new CanvDTP(document.getElementById("dtp46"), 
{
    bannerScale: .50, dayScale: .30, monthScale: .30, yearScale: .30, decadeScale: .20,
    timeScale: .30, timeAmPmScale: .30, minuteScale: .30, hourScale: .30
});
