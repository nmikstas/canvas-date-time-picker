class CanvDTP
{
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

    //Day of month.
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
    static get SEL_YEAR()     {return 0x06}
    static get SEL_DECADE()   {return 0x07}
    static get SEL_CENTURY()  {return 0x08}
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
        this.HeaderColor     = "#0087b6";
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
            0,
            .30, .30, .30, .30, .30, .30, .30, .30, .30, .10,
            .15, .10, .10, .10, .10, .10, .12, .12, .10, .15,
            .15, .15, .15, .15, .15, .15, .15, .15, .15, .15,
            .18
        ];

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

        //Parameters of the selectable items.
        this.selectRadius = .25;
        this.selectWeight = .07;

        this.selectBorderColor = "#0087b6";
        this.selectFillColor   = "#a4e3f7";

        //Non selected items.

        //Selected items.

        //Hovered items.









        //Variables for keeping track of date and time.
        this.isPicked      = false;
        this.isAM          = true;
        this.isLeapYear    = false;
        this.month         = 1;
        this.day           = 1;
        this.year          = 2000;
        this.hour          = 12;
        this.minute        = 0;
        this.dayOfWeek     = 6;
        this.dayMonthStart = 6;
        this.calView       = CanvDTP.CAL_MONTH;
        this.dateTime      = CanvDTP.CAL_DATE;

        this.tempMonth   = 1;
        this.tempYear    = 2000;
        this.tempDecade  = 2000;
        this.tempCentury = 2000;

        this.dayArray       = new Array(42);
        this.monthDaysArray = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];





        
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

        this.iconCanvas.style.cursor = "pointer";

        this.resize();
    }

    //This function is called only once on the first pick after a page load.
    firstPick()
    {
        this.isPicked = true;
        
        //Get the current date and break it down.
        let date           = new Date();
        this.month         = date.getMonth() + 1;
        this.day           = date.getDate();
        this.year          = date.getFullYear();
        this.dayOfWeek     = date.getDay();
        this.isLeapYear    = this.leapCalc(this.year);
        this.minute        = date.getMinutes();
        this.hour          = date.getHours();

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
        for(i; i < this.monthDaysArray[this.tempMonth]; i++)
        {
            this.dayArray[i + dayMonthStart] = { day: i + 1, type: CanvDTP.DAY_THIS };
        }

        //Special case for February on leap years.
        if(this.tempMonth === CanvDTP.FEBRUARY && this.leapCalc(this.tempYear))
        {
            console.log("here")
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
                preDays = this.monthDaysArray[12];
            }
            else
            {
                preDays = this.monthDaysArray[this.tempMonth - 1];
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

    iconClick()
    {
        //Set the animation to expanding or collapsing.
        this.bodyCanAnim = (this.bodyCanAnim === CanvDTP.BODY_CLOSED ||
            this.bodyCanAnim === CanvDTP.BODY_COLLAPSING) ?
            CanvDTP.BODY_EXPANDING : CanvDTP.BODY_COLLAPSING;

        //Check if date/time has been picked already.
        if(!this.isPicked) this.firstPick();

        this.bodyAnimTimer = setInterval(() => this.bodyAnimate(), this.animTime);
    }

    //Expand/collapse the calendar canvas.
    bodyAnimate()
    {
        switch(this.bodyCanAnim)
        {
            case CanvDTP.BODY_CLOSED:
                this.bodyCanWidth = 0;
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

        //Calculate the pointer radius and line width;
        let pointerRadius = this.bodyCanWidth * this.bPointerRad;
        let pointerWidth  = this.bodyCanWidth * this.bPointerWidth;

        //Draw a mouse indicator. May remove later after project is complete.
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

    drawTime()
    {

    }

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
        
        ///////////////////////////////////////////////////////////////////////////////////////////
        //Draw out the boundaries between elements. It will be erased later.
        /*
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
        this.ctxDTP.stroke();
        */
        ///////////////////////////////////////////////////////////////////////////////////////////

        //Draw the days of the week header.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.HeaderColor;
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


        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        let hitBounds = [];

        //Hit boundaries for the days.
        for(let i = 2; i < 8; i++)
        {
            for(let j = 0; j < 7; j++)
            {
                let x1 = contentLeft + j * dayWidth;
                let x2 = contentLeft + (j + 1) * dayWidth - 1;
                let y1 = contentTop + i * rowHeight;
                let y2 = contentTop + (i + 1) * rowHeight - 1;
                hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_DAY});
            }
        }

        //Draw the day numbers.
        this.ctxDTP.beginPath();
        this.ctxDTP.font = (rowHeight * this.dayScale) + "px " + this.dayFontStyle;
        for(let i = 0; i < hitBounds.length; i++)
        {
            if(this.dayArray[i].type === CanvDTP.DAY_THIS)
            {
                this.ctxDTP.fillStyle = this.dayColorn;
            }
            else
            {
                this.ctxDTP.fillStyle = this.nonDayColorn;
            }
            
            this.ctxDTP.fillText
            (
                this.dayArray[i].day,
                hitBounds[i].x1 + dayWidth * this.dayHorzAdj[this.dayArray[i].day],
                hitBounds[i].y2 - rowHeight * this.dayVertAdj
            );
        }
        this.ctxDTP.stroke();









        //Highlight the section being touched by the mouse cursor.
        for(let i = 0; i < hitBounds.length; i++)
        {
            if(this.bodyX >= hitBounds[i].x1 && this.bodyX <= hitBounds[i].x2 && this.bodyY >= hitBounds[i].y1 && this.bodyY <= hitBounds[i].y2)
            {
                //Calculate border thickness and radius based on height.
                let selectBorder = (hitBounds[i].y2 - hitBounds[i].y1) * this.selectWeight;
                let selectRadius = (hitBounds[i].y2 - hitBounds[i].y1) * this.selectRadius;

                //Draw the border and fill the space.
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = this.selectBorderColor;
                this.ctxDTP.fillStyle   = this.selectFillColor;
                this.ctxDTP.lineWidth   = selectBorder;
                this.ctxDTP.arc(hitBounds[i].x1 + selectRadius,  hitBounds[i].y1 + selectRadius, selectRadius, -Math.PI, -Math.PI / 2);
                this.ctxDTP.arc(hitBounds[i].x2 - selectRadius,  hitBounds[i].y1 + selectRadius, selectRadius, -Math.PI / 2, 0);
                this.ctxDTP.arc(hitBounds[i].x2 - selectRadius,  hitBounds[i].y2 - selectRadius, selectRadius, 0, Math.PI / 2);
                this.ctxDTP.arc(hitBounds[i].x1 + selectRadius,  hitBounds[i].y2 - selectRadius, selectRadius, Math.PI / 2, Math.PI);
                this.ctxDTP.lineTo(hitBounds[i].x1,  hitBounds[i].y1 + selectRadius);
                this.ctxDTP.fill();
                this.ctxDTP.stroke();
                
                //Draw the highlighted text.
                switch(hitBounds[i].type)
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
                                hitBounds[i].x1 + dayWidth * this.dayHorzAdj[this.dayArray[i].day],
                                hitBounds[i].y2 - rowHeight * this.dayVertAdj
                            );
                        
                        this.ctxDTP.stroke();
                        break;






                    
                    default:
                        break;
                }
            }
        }
    }

    drawYear()
    {

    }

    drawDecade()
    {

    }

    drawCentury()
    {

    }
}