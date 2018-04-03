(function($) {
    var frameHTML = `
        <div class="qt-tabs">
        </div>
        <div class="qt-tab-content">
        </div>
        `;
    $.fn.quarkTab = function(options) {
        var settings = $.extend({
            defaultPage: 0,
            style: 'default',
            tabActiveColor: 'red',
            tabColor: '#ddd',
        }, options);
        
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

            $($(tab).find('.qt-tab-content .qt-tab-page').get(settings.defaultPage)).removeClass('hide');
            $($(tab).find('.qt-tabs .tab').get(settings.defaultPage)).css('color', settings.tabActiveColor);
            $(tab).find('.qt-tabs').css('background-color', settings.tabColor);

            $(tab).find('.qt-tabs .tab').click(function(ev) {
                var clkTab = $(ev.target).closest('.tab'); 
                var curTab = $(ev.target).closest('.qt-tabs-frame');
                var tabIndex = $(curTab).find('.qt-tabs .tab').index($(clkTab));
                
                $(curTab).find('.qt-tab-content .qt-tab-page').addClass('hide');
                $($(curTab).find('.qt-tab-content .qt-tab-page').get(tabIndex)).removeClass('hide');

                $(curTab).find('.tab').css('color', 'black');
                $($(curTab).find('.tab').get(tabIndex)).css('color', 'red');
            });
        });
    }
})(jQuery);
