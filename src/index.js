function mult(strNum1, strNum2) {

    var a1 = strNum1.split('').reverse();
    var a2 = strNum2.toString().split('').reverse();
    var aResult = [];

    for (var iterNum1 = 0; iterNum1 < a1.length; iterNum1++) {
        for (let iterNum2 = 0; iterNum2 < a2.length; iterNum2++) {
            var idxIter = iterNum1 + iterNum2;
            aResult[idxIter] = a1[iterNum1] * a2[iterNum2] + ( idxIter >= aResult.length ? 0 : aResult[idxIter] );

            if (aResult[idxIter] > 9) {
                aResult[idxIter + 1] = Math.floor(aResult[idxIter] / 10) + ( idxIter + 1 >= aResult.length ? 0 : aResult[idxIter + 1] );
                aResult[idxIter] -= Math.floor(aResult[idxIter] / 10) * 10;
            }
        }
    }
    return aResult.reverse().join('');
};

var factorial = function(n,mode) {
    if(n <= 0) {
        return 1;
    } else {
        return mult(n, factorial((+n - +mode).toString(),mode));
    }
};
function evaluator(expression) {
    if(expression.indexOf('!')==-1) return expression;
    var factor = expression.match(new RegExp("[0-9]*!+")).toString();
       return evaluator(expression.replace(factor,factorial(factor.replace(new RegExp("!","g"),"").toString(),(factor.split("!").length-1).toString()).toString()));
};


module.exports = function zeros(expression) {
    var toEval = expression;
        toEval = evaluator(toEval);
        toEval = toEval.split('*');                                    //toEval = eval(toEval).toString();
        while(toEval.length!=1)
        {
            toEval[0] = mult(toEval[0],toEval.pop());
        }
        if(toEval[0].lastIndexOf("0")!=toEval[0].length-1) return 0;
        return toEval[0].match(new RegExp("0+",'g')).pop().length;
                   //(new RegExp("[0-9]*!+"));
};