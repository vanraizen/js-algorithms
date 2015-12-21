module.exports = {
    simpleSearchHighlight: function(query, context, hightlightTag) {
        hightlightTag = hightlightTag || "b";
        var regex = new RegExp("("+query+")", "g");
        return context.replace(regex, "<"+hightlightTag+">$1</"+hightlightTag+">");
    },
    changeWidthAttributeValue: function(context, newValue) {
        return context.replace(/width=("\d*")/, "width=\""+newValue+"\"");
    },
    trim: function(context) {
        return context.replace(/^\s*|\s*$/g, "");
    },
    isEmail: function(context) {
        return !!context.match(/^\w+@\w+\.\w+/);
    },
    parseFileSystem: function (filePaths) {
        var fileTree = {};
        filePaths.forEach(function (filePath) {
            //Use a global regex to pull out all directory names
            var directories = filePath.match(/\w+\/+/g),
                file = filePath.substring(filePath.lastIndexOf('/')+1),
                pointer = fileTree;

            //This will strip out all the slashes from the directory names
            directories = directories.map(function (directoryNameWithSlashes) {
                return directoryNameWithSlashes.substring(0, directoryNameWithSlashes.indexOf('/'));
            });

            //This will check if the pointer's target directory exists and initialize it if it doesn't
            directories.forEach(function (directory) {
               //Check if directory exists (could exist from previous iteration) or initialize it to {}
               pointer[directory] = pointer[directory] || {};
               //Move the pointer deeper into the tree for the next call
               pointer = pointer[directory];
            });

            //Here pointer should be pointing to the leaf directory and so dropping in the file is easy
            pointer[file] = true;
        });
        return fileTree;
    }
};