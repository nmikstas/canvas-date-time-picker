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
    static get SEL_MINC1()    {return 0x09}
    static get SEL_MINC10()   {return 0x0A}
    static get SEL_MDEC1()    {return 0x0B}
    static get SEL_MDEC10()   {return 0x0C}
    static get SEL_HINC1()    {return 0x0D}
    static get SEL_HDEC1()    {return 0x0E}
    static get SEL_AMPM()     {return 0x0F}

    //Displayed days of month types.
    static get DAY_THIS() {return 0x00}
    static get DAY_PRE()  {return 0x01}
    static get DAY_POST() {return 0x02}

    //Debug grid types.
    static get GRID_MONTH()   {return 0x00}
    static get GRID_GENERAL() {return 0x01}
    static get GRID_TIME()    {return 0x02}

    //Time increment types.
    static get INC_1()  {return 0x00}
    static get DEC_1()  {return 0x01}
    static get INC_10() {return 0x02}
    static get DEC_10() {return 0x03}

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                        Constructor                                        //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    constructor
    (
        parentDiv,
        {
            //Enable/disable debug.
            debug = false,

            //Icon canvas prameters.
            iBorderRadius = .20,
            iBorderWeight = .05,
            iXPadding     = .20,
            iYPadding     = .20,
            iLineWidth    = .02,
            iBorderColorn = "#a0a0a0",
            iFillColorn   = "#d0d0d0",
            iCalColorn    = "#000000",
            iBorderColorh = "#202020",
            iFillColorh   = "#808080",
            iCalColorh    = "#ffffff",

            //Selectable Items
            selectRadius = .25,
            selectWeight = .07,
            selectBorderColor = "#0087b6",
            selectFillColor   = "#a4e3f7",

            //Mouse Pointer
            PointerWidth = .005,
            PointerRad   = .01,
            PointerColor = "#000000",

            //Days of Week
            days            = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            headerHorzAdj   = [.12, .08, .15, .05, .15, .20, .12],
            headerVertAdj   = .20,
            headerScale     = .80,
            headerColor     = "#0087b6",
            headerFontStyle = "Arial",

            //Days of Month
            nonDayColorn = "#888888",
            dayColorn    = "#000000",
            nonDayColorh = "#ff8888",
            dayColorh    = "#8800ff",
            dayScale     = .80,
            dayFontStyle = "Arial",
            dayVertAdj   = .20,
            dayHorzAdj   = 
            [
                .30, .30, .30, .30, .30, .30, .30, .30, .30, .10,
                .15, .10, .10, .10, .10, .10, .12, .12, .10, .15,
                .15, .15, .15, .15, .15, .15, .15, .15, .15, .15,
                .18
            ],

            //Month and Year
            monthYearn         = "#000000",
            monthYearh         = "#8800ff",
            monthYearScale     = .80,
            monthYearFontStyle = "Arial",
            monthYearVertAdj   = .20,
            monthYearHorzAdj   = [.60, .50, .90, 1.15, 1.15, 1.05, 1.15, .75, .20, .60, .30, .30],

            //Previous/Next Parameters
            prevNextColorn = "#000000",
            prevNextColorh = "#8800ff",
            prevNextXPad   = .20,
            prevNextYPad   = .35,
        
            //Clock Graphic Parameters
            clockColorn = "#000000",
            clockColorh = "#8800ff",
            clockPad    = .10,
            clockWeight = .07,

            //Currently Selected Day
            currentRadius      = .25,
            currentWeight      = .07,
            currentBorderColor = "#00f7ff",
            currentFillColor   = "#aefcff",

            //Today's Date
            nowWeight = .25,
            nowColor  = "#000000",

            //Month Text
            monthn         = "#000000",
            monthh         = "#8800ff",
            monthScale     = .60,
            monthFontStyle = "Arial",
            monthVertAdj   = .25,
            monthHorzAdj   = [.20, .20, .20, .20, .15, .20, .22, .18, .17, .20, .17, .17],

            //Year
            bannerYearn         = "#000000",
            bannerYearh         = "#8800ff",
            bannerYearScale     = .80,
            bannerYearFontStyle = "Arial",
            bannerYearVertAdj   = .20,
            bannerYearHorzAdj   = 1.80,

            //Year Text
            nonYearn      = "#888888",
            yearn         = "#000000",
            nonYearh      = "#ff8888",
            yearh         = "#8800ff",
            yearScale     = .60,
            yearFontStyle = "Arial",
            yearVertAdj   = .25,
            yearHorzAdj   = .10,

            //Decade
            bannerDecaden         = "#000000",
            bannerDecadeh         = "#8800ff",
            bannerDecadeScale     = .80,
            bannerDecadeFontStyle = "Arial",
            bannerDecadeVertAdj   = .20,
            bannerDecadeHorzAdj   = 1.0,

            //Decade Text
            nonDecaden      = "#888888",
            decaden         = "#000000",
            nonDecadeh      = "#ff8888",
            decadeh         = "#8800ff",
            decadeScale     = .50,
            decadeFontStyle = "Arial",
            decadeVertAdj1  = .55,
            decadeVertAdj2  = .08,
            decadeHorzAdj   = .20,

            //Century
            bannerCenturyn         = "#000000",
            bannerCenturyh         = "#8800ff",
            bannerCenturyScale     = .80,
            bannerCenturyFontStyle = "Arial",
            bannerCenturyVertAdj   = .20,
            bannerCenturyHorzAdj   = 1.0,

            //Calendar Icon
            calXPadding  = .20,
            calYPadding  = .10,
            calLineWidth = .05,
            calCalColorn = "#000000",
            calCalColorh = "#8800ff",

            //Time Parameters
            timeVertAdj     = .20,
            timeDivVertAdj  = .25,
            timeDivHorzAdj  = .15,
            timehourHorzAdj = [.30, .30, .30, .30, .30, .30, .30, .30, .30, .07, .10, .07],
            timeMinHorzAdj  = .10,
            timeFont        = "Arial",
            timeColorn      = "#000000",
            timeColorh      = "#8800ff",
            timeWeight      = .80,
            timeAmPmFont    = "Arial",
            timeAmPmColorn  = "#000000",
            timeAmPmColorh  = "#8800ff",
            timeAmPmWeight  = .60,
            timeAmPmVertAdj = .27,
            timeAmPmHorzAdj = .10,

            //Increment/Decrement Parameters
            incXPad    = .25,
            incYPad    = .10,
            incWeight  = .25,
            incColorn  = "#000000",
            incColorh  = "#8800ff",

            //Parameters of the body canvas.
            bBorderRadius = .05,
            bBorderWeight = .01,
            bXPadding     = .10,
            bYPadding     = .10,
            bLineWidth    = .02,
            bBorderColor  = "#a4e3f7",
            bFillColor    = "#e5f5fa"
        } = {}
    )
    {
        this.debug                  = debug;
        this.iBorderRadius          = iBorderRadius;
        this.iBorderWeight          = iBorderWeight;
        this.iXPadding              = iXPadding;
        this.iYPadding              = iYPadding;
        this.iLineWidth             = iLineWidth;
        this.iBorderColorn          = iBorderColorn;
        this.iFillColorn            = iFillColorn;
        this.iCalColorn             = iCalColorn;
        this.iBorderColorh          = iBorderColorh;
        this.iFillColorh            = iFillColorh;
        this.iCalColorh             = iCalColorh;
        this.selectRadius           = selectRadius;
        this.selectWeight           = selectWeight;
        this.selectBorderColor      = selectBorderColor;
        this.selectFillColor        = selectFillColor;
        this.PointerWidth           = PointerWidth;
        this.PointerRad             = PointerRad;
        this.PointerColor           = PointerColor;
        this.days                   = days;
        this.headerHorzAdj          = headerHorzAdj;
        this.headerVertAdj          = headerVertAdj;
        this.headerScale            = headerScale;
        this.headerColor            = headerColor;
        this.headerFontStyle        = headerFontStyle;
        this.nonDayColorn           = nonDayColorn;
        this.dayColorn              = dayColorn;
        this.nonDayColorh           = nonDayColorh;
        this.dayColorh              = dayColorh;
        this.dayScale               = dayScale;
        this.dayFontStyle           = dayFontStyle;
        this.dayVertAdj             = dayVertAdj;
        this.dayHorzAdj             = dayHorzAdj;
        this.monthYearn             = monthYearn;
        this.monthYearh             = monthYearh;
        this.monthYearScale         = monthYearScale;
        this.monthYearFontStyle     = monthYearFontStyle;
        this.monthYearVertAdj       = monthYearVertAdj;
        this.monthYearHorzAdj       = monthYearHorzAdj;
        this.prevNextColorn         = prevNextColorn;
        this.prevNextColorh         = prevNextColorh;
        this.prevNextXPad           = prevNextXPad;
        this.prevNextYPad           = prevNextYPad;
        this.clockColorn            = clockColorn;
        this.clockColorh            = clockColorh;
        this.clockPad               = clockPad;
        this.clockWeight            = clockWeight;
        this.currentRadius          = currentRadius;
        this.currentWeight          = currentWeight;
        this.currentBorderColor     = currentBorderColor;
        this.currentFillColor       = currentFillColor;
        this.nowWeight              = nowWeight;
        this.nowColor               = nowColor;
        this.monthn                 = monthn;
        this.monthh                 = monthh;
        this.monthScale             = monthScale;
        this.monthFontStyle         = monthFontStyle;
        this.monthVertAdj           = monthVertAdj;
        this.monthHorzAdj           = monthHorzAdj;
        this.bannerYearn            = bannerYearn;
        this.bannerYearh            = bannerYearh;
        this.bannerYearScale        = bannerYearScale;
        this.bannerYearFontStyle    = bannerYearFontStyle;
        this.bannerYearVertAdj      = bannerYearVertAdj;
        this.bannerYearHorzAdj      = bannerYearHorzAdj;
        this.nonYearn               = nonYearn;
        this.yearn                  = yearn;
        this.nonYearh               = nonYearh;
        this.yearh                  = yearh;
        this.yearScale              = yearScale;
        this.yearFontStyle          = yearFontStyle;
        this.yearVertAdj            = yearVertAdj;
        this.yearHorzAdj            = yearHorzAdj;
        this.bannerDecaden          = bannerDecaden;
        this.bannerDecadeh          = bannerDecadeh;
        this.bannerDecadeScale      = bannerDecadeScale;
        this.bannerDecadeFontStyle  = bannerDecadeFontStyle;
        this.bannerDecadeVertAdj    = bannerDecadeVertAdj;
        this.bannerDecadeHorzAdj    = bannerDecadeHorzAdj;
        this.nonDecaden             = nonDecaden;
        this.decaden                = decaden;
        this.nonDecadeh             = nonDecadeh;
        this.decadeh                = decadeh;
        this.decadeScale            = decadeScale;
        this.decadeFontStyle        = decadeFontStyle;
        this.decadeVertAdj1         = decadeVertAdj1;
        this.decadeVertAdj2         = decadeVertAdj2;
        this.decadeHorzAdj          = decadeHorzAdj;
        this.bannerCenturyn         = bannerCenturyn;
        this.bannerCenturyh         = bannerCenturyh;
        this.bannerCenturyScale     = bannerCenturyScale;
        this.bannerCenturyFontStyle = bannerCenturyFontStyle;
        this.bannerCenturyVertAdj   = bannerCenturyVertAdj;
        this.bannerCenturyHorzAdj   = bannerCenturyHorzAdj;
        this.calXPadding            = calXPadding;
        this.calYPadding            = calYPadding;
        this.calLineWidth           = calLineWidth;
        this.calCalColorn           = calCalColorn;
        this.calCalColorh           = calCalColorh;
        this.timeVertAdj            = timeVertAdj;
        this.timeDivVertAdj         = timeDivVertAdj;
        this.timeDivHorzAdj         = timeDivHorzAdj;
        this.timehourHorzAdj        = timehourHorzAdj;
        this.timeMinHorzAdj         = timeMinHorzAdj;
        this.timeFont               = timeFont;
        this.timeColorn             = timeColorn;
        this.timeColorh             = timeColorh;
        this.timeWeight             = timeWeight;
        this.timeAmPmFont           = timeAmPmFont;
        this.timeAmPmColorn         = timeAmPmColorn;
        this.timeAmPmColorh         = timeAmPmColorh;
        this.timeAmPmWeight         = timeAmPmWeight;
        this.timeAmPmVertAdj        = timeAmPmVertAdj;
        this.timeAmPmHorzAdj        = timeAmPmHorzAdj;
        this.incXPad                = incXPad;
        this.incYPad                = incYPad;
        this.incWeight              = incWeight;
        this.incColorn              = incColorn;
        this.incColorh              = incColorh;
        this.bBorderRadius          = bBorderRadius;
        this.bBorderWeight          = bBorderWeight;
        this.bXPadding              = bXPadding;
        this.bYPadding              = bYPadding;
        this.bLineWidth             = bLineWidth;
        this.bBorderColor           = bBorderColor;
        this.bFillColor             = bFillColor;

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

        /************************************ Misc Variables *************************************/

        //HTML nodes required for date/time picker.
        this.parentDiv = parentDiv;
        this.paddingDiv;
        this.dtpText;
        this.bodyCanvas;
        this.iconCanvas;

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
        this.isPicked     = false;
        this.calView      = CanvDTP.CAL_MONTH;
        this.dateTime     = CanvDTP.CAL_DATE;
        this.pickedType   = null;
        this.pickedMonth  = 0;
        this.pickedYear   = 0;
        this.pickedDecade = 0;

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

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                      Class Functions                                      //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**************************************** Initialize *****************************************/

    intit()
    {
        //Create the components necessary for the date/time picker.
        this.paddingDiv = document.createElement("div");
        this.dtpText = document.createElement("input");
        this.bodyCanvas = document.createElement("canvas");
        this.iconCanvas = document.createElement("canvas");

        //Add an id to the text box.
        this.dtpText.setAttribute("id", this.parentDiv.id + "-tb");

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

        //Setup default cursor for icon canvas.
        this.iconCanvas.style.cursor = "pointer";

        //Add resize and click listeners to the window.
        window.addEventListener("resize", () => this.resize());
        window.addEventListener("click", (event) => this.windowClick(event));

        //Add icon event listeners.
        this.iconCanvas.addEventListener("mouseenter", () => this.iconEnter());
        this.iconCanvas.addEventListener("mouseleave", () => this.iconExit());
        this.iconCanvas.addEventListener("click", () => this.iconClick());

        //Add body event listeners.
        this.bodyCanvas.addEventListener('mousemove',  () => this.bodyCoords());
        this.bodyCanvas.addEventListener('mouseleave', () => this.bodyExit());
        this.bodyCanvas.addEventListener("click", () => this.bodyClick());
        
        this.resize();
    }

    /************************************* Window Listeners **************************************/

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
        this.iconDraw();
        this.bodyDraw();
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
        this.bodyCanAnim = (this.bodyCanAnim === CanvDTP.BODY_CLOSED ||
            this.bodyCanAnim === CanvDTP.BODY_COLLAPSING) ?
            CanvDTP.BODY_EXPANDING : CanvDTP.BODY_COLLAPSING;

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
        this.isFirstPicked = true;

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
        switch(gridType)
        {
            case CanvDTP.GRID_MONTH:
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = "#000000";
                this.ctxDTP.lineWidth = 1;
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
                this.ctxDTP.stroke();
                break;

            case CanvDTP.GRID_TIME:
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = "#000000";
                this.ctxDTP.lineWidth = 1;
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
                this.ctxDTP.stroke();
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
                this.ctxDTP.stroke();
                break;
        }
    }

    /******************************** Graphical Helper Functions *********************************/

    //Draw the previous button.
    drawPrevious(color)
    {
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = color;
        this.ctxDTP.fillStyle   = color;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(this.contentLeft + this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + .5 * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentLeft + this.smallBoxWidth - this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.prevNextYPad * this.contentTop);
        this.ctxDTP.lineTo(this.contentLeft + this.smallBoxWidth - this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.smallBoxHeight - this.prevNextYPad * this.contentTop);
        this.ctxDTP.fill();
        this.ctxDTP.stroke();
    }

    //Draw the next button.
    drawNext(color)
    {
        this.ctxDTP.beginPath();
        this.ctxDTP.strokeStyle = color;
        this.ctxDTP.fillStyle   = color;
        this.ctxDTP.lineWidth   = 1;
        this.ctxDTP.moveTo(this.contentRight - this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + .5 * this.smallBoxHeight);
        this.ctxDTP.lineTo(this.contentRight - this.smallBoxWidth + this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.prevNextYPad * this.contentTop);
        this.ctxDTP.lineTo(this.contentRight - this.smallBoxWidth + this.prevNextXPad * this.smallBoxWidth,
            this.contentTop + this.smallBoxHeight - this.prevNextYPad * this.contentTop);
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
        let xPad = this.incXPad * (x2 - x1);
        let yPad = this.incYPad * (y2 - y1);
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
        catch
        {
            //Do nothing. Just catch exception.
        }
    }

    /*********************************** Body Canvas Functions ***********************************/

    //Calculate the canvas dimensions.
    bodyDimCalc()
    {
        this.contentWidth   = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding;
        this.contentHeight  = this.bodyCanWidth - this.bodyCanWidth * this.bYPadding;
        this.contentLeft    = this.bodyCanWidth * this.bXPadding / 2;
        this.contentRight   = this.bodyCanWidth - this.bodyCanWidth * this.bXPadding / 2;;
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

    bodyDraw()
    {
        //Exit if the canvas does not meet minimum size dimensions.
        if(this.bodyCanWidth <= 5) return;

        //Calculate the body canvas item dimensions.
        this.bodyDimCalc();

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

        //If in debug mode, draw a pointer on the body canvas.
        if(this.debug) this.pointerDraw();
        
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
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_MONTH);

        //Create an array of hit boundaries for the various buttons.
        //Each element has 4 points representing the upper left and lower right corners.
        this.hitBounds = [];
        let x1, x2, y1, y2;

        //Hit boundaries for the days.
        for(let i = 2; i < 8; i++)
        {
            for(let j = 0; j < 7; j++)
            {
                x1 = this.contentLeft + j * this.smallBoxWidth;
                x2 = this.contentLeft + (j + 1) * this.smallBoxWidth - 1;
                y1 = this.contentTop + i * this.smallBoxHeight;
                y2 = this.contentTop + (i + 1) * this.smallBoxHeight - 1;
                this.hitBounds.push({x1: x1, y1: y1, x2: x2, y2: y2, type: CanvDTP.SEL_DAY});
            }
        }

        //Do remaining hit boundaries.
        this.doCommonHitBounds(false, true, null);

        //Draw the day numbers.
        this.ctxDTP.beginPath();
        this.ctxDTP.font = (this.smallBoxHeight * this.dayScale) + "px " + this.dayFontStyle;
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
            if(isToday)
            {
                //Draw the border and fill the space.   
                this.ctxDTP.beginPath();
                this.ctxDTP.strokeStyle = this.nowColor;
                this.ctxDTP.fillStyle   = this.nowColor;
                this.ctxDTP.lineWidth   = 1;
                this.ctxDTP.moveTo(this.hitBounds[i].x1, this.hitBounds[i].y1);
                this.ctxDTP.lineTo(this.hitBounds[i].x1 + this.nowWeight * this.smallBoxWidth, this.hitBounds[i].y1);
                this.ctxDTP.lineTo(this.hitBounds[i].x1, this.hitBounds[i].y1 + this.nowWeight * this.smallBoxWidth);
                this.ctxDTP.moveTo(this.hitBounds[i].x2, this.hitBounds[i].y2);
                this.ctxDTP.lineTo(this.hitBounds[i].x2 - this.nowWeight * this.smallBoxWidth, this.hitBounds[i].y2);
                this.ctxDTP.lineTo(this.hitBounds[i].x2, this.hitBounds[i].y2 - this.nowWeight * this.smallBoxWidth);
                this.ctxDTP.fill();
                this.ctxDTP.stroke();
            }

            this.dayArray[i].type === CanvDTP.DAY_THIS ? 
                this.ctxDTP.fillStyle = this.dayColorn :
                this.ctxDTP.fillStyle = this.nonDayColorn;
            
            this.ctxDTP.fillText
            (
                this.dayArray[i].day,
                this.hitBounds[i].x1 + this.smallBoxWidth * this.dayHorzAdj[this.dayArray[i].day - 1],
                this.hitBounds[i].y2 - this.smallBoxHeight * this.dayVertAdj
            );
        }
        this.ctxDTP.stroke();

        //Draw the days of the week header.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.headerColor;
        this.ctxDTP.font = (this.smallBoxHeight * this.headerScale) + "px " + this.headerFontStyle;
        for(let i = 0; i < 7; i++)
        {
            this.ctxDTP.fillText
            (
                this.days[i],
                this.contentLeft + i * this.smallBoxWidth + this.smallBoxWidth * this.headerHorzAdj[i],
                this.contentTop + 2 * this.smallBoxHeight - this.smallBoxHeight * this.headerVertAdj
            );
        }
        this.ctxDTP.stroke();

        //Draw the date and year.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.monthYearn;
        this.ctxDTP.font = (this.smallBoxHeight * this.monthYearScale) + "px " + this.monthYearFontStyle;
        this.ctxDTP.fillText
        (
            this.MonthsArray[this.tempMonth - 1] + " " + this.tempYear, 
            this.contentLeft + this.smallBoxWidth + this.smallBoxWidth * this.monthYearHorzAdj[this.tempMonth - 1],
            this.contentTop + this.smallBoxHeight - this.smallBoxHeight * this.monthYearVertAdj
        );
        this.ctxDTP.stroke();
        
        this.drawPrevious(this.prevNextColorn); //Draw the previous button.
        this.drawNext(this.prevNextColorn);     //Draw the next button.
        this.drawClock(this.clockColorn);       //Draw the clock button.

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
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    //Draw the day numbers.
                    case CanvDTP.SEL_DAY:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.smallBoxHeight * this.dayScale) + "px " + this.dayFontStyle;
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
                            this.hitBounds[i].x1 + this.smallBoxWidth * this.dayHorzAdj[this.dayArray[i].day - 1],
                            this.hitBounds[i].y2 - this.smallBoxHeight * this.dayVertAdj
                        );
                        
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the month and year.
                    case CanvDTP.SEL_VIEW:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.monthYearh;
                        this.ctxDTP.font = (this.smallBoxHeight * this.monthYearScale) + "px " + this.monthYearFontStyle;
                        this.ctxDTP.fillText
                        (
                            this.MonthsArray[this.tempMonth - 1] + " " + this.tempYear, 
                            this.contentLeft + this.smallBoxWidth + this.smallBoxWidth * this.monthYearHorzAdj[this.tempMonth - 1],
                            this.contentTop + this.smallBoxHeight - this.smallBoxHeight * this.monthYearVertAdj
                        );
                        this.ctxDTP.stroke();
                        break;

                    //Highlight the previous button.
                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.prevNextColorh);
                        break;

                    //Highlight the next button.
                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.prevNextColorh);
                        break;

                    //Highlight the clock graphic.
                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.clockColorh);
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
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_GENERAL);

        //Do hit bounds for previous, next, time and the banner.
        this.hitBounds = [];
        this.doCommonHitBounds(true, true, CanvDTP.SEL_MONTH);

        //Draw the months.
        for(let i = 0; i < 12; i++)
        {
            //Highlight the current selected month.
            if(this.tempYear === this.year && this.month === i + 1) this.fillCurrent(i);

            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.bigBoxHeight * this.monthScale) + "px " + this.monthFontStyle;
            this.ctxDTP.fillStyle = this.monthn;
            this.ctxDTP.fillText
            (
                this.shortMonthsArray[i], 
                this.hitBounds[i].x1 + this.monthHorzAdj[i] * this.bigBoxWidth,
                this.hitBounds[i].y2 - this.monthVertAdj * this.bigBoxHeight
            );
            this.ctxDTP.stroke();
        }
        
        //Draw the year
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.bannerYearn;
        this.ctxDTP.font = (this.smallBoxHeight * this.bannerYearScale) + "px " + this.bannerYearFontStyle;
        this.ctxDTP.fillText
        (
            this.tempYear, 
            this.contentLeft + this.smallBoxWidth + this.smallBoxWidth * this.bannerYearHorzAdj,
            this.contentTop + this.smallBoxHeight - this.smallBoxHeight * this.bannerYearVertAdj
        );
        this.ctxDTP.stroke();
       
        this.drawPrevious(this.prevNextColorn); //Draw the previous button.
        this.drawNext(this.prevNextColorn);     //Draw the next button.
        this.drawClock(this.clockColorn);       //Draw the clock button.

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
                
                //Get additional info for days of month.
                this.pickedMonth = i + 1; 
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    case CanvDTP.SEL_MONTH:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.bigBoxHeight * this.monthScale) + "px " + this.monthFontStyle;
                        this.ctxDTP.fillStyle = this.monthh;
                        this.ctxDTP.fillText
                        (
                            this.shortMonthsArray[i], 
                            this.hitBounds[i].x1 + this.monthHorzAdj[i] * this.bigBoxWidth,
                            this.hitBounds[i].y2 - this.monthVertAdj * this.bigBoxHeight
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_VIEW:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.bannerYearh;
                        this.ctxDTP.font = (this.smallBoxHeight * this.monthYearScale) + "px " + this.monthYearFontStyle;
                        this.ctxDTP.fillText
                        (
                            this.tempYear, 
                            this.contentLeft + this.smallBoxWidth + this.smallBoxWidth * this.bannerYearHorzAdj,
                            this.contentTop + this.smallBoxHeight - this.smallBoxHeight * this.bannerYearVertAdj
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.prevNextColorh);
                        break;

                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.prevNextColorh);
                        break;

                    //Highlight the clock graphic.
                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.clockColorh);
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
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_GENERAL);
        
        //Do hit bounds for previous, next, time and the banner.
        this.hitBounds = [];
        this.doCommonHitBounds(true, true, CanvDTP.SEL_YEAR);

        let yearBase = parseInt(this.tempYear / 10) * 10 - 1;

        //Draw the years.
        for(let i = 0; i < 12; i++)
        {
            //Highlight the current selected year.
            if(yearBase + i === this.year) this.fillCurrent(i);
            
            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.bigBoxHeight * this.yearScale) + "px " + this.yearFontStyle;
            this.ctxDTP.fillStyle = (!i || i === 11) ? this.nonYearn : this.ctxDTP.fillStyle = this.yearn;
            this.ctxDTP.fillText
            (
                yearBase + i, 
                this.hitBounds[i].x1 + this.yearHorzAdj * this.bigBoxWidth,
                this.hitBounds[i].y2 - this.yearVertAdj * this.bigBoxHeight
                
            );
            this.ctxDTP.stroke();          
        }
        
        //Draw the decade.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.bannerDecaden;
        this.ctxDTP.font = (this.smallBoxHeight * this.bannerDecadeScale) + "px " + this.bannerDecadeFontStyle;
        this.ctxDTP.fillText
        (
            (yearBase + 1) + "-" + (yearBase + 10),
            this.contentLeft + this.smallBoxWidth + this.smallBoxWidth * this.bannerDecadeHorzAdj,
            this.contentTop + this.smallBoxHeight - this.smallBoxHeight * this.bannerDecadeVertAdj
        );
        this.ctxDTP.stroke();

        this.drawPrevious(this.prevNextColorn); //Draw the previous button.
        this.drawNext(this.prevNextColorn);     //Draw the next button.
        this.drawClock(this.clockColorn);       //Draw the clock button.

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

                //Get additional info for days of month.
                this.pickedYear = yearBase + i; 
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    case CanvDTP.SEL_YEAR:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.bigBoxHeight * this.monthScale) + "px " + this.yearFontStyle;
                        this.ctxDTP.fillStyle = (!i || i === 11) ? this.nonYearh : this.ctxDTP.fillStyle = this.yearh;
                        this.ctxDTP.fillText
                        (
                            yearBase + i, 
                            this.hitBounds[i].x1 + this.yearHorzAdj * this.bigBoxWidth,
                            this.hitBounds[i].y2 - this.yearVertAdj * this.bigBoxHeight
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_VIEW:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.fillStyle = this.bannerDecadeh;
                        this.ctxDTP.font = (this.smallBoxHeight * this.bannerDecadeScale) + "px " + this.bannerDecadeFontStyle;
                        this.ctxDTP.fillText
                        (
                            (yearBase + 1) + "-" + (yearBase + 10),
                            this.contentLeft + this.smallBoxWidth + this.smallBoxWidth * this.bannerDecadeHorzAdj,
                            this.contentTop + this.smallBoxHeight - this.smallBoxHeight * this.bannerDecadeVertAdj
                        );
                        this.ctxDTP.stroke();
                        break;

                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.prevNextColorh);
                        break;

                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.prevNextColorh);
                        break;

                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.clockColorh);
                        break;
                }
            }
        }

        //Change pointer if hovering over selectable item.
        this.isPicked ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default";
    }

    /*************************************** Draw Century ****************************************/

    drawCentury()
    {
        //Draw a grid on the canvas. For debugging purposes.
        if(this.debug) this.gridDraw(CanvDTP.GRID_GENERAL);
        
        //Do hit bounds for previous, next, time and the banner.
        this.hitBounds = [];
        this.doCommonHitBounds(true, false, CanvDTP.SEL_DECADE);

        let centuryBase = parseInt(this.tempYear / 100) * 100 - 1;
        let thisDecade = parseInt(this.year / 10) * 10;
        
        //Draw the decades.
        for(let i = 0; i < 12; i++)
        {
            //Highlight the current selected year.
            if((centuryBase + i * 10 - 9) === thisDecade)
            {
                this.fillCurrent(i);
            }
            
            this.ctxDTP.beginPath();
            this.ctxDTP.font = (this.bigBoxHeight * this.decadeScale) + "px " + this.bannerDecadeFontStyle;
            this.ctxDTP.fillStyle = (!i || i === 11) ? this.nonDecaden : this.ctxDTP.fillStyle = this.decaden;
            this.ctxDTP.fillText
            (
                (centuryBase + i * 10 - 9) + "-", 
                this.hitBounds[i].x1 + this.decadeHorzAdj * this.bigBoxWidth,
                this.hitBounds[i].y2 - this.decadeVertAdj1 * this.bigBoxHeight
            );
            this.ctxDTP.fillText
            (
                centuryBase + i * 10, 
                this.hitBounds[i].x1 + this.decadeHorzAdj * this.bigBoxWidth,
                this.hitBounds[i].y2 - this.decadeVertAdj2 * this.bigBoxHeight
            );
            this.ctxDTP.stroke();          
        }

        //Draw the century.
        this.ctxDTP.beginPath();
        this.ctxDTP.fillStyle = this.bannerCenturyn;
        this.ctxDTP.font = (this.smallBoxHeight * this.bannerCenturyScale) + "px " + this.bannerCenturyFontStyle;
        this.ctxDTP.fillText
        (
            (centuryBase + 1) + "-" + (centuryBase + 100),
            this.contentLeft + this.smallBoxWidth + this.smallBoxWidth * this.bannerCenturyHorzAdj,
            this.contentTop + this.smallBoxHeight - this.smallBoxHeight * this.bannerCenturyVertAdj
        );
        this.ctxDTP.stroke();

        this.drawPrevious(this.prevNextColorn); //Draw the previous button.
        this.drawNext(this.prevNextColorn);     //Draw the next button.
        this.drawClock(this.clockColorn);       //Draw the clock button.

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

                //Get additional info for days of month.
                this.pickedDecade = centuryBase + i * 10 - 9;
                
                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    case CanvDTP.SEL_DECADE:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.bigBoxHeight * this.decadeScale) + "px " + this.bannerDecadeFontStyle;
                        this.ctxDTP.fillStyle = (!i || i === 11) ? this.nonDecadeh : this.ctxDTP.fillStyle = this.decadeh;
                        this.ctxDTP.fillText
                        (
                            (centuryBase + i * 10 - 9) + "-", 
                            this.hitBounds[i].x1 + this.decadeHorzAdj * this.bigBoxWidth,
                            this.hitBounds[i].y2 - this.decadeVertAdj1 * this.bigBoxHeight
                        );
                        this.ctxDTP.fillText
                        (
                            centuryBase + i * 10, 
                            this.hitBounds[i].x1 + this.decadeHorzAdj * this.bigBoxWidth,
                            this.hitBounds[i].y2 - this.decadeVertAdj2 * this.bigBoxHeight
                        );
                        this.ctxDTP.stroke(); 
                        break;

                    case CanvDTP.SEL_PREVIOUS:
                        this.drawPrevious(this.prevNextColorh);
                        break;

                    case CanvDTP.SEL_NEXT:
                        this.drawNext(this.prevNextColorh);
                        break;

                    case CanvDTP.SEL_TIME:
                    default:
                        this.drawClock(this.clockColorh);
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
        x2 = this.contentLeft + this.timeBoxWidth;
        y1 = this.contentTop + .5 * this.timeBoxHeight;
        y2 = this.contentTop + this.timeBoxHeight;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_HINC1});

        //Hour decrement hit boundaries.
        x1 = this.contentLeft;
        x2 = this.contentLeft + this.timeBoxWidth;
        y1 = this.contentTop + 2 * this.timeBoxHeight;
        y2 = this.contentTop + 2.5 * this.timeBoxHeight;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_HDEC1});

        //Minute increment 1 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth;
        y1 = this.contentTop + .5 * this.timeBoxHeight;
        y2 = this.contentTop + this.timeBoxHeight;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MINC1});

        //Minute increment 10 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth;
        y1 = this.contentTop;
        y2 = this.contentTop + .5 * this.timeBoxHeight;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MINC10});

        //Minute deccrement 1 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth;
        y1 = this.contentTop + 2 * this.timeBoxHeight;
        y2 = this.contentTop + 2.5 * this.timeBoxHeight;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MDEC1});

        //Minute deccrement 10 hit boundaries.
        x1 = this.contentLeft + 1.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 2.5 * this.timeBoxWidth;
        y1 = this.contentTop + 2.5 * this.timeBoxHeight;
        y2 = this.contentTop + 3 * this.timeBoxHeight;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_MDEC10});

        //AM/PM hit boundaries.
        x1 = this.contentLeft + 2.5 * this.timeBoxWidth;
        x2 = this.contentLeft + 3.5 * this.timeBoxWidth;
        y1 = this.contentTop + this.timeBoxHeight;
        y2 = this.contentTop + 2 * this.timeBoxHeight;
        this.hitBounds.push({x1: x1, x2: x2, y1: y1, y2: y2, type: CanvDTP.SEL_AMPM});

        //Draw the calendar icon.
        this.calDraw(this.calCalColorn);

        this.ctxDTP.beginPath();
        this.ctxDTP.font = (this.timeBoxHeight * this.timeWeight) + "px " + this.timeFont;
        this.ctxDTP.fillStyle = this.timeColorn;
        this.ctxDTP.fillText //Draw the hours.
        (
            this.hour, 
            this.contentLeft + this.timeBoxWidth * this.timehourHorzAdj[this.hour - 1],
            this.contentTop + 2 * this.timeBoxHeight - this.timeBoxHeight * this.timeVertAdj
        );                
        this.ctxDTP.fillText //Draw the hour minute separator.
        (
            ":", 
            this.contentLeft + this.timeBoxWidth + this.timeBoxWidth * this.timeDivHorzAdj,
            this.contentTop + 2 * this.timeBoxHeight - this.timeBoxHeight * this.timeDivVertAdj
        );            
        this.ctxDTP.fillText //Draw the minutes.
        (
            this.minute < 10 ? "0" + this.minute : this.minute, 
            this.contentLeft + 1.5 * this.timeBoxWidth + this.timeBoxWidth * this.timeMinHorzAdj,
            this.contentTop + 2 * this.timeBoxHeight - this.timeBoxHeight * this.timeVertAdj
        );
        
        //Draw the hour inc1 icon.
        this.incDraw(this.hitBounds[1].x1, this.hitBounds[1].x2, this.hitBounds[1].y1,
            this.hitBounds[1].y2, this.incColorn, CanvDTP.INC_1);

        //Draw the minute inc1 icon.
        this.incDraw(this.hitBounds[3].x1, this.hitBounds[3].x2, this.hitBounds[3].y1,
            this.hitBounds[3].y2, this.incColorn, CanvDTP.INC_1);

        //Draw the minute inc10 icon.
        this.incDraw(this.hitBounds[4].x1, this.hitBounds[4].x2, this.hitBounds[4].y1,
            this.hitBounds[4].y2, this.incColorn, CanvDTP.INC_10);

        //Draw the hour dec1 icon.
        this.incDraw(this.hitBounds[2].x1, this.hitBounds[2].x2, this.hitBounds[2].y1,
            this.hitBounds[2].y2, this.incColorn, CanvDTP.DEC_1);

        //Draw the minute dec1 icon.
        this.incDraw(this.hitBounds[5].x1, this.hitBounds[5].x2, this.hitBounds[5].y1,
            this.hitBounds[5].y2, this.incColorn, CanvDTP.DEC_1);

        //Draw the minute dec10 icon.
        this.incDraw(this.hitBounds[6].x1, this.hitBounds[6].x2, this.hitBounds[6].y1,
            this.hitBounds[6].y2, this.incColorn, CanvDTP.DEC_10);
        this.ctxDTP.stroke();

        //Draw AM/PM.
        this.ctxDTP.beginPath();
        this.ctxDTP.font = (this.timeBoxHeight * this.timeAmPmWeight) + "px " + this.timeAmPmFont;
        this.ctxDTP.fillStyle = this.timeAmPmColorn;
        this.ctxDTP.fillText
        (
            this.isAM ? "AM" : "PM", 
            this.contentLeft + 2.5 * this.timeBoxWidth + this.timeBoxWidth * this.timeAmPmHorzAdj,
            this.contentTop + 2 * this.timeBoxHeight - this.timeBoxHeight * this.timeAmPmVertAdj
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
                this.highlightHovItem(i); //Highlight the hovered item.

                //Draw the highlighted text.
                switch(this.hitBounds[i].type)
                {
                    //Highlight the calendar icon.
                    case CanvDTP.SEL_DATE:
                        this.calDraw(this.calCalColorh);
                        break;

                    case CanvDTP.SEL_HINC1:
                    case CanvDTP.SEL_MINC1:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1, 
                            this.hitBounds[i].y2, this.incColorh, CanvDTP.INC_1);
                        break;

                    case CanvDTP.SEL_MINC10:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1,
                            this.hitBounds[i].y2, this.incColorh, CanvDTP.INC_10);
                        break;

                    case CanvDTP.SEL_HDEC1:
                    case CanvDTP.SEL_MDEC1:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1,
                            this.hitBounds[i].y2, this.incColorh, CanvDTP.DEC_1);
                        break;

                    case CanvDTP.SEL_MDEC10:
                        this.incDraw(this.hitBounds[i].x1, this.hitBounds[i].x2, this.hitBounds[i].y1,
                            this.hitBounds[i].y2, this.incColorh, CanvDTP.DEC_10);
                        break;

                    case CanvDTP.SEL_AMPM:
                        this.ctxDTP.beginPath();
                        this.ctxDTP.font = (this.timeBoxHeight * this.timeAmPmWeight) + "px " + this.timeAmPmFont;
                        this.ctxDTP.fillStyle = this.timeAmPmColorh;
                        this.ctxDTP.fillText //Draw AM/PM.
                        (
                            this.isAM ? "AM" : "PM", 
                            this.contentLeft + 2.5 * this.timeBoxWidth + this.timeBoxWidth * this.timeAmPmHorzAdj,
                            this.contentTop + 2 * this.timeBoxHeight - this.timeBoxHeight * this.timeAmPmVertAdj
                        );
                        this.ctxDTP.stroke();
                        break;
                }
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
                switch(this.pickedType)
                {
                    case CanvDTP.SEL_DATE:
                        this.dateTime = CanvDTP.CAL_DATE;
                        this.bodyDraw();
                        break;

                    case CanvDTP.SEL_HINC1:
                        this.hour++;
                        if(this.hour > 12) this.hour = 1;
                        if(this.hour === 12) this.isAM = this.isAM ? false : true;
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.SEL_HDEC1:
                        this.hour--;
                        if(this.hour < 1) this.hour = 12;
                        if(this.hour === 11) this.isAM = this.isAM ? false : true;
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.SEL_MINC1:
                        this.minute++;
                        if(this.minute > 59)
                        {
                            this.minute = 0;
                            this.hour++;
                            if(this.hour > 12) this.hour = 1;
                            if(this.hour === 12) this.isAM = this.isAM ? false : true;
                        }
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.SEL_MDEC1:
                        this.minute--;
                        if(this.minute < 0)
                        {
                            this.minute = 59;
                            this.hour--;
                            if(this.hour < 1) this.hour = 12;
                            if(this.hour === 11) this.isAM = this.isAM ? false : true;
                        }
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.SEL_MINC10:
                        this.minute += 10;
                        if(this.minute > 59)
                        {
                            this.minute -= 60;
                            this.hour++;
                            if(this.hour > 12) this.hour = 1;
                            if(this.hour === 12) this.isAM = this.isAM ? false : true; 
                        }
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.SEL_MDEC10:
                        this.minute -= 10;
                        if(this.minute < 0)
                        {
                            this.minute += 60;
                            this.hour--;
                            if(this.hour < 1) this.hour = 12;
                            if(this.hour === 11) this.isAM = this.isAM ? false : true;
                        }
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;

                    case CanvDTP.SEL_AMPM:
                        this.isAM = this.isAM ? false : true;
                        this.textBoxDateTime();
                        this.bodyDraw();
                        break;
                }
            }
            else
            {
                switch(this.calView)
                {
                    case CanvDTP.CAL_MONTH:
                        switch(this.pickedType)
                        {
                            case CanvDTP.SEL_DAY:
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
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                this.tempMonth--;

                                if(this.tempMonth <= 0)
                                {
                                    this.tempMonth = 12;
                                    this.tempYear--;
                                }
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_NEXT:
                                this.tempMonth++;

                                if(this.tempMonth >= 13)
                                {
                                    this.tempMonth = 1;
                                    this.tempYear++;
                                }
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_VIEW:
                                this.calView = CanvDTP.CAL_YEAR;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
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
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                this.tempYear--;
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_NEXT:
                                this.tempYear++;
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_VIEW:
                                this.calView = CanvDTP.CAL_DECADE;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
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
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                this.tempYear -= 10;
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_NEXT:
                                this.tempYear += 10;
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_VIEW:
                                this.calView = CanvDTP.CAL_CENTURY;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
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
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_PREVIOUS:
                                this.tempYear -= 100;
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_NEXT:
                                this.tempYear += 100;
                                this.bodyDraw();
                                break;

                            case CanvDTP.SEL_TIME:
                                this.dateTime = CanvDTP.CAL_TIME;
                                document.body.style.cursor = "default";
                                this.bodyDraw();
                                break;
                        }
                        break;
                }
            }
        }
    }
}