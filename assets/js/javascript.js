let dateTimeSpan       = document.getElementById("date-time-span");
let dateSpan           = document.getElementById("date-span");
let timeSpan           = document.getElementById("time-span");
let jsonPickedSpan     = document.getElementById("json-picked-span");
let jsonMonthSpan      = document.getElementById("json-month-span");
let jsonDaySpan        = document.getElementById("json-day-span");
let jsonYearSpan       = document.getElementById("json-year-span");
let jsonHourSpan       = document.getElementById("json-hour-span");
let jsonMinuteSpan     = document.getElementById("json-minute-span");
let jsonIsAMSpan       = document.getElementById("json-am-pm-span");
let jsonDayOfWeekSpan  = document.getElementById("json-day-of-week-span");
let dateTimeSpan1      = document.getElementById("date-time-span1");
let dateSpan1          = document.getElementById("date-span1");
let timeSpan1          = document.getElementById("time-span1");
let jsonPickedSpan1    = document.getElementById("json-picked-span1");
let jsonMonthSpan1     = document.getElementById("json-month-span1");
let jsonDaySpan1       = document.getElementById("json-day-span1");
let jsonYearSpan1      = document.getElementById("json-year-span1");
let jsonHourSpan1      = document.getElementById("json-hour-span1");
let jsonMinuteSpan1    = document.getElementById("json-minute-span1");
let jsonIsAMSpan1      = document.getElementById("json-am-pm-span1");
let jsonDayOfWeekSpan1 = document.getElementById("json-day-of-week-span1");

//Callback functions.
let showDateTimeString = (dateTimeString) => dateTimeSpan.innerHTML = dateTimeString;
let showDateString = (dateString) => dateSpan.innerHTML = dateString;
let showTimeString = (timeString) => timeSpan.innerHTML = timeString;
let showDateTimeJSON = (dateTimeJSON) =>
{
    jsonPickedSpan.innerHTML    = dateTimeJSON.isPicked;
    jsonMonthSpan.innerHTML     = dateTimeJSON.month;
    jsonDaySpan.innerHTML       = dateTimeJSON.day;
    jsonYearSpan.innerHTML      = dateTimeJSON.year;
    jsonHourSpan.innerHTML      = dateTimeJSON.hour;
    jsonMinuteSpan.innerHTML    = dateTimeJSON.minute;
    jsonIsAMSpan.innerHTML      = dateTimeJSON.ampm;
    jsonDayOfWeekSpan.innerHTML = dateTimeJSON.dayOfWeek;
}

let canDTP = new CanvDTP
(
    document.getElementById("dtp"),
    {
        dateTimeStringCb: showDateTimeString,
        dateStringCb:     showDateString,
        timeStringCb:     showTimeString,
        dateTimeJSONCb:   showDateTimeJSON
    }
)

//Can only get the textbox ID after the date/time picker has been created.
let tb     = document.getElementById("dtp-tb");
let tbSpan = document.getElementById("tb-span");

//Function calls.
let getData = () =>
{
    let dateTime = canDTP.getDateTimeString();
    let date     = canDTP.getDateString();
    let time     = canDTP.getTimeString();
    let json     = canDTP.getDateTimeJSON();

    //Get the text from the textbox.
    tbSpan.innerHTML = tb.value;

    dateTimeSpan1.innerHTML      = dateTime ? dateTime : "Null";
    dateSpan1.innerHTML          = date ? date : "Null";
    timeSpan1.innerHTML          = time ? time: "Null";
    jsonPickedSpan1.innerHTML    = json.isPicked;
    jsonMonthSpan1.innerHTML     = json.month;
    jsonDaySpan1.innerHTML       = json.day;
    jsonYearSpan1.innerHTML      = json.year;
    jsonHourSpan1.innerHTML      = json.hour;
    jsonMinuteSpan1.innerHTML    = json.minute;
    jsonIsAMSpan1.innerHTML      = json.ampm;
    jsonDayOfWeekSpan1.innerHTML = json.dayOfWeek;
}

setInterval(() => getData(), 1000);