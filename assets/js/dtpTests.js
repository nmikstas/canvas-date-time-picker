let canDTP = new CanvDTP
(
    document.getElementById("dtp"),
    {
        //debug:            true,
        dateTimeFormat:   "dddd, MMMM Do YYYY h:mm a. DDDo [Day of the Year], Wo [Week of the Year]",
        fontStyle:        "Arial Black",
        bannerScale:      .70,
        yearScale:        .55,
        bodyPosition:     CanvDTP.POS_BOTRIGHT,
        firstDate:        {month: 2, day: 2, year: 1989},
        lastDate:         {month: 11, day: 29, year: 2029},
        isCollapsible:    false,
        //autoPick:         false,
        //todaysDate:       false,
        //pickerType:       CanvDTP.PICK_TIME,
        //isAnimated:       false,
        //maxPixelWidth:    200,
        //calendarIcon:     false,
        //topView:          CanvDTP.CAL_MONTH,
        //initDate:         {month: 3, day: 3, year: 2020},
        
        dayExcludeArray:
        [
            {   //Highlight, but don't exclude all weekend days.
                daysOfWeek: [CanvDTP.SATURDAY, CanvDTP.SUNDAY],
                color:     "#0000ff30",
                //info:      "Weekend"
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
                color:     "#800000",
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
        yearSpotlightArray:
        [
            {
                years: [2000, 2005, 2010, 2020],
                color: "#00ffff50",
                info:  "Start of decade"
            },
            {
                years: [2002, 2004, 2005, 2006, 2008, 2010],
                color: "#ff00ff50",
                info:  "Even year"
            },
        ],
        yearWhiteArray:
        [
            {
                years:  [2005]
            }
        ],
        monthImages:
        [
            {image: document.getElementById("january"), opacity: 0.2},
            {image: document.getElementById("february"), opacity: 0.2},
            {image: document.getElementById("march"), opacity: 0.2},
            {image: document.getElementById("april"), opacity: 0.2},
            {image: document.getElementById("may"), opacity: 0.2},
            {image: document.getElementById("june"), opacity: 0.2},
            {image: document.getElementById("july"), opacity: 0.2},
            {image: document.getElementById("august"), opacity: 0.2},
            {image: document.getElementById("september"), opacity: 0.2},
            {image: document.getElementById("october"), opacity: 0.2},
            {image: document.getElementById("november"), opacity: 0.2},
            {image: document.getElementById("december"), opacity: 0.2},
        ]
    }
)

//Can only get the textbox ID after the date/time picker has been created.
let tb     = document.getElementById("dtp-tb");
let tbSpan = document.getElementById("tb-span");

let setPickerType = (type) => canDTP.setPickerType(type);
let getPickerType = () => console.log(canDTP.getPickerType());
