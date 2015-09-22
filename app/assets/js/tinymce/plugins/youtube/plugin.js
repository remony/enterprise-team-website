tinymce.PluginManager.add('youtube', function(editor, url) {
    // Add a button that opens a window
    editor.addButton('youtube', {
        text: 'Youtube',
        icon: false,
        onclick: function() {
            // Open window
            editor.windowManager.open({
                title: 'youtube plugin',
                body: [
                    {type: 'textbox', name: 'title', label: 'Youtube ID'}
                ],
                onsubmit: function(e) {
                    // Insert content when the window form is submitted
										var html = '<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/' + e.data.title + '?autoplay=0" frameborder="0"/>';
										parent.tinyMCE.activeEditor.windowManager.close(window);
										editor.insertContent(html);


                }
            });
        }
    });

    // Adds a menu item to the tools menu
    editor.addMenuItem('youtube', {
        text: 'youtube plugin',
        context: 'tools',
        onclick: function() {
            // Open window with a specific url
            editor.windowManager.open({
                title: 'TinyMCE site',
                url: 'http://www.tinymce.com',
                width: 800,
                height: 600,
                buttons: [{
                    text: 'Close',
                    onclick: 'close'
                }]
            });
        }
    });
});
