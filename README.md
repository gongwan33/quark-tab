##Quark Tab
A jQuery plugin to create quick tab windows.

###Quick Start
####Normal Mode
Using this mode, all the content of the tab page will be preloaded to the browser. It's not appropriate to use this mode with heavy content.

```
    <tab>
        <page tabname="Newest">
            <h3>Page1</h3>
            <hr>
            <div>Content</div>
        </page>
        <page tabname="Hotest">
            <h3>Page2</h3>
            <hr>
            <div>Content</div>
        </page>
        <page tabname="Fashion">
            <h3>Page3</h3>
            <hr>
            <div>Content</div>       
        </page>
        <page tabname="Hairdressing">
            <h3>Page4</h3>
            <hr>
            <div>Content</div>       
        </page>
    </tab>

    <script>
    (function($) {
        $('tab').quarkTab();
    })(jQuery);
    </script>
```

####Lazyload Mode
Using this mode, the content will not be loaded to your local browser until the specific tab is chosen. The property 'src' of the 'page' tab indicates the script URL which can send the page content in JSON. 

```
    <tab>
        <page tabname="Lazyload" src="./quark-tab-ajax.php" lazy>
        </page>
    </tab>

    <script>
    (function($) {
        $('tab').quarkTab();
    })(jQuery);
    </script>

```

When the tab is chosen, it will send an Ajax request for the page content. Here is the example written in PHP to response the request. You may also use other languages to send back the response. The content under the 'page_html' label will be rendered to the related tab page.

```php
<?php
$ajax_page_data = array(
    'page_html' => '
    <h3>Page Lazy</h3>
    <div>Content 5</div>
    ',
);

echo json_encode($ajax_page_data);
?>
```
####Options
The function 'quarkTab' can take some options as the parameter.

```
$('tab').quarkTab({
    defaultPage: 0,
    style: 'default',
    tabActiveColor: 'red',
    tabColor: '#ddd',
});
```

| Name | Description | Default Value|
|------|:-----------:|:------------:|
|defaultPage| The index of default tab page to be shown after the page loaded.| 0|
|style| The tab style.| default|
|tabActiveColor| The color of the tab label when activated.|red|
|tabColor| The background Color of the tab label.| #ddd|
