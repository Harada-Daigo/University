var Xmax = 9;
var Ymax = 13;
var FPS = 30;
var masu = [
   [-1,-1,-1,-1,-1,-1,-1,-1,-1],
   [-1, 1, 0, 0, 0, 0, 0, 1,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 0, 0, 0, 0, 0, 0, 0,-1],
   [-1, 1, 0, 0, 0, 0, 0, 1,-1],
   [-1,-1,-1,-1,-1,-1,-1,-1,-1],
];
var ww = window.innerWidth;
var wh = window.innerHeight;
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
var bg = new Image();

cv.width = ww;
cv.height = wh;

function init(){
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    drawPzl();
}

function mainloop(){
    
    setTimeout(mainloop,1000/FPS)
}

function drawPzl(){
    var x,y;
    var mImage = new Image();

    for(i=0;i<Ymax;i++){
        mImage[i]=new Array();
    };
    console.log("before onload!");
    bg.onload=()=>{
        console.log("onload!");
        var bgH=bg.naturalHeight;
        var pbg = window.innerHeight/bgH;
        ctx.drawImage(bg, 0, 0,bg.naturalWidth,bg.naturalHeight,0,0,bg.naturalWidth*pbg,bg.naturalHeight*pbg);
        console.log("drawPzl finished");
    }
    bg.src = "image\\bg.png";
    console.log("drawPzl finished!");
}
init();
console.log(111);