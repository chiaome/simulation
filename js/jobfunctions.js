function exponential(arr) {
    var rateParameter = 1;
    if(arr != 1 && arr.length == 0) rateParameter = (1 / 40);
    return -Math.log(1.0 - Math.random()) / rateParameter;
}

function deterministic(arr) {
    var c = 1;
    if(arr.length != 0) c = arr[0];
    return c;
}

function uniform(arr) {
    var a = 0;
    var b = 2;
    if(arr.length != 0) {
        a = arr[0];
        b = arr[1];
    }
    return a + Math.random() * (b-a);
}

function erlang(arr) {
    var n = 2;
    var lambda = 1;
    if(arr.length != 0) {
        n = arr[0];
        lambda = arr[1];
    }
    var total = 0.0;
    for (var i = 0; i < n; i++)
        total += -Math.log(1-Math.random()) / lambda;
    return total;
}

function pareto(arr) {
    var alpha = alpha | 2;
    var sigma = sigma | 1;
    var mu = mu | sigma;
    if(arr.length != 0) {
        alpha = arr[0];
        sigma = arr[1];
        mu = arr[2];
    }
    return mu + sigma * (Math.pow(1-Math.random(), -1/alpha) - 1);
}
