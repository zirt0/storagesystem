// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
 function updateSidebar() {
    var $width = document.documentElement.clientWidth,
        $height = document.documentElement.clientHeight,
        $main = jQuery('body').height();

    if($width > 755) {
        if($main > $height) {
            jQuery('.left-off-canvas-menu').css({'min-height': $main});
        } else {
            jQuery('.left-off-canvas-menu').css({'min-height': $height});
        }
    } else {
        jQuery('div[role="navigation"]').removeAttr('style');
    }
}

// then call it on load AND browser resize
    $(window)
        .load(function() {
            updateSidebar();
        })
        .resize(function(){
            updateSidebar();
        });

var nowTemp = new Date();
