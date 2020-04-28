# canvas-date-time-picker
A date/time picker that uses plain Javascript and the canvas API.  

The goal is to make a date/time picker consisting of a single class needing no other files.
No React, no Bootstrap, no JQuery, no CSS.  

Overview: https://nmikstas.github.io/canvas-date-time-picker/  
Documentation: https://nmikstas.github.io/canvas-date-time-picker/docs.html  


Last updated: 4/27/2020.  

## __Things that will be added:__
- ***Done*** Fully customizeable date/time format string.
- ***Done*** Choose which day is the start of the week.
- ***Done*** Week of year calculations.
- ***Done*** Get date/time string function call.
- ***Done*** Get date/time JSON object.
- ***Done*** Change date/time event listener(return string).
- ***Done*** Change date/time event listener(return JSON object).
- ***Done*** Military time format.
- ***Done*** Military hour picker view.
- ***Done*** Standard hour picker view.
- ***Done*** Minute picker view.
- ***Done*** Maximum pixel width of date/time picker.
- ***Done*** Enble/disable open/close animation.
- ***Done*** Add optional background images to the month view.
- ***Done*** Blocked/spotlight days in the month view.
- ***Done*** Whitelist for blocked/spotlight days in the month view.
- ***Done*** spotlight months in the year view.
- ***Done*** Whitelist for spotlight months in the year view.
- ***Done*** spotlight years in the decade view.
- ***Done*** Whitelist for spotlight years in the decade view.
- ***Done*** Enable/disable auto pick on picker first time open.
- ***Done*** Set initial date (other than current date) on picker first time open.
- ***Done*** Enable/disable today's date indicator.
- ***Done*** Minimum and maximum date ranges.
- ***Done*** Enable/disable individual views.
- ***Done*** Enable/disable calendar icon.
- ***Done*** Textbox click opens calendar.
- ***Done*** Picker relative position to textbox (left, right, top, bottom).
- ***Done*** Enable/disable picker always open.
- ***Done*** Date picker only.
- ***Done*** Time picker only.
- ***Done*** Utility functions.
- ***Done*** Callback functions.
- API configuration calls.

# __Callback Functions__ #
***Done*** dateTimeStringCb - Returns a string representation of the currently selected date.  
***Done*** dateTimeJSONCb - Returns a JSON object of the currently selected date. {isPicked, string, month, day, year, hour, milHour, minute, ampm, dayOfWeek, dayOfYear, weekOfYear}  
***Done*** monthNextClickCb  
***Done*** monthPrevClickCb  
***Done*** yearNextClickCb  
***Done*** yearPrevClickCb  
***Done*** decadeNextClickCb  
***Done*** decadePrevClickCb  
***Done*** centuryNextClickCb  
***Done*** centuryPrevClickCb 
***Done*** openCb  
***Done*** closeCb  
***Done*** hourChangeCb  
***Done*** minuteChangeCb  
***Done*** ampmChangeCb  
***Done*** TimeClickCb  
***Done*** dateClickCb  
***Done*** monthClickCb  
***Done*** yearClickCb  
***Done*** decadeClickCb  
***Done*** yearViewClickCb  
***Done*** decadeViewClickCb  
***Done*** centuryViewClickCb  

# __Utiltity Functions__ #
The utility functions return the month and day of a floating holiday for a given year. The fixed holidays return the month and day of the holiday without the need to supply a year.  

***Done*** getEaster - Requires a year.  
***Done*** getThanksgiving - Requires a year.  
***Done*** getMLK - Requires a year.  
***Done*** getMothers - Requires a year.  
***Done*** getFathers - Requires a year.  
***Done*** getWashington - Requires a year.  
***Done*** getMemorial - Requires a year.  
***Done*** getLabor - Requires a year.  
***Done*** getColumbus - Requires a year.  
***Done*** getIndependence - Returns July 4th.  
***Done*** getChristmas - Returns December 25th.  
***Done*** getNewYears - Returns January 1st.  
***Done*** getHalloween - Returns October 31st.  
***Done*** getValentines - Returns February 14th.  
***Done*** getStPatricks - Returns March 17th.  
***Done*** getVeterans - Returns November 11th.  

# __API Function Calls__ #
***Done*** getDateTimeString - Returns a string representation of the currently selected date.  
***Done*** getDateTimeJSON - Returns a JSON object of the currently selected date 
***Done*** getPickerType - Returns the picker type (both date and time, date only, time only).  
***Done*** setPickerType - Sets the picker type  (both date and time, date only, time only).  
***Done*** getDayExcludeArray  
***Done*** setDayExcludeArray  
clearDayExcludeArray  
pushDayExcludeArray  
delDayExcludeElement  
getDayExcludeElement  
getDayWhiteArray  
setDayWhiteArray  
clearDayWhiteArray  
pushDayWhiteArray  
delDayWhiteElement  
getDayWhiteElement  
getMonthSpotlightArray  
setMonthSpotlightArray  
clearMonthSpotlightArray  
pushMonthSpotlightArray  
delMonthSpotlightElement  
getMonthSpotlightElement  
getMonthWhiteArray  
setMonthWhiteArray  
clearMonthWhiteArray  
pushMonthWhiteArray  
delMonthWhiteElement  
getMonthWhiteElement  
getYearSpotlightArray  
setYearSpotlightArray  
clearYearSpotlightArray  
pushYearSpotlightArray  
delYearSpotlightElement  
getYearSpotlightElement  
getYearWhiteArray  
setYearWhiteArray  
clearYearWhiteArray  
pushYearWhiteArray  
delYearWhiteElement  
getYearWhiteElement  
getMonthImageArray  
setMonthImageArray  
getMonthImageElement  
setMonthImageElement  
getDebug  
setDebug  
getFontColors  
setFontColors  
getDateTimeFormat  
setDateTimeFormat  
getIsAnimated  
setIsAnimated  
getMaxPixelWidth  
setMaxPixelWidth  
getStartOfWeek  
setStartOfWeek  
getIsMilitaryTime  
setIsMilitaryTime  
getFontStyle  
setFontStyle  
getDateRanges  
setDateRanges  
getInitDate  
setInitDate  
getAutoPick  
setAutoPick  
getTodayIndicator  
setTodayIndicator  
getTodaysDate  
setTodaysDate  
getTopView  
setTopView  
getCalendarIcon  
setCalendarIcon  
getBodyPosition  
setBodyPosition  
getDayVertOffset  
setDayVertOffset  
getIconCanvasParams  
setIconCanvasParams  
getBodyCanvasParams  
setBodyCanvasParams  
getInfoTextParams  
setInfoTextParams  
getSelectableParams  
setSelectableParams  
getPrevNextParams  
setPrevNextParams  
getClockParams  
setClockParams  
getCalendarParams  
setCalendarParams  
getWeekHeaderParams  
setWeekHeaderParams  
getSelectedParams  
setSelectedParams  
getTodaysDateParams  
setTodaysDateParams  
getIncDecParams  
setIncDecParams  
getScales  
setScales  
getZIndex  
setZIndex  

# __These are some quick notes on the functionality of the date/time fomat string:__  
M    = No zero pad month.       ***Can append ordinal***  
MM   = Zero padded month.  
MMM  = Abbreviated month name.  
MMMM = Full month name.  

D    = No zero pad day.         ***Can append ordinal***  
DD   = Zero padded day.  
DDD  = No zero pad day of year. ***Can append ordinal***  
DDDD = Zero padded day of year.  

W    = No zero pad week of year. ***Can append ordinal***  
WW   = Zero padded week of year.  

d    = Day of week (0 - 6, Sunday through Saturday).  
dd   = Abbreviated day of week (Su, Mo, Tu, We, Th, Fr, Sa).  
ddd  = Abbreviated day of week (Sun, Mon, Tue, Wed, Thu, Fri, Sat).  
dddd = Full day of week.  

Y    = 4 digit year.  
YY   = 2 digit year.  
YYYY = 4 digit year.  

H    = No zero pad military hour.  
HH   = Zero padded military hour.  

h    = No zero pad standard hour.  
hh   = Zero padded standard hour.  

m    = No zero pad minute.  
mm   = Zero padded minute.   

a    = am/pm.  
p    = am/pm.  

A    = AM/PM.  
P    = AM/PM.  

o    = add st, nd, rd, th to end of non-zero padded day, month, day of year and/or week of year.  
[]   = escaped characters.

# __Date/time format string example:__  
"dddd, MMMM Do YYYY h:mm a. DDDo [Day of the Year], Wo [Week of the Year]"  
__Displays as:__  
Sunday, April 5th 2020 8:38 pm. 96th Day of the Year, 15th Week of the Year