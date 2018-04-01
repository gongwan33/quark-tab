(function($) {
    var tabHTML = `
        <div>tab</div>
        `;
    $.fn.quarkTab = function(options) {
        var settings = $.extend({
            style: 'default',
        }, options);
        
        var instance = this;
        $(this).append(tabHTML);

        this.each(function(outerIndex, tab) {
            
        });
    }
})(jQuery);
