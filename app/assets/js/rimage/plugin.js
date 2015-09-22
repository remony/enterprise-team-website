tinymce.PluginManager.add('rImage', function(editor, url) {
    // Add a button that opens a window
    editor.addButton('rImage', {
        text: 'rImage',
        icon: false,
        onclick: function() {
            // Open window
            editor.windowManager.open({
                title: 'Select an image',
                body: [{
                    type: 'textbox',
                    title: 'file',
                    name: 'file',
                    subtype: 'file',
                    label: 'Upload'
                }],
                onsubmit: function(e, a, b) {


                    var uploadUrl = "http://localhost:8080/file";

var files = document.querySelector('input[type=file].mce-textbox').files[0];
                    var data = new FormData();
                    data.append("file", files);
                    data.append("event_id", "1");
                    data.append("news_id", "-1");
                    data.append("page_id", "-1");

                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;

                    xhr.addEventListener("readystatechange", function() {
                        if (this.readyState === this.DONE) {
                          //console.log(this.responseText.file);
                          
                            //parent.tinyMCE.activeEditor.windowManager.close(window);
                            editor.insertContent('<img class="materialboxed" src=' + JSON.parse(this.responseText).file[0].access_url + '/>');
                        }
                    });
                    xhr.open("POST", "http://localhost:8080/file");

                    xhr.send(data);

                }

            });
        }
    });

    // Adds a menu item to the tools menu
    editor.addMenuItem('rImage', {
        text: 'rImage',
        context: 'tools',
        onclick: function() {
            // Open window with a specific url
            editor.windowManager.open({
                title: "My html dialog",
                url: './dialog.html',
                width: 700,
                height: 600
            });
        }
    });
});