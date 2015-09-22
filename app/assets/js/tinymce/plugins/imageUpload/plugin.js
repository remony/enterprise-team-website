tinymce.PluginManager.add('rImage', function(editor, url) {
  // Add a button that opens a window
  editor.addButton('rImage', {
    text: 'rImage',
    icon: false,
    onclick: function() {
      // Open window
      editor.windowManager.open({
        title: "My html dialog",
        url: 'dialog.html',
        width: 700,
        height: 600
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
        url: 'dialog.html',
        width: 700,
        height: 600
      });
    }
  });
});
