cv = document.getElementById("canvas");
ctx = cv.getContext("2d");

cv.style.backgroundColor = "green";
class Entity{
    constructor(id,x,y){
        this.id = id;

        this.x = x;
        this.y = y;

        this.hp = 100;
        this.ap = 300;
        this.at = 50;
        this.df = 0;
    }
    move2(x,y){
        this.x += x;
        this.y += y;
    }
    df2(df) {
        this.df = df;
    }
    at2(at){
        this.at = at;
    }
    hp2(hp){
        this.hp = hp;
    }
    ap2(ap){
        this.ap = ap;
    }
}
class Item{
    constructor(type){
        this.type = type
    }
    effect(obj){
        if(type == null){
            obj.df2(2);
        }
    }

}

var N = 10000
function Array1(n){
    let arr = new Array(n);
    for(let i=0;i<n;i++) arr[i] = 0;
    return arr;
}
function Array2(n){
    let arr = new Array(n);
    for (let i=0;i<n;i++){
        arr[i] = new Array(n);
        for(let j=0;j<n;j++)arr[i][j] = 0;
    }
    return arr;
}

var gMap = Array2(N);
var cMap = Array2(N);

var EnNum = 0;
var EnN = N
var enList = Array1(EnN);

function Born(xm,ym,xf,yf){
    enList[EnNum] = new Entity(EnNum,(xm+xf)/2,(ym+yf)/2);
    EnNum = (EnNum + 1) % EnN;
}
function drawEn(){
    let obj;
    for(let i=0;i<EnN;i++){
        obj = enList[i];
        ctx.arc(obj.x,obj.y,3,0,Math.PI*2);
        ctx.fillStye = "red"
    }
}

Born(0,0,0,0);




