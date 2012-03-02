(function() {

    var A = function() {
        this.b = {
            c : 1
        }   
    }

    A.prototype = {
        b : {
            c : 1
        }
    }

    var a1 = new A();
    var a2 = new A();

    a1.b.c = 2;
    console.log(a2.b.c);

})();
