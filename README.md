# canvas-date-time-picker
A date/time picker that uses plain Javascript and the canvas API

I've decided to go in and add tons of configurable functionality.  Working on that now! May take a few days.  
Last updated: 4/5/2020.

## __Things that will be added:__
- Fully customizeable date/time format string. ***Done***
- Choose which day is the start of the week. ***Done***
- Week of year calculations. ***Done***
- Get date/time string function call. ***Done***
- Get date/time JSON object. ***Done***
- Change date/time event listener(return string). ***Done***
- Change date/time event listener(return JSON object). ***Done***
- Military time format. ***Done***
- Minimum and maximum date ranges.
- Enble/disable open/close animation.
- Maximum pixel width of date/time picker.
- Blocked out dates with hover over info text.
- Spotlight dates with hover over info text.
- Whitelist for blocked out/spotlight dates.
- Enable/disable individual views.
- Military hour picker view.
- Standard hour picker view.
- minute picker view.
- Enable/disable calendar icon (bring up picker when text box clicked).
- Enable/disable picker always open.
- Date picker only.
- Time picker only.
- API configuration calls.
- open, close, event listeners.

## __Things that might be added:__
- Enable/disable text input.
- Picker relative position to textbox (left, right, top, bottom).
- Set default date (other than current date) on picker first time open.
- Seperate format strings for user input and event listener/get functions output.

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

m    = No zero padd minute.  
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