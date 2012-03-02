(function() {
    var n = 10000000,
        newArray = [],
        lostArray = [],
        lostNum = 3,
        tempObj = {};
    for(var i = 0; i < n; i++){
        newArray[i] = i + 1;
    }
    for(var i = 0; i < lostNum; i++ ){
        newArray.splice(Math.random()*n | 0, 1);
    }
    newArray.sort(function() {return Math.random - 0.5;})
    //方法1：
    /*var t1 = + new Date();*/
    //for(var i in newArray){
        //if(tempObj[newArray[i]] === undefined){
            //tempObj[newArray[i]] = 1;
        //}
    //}
    //for(var i = 1; i < n; i++){
        //if(tempObj[i] != 1){
            //lostArray.push(i);
        //}
    //}
    //console.log(lostArray);
    //var t2 = + new Date();
    /*console.log(t2 - t1);*/


    //方法2：
    /*var t1 = + new Date();*/
    //newArray.sort(function(a, b) { return a-b; });
    //if(newArray[0] > 1){
        //lostArray.push(1);
    //}
    //for(var i = 0, len = newArray.length; i < len; i++){
        //if(newArray[i] - newArray[i-1] > 1){
            //for(var j = newArray[i-1] + 1; j < newArray[i]; j++){
                //lostArray.push(j);
                //if(lostArray.length == lostNum){
                    //break;
                //}
            //}
            //if(lostArray.length == lostNum){
                //break;
            //}
        //}
        
    //}
    //console.log(lostArray);
    //var t2 = + new Date();
    /*console.log(t2 - t1);*/

    //方法3：
    var t1 = + new Date();
    var test_count = n - lostNum;
    var tempArray = new Array(test_count);
    for(var i = 0, len = newArray.length; i < len; i++){
        tempArray[newArray[i]] = true;
    }
    for(var i = 1, len = n; i < n + 1; i++){
        if(!tempArray[i]){
            lostArray.push(i);
        }
    }
    console.log(lostArray);
    var t2 = + new Date();
    console.log(t2-t1);
})();
