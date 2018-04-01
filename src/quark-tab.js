(function($) {
    var frameHTML = `
        <div class="qt-tabs">
        </div>
        <div class="qt-tab-content hide">
        </div>
        `;
    $.fn.quarkTab = function(options) {
        var settings = $.extend({
            style: 'default',
        }, options);
        
        var instance = this;

        this.each(function(outerIndex, tab) {
            var originContent = $(tab).clone();      
            var pages = $(tab).find('page');
            var frame = $('<div/>').append(frameHTML);

            $(tab).children().remove();

            $(pages).each(function(index, page) {
                var name = $(page).attr('name');
                var content = $(page).html();
                var tabHTML = `
                    <div class="tab">` + name + `</div>
                    `;
                var tabContent = `
                    <div class="qt-tab-page">` + content + `</div>
                    `;

                $(frame).find('.qt-tabs').append(tabHTML);
                $(frame).find('.qt-tab-content').append(tabContent);

                $(tab).append(frame);
            });
        });
    }
})(jQuery);
