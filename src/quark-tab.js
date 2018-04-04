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
                var name = $(page).attr('tabname');
                var isLazy = (typeof $(page).attr('lazy')) == 'undefined' ? false : true;
                var content = $(page).html();

                var tabHTML = `
                    <div class="tab">` + name + `</div>
                    `;

                var tabContent = `
                    <div class="qt-tab-page hide">` + content + `</div>
                    `;

                $(frame).find('.qt-tabs').append(tabHTML);

                if(isLazy) {
                    var url = $(page).attr('src'); 
                    tabContent = `
                        <div class="qt-tab-page hide" lazy src="` + url + `"></div>
                        `;

               } 

                $(frame).find('.qt-tab-content').append(tabContent);
                $(tab).append(frame);

            });

            $(tab).find('.qt-tabs').css('background-color', settings.tabColor);

            $(tab).find('.qt-tabs .tab').click(function(ev) {
                var clkTab = $(ev.target).closest('.tab'); 
                var curTab = $(ev.target).closest('.qt-tabs-frame');
                var tabIndex = $(curTab).find('.qt-tabs .tab').index($(clkTab));
                var curPage = $(curTab).find('.qt-tab-content .qt-tab-page').get(tabIndex);
                var isLazy = (typeof $(curPage).attr('lazy')) == 'undefined'? false : true;
                
                $(curTab).find('.qt-tab-content .qt-tab-page').addClass('hide');
                $(curPage).removeClass('hide');

                $(curTab).find('.tab').css('color', 'black');
                $($(curTab).find('.tab').get(tabIndex)).css('color', settings.tabActiveColor);

                if(isLazy) {
                    var url = $(curPage).attr('src');
                    (function(curPage) {
                        $.ajax({
                            url: url,      
                            method: 'POST',
                            dataType: 'json',
                            success: function(data) {
                                if(data != null && data.page_html != null) {
                                    $(curPage).append('<div>Loading...</div>');
                                    $(curPage).children().remove();
                                    $(curPage).append(data.page_html);
                                } else {
                                    $(curPage).append('No available data.');
                                }
                            },
                        });
                    })(curPage);
                }
            });

            $($(tab).find('.qt-tabs .tab').get(settings.defaultPage)).click();
        });
    }
})(jQuery);
