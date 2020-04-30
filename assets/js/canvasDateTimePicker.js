"use strict";

class CanvDTP
{
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                       Enumerations                                        //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    //Number of day squares on the calendar
    static get NUM_DAYS() {return 42}

    //Animation constants.
    static get BODY_OPEN()       {return 0x00}
    static get BODY_CLOSED()     {return 0x01}
    static get BODY_EXPANDING()  {return 0x02}
    static get BODY_COLLAPSING() {return 0x03}

    //Calendar view.
    static get CAL_CENTURY()  {return 0x00}
    static get CAL_DECADE()   {return 0x01}
    static get CAL_YEAR()     {return 0x02}
    static get CAL_MONTH()    {return 0x03}
    static get CAL_MINUTE()   {return 0x04}
    static get CAL_STD_HOUR() {return 0x05}
    static get CAL_MIL_HOUR() {return 0x06}
    static get CAL_MIN_HOUR() {return 0x07}

    //Calendar date or time.
    static get CAL_DATE() {return 0x00}
    static get CAL_TIME() {return 0x01}

    //Day of week.
    static get SUNDAY()    {return 0}
    static get MONDAY()    {return 1}
    static get TUESDAY()   {return 2}
    static get WEDNESDAY() {return 3}
    static get THURSDAY()  {return 4}
    static get FRIDAY()    {return 5}
    static get SATURDAY()  {return 6}

    //Months.
    static get JANUARY()   {return 1}
    static get FEBRUARY()  {return 2}
    static get MARCH()     {return 3}
    static get APRIL()     {return 4}
    static get MAY()       {return 5}
    static get JUNE()      {return 6}
    static get JULY()      {return 7}
    static get AUGUST()    {return 8}
    static get SEPTEMBER() {return 9}
    static get OCTOBER()   {return 10}
    static get NOVEMBER()  {return 11}
    static get DECEMBER()  {return 12}

    //Different types of selectable items.
    static get SEL_DAY()      {return 0x00}
    static get SEL_PREVIOUS() {return 0x01}
    static get SEL_NEXT()     {return 0x02}
    static get SEL_TIME()     {return 0x03}
    static get SEL_DATE()     {return 0x04}
    static get SEL_VIEW()     {return 0x05}
    static get SEL_MONTH()    {return 0x06}
    static get SEL_YEAR()     {return 0x07}
    static get SEL_DECADE()   {return 0x08}
    static get SEL_MINC1()    {return 0x09}
    static get SEL_MINC10()   {return 0x0A}
    static get SEL_MDEC1()    {return 0x0B}
    static get SEL_MDEC10()   {return 0x0C}
    static get SEL_HINC1()    {return 0x0D}
    static get SEL_HDEC1()    {return 0x0E}
    static get SEL_AMPM()     {return 0x0F}
    static get SEL_MINUTE()   {return 0x10}
    static get SEL_HOUR()     {return 0x11}

    //Displayed days of month types.
    static get DAY_THIS() {return 0x00}
    static get DAY_PRE()  {return 0x01}
    static get DAY_POST() {return 0x02}

    //Debug grid types.
    static get GRID_MONTH()    {return 0x00}
    static get GRID_GENERAL()  {return 0x01}
    static get GRID_TIME()     {return 0x02}
    static get GRID_MINUTE()   {return 0x03}
    static get GRID_STD_HOUR() {return 0x04}
    static get GRID_MIL_HOUR() {return 0x05}

    //Time increment types.
    static get INC_1()  {return 0x00}
    static get DEC_1()  {return 0x01}
    static get INC_10() {return 0x02}
    static get DEC_10() {return 0x03}

    //Whitelist types.
    static get WHITE_BOTH()  {return 0x00}
    static get WHITE_SPTLT() {return 0x01}
    static get WHITE_BLOCK() {return 0x02}
    static get WHITE_NONE()  {return 0x03}

    //Picker format types.
    static get PICK_BOTH() {return 0x00}
    static get PICK_DATE() {return 0x01}
    static get PICK_TIME() {return 0x02}

    //Date compare return types.
    static get DATE_EQUAL()    {return 0x00}
    static get DATE_GREATER()  {return 0x01}
    static get DATE_LESS()     {return 0x02}
    static get DATE_1INVALID() {return 0x03}
    static get DATE_2INVALID() {return 0x04}

    //Bosy canvas position relative to the textbox.
    static get POS_BOTLEFT()  {return 0x00}
    static get POS_BOTRIGHT() {return 0x01}
    static get POS_TOPLEFT()  {return 0x02}
    static get POS_TOPRIGHT() {return 0x03}

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                        Constructor                                        //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    constructor
    (
        parentDiv,
        {
            /******************************** Callback Functions *********************************/

            dateTimeStringCb    = null, //Returns selected time string.
            dateTimeJSONCb      = null, //Returns selected time JSON object.
            openCb              = null,
            closeCb             = null,
            hourChangeCb        = null,
            minuteChangeCb      = null,
            ampmChangeCb        = null,
            TimeClickCb         = null,
            dateClickCb         = null,
            dayClickCb          = null,
            monthClickCb        = null,
            yearClickCb         = null,
            decadeClickCb       = null,
            monthViewClickCb    = null,
            yearViewClickCb     = null,
            decadeViewClickCb   = null,
            centuryViewClickCb  = null,
            monthNextClickCb    = null,
            monthPrevClickCb    = null,
            yearNextClickCb     = null,
            yearPrevClickCb     = null,
            decadeNextClickCb   = null,
            decadePrevClickCb   = null,
            centuryNextClickCb  = null,
            centuryPrevClickCb  = null,

            /***************************** Configuration Parameters ******************************/

            debug               = false,               //Enable/disable debug.
            zIndex              = 1,                   //Z index of the body canvas.
            dateTimeFormat      = null,                //Enable date and/or time and set the string format.
            pickerType          = CanvDTP.PICK_BOTH,   //Enable date and/or time picker.
            isAnimated          = true,                //Enable/disable open/close animation.
            maxPixelWidth       = null,                //Maximum width in pixels of the body canvas.
            startOfWeek         = CanvDTP.SUNDAY,      //Sets which day the week starts on.
            isMilitaryTime      = false,               //Select time format.
            dayExcludeArray     = [],                  //Array of excluded months, days, years in the month view.
            dayWhiteArray       = [],                  //Array of whitelist months, days, years in the month view.
            monthSpotlightArray = [],                  //Array of spotlighted months in the year view.
            monthWhiteArray     = [],                  //Array of whitelist months, in the year view.
            yearSpotlightArray  = [],                  //Array of spotlighted years in the decade view.
            yearWhiteArray      = [],                  //Array of whitelist years, in the decade view.
            monthImages         = [],                  //Optional images to display in the month view.
            fontStyle           = "Arial",             //The font to use for all the text.
            textMainColorn      = "#000000",           //The primary color for non-hovered items.
            textMainColorh      = "#ffffff",           //The primary color for hovered items.
            textAltColorn       = "#888888",           //The alternate for non-hovered items.
            textAltColorh       = "#ff8888",           //The alternate for hovered items.
            rangeBkColor        = "#000000a0",         //Out of range date colors.
            firstDate           = null,                //Earliest date available to user.
            lastDate            = null,                //Latest date available to user.
            initDate            = null,                //Date to use on first pick when picker opened.
            autoPick            = true,                //Enable automatic date pick when picker opened.
            todaysDate          = true,                //Enable today's date marker on calendar.
            topView             = CanvDTP.CAL_CENTURY, //Top view is the century view.
            calendarIcon        = true,                //Enable the calendar icon next to the textbox.
            bodyPosition        = CanvDTP.POS_BOTLEFT, //Position of body canvas with respect to the textbox.
            isCollapsible       = true,                //Allows the body canvas to be minimized.
            
            /****************************** Icon Canvas Parameters *******************************/

            iBorderColorn = "#a0a0a0",
            iFillColorn   = "#d0d0d0",
            iCalColorn    = "#000000",
            iBorderColorh = "#202020",
            iFillColorh   = "#808080",
            iCalColorh    = "#ffffff",
            iBorderRadius = .20,
            iBorderWeight = .05,
            iXPadding     = .20,
            iYPadding     = .20,
            iLineWidth    = .02,

            /****************************** Body Canvas Parameters *******************************/

            bBorderColor  = "#707070",
            bFillColor    = "#e0e0e0",
            bBorderRadius = .05,
            bBorderWeight = .01,
            bXPadding     = .10,
            bYPadding     = .10,
            bLineWidth    = .02,

            /******************************* Info Text Parameters ********************************/
            infoPointerSize  = "10px",
            infoBackColor    = "#000000a0",
            infoTextColor    = "#ffffff",
            infoPadding      = "2px, 5px",
            infoWidth        = "150px",
            infoBorderRadius = "10px",

            /********************************** View Parameters **********************************/

            //Selectable Items.
            selectBorderColor = "#202020a0",
            selectFillColor   = "#808080a0",
            selectRadius      = .25,
            selectWeight      = .07,
            
            //Previous/Next Parameters.
            prevNextXPad   = .20,
            prevNextYPad   = .25,
        
            //Clock Graphic Parameters.
            clockPad    = .10,
            clockWeight = .07,

            //Calendar Graphic Parameters.
            calXPadding  = .20,
            calYPadding  = .10,
            calLineWidth = .05,

            //Days of Week header.
            headerColor = "#0087b6",
            headerScale = .80,

            //Currently Selected Day.
            currentBorderColor = "#000000",
            currentFillColor   = "#ffffff80",
            currentRadius      = .25,
            currentWeight      = .02,

            //Today's Date.
            nowColor  = "#000000",
            nowWeight = .20,

            //Increment/Decrement Parameters.
            incXPad   = .25,
            incYPad   = .10,
            incWeight = .25,

            //Vertical offset for days of month.
            dayVertOffset = .05,

            bannerScale   = .80, //View banner.
            dayScale      = .60, //Days of Month.
            monthScale    = .60, //Month Text.
            yearScale     = .60, //Year Text.
            decadeScale   = .50, //Decade Text.
            timeScale     = .80, //Time view text.
            timeAmPmScale = .60, //AM/PM text.
            minuteScale   = .80, //Minute view text.
            hourScale     = .80  //Hour view text.
        } = {}
    )
    {
        this.debug               = debug;
        this.fontStyle           = fontStyle;
        this.textMainColorn      = textMainColorn;
        this.textMainColorh      = textMainColorh;
        this.textAltColorn       = textAltColorn;
        this.textAltColorh       = textAltColorh;
        this.bannerScale         = bannerScale;
        this.dateTimeStringCb    = dateTimeStringCb;
        this.dateTimeJSONCb      = dateTimeJSONCb;
        this.openCb              = openCb;
        this.closeCb             = closeCb;
        this.hourChangeCb        = hourChangeCb;
        this.minuteChangeCb      = minuteChangeCb;
        this.ampmChangeCb        = ampmChangeCb;
        this.TimeClickCb         = TimeClickCb;
        this.dateClickCb         = dateClickCb;
        this.dayClickCb          = dayClickCb;
        this.monthClickCb        = monthClickCb;
        this.yearClickCb         = yearClickCb;
        this.decadeClickCb       = decadeClickCb;
        this.monthViewClickCb    = monthViewClickCb;
        this.yearViewClickCb     = yearViewClickCb;
        this.decadeViewClickCb   = decadeViewClickCb;
        this.centuryViewClickCb  = centuryViewClickCb;
        this.monthNextClickCb    = monthNextClickCb;
        this.monthPrevClickCb    = monthPrevClickCb;
        this.yearNextClickCb     = yearNextClickCb;
        this.yearPrevClickCb     = yearPrevClickCb;
        this.decadeNextClickCb   = decadeNextClickCb;
        this.decadePrevClickCb   = decadePrevClickCb;
        this.centuryNextClickCb  = centuryNextClickCb;
        this.centuryPrevClickCb  = centuryPrevClickCb;
        this.dateTimeFormat      = dateTimeFormat;
        this.pickerType          = pickerType;
        this.isAnimated          = isAnimated;
        this.maxPixelWidth       = maxPixelWidth;
        this.startOfWeek         = startOfWeek;
        this.isMilitaryTime      = isMilitaryTime;
        this.topView             = topView;
        this.dayExcludeArray     = [...dayExcludeArray];
        this.dayWhiteArray       = [...dayWhiteArray];
        this.monthSpotlightArray = [...monthSpotlightArray];
        this.monthWhiteArray     = [...monthWhiteArray];
        this.yearSpotlightArray  = [...yearSpotlightArray];
        this.yearWhiteArray      = [...yearWhiteArray];
        this.monthImages         = [...monthImages];
        this.initDate            = initDate;
        this.firstDate           = firstDate;
        this.lastDate            = lastDate;
        this.autoPick            = autoPick;
        this.todaysDate          = todaysDate;
        this.calendarIcon        = calendarIcon;
        this.bodyPosition        = bodyPosition;
        this.isCollapsible       = isCollapsible;
        this.iBorderRadius       = iBorderRadius;
        this.iBorderWeight       = iBorderWeight;
        this.iXPadding           = iXPadding;
        this.iYPadding           = iYPadding;
        this.iLineWidth          = iLineWidth;
        this.iBorderColorn       = iBorderColorn;
        this.iFillColorn         = iFillColorn;
        this.iCalColorn          = iCalColorn;
        this.iBorderColorh       = iBorderColorh;
        this.iFillColorh         = iFillColorh;
        this.iCalColorh          = iCalColorh;
        this.selectRadius        = selectRadius;
        this.selectWeight        = selectWeight;
        this.selectBorderColor   = selectBorderColor;
        this.selectFillColor     = selectFillColor;
        this.headerScale         = headerScale;
        this.headerColor         = headerColor;
        this.dayVertOffset       = dayVertOffset;
        this.dayScale            = dayScale;     
        this.prevNextXPad        = prevNextXPad;
        this.prevNextYPad        = prevNextYPad;
        this.clockPad            = clockPad;
        this.clockWeight         = clockWeight;
        this.currentRadius       = currentRadius;
        this.currentWeight       = currentWeight;
        this.currentBorderColor  = currentBorderColor;
        this.currentFillColor    = currentFillColor;
        this.nowWeight           = nowWeight;
        this.nowColor            = nowColor;
        this.monthScale          = monthScale;
        this.yearScale           = yearScale;
        this.decadeScale         = decadeScale;
        this.calXPadding         = calXPadding;
        this.calYPadding         = calYPadding;
        this.calLineWidth        = calLineWidth;
        this.timeScale           = timeScale;
        this.timeAmPmScale       = timeAmPmScale;
        this.incXPad             = incXPad;
        this.incYPad             = incYPad;
        this.incWeight           = incWeight;
        this.bBorderRadius       = bBorderRadius;
        this.bBorderWeight       = bBorderWeight;
        this.bXPadding           = bXPadding;
        this.bYPadding           = bYPadding;
        this.bLineWidth          = bLineWidth;
        this.bBorderColor        = bBorderColor;
        this.bFillColor          = bFillColor;
        this.minuteScale         = minuteScale;
        this.hourScale           = hourScale;
        this.infoPointerSize     = infoPointerSize;
        this.infoBackColor       = infoBackColor;
        this.infoTextColor       = infoTextColor;
        this.infoPadding         = infoPadding;
        this.infoWidth           = infoWidth;
        this.infoBorderRadius    = infoBorderRadius;
        this.rangeBkColor        = rangeBkColor;

        /***************************** Rendering Dimension Variables *****************************/

        //Dimensions of the content after body padding taken into account.
        this.contentWidth;
        this.contentHeight;
        this.contentLeft;
        this.contentRight;
        this.contentTop;
        this.contentBottom;

        //Heights and widths of the various selection boxes.
        this.smallBoxHeight;
        this.smallBoxWidth;
        this.bigBoxHeight;
        this.bigBoxWidth;

        //Inner dimensions for year, decade and century views.
        this.innerTop;
        this.innerBottom;
        this.innerLeft;
        this.innerRight;

        //Dimensions for the time view only.
        this.timeWidth;
        this.timeHeight;
        this.timeLeft;
        this.timeRight;
        this.timeTop;
        this.timeBottom;
        this.timeBoxWidth;
        this.timeBoxHeight;
        
        //Clock graphic radius.
        this.clockRadius;

        //Text centering variables.
        this.text;
        this.textHeight;
        this.textWidth;
        this.textLeft;
        this.textBottom;

        /************************************ Misc Variables *************************************/

        //HTML nodes required for date/time picker.
        this.parentDiv = parentDiv;
        this.paddingDiv;
        this.dtpText;
        this.canParent;
        this.bodyCanvas;
        this.iconCanvas;
        this.infotext;

        //Set the z index of the body canvas.
        this.zIndex = zIndex;

        //Contexts of the canvases.
        this.ctxDTP;
        this.ctxIcon;

        //Current icon colors.
        this.iBorderColor = this.iBorderColorn;
        this.iFillColor   = this.iFillColorn;
        this.iCalColor    = this.iCalColorn;

        //Keep track of the body canvas animation state.
        this.bodyCanAnim = CanvDTP.BODY_CLOSED;
        this.bodyAnimTimer;
        this.bodyAnimStep;

        //Both canvases are squares.  Keep track of their dimensions.
        this.bodyCanWidth = 0;
        this.bodyCanMaxWidth;
        this.iconCanWidth;

        //Animation variables.
        this.animTime  = 25;
        this.animSteps = 10;

        //Keep track of the x and y mouse position over the body canvas.
        this.bodyX = -1000;
        this.bodyY = -1000;

        //Mouse Pointer
        this.PointerWidth = .005,
        this.PointerRad   = .01,
        this.PointerColor = "#000000",

        //Variables for keeping track of date and time.
        this.isFirstPicked = false;
        this.isLeapYear    = false;
        this.pickedDay     = 0;
        this.dayType       = CanvDTP.DAY_THIS;

        //Currently selected date and time.
        this.month         = undefined;
        this.day           = undefined;
        this.year          = undefined;
        this.hour          = undefined;
        this.milHour       = undefined;
        this.minute        = undefined;
        this.isAM          = undefined;
        this.dayOfWeek     = undefined;
        this.dayOfYear     = undefined;
        this.weekOfYear    = undefined;
        this.dayMonthStart = undefined;

        //Date used for drawing current canvas values.
        this.tempMonth   = 1;
        this.tempYear    = 2000;
        this.tempDecade  = 2000;
        this.tempCentury = 2000;
        this.tempMinute;
        this.tempHour;

        //Todays date.
        this.nowYear;
        this.nowMonth;
        this.nowDay;

        //Keep track of currently picked item and view.
        this.isPicked     = false;
        this.calView      = CanvDTP.CAL_MONTH;
        this.timeView     = CanvDTP.CAL_MIN_HOUR;
        this.dateTime     = CanvDTP.CAL_DATE;
        this.pickedType   = null;
        this.pickedMonth  = 0;
        this.pickedYear   = 0;
        this.pickedDecade = 0;

        //Keep track of wether out or range checks need to be done.
        this.checkBefore = false;
        this.checkAfter  = false;
        this.firstHit    = false;
        this.lastHit     = false;

        //Array of excluded/highlighted days for the currently selected month.
        this.monthSpecial = new Array(42);
        this.updateMonth  = false;

        //Array of highlighted months for the currently selected year.
        this.yearSpecial = new Array(12);
        this.updateYear  = false;

        //Array of highlighted years for the currently selected decade.
        this.decadeSpecial = new Array(12);
        this.updateDecade  = false;

        //Calendar drawing and hit detection variables.
        this.dayArray       = new Array(42);
        this.hitBounds      = [];
        this.days           = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        this.days3          = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.daysFull       = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.monthDaysArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.MonthsArray    =
        [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];
        this.shortMonthsArray =
        [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        //Only create date/time picker if the parent exists.
        if(this.parentDiv)this.init();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                      Class Functions                                      //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**************************************** Initialize *****************************************/

    init()
    {
        //Create the components necessary for the date/time picker.
        this.paddingDiv = document.createElement("div");
        this.bodyCanvas = document.createElement("canvas");
        this.dtpText    = document.createElement("input");
        this.canParent  = document.createElement("div");
        this.infoParent = document.createElement("div");
        this.infoText   = document.createElement("span");
        this.infoPoint  = document.createElement("span");

        //Do not draw calendar icon if the calendar is not collapsible.
        if(!this.isCollapsible) this.calendarIcon = false;

        //Only create an icon canvas if it is enabled.
        if(this.calendarIcon) this.iconCanvas = document.createElement("canvas");
        
        //Setup initial styling of the info text.
        this.infoParent.style.position      = "absolute";
        this.infoParent.style.textAlign     = "center";
        this.infoText.style.transform       = "translate(-50%, 0%)";
        this.infoText.style.visibility      = "hidden";
        this.infoText.style.textAlign       = "center";
        this.infoText.style.position        = "absolute";
        this.infoText.style.overflow        = "hidden";
        this.infoPoint.style.transform      = "translate(0%, -100%)";
        this.infoPoint.style.visibility     = "hidden";
        this.infoPoint.style.position       = "absolute";
        this.infoPoint.style.borderStyle    = "solid";
        this.infoPoint.style.zIndex         = this.zIndex;
        this.infoText.style.zIndex          = this.zIndex;
        this.infoText.style.backgroundColor = this.infoBackColor;
        this.infoText.style.color           = this.infoTextColor;
        this.infoText.style.borderRadius    = this.infoBorderRadius;
        this.infoText.style.width           = this.infoWidth;
        this.infoText.style.padding         = this.infoPadding;
        this.infoText.style.bottom          = this.infoPointerSize;      
        this.infoPoint.style.marginLeft     = "-" + this.infoPointerSize;
        this.infoPoint.style.borderWidth    = this.infoPointerSize + " " + this.infoPointerSize + " 0px " + this.infoPointerSize;
        this.infoPoint.style.borderColor    = this.infoBackColor + " transparent transparent transparent";

        //Add an id to the text box.
        this.dtpText.setAttribute("id", this.parentDiv.id + "-tb");

        //Get 2D contexts of the canvases.
        this.ctxDTP  = this.bodyCanvas.getContext("2d");
        if(this.calendarIcon) this.ctxIcon = this.iconCanvas.getContext("2d");

        //Clear anything out of the parent div.
        this.parentDiv.innerHTML = "";

        //Add all the components to the div.
        this.paddingDiv.appendChild(this.dtpText);
        if(this.calendarIcon) this.paddingDiv.appendChild(this.iconCanvas);
        this.paddingDiv.appendChild(this.canParent);
        this.canParent.appendChild(this.bodyCanvas);
        this.parentDiv.appendChild(this.paddingDiv);
        this.canParent.appendChild(this.infoParent);  
        this.infoParent.appendChild(this.infoText);
        this.infoParent.appendChild(this.infoPoint);      

        //Add placeholder text to the textbox and make it read only.
        this.dtpText.placeholder = this.calendarIcon ? "Click Icon for Date/Time" : "Click Textbox for Date/Time";
        this.dtpText.readOnly    = true;
        
        //Setup positioning to ignore any parent padding.
        this.paddingDiv.style.position = "relative";
        if(this.calendarIcon) this.iconCanvas.style.position = "absolute";
        this.canParent.style.position  = "absolute";
        this.bodyCanvas.style.position = "absolute";
        this.bodyCanvas.style.zIndex   = this.zIndex;

        //Setup default cursor for icon canvas.
        if(this.calendarIcon) this.iconCanvas.style.cursor = "pointer";

        //Add resize and click listeners to the window.
        window.addEventListener("resize", () => this.resize());
        window.addEventListener("click", (event) => this.windowClick(event));

        //Add icon event listeners.
        if(this.calendarIcon) 
        {
            this.iconCanvas.addEventListener("mouseenter", () => this.iconEnter());
            this.iconCanvas.addEventListener("mouseleave", () => this.iconExit());
            this.iconCanvas.addEventListener("click", () => this.iconClick());
        }

        //Add body event listeners.
        this.bodyCanvas.addEventListener('mousemove',  (e) => this.bodyCoords(e));
        this.bodyCanvas.addEventListener('mouseleave', () => this.bodyExit());
        this.bodyCanvas.addEventListener("click", () => this.bodyClick());

        //Add textbox event listener.
        this.dtpText.addEventListener("click", () => this.textClick());

        //Setup picker type.
        if(this.pickerType === CanvDTP.PICK_TIME)
        {
            this.dateTime = CanvDTP.CAL_TIME;
        }

        //Format the max pixel width variable.
        if(this.maxPixelWidth) this.maxPixelWidth = parseInt(Math.abs(this.maxPixelWidth));
        this.resize();
    }

    /************************************* Window Listeners **************************************/

    resize()
    {
        let rect    = this.parentDiv.getBoundingClientRect();
        let padRect = this.paddingDiv.getBoundingClientRect();

        //Set the width of the text area - leave room for the icon canvas.
        if(this.calendarIcon)
        {
            this.dtpText.style.width = (rect.width - rect.height) + "px";
        }
        else
        {
            this.dtpText.style.width = rect.width + "px";
        }
        
        //Save a copy of the canvas widths. Base for future calculations.
        this.bodyCanMaxWidth = rect.width;
        this.iconCanWidth = rect.height;

        //Set the animation step size for the body canvas.
        this.bodyAnimStep = this.bodyCanMaxWidth / this.animSteps;

        //Maximize the canvas size if it is open.
        if(this.bodyCanAnim === CanvDTP.BODY_OPEN)
        {
            //Never exceed textbox width.
            this.bodyCanWidth = this.bodyCanMaxWidth;

            //Don't exceed user set max pixel width.
            if(this.maxPixelWidth && (this.bodyCanWidth > this.maxPixelWidth))
            {
                this.bodyCanWidth = this.maxPixelWidth;
            }
        }

        //Open the body canvase if its not collapsible.
        if(!this.isCollapsible)
        {
            let padHeight;
            this.bodyCanAnim = CanvDTP.BODY_OPEN;

            //Set the height of the calendar.
            if(this.maxPixelWidth && (this.maxPixelWidth < this.bodyCanMaxWidth))
            {
                this.bodyCanWidth = this.maxPixelWidth
                padHeight = this.maxPixelWidth;
            }
            else
            {
                this.bodyCanWidth = this.bodyCanMaxWidth;
                padHeight = rect.width;
            }

            //Move the textbox to the bottom if the calendar is above it.
            if(this.bodyPosition === CanvDTP.POS_TOPRIGHT || this.bodyPosition === CanvDTP.POS_TOPLEFT)
            {
                this.paddingDiv.style.top = padHeight + "px";
            }

            //Set the height of the main div that contains all the sub-components.
            this.parentDiv.style.height = (padHeight + padRect.height) + "px";
            
            //Check if date/time has been picked already.
            if(!this.isFirstPicked) this.firstPick();
        }

        //Make the date/time picker a square.
        this.bodyCanvas.width       = this.bodyCanWidth;
        this.bodyCanvas.height      = this.bodyCanWidth;
        this.canParent.style.width  = "" + this.bodyCanWidth + "px";
        this.canParent.style.height = "" + this.bodyCanWidth + "px";

        this.bodyCanvas.style.left = "0px";
        this.bodyCanvas.style.top  = "0px";

        
        let leftPos = rect.width - this.bodyCanWidth;
        
        //Place the main date/time picker in the proper location.
        switch(this.bodyPosition)
        {
            case CanvDTP.POS_TOPLEFT:
                this.canParent.style.left = "0px";
                this.canParent.style.bottom  = padRect.height + "px";
                break;

            case CanvDTP.POS_TOPRIGHT:
                this.canParent.style.left = leftPos + "px";
                this.canParent.style.bottom  = padRect.height + "px";
                break
                
            case CanvDTP.POS_BOTRIGHT:
                this.canParent.style.left = leftPos + "px";
                this.canParent.style.top  = padRect.height + "px";
                break;

            default:
                this.canParent.style.left = "0px";
                this.canParent.style.top  = padRect.height + "px";
                break;
        }

        //Place the calendar icon to the right of the text box.
        if(this.calendarIcon)
        {
            this.iconCanvas.width  = this.iconCanWidth;
            this.iconCanvas.height = this.iconCanWidth;
        }

        //Round the text box left border.
        if(this.calendarIcon)
        {
            this.dtpText.style.borderTopLeftRadius    = (this.iconCanWidth * this.iBorderRadius) + "px";
            this.dtpText.style.borderBottomLeftRadius = (this.iconCanWidth * this.iBorderRadius) + "px";
        }

        //Draw the date/time picker.
        if(this.calendarIcon) this.iconDraw();
        this.bodyDraw();
    }

    //Close body canvas if click occurs outside of date/time picker.
    windowClick(event)
    {
        if(event.target !== this.bodyCanvas && event.target !== this.iconCanvas && event.target !== this.dtpText)
        {
            if(this.bodyCanAnim === CanvDTP.BODY_OPEN || this.bodyCanAnim === CanvDTP.BODY_EXPANDING)
            {
                this.bodyCanAnim = !this.isAnimated ? CanvDTP.BODY_CLOSED : CanvDTP.BODY_COLLAPSING;
                clearInterval(this.bodyAnimTimer);
                this.bodyAnimTimer = setInterval(() => this.bodyAnimate(), this.animTime);
            }
        }        
    }

    /********************************** Textbox Event Listener ***********************************/

    textClick()
    {
        //Set the animation to expanding or collapsing.
        if(this.bodyCanAnim === CanvDTP.BODY_CLOSED || this.bodyCanAnim === CanvDTP.BODY_COLLAPSING) 
        {
            this.bodyCanAnim = this.isAnimated ? CanvDTP.BODY_EXPANDING : CanvDTP.BODY_OPEN;

            //Check if date/time has been picked already.
            if(!this.isFirstPicked) this.firstPick();
        
            clearInterval(this.bodyAnimTimer);
            this.bodyAnimTimer = setInterval(() => this.bodyAnimate(), this.animTime);
        } 
    }

    /*********************************** Icon Canvas Functions ***********************************/

    //Change icon colors when mouse is hovering over it.
    iconEnter()
    {
        this.iBorderColor = this.iBorderColorh;
        this.iFillColor   = this.iFillColorh;
        this.iCalColor    = this.iCalColorh;
        this.iconDraw();
    }

    //Change icon colors when mouse is not hovering over it.
    iconExit()
    {
        this.iBorderColor = this.iBorderColorn;
        this.iFillColor   = this.iFillColorn;
        this.iCalColor    = this.iCalColorn;
        this.iconDraw();
    }

    //Event listener callback for animation body canvas.
    iconClick()
    {
        //Set the animation to expanding or collapsing.
        this.bodyCanAnim = (this.bodyCanAnim === CanvDTP.BODY_CLOSED || this.bodyCanAnim === CanvDTP.BODY_COLLAPSING) ?
            (this.isAnimated ? CanvDTP.BODY_EXPANDING : CanvDTP.BODY_OPEN) :
            (this.isAnimated ? CanvDTP.BODY_COLLAPSING : CanvDTP.BODY_CLOSED);

        //Check if date/time has been picked already.
        if(!this.isFirstPicked) this.firstPick();
        
        clearInterval(this.bodyAnimTimer);
        this.bodyAnimTimer = setInterval(() => this.bodyAnimate(), this.animTime);
    }

    //Draw the calendar icon on the canvas.
    iconDraw()
    {
        //Exit if the canvas does not meet minimum size dimensions.
        if(this.iconCanWidth <= 5) return;

        //---------------- Draw the border ----------------

        let borderPx = this.iconCanWidth * this.iBorderWeight;

        this.ctxIcon.beginPath();
        this.ctxIcon.lineWidth = this.iconCanWidth * this.iBorderWeight;
        this.ctxIcon.strokeStyle = this.iBorderColor;

        this.ctxIcon.clearRect(0, 0, this.iconCanWidth, this.iconCanWidth);

        this.ctxIcon.arc
        (
            this.iconCanWidth - (this.iconCanWidth * this.iBorderRadius) - borderPx / 2,
            this.iconCanWidth * this.iBorderRadius + borderPx / 2,
            this.iconCanWidth * this.iBorderRadius,
            -Math.PI / 2,
            0
        );

        this.ctxIcon.arc
        (
            this.iconCanWidth - (this.iconCanWidth * this.iBorderRadius) - borderPx / 2,
            this.iconCanWidth - (this.iconCanWidth * this.iBorderRadius) - borderPx / 2,
            this.iconCanWidth * this.iBorderRadius,
            0,
            Math.PI / 2
        );

        this.ctxIcon.lineTo(borderPx / 2, this.iconCanWidth - borderPx / 2);
        this.ctxIcon.lineTo(borderPx / 2, borderPx / 2);
        this.ctxIcon.lineTo(this.iconCanWidth - this.iconCanWidth * this.iBorderRadius,  borderPx / 2);

        this.ctxIcon.fillStyle = this.iFillColor;
        this.ctxIcon.fill();
        this.ctxIcon.stroke();

        //----------- Draw the calendar graphic -----------

        //Calculate the padding pixels and line width.
        let iLWidth    = Math.ceil(this.iconCanWidth * this.iLineWidth);
        let iXPad      = this.iconCanWidth * this.iXPadding + iLWidth;
        let iYPad      = this.iconCanWidth * this.iYPadding + iLWidth;
        let iXWidth    = this.iconCanWidth - 2 * iXPad;
        let topWidth   = iXWidth / 5;
        let gridWidth  = iXWidth / 4;
        let gridTop    = iYPad + 2 * iLWidth;
        let gridBottom = this.iconCanWidth - (this.iconCanWidth * this.iYPadding + iLWidth);
        let gridHeight = (gridBottom - gridTop) / 4;

        //Draw the top of the calendar.
        this.ctxIcon.beginPath();
        this.ctxIcon.lineWidth = iLWidth;
        this.ctxIcon.strokeStyle = this.iCalColor;

        this.ctxIcon.moveTo(iXPad, iYPad);
        this.ctxIcon.lineTo(iXPad + topWidth, iYPad);
        this.ctxIcon.moveTo(iXPad + 2 * topWidth, iYPad);
        this.ctxIcon.lineTo(iXPad + 3 * topWidth, iYPad);
        this.ctxIcon.moveTo(iXPad + 4 * topWidth, iYPad);
        this.ctxIcon.lineTo(iXPad + 5 * topWidth, iYPad);

        this.ctxIcon.moveTo(iXPad, iYPad + iLWidth);
        this.ctxIcon.lineTo(iXPad + 5 * topWidth, iYPad + iLWidth);
        this.ctxIcon.moveTo(iXPad, iYPad + 2 * iLWidth);
        this.ctxIcon.lineTo(iXPad + 5 * topWidth, iYPad + 2 * iLWidth);

        //Draw calendar grid.
        this.ctxIcon.moveTo(iXPad, iYPad - iLWidth / 2);
        this.ctxIcon.lineTo(iXPad, gridBottom);
        this.ctxIcon.moveTo(iXPad + gridWidth, gridTop);
        this.ctxIcon.lineTo(iXPad + gridWidth, gridBottom);
        this.ctxIcon.moveTo(iXPad + 2 * gridWidth, gridTop);
        this.ctxIcon.lineTo(iXPad + 2 * gridWidth, gridBottom);
        this.ctxIcon.moveTo(iXPad + 3 * gridWidth, gridTop);
        this.ctxIcon.lineTo(iXPad + 3 * gridWidth, gridBottom);
        this.ctxIcon.moveTo(iXPad + 4 * gridWidth, iYPad - iLWidth / 2);
        this.ctxIcon.lineTo(iXPad + 4 * gridWidth, gridBottom);

        this.ctxIcon.moveTo(iXPad, gridTop + gridHeight);
        this.ctxIcon.lineTo(iXPad + iXWidth, gridTop + gridHeight);
        this.ctxIcon.moveTo(iXPad, gridTop + 2 * gridHeight);
        this.ctxIcon.lineTo(iXPad + iXWidth, gridTop + 2 * gridHeight);
        this.ctxIcon.moveTo(iXPad, gridTop + 3 * gridHeight);
        this.ctxIcon.lineTo(iXPad + iXWidth, gridTop + 3 * gridHeight);
        this.ctxIcon.moveTo(iXPad, gridTop + 4 * gridHeight);
        this.ctxIcon.lineTo(iXPad + iXWidth, gridTop + 4 * gridHeight);
        this.ctxIcon.stroke();
    }

    /************************************* Helper Functions **************************************/

    //This function is called only once on the first pick after a page load.
    firstPick()
    {
        //Get the current date and break it down.
        let todaysIndex   = -1;
        let todayExcluded = false;
        let isFirstValid  = true;
        let isLastValid   = true;
        let isOrderValid  = true;
        let date          = new Date();
        this.month        = date.getMonth() + 1;
        this.day          = date.getDate();
        this.year         = date.getFullYear();
        this.dayOfWeek    = date.getDay();
        this.dayOfYear    = this.getDayOfYear();
        this.isLeapYear   = this.leapCalc(this.year);
        this.minute       = date.getMinutes();
        this.hour         = date.getHours();
        this.milHour      = this.hour;

        //Convert military time to AM/PM.
        if(this.hour === 0)
        {
            this.hour = 12;
        }
        else if(this.hour === 12)
        {
            this.isAM = false;
        }
        else if(this.hour > 12)
        {
            this.isAM = false;
            this.hour -= 12;
        }

        //Add today's date to the calendar.
        if(this.todaysDate)
        {
            this.nowYear  = this.year;
            this.nowMonth = this.month;
            this.nowDay   = this.day;
        }
        
        //If an initial date is set, assign it to the calendar.
        if(this.initDate && this.checkValidDate(this.initDate))
        {
            this.month  = this.initDate.month;
            this.day    = this.initDate.day;
            this.year   = this.initDate.year;
        }

        //Display error if initial date is invalid.
        if(this.initDate && !this.checkValidDate(this.initDate))
        {
            console.log("Invalid initial date.");
            this.initDate = null;
        }

        //Display error if first date is invalid.
        if(this.firstDate && !this.checkValidDate(this.firstDate))
        {
            console.log("Invalid first date.");
            isFirstValid = false;
            this.firstDate = null;
        }

        //Display error if last date is invalid.
        if(this.lastDate && !this.checkValidDate(this.lastDate))
        {
            console.log("Invalid last date.");
            isLastValid = false;
            this.lastDate = null;
        }

        //Display error if first and last dates are in the wrong order.
        if(this.firstDate && isFirstValid && this.lastDate && isLastValid)
        {
            if(this.compareDates(this.firstDate, this.lastDate) === CanvDTP.DATE_GREATER)
            {
                console.log("Invalid first/last date order.");
                isOrderValid = false;
                this.firstDate = null;
                this.lastDate = null;
            }
        }

        //Determine if a first date check needs to be done.
        if(this.firstDate && isFirstValid && isOrderValid) this.checkBefore = true;

        //Determine if a last date check needs to be done.
        if(this.lastDate && isLastValid && isOrderValid) this.checkAfter = true;

        //If the initial pick date is before first date, set it to first date. 
        if(this.checkBefore && this.compareDates({month: this.month, day: this.day, year: this.year}, this.firstDate) === CanvDTP.DATE_LESS)
        {
            this.month = this.firstDate.month;
            this.day   = this.firstDate.day;
            this.year  = this.firstDate.year;
        }

        //If the initial pick date is before first date, set it to last date. 
        if(this.checkAfter && this.compareDates({month: this.month, day: this.day, year: this.year}, this.lastDate) === CanvDTP.DATE_GREATER)
        {
            this.month = this.lastDate.month;
            this.day   = this.lastDate.day;
            this.year  = this.lastDate.year;
        }

        this.tempMonth   = this.month;
        this.tempYear    = this.year;
        this.tempDecade  = parseInt(this.year / 10)  * 10;
        this.tempCentury = parseInt(this.year / 100) * 100;

        //Indicate the month exclusions need to be calculated.
        this.updateMonth  = true;
        this.updateYear   = true;
        this.updateDecade = true;

        this.updateDayArray();
        this.monthExclude();
        
        //Try to find the currently selected date in the current month being displayed.
        for(let i = 0; i < this.dayArray.length; i++)
        {
            if
            (
                this.year  === this.dayArray[i].year &&
                this.month === this.dayArray[i].month &&
                this.day   === this.dayArray[i].day
            )
            {
                todaysIndex = i;
            }
        }

        //Check if current date is blocked.
        if(todaysIndex >= 0 && this.monthSpecial[todaysIndex].excluded) todayExcluded = true;

        //Delete the current date if no auto pick or date is blocked.
        if(!this.autoPick || todayExcluded)
        {
            this.month      = undefined;
            this.day        = undefined;
            this.year       = undefined;
            this.dayOfWeek  = undefined;
            this.dayOfYear  = undefined;
            this.isLeapYear = undefined;
        }
        else
        {
            this.isFirstPicked = true;
        }
   
        this.textBoxDateTime();
    }

    //Determines if a date object is valid. date object has keys day, month and year.
    checkValidDate(date)
    {
        if(!date) return false;
        if(!date.hasOwnProperty("day")   || typeof date.day !== "number")   return false;
        if(!date.hasOwnProperty("month") || typeof date.month !== "number") return false;
        if(!date.hasOwnProperty("year")  || typeof date.year !== "number")  return false;
        if(date.month < CanvDTP.JANUARY  || date.month > CanvDTP.DECEMBER)  return false;

        if(date.day < 1) return false;

        if(this.leapCalc(date.year))
        {
            if(parseInt(date.month) === CanvDTP.FEBRUARY && parseInt(date.day) === 29) return true;
        }
        
        if(date.day > this.monthDaysArray[date.month - 1]) return false;
        return true;
    }

    //Determines if date1 is greater than less than or equal to date2.
    compareDates(date1, date2)
    {
        if(!this.checkValidDate(date1)) return CanvDTP.DATE_1INVALID;
        if(!this.checkValidDate(date2)) return CanvDTP.DATE_2INVALID;
        if(date1.year > date2.year)     return CanvDTP.DATE_GREATER;
        if(date1.year < date2.year)     return CanvDTP.DATE_LESS;
        if(date1.month > date2.month)   return CanvDTP.DATE_GREATER;
        if(date1.month < date2.month)   return CanvDTP.DATE_LESS;
        if(date1.day > date2.day)       return CanvDTP.DATE_GREATER;
        if(date1.day < date2.day)       return CanvDTP.DATE_LESS;
        return CanvDTP.DATE_EQUAL;
    }

    //Calculate the day of the year.
    getDayOfYear()
    {
        let dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let dayOfYear = dayCount[this.month - 1] + this.day;
        this.leapCalc(this.year);
        if(this.month > 2 && this.isLeapYear) dayOfYear++;
        return dayOfYear;
    }

    //Increment minute.
    incMinute(num)
    {
        this.minute += num;
        if(this.minute > 59)
        {
            this.minute -= 60;
            this.incHour();
        }
    }

    //Decrement minute.
    decMinute(num)
    {
        this.minute -= num;
        if(this.minute < 0)
        {
            this.minute += 60;
            this.decHour();
        }
    }

    //Increment hour.
    incHour()
    {
        this.hour++;
        if(this.hour > 12) this.hour = 1;
        if(this.hour === 12) this.isAM = this.isAM ? false : true;
        this.milHour++;
        if(this.milHour > 23) this.milHour = 0;
    }

    //Decrement hour.
    decHour()
    {
        this.hour--;
        if(this.hour < 1) this.hour = 12;
        if(this.hour === 11) this.isAM = this.isAM ? false : true;
        this.milHour--;
        if(this.milHour < 0) this.milHour = 23;
    }

    //Update the array that holds the individual day to render.
    updateDayArray()
    {
        //Calculate the day the month starts on.
        let startDate = new Date(this.tempYear, this.tempMonth - 1, 1, 12, 0, 0, 0);
        let dayMonthStart = startDate.getDay();

        //Update the array with the current month days.
        let i = 0;
        let startIndex = dayMonthStart - this.startOfWeek;
        dayMonthStart = ( startIndex < 0) ? 7 + startIndex : startIndex;
        for(i; i < this.monthDaysArray[this.tempMonth - 1]; i++)
        {
            this.dayArray[i + dayMonthStart] =
            {
                day:       i + 1,
                dayOfWeek: 0,
                type:      CanvDTP.DAY_THIS,
                month:     this.tempMonth,
                year:      this.tempYear
            };
        }

        //Special case for February on leap years.
        if(this.tempMonth === CanvDTP.FEBRUARY && this.leapCalc(this.tempYear))
        {
            this.dayArray[i++ + dayMonthStart] =
            {
                day:       29,
                dayOfWeek: 0,
                type:      CanvDTP.DAY_THIS,
                month:     2,
                year:      this.tempYear
            };
        }

        //Update the array with post month days.
        let postDays = 1;
        while(i + dayMonthStart < 42)
        {
            this.dayArray[i++ + dayMonthStart] =
            {
                day:       postDays++,
                dayOfWeek: 0,
                type:      CanvDTP.DAY_POST,
                month:     (this.tempMonth === 12) ? 1 : this.tempMonth + 1,
                year:      (this.tempMonth === 12) ? this.tempYear + 1 : this.tempYear
            };
        }

        //Only add pre days if month does not start on a Sunday.
        if(dayMonthStart > 0)
        {
            i = dayMonthStart - 1;

            //Special case for March on leap years.
            if(this.tempMonth === CanvDTP.MARCH && this.leapCalc(this.tempYear))
            {
                this.dayArray[i--] =
                {
                    day:       29,
                    dayOfWeek: 0,
                    type:      CanvDTP.DAY_PRE,
                    month:     2,
                    year:      this.tempYear
                };
            }
            
            //Update the array with pre month days.
            let preDays;
            if(this.tempMonth === 1)
            {
                preDays = this.monthDaysArray[11];
            }
            else
            {
                preDays = this.monthDaysArray[this.tempMonth - 2];
            }
            
            while(i >= 0)
            {
                this.dayArray[i--] =
                {
                    day:       preDays--,
                    dayOfWeek: 0,
                    type:      CanvDTP.DAY_PRE,
                    month:     (this.tempMonth === 1) ? 12 : this.tempMonth - 1,
                    year:      (this.tempMonth === 1) ? this.tempYear - 1 : this.tempYear
                };
            }
        }

        //Backfill the day of week.
        let startDay = this.startOfWeek;
        for(let i = 0; i < this.dayArray.length; i++)
        {
            this.dayArray[i].dayOfWeek = startDay++;
            if(startDay > 6) startDay = 0;
        }
    }

    //return st, nd, rd or th depending on value.
    getOrdinal(value)
    {
        value = parseInt(value);
        value %= 100;
        if(value > 20) value %= 10;
        switch(value)
        {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";                        
        }
    }

    //Takes user defined date/time string and generates a custom formatted date and time.
    formatDateTime(formatString)
    {
        let currentIndex = 0;
        let tokenLength  = 0;
        let nextChar     = null;
        let lastIndex    = formatString.length;
        let dtString     = "";
        let yearInt     = parseInt(this.year);

        //Process whole format string.
        while(currentIndex < lastIndex)
        {
            let currentToken = formatString[currentIndex];
            let firstChar = formatString[currentIndex++];

            //Get string of same characters.
            while((currentIndex < lastIndex) && (formatString[currentIndex] === firstChar))
            {
                currentToken += formatString[currentIndex++];
            }

            //Get the next character after token, if it exists.
            nextChar = (currentIndex < lastIndex) ? formatString[currentIndex] : null;
            tokenLength = currentToken.length;

            //Figure out what the token is before formatting it.
            switch(currentToken[0])
            {
                case 'M': //Month
                    if(this.pickerType === CanvDTP.PICK_TIME)
                    {
                        //Date is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.month;

                        //Add ordinal, if neccessary.
                        if(nextChar === 'o')
                        {
                            dtString += this.getOrdinal(this.month);
                            currentIndex++;
                        }
                    }
                    else if(tokenLength === 2)
                    {
                        dtString += (this.month < 10) ? "0" + this.month : this.month;
                    }
                    else if(tokenLength === 3)
                    {
                        dtString += this.shortMonthsArray[this.month - 1];
                    }
                    else
                    {
                        dtString += this.MonthsArray[this.month - 1];
                        currentIndex -= tokenLength - 4; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'D': //Day
                    if(this.pickerType === CanvDTP.PICK_TIME)
                    {
                        //Date is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.day;

                        //Add ordinal, if neccessary.
                        if(nextChar === 'o')
                        {
                            dtString += this.getOrdinal(this.day);
                            currentIndex++;
                        }
                    }
                    else if(tokenLength === 2)
                    {
                        dtString += (this.day < 10) ? "0" + this.day : this.day;
                    }
                    else if(tokenLength === 3)
                    {
                        dtString += this.dayOfYear

                        //Add ordinal, if neccessary.
                        if(nextChar === 'o')
                        {
                            dtString += this.getOrdinal(this.dayOfYear);
                            currentIndex++;
                        }
                    }
                    else
                    {
                        if(this.dayOfYear < 10) dtString += "00";
                        else if (this.dayOfYear < 100) dtString += "0";
                        dtString += this.dayOfYear;
                        currentIndex -= tokenLength - 4; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'W':
                    if(this.pickerType === CanvDTP.PICK_TIME)
                    {
                        //Date is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.weekOfYear

                        //Add ordinal, if neccessary.
                        if(nextChar === 'o')
                        {
                            dtString += this.getOrdinal(this.weekOfYear);
                            currentIndex++;
                        }
                    }
                    else
                    {

                        dtString += (this.weekOfYear < 10) ? "0" + this.weekOfYear : this.weekOfYear;
                        currentIndex -= tokenLength - 2; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'd': //Day of week.
                    if(this.pickerType === CanvDTP.PICK_TIME)
                    {
                        //Date is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.dayOfWeek;
                    }
                    else if(tokenLength === 2)
                    {
                        dtString += this.days[this.dayOfWeek];
                    }
                    else if(tokenLength === 3)
                    {
                        dtString += this.days3[this.dayOfWeek];
                    }
                    else
                    {
                        dtString += this.daysFull[this.dayOfWeek];
                        currentIndex -= tokenLength - 4; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'Y': //Year
                    if(this.pickerType === CanvDTP.PICK_TIME)
                    {
                        //Date is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.year;
                    }
                    else if(tokenLength === 2)
                    {
                        dtString += yearInt % 100;
                    }
                    else if(tokenLength === 3)
                    {
                        dtString += this.year;
                        dtString += yearInt % 100;
                    }
                    else
                    {
                        dtString += this.year;
                        currentIndex -= tokenLength - 4; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'H': //Hour - military time.
                    if(this.pickerType === CanvDTP.PICK_DATE)
                    {
                        //Time is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.milHour;
                    }
                    else
                    {
                        dtString += (this.milHour < 10) ? "0" + this.milHour : this.milHour;
                        currentIndex -= tokenLength - 2; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'h': //Hour - standard time.
                    if(this.pickerType === CanvDTP.PICK_DATE)
                    {
                        //Time is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.hour;
                    }
                    else
                    {
                        dtString += (this.hour < 10) ? "0" + this.hour : this.hour;
                        currentIndex -= tokenLength - 2; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'm': //Minute
                    if(this.pickerType === CanvDTP.PICK_DATE)
                    {
                        //Time is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else if(tokenLength === 1)
                    {
                        dtString += this.minute;
                    }
                    else
                    {
                        dtString += (this.minute < 10) ? "0" + this.minute : this.minute;
                        currentIndex -= tokenLength - 2; //Backup the string pointer, if necessary.
                    }
                    break;

                case 'a': //am/pm
                case 'p':
                    if(this.pickerType === CanvDTP.PICK_DATE)
                    {
                        //Time is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else
                    {
                        for(let i = 0; i < tokenLength; i++)
                        {
                        dtString += this.isAM ? "am" : "pm";
                        }
                    }
                    break;

                case 'A':  //AM/PM
                case 'P':
                    if(this.pickerType === CanvDTP.PICK_DATE)
                    {
                        //Time is disabled. Token non-meaningful.
                        dtString += currentToken;
                    }
                    else
                    {
                        for(let i = 0; i < tokenLength; i++)
                        {
                            dtString += this.isAM ? "AM" : "PM";
                        }
                    }
                    break;

                case '[': //Escaped characters.
                    while((formatString[currentIndex] !== ']') && currentIndex < lastIndex)
                    {
                        dtString += formatString[currentIndex++];
                    }
                    currentIndex++;
                    break;

                default: //Non-meaningful tokens.
                    dtString += currentToken;
                    break;
            }
        }
        return dtString;
    }

    //Update the date and time in the textbox.
    textBoxDateTime()
    {
        if(!this.isFirstPicked) return;
        
        //Calculate the day of the week.
        let d = new Date(this.year, this.month - 1, this.day);
        this.dayOfWeek = d.getDay();
        this.dayOfYear = this.getDayOfYear();
        this.weekOfYearCalc();
        let dateTimeString;
        let formatString;

        //Check user defined format.
        if(this.dateTimeFormat)
        {
            formatString = this.dateTimeFormat;
        }
        //Use default format if no user format defined.
        else if(this.pickerType === CanvDTP.PICK_BOTH)
        {
            formatString = "M/D/YYYY h:mm a";
        }
        else if(this.pickerType === CanvDTP.PICK_DATE)
        {
            formatString = "M/D/YYYY";
        }
        else
        {
            formatString = "h:mm a";
        }

        dateTimeString = this.formatDateTime(formatString);
        this.dtpText.value = dateTimeString;

        //Check if any callbacks have been set and return the data.
        if(this.dateTimeStringCb) this.dateTimeStringCb(this.dtpText.value);
        
        if(this.dateTimeJSONCb)
        {
            this.dateTimeJSONCb(
            {
                isPicked:   this.isFirstPicked,
                string:     this.dtpText.value,
                month:      this.month - 1,
                day:        this.day,
                year:       this.year,
                hour:       this.hour,
                milHour:    this.milHour,
                minute:     this.minute,
                ampm:       this.isAM ? "AM" : "PM",
                dayOfWeek:  this.dayOfWeek,
                dayOfYear:  this.dayOfYear,
                weekOfYear: this.weekOfYear
            });
        }
    }

    weekOfYearCalc()
    {
        //Calculate the day the month starts on.
        let startDate = new Date(this.year, 0, 1, 12, 0, 0, 0);
        let dayMonthStart = startDate.getDay();

        //Calculate how many days into the first week the year starts at.
        let startIndex = dayMonthStart - this.startOfWeek;
        let offset = ( startIndex < 0) ? 7 + startIndex : startIndex;
        
        let totalDays = this.dayOfYear + offset;

        this.weekOfYear = parseInt(totalDays / 7);
        if(parseInt(totalDays) % 7) this.weekOfYear++;  
    }

    //Calculate if a year is a leap year.
    leapCalc(year)
    {
        let isLeap = false;
        let div4   = parseInt(year % 4);
        let div100 = parseInt(year % 100);
        let div400 = parseInt(year % 400);
        if((!div100 && !div400) || (!div4 && div100)) isLeap = true;
         this.isLeapYear = isLeap;
        return this.isLeapYear;
    }

    //Calculate the hit bounds common to the date views.
    doCommonHitBounds(doInner, doBanner, selectType)
    {
        let x1, x2, y1, y2;

        //Hit boundaries for year, decade and century.
        if(doInner)
        {
            for(let i = 0; i < 4; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    x1 = this.innerLeft + j * this.bigBoxWidth;
                    x2 = this.innerLeft + (j + 1) * this.bigBoxWidth - 1;
                    y1 = this.innerTop + i * this.bigBoxHeight;
                    y2 = this.innerTop + (i + 1) * this.bigBoxHeight - 1;
                    this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: selectType});
                }
            }
        }
        
        //Hit boundaries for previous.
        x1 = this.contentLeft;
        x2 = this.contentLeft + this.smallBoxWidth - 1;
        y1 = this.contentTop;
        y2 = this.contentTop + this.smallBoxHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_PREVIOUS});

        //Hit boundaries for next.
        x1 = this.contentLeft + 6 * this.smallBoxWidth;
        x2 = this.contentLeft + 7 * this.smallBoxWidth - 1;
        y1 = this.contentTop;
        y2 = this.contentTop + this.smallBoxHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_NEXT});

        //Hit boundaries for banner between previous and next.
        if(doBanner)
        {
            x1 = this.contentLeft + this.smallBoxWidth;
            x2 = this.contentLeft + 6 * this.smallBoxWidth - 1;
            y1 = this.contentTop;
            y2 = this.contentTop + this.smallBoxHeight - 1;
            this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_VIEW});
        }
        
        //Hit boundaries for time.
        x1 = this.contentLeft;
        x2 = this.contentLeft + 7 * this.smallBoxWidth - 1;
        y1 = this.contentTop  + 8 * this.smallBoxHeight;
        y2 = this.contentTop + 9 * this.smallBoxHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_TIME});
    }

    //Calculate the position of the text info overlay.
    calcInfoTextPos(hitBounds)
    {
        let x1 = hitBounds.x1;
        let x2 = hitBounds.x2;
        let y1 = hitBounds.y1;
        
        let xPos = (x1 + (x2 - x1) / 2) / this.bodyCanWidth * 100;
        let yPos = y1 / this.bodyCanWidth * 100;

        this.infoParent.style.top = yPos + "%";
        this.infoParent.style.left = xPos + "%";
    }

    /******************************** Decade Spotlight Functions *********************************/

    decadeSpotlightYear(yearObj, spotlightObj)
    {
        if(!spotlightObj.hasOwnProperty("years") || !spotlightObj.years.length)
        {
            return true;
        }
        else
        {
            for(let i = 0; i < spotlightObj.years.length; i++)
            {
                if(yearObj.year === spotlightObj.years[i]) return true;
            }
        }
        return false;
    }

    decadeSpotlight(yearBase)
    {
        //Loop through every year of the yearArray to insert whitelist markers.
        for(let i = 0; i < 12; i++)
        {
            //Create a placeholder object.
            this.decadeSpecial[i] =
            {
                year:      yearBase + i,
                isSpecial: false,
                excluded:  false,
                color:     "transparent",
                info:      [],
                whitelist: CanvDTP.WHITE_NONE
            }

            let hit = false;
            
            //Loop through the whitelist array looking for years that align with the current decade view.
            for(let j = 0; j < this.yearWhiteArray.length; j++)
            {
                hit = this.decadeSpotlightYear(this.decadeSpecial[i], this.yearWhiteArray[j]);

                //Update the element in the yearSpecial array.
                if(hit)
                {
                    this.decadeSpecial[i].whitelist = CanvDTP.WHITE_SPTLT;
                }
            }
        }

        //Loop through every year of the decade Array to find spotlights.
        for(let i = 0; i < this.decadeSpecial.length; i++)
        {
            let hit = false;

            //Loop through the spotlights array looking for years that align with the current decade view.
            for(let j = 0; j < this.yearSpotlightArray.length; j++)
            {
                hit = this.decadeSpotlightYear(this.decadeSpecial[i], this.yearSpotlightArray[j]);
               
                //Update the element in the yearSpecial array.
                if(hit)
                {
                    //Exit if this element is whitelisted.
                    if(this.decadeSpecial[i].whitelist === CanvDTP.WHITE_SPTLT) continue;
                    this.decadeSpecial[i].isSpecial = true;                    
                    this.decadeSpecial[i].color = this.yearSpotlightArray[j].color;
                
                    //Append any info for this month.
                    if(this.yearSpotlightArray[j].info)
                    {
                        this.decadeSpecial[i].info.push(this.yearSpotlightArray[j].info);
                    }
                }
            }
        }
    }

    /********************************* Year Spotlight Functions **********************************/

    yearSpotlightYear(monthObj, spotlightObj)
    {
        if(!spotlightObj.hasOwnProperty("years") || !spotlightObj.years.length)
        {
            return true;
        }
        else
        {
            for(let i = 0; i < spotlightObj.years.length; i++)
            {
                if(monthObj.year === spotlightObj.years[i]) return true;
            }
        }
        return false;
    }

    yearSpotlightMonth(monthObj, spotlightObj)
    {
        let hit = false;
        if(!spotlightObj.hasOwnProperty("months") || !spotlightObj.months.length)
        {
            hit = this.yearSpotlightYear(monthObj, spotlightObj);
        }
        else
        {
            for(let i = 0; i < spotlightObj.months.length; i++)
            {
                if(monthObj.month === spotlightObj.months[i]) hit = this.yearSpotlightYear(monthObj, spotlightObj);
            }
        }
        return hit;
    }

    yearSpotlight()
    {
        //Loop through every month of the monthArray to insert whitelist markers.
        for(let i = 0; i < 12; i++)
        {
            //Create a placeholder object.
            this.yearSpecial[i] =
            {
                month:     CanvDTP.JANUARY + i,
                year:      this.tempYear,
                isSpecial: false,
                excluded:  false,
                color:     "transparent",
                info:      [],
                whitelist: CanvDTP.WHITE_NONE
            }

            let hit = false;

            //Loop through the whitelist array looking for months that align with the current year view.
            for(let j = 0; j < this.monthWhiteArray.length; j++)
            {
                hit = this.yearSpotlightMonth({month: CanvDTP.JANUARY + i,  year: this.tempYear}, this.monthWhiteArray[j]);

                //Update the element in the yearSpecial array.
                if(hit)
                {
                    this.yearSpecial[i].whitelist = CanvDTP.WHITE_SPTLT;
                }
            }
        }

        //Loop through every month of the year Array to find spotlights.
        for(let i = 0; i < this.yearSpecial.length; i++)
        {
            let hit = false;

            //Loop through the spotlights array looking for months that align with the current year view.
            for(let j = 0; j < this.monthSpotlightArray.length; j++)
            {
                hit = this.yearSpotlightMonth(this.yearSpecial[i], this.monthSpotlightArray[j]);
               
                //Update the element in the yearSpecial array.
                if(hit)
                {
                    //Exit if this element is whitelisted.
                    if(this.yearSpecial[i].whitelist === CanvDTP.WHITE_SPTLT) continue;
                    this.yearSpecial[i].isSpecial = true;                    
                    this.yearSpecial[i].color = this.monthSpotlightArray[j].color;
                
                    //Append any info for this month.
                    if(this.monthSpotlightArray[j].info)
                    {
                        this.yearSpecial[i].info.push(this.monthSpotlightArray[j].info);
                    }
                }
            }
        }
    }

    /********************************* Month Exclusion Functions *********************************/

    monthExcludeYear(dayObj, excludeObj)
    {
        if(!excludeObj.hasOwnProperty("years") || !excludeObj.years.length)
        {
            return true;
        }
        else
        {
            for(let i = 0; i < excludeObj.years.length; i++)
            {
                if(dayObj.year === excludeObj.years[i]) return true;
            }
        }
        return false;
    }

    monthExcludeMonth(dayObj, excludeObj)
    {
        let hit = false;
        if(!excludeObj.hasOwnProperty("months") || !excludeObj.months.length)
        {
            hit = this.monthExcludeYear(dayObj, excludeObj);
        }
        else
        {
            for(let i = 0; i < excludeObj.months.length; i++)
            {
                if(dayObj.month === excludeObj.months[i]) hit = this.monthExcludeYear(dayObj, excludeObj);
            }
        }
        return hit;
    }

    monthExcludeDayOfWeek(dayObj, excludeObj)
    {
        let hit = false;
        if(!excludeObj.hasOwnProperty("daysOfWeek") || !excludeObj.daysOfWeek.length)
        {
            hit = this.monthExcludeMonth(dayObj, excludeObj);
        }
        else
        {
            for(let i = 0; i < excludeObj.daysOfWeek.length; i++)
            {
                if(dayObj.dayOfWeek === excludeObj.daysOfWeek[i]) hit = this.monthExcludeMonth(dayObj, excludeObj);
            }
        }
        return hit;
    }

    monthExcludeDay(dayObj, excludeObj)
    {
        let hit = false;
        if(!excludeObj.hasOwnProperty("days") || !excludeObj.days.length)
        {
            hit = this.monthExcludeDayOfWeek(dayObj, excludeObj);
        }
        else
        {
            for(let i = 0; i < excludeObj.days.length; i++)
            {
                if(dayObj.day === excludeObj.days[i]) hit = this.monthExcludeDayOfWeek(dayObj, excludeObj);
            }
        }
        return hit;
    }

    monthExclude()
    {
        //Loop through every day of the dayArray to insert whitelist markers.
        for(let i = 0; i < this.dayArray.length; i++)
        {
            //Create a placeholder object.
            this.monthSpecial[i] =
            {
                isSpecial: false,
                excluded:  false,
                color:     "transparent",
                info:      [],
                whitelist: CanvDTP.WHITE_NONE
            }

            let hit = false;

            //Loop through the exclusion array looking for days that align with the current month view.
            for(let j = 0; j < this.dayWhiteArray.length; j++)
            {
                hit = this.monthExcludeDay(this.dayArray[i], this.dayWhiteArray[j]);

                //Update the element in the monthSpecial array.
                if(hit)
                {
                    this.monthSpecial[i].whitelist = this.dayWhiteArray[j].type;
                }
            }
        }

        //Loop through every day of the dayArray to find exclusions.
        for(let i = 0; i < this.dayArray.length; i++)
        {
            let hit = false;

            //Loop through the exclusion array looking for days that align with the current month view.
            for(let j = 0; j < this.dayExcludeArray.length; j++)
            {
                hit = this.monthExcludeDay(this.dayArray[i], this.dayExcludeArray[j]);
               
                //Update the element in the monthSpecial array.
                if(hit)
                {
                    //Exit if this element is whitelisted.
                    if(this.monthSpecial[i].whitelist === CanvDTP.WHITE_BOTH) continue;
                    else if(this.monthSpecial[i].whitelist === CanvDTP.WHITE_BLOCK && this.dayExcludeArray[j].excluded) continue;
                    else if(this.monthSpecial[i].whitelist === CanvDTP.WHITE_SPTLT && !this.dayExcludeArray[j].excluded) continue;

                    this.monthSpecial[i].isSpecial = true;

                    //Only update exclusion status and color if this element is not already excluded.
                    if(!this.monthSpecial[i].excluded)
                    {
                        if(this.dayExcludeArray[j].excluded)
                        {
                            this.monthSpecial[i].excluded = this.dayExcludeArray[j].excluded;
                        }
                        
                        if(this.dayExcludeArray[j].color)
                        {
                            this.monthSpecial[i].color = this.dayExcludeArray[j].color;
                        }
                    }

                    if(this.dayExcludeArray[j].info)
                    {
                        this.monthSpecial[i].info.push(this.dayExcludeArray[j].info);
                    }
                }
            }
        }
    }

    /************************************** Debug Functions **************************************/

    pointerDraw()
    {
        //Calculate the pointer radius and line width;
        let pointerRadius = this.bodyCanWidth * this.PointerRad;
        let pointerWidth  = this.bodyCanWidth * this.PointerWidth;

        //Draw a mouse indicator. For debug purposes.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.PointerColor;
        this.ctxDTP.lineWidth = pointerWidth;
        this.ctxDTP.moveTo(this.bodyX, this.bodyY);
        this.ctxDTP.lineTo(this.bodyX - pointerRadius, this.bodyY);
        this.ctxDTP.lineTo(this.bodyX + pointerRadius, this.bodyY);
        this.ctxDTP.moveTo(this.bodyX, this.bodyY);
        this.ctxDTP.lineTo(this.bodyX, this.bodyY - pointerRadius);
        this.ctxDTP.lineTo(this.bodyX, this.bodyY + pointerRadius);
        this.ctxDTP.stroke();
    }

    gridDraw(gridType)
    {
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = "#000000";
        this.ctxDTP.lineWidth = 1;

        switch(gridType)
        {
            case CanvDTP.GRID_MONTH:        
                this.ctxDTP.rect(this.contentLeft, this.contentTop, this.contentWidth, this.contentHeight);
                for(let i = 1; i < 9; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft, this.contentTop + i * this.smallBoxHeight);
                    this.ctxDTP.lineTo(this.contentRight, this.contentTop + i * this.smallBoxHeight);
                }
                for(let i = 1; i < 7; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft + i * this.smallBoxWidth, this.contentTop + this.smallBoxHeight);
                    this.ctxDTP.lineTo(this.contentLeft + i * this.smallBoxWidth, this.contentTop + 8 * this.smallBoxHeight);
                }
                this.ctxDTP.moveTo(this.contentLeft + 1 * this.smallBoxWidth, this.contentTop);
                this.ctxDTP.lineTo(this.contentLeft + 1 * this.smallBoxWidth, this.contentTop + this.smallBoxHeight);
                this.ctxDTP.moveTo(this.contentLeft + 6 * this.smallBoxWidth, this.contentTop);
                this.ctxDTP.lineTo(this.contentLeft + 6 * this.smallBoxWidth, this.contentTop + this.smallBoxHeight);
                break;

            case CanvDTP.GRID_TIME:
                this.ctxDTP.rect(this.contentLeft,  this.contentTop, this.contentWidth, this.contentHeight);
                this.ctxDTP.moveTo(this.contentLeft, this.contentBottom - this.smallBoxHeight);
                this.ctxDTP.lineTo(this.contentRight, this.contentBottom - this.smallBoxHeight);
                this.ctxDTP.rect(this.timeLeft,  this.timeTop, this.timeWidth, this.timeHeight);
                this.ctxDTP.moveTo(this.timeLeft + this.timeBoxWidth, this.timeTop);
                this.ctxDTP.lineTo(this.timeLeft + this.timeBoxWidth, this.timeBottom);
                this.ctxDTP.moveTo(this.timeLeft + 1.5 * this.timeBoxWidth, this.timeTop);
                this.ctxDTP.lineTo(this.timeLeft + 1.5 * this.timeBoxWidth, this.timeBottom);
                this.ctxDTP.moveTo(this.timeLeft + 2.5 * this.timeBoxWidth, this.timeTop);
                this.ctxDTP.lineTo(this.timeLeft + 2.5 * this.timeBoxWidth, this.timeBottom);
                this.ctxDTP.moveTo(this.timeLeft, this.timeTop + this.timeBoxHeight);
                this.ctxDTP.lineTo(this.timeRight, this.timeTop + this.timeBoxHeight);
                this.ctxDTP.moveTo(this.timeLeft, this.timeTop + 2 * this.timeBoxHeight);
                this.ctxDTP.lineTo(this.timeRight, this.timeTop + 2 * this.timeBoxHeight);
                this.ctxDTP.moveTo(this.timeLeft, this.timeTop + .5 * this.timeBoxHeight);
                this.ctxDTP.lineTo(this.timeLeft + this.timeBoxWidth, this.timeTop + .5 * this.timeBoxHeight);
                this.ctxDTP.moveTo(this.timeLeft + 1.5 * this.timeBoxWidth, this.timeTop + .5 * this.timeBoxHeight);
                this.ctxDTP.lineTo(this.timeLeft + 2.5 * this.timeBoxWidth, this.timeTop + .5 * this.timeBoxHeight);
                this.ctxDTP.moveTo(this.timeLeft, this.timeTop + 2.5 * this.timeBoxHeight);
                this.ctxDTP.lineTo(this.timeLeft + this.timeBoxWidth, this.timeTop + 2.5 * this.timeBoxHeight);
                this.ctxDTP.moveTo(this.timeLeft + 1.5 * this.timeBoxWidth, this.timeTop + 2.5 * this.timeBoxHeight);
                this.ctxDTP.lineTo(this.timeLeft + 2.5 * this.timeBoxWidth, this.timeTop + 2.5 * this.timeBoxHeight);
                break;
            
            case CanvDTP.GRID_MINUTE:
                this.ctxDTP.rect(this.contentLeft, this.contentTop, this.contentWidth, this.contentHeight);
                for(let i = 1; i < 6; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft + i * (this.contentWidth / 6), this.contentTop);
                    this.ctxDTP.lineTo(this.contentLeft + i * (this.contentWidth / 6), this.contentBottom);
                }
                for(let i = 1; i < 10; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft, this.contentTop + i * (this.contentHeight / 10));
                    this.ctxDTP.lineTo(this.contentRight, this.contentTop + i * (this.contentHeight / 10));
                }
                break;

            case CanvDTP.GRID_STD_HOUR:
                this.ctxDTP.rect(this.contentLeft, this.contentTop, this.contentWidth, this.contentHeight);
                for(let i = 1; i < 3; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft + i * (this.contentWidth / 3), this.contentTop);
                    this.ctxDTP.lineTo(this.contentLeft + i * (this.contentWidth / 3), this.contentBottom);
                }
                for(let i = 1; i < 4; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft, this.contentTop + i * (this.contentHeight / 4));
                    this.ctxDTP.lineTo(this.contentRight, this.contentTop + i * (this.contentHeight / 4));
                }
                break;

            case CanvDTP.GRID_MIL_HOUR:
                this.ctxDTP.rect(this.contentLeft, this.contentTop, this.contentWidth, this.contentHeight);
                for(let i = 1; i < 4; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft + i * (this.contentWidth / 4), this.contentTop);
                    this.ctxDTP.lineTo(this.contentLeft + i * (this.contentWidth / 4), this.contentBottom);
                }
                for(let i = 1; i < 6; i++)
                {
                    this.ctxDTP.moveTo(this.contentLeft, this.contentTop + i * (this.contentHeight / 6));
                    this.ctxDTP.lineTo(this.contentRight, this.contentTop + i * (this.contentHeight / 6));
                }
                break;
                
            default:
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = "#000000";
                this.ctxDTP.lineWidth = 1;
                this.ctxDTP.rect(this.contentLeft,  this.contentTop, this.contentWidth, this.contentHeight);
                this.ctxDTP.moveTo(this.innerLeft,  this.innerTop);
                this.ctxDTP.lineTo(this.innerRight, this.innerTop);
                this.ctxDTP.moveTo(this.innerLeft,  this.innerBottom);
                this.ctxDTP.lineTo(this.innerRight, this.innerBottom);
                for(let i = 1; i < 4; i++)
                {
                    this.ctxDTP.moveTo(this.innerLeft, this.innerTop + i * this.bigBoxHeight);
                    this.ctxDTP.lineTo(this.innerRight, this.innerTop + i * this.bigBoxHeight);
                }
                for(let i = 1; i < 3; i++)
                {
                    this.ctxDTP.moveTo(this.innerLeft + i * this.bigBoxWidth, this.innerTop);
                    this.ctxDTP.lineTo(this.innerLeft + i * this.bigBoxWidth, this.innerBottom);
                }
                this.ctxDTP.moveTo(this.contentLeft  + this.smallBoxWidth, this.contentTop);
                this.ctxDTP.lineTo(this.contentLeft  + this.smallBoxWidth, this.contentTop + this.smallBoxHeight);
                this.ctxDTP.moveTo(this.contentRight - this.smallBoxWidth, this.contentTop);
                this.ctxDTP.lineTo(this.contentRight - this.smallBoxWidth, this.contentTop + this.smallBoxHeight);
                break;
        }

        this.ctxDTP.stroke();
    }

    /******************************** Graphical Helper Functions *********************************/

    //Draw the previous button.
    drawPrevious(color)
    {
        //Exit if at beginning of the date range.
        if(this.firstHit) return;

        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = color;
        this.ctxDTP.fillStyle   = color;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(this.contentLeft + this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + .5 * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentLeft + this.smallBoxWidth - this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.prevNextYPad * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentLeft + this.smallBoxWidth - this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.smallBoxHeight - this.prevNextYPad * this.smallBoxHeight);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();
    }

    //Draw the next button.
    drawNext(color)
    {
        //Exit if at end of the date range.
        if(this.lastHit) return;

        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = color;
        this.ctxDTP.fillStyle   = color;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(this.contentRight - this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + .5 * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentRight - this.smallBoxWidth + this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.prevNextYPad * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentRight - this.smallBoxWidth + this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.smallBoxHeight - this.prevNextYPad * this.smallBoxHeight);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();
    }

    //Draw the clock button.
    drawClock(color)
    {
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = color;
        this.ctxDTP.lineWidth   = this.smallBoxHeight * this.clockWeight;
        this.ctxDTP.arc(this.contentLeft + .5 * this.contentWidth,
            this.contentTop + 8 * this.smallBoxHeight + .5 * this.smallBoxHeight, this.clockRadius, 0, 2 * Math.PI);
        this.ctxDTP.moveTo(this.contentLeft + .5 * this.contentWidth - .60 * this.clockRadius, 
            this.contentTop + 8 * this.smallBoxHeight + .5 * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentLeft + .5 * this.contentWidth,
            this.contentTop + 8 * this.smallBoxHeight + .5 * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentLeft + .5 * this.contentWidth,
            this.contentTop + 8 * this.smallBoxHeight + .5 * this.smallBoxHeight - .85 * this.clockRadius);
        this.ctxDTP.stroke();
    }

    incDraw(x1, x2, y1, y2, color, incType)
    {
        let xPad      = this.incXPad * (x2 - x1);
        let yPad      = this.incYPad * (y2 - y1);
        let incLeft   = x1 + xPad;
        let incRight  = x2 - xPad;
        let incTop    = y1 + yPad;
        let incBottom = y2 - yPad;
        let incHeight = incBottom - incTop;
        let incWidth  = incRight  - incLeft;

        this.ctxDTP.beginPath();
        this.ctxDTP.lineWidth   = incHeight * this.incWeight;
        this.ctxDTP.strokeStyle = color;

        switch(incType)
        {
            //Increment by 1 unit.
            case CanvDTP.INC_1:
                this.ctxDTP.moveTo(incLeft, incBottom);
                this.ctxDTP.lineTo(incLeft + incWidth / 2, incBottom - incHeight / 2);
                this.ctxDTP.lineTo(incRight, incBottom);
                break;

            //Increment by 10 units.
            case CanvDTP.INC_10:
                this.ctxDTP.moveTo(incLeft, incBottom);
                this.ctxDTP.lineTo(incLeft + incWidth / 2, incBottom - incHeight / 2);
                this.ctxDTP.lineTo(incRight, incBottom);
                this.ctxDTP.moveTo(incLeft, incBottom - incHeight / 2);
                this.ctxDTP.lineTo(incLeft + incWidth / 2, incTop);
                this.ctxDTP.lineTo(incRight, incBottom - incHeight / 2);
                break;

            //Decrement by 1 unit.
            case CanvDTP.DEC_1:
                this.ctxDTP.moveTo(incLeft, incTop);
                this.ctxDTP.lineTo(incLeft + incWidth / 2, incBottom - incHeight / 2);
                this.ctxDTP.lineTo(incRight, incTop);
                break;

            //Decrement by 10 units.
            default:
                this.ctxDTP.moveTo(incLeft, incTop);
                this.ctxDTP.lineTo(incLeft + incWidth / 2, incBottom - incHeight / 2);
                this.ctxDTP.lineTo(incRight, incTop);
                this.ctxDTP.moveTo(incLeft, incBottom - incHeight / 2);
                this.ctxDTP.lineTo(incLeft + incWidth / 2, incBottom);
                this.ctxDTP.lineTo(incRight, incBottom - incHeight / 2);
                break;
        }

        this.ctxDTP.stroke();
    }

    //This function draws the calendar icon on the body canvas. Similar to above.
    calDraw(color)
    {
        //Calculate the padding pixels and line width.
        let calTop     = this.contentBottom - this.smallBoxHeight;
        let calBottom  = this.contentBottom;
        let calLeft    = this.contentLeft + (this.contentWidth / 2 - this.smallBoxWidth / 2);
        let calRight   = this.contentLeft + (this.contentWidth / 2 + this.smallBoxWidth / 2);
        let calWidth   = calRight - calLeft;
        let iXPad      = this.smallBoxWidth * this.calXPadding;
        let iYPad      = this.smallBoxHeight * this.calYPadding;
        let iLWidth    = calWidth * this.calLineWidth;
        let iXWidth    = calWidth - 2 * iXPad;
        let topWidth   = iXWidth / 5;
        let gridTop    = calTop + iYPad + 2 * iLWidth;
        let gridBottom = calBottom - iYPad;
        let gridWidth  = iXWidth / 4;
        let gridHeight = (gridBottom - gridTop) / 4;
      
        //Draw the top of the calendar.
        this.ctxDTP.beginPath();
        this.ctxDTP.lineWidth   = iLWidth;
        this.ctxDTP.strokeStyle = color;
        this.ctxDTP.moveTo(calLeft + iXPad, calTop + iYPad);        
        this.ctxDTP.lineTo(calLeft + iXPad + 1 * topWidth, calTop + iYPad);
        this.ctxDTP.moveTo(calLeft + iXPad + 2 * topWidth, calTop + iYPad);
        this.ctxDTP.lineTo(calLeft + iXPad + 3 * topWidth, calTop + iYPad);
        this.ctxDTP.moveTo(calLeft + iXPad + 4 * topWidth, calTop + iYPad);
        this.ctxDTP.lineTo(calLeft + iXPad + 5 * topWidth, calTop + iYPad);
        this.ctxDTP.moveTo(calLeft + iXPad, calTop + iYPad + iLWidth);
        this.ctxDTP.lineTo(calLeft + iXPad + 5 * topWidth, calTop + iYPad + iLWidth);
        this.ctxDTP.moveTo(calLeft + iXPad, calTop + iYPad + 2 * iLWidth);
        this.ctxDTP.lineTo(calLeft + iXPad + 5 * topWidth, calTop + iYPad + 2 * iLWidth);

        //Draw calendar grid.
        this.ctxDTP.moveTo(calLeft + iXPad, calTop + iYPad - iLWidth / 2);
        this.ctxDTP.lineTo(calLeft + iXPad, gridBottom);
        this.ctxDTP.moveTo(calLeft + iXPad + gridWidth, gridTop);
        this.ctxDTP.lineTo(calLeft + iXPad + gridWidth, gridBottom);
        this.ctxDTP.moveTo(calLeft + iXPad + 2 * gridWidth, gridTop);
        this.ctxDTP.lineTo(calLeft + iXPad + 2 * gridWidth, gridBottom);
        this.ctxDTP.moveTo(calLeft + iXPad + 3 * gridWidth, gridTop);
        this.ctxDTP.lineTo(calLeft + iXPad + 3 * gridWidth, gridBottom);
        this.ctxDTP.moveTo(calLeft + iXPad + 4 * gridWidth, calTop + iYPad - iLWidth / 2);
        this.ctxDTP.lineTo(calLeft + iXPad + 4 * gridWidth, gridBottom);
        this.ctxDTP.moveTo(calLeft + iXPad, gridTop + gridHeight);
        this.ctxDTP.lineTo(calLeft + iXPad + iXWidth, gridTop + gridHeight);
        this.ctxDTP.moveTo(calLeft + iXPad, gridTop + 2 * gridHeight);
        this.ctxDTP.lineTo(calLeft + iXPad + iXWidth, gridTop + 2 * gridHeight);
        this.ctxDTP.moveTo(calLeft + iXPad, gridTop + 3 * gridHeight);
        this.ctxDTP.lineTo(calLeft + iXPad + iXWidth, gridTop + 3 * gridHeight);
        this.ctxDTP.moveTo(calLeft + iXPad, gridTop + 4 * gridHeight);
        this.ctxDTP.lineTo(calLeft + iXPad + iXWidth, gridTop + 4 * gridHeight);
        this.ctxDTP.stroke();
    }

    //Highlight the hovered item.
    highlightHovItem(i)
    {
        //Get highlighted item type.
        this.pickedType = this.hitBounds[i].type;

        //Exit if first date is hit.
        if(this.pickedType === CanvDTP.SEL_PREVIOUS && this.firstHit) return;

        //Exit if last date is hit.
        if(this.pickedType === CanvDTP.SEL_NEXT && this.lastHit) return;

        //Determine the top view that can be shown.
        if(this.pickedType === CanvDTP.SEL_VIEW && this.calView <= this.topView) return;

        //Indicate something can be picked.
        this.isPicked = true;

        //Get additional info for days of month.
        if(i < CanvDTP.NUM_DAYS)
        {
            this.pickedDay  = this.dayArray[i].day;
            this.dayType    = this.dayArray[i].type;
        }
        
        //Calculate border thickness and radius based on height.
        let selectBorder = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.selectWeight;
        let selectRadius = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.selectRadius;

        //Draw the border and fill the space.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.selectBorderColor;
        this.ctxDTP.fillStyle   = this.selectFillColor;
        this.ctxDTP.lineWidth   = selectBorder;
        this.ctxDTP.arc(this.hitBounds[i].x1 + selectRadius, this.hitBounds[i].y1 + selectRadius, selectRadius, -Math.PI, -Math.PI / 2);
        this.ctxDTP.arc(this.hitBounds[i].x2 - selectRadius, this.hitBounds[i].y1 + selectRadius, selectRadius, -Math.PI / 2, 0);
        this.ctxDTP.arc(this.hitBounds[i].x2 - selectRadius, this.hitBounds[i].y2 - selectRadius, selectRadius, 0, Math.PI / 2);
        this.ctxDTP.arc(this.hitBounds[i].x1 + selectRadius, this.hitBounds[i].y2 - selectRadius, selectRadius, Math.PI / 2, Math.PI);
        this.ctxDTP.lineTo(this.hitBounds[i].x1, this.hitBounds[i].y1 + selectRadius);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();
    }

    //Fill in currently selected date component.
    fillCurrent(i)
    {
        //Calculate border thickness and radius based on height.
        let currentBorder = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.currentWeight;
        let currentRadius = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.currentRadius;

        try //Prevent exceptions if canvas calculations go negative.
        {
            //Draw the border and fill the space.
            this.ctxDTP.beginPath();
            this.ctxDTP.strokeStyle = this.currentBorderColor;
            this.ctxDTP.fillStyle   = this.currentFillColor;
            this.ctxDTP.lineWidth   = currentBorder;
            this.ctxDTP.arc(this.hitBounds[i].x1 + currentRadius, this.hitBounds[i].y1 + currentRadius, currentRadius, -Math.PI, -Math.PI / 2);
            this.ctxDTP.arc(this.hitBounds[i].x2 - currentRadius, this.hitBounds[i].y1 + currentRadius, currentRadius, -Math.PI / 2, 0);
            this.ctxDTP.arc(this.hitBounds[i].x2 - currentRadius, this.hitBounds[i].y2 - currentRadius, currentRadius, 0, Math.PI / 2);
            this.ctxDTP.arc(this.hitBounds[i].x1 + currentRadius, this.hitBounds[i].y2 - currentRadius, currentRadius, Math.PI / 2, Math.PI);
            this.ctxDTP.lineTo(this.hitBounds[i].x1, this.hitBounds[i].y1 + currentRadius);
            this.ctxDTP.fill();
            this.ctxDTP.stroke();
        }
        catch(e){ /*Do nothing. Just catch exception.*/ }
    }

    /*********************************** Body Canvas Functions ***********************************/

    //Calculate the canvas dimensions.
    bodyDimCalc()
    {
        this.contentWidth   = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding;
        this.contentHeight  = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding;
        this.contentLeft    = this.bodyCanWidth * this.bXPadding / 2;
        this.contentRight   = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding / 2;
        this.contentTop     = this.bodyCanWidth * this.bYPadding / 2;
        this.contentBottom  = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding / 2;
        this.smallBoxHeight = this.contentHeight / 9;
        this.smallBoxWidth  = this.contentWidth  / 7;
        this.innerTop       = this.contentTop + this.smallBoxHeight;
        this.innerBottom    = this.contentBottom - this.smallBoxHeight;
        this.innerLeft      = this.contentLeft;
        this.innerRight     = this.contentRight;
        this.bigBoxHeight   = (this.innerBottom - this.innerTop) / 4;
        this.bigBoxWidth    = this.contentWidth / 3;
        this.clockRadius    = this.smallBoxHeight * .5 - this.clockPad * this.smallBoxHeight;

        //Time view calculations.
        this.timeWidth      = this.contentWidth;
        this.timeHeight     = this.contentHeight - 2 * this.smallBoxHeight;
        this.timeLeft       = this.contentLeft;
        this.timeRight      = this.contentRight;
        this.timeTop        = this.contentTop;
        this.timeBottom     = this.contentBottom - 2 * this.smallBoxHeight;
        this.timeBoxWidth   = this.timeWidth / 3.5;
        this.timeBoxHeight  = this.timeHeight / 3;
    }

    //Calculate the x, y coordinates of the mouse over the body canvas.
    bodyCoords(mouseEvent)
    {
        let obj      = this.bodyCanvas;
        let obj_left = 0;
        let obj_top  = 0;
        
        //Get the offset of the body canvas and all its parents accumulated.
        while (obj.offsetParent)
        {
            obj_left += obj.offsetLeft;
            obj_top  += obj.offsetTop;
            obj       = obj.offsetParent;
        }

        if (mouseEvent)
        {
            //FireFox
            this.bodyX = mouseEvent.pageX;
            this.bodyY = mouseEvent.pageY;
        }
        else
        {
            //IE
            this.bodyX = window.event.x + document.body.scrollLeft - 2;
            this.bodyY = window.event.y + document.body.scrollTop - 2;
        }

        this.bodyX = this.bodyX - obj_left + document.body.scrollLeft;
        this.bodyY = this.bodyY - obj_top  + document.body.scrollTop;

        this.bodyDraw();
    }

    //Remove mouse cursor when leaving body canvas.
    bodyExit()
    {
        this.bodyX = -1000;
        this.bodyY = -1000;
        this.bodyDraw();
    }

    //Expand/collapse the calendar canvas.
    bodyAnimate()
    {
        switch(this.bodyCanAnim)
        {
            case CanvDTP.BODY_CLOSED:
                this.bodyCanWidth = 0;
                this.calView      = CanvDTP.CAL_MONTH;
                this.dateTime     = (this.pickerType === CanvDTP.PICK_TIME) ? CanvDTP.CAL_TIME : CanvDTP.CAL_DATE;
                this.tempYear     = this.year;
                this.tempMonth    = this.month;
                this.updateMonth  = true;
                this.updateYear   = true;
                this.updateDecade = true;
                clearInterval(this.bodyAnimTimer);

                if(this.closeCb && this.isCollapsible)this.closeCb();
                break;

            case CanvDTP.BODY_COLLAPSING:
                this.bodyCanWidth -= this.bodyAnimStep;
                if(this.bodyCanWidth < 0)
                {
                    this.bodyCanWidth = 0;
                    this.bodyCanAnim = CanvDTP.BODY_CLOSED;
                }
                break;

            case CanvDTP.BODY_OPEN:
                //Never exceed textbox width.
                if(this.bodyCanWidth > this.bodyCanMaxWidth)
                {
                    this.bodyCanWidth = this.bodyCanMaxWidth;
                }

                //Don't exceed user set max pixel width.
                if(this.maxPixelWidth && (this.bodyCanWidth > this.maxPixelWidth))
                {
                    this.bodyCanWidth = this.maxPixelWidth;
                }

                clearInterval(this.bodyAnimTimer);

                if(this.openCb && this.isCollapsible)this.openCb();
                break;

            case CanvDTP.BODY_EXPANDING:
                this.bodyCanWidth += this.bodyAnimStep;

                //Never exceed textbox width.
                if(this.bodyCanWidth > this.bodyCanMaxWidth)
                {
                    this.bodyCanWidth = this.bodyCanMaxWidth;
                    this.bodyCanAnim = CanvDTP.BODY_OPEN;
                }

                //Don't exceed user set max pixel width.
                if(this.maxPixelWidth && (this.bodyCanWidth > this.maxPixelWidth))
                {  
                    this.bodyCanWidth = this.maxPixelWidth;
                    this.bodyCanAnim = CanvDTP.BODY_OPEN;
                }
                break;

            default:
                clearInterval(this.bodyAnimTimer);
                break;
        }
        this.resize();
    }

    bodyDraw()
    {
        //Exit if the canvas does not meet minimum size dimensions.
        if(this.bodyCanWidth <= 5) return;

        //Reset the canvas dimensions. For some reason the canvas performance degrades
        //over time. This prevents that from happening. A bug in the Canvas API?
        this.bodyCanvas.width  = this.bodyCanWidth;
        this.bodyCanvas.height = this.bodyCanWidth;
        
        //Calculate the body canvas item dimensions.
        this.bodyDimCalc();
        this.updateDayArray();
        this.ctxDTP.clearRect(0, 0, this.bodyCanWidth, this.bodyCanWidth);
        
        //Calculate the padding pixels and line width.
        var borderPx    = this.bodyCanWidth * this.bBorderWeight;
        var borderRad   = this.bodyCanWidth * this.bBorderRadius;
        var borderWidth = Math.ceil(this.bodyCanWidth * this.bBorderWeight);

        //Draw the border and background fill.
        this.ctxDTP.beginPath();
        this.ctxDTP.lineWidth = borderWidth;
        this.ctxDTP.strokeStyle = this.bBorderColor;

        //Draw a clipping rectangle.
        this.ctxDTP.arc(borderRad, borderRad, borderRad, -Math.PI, -Math.PI / 2);
        this.ctxDTP.arc(this.bodyCanWidth - borderRad, borderRad, borderRad, -Math.PI / 2, 0);
        this.ctxDTP.arc(this.bodyCanWidth - borderRad, this.bodyCanWidth - borderRad, borderRad, 0, Math.PI / 2);
        this.ctxDTP.arc(borderRad, this.bodyCanWidth - borderRad, borderRad, Math.PI / 2, Math.PI);
        this.ctxDTP.lineTo(0, borderRad);
        this.ctxDTP.clip();

        this.ctxDTP.arc(borderRad + borderPx / 2, borderRad + borderPx / 2, borderRad, -Math.PI, -Math.PI / 2);
        this.ctxDTP.arc(this.bodyCanWidth - borderRad - borderPx / 2, borderRad + borderPx / 2, borderRad, -Math.PI / 2, 0);
        this.ctxDTP.arc(this.bodyCanWidth - borderRad - borderPx / 2, this.bodyCanWidth - borderRad - borderPx / 2, borderRad, 0, Math.PI / 2);
        this.ctxDTP.arc(borderRad + borderPx / 2, this.bodyCanWidth - borderRad - borderPx / 2, borderRad, Math.PI / 2, Math.PI);
        this.ctxDTP.lineTo(borderPx / 2, borderRad + borderPx / 2);
        
        this.ctxDTP.fillStyle = this.bFillColor;
        this.ctxDTP.fill();
        
        //Try to add a background image to the month view.
        if(this.calView === CanvDTP.CAL_MONTH && this.dateTime === CanvDTP.CAL_DATE)
        {
            try
            {
                this.ctxDTP.globalAlpha = this.monthImages[this.tempMonth - 1].opacity;
                let img = this.monthImages[this.tempMonth - 1].image;
                this.ctxDTP.drawImage(img, 0, 0, this.bodyCanWidth, this.bodyCanWidth);
            }
            catch(e){} //Just skip if image not found.
            finally{ this.ctxDTP.globalAlpha = 1; }
        }
        this.ctxDTP.stroke();

        //If in debug mode, draw a pointer on the body canvas.
        if(this.debug) this.pointerDraw();
        
        //Determine what to draw in the body canvas.
        if(this.dateTime === CanvDTP.CAL_TIME)
        {
            switch(this.timeView)
            {
                case CanvDTP.CAL_MIN_HOUR:
                    this.drawTime();
                    break;
                
                case CanvDTP.CAL_MINUTE:
                    this.drawMinute();
                    break;

                case CanvDTP.CAL_STD_HOUR:
                    this.drawStdHour();
                    break;

                case CanvDTP.CAL_MIL_HOUR:
                    this.drawMilHour();
                    break;
            }
        }
        else
        {
            switch(this.calView)
            {
                case CanvDTP.CAL_MONTH:
                    this.drawMonth();
                    break;

                case CanvDTP.CAL_YEAR:
                    this.drawYear();
                    break;

                case CanvDTP.CAL_DECADE:
                    this.drawDecade();
                    break;

                case CanvDTP.CAL_CENTURY:
                    this.drawCentury();
                    break;

                default:
                    this.drawMonth();
                    break;
            }
        }
    }

    /**************************************** Draw Month *****************************************/

    drawMonth()
    {
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_MONTH);

        //Update the month exclusions, if necessary.
        if(this.updateMonth)
        {
            this.updateMonth = false;
            this.monthExclude();
        }

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        let inRange = true;
        this.hitBounds = [];
        let x1, x2, y1, y2;
        let hitIndex = 0;
        let index;
        this.firstHit = false;
        this.lastHit  = false;

        //Hit boundaries for the days.
        for(let i = 2; i < 8; i++)
        {
            for(let j = 0; j < 7; j++)
            {
                x1 = this.contentLeft + j * this.smallBoxWidth;
                x2 = this.contentLeft + (j + 1) * this.smallBoxWidth - 1;
                y1 = this.contentTop + i * this.smallBoxHeight;
                y2 = this.contentTop + (i + 1) * this.smallBoxHeight - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_DAY, index: hitIndex});

                //Check if the day is out of range.
                if(this.checkBefore && this.compareDates(this.dayArray[hitIndex], this.firstDate) === CanvDTP.DATE_LESS) 
                {
                    inRange = false;
                }

                //First day of month may be first block on calendar.
                if(this.checkBefore && this.compareDates(this.dayArray[hitIndex], this.firstDate) === CanvDTP.DATE_EQUAL)
                {
                    this.firstHit = true;
                }
                
                //There will always be some left over days at the end of the month.
                if(this.checkAfter && this.compareDates(this.dayArray[hitIndex], this.lastDate) === CanvDTP.DATE_GREATER) 
                {
                    if(this.tempMonth === this.lastDate.month) this.lastHit = true;
                    inRange = false;
                }

                if(!inRange)
                {
                    this.monthSpecial[hitIndex].isSpecial = true;
                    this.monthSpecial[hitIndex].excluded = true;
                    this.monthSpecial[hitIndex].info = [];
                    this.monthSpecial[hitIndex].color = this.rangeBkColor;
                }

                if(this.monthSpecial[hitIndex].isSpecial)
                {
                    this.ctxDTP.beginPath();
                    this.ctxDTP.strokeStyle = this.monthSpecial[hitIndex].color;           
                    this.ctxDTP.fillStyle   = this.monthSpecial[hitIndex].color;
                    this.ctxDTP.lineWidth   = 1;
                    this.ctxDTP.rect(x1, y1, x2 - x1, y2 - y1);
                    this.ctxDTP.fill();
                    this.ctxDTP.stroke();
                }
                hitIndex++;
                inRange = true;
            }
        }

        //Do remaining hit boundaries.
        this.doCommonHitBounds(false, true, null);

        //Draw the day numbers.
        this.ctxDTP.beginPath();
        this.ctxDTP.font = (this.smallBoxHeight * this.dayScale) + "px " + this.fontStyle;
        for(let i = 0; i < CanvDTP.NUM_DAYS; i++)
        {
            let isSelected = false;
            let isToday    = false;
            let calcMonth, calcYear;

            switch(this.dayArray[i].type)
            {
                //Check for day before this month.
                case CanvDTP.DAY_PRE:
                    calcMonth = this.tempMonth - 1;
                    calcYear  = this.tempYear;
                    if(calcMonth <= 0)
                    {
                        calcMonth = 12;
                        calcYear--;
                    }

                    if(calcYear === this.year && calcMonth === this.month && this.day === this.dayArray[i].day)
                    {
                        isSelected = true;
                    }
                    break;

                //Check for day after this month.
                case CanvDTP.DAY_POST:
                    calcMonth = this.tempMonth + 1;
                    calcYear  = this.tempYear;
                    if(calcMonth >= 13)
                    {
                        calcMonth = 1;
                        calcYear++;
                    }

                    if(calcYear === this.year && calcMonth === this.month && this.day === this.dayArray[i].day)
                    {
                        isSelected = true;
                    }
                    break;

                //Must be day of this month.
                default:
                    if(this.tempYear === this.year && this.tempMonth === this.month && this.day === this.dayArray[i].day)
                    {
                        isSelected = true;
                     }
                    break;
            }

            //Fill in the currently selected day on the calendar.
            if(isSelected)this.fillCurrent(i);
        
            //Highlight today's date.
            switch(this.dayArray[i].type)
            {
                //Check for day before this month.
                case CanvDTP.DAY_PRE:
                    calcMonth = this.tempMonth - 1;
                    calcYear  = this.tempYear;
                    if(calcMonth <= 0)
                    {
                        calcMonth = 12;
                        calcYear--;
                    }

                    if(calcYear === this.nowYear && calcMonth === this.nowMonth && this.nowDay === this.dayArray[i].day)
                    {
                        isToday = true;
                    }
                    break;

                //Check for day after this month.
                case CanvDTP.DAY_POST:
                    calcMonth = this.tempMonth + 1;
                    calcYear  = this.tempYear;
                    if(calcMonth >= 13)
                    {
                        calcMonth = 1;
                        calcYear++;
                    }

                    if(calcYear === this.nowYear && calcMonth === this.nowMonth && this.nowDay === this.dayArray[i].day)
                    {
                        isToday = true;
                    }
                    break;

                //Must be day of this month.
                default:
                    if(this.tempYear === this.nowYear && this.tempMonth === this.nowMonth && this.nowDay === this.dayArray[i].day)
                    {
                        isToday = true;
                    }
                    break;
            }

            //Draw selector for todays date.
            if(isToday && this.todaysDate)
            {
                let angle1 = Math.atan((this.hitBounds[i].y2 - this.hitBounds[i].y1) / (this.hitBounds[i].x2 - this.hitBounds[i].x1));
                let h = Math.hypot(this.hitBounds[i].x2 - this.hitBounds[i].x1, this.hitBounds[i].y2 - this.hitBounds[i].y1);
                let triLength = h * this.nowWeight;
                
                //Draw the border and fill the space.   
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = this.nowColor;
                this.ctxDTP.fillStyle   = this.nowColor;
                this.ctxDTP.lineWidth   = 1;
                this.ctxDTP.moveTo(this.hitBounds[i].x1 + triLength * Math.cos(angle1), this.hitBounds[i].y1 + triLength * Math.sin(angle1));
                this.ctxDTP.lineTo(this.hitBounds[i].x1 + 1, this.hitBounds[i].y1 + .50 * this.nowWeight * this.smallBoxHeight);
                this.ctxDTP.lineTo(this.hitBounds[i].x1 + .50 * this.nowWeight * this.smallBoxWidth, this.hitBounds[i].y1);
                this.ctxDTP.moveTo(this.hitBounds[i].x2 - triLength * Math.cos(angle1), this.hitBounds[i].y2 - triLength * Math.sin(angle1));
                this.ctxDTP.lineTo(this.hitBounds[i].x2 - 1, this.hitBounds[i].y2 - .50 * this.nowWeight * this.smallBoxHeight);
                this.ctxDTP.lineTo(this.hitBounds[i].x2 - .50 * this.nowWeight * this.smallBoxWidth, this.hitBounds[i].y2);
                this.ctxDTP.moveTo(this.hitBounds[i].x2 - triLength * Math.cos(angle1), this.hitBounds[i].y1 + triLength * Math.sin(angle1));
                this.ctxDTP.lineTo(this.hitBounds[i].x2 - 1, this.hitBounds[i].y1 + .50 * this.nowWeight * this.smallBoxHeight);
                this.ctxDTP.lineTo(this.hitBounds[i].x2 - .50 * this.nowWeight * this.smallBoxWidth, this.hitBounds[i].y1);
                this.ctxDTP.moveTo(this.hitBounds[i].x1 + triLength * Math.cos(angle1), this.hitBounds[i].y2 - triLength * Math.sin(angle1));
                this.ctxDTP.lineTo(this.hitBounds[i].x1 + 1, this.hitBounds[i].y2 - .50 * this.nowWeight * this.smallBoxHeight);
                this.ctxDTP.lineTo(this.hitBounds[i].x1 + .50 * this.nowWeight * this.smallBoxWidth, this.hitBounds[i].y2);
                this.ctxDTP.fill();
                this.ctxDTP.stroke();
            }

            this.dayArray[i].type === CanvDTP.DAY_THIS ? this.ctxDTP.fillStyle = this.textMainColorn : this.ctxDTP.fillStyle = this.textAltColorn;

            //Get the text metrics.
            this.text       = this.dayArray[i].day;
            this.textHeight = this.smallBoxHeight * this.dayScale
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.smallBoxWidth - this.textWidth) / 2;
            this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;
            let verOffset   = this.dayVertOffset * this.smallBoxHeight;
            
            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.text,
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - this.smallBoxHeight + verOffset
            );
        }
        this.ctxDTP.stroke();

        //Draw the days of the week header.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.headerColor;
        this.ctxDTP.font = (this.smallBoxHeight * this.headerScale) + "px " + this.fontStyle;
        index = this.startOfWeek;
        for(let i = 0; i < 7; i++)
        {
            //Adjust for user configured start day of week.
            if(index >= this.days.length) index = 0

            //Get the text metrics.
            this.text       = this.days[index];
            this.textHeight = this.smallBoxHeight * this.headerScale
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.smallBoxWidth - this.textWidth) / 2;
            this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.days[index++],
                this.contentLeft + i * this.smallBoxWidth + this.textLeft,
                this.contentTop + this.smallBoxHeight + this.textBottom
            );
        }
        this.ctxDTP.stroke();

        //Draw the date and year.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.textMainColorn;
        this.ctxDTP.font = (this.smallBoxHeight * this.bannerScale) + "px " + this.fontStyle;

        //Get the text metrics.
        this.text       = this.MonthsArray[this.tempMonth - 1] + " " + this.tempYear;
        this.textHeight = this.smallBoxHeight * this.bannerScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(5 * this.smallBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

        this.ctxDTP.textBaseline = "top";
        this.ctxDTP.fillText
        (
            this.text, 
            this.contentLeft + this.smallBoxWidth + this.textLeft,
            this.contentTop + this.textBottom
        );
        this.ctxDTP.stroke();
        
        this.drawPrevious(this.textMainColorn); //Draw the previous button.
        this.drawNext(this.textMainColorn);     //Draw the next button.

        if(this.pickerType === CanvDTP.PICK_BOTH)
        {
            this.drawClock(this.textMainColorn);    //Draw the clock button.
        }
        
        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;

        //Indicate if any info text was found.
        let infoFound = false;

        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                //Exit if date picker only.
                if((this.pickerType === CanvDTP.PICK_DATE) && (this.hitBounds[i].type === CanvDTP.SEL_TIME)) continue;

                //Do special stuff for special days.
                if(this.hitBounds[i].hasOwnProperty("index") && this.monthSpecial[this.hitBounds[i].index].isSpecial) 
                {
                    if(this.monthSpecial[this.hitBounds[i].index].info.length)
                    {
                        let text = "";
                        this.calcInfoTextPos(this.hitBounds[i])
                        this.infoText.style.visibility = "visible";
                        this.infoPoint.style.visibility = "visible";

                        //Print all the info text with comma separations.
                        for(let j = 0; j < this.monthSpecial[this.hitBounds[i].index].info.length; j++)
                        {
                            text += this.monthSpecial[this.hitBounds[i].index].info[j];
                            if(j < this.monthSpecial[this.hitBounds[i].index].info.length - 1)
                            {
                                text += ", ";
                            }
                        }

                        this.infoText.innerHTML = text;
                        infoFound = true;
                    }
                
                    //If the day is excluded, stop here to prevent highlighting.
                    if(this.monthSpecial[this.hitBounds[i].index].excluded) continue;
                }

                this.highlightHovItem(i); //Highlight the hovered item.

                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    //Draw the day numbers.
                    case CanvDTP.SEL_DAY:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.smallBoxHeight * this.dayScale) + "px " + this.fontStyle;
                        this.ctxDTP.fillStyle = this.textAltColorh;
                        
                        if(this.dayArray[i].type === CanvDTP.DAY_THIS)
                        {
                            this.ctxDTP.fillStyle = this.textMainColorh;
                        }
                        else
                        {
                            this.ctxDTP.fillStyle = this.textAltColorh;
                        }
            
                        //Get the text metrics.
                        this.text       = this.dayArray[i].day;
                        this.textHeight = this.smallBoxHeight * this.dayScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.smallBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;
                        let verOffset   = this.dayVertOffset * this.smallBoxHeight;
            
                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.text,
                            this.hitBounds[i].x1 + this.textLeft,
                            this.hitBounds[i].y2 + this.textBottom - this.smallBoxHeight + verOffset
                        );
                        
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the month and year.
                    case CanvDTP.SEL_VIEW:
                        if(this.topView >= CanvDTP.CAL_MONTH) break;
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.textMainColorh;
                        this.ctxDTP.font = (this.smallBoxHeight * this.bannerScale) + "px " + this.fontStyle;

                        //Get the text metrics.
                        this.text       = this.MonthsArray[this.tempMonth - 1] + " " + this.tempYear;
                        this.textHeight = this.smallBoxHeight * this.bannerScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(5 * this.smallBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.text, 
                            this.contentLeft + this.smallBoxWidth + this.textLeft,
                            this.contentTop + this.textBottom
                        );
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the previous button.
                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.textMainColorh);
                        break;

                    //Highlight the next button.
                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.textMainColorh);
                        break;

                    //Highlight the clock graphic.
                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.textMainColorh);
                        break;
                }
            }
        }

        //Make sure the info text box is not visible when nothing selected.
        if(!infoFound)
        {
            this.infoText.style.visibility = "hidden"
            this.infoPoint.style.visibility = "hidden"
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /***************************************** Draw Year *****************************************/
    
    drawYear()
    {
        this.firstHit = false;
        this.lastHit  = false;
        let inRange   = true;
        let first;
        let last;

        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_GENERAL);

        //Update the year spotlights, if necessary.
        if(this.updateYear)
        {
            this.updateYear = false;
            this.yearSpotlight();
        }

        //Do hit bounds for previous, next, time and the banner.
        this.hitBounds = [];
        this.doCommonHitBounds(true, true, CanvDTP.SEL_MONTH);

        //Get first date and set day of month to is min value.
        if(this.checkBefore)
        {
            first = {...this.firstDate};
            first.day = 1;
        }
        
        //Get last date and set day of month to its max value.
        if(this.checkAfter)
        {
            last = {...this.lastDate};
            last.day = this.monthDaysArray[last.month - 1];
            if(this.leapCalc(last.year) && (last.month === CanvDTP.FEBRUARY)) last.day = 29;
        }

        //Highlight the background of special months.
        for(let i = 0; i < 12; i++)
        {
            let x1 = this.hitBounds[i].x1;
            let x2 = this.hitBounds[i].x2;
            let y1 = this.hitBounds[i].y1;
            let y2 = this.hitBounds[i].y2;

            //Disable previous button if necessary.
            if(this.checkBefore && this.compareDates({month: i + 1, day: first.day, year: this.tempYear}, first) === CanvDTP.DATE_EQUAL) 
            {
                this.firstHit = true;
            }
            //Blackout month if neccessary.
            if(this.checkBefore && this.compareDates({month: i + 1, day: first.day, year: this.tempYear}, first) === CanvDTP.DATE_LESS) 
            {
                inRange = false;
            }
            //Disable next button if necessary.
            if(this.checkAfter && this.compareDates({month: i + 1, day: last.day, year: this.tempYear}, last) === CanvDTP.DATE_EQUAL) 
            {
                this.lastHit = true;
            }
            //Blackout month if neccessary.
            if(this.checkAfter && this.compareDates({month: i + 1, day: last.day, year: this.tempYear}, last) === CanvDTP.DATE_GREATER) 
            {
                inRange = false;
            }

            if(!inRange)
            {
                this.yearSpecial[i].isSpecial = true;
                this.yearSpecial[i].excluded = true;
                this.yearSpecial[i].info = [];
                this.yearSpecial[i].color = this.rangeBkColor;
            }

            if(this.yearSpecial[i].isSpecial)
            {
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = this.yearSpecial[i].color;           
                this.ctxDTP.fillStyle   = this.yearSpecial[i].color;
                this.ctxDTP.lineWidth   = 1;
                this.ctxDTP.rect(x1, y1, x2 - x1, y2 - y1);
                this.ctxDTP.fill();
                this.ctxDTP.stroke();
            }
            inRange = true;
        }

        //Draw the months.
        for(let i = 0; i < 12; i++)
        {
            //Highlight the current selected month.
            if(this.tempYear === this.year && this.month === i + 1) this.fillCurrent(i);

            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.bigBoxHeight * this.monthScale) + "px " + this.fontStyle;
            this.ctxDTP.fillStyle = this.textMainColorn;

            //Get the text metrics.
            this.text       = this.shortMonthsArray[i];
            this.textHeight = this.bigBoxHeight * this.monthScale;
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
            this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.shortMonthsArray[i], 
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - this.bigBoxHeight
            );
            this.ctxDTP.stroke();
        }
        
        //Draw the year
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.textMainColorn;
        this.ctxDTP.font = (this.smallBoxHeight * this.bannerScale) + "px " + this.fontStyle;

        //Get the text metrics.
        this.text       = this.tempYear;
        this.textHeight = this.smallBoxHeight * this.bannerScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(5 * this.smallBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

        this.ctxDTP.textBaseline = "top";
        this.ctxDTP.fillText
        (
            this.text, 
            this.contentLeft + this.smallBoxWidth + this.textLeft,
            this.contentTop + this.textBottom
        );
        this.ctxDTP.stroke();
       
        this.drawPrevious(this.textMainColorn); //Draw the previous button.
        this.drawNext(this.textMainColorn);     //Draw the next button.

        if(this.pickerType === CanvDTP.PICK_BOTH)
        {
            this.drawClock(this.textMainColorn);    //Draw the clock button.
        }

        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;

        //Indicate if any info text was found.
        let infoFound = false;

        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                //Exit if date picker only.
                if((this.pickerType === CanvDTP.PICK_DATE) && (this.hitBounds[i].type === CanvDTP.SEL_TIME)) continue;

                //Do special stuff for special months.
                if(i < 12 && this.yearSpecial[i].isSpecial) 
                {
                    
                    if(this.yearSpecial[i].info.length)
                    {
                        let text = "";
                        this.calcInfoTextPos(this.hitBounds[i])
                        this.infoText.style.visibility = "visible";
                        this.infoPoint.style.visibility = "visible";

                        //Print all the info text with comma separations.
                        for(let j = 0; j < this.yearSpecial[i].info.length; j++)
                        {
                            text += this.yearSpecial[i].info[j];
                            if(j < this.yearSpecial[i].info.length - 1)
                            {
                                text += ", ";
                            }
                        }

                        this.infoText.innerHTML = text;
                        infoFound = true;
                    }

                    //If the month is excluded, stop here to prevent highlighting.
                    if(this.yearSpecial[i].excluded) continue;
                }

                this.highlightHovItem(i); //Highlight the hovered item.
                
                //Get additional info for days of month.
                this.pickedMonth = i + 1; 
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    case CanvDTP.SEL_MONTH:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.bigBoxHeight * this.monthScale) + "px " + this.fontStyle;
                        this.ctxDTP.fillStyle = this.textMainColorh;

                        //Get the text metrics.
                        this.text       = this.shortMonthsArray[i];
                        this.textHeight = this.bigBoxHeight * this.monthScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.shortMonthsArray[i], 
                            this.hitBounds[i].x1 + this.textLeft,
                            this.hitBounds[i].y2 + this.textBottom - this.bigBoxHeight
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_VIEW:
                        if(this.topView >= CanvDTP.CAL_YEAR) break;
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.textMainColorh;
                        this.ctxDTP.font = (this.smallBoxHeight * this.bannerScale) + "px " + this.fontStyle;

                        //Get the text metrics.
                        this.text       = this.tempYear;
                        this.textHeight = this.smallBoxHeight * this.bannerScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(5 * this.smallBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.text, 
                            this.contentLeft + this.smallBoxWidth + this.textLeft,
                            this.contentTop + this.textBottom
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.textMainColorh);
                        break;

                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.textMainColorh);
                        break;

                    //Highlight the clock graphic.
                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.textMainColorh);
                        break;
                }
            }
        }

        //Make sure the info text box is not visible when nothing selected.
        if(!infoFound)
        {
            this.infoText.style.visibility = "hidden"
            this.infoPoint.style.visibility = "hidden"
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /**************************************** Draw Decade ****************************************/

    drawDecade()
    {
        this.firstHit = false;
        this.lastHit  = false;
        let inRange   = true;
        let yearBase  = parseInt(this.tempYear / 10) * 10 - 1;
        let first;
        let last;

        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_GENERAL);

        //Update the decade spotlights, if necessary.
        if(this.updateDecade)
        {
            this.updateDecade = false;
            this.decadeSpotlight(yearBase);
        }
        
        //Do hit bounds for previous, next, time and the banner.
        this.hitBounds = [];
        this.doCommonHitBounds(true, true, CanvDTP.SEL_YEAR);

        //Get first date and set it to first day of the year.
        if(this.checkBefore)
        {
            first = {...this.firstDate};
            first.day = 1;
            first.month = 1;
        }

        //Get last date and set it to the last day of the year.
        if(this.checkAfter)
        {
            last = {...this.lastDate};
            last.day = 31;
            last.month = 12;
        }

        //Highlight the background of special months.
        for(let i = 0; i < 12; i++)
        {
            let x1 = this.hitBounds[i].x1;
            let x2 = this.hitBounds[i].x2;
            let y1 = this.hitBounds[i].y1;
            let y2 = this.hitBounds[i].y2;

            //Disable previous button if necessary.
            if(this.checkBefore && this.compareDates({month: first.month, day: first.day, year: this.decadeSpecial[i].year}, first) === CanvDTP.DATE_EQUAL) 
            {
                this.firstHit = true;
            }
            //Blackout year if neccessary.
            if(this.checkBefore && this.compareDates({month: first.month, day: first.day, year: this.decadeSpecial[i].year}, first) === CanvDTP.DATE_LESS) 
            {
                inRange = false;
            }
            //Disable next button if necessary.
            if(this.checkAfter && this.compareDates({month: last.month, day: last.day, year: this.decadeSpecial[i].year}, last) === CanvDTP.DATE_EQUAL) 
            {
                this.lastHit = true;
            }
            //Blackout month if neccessary.
            if(this.checkAfter && this.compareDates({month: last.month, day: last.day, year: this.decadeSpecial[i].year}, last) === CanvDTP.DATE_GREATER) 
            {
                inRange = false;
            }

            if(!inRange)
            {
                this.decadeSpecial[i].isSpecial = true;
                this.decadeSpecial[i].excluded = true;
                this.decadeSpecial[i].info = [];
                this.decadeSpecial[i].color = this.rangeBkColor;
            }

            if(this.decadeSpecial[i].isSpecial)
            {
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = this.decadeSpecial[i].color;           
                this.ctxDTP.fillStyle   = this.decadeSpecial[i].color;
                this.ctxDTP.lineWidth   = 1;
                this.ctxDTP.rect(x1, y1, x2 - x1, y2 - y1);
                this.ctxDTP.fill();
                this.ctxDTP.stroke();
            }
            inRange = true;
        }
        
        //Draw the years.
        for(let i = 0; i < 12; i++)
        {
            //Highlight the current selected year.
            if(yearBase + i === this.year) this.fillCurrent(i);
            
            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.bigBoxHeight * this.yearScale) + "px " + this.fontStyle;
            this.ctxDTP.fillStyle = (!i || i === 11) ? this.textAltColorn : this.ctxDTP.fillStyle = this.textMainColorn;

            //Get the text metrics.
            this.text       = yearBase + i;
            this.textHeight = this.bigBoxHeight * this.yearScale;
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
            this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.text, 
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - this.bigBoxHeight
            );
            this.ctxDTP.stroke();          
        }
        
        //Draw the decade.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.textMainColorn;
        this.ctxDTP.font = (this.smallBoxHeight * this.bannerScale) + "px " + this.fontStyle;

        //Get the text metrics.
        this.text       = (yearBase + 1) + "-" + (yearBase + 10);
        this.textHeight = this.smallBoxHeight * this.bannerScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(5 * this.smallBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

        this.ctxDTP.textBaseline = "top";
        this.ctxDTP.fillText
        (
            this.text,
            this.contentLeft + this.smallBoxWidth + this.textLeft,
            this.contentTop + this.textBottom
        );
        this.ctxDTP.stroke();

        this.drawPrevious(this.textMainColorn); //Draw the previous button.
        this.drawNext(this.textMainColorn);     //Draw the next button.

        if(this.pickerType === CanvDTP.PICK_BOTH)
        {
            this.drawClock(this.textMainColorn);    //Draw the clock button.
        }

        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;

        //Indicate if any info text was found.
        let infoFound = false;
        
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                //Exit if date picker only.
                if((this.pickerType === CanvDTP.PICK_DATE) && (this.hitBounds[i].type === CanvDTP.SEL_TIME)) continue;

                //Do special stuff for special years.
                if(i < 12 && this.decadeSpecial[i].isSpecial) 
                {
                    
                    if(this.decadeSpecial[i].info.length)
                    {
                        let text = "";
                        this.calcInfoTextPos(this.hitBounds[i])
                        this.infoText.style.visibility = "visible";
                        this.infoPoint.style.visibility = "visible";

                        //Print all the info text with comma separations.
                        for(let j = 0; j < this.decadeSpecial[i].info.length; j++)
                        {
                            text += this.decadeSpecial[i].info[j];
                            if(j < this.decadeSpecial[i].info.length - 1)
                            {
                                text += ", ";
                            }
                        }

                        this.infoText.innerHTML = text;
                        infoFound = true;
                    }

                    //If the month is excluded, stop here to prevent highlighting.
                    if(this.decadeSpecial[i].excluded) continue;
                }

                this.highlightHovItem(i); //Highlight the hovered item.

                //Get additional info for days of month.
                this.pickedYear = yearBase + i; 
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    case CanvDTP.SEL_YEAR:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.bigBoxHeight * this.yearScale) + "px " + this.fontStyle;
                        this.ctxDTP.fillStyle = (!i || i === 11) ? this.textAltColorh : this.ctxDTP.fillStyle = this.textMainColorh;

                        //Get the text metrics.
                        this.text       = yearBase + i;
                        this.textHeight = this.bigBoxHeight * this.yearScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.text, 
                            this.hitBounds[i].x1 + this.textLeft,
                            this.hitBounds[i].y2 + this.textBottom - this.bigBoxHeight
                        );
                        this.ctxDTP.stroke(); 
                        break;

                    case CanvDTP.SEL_VIEW:
                        if(this.topView >= CanvDTP.CAL_DECADE) break;
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.textMainColorh;
                        this.ctxDTP.font = (this.smallBoxHeight * this.bannerScale) + "px " + this.fontStyle;

                        //Get the text metrics.
                        this.text       = (yearBase + 1) + "-" + (yearBase + 10);
                        this.textHeight = this.smallBoxHeight * this.bannerScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(5 * this.smallBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.text,
                            this.contentLeft + this.smallBoxWidth + this.textLeft,
                            this.contentTop + this.textBottom
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.textMainColorh);
                        break;

                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.textMainColorh);
                        break;

                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.textMainColorh);
                        break;
                }
            }
        }

        //Make sure the info text box is not visible when nothing selected.
        if(!infoFound)
        {
            this.infoText.style.visibility = "hidden"
            this.infoPoint.style.visibility = "hidden"
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /*************************************** Draw Century ****************************************/

    drawCentury()
    {
        this.firstHit   = false;
        this.lastHit    = false;
        let centuryBase = parseInt(this.tempYear / 100) * 100 - 1;
        let thisDecade  = parseInt(this.year / 10) * 10;
        let inRange     = true;
        let first;
        let last;

        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_GENERAL);
        
        //Do hit bounds for previous, next, time and the banner.
        this.hitBounds = [];
        this.doCommonHitBounds(true, false, CanvDTP.SEL_DECADE);

        //Create an array of potentially excluded decades.
        let decadeExclude = new Array(12);
        for(let i = 0; i < 12; i++)
        {
            decadeExclude[i] =
            {
                excluded:  false,
                color:     "transparent",
                year: centuryBase - 10 + 10 * i + 1
            }
        }

        //Get first date and set it to first day of the year.
        if(this.checkBefore)
        {
            first       = {...this.firstDate};
            first.day   = 1;
            first.month = 1;
            first.year  = parseInt(first.year / 10) * 10;
        }

        //Get last date and set it to the last day of the year.
        if(this.checkAfter)
        {
            last       = {...this.lastDate};
            last.day   = 31;
            last.month = 12;
            last.year  = parseInt(last.year / 10) * 10;
        }

        //Highlight the background of special months.
        for(let i = 0; i < 12; i++)
        {
            let x1 = this.hitBounds[i].x1;
            let x2 = this.hitBounds[i].x2;
            let y1 = this.hitBounds[i].y1;
            let y2 = this.hitBounds[i].y2;

            //Disable previous button if necessary.
            if(this.checkBefore && this.compareDates({month: first.month, day: first.day, year: decadeExclude[i].year}, first) === CanvDTP.DATE_EQUAL) 
            {
                this.firstHit = true;
            }
            //Blackout year if neccessary.
            if(this.checkBefore && this.compareDates({month: first.month, day: first.day, year: decadeExclude[i].year}, first) === CanvDTP.DATE_LESS) 
            {
                inRange = false;
            }
            //Disable next button if necessary.
            if(this.checkAfter && this.compareDates({month: last.month, day: last.day, year: decadeExclude[i].year}, last) === CanvDTP.DATE_EQUAL) 
            {
                this.lastHit = true;
            }
            //Blackout month if neccessary.
            if(this.checkAfter && this.compareDates({month: last.month, day: last.day, year: decadeExclude[i].year}, last) === CanvDTP.DATE_GREATER) 
            {
                inRange = false;
            }

            if(!inRange)
            {
                decadeExclude[i].excluded = true;
                decadeExclude[i].color = this.rangeBkColor;
            }

            if(decadeExclude[i].excluded)
            {
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = decadeExclude[i].color;           
                this.ctxDTP.fillStyle   = decadeExclude[i].color;
                this.ctxDTP.lineWidth   = 1;
                this.ctxDTP.rect(x1, y1, x2 - x1, y2 - y1);
                this.ctxDTP.fill();
                this.ctxDTP.stroke();
            }
            inRange = true;
        }

        //Draw the decades.
        for(let i = 0; i < 12; i++)
        {
            //Highlight the current selected year.
            if((centuryBase + i * 10 - 9) === thisDecade)
            {
                this.fillCurrent(i);
            }
            
            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.bigBoxHeight * this.decadeScale) + "px " + this.fontStyle;
            this.ctxDTP.fillStyle = (!i || i === 11) ? this.textAltColorn : this.ctxDTP.fillStyle = this.textMainColorn;

            //Get the text metrics.
            this.text       = (centuryBase + i * 10 - 9);
            this.textHeight = this.bigBoxHeight * this.decadeScale;
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
            this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.text + "-", 
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - 1.20 * this.bigBoxHeight
            );

            //Get the text metrics.
            this.text       = centuryBase + i * 10;
            this.textHeight = this.bigBoxHeight * this.decadeScale;
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
            this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.text, 
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - .80 * this.bigBoxHeight
            );
            this.ctxDTP.stroke();          
        }

        //Draw the century.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.textMainColorn;
        this.ctxDTP.font = (this.smallBoxHeight * this.bannerScale) + "px " + this.fontStyle;

        //Get the text metrics.
        this.text       = (centuryBase + 1) + "-" + (centuryBase + 100);
        this.textHeight = this.smallBoxHeight * this.bannerScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(5 * this.smallBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.smallBoxHeight - this.textHeight) / 2;

        this.ctxDTP.textBaseline = "top";
        this.ctxDTP.fillText
        (
            this.text,
            this.contentLeft + this.smallBoxWidth + this.textLeft,
            this.contentTop + this.textBottom
        );
        this.ctxDTP.stroke();

        this.drawPrevious(this.textMainColorn); //Draw the previous button.
        this.drawNext(this.textMainColorn);     //Draw the next button.

        if(this.pickerType === CanvDTP.PICK_BOTH)
        {
            this.drawClock(this.textMainColorn);    //Draw the clock button.
        }

        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;
        
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                //Exit if date picker only.
                if((this.pickerType === CanvDTP.PICK_DATE) && (this.hitBounds[i].type === CanvDTP.SEL_TIME)) continue;
                
                //If the decade is excluded, stop here to prevent highlighting.
                if(i < 12 && decadeExclude[i].excluded) continue;

                this.highlightHovItem(i); //Highlight the hovered item.

                //Get additional info for days of month.
                this.pickedDecade = centuryBase + i * 10 - 9;
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    case CanvDTP.SEL_DECADE:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.bigBoxHeight * this.decadeScale) + "px " + this.fontStyle;
                        this.ctxDTP.fillStyle = (!i || i === 11) ? this.textAltColorh : this.ctxDTP.fillStyle = this.textMainColorh;

                        //Get the text metrics.
                        this.text       = (centuryBase + i * 10 - 9);
                        this.textHeight = this.bigBoxHeight * this.decadeScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.text + "-", 
                            this.hitBounds[i].x1 + this.textLeft,
                            this.hitBounds[i].y2 + this.textBottom - 1.20 * this.bigBoxHeight
                        );

                        //Get the text metrics.
                        this.text       = centuryBase + i * 10;
                        this.textHeight = this.bigBoxHeight * this.decadeScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.bigBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.bigBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.textBaseline = "top";
                        this.ctxDTP.fillText
                        (
                            this.text, 
                            this.hitBounds[i].x1 + this.textLeft,
                            this.hitBounds[i].y2 + this.textBottom - .80 * this.bigBoxHeight
                        );
                        this.ctxDTP.stroke();  
                        break;

                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.textMainColorh);
                        break;

                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.textMainColorh);
                        break;

                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.textMainColorh);
                        break;
                }
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /***************************************** Draw Time *****************************************/
    
    drawTime()
    {
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_TIME);

        //Calculate the hit boundaries.
        let x1, x2, y1, y2;
        this.hitBounds = [];

        //Calendar hit boundaries.
        x1 = this.contentLeft;
        x2 = this.contentRight  - 1;
        y1 = this.contentBottom - this.smallBoxHeight;
        y2 = this.contentBottom - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_DATE});
        
        //Hour increment hit boundaries.
        x1 = this.contentLeft;
        x2 = this.contentLeft + this.timeBoxWidth - 1;
        y1 = this.contentTop + .5 * this.timeBoxHeight;
        y2 = this.contentTop + this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_HINC1});

        //Hour decrement hit boundaries.
        x1 = this.contentLeft;
        x2 = this.contentLeft + this.timeBoxWidth - 1;
        y1 = this.contentTop + 2 * this.timeBoxHeight;
        y2 = this.contentTop + 2.5 * this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_HDEC1});

        //Minute increment 1 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth - 1;
        y1 = this.contentTop + .5 * this.timeBoxHeight;
        y2 = this.contentTop + this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MINC1});

        //Minute increment 10 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth - 1;
        y1 = this.contentTop;
        y2 = this.contentTop + .5 * this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MINC10});

        //Minute deccrement 1 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth - 1;
        y1 = this.contentTop + 2 * this.timeBoxHeight;
        y2 = this.contentTop + 2.5 * this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MDEC1});

        //Minute deccrement 10 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth - 1;
        y1 = this.contentTop + 2.5 * this.timeBoxHeight;
        y2 = this.contentTop + 3 * this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MDEC10});

        //AM/PM hit boundaries.
        if(!this.isMilitaryTime)
        {
            x1 = this.contentLeft + 2.5 * this.timeBoxWidth;
            x2 = this.contentLeft + 3.5 * this.timeBoxWidth - 1;
            y1 = this.contentTop + this.timeBoxHeight;
            y2 = this.contentTop + 2 * this.timeBoxHeight - 1;
            this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_AMPM});
        }

        //Hour hit boundaries.
        x1 = this.contentLeft;
        x2 = this.contentLeft + this.timeBoxWidth - 1;
        y1 = this.contentTop + this.timeBoxHeight;
        y2 = this.contentTop + 2 * this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_HOUR});

        //Minute hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth - 1;
        y1 = this.contentTop + this.timeBoxHeight;
        y2 = this.contentTop + 2 * this.timeBoxHeight - 1;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MINUTE});
        
        //Draw the calendar icon.
        if(this.pickerType !== CanvDTP.PICK_TIME) this.calDraw(this.textMainColorn);

        this.ctxDTP.beginPath();
        this.ctxDTP.font = (this.timeBoxHeight * this.timeScale) + "px " + this.fontStyle;
        this.ctxDTP.fillStyle = this.textMainColorn;
        this.ctxDTP.textBaseline = "top";

        //Get the text metrics.
        this.text       = this.isMilitaryTime ? (this.milHour < 10 ? "0" + this.milHour : this.milHour) : this.hour;
        this.textHeight = this.timeBoxHeight * this.timeScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(this.timeBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.timeBoxHeight - this.textHeight) / 2;

        this.ctxDTP.fillText //Draw the hours.
        (
            this.text, 
            this.contentLeft + this.textLeft,
            this.contentTop + this.timeBoxHeight + this.textBottom
        );

        //Get the text metrics.
        this.text       = ":";
        this.textHeight = this.timeBoxHeight * this.timeScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(this.timeBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.timeBoxHeight - this.textHeight) / 2;

        this.ctxDTP.fillText //Draw the hour minute separator.
        (
            this.text, 
            this.contentLeft + 0.75 * this.timeBoxWidth + this.textLeft,
            this.contentTop + this.timeBoxHeight + this.textBottom
        );

        //Get the text metrics.
        this.text       = this.minute < 10 ? "0" + this.minute : this.minute;
        this.textHeight = this.timeBoxHeight * this.timeScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(this.timeBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.timeBoxHeight - this.textHeight) / 2;

        this.ctxDTP.fillText //Draw the minutes.
        (
            this.text, 
            this.contentLeft + 1.5 * this.timeBoxWidth + this.textLeft,
            this.contentTop + this.timeBoxHeight + this.textBottom
        );
        
        //Draw the hour inc1 icon.
        this.incDraw(this.hitBounds[1].x1, this.hitBounds[1].x2, this.hitBounds[1].y1,
            this.hitBounds[1].y2, this.textMainColorn, CanvDTP.INC_1);

        //Draw the minute inc1 icon.
        this.incDraw(this.hitBounds[3].x1, this.hitBounds[3].x2, this.hitBounds[3].y1,
            this.hitBounds[3].y2, this.textMainColorn, CanvDTP.INC_1);

        //Draw the minute inc10 icon.
        this.incDraw(this.hitBounds[4].x1, this.hitBounds[4].x2, this.hitBounds[4].y1,
            this.hitBounds[4].y2, this.textMainColorn, CanvDTP.INC_10);

        //Draw the hour dec1 icon.
        this.incDraw(this.hitBounds[2].x1, this.hitBounds[2].x2, this.hitBounds[2].y1,
            this.hitBounds[2].y2, this.textMainColorn, CanvDTP.DEC_1);

        //Draw the minute dec1 icon.
        this.incDraw(this.hitBounds[5].x1, this.hitBounds[5].x2, this.hitBounds[5].y1,
            this.hitBounds[5].y2, this.textMainColorn, CanvDTP.DEC_1);

        //Draw the minute dec10 icon.
        this.incDraw(this.hitBounds[6].x1, this.hitBounds[6].x2, this.hitBounds[6].y1,
            this.hitBounds[6].y2, this.textMainColorn, CanvDTP.DEC_10);
        this.ctxDTP.stroke();

        //Draw AM/PM/MT.
        this.ctxDTP.beginPath();
        this.ctxDTP.font = (this.timeBoxHeight * this.timeAmPmScale) + "px " + this.fontStyle;
        this.ctxDTP.fillStyle = this.textMainColorn;

        //Get the text metrics.
        this.text       = this.isMilitaryTime ? "MT" : (this.isAM ? "AM" : "PM");
        this.textHeight = this.timeBoxHeight * this.timeAmPmScale;
        this.textWidth  = this.ctxDTP.measureText(this.text).width;
        this.textLeft   = Math.abs(this.timeBoxWidth - this.textWidth) / 2;
        this.textBottom = Math.abs(this.timeBoxHeight - this.textHeight) / 2;
        
        this.ctxDTP.fillText
        (
            this.text, 
            this.contentLeft + 2.5 * this.timeBoxWidth + this.textLeft,
            this.contentTop + this.timeBoxHeight + this.textBottom
        );
        this.ctxDTP.stroke();

        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;
        
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                //Exit if time picker only.
                if(this.pickerType === CanvDTP.PICK_TIME && this.hitBounds[i].type === CanvDTP.SEL_DATE) return;

                this.highlightHovItem(i); //Highlight the hovered item.

                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    //Highlight the calendar icon.
                    case CanvDTP.SEL_DATE:
                        this.calDraw(this.textMainColorh);
                        break;

                    case CanvDTP.SEL_HINC1:
                    case CanvDTP.SEL_MINC1:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1, 
                            this.hitBounds[i].y2, this.textMainColorh, CanvDTP.INC_1);
                        break;

                    case CanvDTP.SEL_MINC10:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1,
                            this.hitBounds[i].y2, this.textMainColorh, CanvDTP.INC_10);
                        break;

                    case CanvDTP.SEL_HDEC1:
                    case CanvDTP.SEL_MDEC1:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1,
                            this.hitBounds[i].y2, this.textMainColorh, CanvDTP.DEC_1);
                        break;

                    case CanvDTP.SEL_MDEC10:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1,
                            this.hitBounds[i].y2, this.textMainColorh, CanvDTP.DEC_10);
                        break;

                    case CanvDTP.SEL_AMPM:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.timeBoxHeight * this.timeAmPmScale) + "px " + this.fontStyle;
                        this.ctxDTP.fillStyle = this.textMainColorh;

                        //Get the text metrics.
                        this.text       = this.isMilitaryTime ? "MT" : (this.isAM ? "AM" : "PM");
                        this.textHeight = this.timeBoxHeight * this.timeAmPmScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.timeBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.timeBoxHeight - this.textHeight) / 2;
        
                        this.ctxDTP.fillText
                        (
                            this.text, 
                            this.contentLeft + 2.5 * this.timeBoxWidth + this.textLeft,
                            this.contentTop + this.timeBoxHeight + this.textBottom
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_MINUTE:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.timeBoxHeight * this.timeScale) + "px " + this.fontStyle;
                        this.ctxDTP.fillStyle = this.textMainColorh;

                        //Get the text metrics.
                        this.text       = this.minute < 10 ? "0" + this.minute : this.minute;
                        this.textHeight = this.timeBoxHeight * this.timeScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.timeBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.timeBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.fillText //Draw the minutes.
                        (
                            this.text, 
                            this.contentLeft + 1.5 * this.timeBoxWidth + this.textLeft,
                            this.contentTop + this.timeBoxHeight + this.textBottom
                        );
                        break;

                    case CanvDTP.SEL_HOUR:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.timeBoxHeight * this.timeScale) + "px " + this.fontStyle;
                        this.ctxDTP.fillStyle = this.textMainColorh;
                        
                        //Get the text metrics.
                        this.text       = this.isMilitaryTime ? (this.milHour < 10 ? "0" + this.milHour : this.milHour) : this.hour;
                        this.textHeight = this.timeBoxHeight * this.timeScale;
                        this.textWidth  = this.ctxDTP.measureText(this.text).width;
                        this.textLeft   = Math.abs(this.timeBoxWidth - this.textWidth) / 2;
                        this.textBottom = Math.abs(this.timeBoxHeight - this.textHeight) / 2;

                        this.ctxDTP.fillText //Draw the hours.
                        (
                            this.text, 
                            this.contentLeft + this.textLeft,
                            this.contentTop + this.timeBoxHeight + this.textBottom
                        );
                        this.ctxDTP.stroke();
                        break;
                }
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /**************************************** Draw Minute ****************************************/

    drawMinute()
    {
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_MINUTE);

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        this.hitBounds = [];
        let x1, x2, y1, y2;

        //Hit boundaries for the minutes.
        for(let i = 0; i < 10; i++)
        {
            for(let j = 0; j < 6; j++)
            {
                x1 = this.contentLeft + j * (this.contentWidth / 6);
                x2 = this.contentLeft + (j + 1) * (this.contentWidth / 6) - 1;
                y1 = this.contentTop + i * (this.contentHeight / 10);
                y2 = this.contentTop + (i + 1) * (this.contentHeight / 10) - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2});
            }
        }

        //Draw the minutes.
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            //Highlight the current selected month.
            if(this.minute === i) this.fillCurrent(i);

            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.minuteScale + "px " + this.fontStyle;
            this.ctxDTP.fillStyle = this.textMainColorn;

            //Get the text metrics.
            this.text       = i < 10 ? "0" + i : i;
            this.textHeight = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.minuteScale;
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.hitBounds[i].x2 - this.hitBounds[i].x1 - this.textWidth) / 2;
            this.textBottom = Math.abs(this.hitBounds[i].y2 - this.hitBounds[i].y1 - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.text,
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - (this.hitBounds[i].y2 - this.hitBounds[i].y1)
            );
            this.ctxDTP.stroke();
        }

        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;
        
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                this.highlightHovItem(i); //Highlight the hovered item.

                //Keep track of the currently highlighted minute for click detection.
                this.tempMinute = i;

                //Highlight the number.
                this.ctxDTP.beginPath();
                this.ctxDTP.font = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.minuteScale + "px " + this.fontStyle;
                this.ctxDTP.fillStyle = this.textMainColorh;

                //Get the text metrics.
                this.text       = i < 10 ? "0" + i : i;
                this.textHeight = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.minuteScale;
                this.textWidth  = this.ctxDTP.measureText(this.text).width;
                this.textLeft   = Math.abs(this.hitBounds[i].x2 - this.hitBounds[i].x1 - this.textWidth) / 2;
                this.textBottom = Math.abs(this.hitBounds[i].y2 - this.hitBounds[i].y1 - this.textHeight) / 2;

                this.ctxDTP.textBaseline = "top";
                this.ctxDTP.fillText
                (
                    this.text,
                    this.hitBounds[i].x1 + this.textLeft,
                    this.hitBounds[i].y2 + this.textBottom - (this.hitBounds[i].y2 - this.hitBounds[i].y1)
                );
                this.ctxDTP.stroke();
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /************************************ Draw Standard Hour *************************************/

    drawStdHour()
    {
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_STD_HOUR);

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        this.hitBounds = [];
        let x1, x2, y1, y2;

        //Hit boundaries for the hours.
        for(let i = 0; i < 4; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                x1 = this.contentLeft + j * (this.contentWidth / 3);
                x2 = this.contentLeft + (j + 1) * (this.contentWidth / 3) - 1;
                y1 = this.contentTop + i * (this.contentHeight / 4);
                y2 = this.contentTop + (i + 1) * (this.contentHeight / 4) - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2});
            }
        }

        //Draw the hours.
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            //Highlight the current selected month.
            if(this.hour === i + 1) this.fillCurrent(i);

            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale + "px " + this.fontStyle;
            this.ctxDTP.fillStyle = this.textMainColorn;

            //Get the text metrics.
            this.text       = i + 1;
            this.textHeight = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale;
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.hitBounds[i].x2 - this.hitBounds[i].x1 - this.textWidth) / 2;
            this.textBottom = Math.abs(this.hitBounds[i].y2 - this.hitBounds[i].y1 - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.text,
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - (this.hitBounds[i].y2 - this.hitBounds[i].y1)
            );
            this.ctxDTP.stroke();
        }

        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;
        
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                this.highlightHovItem(i); //Highlight the hovered item.

                //Keep track of the currently highlighted hour for click detection.
                this.tempHour = i + 1;

                //Highlight the number.
                this.ctxDTP.beginPath();
                this.ctxDTP.font = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale + "px " + this.fontStyle;
                this.ctxDTP.fillStyle = this.textMainColorh;

                //Get the text metrics.
                this.text       = i + 1;
                this.textHeight = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale;
                this.textWidth  = this.ctxDTP.measureText(this.text).width;
                this.textLeft   = Math.abs(this.hitBounds[i].x2 - this.hitBounds[i].x1 - this.textWidth) / 2;
                this.textBottom = Math.abs(this.hitBounds[i].y2 - this.hitBounds[i].y1 - this.textHeight) / 2;

                this.ctxDTP.textBaseline = "top";
                this.ctxDTP.fillText
                (
                    this.text,
                    this.hitBounds[i].x1 + this.textLeft,
                    this.hitBounds[i].y2 + this.textBottom - (this.hitBounds[i].y2 - this.hitBounds[i].y1)
                );
                this.ctxDTP.stroke();
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /************************************ Draw Military Hour *************************************/

    drawMilHour()
    {
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_MIL_HOUR);

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        this.hitBounds = [];
        let x1, x2, y1, y2;

        //Hit boundaries for the hours.
        for(let i = 0; i < 6; i++)
        {
            for(let j = 0; j < 4; j++)
            {
                x1 = this.contentLeft + j * (this.contentWidth / 4);
                x2 = this.contentLeft + (j + 1) * (this.contentWidth / 4) - 1;
                y1 = this.contentTop + i * (this.contentHeight / 6);
                y2 = this.contentTop + (i + 1) * (this.contentHeight / 6) - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2});
            }
        }

        //Draw the hours.
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            //Highlight the current selected month.
            if(this.milHour === i) this.fillCurrent(i);

            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale + "px " + this.fontStyle;
            this.ctxDTP.fillStyle = this.textMainColorn;

            //Get the text metrics.
            this.text       = i < 10 ? "0" + i : i;
            this.textHeight = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale;
            this.textWidth  = this.ctxDTP.measureText(this.text).width;
            this.textLeft   = Math.abs(this.hitBounds[i].x2 - this.hitBounds[i].x1 - this.textWidth) / 2;
            this.textBottom = Math.abs(this.hitBounds[i].y2 - this.hitBounds[i].y1 - this.textHeight) / 2;

            this.ctxDTP.textBaseline = "top";
            this.ctxDTP.fillText
            (
                this.text,
                this.hitBounds[i].x1 + this.textLeft,
                this.hitBounds[i].y2 + this.textBottom - (this.hitBounds[i].y2 - this.hitBounds[i].y1)
            );
            this.ctxDTP.stroke();
        }

        //Highlight the section being touched by the mouse cursor.
        this.isPicked = false;
        
        for(let i = 0; i < this.hitBounds.length; i++)
        {
            if
            (
                this.bodyX >= this.hitBounds[i].x1 &&
                this.bodyX <= this.hitBounds[i].x2 &&
                this.bodyY >= this.hitBounds[i].y1 &&
                this.bodyY <= this.hitBounds[i].y2
            )
            {
                this.highlightHovItem(i); //Highlight the hovered item.

                //Keep track of the currently highlighted hour for click detection.
                this.tempHour = i;

                this.ctxDTP.beginPath();
                this.ctxDTP.font = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale + "px " + this.fontStyle;
                this.ctxDTP.fillStyle = this.textMainColorh;

                //Get the text metrics.
                this.text       = i < 10 ? "0" + i : i;
                this.textHeight = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.hourScale;
                this.textWidth  = this.ctxDTP.measureText(this.text).width;
                this.textLeft   = Math.abs(this.hitBounds[i].x2 - this.hitBounds[i].x1 - this.textWidth) / 2;
                this.textBottom = Math.abs(this.hitBounds[i].y2 - this.hitBounds[i].y1 - this.textHeight) / 2;

                this.ctxDTP.textBaseline = "top";
                this.ctxDTP.fillText
                (
                    this.text,
                    this.hitBounds[i].x1 + this.textLeft,
                    this.hitBounds[i].y2 + this.textBottom - (this.hitBounds[i].y2 - this.hitBounds[i].y1)
                );
                this.ctxDTP.stroke();
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /******************************** Body Canvas Click Functions ********************************/

    //Determine which action to perform when the body canvas is clicked.
    bodyClick()
    {
        if(this.isPicked)
        {
            if(this.dateTime === CanvDTP.CAL_TIME)
            {
                let oldMilHour, oldHour, oldMin, oldIsAm, newMilHour, newHour, newMin, newIsAm
                switch(this.timeView)
                {
                    case CanvDTP.CAL_MIN_HOUR:
                        switch(this.pickedType)
                        {
                            case CanvDTP.SEL_DATE:
                                this.dateTime = CanvDTP.CAL_DATE;
                                if(this.dateClickCb) this.dateClickCb();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_HINC1:
                                oldMilHour = this.milHour;
                                oldHour = this.hour;
                                oldMin = this.minute;
                                oldIsAm = this.isAM;
                                this.incHour();
                                newMilHour = this.milHour;
                                newHour = this.hour;
                                newMin = this.minute;
                                newIsAm = this.isAM;
                                if(this.hourChangeCb)
                                {
                                    this.hourChangeCb
                                    (
                                        {
                                            oldMilHour: oldMilHour,
                                            oldHour:    oldHour,
                                            oldMin:     oldMin,
                                            oldIsAm:    oldIsAm,
                                            newMilHour: newMilHour,
                                            newHour:    newHour,
                                            newMin:     newMin,
                                            newIsAm:    newIsAm
                                        }
                                    );
                                }
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_HDEC1:
                                oldMilHour = this.milHour;
                                oldHour = this.hour;
                                oldMin = this.minute;
                                oldIsAm = this.isAM;
                                this.decHour();
                                newMilHour = this.milHour;
                                newHour = this.hour;
                                newMin = this.minute;
                                newIsAm = this.isAM;
                                if(this.hourChangeCb)
                                {
                                    this.hourChangeCb
                                    (
                                        {
                                            oldMilHour: oldMilHour,
                                            oldHour:    oldHour,
                                            oldMin:     oldMin,
                                            oldIsAm:    oldIsAm,
                                            newMilHour: newMilHour,
                                            newHour:    newHour,
                                            newMin:     newMin,
                                            newIsAm:    newIsAm
                                        }
                                    );
                                }
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_MINC1:
                                oldMilHour = this.milHour;
                                oldHour = this.hour;
                                oldMin = this.minute;
                                oldIsAm = this.isAM;
                                this.incMinute(1);
                                newMilHour = this.milHour;
                                newHour = this.hour;
                                newMin = this.minute;
                                newIsAm = this.isAM;
                                if(this.minuteChangeCb)
                                {
                                    this.minuteChangeCb
                                    (
                                        {
                                            oldMilHour: oldMilHour,
                                            oldHour:    oldHour,
                                            oldMin:     oldMin,
                                            oldIsAm:    oldIsAm,
                                            newMilHour: newMilHour,
                                            newHour:    newHour,
                                            newMin:     newMin,
                                            newIsAm:    newIsAm
                                        }
                                    );
                                }
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_MDEC1:
                                oldMilHour = this.milHour;
                                oldHour = this.hour;
                                oldMin = this.minute;
                                oldIsAm = this.isAM;
                                this.decMinute(1);
                                newMilHour = this.milHour;
                                newHour = this.hour;
                                newMin = this.minute;
                                newIsAm = this.isAM;
                                if(this.minuteChangeCb)
                                {
                                    this.minuteChangeCb
                                    (
                                        {
                                            oldMilHour: oldMilHour,
                                            oldHour:    oldHour,
                                            oldMin:     oldMin,
                                            oldIsAm:    oldIsAm,
                                            newMilHour: newMilHour,
                                            newHour:    newHour,
                                            newMin:     newMin,
                                            newIsAm:    newIsAm
                                        }
                                    );
                                }
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_MINC10:
                                oldMilHour = this.milHour;
                                oldHour = this.hour;
                                oldMin = this.minute;
                                oldIsAm = this.isAM;
                                this.incMinute(10);
                                newMilHour = this.milHour;
                                newHour = this.hour;
                                newMin = this.minute;
                                newIsAm = this.isAM;
                                if(this.minuteChangeCb)
                                {
                                    this.minuteChangeCb
                                    (
                                        {
                                            oldMilHour: oldMilHour,
                                            oldHour:    oldHour,
                                            oldMin:     oldMin,
                                            oldIsAm:    oldIsAm,
                                            newMilHour: newMilHour,
                                            newHour:    newHour,
                                            newMin:     newMin,
                                            newIsAm:    newIsAm
                                        }
                                    );
                                }
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_MDEC10:
                                oldMilHour = this.milHour;
                                oldHour = this.hour;
                                oldMin = this.minute;
                                oldIsAm = this.isAM;
                                this.decMinute(10);
                                newMilHour = this.milHour;
                                newHour = this.hour;
                                newMin = this.minute;
                                newIsAm = this.isAM;
                                if(this.minuteChangeCb)
                                {
                                    this.minuteChangeCb
                                    (
                                        {
                                            oldMilHour: oldMilHour,
                                            oldHour:    oldHour,
                                            oldMin:     oldMin,
                                            oldIsAm:    oldIsAm,
                                            newMilHour: newMilHour,
                                            newHour:    newHour,
                                            newMin:     newMin,
                                            newIsAm:    newIsAm
                                        }
                                    );
                                }
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_AMPM:
                                oldMilHour = this.milHour;
                                oldHour = this.hour;
                                oldMin = this.minute;
                                oldIsAm = this.isAM;
                                this.isAM ? this.milHour += 12 : this.milHour -= 12;
                                this.isAM = this.isAM ? false : true;
                                newMilHour = this.milHour;
                                newHour = this.hour;
                                newMin = this.minute;
                                newIsAm = this.isAM;
                                if(this.ampmChangeCb)
                                {
                                    this.ampmChangeCb
                                    (
                                        {
                                            oldMilHour: oldMilHour,
                                            oldHour:    oldHour,
                                            oldMin:     oldMin,
                                            oldIsAm:    oldIsAm,
                                            newMilHour: newMilHour,
                                            newHour:    newHour,
                                            newMin:     newMin,
                                            newIsAm:    newIsAm
                                        }
                                    );
                                }
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_MINUTE:
                                this.timeView = CanvDTP.CAL_MINUTE;
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_HOUR:
                                this.timeView = this.isMilitaryTime ? CanvDTP.CAL_MIL_HOUR : CanvDTP.CAL_STD_HOUR;
                                this.bodyDraw();
                                break;
                        }
                        break;

                    case CanvDTP.CAL_MINUTE:
                        oldMilHour = this.milHour;
                        oldHour = this.hour;
                        oldMin = this.minute;
                        oldIsAm = this.isAM;
                        this.minute = this.tempMinute;
                        this.timeView = CanvDTP.CAL_MIN_HOUR;
                        newMilHour = this.milHour;
                        newHour = this.hour;
                        newMin = this.minute;
                        newIsAm = this.isAM;
                        if(this.minuteChangeCb)
                        {
                            this.minuteChangeCb
                            (
                                {
                                    oldMilHour: oldMilHour,
                                    oldHour:    oldHour,
                                    oldMin:     oldMin,
                                    oldIsAm:    oldIsAm,
                                    newMilHour: newMilHour,
                                    newHour:    newHour,
                                    newMin:     newMin,
                                    newIsAm:    newIsAm
                                }
                            );
                        }
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.CAL_STD_HOUR:
                        oldMilHour = this.milHour;
                        oldHour = this.hour;
                        oldMin = this.minute;
                        oldIsAm = this.isAM;
                        this.hour = this.tempHour;
                        this.milHour = this.hour;
                        if(!this.isAM) this.milHour += 12;
                        if(this.milHour > 23) this.milHour = 0;
                        this.timeView = CanvDTP.CAL_MIN_HOUR;
                        newMilHour = this.milHour;
                        newHour = this.hour;
                        newMin = this.minute;
                        newIsAm = this.isAM;
                        if(this.hourChangeCb)
                        {
                            this.hourChangeCb
                            (
                                {
                                    oldMilHour: oldMilHour,
                                    oldHour:    oldHour,
                                    oldMin:     oldMin,
                                    oldIsAm:    oldIsAm,
                                    newMilHour: newMilHour,
                                    newHour:    newHour,
                                    newMin:     newMin,
                                    newIsAm:    newIsAm
                                }
                            );
                        }
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.CAL_MIL_HOUR:
                        oldMilHour = this.milHour;
                        oldHour = this.hour;
                        oldMin = this.minute;
                        oldIsAm = this.isAM;
                        this.milHour = this.tempHour;
                        this.hour = this.milHour;
                        this.isAM = (this.milHour > 11) ? false : true; 
                        if(!this.hour) this.hour = 12;
                        if(this.hour > 12) this.hour -= 12;
                        this.timeView = CanvDTP.CAL_MIN_HOUR;
                        newMilHour = this.milHour;
                        newHour = this.hour;
                        newMin = this.minute;
                        newIsAm = this.isAM;
                        if(this.hourChangeCb)
                        {
                            this.hourChangeCb
                            (
                                {
                                    oldMilHour: oldMilHour,
                                    oldHour:    oldHour,
                                    oldMin:     oldMin,
                                    oldIsAm:    oldIsAm,
                                    newMilHour: newMilHour,
                                    newHour:    newHour,
                                    newMin:     newMin,
                                    newIsAm:    newIsAm
                                }
                            );
                        }
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;
                }
            }
            else
            {
                let oldMonth, oldYear, newMonth, newYear;
                switch(this.calView)
                {
                    case CanvDTP.CAL_MONTH:
                        switch(this.pickedType)
                        {
                            case CanvDTP.SEL_DAY:
                                this.isFirstPicked = true;
                                
                                //Adjust the date if a day before the month is chosen.
                                if(this.dayType === CanvDTP.DAY_PRE)
                                {
                                    this.tempMonth--;
                                    if(this.tempMonth <= 0)
                                    {
                                        this.tempMonth = 12;
                                        this.tempYear--;
                                    }
                                    this.updateMonth = true;
                                }
                                //Adjust the date if a day after the month is chosen.
                                else if(this.dayType === CanvDTP.DAY_POST)
                                {
                                    this.tempMonth++;
                                    if(this.tempMonth >= 13)
                                    {
                                        this.tempMonth = 1;
                                        this.tempYear++;
                                    }
                                    this.updateMonth = true;
                                }

                                this.month = this.tempMonth;
                                this.year  = this.tempYear;
                                this.day   = this.pickedDay;
                                this.textBoxDateTime();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                oldMonth = this.tempMonth;
                                oldYear  = this.tempYear;
                                this.tempMonth--;

                                if(this.tempMonth <= 0)
                                {
                                    this.tempMonth = 12;
                                    this.tempYear--;
                                }
                                this.updateMonth = true;
                                this.bodyDraw();
                                newMonth = this.tempMonth;
                                newYear  = this.tempYear;

                                if(this.monthPrevClickCb)
                                {
                                    this.monthPrevClickCb({oldMonth: oldMonth, oldYear: oldYear,
                                        newMonth: newMonth, newYear: newYear});
                                }
                                break;

                            case CanvDTP.SEL_NEXT:
                                oldMonth = this.tempMonth;
                                oldYear  = this.tempYear; 
                                this.tempMonth++;

                                if(this.tempMonth >= 13)
                                {
                                    this.tempMonth = 1;
                                    this.tempYear++;
                                }
                                this.updateMonth = true;
                                this.bodyDraw();
                                newMonth = this.tempMonth;
                                newYear  = this.tempYear;

                                if(this.monthNextClickCb)
                                {
                                    this.monthNextClickCb({oldMonth: oldMonth, oldYear: oldYear,
                                        newMonth: newMonth, newYear: newYear});
                                }
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                this.timeView = CanvDTP.CAL_MIN_HOUR;
                                document.body.style.cursor = "default";
                                if(this.TimeClickCb) this.TimeClickCb();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_VIEW:
                                this.calView = CanvDTP.CAL_YEAR;
                                document.body.style.cursor = "default";
                                this.updateYear = true;
                                this.bodyDraw();
                                if(this.yearViewClickCb) this.yearViewClickCb(this.tempYear);
                                break;
                        }
                        break;

                    case CanvDTP.CAL_YEAR:
                        switch(this.pickedType)
                        {
                            case CanvDTP.SEL_MONTH:
                                this.calView = CanvDTP.CAL_MONTH;
                                this.tempMonth = this.pickedMonth;
                                document.body.style.cursor = "default";
                                this.updateMonth = true;
                                this.bodyDraw();
                                if(this.monthClickCb)
                                {
                                    this.monthClickCb({month: this.tempMonth, year: this.tempYear});
                                }
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                oldYear = this.tempYear;
                                this.tempYear--;
                                this.updateYear = true;
                                this.bodyDraw();
                                newYear = this.tempYear;
                                if(this.yearPrevClickCb)
                                {
                                    this.yearPrevClickCb({oldYear: oldYear, newYear: newYear});
                                }
                                break;

                            case CanvDTP.SEL_NEXT:
                                oldYear = this.tempYear;
                                this.tempYear++;
                                this.updateYear = true;
                                this.bodyDraw();
                                newYear = this.tempYear;
                                if(this.yearNextClickCb)
                                {
                                    this.yearNextClickCb({oldYear: oldYear, newYear: newYear});
                                }
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                this.timeView = CanvDTP.CAL_MIN_HOUR;
                                document.body.style.cursor = "default";
                                if(this.TimeClickCb) this.TimeClickCb();
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_VIEW:
                                this.calView = CanvDTP.CAL_DECADE;
                                document.body.style.cursor = "default";
                                this.updateDecade = true;
                                this.bodyDraw();
                                if(this.decadeViewClickCb) this.decadeViewClickCb(parseInt(this.tempYear / 10) * 10);
                                break;
                        }
                        break;

                    case CanvDTP.CAL_DECADE:
                        switch(this.pickedType)
                        {
                            case CanvDTP.SEL_YEAR:
                                this.calView = CanvDTP.CAL_YEAR;
                                this.tempYear = this.pickedYear;
                                document.body.style.cursor = "default";
                                this.updateYear = true;
                                this.bodyDraw();
                                if(this.yearClickCb) this.yearClickCb(this.tempYear);
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                oldYear = parseInt(this.tempYear / 10) * 10;
                                this.tempYear -= 10;
                                this.updateDecade = true;
                                this.bodyDraw();
                                newYear = parseInt(this.tempYear / 10) * 10;
                                if(this.decadePrevClickCb)
                                {
                                    this.decadePrevClickCb({oldDecade: oldYear, newDecade: newYear});
                                }
                                break;

                            case CanvDTP.SEL_NEXT:
                                oldYear = parseInt(this.tempYear / 10) * 10;
                                this.tempYear += 10;
                                this.updateDecade = true;
                                this.bodyDraw();
                                newYear = parseInt(this.tempYear / 10) * 10;
                                if(this.decadeNextClickCb)
                                {
                                    this.decadeNextClickCb({oldDecade: oldYear, newDecade: newYear});
                                }
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                this.timeView = CanvDTP.CAL_MIN_HOUR;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
                                if(this.TimeClickCb) this.TimeClickCb();
                                break;

                            case CanvDTP.SEL_VIEW:
                                this.calView = CanvDTP.CAL_CENTURY;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
                                if(this.centuryViewClickCb) this.centuryViewClickCb(parseInt(this.tempYear / 100) * 100);
                                break;
                        }
                        break;

                    case CanvDTP.CAL_CENTURY:
                        switch(this.pickedType)
                        {
                            case CanvDTP.SEL_DECADE:
                                this.calView = CanvDTP.CAL_DECADE;
                                this.tempYear = this.pickedDecade;
                                document.body.style.cursor = "default";
                                this.updateDecade = true;
                                this.bodyDraw();
                                if(this.decadeClickCb) this.decadeClickCb(parseInt(this.tempYear / 10) * 10);
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                oldYear = parseInt(this.tempYear / 100) * 100;
                                this.tempYear -= 100;
                                this.bodyDraw();
                                newYear = parseInt(this.tempYear / 100) * 100;
                                if(this.centuryPrevClickCb)
                                {
                                    this.centuryPrevClickCb({oldCentury: oldYear, newCentury: newYear});
                                }
                                break;

                            case CanvDTP.SEL_NEXT:
                                oldYear = parseInt(this.tempYear / 100) * 100;
                                this.tempYear += 100;
                                this.bodyDraw();
                                newYear = parseInt(this.tempYear / 100) * 100;
                                if(this.centuryNextClickCb)
                                {
                                    this.centuryNextClickCb({oldCentury: oldYear, newCentury: newYear});
                                }
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                this.timeView = CanvDTP.CAL_MIN_HOUR;
                                document.body.style.cursor = "default";
                                if(this.TimeClickCb) this.TimeClickCb();
                                this.bodyDraw();
                                break;
                        }
                        break;
                }
            }
        }
    }

    /************************************* Utility Functions *************************************/

    //Function derived from https://www.assa.org.au/edm#Computer
    //Returns the month and day of easter for a given year.
    static getEaster(year)
    {
        //Return if the year is outside the range of 1583 to 4099.
        if(year > 4099 || year < 1583) return{month: -1, day: -1};

        let FirstDig, Remain19, temp; //intermediate results
        let tA, tB, tC, tD, tE;       //table A to E results
        let d, m;                     //Day and month of easter.

        FirstDig = parseInt(year / 100); //first 2 digits of year
        Remain19 = year % 19;            //remainder of year / 19

        //calculate PFM date
        temp = parseInt((FirstDig - 15) / 2) + 202 - 11 * Remain19;
    
        switch(FirstDig)
        {
            case 21, 24, 25, 27, 28, 29, 30, 31, 32, 34, 35, 38:
                temp--;
                break;
            case 33, 36, 37, 39, 40:
                temp -= 2;
                break;
        }
   
        temp = temp % 30;
        tA = temp + 21;

        if(temp === 29)tA--;
        if(temp === 28 && Remain19 > 10)tA--;

        //find the next Sunday
        tB = (tA - 19) % 7;
        tC = (40 - FirstDig) % 4;

        if(tC === 3)tC++;
        if(tC > 1)tC++;
        
        temp = year % 100;
        tD = parseInt(temp + temp / 4) % 7;
        tE = ((20 - tB - tC - tD) % 7) + 1;
        d = tA + tE;

        //return the date
        if(d > 31)
        {
            d -= 31;
            m = 4;
        }
        else
        {
            m = 3;
        }
        return {month: m, day: d};
    }

    //Returns the month and day of thanksgiving for a given year.
    static getThanksgiving(year)
    {
        let first = new Date(year, 10, 1);
        let dayOfWeek = first.getDay();
        let d = ((dayOfWeek < 5) ? 26 : 33) - dayOfWeek;
        return {month: CanvDTP.NOVEMBER, day: d};
    }

    //Returns the month and day of MLK for a given year.
    static getMLK(year)
    {
        let first = new Date(year, 0, 1);
        let dayOfWeek = first.getDay();
        let d = ((dayOfWeek < 1) ? 16 : 23) - dayOfWeek;
        return {month: CanvDTP.JANUARY, day: d};
    }

    //Returns the month and day for mother's day for a given year.
    static getMothers(year)
    {
        let first = new Date(year, 4, 1);
        let dayOfWeek = first.getDay();
        let d = ((dayOfWeek < 1) ? 8 : 15) - dayOfWeek;
        return {month: CanvDTP.MAY, day: d};
    }

    //Returns the month and day for father's day for a given year.
    static getFathers(year)
    {
        let first = new Date(year, 5, 1);
        let dayOfWeek = first.getDay();
        let d = ((dayOfWeek < 1) ? 15 : 22) - dayOfWeek;
        return {month: CanvDTP.JUNE, day: d};
    }

    //Returns the month and day for Washington's birthday for a given year.
    static getWashington(year)
    {
        let first = new Date(year, 1, 1);
        let dayOfWeek = first.getDay();
        let d = ((dayOfWeek < 1) ? 16 : 23) - dayOfWeek;
        return {month: CanvDTP.FEBRUARY, day: d};
    }

    //Returns the month and day for memorial day for a given year.
    static getMemorial(year)
    {
        let first = new Date(year, 4, 31);
        let dayOfWeek = first.getDay();
        let d = ((dayOfWeek < 2) ? 25 : 32) - dayOfWeek;
        return {month: CanvDTP.MAY, day: d};
    }

    //Returns the month and day for labor day for a given year.
    static getLabor(year)
    {
        let first = new Date(year, 8, 1);
        let dayOfWeek = first.getDay();
        let d = ((dayOfWeek < 2) ? 2 : 9) - dayOfWeek;
        return {month: CanvDTP.SEPTEMBER, day: d};
    }

    //Returns the month and day for Columbus day for a given year.
    static getColumbus(year)
    {
        let first = new Date(year, 8, 1);
        let dayOfWeek = first.getDay();
        let d = 14 - dayOfWeek;
        return {month: CanvDTP.OCTOBER, day: d};
    }

    //Returns the date of independence day.
    static get getIndependence() {return {month: CanvDTP.JULY, day: 4}};

    //Returns the date of christmas day.
    static get getChristmas() {return {month: CanvDTP.DECEMBER, day: 25}};

    //Returns the date of new year's day.
    static get getNewYears() {return {month: CanvDTP.JANUARY, day: 1}};

    //Returns the date of Halloween.
    static get getHalloween() {return {month: CanvDTP.OCTOBER, day: 31}};

    //Returns the date of Valentine's day.
    static get getValentines() {return {month: CanvDTP.FEBRUARY, day: 14}};

    //Returns the date of St. Patrick's day.
    static get getStPatricks() {return {month: CanvDTP.MARCH, day: 17}};

    //Returns the date of veteran's day.
    static get getVeterans() {return {month: CanvDTP.NOVEMBER, day: 11}};

    /*************************************** API Functions ***************************************/

    getDateTimeString()
    {
        if(!this.isFirstPicked) return null;

        let dateTimeString;
        let formatString;

        //Check user defined format.
        if(this.dateTimeFormat)
        {
            formatString = this.dateTimeFormat;
        }
        //Use default format if no user format defined.
        else if(this.pickerType === CanvDTP.PICK_BOTH)
        {
            formatString = "M/D/YYYY h:mm a";
        }
        else if(this.pickerType === CanvDTP.PICK_DATE)
        {
            formatString = "M/D/YYYY";
        }
        else
        {
            formatString = "h:mm a";
        }

        dateTimeString = this.formatDateTime(formatString);
        return dateTimeString;
    }

    getDateTimeJSON()
    {
        //Calculate the day of the week.
        let d = new Date(this.year, this.month - 1, this.day);
        this.dayOfWeek = d.getDay();
        this.weekOfYearCalc();

        return {
            isPicked:   this.isFirstPicked,
            string:     this.dtpText.value,
            month:      this.month - 1,
            day:        this.day,
            year:       this.year,
            hour:       this.hour,
            milHour:    this.milHour,
            minute:     this.minute,
            ampm:       this.isAM ? "AM" : "PM",
            dayOfWeek:  this.dayOfWeek,
            dayOfYear:  this.dayOfYear,
            weekOfYear: this.weekOfYear
        };
    }

    setPickerType(type)
    {
        switch(type)
        {
            case CanvDTP.PICK_DATE:
                this.pickerType = CanvDTP.PICK_DATE;
                if(this.dateTime !== CanvDTP.CAL_DATE)
                {
                    this.calView    = CanvDTP.CAL_MONTH;
                    this.dateTime   = CanvDTP.CAL_DATE;
                }
                break;
            case CanvDTP.PICK_TIME:
                this.pickerType = CanvDTP.PICK_TIME;
                if(this.dateTime !== CanvDTP.CAL_TIME)
                {
                    this.timeView   = CanvDTP.CAL_MIN_HOUR;
                    this.dateTime   = CanvDTP.CAL_TIME;
                }
                break;
            default:
                this.pickerType = CanvDTP.PICK_BOTH;
                break;
        }
        this.textBoxDateTime();
        this.bodyDraw();
    }

    getPickerType()
    {
        return this.pickerType;
    }

    setDayExcludeArray(arrData)
    {
        let todaysIndex = -1;
        let todayExcluded = false;

        this.dayExcludeArray = [...arrData];
        this.monthExclude();
        
        //Try to find the currently selected date in the current month being displayed.
        for(let i = 0; i < this.dayArray.length; i++)
        {
            if
            (
                this.year  === this.dayArray[i].year &&
                this.month === this.dayArray[i].month &&
                this.day   === this.dayArray[i].day
            )
            {
                todaysIndex = i;
            }
        }

        //Check if current date is blocked.
        if(todaysIndex >= 0 && this.monthSpecial[todaysIndex].excluded) todayExcluded = true;

        //Delete the current date if no auto pick or date is blocked.
        if(todayExcluded)
        {
            this.month         = undefined;
            this.day           = undefined;
            this.year          = undefined;
            this.dayOfWeek     = undefined;
            this.dayOfYear     = undefined;
            this.isLeapYear    = undefined;
            this.isFirstPicked = false;
            this.autoPick      = false;
            this.dtpText.value = "";
        }
        else
        {
            this.isFirstPicked = true;
        }

        this.bodyDraw();
    }

    getDayExcludeArray()
    {
        return [...this.dayExcludeArray];
    }

    setDebug(isDebug)
    {
        this.debug = isDebug;
        this.bodyDraw();
    }

    getDebug()
    {
        return this.debug;
    }

    setScales(scales)
    {
        if(scales.hasOwnProperty("bannerScale")) this.bannerScale = scales.bannerScale;
        if(scales.hasOwnProperty("dayScale")) this.dayScale = scales.dayScale;
        if(scales.hasOwnProperty("monthScale")) this.monthScale = scales.monthScale;
        if(scales.hasOwnProperty("yearScale")) this.yearScale = scales.yearScale;
        if(scales.hasOwnProperty("decadeScale")) this.decadeScale = scales.decadeScale;
        if(scales.hasOwnProperty("timeScale")) this.timeScale = scales.timeScale;
        if(scales.hasOwnProperty("timeAmPmScale")) this.timeAmPmScale = scales.timeAmPmScale;
        if(scales.hasOwnProperty("minuteScale")) this.minuteScale = scales.minuteScale;
        if(scales.hasOwnProperty("hourScale")) this.hourScale = scales.hourScale;
        this.bodyDraw();      
    }

    getScales()
    {
        return {
            bannerScale:   this.bannerScale,
            dayScale:      this.dayScale,
            monthScale:    this.monthScale,
            yearScale:     this.yearScale,
            decadeScale:   this.decadeScale,
            timeScale:     this.timeScale,
            timeAmPmScale: this.timeAmPmScale,
            minuteScale:   this.minuteScale,
            hourScale:     this.hourScale
        }
    }

    setPrevNextParams(params)
    {
        if(params.hasOwnProperty("prevNextXPad")) this.prevNextXPad = params.prevNextXPad;
        if(params.hasOwnProperty("prevNextYPad")) this.prevNextYPad = params.prevNextYPad;
        this.bodyDraw();  
    }
    
    getPrevNextParams()
    {
        return {
            prevNextXPad: this.prevNextXPad,
            prevNextYPad: this.prevNextYPad
        }
    }

    setIncDecParams(params)
    {
        if(params.hasOwnProperty("incXPad")) this.incXPad = params.incXPad;
        if(params.hasOwnProperty("incYPad")) this.incYPad = params.incYPad;
        if(params.hasOwnProperty("incWeight")) this.incWeight = params.incWeight;
        this.bodyDraw();  
    }
    
    getIncDecParams()
    {
        return {
            incXPad:   this.incXPad,
            incYPad:   this.incYPad,
            incWeight: this.incWeight
        }
    }
    
    setTodaysDateParams(params)
    {
        if(params.hasOwnProperty("nowColor")) this.nowColor = params.nowColor;
        if(params.hasOwnProperty("nowWeight")) this.nowWeight = params.nowWeight;
        this.bodyDraw();  
    }
    
    getTodaysDateParams()
    {
        return {
            nowColor:  this.nowColor,
            nowWeight: this.nowWeight
        }
    }
    
    setSelectedParams(params)
    {
        if(params.hasOwnProperty("currentBorderColor")) this.currentBorderColor = params.currentBorderColor;
        if(params.hasOwnProperty("currentFillColor")) this.currentFillColor = params.currentFillColor;
        if(params.hasOwnProperty("currentRadius")) this.currentRadius = params.currentRadius;
        if(params.hasOwnProperty("currentWeight")) this.currentWeight = params.currentWeight;
        this.bodyDraw();  
    }
    
    getSelectedParams()
    {
        return {
            currentBorderColor: this.currentBorderColor,
            currentFillColor:   this.currentFillColor,
            currentRadius:      this.currentRadius,
            currentWeight:      this.currentWeight
        }
    }

    setWeekHeaderParams(params)
    {
        if(params.hasOwnProperty("headerColor")) this.headerColor = params.headerColor;
        if(params.hasOwnProperty("headerScale")) this.headerScale = params.headerScale;
        this.bodyDraw();  
    }
    
    getWeekHeaderParams()
    {
        return {
            headerColor: this.headerColor,
            headerScale: this.headerScale
        }
    }

    setCalendarParams(params)
    {
        if(params.hasOwnProperty("calXPadding")) this.calXPadding   = params.calXPadding;
        if(params.hasOwnProperty("calYPadding")) this.calYPadding   = params.calYPadding;
        if(params.hasOwnProperty("calLineWidth")) this.calLineWidth = params.calLineWidth;
        this.bodyDraw();  
    }
    
    getCalendarParams()
    {
        return {
            calXPadding:  this.calXPadding,
            calYPadding:  this.calYPadding,
            calLineWidth: this.calLineWidth
        }
    }

    setClockParams(params)
    {
        if(params.hasOwnProperty("clockPad")) this.clockPad       = params.clockPad;
        if(params.hasOwnProperty("clockWeight")) this.clockWeight = params.clockWeight;
        this.bodyDraw();  
    }
    
    getClockParams()
    {
        return {
            clockPad:    this.clockPad,
            clockWeight: this.clockWeight
        }
    }
    
    setSelectableParams(params)
    {
        if(params.hasOwnProperty("selectBorderColor")) this.selectBorderColor = params.selectBorderColor;
        if(params.hasOwnProperty("selectFillColor")) this.selectFillColor     = params.selectFillColor;
        if(params.hasOwnProperty("selectRadius")) this.selectRadius           = params.selectRadius;
        if(params.hasOwnProperty("selectWeight")) this.selectWeight           = params.selectWeight;
        this.bodyDraw();  
    }
    
    getSelectableParams()
    {
        return {
            selectBorderColor: this.selectBorderColor,
            selectFillColor:   this.selectFillColor,
            selectRadius:      this.selectRadius,
            selectWeight:      this.selectWeight
        }
    }
    
    setInfoTextParams(params)
    {
        if(params.hasOwnProperty("infoPointerSize")) this.infoPointerSize   = params.infoPointerSize;
        if(params.hasOwnProperty("infoBackColor")) this.infoBackColor       = params.infoBackColor;
        if(params.hasOwnProperty("infoTextColor")) this.infoTextColor       = params.infoTextColor;
        if(params.hasOwnProperty("infoPadding")) this.infoPadding           = params.infoPadding;
        if(params.hasOwnProperty("infoWidth")) this.infoWidth               = params.infoWidth;
        if(params.hasOwnProperty("infoBorderRadius")) this.infoBorderRadius = params.infoBorderRadius;
        this.infoText.style.backgroundColor = this.infoBackColor;
        this.infoText.style.color           = this.infoTextColor;
        this.infoText.style.borderRadius    = this.infoBorderRadius;
        this.infoText.style.width           = this.infoWidth;
        this.infoText.style.padding         = this.infoPadding;
        this.infoText.style.bottom          = this.infoPointerSize;      
        this.infoPoint.style.marginLeft     = "-" + this.infoPointerSize;
        this.infoPoint.style.borderWidth    = this.infoPointerSize + " " + this.infoPointerSize + " 0px " + this.infoPointerSize;
        this.infoPoint.style.borderColor    = this.infoBackColor + " transparent transparent transparent";
    }
    
    getInfoTextParams()
    {
        return {
            infoPointerSize:  this.infoPointerSize,
            infoBackColor:    this.infoBackColor,
            infoTextColor:    this.infoTextColor,
            infoPadding:      this.infoPadding,
            infoWidth:        this.infoWidth,
            infoBorderRadius: this.infoBorderRadius
        }
    }
    
    setBodyCanvasParams(params)
    {
        if(params.hasOwnProperty("bBorderColor")) this.bBorderColor   = params.bBorderColor;
        if(params.hasOwnProperty("bFillColor")) this.bFillColor       = params.bFillColor;
        if(params.hasOwnProperty("bBorderRadius")) this.bBorderRadius = params.bBorderRadius;
        if(params.hasOwnProperty("bBorderWeight")) this.bBorderWeight = params.bBorderWeight;
        if(params.hasOwnProperty("bXPadding")) this.bXPadding         = params.bXPadding;
        if(params.hasOwnProperty("bYPadding")) this.bYPadding         = params.bYPadding;
        this.bodyDraw();
    }
    
    getBodyCanvasParams()
    {
        return {
            bBorderColor:  this.bBorderColor,
            bFillColor:    this.bFillColor,
            bBorderRadius: this.bBorderRadius,
            bBorderWeight: this.bBorderWeight,
            bXPadding:     this.bXPadding,
            bYPadding:     this.bYPadding
        }
    }
    
    setIconCanvasParams(params)
    {
        if(params.hasOwnProperty("iBorderColorn")) this.iBorderColorn = params.iBorderColorn;
        if(params.hasOwnProperty("iFillColorn")) this.iFillColorn     = params.iFillColorn;
        if(params.hasOwnProperty("iCalColorn")) this.iCalColorn       = params.iCalColorn;
        if(params.hasOwnProperty("iBorderColorh")) this.iBorderColorh = params.iBorderColorh;
        if(params.hasOwnProperty("iFillColorh")) this.iFillColorh     = params.iFillColorh;
        if(params.hasOwnProperty("iCalColorh")) this.iCalColorh       = params.iCalColorh;
        if(params.hasOwnProperty("iBorderRadius")) this.iBorderRadius = params.iBorderRadius;
        if(params.hasOwnProperty("iBorderWeight")) this.iBorderWeight = params.iBorderWeight;
        if(params.hasOwnProperty("iXPadding")) this.iXPadding         = params.iXPadding;
        if(params.hasOwnProperty("iYPadding")) this.iYPadding         = params.iYPadding;
        if(params.hasOwnProperty("iLineWidth")) this.iLineWidth       = params.iLineWidth;
        this.iBorderColor = this.iBorderColorn;
        this.iFillColor   = this.iFillColorn;
        this.iCalColor    = this.iCalColorn;
        this.iconDraw();
        this.resize();
    }
    
    getIconCanvasParams()
    {
        return {
            iBorderColorn: this.iBorderColorn,
            iFillColorn:   this.iFillColorn,
            iCalColorn:    this.iCalColorn,
            iBorderColorh: this.iBorderColorh,
            iFillColorh:   this.iFillColorh,
            iCalColorh:    this.iCalColorh,
            iBorderRadius: this.iBorderRadius,
            iBorderWeight: this.iBorderWeight,
            iXPadding:     this.iXPadding,
            iYPadding:     this.iYPadding,
            iLineWidth:    this.iLineWidth
        }
    }
    
    setDayVertOffset(params) {this.dayVertOffset = params;}
    getDayVertOffset() {return this.dayVertOffset;}

    setBodyPosition(params)
    {
        this.bodyPosition = params;
        this.init();
        this.textBoxDateTime();
    }

    getBodyPosition() {return this.bodyPosition;}

    setIsCollapsible(params)
    {
        this.isCollapsible = params;
        
        if(this.isCollapsible)
        {
            this.parentDiv.style.height = this.dtpText.offsetHeight + "px";
            this.calendarIcon = true;
        }
        this.init();
        this.textBoxDateTime();
    }

    getIsCollapsible() {return this.isCollapsible;}

    setCalendarIcon(params)
    {
        this.calendarIcon = params;
        this.init();
        this.textBoxDateTime();
    }

    getCalendarIcon() {return this.calendarIcon;}

    setTopView(params)
    {
        this.topView = params;
        if(this.calView < this.topView) this.calView = this.topView;
        this.bodyDraw();
    }

    getTopView() {return this.topView;}

    setTodaysDate(params)
    {
        if(params.hasOwnProperty("year") && params.hasOwnProperty("month") && params.hasOwnProperty("day"))
        {
            this.nowYear  = params.year;
            this.nowMonth = params.month;
            this.nowDay   = params.day;
        }

        this.bodyDraw();
    }

    getTodaysDate() 
    {
        return {
            year:  this.nowYear,
            month: this.nowMonth,
            day:   this.nowDay
        }
    }

    setTodayIndicator(params)
    {
        this.todaysDate = params;
        this.bodyDraw();
    }
    getTodayIndicator() {return this.todaysDate;}

    setDateRanges(params)
    {
        let first = {...params.firstDate};
        let last  = {...params.lastDate};

        this.checkValidDate(first) ? this.checkBefore = true : this.checkBefore = false;
        this.checkValidDate(last)  ? this.checkAfter  = true : this.checkAfter  = false;

        this.firstDate = {...params.firstDate};
        this.lastDate  = {...params.lastDate};

        //Make sure the view stays within a valid range.
    
        //If the initial pick date is before first date, set it to first date. 
        if(this.checkBefore && this.compareDates({month: this.tempMonth, day: 1, year: this.tempYear}, this.firstDate) === CanvDTP.DATE_LESS)
        {
            this.tempMonth = this.firstDate.month;
            this.tempYear  = this.firstDate.year;
        }

        //If the initial pick date is before first date, set it to last date. 
        if(this.checkAfter && this.compareDates({month: this.tempMonth, day: 1, year: this.tempYear}, this.lastDate) === CanvDTP.DATE_GREATER)
        {
            this.tempMonth = this.lastDate.month;
            this.tempYear  = this.lastDate.year;
        }

        //If the initial pick date is before first date, set it to first date. 
        if(this.checkBefore && this.compareDates({month: this.month, day: this.day, year: this.year}, this.firstDate) === CanvDTP.DATE_LESS)
        {
            this.month = this.firstDate.month;
            this.day   = this.firstDate.day;
            this.year  = this.firstDate.year;
        }

        //If the initial pick date is before first date, set it to last date. 
        if(this.checkAfter && this.compareDates({month: this.month, day: this.day, year: this.year}, this.lastDate) === CanvDTP.DATE_GREATER)
        {
            this.month = this.lastDate.month;
            this.day   = this.lastDate.day;
            this.year  = this.lastDate.year;
        }
        
        this.updateDecade = true;
        this.updateYear   = true;
        this.updateMonth  = true;

        this.decadeSpotlight();
        this.yearSpotlight();
        this.monthExclude();
        this.textBoxDateTime();
        this.bodyDraw();
    }

    getDateRanges()
    {
        let first = this.checkValidDate(this.firstDate) ? this.firstDate : null;
        let last  = this.checkValidDate(this.lastDate)  ? this.lastDate  : null;
        return {
            firstDate: {...first},
            lastDate:  {...last}
        };
    }

    setFontStyle(params)
    {
        this.fontStyle = params;
        this.bodyDraw();
    }

    getFontStyle() {return this.fontStyle;}

    setIsMilitaryTime(params)
    {
        this.isMilitaryTime = params;
        this.bodyDraw();
    }

    getIsMilitaryTime() {return this.isMilitaryTime;}

    setStartOfWeek(params)
    {
        this.startOfWeek = params;
        this.bodyDraw();
    }

    getStartOfWeek() {return this.startOfWeek;}

    setMaxPixelWidth(params)
    {
        this.maxPixelWidth = params;
        this.bodyDraw();
    }

    getMaxPixelWidth() {return this.maxPixelWidth;}

    setIsAnimated(params) {this.isAnimated = params;}
    getIsAnimated() {return this.isAnimated;}

    setDateTimeFormat(params)
    {
        this.dateTimeFormat = params;
        this.textBoxDateTime();
    }

    getDateTimeFormat() {return this.dateTimeFormat;}

    setFontColors(params)
    {
        if(params.hasOwnProperty("textMainColorn")) this.textMainColorn = params.textMainColorn;
        if(params.hasOwnProperty("textMainColorh")) this.textMainColorh = params.textMainColorh;
        if(params.hasOwnProperty("textAltColorn")) this.textAltColorn   = params.textAltColorn;
        if(params.hasOwnProperty("textAltColorh")) this.textAltColorh   = params.textAltColorh;
        if(params.hasOwnProperty("rangeBkColor")) this.rangeBkColor     = params.rangeBkColor;
        this.bodyDraw();
    }
    
    getFontColors()
    {
        return {
            textMainColorn: this.textMainColorn,
            textMainColorh: this.textMainColorh,
            textAltColorn:  this.textAltColorn,
            textAltColorh:  this.textAltColorh,
            rangeBkColor:   this.rangeBkColor
        }
    }
}