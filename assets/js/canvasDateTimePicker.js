class CanvDTP
{
    //Number of day squares on the calendar
    static get NUM_DAYS() {return 42}

    //Animation constants.
    static get BODY_OPEN()       {return 0x00}
    static get BODY_CLOSED()     {return 0x01}
    static get BODY_EXPANDING()  {return 0x02}
    static get BODY_COLLAPSING() {return 0x03}

    //Calendar view.
    static get CAL_CENTURY() {return 0x00}
    static get CAL_DECADE()  {return 0x01}
    static get CAL_YEAR()    {return 0x02}
    static get CAL_MONTH()   {return 0x03}

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
    static get SEL_INC1()     {return 0x09}
    static get SEL_INC10()    {return 0x0A}
    static get SEL_DEC1()     {return 0x0B}
    static get SEL_DEC10()    {return 0x0C}
    static get SEL_AMPM()     {return 0x0D}

    //Displayed days of month types.
    static get DAY_THIS() {return 0x00}
    static get DAY_PRE()  {return 0x01}
    static get DAY_POST() {return 0x02}

    constructor(parentDiv)
    {
        this.debug = false;

        //HTML nodes required for date/time picker.
        this.parentDiv = parentDiv;
        this.paddingDiv;
        this.dtpText;
        this.bodyCanvas;
        this.iconCanvas;

        //Contexts of the canvases.
        this.ctxDTP;
        this.ctxIcon;

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

        /************************************ Icon Parameters ************************************/

        //Parameters of the icon canvas.
        this.iBorderRadius = .20;
        this.iBorderWeight = .05;
        this.iXPadding     = .20;
        this.iYPadding     = .20;
        this.iLineWidth    = .02;

        //Normal icon colors.
        this.iBorderColorn = "#a0a0a0";
        this.iFillColorn   = "#d0d0d0";
        this.iCalColorn    = "#000000";

        //Hover icon colors.
        this.iBorderColorh = "#202020";
        this.iFillColorh   = "#808080";
        this.iCalColorh    = "#ffffff";

        //Current icon colors.
        this.iBorderColor  = this.iBorderColorn;
        this.iFillColor    = this.iFillColorn;
        this.iCalColor     = this.iCalColorn;

        /************************************ Body Parameters ************************************/

        //Parameters of the body canvas.
        this.bBorderRadius = .05;
        this.bBorderWeight = .01;
        this.bXPadding     = .10;
        this.bYPadding     = .10;
        this.bLineWidth    = .02;

        //Body style.
        this.bBorderColor = "#a4e3f7";
        this.bFillColor   = "#e5f5fa";

        //*********************************** Selectable Items ************************************

        this.selectRadius = .25;
        this.selectWeight = .07;
        this.selectBorderColor = "#0087b6";
        this.selectFillColor   = "#a4e3f7";

        /************************************* Mouse Pointer *************************************/

        //Mouse pointer.
        this.bPointerWidth = .005;
        this.bPointerRad   = .01;
        this.bPointerColor = "#000000";

        /************************************* Days of Week **************************************/

        //Days of week header info.
        this.days            = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        this.headerHorzAdj   = [.12, .08, .15, .05, .15, .20, .12];
        this.headerVertAdj   = .20;
        this.headerScale     = .80;
        this.headerColor     = "#0087b6";
        this.headerFontStyle = "Arial";

        /************************************* Days of Month *************************************/

        this.nonDayColorn = "#888888";
        this.dayColorn    = "#000000";

        this.nonDayColorh = "#ff8888";
        this.dayColorh    = "#8800ff";

        this.dayScale     = .80;
        this.dayFontStyle = "Arial";
        this.dayVertAdj   = .20;
        this.dayHorzAdj   = 
        [
            .30, .30, .30, .30, .30, .30, .30, .30, .30, .10,
            .15, .10, .10, .10, .10, .10, .12, .12, .10, .15,
            .15, .15, .15, .15, .15, .15, .15, .15, .15, .15,
            .18
        ];

        /************************************ Month and Year *************************************/

        this.monthYearn = "#000000";
        this.monthYearh = "#8800ff";

        this.monthYearScale     = .80;
        this.monthYearFontStyle = "Arial";
        this.monthYearVertAdj   = .20;
        this.monthYearHorzAdj   = [.60, .50, .90, 1.15, 1.15, 1.05, 1.15, .75, .20, .60, .30, .30];

        /******************************* Previous/Next Parameters ********************************/

        this.prevNextColorn = "#000000";
        this.prevNextColorh = "#8800ff";
        this.prevNextXPad   = .20;
        this.prevNextYPad   = .35;
        
        /******************************* Clock Graphic Parameters ********************************/

        this.clockColorn = "#000000";
        this.clockColorh = "#8800ff";
        this.clockPad    = .10;
        this.clockWeight = .07;

        /******************************** Currently Selected Day *********************************/

        this.currentRadius = .25;
        this.currentWeight = .07;
        this.currentBorderColor = "#00f7ff";
        this.currentFillColor   = "#aefcff";

        /************************************* Today's Date **************************************/

        this.nowWeight = .25;
        this.nowColor  = "#000000";

        /*************************************** Year Text ***************************************/

        this.yearn = "#000000";
        this.yearh = "#8800ff";
        this.yearScale     = .60;
        this.yearFontStyle = "Arial";
        this.yearVertAdj   = .25;
        this.yearHorzAdj   = [.20, .20, .20, .20, .15, .20, .22, .18, .17, .20, .17, .17];

        /***************************************** Year ******************************************/

        this.onlyYearn = "#000000";
        this.onlyYearh = "#8800ff";
        this.onlyYearScale     = .80;
        this.onlyYearFontStyle = "Arial";
        this.onlyYearVertAdj   = .20;
        this.onlyYearHorzAdj   = 1.80;


















        /************************************ Misc Variables *************************************/

        //Variables for keeping track of date and time.
        this.isFirstPicked = false;
        this.isLeapYear    = false;
        this.pickedDay     = 0;
        this.dayType       = CanvDTP.DAY_THIS;

        //Currently selected date and time.
        this.month         = 1;
        this.day           = 1;
        this.year          = 2000;
        this.hour          = 12;
        this.minute        = 0;
        this.isAM          = true;
        this.dayOfWeek     = 6;
        this.dayMonthStart = 6;

        //Date used for drawing current canvas values.
        this.tempMonth   = 1;
        this.tempYear    = 2000;
        this.tempDecade  = 2000;
        this.tempCentury = 2000;

        //Todays date.
        this.nowYear;
        this.nowMonth;
        this.nowDay;

        //Keep track of currently picked item and view.
        this.isPicked    = false;
        this.calView     = CanvDTP.CAL_MONTH;
        this.dateTime    = CanvDTP.CAL_DATE;
        this.pickedType  = null;
        this.pickedMonth = 0;

        //Calendar drawing and hit detection variables.
        this.dayArray       = new Array(42);
        this.hitBounds      = [];
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
        if(this.parentDiv)this.intit();
    }

    intit()
    {
        //Create the components necessary for the date/time picker.
        this.paddingDiv = document.createElement("div");
        this.dtpText = document.createElement("input");
        this.bodyCanvas = document.createElement("canvas");
        this.iconCanvas = document.createElement("canvas");

        //Get 2D contexts of the canvases.
        this.ctxDTP = this.bodyCanvas.getContext("2d");
        this.ctxIcon = this.iconCanvas.getContext("2d");

        //Clear anything out of the parent div.
        this.parentDiv.innerHTML = "";

        //Add all the components to the div.
        this.paddingDiv.appendChild(this.dtpText);
        this.paddingDiv.appendChild(this.iconCanvas);
        this.paddingDiv.appendChild(this.bodyCanvas);
        this.parentDiv.appendChild(this.paddingDiv);

        //Add placeholder text to the textbox and make it read only.
        this.dtpText.placeholder = "Click Icon for Date/Time";
        this.dtpText.readOnly    = true;
        
        //Setup positioning to ignore any parent padding.
        this.paddingDiv.style.position = "relative";
        this.iconCanvas.style.position = "absolute";
        this.bodyCanvas.style.position = "absolute";

        //Add resize listener to resize the canvas.
        window.addEventListener("resize", () => this.resize());

        //Add mouse event listeners.
        this.iconCanvas.addEventListener("mouseenter", () => this.iconEnter());
        this.iconCanvas.addEventListener("mouseleave", () => this.iconExit());
        this.bodyCanvas.addEventListener('mouseleave', () => this.bodyExit());
        this.bodyCanvas.addEventListener('mousemove',  () => this.bodyCoords());


        //Add click event listeners.
        this.iconCanvas.addEventListener("click", () => this.iconClick());
        this.bodyCanvas.addEventListener("click", () => this.bodyClick());
        window.addEventListener("click", (event) => this.windowClick(event));

        this.iconCanvas.style.cursor = "pointer";

        this.resize();
    }

    //This function is called only once on the first pick after a page load.
    firstPick()
    {
        this.isFirstPicked = true;
        
        //For test purposes only!
        //let date = new Date(2020, 11, 1, 12, 0, 0, 0);

        //Get the current date and break it down.
        let date        = new Date();
        this.month      = date.getMonth() + 1;
        this.day        = date.getDate();
        this.year       = date.getFullYear();
        this.dayOfWeek  = date.getDay();
        this.isLeapYear = this.leapCalc(this.year);
        this.minute     = date.getMinutes();
        this.hour       = date.getHours();

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

        this.tempMonth   = this.month;
        this.tempYear    = this.year;
        this.tempDecade  = parseInt(this.year / 10)  * 10;
        this.tempCentury = parseInt(this.year / 100) * 100;
        this.nowYear     = this.year;
        this.nowMonth    = this.month;
        this.nowDay      = this.day;

        this.textBoxDateTime();
        this.updateDayArray();
    }

    //Update the array that holds the individual day to render.
    updateDayArray()
    {
        //Calculate the day the month starts on.
        let startDate = new Date(this.tempYear, this.tempMonth - 1, 1, 12, 0, 0, 0);
        let dayMonthStart = startDate.getDay();

        //Update the array with the current month days.
        let i = 0;
        for(i; i < this.monthDaysArray[this.tempMonth - 1]; i++)
        {
            this.dayArray[i + dayMonthStart] = { day: i + 1, type: CanvDTP.DAY_THIS };
        }

        //Special case for February on leap years.
        if(this.tempMonth === CanvDTP.FEBRUARY && this.leapCalc(this.tempYear))
        {
            this.dayArray[i++ + dayMonthStart] = { day: 29, type: CanvDTP.DAY_THIS };
        }

        //Update the array with post month days.
        let postDays = 1;
        while(i + dayMonthStart < 42)
        {
            this.dayArray[i++ + dayMonthStart] = { day: postDays++, type: CanvDTP.DAY_POST };
        }

        //Only add pre days if month does not start on a Sunday.
        if(dayMonthStart > 0)
        {
            i = dayMonthStart - 1;

            //Special case for March on leap years.
            if(this.tempMonth === CanvDTP.MARCH && this.leapCalc(this.tempYear))
            {
                this.dayArray[i--] = { day: 29, type: CanvDTP.DAY_PRE };
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
                this.dayArray[i--] = { day: preDays--, type: CanvDTP.DAY_PRE };
            }
        }
    }

    //Update the date and time in the textbox.
    textBoxDateTime()
    {
        let date = this.month + "/" + this.day + "/" + this.year;
        let min  = this.minute > 9 ? "" : "0";
        min += this.minute;
        let ampm = this.isAM ? "AM" : "PM";
        let time = this.hour + ":" + min + " " + ampm;
        this.dtpText.value = date + " " + time;
    }

    //Calculate if a year is a leap year.
    leapCalc(year)
    {
        let isLeap = false;
        let div4   = parseInt(year % 4);
        let div100 = parseInt(year % 100);

        if(!div4 && div100) isLeap = true;

        this.isLeapYear = isLeap;
        return this.isLeapYear;
    }

    //Calculate the x, y coordinates of the mouse over the body canvas.
    bodyCoords()
    {
        let obj = this.bodyCanvas;
        let obj_left = 0;
        let obj_top  = 0;
        
        //Get the offset of the body canvas and all its parents accumulated.
        while (obj.offsetParent)
        {
            obj_left += obj.offsetLeft;
            obj_top += obj.offsetTop;
            obj = obj.offsetParent;
        }

        //Figure out the total offset taking the mouse position and scroll into account.
        this.bodyX = window.event.x + window.pageXOffset - obj_left;
        this.bodyY = window.event.y + window.pageYOffset - obj_top;

        this.drawBody();
    }

    //Change icon colors when mouse is hovering over it.
    iconEnter()
    {
        this.iBorderColor = this.iBorderColorh;
        this.iFillColor   = this.iFillColorh;
        this.iCalColor    = this.iCalColorh;
        this.drawIcon();
    }

    //Change icon colors when mouse is not hovering over it.
    iconExit()
    {
        this.iBorderColor = this.iBorderColorn;
        this.iFillColor   = this.iFillColorn;
        this.iCalColor    = this.iCalColorn;
        this.drawIcon();
    }

    //Remove mouse cursor when leaving body canvas.
    bodyExit()
    {
        this.bodyX = -1000;
        this.bodyY = -1000;
        this.drawBody();
    }

    resize()
    {
        let rect = this.parentDiv.getBoundingClientRect();

        //Set the width of the text area - leave room for the icon canvas.
        this.dtpText.style.width = (rect.width - rect.height) + "px";
        
        //Save a copy of the canvas widths. Base for future calculations.
        this.bodyCanMaxWidth = rect.width;
        this.iconCanWidth = rect.height;

        //Set the animation step size for the body canvas.
        this.bodyAnimStep = this.bodyCanMaxWidth / this.animSteps;

        //Place the main date/time picker canvas below the text area.
        this.bodyCanvas.style.left = "0px";
        this.bodyCanvas.style.top = rect.height + "px";

        //Maximize the canvas size if it is open.
        if(this.bodyCanAnim === CanvDTP.BODY_OPEN)
        {
            this.bodyCanWidth  = this.bodyCanMaxWidth;
        }

        //Make the date/time picker a square the width of the parent container.
        this.bodyCanvas.width  = this.bodyCanWidth;
        this.bodyCanvas.height = this.bodyCanWidth;
        
        //Place the calendar icon to the right of the text box.
        this.iconCanvas.width  = this.iconCanWidth;
        this.iconCanvas.height = this.iconCanWidth;

        //Round the text box left border.
        this.dtpText.style.borderTopLeftRadius = (this.iconCanWidth * this.iBorderRadius) + "px";
        this.dtpText.style.borderBottomLeftRadius = (this.iconCanWidth * this.iBorderRadius) + "px";

        //Draw the date/time picker.
        this.drawIcon();
        this.drawBody();
    }

    //Close body canvas if click occurs outside of date/time picker.
    windowClick(event)
    {
        if(event.target !== this.bodyCanvas && event.target !== this.iconCanvas && event.target !== this.dtpText)
        {
            if(this.bodyCanAnim === CanvDTP.BODY_OPEN || this.bodyCanAnim === CanvDTP.BODY_EXPANDING)
            {
                this.bodyCanAnim = CanvDTP.BODY_COLLAPSING;
                clearInterval(this.bodyAnimTimer);
                this.bodyAnimTimer = setInterval(() => this.bodyAnimate(), this.animTime);
            }
        }        
    }

    //Event listener callback for animation body canvas.
    iconClick()
    {
        //Set the animation to expanding or collapsing.
        this.bodyCanAnim = (this.bodyCanAnim === CanvDTP.BODY_CLOSED ||
            this.bodyCanAnim === CanvDTP.BODY_COLLAPSING) ?
            CanvDTP.BODY_EXPANDING : CanvDTP.BODY_COLLAPSING;

        //Check if date/time has been picked already.
        if(!this.isFirstPicked) this.firstPick();
        
        clearInterval(this.bodyAnimTimer);
        this.bodyAnimTimer = setInterval(() => this.bodyAnimate(), this.animTime);
    }

    //Expand/collapse the calendar canvas.
    bodyAnimate()
    {
        switch(this.bodyCanAnim)
        {
            case CanvDTP.BODY_CLOSED:
                this.bodyCanWidth = 0;
                this.calView      = CanvDTP.CAL_MONTH;
                this.dateTime     = CanvDTP.CAL_DATE;
                this.tempYear     = this.year;
                this.tempMonth    = this.month;
                clearInterval(this.bodyAnimTimer);
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
                this.bodyCanWidth = this.bodyCanMaxWidth;
                clearInterval(this.bodyAnimTimer);
                break;

            case CanvDTP.BODY_EXPANDING:
                this.bodyCanWidth += this.bodyAnimStep;
                if(this.bodyCanWidth > this.bodyCanMaxWidth)
                {
                    this.bodyCanWidth = this.bodyCanMaxWidth;
                    this.bodyCanAnim = CanvDTP.BODY_OPEN;
                }
                break;

            default:
                clearInterval(this.bodyAnimTimer);
                break;
        }
       
        this.resize();
    }

    drawIcon()
    {
        //Exit if the canvas does not meet minimum size dimensions.
        if(this.iconCanWidth <= 5) return;

        //---------------- Draw the border ----------------
        let borderPx = this.iconCanWidth * this.iBorderWeight;

        this.ctxIcon.beginPath();
        this.ctxIcon.lineWidth = this.iconCanWidth * this.iBorderWeight;
        this.ctxIcon.strokeStyle = this.iBorderColor;

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
        let iYHeight   = this.iconCanWidth - 2 * iYPad;
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

    drawBody()
    {
        //Exit if the canvas does not meet minimum size dimensions.
        if(this.bodyCanWidth <= 5) return;

        this.updateDayArray();
        this.ctxDTP.clearRect(0, 0, this.bodyCanWidth, this.bodyCanWidth);

        //Calculate the padding pixels and line width.
        let borderPx    = this.bodyCanWidth * this.bBorderWeight;
        let borderRad   = this.bodyCanWidth * this.bBorderRadius;
        let borderWidth = Math.ceil(this.bodyCanWidth * this.bBorderWeight);

        //Draw the border and background fill.
        this.ctxDTP.beginPath();
        this.ctxDTP.lineWidth = borderWidth;
        this.ctxDTP.strokeStyle = this.bBorderColor;

        this.ctxDTP.arc(borderRad + borderPx / 2, borderRad + borderPx / 2, borderRad, -Math.PI, -Math.PI / 2);
        this.ctxDTP.arc(this.bodyCanWidth - borderRad - borderPx / 2, borderRad + borderPx / 2, borderRad, -Math.PI / 2, 0);
        this.ctxDTP.arc(this.bodyCanWidth - borderRad - borderPx / 2, this.bodyCanWidth - borderRad - borderPx / 2, borderRad, 0, Math.PI / 2);
        this.ctxDTP.arc(borderRad + borderPx / 2, this.bodyCanWidth - borderRad - borderPx / 2, borderRad, Math.PI / 2, Math.PI);
        this.ctxDTP.lineTo(borderPx / 2, borderRad + borderPx / 2);

        this.ctxDTP.fillStyle = this.bFillColor;
        this.ctxDTP.fill();
        this.ctxDTP.stroke();

        ///////////////////////////////////////////////////////////////////////////////////////////

        if(this.debug)
        {
            //Calculate the pointer radius and line width;
            let pointerRadius = this.bodyCanWidth * this.bPointerRad;
            let pointerWidth  = this.bodyCanWidth * this.bPointerWidth;

            //Draw a mouse indicator. For debug purposes.
            this.ctxDTP.beginPath();
            this.ctxDTP.strokeStyle = this.bPointerColor;
            this.ctxDTP.lineWidth = pointerWidth;
            this.ctxDTP.moveTo(this.bodyX, this.bodyY);
            this.ctxDTP.lineTo(this.bodyX - pointerRadius, this.bodyY);
            this.ctxDTP.lineTo(this.bodyX + pointerRadius, this.bodyY);
            this.ctxDTP.moveTo(this.bodyX, this.bodyY);
            this.ctxDTP.lineTo(this.bodyX, this.bodyY - pointerRadius);
            this.ctxDTP.lineTo(this.bodyX, this.bodyY + pointerRadius);
            this.ctxDTP.stroke();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////
        
        //Determine what to draw in the body canvas.
        if(this.dateTime === CanvDTP.CAL_TIME)
        {
            this.drawTime();
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
        let contentWidth  = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding;
        let contentHeight = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding;
        let contentLeft   = this.bodyCanWidth * this.bXPadding / 2;
        let contentRight  = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding / 2;
        let contentTop    = this.bodyCanWidth * this.bYPadding / 2;
        let contentBottom = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding / 2;
        let rowHeight     = contentHeight / 9;
        let dayWidth      = contentWidth  / 7;
        let clockRadius   = rowHeight * .5 - this.clockPad * rowHeight;
        
        ///////////////////////////////////////////////////////////////////////////////////////////
        
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug)
        {
            this.ctxDTP.beginPath();
            this.ctxDTP.strokeStyle = "#000000";
            this.ctxDTP.lineWidth = 1;
            this.ctxDTP.rect(contentLeft, contentTop, contentWidth, contentHeight);
            for(let i = 1; i < 9; i++)
            {
                this.ctxDTP.moveTo(contentLeft, contentTop + i * rowHeight);
                this.ctxDTP.lineTo(contentRight, contentTop + i * rowHeight);
            }
            for(let i = 1; i < 7; i++)
            {
                this.ctxDTP.moveTo(contentLeft + i * dayWidth, contentTop + rowHeight);
                this.ctxDTP.lineTo(contentLeft + i * dayWidth, contentTop + 8 * rowHeight);
            }

            this.ctxDTP.moveTo(contentLeft + 1 * dayWidth, contentTop);
            this.ctxDTP.lineTo(contentLeft + 1 * dayWidth, contentTop + rowHeight);

            this.ctxDTP.moveTo(contentLeft + 6 * dayWidth, contentTop);
            this.ctxDTP.lineTo(contentLeft + 6 * dayWidth, contentTop + rowHeight);

            this.ctxDTP.stroke();
        }
        
        ///////////////////////////////////////////////////////////////////////////////////////////

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        this.hitBounds = [];
        let x1, x2, y1, y2;

        //Hit boundaries for the days.
        for(let i = 2; i < 8; i++)
        {
            for(let j = 0; j < 7; j++)
            {
                x1 = contentLeft + j * dayWidth;
                x2 = contentLeft + (j + 1) * dayWidth - 1;
                y1 = contentTop + i * rowHeight;
                y2 = contentTop + (i + 1) * rowHeight - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_DAY});
            }
        }

        //Hit boundaries for previous.
        x1 = contentLeft;
        x2 = contentLeft + dayWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_PREVIOUS});

        //Hit boundaries for next.
        x1 = contentLeft + 6 * dayWidth;
        x2 = contentLeft + 7 * dayWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_NEXT});

        //Hit boundaries for month year.
        x1 = contentLeft + dayWidth;
        x2 = contentLeft + 6 * dayWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_VIEW});

        //Hit boundaries for time.
        x1 = contentLeft;
        x2 = contentLeft + 7 * dayWidth - 1;
        y1 = contentTop  + 8 * rowHeight;
        y2 = contentTop + 9 * rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_TIME});

        //Draw the day numbers.
        this.ctxDTP.beginPath();
        this.ctxDTP.font = (rowHeight * this.dayScale) + "px " + this.dayFontStyle;
        for(let i = 0; i < CanvDTP.NUM_DAYS; i++)
        {
            let isSelected = false;
            let isToday    = false;
            let calcMonth, calcYear;

            //Highlight the currently selected day.
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
            if(isSelected)
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
                catch
                {
                    //Do nothing. Just catch exception.
                }
            }
        
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
            if(isToday)
            {
                //Draw the border and fill the space.   
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = this.nowColor;
                this.ctxDTP.fillStyle   = this.nowColor;
                this.ctxDTP.lineWidth   = 1;
                this.ctxDTP.moveTo(this.hitBounds[i].x1, this.hitBounds[i].y1);
                this.ctxDTP.lineTo(this.hitBounds[i].x1 + this.nowWeight * dayWidth, this.hitBounds[i].y1);
                this.ctxDTP.lineTo(this.hitBounds[i].x1, this.hitBounds[i].y1 + this.nowWeight * dayWidth);
                this.ctxDTP.moveTo(this.hitBounds[i].x2, this.hitBounds[i].y2);
                this.ctxDTP.lineTo(this.hitBounds[i].x2 - this.nowWeight * dayWidth, this.hitBounds[i].y2);
                this.ctxDTP.lineTo(this.hitBounds[i].x2, this.hitBounds[i].y2 - this.nowWeight * dayWidth);
                this.ctxDTP.fill();
                this.ctxDTP.stroke();
            }

            this.dayArray[i].type === CanvDTP.DAY_THIS ? 
                this.ctxDTP.fillStyle = this.dayColorn :
                this.ctxDTP.fillStyle = this.nonDayColorn;
            
            this.ctxDTP.fillText
            (
                this.dayArray[i].day,
                this.hitBounds[i].x1 + dayWidth * this.dayHorzAdj[this.dayArray[i].day - 1],
                this.hitBounds[i].y2 - rowHeight * this.dayVertAdj
            );
        }
        this.ctxDTP.stroke();

        //Draw the days of the week header.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.headerColor;
        this.ctxDTP.font = (rowHeight * this.headerScale) + "px " + this.headerFontStyle;
        for(let i = 0; i < 7; i++)
        {
            this.ctxDTP.fillText
            (
                this.days[i],
                contentLeft + i * dayWidth + dayWidth * this.headerHorzAdj[i],
                contentTop + 2 * rowHeight - rowHeight * this.headerVertAdj
            );
        }
        this.ctxDTP.stroke();

        //Draw the date and year.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.monthYearn;
        this.ctxDTP.font = (rowHeight * this.monthYearScale) + "px " + this.monthYearFontStyle;
        this.ctxDTP.fillText
        (
            this.MonthsArray[this.tempMonth - 1] + " " + this.tempYear, 
            contentLeft + dayWidth + dayWidth * this.monthYearHorzAdj[this.tempMonth - 1],
            contentTop + rowHeight - rowHeight * this.monthYearVertAdj
        );
        this.ctxDTP.stroke();
        
        //Draw the previous graphic.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.prevNextColorn;
        this.ctxDTP.fillStyle   = this.prevNextColorn;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(contentLeft + this.prevNextXPad * dayWidth, contentTop + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + dayWidth - this.prevNextXPad * dayWidth, contentTop + this.prevNextYPad * contentTop);
        this.ctxDTP.lineTo(contentLeft + dayWidth - this.prevNextXPad * dayWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();

        //Draw the next graphic.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.prevNextColorn;
        this.ctxDTP.fillStyle   = this.prevNextColorn;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(contentRight - this.prevNextXPad * dayWidth, contentTop + .5 * rowHeight);
        this.ctxDTP.lineTo(contentRight - dayWidth + this.prevNextXPad * dayWidth, contentTop + this.prevNextYPad * contentTop);
        this.ctxDTP.lineTo(contentRight - dayWidth + this.prevNextXPad * dayWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();

        //Draw the clock
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.clockColorn;
        this.ctxDTP.lineWidth   = rowHeight * this.clockWeight;
        this.ctxDTP.arc
        (
            contentLeft + .5 * (contentWidth),
            contentTop + 8 * rowHeight + .5 * rowHeight,
            clockRadius,
            0,
            2 * Math.PI
        );
        this.ctxDTP.moveTo(contentLeft + .5 * contentWidth - .60 * clockRadius, contentTop + 8 * rowHeight + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight - .85 * clockRadius);
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
                //Indicate something can be picked.
                this.isPicked   = true;
                this.pickedType = this.hitBounds[i].type;

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
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    //Draw the day numbers.
                    case CanvDTP.SEL_DAY:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (rowHeight * this.dayScale) + "px " + this.dayFontStyle;
                        this.ctxDTP.fillStyle = this.nonDayColorh;
                        
                        if(this.dayArray[i].type === CanvDTP.DAY_THIS)
                        {
                            this.ctxDTP.fillStyle = this.dayColorh;
                        }
                        else
                        {
                            this.ctxDTP.fillStyle = this.nonDayColorh;
                        }
            
                        this.ctxDTP.fillText
                        (
                            this.dayArray[i].day,
                            this.hitBounds[i].x1 + dayWidth * this.dayHorzAdj[this.dayArray[i].day - 1],
                            this.hitBounds[i].y2 - rowHeight * this.dayVertAdj
                        );
                        
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the month and year.
                    case CanvDTP.SEL_VIEW:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.monthYearh;
                        this.ctxDTP.font = (rowHeight * this.monthYearScale) + "px " + this.monthYearFontStyle;
                        this.ctxDTP.fillText
                        (
                            this.MonthsArray[this.tempMonth - 1] + " " + this.tempYear, 
                            contentLeft + dayWidth + dayWidth * this.monthYearHorzAdj[this.tempMonth - 1],
                            contentTop + rowHeight - rowHeight * this.monthYearVertAdj
                        );
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the previous button.
                    case CanvDTP.SEL_PREVIOUS:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.strokeStyle = this.prevNextColorh;
                        this.ctxDTP.fillStyle   = this.prevNextColorh;
                        this.ctxDTP.lineWidth   = 1;
                        this.ctxDTP.moveTo(contentLeft + this.prevNextXPad * dayWidth, contentTop + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentLeft + dayWidth - this.prevNextXPad * dayWidth, contentTop + this.prevNextYPad * contentTop);
                        this.ctxDTP.lineTo(contentLeft + dayWidth - this.prevNextXPad * dayWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
                        this.ctxDTP.fill();
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the next button.
                    case CanvDTP.SEL_NEXT:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.strokeStyle = this.prevNextColorh;
                        this.ctxDTP.fillStyle   = this.prevNextColorh;
                        this.ctxDTP.lineWidth   = 1;
                        this.ctxDTP.moveTo(contentRight - this.prevNextXPad * dayWidth, contentTop + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentRight - dayWidth + this.prevNextXPad * dayWidth, contentTop + this.prevNextYPad * contentTop);
                        this.ctxDTP.lineTo(contentRight - dayWidth + this.prevNextXPad * dayWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
                        this.ctxDTP.fill();
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the clock graphic.
                    case CanvDTP.SEL_TIME:
                    default:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.strokeStyle = this.clockColorh;
                        this.ctxDTP.lineWidth   = rowHeight * this.clockWeight;
                        this.ctxDTP.arc
                        (
                            contentLeft + .5 * (contentWidth),
                            contentTop + 8 * rowHeight + .5 * rowHeight,
                            clockRadius,
                            0,
                            2 * Math.PI
                        );
                        this.ctxDTP.moveTo(contentLeft + .5 * contentWidth - .60 * clockRadius, contentTop + 8 * rowHeight + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight - .85 * clockRadius);
                        this.ctxDTP.stroke();
                        break;
                }
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /***************************************** Draw Year *****************************************/
    
    drawYear()
    {
        let contentWidth  = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding;
        let contentHeight = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding;
        let contentLeft   = this.bodyCanWidth * this.bXPadding / 2;
        let contentRight  = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding / 2;
        let contentTop    = this.bodyCanWidth * this.bYPadding / 2;
        let contentBottom = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding / 2;
        let rowHeight     = contentHeight / 9;
        let nextPrevWidth = contentWidth  / 7;
        let monthsTop     = contentTop + rowHeight;
        let monthsBottom  = contentBottom - rowHeight;
        let monthsLeft    = contentLeft;
        let monthsRight   = contentRight;
        let monthsWidth   = contentWidth / 3;
        let monthsHeight  = (monthsBottom - monthsTop) / 4;
        let clockRadius   = rowHeight * .5 - this.clockPad * rowHeight;

        ///////////////////////////////////////////////////////////////////////////////////////////
        
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug)
        {
            this.ctxDTP.beginPath();
            this.ctxDTP.strokeStyle = "#000000";
            this.ctxDTP.lineWidth = 1;
            this.ctxDTP.rect(contentLeft, contentTop, contentWidth, contentHeight);
            this.ctxDTP.moveTo(monthsLeft, monthsTop);
            this.ctxDTP.lineTo(monthsRight, monthsTop);
            this.ctxDTP.moveTo(monthsLeft, monthsBottom);
            this.ctxDTP.lineTo(monthsRight, monthsBottom);
            for(let i = 1; i < 4; i++)
            {
                this.ctxDTP.moveTo(monthsLeft, monthsTop + i * monthsHeight);
                this.ctxDTP.lineTo(monthsRight, monthsTop + i * monthsHeight);
            }
            for(let i = 1; i < 3; i++)
            {
                this.ctxDTP.moveTo(monthsLeft + i * monthsWidth, monthsTop);
                this.ctxDTP.lineTo(monthsLeft + i * monthsWidth, monthsBottom);
            }
            this.ctxDTP.moveTo(contentLeft + nextPrevWidth, contentTop);
            this.ctxDTP.lineTo(contentLeft + nextPrevWidth, contentTop + rowHeight);
            this.ctxDTP.moveTo(contentRight - nextPrevWidth, contentTop);
            this.ctxDTP.lineTo(contentRight - nextPrevWidth, contentTop + rowHeight);
            this.ctxDTP.stroke();
        }
        
        ///////////////////////////////////////////////////////////////////////////////////////////

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        this.hitBounds = [];
        let x1, x2, y1, y2;

        //Hit boundaries for the months.
        for(let i = 0; i < 4; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                x1 = monthsLeft + j * monthsWidth;
                x2 = monthsLeft + (j + 1) * monthsWidth - 1;
                y1 = monthsTop + i * monthsHeight;
                y2 = monthsTop + (i + 1) * monthsHeight - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_MONTH});
            }
        }

        //Hit boundaries for previous.
        x1 = contentLeft;
        x2 = contentLeft + nextPrevWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_PREVIOUS});

        //Hit boundaries for next.
        x1 = contentLeft + 6 * nextPrevWidth;
        x2 = contentLeft + 7 * nextPrevWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_NEXT});

        //Hit boundaries for year.
        x1 = contentLeft + nextPrevWidth;
        x2 = contentLeft + 6 * nextPrevWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_VIEW});

        //Hit boundaries for time.
        x1 = contentLeft;
        x2 = contentLeft + 7 * nextPrevWidth - 1;
        y1 = contentTop  + 8 * rowHeight;
        y2 = contentTop + 9 * rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_TIME});

        //Draw the months.
        for(let i = 0; i < 12; i++)
        {
            //Highlight the current selected month.
            if(this.tempYear === this.year && this.month === i + 1)
            {
                //Calculate border thickness and radius based on height.
                let currentBorder = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.currentWeight;
                let currentRadius = (this.hitBounds[i].y2 - this.hitBounds[i].y1) * this.currentRadius;

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

            this.ctxDTP.beginPath();
            this.ctxDTP.font = (monthsHeight * this.yearScale) + "px " + this.yearFontStyle;
            this.ctxDTP.fillStyle = this.yearn;
            this.ctxDTP.fillText
            (
                this.shortMonthsArray[i], 
                this.hitBounds[i].x1 + this.yearHorzAdj[i] * monthsWidth,
                this.hitBounds[i].y2 - this.yearVertAdj * monthsHeight
            );
            this.ctxDTP.stroke();
        }
        
        //Draw the year
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.onlyYearn;
        this.ctxDTP.font = (rowHeight * this.onlyYearScale) + "px " + this.onlyYearFontStyle;
        this.ctxDTP.fillText
        (
            this.tempYear, 
            contentLeft + nextPrevWidth + nextPrevWidth * this.onlyYearHorzAdj,
            contentTop + rowHeight - rowHeight * this.onlyYearVertAdj
        );
        this.ctxDTP.stroke();
       
        //Draw the previous graphic.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.prevNextColorn;
        this.ctxDTP.fillStyle   = this.prevNextColorn;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(contentLeft + this.prevNextXPad * nextPrevWidth, contentTop + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + nextPrevWidth - this.prevNextXPad * nextPrevWidth, contentTop + this.prevNextYPad * contentTop);
        this.ctxDTP.lineTo(contentLeft + nextPrevWidth - this.prevNextXPad * nextPrevWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();

        //Draw the next graphic.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.prevNextColorn;
        this.ctxDTP.fillStyle   = this.prevNextColorn;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(contentRight - this.prevNextXPad * nextPrevWidth, contentTop + .5 * rowHeight);
        this.ctxDTP.lineTo(contentRight - nextPrevWidth + this.prevNextXPad * nextPrevWidth, contentTop + this.prevNextYPad * contentTop);
        this.ctxDTP.lineTo(contentRight - nextPrevWidth + this.prevNextXPad * nextPrevWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();

        //Draw the clock
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.clockColorn;
        this.ctxDTP.lineWidth   = rowHeight * this.clockWeight;
        this.ctxDTP.arc
        (
            contentLeft + .5 * (contentWidth),
            contentTop + 8 * rowHeight + .5 * rowHeight,
            clockRadius,
            0,
            2 * Math.PI
        );
        this.ctxDTP.moveTo(contentLeft + .5 * contentWidth - .60 * clockRadius, contentTop + 8 * rowHeight + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight - .85 * clockRadius);
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
                //Indicate something can be picked.
                this.isPicked    = true;
                this.pickedType  = this.hitBounds[i].type;
                this.pickedMonth = i + 1; 

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

                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    case CanvDTP.SEL_MONTH:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (monthsHeight * this.yearScale) + "px " + this.yearFontStyle;
                        this.ctxDTP.fillStyle = this.yearh;
                        this.ctxDTP.fillText
                        (
                            this.shortMonthsArray[i], 
                            this.hitBounds[i].x1 + this.yearHorzAdj[i] * monthsWidth,
                            this.hitBounds[i].y2 - this.yearVertAdj * monthsHeight
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_PREVIOUS:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.strokeStyle = this.prevNextColorh;
                        this.ctxDTP.fillStyle   = this.prevNextColorh;
                        this.ctxDTP.lineWidth   = 1;
                        this.ctxDTP.moveTo(contentLeft + this.prevNextXPad * nextPrevWidth, contentTop + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentLeft + nextPrevWidth - this.prevNextXPad * nextPrevWidth,
                            contentTop + this.prevNextYPad * contentTop);
                        this.ctxDTP.lineTo(contentLeft + nextPrevWidth - this.prevNextXPad * nextPrevWidth,
                            contentTop + rowHeight - this.prevNextYPad * contentTop);
                        this.ctxDTP.fill();
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_NEXT:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.strokeStyle = this.prevNextColorh;
                        this.ctxDTP.fillStyle   = this.prevNextColorh;
                        this.ctxDTP.lineWidth   = 1;
                        this.ctxDTP.moveTo(contentRight - this.prevNextXPad * nextPrevWidth, contentTop + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentRight - nextPrevWidth + this.prevNextXPad * nextPrevWidth,
                            contentTop + this.prevNextYPad * contentTop);
                        this.ctxDTP.lineTo(contentRight - nextPrevWidth + this.prevNextXPad * nextPrevWidth,
                            contentTop + rowHeight - this.prevNextYPad * contentTop);
                        this.ctxDTP.fill();
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_VIEW:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.monthYearh;
                        this.ctxDTP.font = (rowHeight * this.monthYearScale) + "px " + this.monthYearFontStyle;
                        this.ctxDTP.fillText
                        (
                            this.tempYear, 
                            contentLeft + nextPrevWidth + nextPrevWidth * this.onlyYearHorzAdj,
                            contentTop + rowHeight - rowHeight * this.onlyYearVertAdj
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_TIME:
                    default:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.strokeStyle = this.clockColorh;
                        this.ctxDTP.lineWidth   = rowHeight * this.clockWeight;
                        this.ctxDTP.arc
                        (
                            contentLeft + .5 * (contentWidth),
                            contentTop + 8 * rowHeight + .5 * rowHeight,
                            clockRadius,
                            0,
                            2 * Math.PI
                        );
                        this.ctxDTP.moveTo(contentLeft + .5 * contentWidth - .60 * clockRadius, contentTop + 8 * rowHeight + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight);
                        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight - .85 * clockRadius);
                        this.ctxDTP.stroke();
                        break;
                }
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /**************************************** Draw Decade ****************************************/

    drawDecade()
    {
        let contentWidth  = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding;
        let contentHeight = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding;
        let contentLeft   = this.bodyCanWidth * this.bXPadding / 2;
        let contentRight  = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding / 2;
        let contentTop    = this.bodyCanWidth * this.bYPadding / 2;
        let contentBottom = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding / 2;
        let rowHeight     = contentHeight / 9;
        let nextPrevWidth = contentWidth  / 7;
        let monthsTop     = contentTop + rowHeight;
        let monthsBottom  = contentBottom - rowHeight;
        let monthsLeft    = contentLeft;
        let monthsRight   = contentRight;
        let monthsWidth   = contentWidth / 3;
        let monthsHeight  = (monthsBottom - monthsTop) / 4;
        let clockRadius   = rowHeight * .5 - this.clockPad * rowHeight;

        ///////////////////////////////////////////////////////////////////////////////////////////
        
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug)
        {
            this.ctxDTP.beginPath();
            this.ctxDTP.strokeStyle = "#000000";
            this.ctxDTP.lineWidth = 1;
            this.ctxDTP.rect(contentLeft, contentTop, contentWidth, contentHeight);
            this.ctxDTP.moveTo(monthsLeft, monthsTop);
            this.ctxDTP.lineTo(monthsRight, monthsTop);
            this.ctxDTP.moveTo(monthsLeft, monthsBottom);
            this.ctxDTP.lineTo(monthsRight, monthsBottom);
            for(let i = 1; i < 4; i++)
            {
                this.ctxDTP.moveTo(monthsLeft, monthsTop + i * monthsHeight);
                this.ctxDTP.lineTo(monthsRight, monthsTop + i * monthsHeight);
            }
            for(let i = 1; i < 3; i++)
            {
                this.ctxDTP.moveTo(monthsLeft + i * monthsWidth, monthsTop);
                this.ctxDTP.lineTo(monthsLeft + i * monthsWidth, monthsBottom);
            }
            this.ctxDTP.moveTo(contentLeft + nextPrevWidth, contentTop);
            this.ctxDTP.lineTo(contentLeft + nextPrevWidth, contentTop + rowHeight);
            this.ctxDTP.moveTo(contentRight - nextPrevWidth, contentTop);
            this.ctxDTP.lineTo(contentRight - nextPrevWidth, contentTop + rowHeight);
            this.ctxDTP.stroke();
        }
        
        ///////////////////////////////////////////////////////////////////////////////////////////

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        this.hitBounds = [];
        let x1, x2, y1, y2;

        //Hit boundaries for the months.
        for(let i = 0; i < 4; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                x1 = monthsLeft + j * monthsWidth;
                x2 = monthsLeft + (j + 1) * monthsWidth - 1;
                y1 = monthsTop + i * monthsHeight;
                y2 = monthsTop + (i + 1) * monthsHeight - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_YEAR});
            }
        }

        //Hit boundaries for previous.
        x1 = contentLeft;
        x2 = contentLeft + nextPrevWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_PREVIOUS});

        //Hit boundaries for next.
        x1 = contentLeft + 6 * nextPrevWidth;
        x2 = contentLeft + 7 * nextPrevWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_NEXT});

        //Hit boundaries for year.
        x1 = contentLeft + nextPrevWidth;
        x2 = contentLeft + 6 * nextPrevWidth - 1;
        y1 = contentTop;
        y2 = contentTop + rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_VIEW});

        //Hit boundaries for time.
        x1 = contentLeft;
        x2 = contentLeft + 7 * nextPrevWidth - 1;
        y1 = contentTop  + 8 * rowHeight;
        y2 = contentTop + 9 * rowHeight - 1;
        this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_TIME});









        //Draw the previous graphic.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.prevNextColorn;
        this.ctxDTP.fillStyle   = this.prevNextColorn;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(contentLeft + this.prevNextXPad * nextPrevWidth, contentTop + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + nextPrevWidth - this.prevNextXPad * nextPrevWidth, contentTop + this.prevNextYPad * contentTop);
        this.ctxDTP.lineTo(contentLeft + nextPrevWidth - this.prevNextXPad * nextPrevWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();

        //Draw the next graphic.
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.prevNextColorn;
        this.ctxDTP.fillStyle   = this.prevNextColorn;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(contentRight - this.prevNextXPad * nextPrevWidth, contentTop + .5 * rowHeight);
        this.ctxDTP.lineTo(contentRight - nextPrevWidth + this.prevNextXPad * nextPrevWidth, contentTop + this.prevNextYPad * contentTop);
        this.ctxDTP.lineTo(contentRight - nextPrevWidth + this.prevNextXPad * nextPrevWidth, contentTop + rowHeight - this.prevNextYPad * contentTop);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();

        //Draw the clock
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = this.clockColorn;
        this.ctxDTP.lineWidth   = rowHeight * this.clockWeight;
        this.ctxDTP.arc
        (
            contentLeft + .5 * (contentWidth),
            contentTop + 8 * rowHeight + .5 * rowHeight,
            clockRadius,
            0,
            2 * Math.PI
        );
        this.ctxDTP.moveTo(contentLeft + .5 * contentWidth - .60 * clockRadius, contentTop + 8 * rowHeight + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight);
        this.ctxDTP.lineTo(contentLeft + .5 * contentWidth, contentTop + 8 * rowHeight + .5 * rowHeight - .85 * clockRadius);
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
                //Indicate something can be picked.
                this.isPicked    = true;
                this.pickedType  = this.hitBounds[i].type;
                this.pickedMonth = i + 1; 

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
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /*************************************** Draw Century ****************************************/

    drawCentury()
    {
        this.ctxDTP.beginPath();
        this.ctxDTP.font = "20px Arial"
        this.ctxDTP.fillStyle = "#000000";
        this.ctxDTP.fillText("Century View", 20, 25);
        this.ctxDTP.stroke();
    }

    /***************************************** Draw Time *****************************************/
    
    drawTime()
    {
        this.ctxDTP.beginPath();
        this.ctxDTP.font = "20px Arial"
        this.ctxDTP.fillStyle = "#000000";
        this.ctxDTP.fillText("Time View", 20, 25);
        this.ctxDTP.stroke();
    }




















    
    /******************************** Body Canvas Click Functions ********************************/

    //Update the selected date.
    updateDate()
    {
        //Adjust the date if a day before the month is chosen.
        if(this.dayType === CanvDTP.DAY_PRE)
        {
            this.tempMonth--;
            if(this.tempMonth <= 0)
            {
                this.tempMonth = 12;
                this.tempYear--;
            }
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
        }

        this.month = this.tempMonth;
        this.year  = this.tempYear;
        this.day   = this.pickedDay;
        this.textBoxDateTime();
        this.drawBody();
    }

    //Increment the month and redraw the calendar.
    incrementMonth()
    {
        this.tempMonth++;

        if(this.tempMonth >= 13)
        {
            this.tempMonth = 1;
            this.tempYear++;
        }
        this.drawBody();
    }

    //Decrement the month and redraw the calendar.
    decrementMonth()
    {
        this.tempMonth--;

        if(this.tempMonth <= 0)
        {
            this.tempMonth = 12;
            this.tempYear--;
        }
        this.drawBody();
    }

    //Determine which action to perform when the body canvas is clicked.
    bodyClick()
    {
        if(this.isPicked)
        {
            switch(this.calView)
            {
                case CanvDTP.CAL_MONTH:
                    switch(this.pickedType)
                    {
                        case CanvDTP.SEL_DAY:
                            this.updateDate();
                            break;

                        case CanvDTP.SEL_PREVIOUS:
                            this.decrementMonth();
                            break;

                        case CanvDTP.SEL_NEXT:
                            this.incrementMonth();
                            break;

                        case CanvDTP.SEL_TIME:
                            this.dateTime = CanvDTP.CAL_TIME;
                            document.body.style.cursor = "default";
                            this.drawBody();
                            break;

                        case CanvDTP.SEL_VIEW:
                        default:
                            this.calView = CanvDTP.CAL_YEAR;
                            document.body.style.cursor = "default";
                            this.drawBody();
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
                            this.drawBody();
                            break;

                        case CanvDTP.SEL_PREVIOUS:
                            this.tempYear--;
                            this.drawBody();
                            break;

                        case CanvDTP.SEL_NEXT:
                            this.tempYear++;
                            this.drawBody();
                            break;

                        case CanvDTP.SEL_TIME:
                            this.dateTime = CanvDTP.CAL_TIME;
                            document.body.style.cursor = "default";
                            this.drawBody();
                            break;

                        case CanvDTP.SEL_VIEW:
                        default:
                            this.calView = CanvDTP.CAL_DECADE;
                            document.body.style.cursor = "default";
                            this.drawBody();
                            break;
                    }
                    break;

                case CanvDTP.CAL_DECADE:
                    switch(this.pickedType)
                    {
                        case CanvDTP.SEL_YEAR:
                            
                            break;

                        case CanvDTP.SEL_PREVIOUS:
                            
                            break;

                        case CanvDTP.SEL_NEXT:
                            
                            break;

                        case CanvDTP.SEL_TIME:
                            
                            break;

                        case CanvDTP.SEL_VIEW:
                        default:
                            this.calView = CanvDTP.CAL_CENTURY;
                            document.body.style.cursor = "default";
                            this.drawBody();
                            break;
                    }
                    break;

                case CanvDTP.CAL_CENTURY:
                default:
                    break;
            }
        }
    }
}