let dateTimeSpan       = document.getElementById("date-time-span");
let jsonPickedSpan     = document.getElementById("json-picked-span");
let jsonMonthSpan      = document.getElementById("json-month-span");
let jsonDaySpan        = document.getElementById("json-day-span");
let jsonYearSpan       = document.getElementById("json-year-span");
let jsonHourSpan       = document.getElementById("json-hour-span");
let jsonMilHourSpan    = document.getElementById("json-mil-hour-span");
let jsonMinuteSpan     = document.getElementById("json-minute-span");
let jsonIsAMSpan       = document.getElementById("json-am-pm-span");
let jsonDayOfWeekSpan  = document.getElementById("json-day-of-week-span");
let jsonDayOfYearSpan  = document.getElementById("json-day-of-year-span");
let dateTimeSpan1      = document.getElementById("date-time-span1");
let jsonPickedSpan1    = document.getElementById("json-picked-span1");
let jsonMonthSpan1     = document.getElementById("json-month-span1");
let jsonDaySpan1       = document.getElementById("json-day-span1");
let jsonYearSpan1      = document.getElementById("json-year-span1");
let jsonHourSpan1      = document.getElementById("json-hour-span1");
let jsonMilHourSpan1   = document.getElementById("json-mil-hour-span1");
let jsonMinuteSpan1    = document.getElementById("json-minute-span1");
let jsonIsAMSpan1      = document.getElementById("json-am-pm-span1");
let jsonDayOfWeekSpan1 = document.getElementById("json-day-of-week-span1");
let jsonDayOfYearSpan1 = document.getElementById("json-day-of-year-span1");

//Callback functions.
let showDateTimeString = (dateTimeString) => dateTimeSpan.innerHTML = dateTimeString;
let showDateTimeJSON = (dateTimeJSON) =>
{
    jsonPickedSpan.innerHTML    = dateTimeJSON.isPicked;
    jsonMonthSpan.innerHTML     = dateTimeJSON.month;
    jsonDaySpan.innerHTML       = dateTimeJSON.day;
    jsonYearSpan.innerHTML      = dateTimeJSON.year;
    jsonHourSpan.innerHTML      = dateTimeJSON.hour;
    jsonMilHourSpan.innerHTML   = dateTimeJSON.milHour;
    jsonMinuteSpan.innerHTML    = dateTimeJSON.minute;
    jsonIsAMSpan.innerHTML      = dateTimeJSON.ampm;
    jsonDayOfWeekSpan.innerHTML = dateTimeJSON.dayOfWeek;
    jsonDayOfYearSpan.innerHTML = dateTimeJSON.dayOfYear;
}

let canDTP = new CanvDTP
(
    document.getElementById("dtp"),
    {
        dateTimeStringCb: showDateTimeString,
        dateTimeJSONCb:   showDateTimeJSON,
        //isDate:           false,
        //isTime:           false,
        dateTimeFormat:   "dddd, MMMM Do YYYY h:mm a. DDDo [Day of the Year]"
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

    dateTimeSpan1.innerHTML      = dateTime ? dateTime : "Null";
    jsonPickedSpan1.innerHTML    = json.isPicked;
    jsonMonthSpan1.innerHTML     = json.month;
    jsonDaySpan1.innerHTML       = json.day;
    jsonYearSpan1.innerHTML      = json.year;
    jsonHourSpan1.innerHTML      = json.hour;
    jsonMilHourSpan1.innerHTML   = json.milHour;
    jsonMinuteSpan1.innerHTML    = json.minute;
    jsonIsAMSpan1.innerHTML      = json.ampm;
    jsonDayOfWeekSpan1.innerHTML = json.dayOfWeek;
    jsonDayOfYearSpan1.innerHTML = json.dayOfYear;
}

setInterval(() => getData(), 1000);