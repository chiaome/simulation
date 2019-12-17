generateGraph("exponential", []);
function buttonEvent(curr, name) {
    if(name == "exponential") {
        generateGraph("exponential", []);
    }else if(name == "deterministic") {
        generateGraph("deterministic", []);
    }if(name == "uniform") {
        generateGraph("uniform", []);
    }if(name == "erlang") {
        generateGraph("erlang", []);
    }if(name == "pareto") {
        generateGraph("pareto", []);
    }

    var eles = document.getElementsByClassName("btn");
    for(var i = 0; i < eles.length; i++) {
        if(eles[i] != curr) {
            eles[i].classList.remove("btn-primary");
            eles[i].classList.add("btn-secondary");
        }
    }
    curr.classList.add("btn-primary");
    curr.classList.remove("btn-secondary");


    var listEles = document.getElementsByClassName("list-group-item");
    for(var i = 0; i < listEles.length; i++) {
        listEles[i].classList.remove("active");
    }
    document.getElementById(name).classList.add("active");
}
