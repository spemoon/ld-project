(function(){

    var helper = {
        addEvent : function(node, type, listener){
            if(node.addEventListener){
                node.addEventListener(type, listener, false);
                return true;
            } else if (node.attachEvent) {
                node['e' + node + listener] = listener;
                node[node + listener] = function() {
                    node['e' + node + listener](window.event);
                }
                node.attachEvent('on' + type, node[node + listener]);
                return true;
            }
            return false;
        },
        stopPropagation : function(e) {
            var e = window.event || e;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancleBubble = true;
            }
        },
        countMax : function(str) {
            var obj = {};
            for(var i = 0,len = str.length; i < len ; i++){
                var key = str[i];   
                if(!obj[key]){
                    obj[key] = 1;
                }else{
                    obj[key]++;
                }
            }
            var max = 1;
            var maxKey = '';
            for(var key in obj){
                if(max < obj[key]){
                    max = obj[key];
                    maxKey = key;
                }
            }
            console.log('max:' + max, 'maxKey:' + maxKey);
        },
        getBytes : function(str) {
            var byteLen = 0;
            var len = str.length;
            if(len != 0)
            for(var i = 0; i < len; i++){
                if(str.charCodeAt(i) > 255){
                    byteLen += 2;
                }else{
                    byteLen++;
                }
            }
            return byteLen;
        },
        unique : function(arr) {
            var newArray = [];
            var obj = {};
            for(var i = 0,len = arr.length; i < len; i++ ){
                var item = arr[i];
                if(!obj[item]){
                    obj[item] = 1;
                    newArray.push(item);
                }
            }
            return newArray;
        },
        isString : function(str) {
            return str == 'string' || str.constructor == String;
        },
        clone : function(obj) {
            var objClone;
            if(obj.constructor == Object){
                objClone = obj.constructor();
            } else {
                objClone = obj.constructor(obj.valueOf());
            }
            for(var key in obj){
                if(objClone[key] != obj[key]){
                    if(Object == typeof(obj[key])){
                        objClone[key] = helper.clone(obj[key]);
                    }else{
                        objClone[key] = obj[key];
                    }
                }
            }
            objClone.toString = obj.toString;
            objClone.valueOf = obj.valueOf;
            return objClone;
        },
        parseQueryString : function(url) {
            var query = {};
            var arr = url.split('?');
            if(arr.length <= 1){
                return query;
            }
            arr = arr[1].split('&');
            for(var i = 0,len = arr.length; i < len; i++){
                var temp = arr[i].split('=');
                query[temp[0]] = temp[1];
            }
            return query;
        }

    }

    helper.addEvent(document, 'click', function(e) {
        var e = window.event || e;
        var target = e.srcElement || e.target;
        alert(target.nodeName);
        helper.stopPropagation(e);
    });

    helper.countMax('asdafsdafsdasdaa');
    console.log(helper.getBytes('asd什么情况'));
    console.log(helper.unique([1,2,3,3,3,3,3]));
    console.log(helper.isString(new String('hello')));
    var obj = {
        a : {
            b : 'c',
            d : function() {
                console.log('123');
            }
        }
    }
    console.log(helper.clone(obj));
    console.log(helper.parseQueryString("http://witmax.cn/index.php?key0=0&key1=1&key2=2"));

})();
