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
    }
};