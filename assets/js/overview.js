
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

let easterArr =
[
    ["April", 15], 	["April", 7], 	["March", 30], 	["April", 12], 	["April", 3],
    ["April", 23], 	["April", 15], 	["March", 31], 	["April", 19], 	["April", 11],
    ["March", 27], 	["April", 16], 	["April", 7], 	["March", 23], 	["April", 12],
    ["April", 4], 	["April", 23], 	["April", 8], 	["March", 31], 	["April", 20],
    ["April", 4], 	["March", 27], 	["April", 16], 	["April", 1], 	["April", 20],
    ["April", 12], 	["April", 4], 	["April", 17], 	["April", 8], 	["March", 31],
    ["April", 20], 	["April", 5], 	["March", 27], 	["April", 16], 	["April", 1],
    ["April", 21], 	["April", 12], 	["March", 28], 	["April", 17], 	["April", 9],
    ["March", 24], 	["April", 13], 	["April", 5], 	["April", 25], 	["April", 9],
    ["April", 1], 	["April", 21], 	["April", 6], 	["March", 28], 	["April", 17],
    ["April", 9], 	["March", 25], 	["April", 13], 	["April", 5], 	["April", 18],
    ["April", 10], 	["April", 1], 	["April", 21], 	["April", 6], 	["March", 29],
    ["April", 17], 	["April", 2], 	["April", 22], 	["April", 14], 	["March", 29],
    ["April", 18], 	["April", 10], 	["March", 26], 	["April", 14], 	["April", 6],
    ["March", 29], 	["April", 11], 	["April", 2], 	["April", 22], 	["April", 14],
    ["March", 30], 	["April", 18], 	["April", 10], 	["March", 26], 	["April", 15],
    ["April", 6], 	["April", 19], 	["April", 11], 	["April", 3], 	["April", 22],
    ["April", 7], 	["March", 30], 	["April", 19], 	["April", 3], 	["March", 26],
    ["April", 15], 	["March", 31], 	["April", 19], 	["April", 11], 	["April", 3],
    ["April", 16], 	["April", 7], 	["March", 30], 	["April", 12], 	["April", 4],
    ["April", 23], 	["April", 15], 	["March", 31], 	["April", 20], 	["April", 11],
    ["March", 27], 	["April", 16], 	["April", 8], 	["March", 23], 	["April", 12],
    ["April", 4], 	["April", 24], 	["April", 8], 	["March", 31], 	["April", 20],
    ["April", 5], 	["March", 27], 	["April", 16], 	["April", 1], 	["April", 21],
    ["April", 12]
];

//Create an array of easter days.
for(let i = 1900; i <= 2020; i++)
{
   thanksgivingArr.push
   (
       {
           years:  [i],
           months: [(easterArr[i - 1900][0] === "April") ? CanvDTP.APRIL : CanvDTP.MARCH],
           days:   [easterArr[i - 1900][1]],
           color:  "#ff00ff80",
           info:   "Easter"
        }
    )
}

//Calculate thanksgiving day of month.
let thanksgiving = (year) =>
{
    let first = new Date(year, 10, 1);
    let dayOfWeek = first.getDay();
    return ((dayOfWeek < 5) ? 26 : 33) - dayOfWeek;
}

//Create an array of thanksgiving days.
for(let i = 1900; i <= 2020; i++)
{
   thanksgivingArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.NOVEMBER],
           days:   [thanksgiving(i)],
           color:  "#ff00ff80",
           info:   "Thanksgiving"
        }
    )
}

//Calculate MLK day of month.
let mlk = (year) =>
{
    let first = new Date(year, 0, 1);
    let dayOfWeek = first.getDay();
    return ((dayOfWeek < 1) ? 16 : 23) - dayOfWeek;
}

//Create an array of MLK days.
for(let i = 1900; i <= 2020; i++)
{
   mlkArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.JANUARY],
           days:   [mlk(i)],
           color:  "#ff00ff80",
           info:   "Martin Luther King's Birthday"
        }
    )
}

//Calculate Mother's day of month.
let mothers = (year) =>
{
    let first = new Date(year, 4, 1);
    let dayOfWeek = first.getDay();
    return ((dayOfWeek < 1) ? 8 : 15) - dayOfWeek;
}

//Create an array of Mother's days.
for(let i = 1900; i <= 2020; i++)
{
   mothersArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.MAY],
           days:   [mothers(i)],
           color:  "#ff00ff80",
           info:   "Mother's Day"
        }
    )
}

//Calculate Father's day of month.
let fathers = (year) =>
{
    let first = new Date(year, 5, 1);
    let dayOfWeek = first.getDay();
    return ((dayOfWeek < 1) ? 15 : 22) - dayOfWeek;
}

//Create an array of Father's days.
for(let i = 1900; i <= 2020; i++)
{
   fathersArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.JUNE],
           days:   [fathers(i)],
           color:  "#ff00ff80",
           info:   "Father's Day"
        }
    )
}

//Calculate Washington's birthday day of month.
let washington = (year) =>
{
    let first = new Date(year, 1, 1);
    let dayOfWeek = first.getDay();
    return ((dayOfWeek < 1) ? 16 : 23) - dayOfWeek;
}

//Create an array of Washington's birthdays.
for(let i = 1900; i <= 2020; i++)
{
   washingtonArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.FEBRUARY],
           days:   [washington(i)],
           color:  "#ff00ff80",
           info:   "George Washington's Birthday"
        }
    )
}

//Calculate memorial day of month.
let memorial = (year) =>
{
    let first = new Date(year, 4, 31);
    let dayOfWeek = first.getDay();
    return ((dayOfWeek < 2) ? 25 : 32) - dayOfWeek;
}

//Create an array of memorial days.
for(let i = 1900; i <= 2020; i++)
{
   memorialArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.MAY],
           days:   [memorial(i)],
           color:  "#ff00ff80",
           info:   "Memorial Day"
        }
    )
}

//Calculate labor day of month.
let labor = (year) =>
{
    let first = new Date(year, 8, 1);
    let dayOfWeek = first.getDay();
    return ((dayOfWeek < 2) ? 2 : 9) - dayOfWeek;
}

//Create an array of labor days.
for(let i = 1900; i <= 2020; i++)
{
   laborArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.SEPTEMBER],
           days:   [labor(i)],
           color:  "#ff00ff80",
           info:   "Labor Day"
        }
    )
}

//Calculate Columbus day of month.
let columbus = (year) =>
{
    let first = new Date(year, 8, 1);
    let dayOfWeek = first.getDay();
    return 14 - dayOfWeek;
}

//Create an array of Columbus days.
for(let i = 1900; i <= 2020; i++)
{
   columbusArr.push
   (
       {
           years:  [i],
           months: [CanvDTP.OCTOBER],
           days:   [columbus(i)],
           color:  "#ff00ff80",
           info:   "Columbus Day"
        }
    )
}

let july4 =
[
    {
        months: [CanvDTP.JULY],
        days:   [4],
        color:  "#ff00ff80",
        info:   "Independance Day"
     }
];

let christmas =
[
    {
        months: [CanvDTP.DECEMBER],
        days:   [25],
        color:  "#ff00ff80",
        info:   "Christmas"
     }
];

let newYears =
[
    {
        months: [CanvDTP.JANUARY],
        days:   [1],
        color:  "#ff00ff80",
        info:   "New Year's Day"
     }
];

let halloween =
[
    {
        months: [CanvDTP.OCTOBER],
        days:   [31],
        color:  "#ff00ff80",
        info:   "Halloween"
     }
];

let valentine =
[
    {
        months: [CanvDTP.FEBRUARY],
        days:   [14],
        color:  "#ff00ff80",
        info:   "Valentine's Day"
     }
];

let stPatricks =
[
    {
        months: [CanvDTP.MARCH],
        days:   [17],
        color:  "#ff00ff80",
        info:   "Saint Patrick's Day"
     }
];

let veterans =
[
    {
        months: [CanvDTP.NOVEMBER],
        days:   [11],
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
for(let i = 0; i <presidents.length; i++)
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

new CanvDTP(document.getElementById("dtp1"));
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
        ],
        dayExcludeArray:
        [
            ...weekends, ...july4, ...christmas, ...newYears, ...halloween,
            ...valentine, ...stPatricks, ...veterans, ...mlkArr, ...thanksgivingArr,
            ...mothersArr, ...fathersArr, ...washingtonArr, ...memorialArr,
            ...laborArr, ...columbusArr,
        ],
        monthSpotlightArray: [...monthsArr],
        yearSpotlightArray:  [...yearsArr]
    }
);