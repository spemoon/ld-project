(function() {

    if(!window.LD){
        window['LD'] = {};
    }

    var helper = {
        isCompatible : function(other) {
            if(other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementsByTagName){
                return false;
            }
            return true;
        },
        $ : function() {
            var elements = [];
            for(var i = 0,len = arguments.length; i < len; i++){
                var element = arguments[i];
                console.log(element);

                if(element == 'string'){
                    element = document.getElementById(element);
                }

                if(len == 1){
                    return element;
                }

                elements.push(element);
            }
            return elements;
        },
        addEvent :  function(node, type, listener) {
            if(!helper.isCompatible()){
                return false;
            }
            console.log(helper.$(node));
            console.log(node);
            if(!(node = helper.$(node))){
                return false;
            }

            if( node.addEventListener ){
                node.addEventListener(type, listener, false);
                return true;
            }else if( node.attachEvent ){
                node['e' + type + listener] = listener;
                node[type + listener] = function() {
                    node['e' + type + listener](window.event);
                }
                node.attachEvent( 'on' + type, node[type + listener]);
                return true;
            }
            return false;
        },
        removeEvent : function(node, type, listener) {
            if(!(node = helper.$(node))){
                return false;
            }

            if(node.removeEventListener){
                node.removeEventListener(type, listener, false);
                return true;
            }else if(node.detachEvent){
                node.detachEvent( 'on' + type, node[type + listener]);
                node[type + listener] = null;
                return true;
            }
            return false;
        },
        getElementByClassName : function(className, tag, parent) {
            parent = parent || document;
            var allTags = (tag == '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);
            var matchingElements = [];

            className = className.replace(/\-/g, '\\-');
            var regex = new RegExp('(^|\\s)' + className + '\\s|$');

            var element;
            for(var i = 0,len = allTags.length; i < len; i++){
                element = allTags[i];
                if(regex.test(element.className)){
                    matchingElements.push(element);
                }
            }
            return matchingElements;
        },
        toggleDisplay : function(node, value) {
            if(!(node = helper.$(node))){
                return false;
            }

            if(node.style.display != 'none'){
                node.style.display = 'none';
            }else{
                node.style.display = value || '';
            }
            return ture;
        },
        insertAfter : function(node, referenceNode) {
            if(!(node = helper.$(node))){
                return false;
            }

            if(!(referenceNode = helper.$(node))){
                return false;
            }

            return referenceNode.insertBefore(node, referenceNode.nextSibling);
        },
        removeChildren : function(parent) {
            if(!(parent = helper.$(parent))){
                return false;
            }

            while(parent.firstChild){
                parent.firstChild.parentNode.removeChild(parent.firstChild);
            }

            return parent;
        },
        prependChild : function(parent, newChild) {
            if(!(parent = helper.$(parent))){
                return false;
            }
            if(!(newChild = helper.$(newChild))){
                return false;
            }

            if(parent.firstChild){
                parent.insertBefore(newChild, parent.firstChild);
            }else{
                parent.appendChild(newChild);
            }

            return parent;
        },
        bindFunction : function(obj, func) {
            return function() {
                func.apply(obj, arguments);
            }
        },
        getBrowserWindowSize : function() {
            var de = document.documentElement;
            return {
                'width' : ( window.innerWidth || (de && de.clientWidth) || document.body.clientWidth ),
                'height' : ( window.innerHeight || (de && de.clientHeight) || document.body.clientHeight )
            }
        }
    }

    window['LD']['isCompatible'] = helper.isCompatible;
    window['LD']['$'] = helper.$;
    window['LD']['addEvent'] = helper.addEvent;
    window['LD']['removeEvent'] = helper.removeEvent;
    window['LD']['getElementByClassName'] = helper.getElementByClassName;
    window['LD']['toggleDisplay'] = helper.toggleDisplay;
    window['LD']['insertAfter'] = helper.insertAfter;
    window['LD']['removeChildren'] = helper.removeChildren;
    window['LD']['prependChild'] = helper.prependChild;
    window['LD']['bindFunction'] = helper.bindFunction;
    window['LD']['getBrowserWindowSize'] = helper.getBrowserWindowSize;
    window['LD']['node'] = {
        ELEMENT_NODE        : 1,
        ATTRIBUTE_NODE      : 2,
        TEXT_NODE           : 3,
        CDATA_SECTION_NODE  : 4,
        ENTITY_REFERENCE_NODE   : 5,
        ENTITY_NODE         : 6,
        PROCESSING_INSTRUCTION_NODE : 7,
        COMMENT_NODE        : 8,
        DOCUMENT_NODE       : 9,
        DOCUMENT_TYPE_NODE  :10,
        DOCUMENT_FRAGMENT_NODE  : 11,
        NOTATION_NODE       : 12
    };

})();
