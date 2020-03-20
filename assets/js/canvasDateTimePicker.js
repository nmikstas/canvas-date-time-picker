class CanvDTP
{
    constructor(parentDiv)
    {
        //HTML nodes required for date/time picker.
        this.parentDiv = parentDiv;
        this.paddingDiv;
        this.dtpText;
        this.dtpCanvas;
        this.iconCanvas;

        //Contexts of the canvases.
        this.ctxDTP;
        this.ctxIcon;

        //Both canvases are squares.  Keep track of their dimensions.
        this.canvWidth;
        this.iconCanWidth;

        //Parameters of the icon canvas.
        this.iBorderRadius = .20;
        this.iBorderWeight = .05;
        this.iXPadding     = .20;
        this.iYPadding     = .20;
        this.iLineWidth    = .02;

        //Normal colors.
        this.iBorderColorn  = "#a0a0a0";
        this.iFillColorn    = "#d0d0d0";
        this.iCalColorn     = "#000000";

        //Hover colors.
        this.iBorderColorh  = "#202020";
        this.iFillColorh    = "#808080";
        this.iCalColorh     = "#ffffff";

        //Current colors.
        this.iBorderColor   = this.iBorderColorn;
        this.iFillColor     = this.iFillColorn;
        this.iCalColor      = this.iCalColorn;







        //Only create date/time picker if the parent exists.
        if(this.parentDiv)this.intit();
    }

    intit()
    {
        //Create the components necessary for the date/time picker.
        this.paddingDiv = document.createElement("div");
        this.dtpText = document.createElement("input");
        this.dtpCanvas = document.createElement("canvas");
        this.iconCanvas = document.createElement("canvas");

        //Get 2D contexts of the canvases.
        this.ctxDTP = this.dtpCanvas.getContext("2d");
        this.ctxIcon = this.iconCanvas.getContext("2d");

        //Clear anything out of the parent div.
        this.parentDiv.innerHTML = "";

        //Add all the components to the div.
        this.paddingDiv.appendChild(this.dtpText);
        this.paddingDiv.appendChild(this.iconCanvas);
        this.paddingDiv.appendChild(this.dtpCanvas);
        this.parentDiv.appendChild(this.paddingDiv);
        
        //Setup positioning to ignore any parent padding.
        this.paddingDiv.style.position = "relative";
        this.iconCanvas.style.position = "absolute";
        this.dtpCanvas.style.position = "absolute";

        //Add resize listener to resize the canvas.
        window.addEventListener("resize", () => this.resize());

        //Add mouse event listeners.
        this.iconCanvas.addEventListener("mouseenter", () => this.iconEnter());
        this.iconCanvas.addEventListener("mouseleave", () => this.iconExit());

        this.iconCanvas.style.cursor = "pointer";

        this.resize();
    }

    //Change icon colors when mouse is hovering over it.
    iconEnter()
    {
        this.iBorderColor = this.iBorderColorh;
        this.iFillColor   = this.iFillColorh;
        this.iCalColor    = this.iCalColorh;
        this.draw();
    }

    //Change icon colors when mouse is not hovering over it.
    iconExit()
    {
        this.iBorderColor = this.iBorderColorn;
        this.iFillColor   = this.iFillColorn;
        this.iCalColor    = this.iCalColorn;
        this.draw();
    }

    resize()
    {
        let rect = this.parentDiv.getBoundingClientRect();

        //Set the width of the text area - leave room for the icon canvas.
        this.dtpText.style.width = (rect.width - rect.height) + "px";
        
        //Save a copy of the canvas widths. Base for future calculations.
        this.dtpCanvWidth = rect.width;
        this.iconCanWidth = rect.height;

        //Place the main date/time picker canvas below the text area.
        this.dtpCanvas.style.left = "0px";
        this.dtpCanvas.style.top = rect.height + "px";

        //Make the date/time picker a square the width of the parent container.
        this.dtpCanvas.width  = this.dtpCanvWidth;
        this.dtpCanvas.height = this.dtpCanvWidth;

        //Place the calendar icon to the right of the text box.
        this.iconCanvas.width  = this.iconCanWidth;
        this.iconCanvas.height = this.iconCanWidth;

        //Round the text box left border.
        this.dtpText.style.borderTopLeftRadius = (this.iconCanWidth * this.iBorderRadius) + "px";
        this.dtpText.style.borderBottomLeftRadius = (this.iconCanWidth * this.iBorderRadius) + "px";
        this.draw();
    }

    draw()
    {
        /************************************* Calendar Icon *************************************/

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

        /************************************* Calendar Body *************************************/
        
        
        
        
        this.ctxDTP.beginPath();
        this.ctxDTP.lineWidth = 3.75;
        this.ctxDTP.strokeStyle = "#ff0000";
        this.ctxDTP.arc(this.dtpCanvWidth / 2, this.dtpCanvWidth / 2, this.dtpCanvWidth / 2 - 2, -Math.PI / 2, 0);
        this.ctxDTP.stroke();

        //this.ctxIcon.beginPath();
        //this.ctxIcon.fillStyle = "blue";
        //this.ctxIcon.fillRect(0, 0, this.iconCanWidth, this.iconCanWidth);
        //this.ctxIcon.stroke();
    }
}