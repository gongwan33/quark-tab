(function($) {
    var frameHTML = `
        <div class="qt-tabs">
        </div>
        <div class="qt-tab-content">
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
            var frame = $('<div class="qt-tabs-frame"/>').append(frameHTML);

            $(tab).children().remove();

            $(pages).each(function(index, page) {
                var name = $(page).attr('name');
                var content = $(page).html();
                var tabHTML = `
                    <div class="tab">` + name + `</div>
                    `;
                var tabContent = `
                    <div class="qt-tab-page hide">` + content + `</div>
                    `;

                $(frame).find('.qt-tabs').append(tabHTML);
                $(frame).find('.qt-tab-content').append(tabContent);

                $(tab).append(frame);
            });

            $(tab).find('.qt-tab-content .qt-tab-page').first().removeClass('hide');

            $(tab).find('.qt-tabs .tab').click(function(ev) {
                var clkTab = $(ev.target).closest('.tab'); 
                var curTab = $(ev.target).closest('.qt-tabs-frame');
                var tabIndex = $(curTab).find('.qt-tabs .tab').index($(clkTab));
                
                $(curTab).find('.qt-tab-content .qt-tab-page').addClass('hide');
                $($(curTab).find('.qt-tab-content .qt-tab-page').get(tabIndex)).removeClass('hide');
            });
        });
    }
})(jQuery);
