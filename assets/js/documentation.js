


$(document).ready(() =>
{
    //Scroll the navbar with the document.
    $(window).scroll(() =>
    {
        let headerHeight = $(".header-class").outerHeight();
        let scrollLocation = $(this).scrollTop();
        let containerPosition = $(".doc-container").offset().top;
        let navPadding = (scrollLocation > containerPosition) ? scrollLocation : containerPosition;
        $(".sidenav").css({paddingTop: navPadding - headerHeight + 16, left: 200});        
    });
    


    
   
})