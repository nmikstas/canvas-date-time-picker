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
        this.animTime  = 20;
        this.animSteps = 10;

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

        //Parameters of the body canvas.
        this.bBorderRadius = .05;
        this.bBorderWeight = .01;
        this.bXPadding     = .20;
        this.bYPadding     = .20;
        this.bLineWidth    = .02;

        //Normal body colors.
        this.bBorderColorn = "#a4e3f7";
        this.bFillColorn   = "#e5f5fa";

        //Hover body colors.
        this.bBorderColorh = "#202020";
        this.bFillColorh   = "#808080";

        //Current body colors.
        this.bBorderColor  = this.bBorderColorn;
        this.bFillColor    = this.bFillColorn;










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
        
        //Setup positioning to ignore any parent padding.
        this.paddingDiv.style.position = "relative";
        this.iconCanvas.style.position = "absolute";
        this.bodyCanvas.style.position = "absolute";

        //Add resize listener to resize the canvas.
        window.addEventListener("resize", () => this.resize());

        //Add mouse event listeners.
        this.iconCanvas.addEventListener("mouseenter", () => this.iconEnter());
        this.iconCanvas.addEventListener("mouseleave", () => this.iconExit());

        //Add click event listeners.
        this.iconCanvas.addEventListener("click", () => this.iconClick());

        this.iconCanvas.style.cursor = "pointer";

        this.resize();
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
    }
}