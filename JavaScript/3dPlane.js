const PN = 10;
const SPAN_W = 40//10;
const SPAN_H = 100//100;
const N = SPAN_H*6//parseInt(window.innerHeight/2)*1.5;//*1.5;6
const FPS = 60;
const GRID_WIDTH = 10;
const MAX_SPEED = 3;
const SPEEDW = 0.05;
const GRAVITY = 0.1;
const HP = 30;
const EnemyNum = 100;

var ORN_X = window.innerWidth/2;
var ORN_Y = window.innerHeight/1.2;

var mainhp = HP;

var tmr = 0;

var X,Y;

var key = new Array(256);
for(let i=0;i<256;i++)key[i]=0;

var degreeX = Math.PI+Math.PI/15;
var degreeY = Math.PI/4;//Math.PI/4;
var degreeZ = 0+Math.PI/15;

var xtheta;
var ytheta;
var ztheta;

var R = 100;
var T = R/2/2;
var alpha = Math.PI/1.5;

var TopX = 300;
var TopY = 300;
var TopZ = 300;
var SPEED = 0;
var MainDegreeX = 0;
var MainDegreeY = 0;
var MainDegreeZ = 0;
var PlaneDegreeY = 0;

var XPlaneRotate = new Array(PN);
var YPlaneRotate = new Array(PN);

var numP = 0;
var PlaneMisselOn = new Array(100);
var PlaneMisselX = new Array(100);
var PlaneMisselY = new Array(100);
var PlaneMisselZ = new Array(100);
var PlaneMisselXs = new Array(100);
var PlaneMisselYs = new Array(100);
var PlaneMisselZs = new Array(100);

var Enemy = 0;
var EnemyID = new Array(EnemyNum);
var EnemyX = new Array(EnemyNum);
var EnemyY = new Array(EnemyNum);
var EnemyZ = new Array(EnemyNum);

var cvs;
var ctx;
var map;

var px = 0;
var py = 0;
var pz = 0;

//console.log("N="+"%d",N);

function onkey(e){
    //console.log("++++++push "+"%d",e.keyCode);
    key[e.keyCode]=1;
}
function offkey(e){
    //console.log("------push "+"%d",e.keyCode);
    key[e.keyCode]=0;
}

document.addEventListener("keydown",onkey);
document.addEventListener("keyup",offkey);

function canvas(){
    cvs = document.getElementById("canvas");
    ctx = cvs.getContext('2d');
}
function init(){
    let i,j,k;
    console.log("MAX=%d",parseInt(N/GRID_WIDTH));
    map = new Array(parseInt(N/GRID_WIDTH));
    for(i=0;i<parseInt(N/GRID_WIDTH);i++) map[i] = new Array(parseInt(N/GRID_WIDTH));
    for(i=0;i<parseInt(N/GRID_WIDTH);i++){
        for(j=0;j<parseInt(N/GRID_WIDTH);j++){
            map[i][j] = new Array(parseInt(N/GRID_WIDTH));
            for(k=0;k<parseInt(N/GRID_WIDTH);k++){
                map[i][j][k] = 0;
            };
        };
    };
}
function to_3d_2d(x,y,z,xr,yr,zr,ornx,orny,ornz){
    let X,Y,Z;//X = xcost - ysint // Y = ycost + xsint
    let xyz = new Array(3);

    xtheta = xr%(Math.PI*2);
    ytheta = yr%(Math.PI*2);
    ztheta = zr%(Math.PI*2);
    /*
    //x軸について
    Y = y*Math.cos(xtheta) - z*Math.sin(xtheta);
    Z = z*Math.cos(xtheta) + y*Math.sin(xtheta);
    //
    z = Z;
    y = Y;
    //y軸について
    //Z = (z+pz*GRID_WIDTH)*Math.cos(ytheta) + (-x+px*GRID_WIDTH)*Math.sin(ytheta) + pz*GRID_WIDTH;
    //X = (z-pz*GRID_WIDTH)*Math.sin(ytheta) + (x-px*GRID_WIDTH)*Math.cos(ytheta) + px*GRID_WIDTH; 
    Z = (z)*Math.cos(ytheta) - (x)*Math.sin(ytheta);
    X = (x)*Math.cos(ytheta) + (z)*Math.sin(ytheta);
    //
    z = Z;
    x = X;
    //z軸について
    X = x*Math.cos(ztheta) - y*Math.sin(ztheta);
    Y = y*Math.cos(ztheta) + x*Math.sin(ztheta);
    //
    */
   //x軸について
   Y = (y)*Math.cos(xtheta) - (z)*Math.sin(xtheta);// +(py*GRID_WIDTH-py*GRID_WIDTH*Math.cos(xtheta)+pz*GRID_WIDTH*Math.sin(xtheta));
   Z = (z)*Math.cos(xtheta) + (y)*Math.sin(xtheta);// +(pz*GRID_WIDTH-pz*GRID_WIDTH*Math.cos(xtheta)-py*GRID_WIDTH*Math.sin(xtheta));
   //
   z = Z;
   y = Y;
   //y軸について
   //Z = (z+pz*GRID_WIDTH)*Math.cos(ytheta) + (-x+px*GRID_WIDTH)*Math.sin(ytheta) + pz*GRID_WIDTH;
   //X = (z-pz*GRID_WIDTH)*Math.sin(ytheta) + (x-px*GRID_WIDTH)*Math.cos(ytheta) + px*GRID_WIDTH; 
   Z = (z)*Math.cos(ytheta) - (x)*Math.sin(ytheta);// +(pz*GRID_WIDTH-pz*GRID_WIDTH*Math.cos(ytheta)+px*GRID_WIDTH*Math.sin(ytheta));
   X = (x)*Math.cos(ytheta) + (z)*Math.sin(ytheta);// +(px*GRID_WIDTH-px*GRID_WIDTH*Math.cos(xtheta)-pz*GRID_WIDTH*Math.sin(xtheta));
   //
   z = Z;
   x = X;
   //z軸について
   X = (x)*Math.cos(ztheta) - (y)*Math.sin(ztheta);// +(px*GRID_WIDTH-px*GRID_WIDTH*Math.cos(xtheta)+py*GRID_WIDTH*Math.sin(xtheta));
   Y = (y)*Math.cos(ztheta) + (x)*Math.sin(ztheta);// +(py*GRID_WIDTH-py*GRID_WIDTH*Math.cos(xtheta)-px*GRID_WIDTH*Math.sin(xtheta));
   //
    xyz[0] = X+ornx;
    xyz[1] = Y+orny;
    xyz[2] = Z+ornz; 

    return xyz;
}
function drawLine(x,y,z,X,Y,Z,width,color){
    let xs,ys,xe,ye,xyz;

    xyz = new Array(3);

    xyz = to_3d_2d(x,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);//xz
    xs = xyz[0];
    ys = xyz[1];

    xyz = to_3d_2d(X,Y,Z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
    xe = xyz[0];
    ye = xyz[1]; 

    ctx.beginPath();
    ctx.moveTo(xs,ys);
    ctx.lineTo(xe, ye);
    ctx.strokeStyle = color;
    ctx.lineWidth = width ;
    ctx.stroke(); 
}
function DrawLineInSpase(){
    let i,j,k,xs,ys,xe,ye,xyz;
    let xyz1 = new Array(3);
    let xyz2 = new Array(3);
    let squareWidth=N;
    //console.log("drawing line on canvas.\n");


    for(k=0;k<=N;k+=SPAN_H){
        //drawLine(i,k,0,i,k,N,0.3,"red");//xz
        //drawLine(0,k,i,N,k,i,0.3,"red");
        //drawLine(i,0,k,i,N,k,0.2,"black");//xy
        //drawLine(0,i,k,N,i,k,0.2,"black");
        //drawLine(k,i,0,k,i,N,0.2,"black");//yz
        //drawLine(k,i,N,k,i,0,0.2,"black");
        ctx.beginPath();
        xyz1 = to_3d_2d(0,k,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(squareWidth,k,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(squareWidth,k,squareWidth,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(0,k,squareWidth,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        ctx.fillStyle = "rgba(256,0,0,0.1)";
        ctx.fill();
        xyz1 = to_3d_2d(0,0,k,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        /*
        ctx.beginPath();
        xyz1 = to_3d_2d(0,0,k,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(squareWidth,0,k,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(squareWidth,squareWidth,k,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(0,squareWidth,k,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        ctx.fillStyle = "rgba(0,256,256,0.01)";
        ctx.fill();

        ctx.beginPath();
        xyz1 = to_3d_2d(k,0,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(k,squareWidth,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(k,squareWidth,squareWidth,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        xyz1 = to_3d_2d(k,0,squareWidth,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz1[0],xyz1[1]);
        ctx.fillStyle = "rgba(0,0,256,0.1)";
        ctx.fill();
        */
    }
}
function DrawMainLine(){
    drawLine(0,0,0,N,0,0,3,"black");
    drawLine(0,0,0,0,N,0,3,"black");
    drawLine(0,0,0,0,0,N,3,"black");
    ctx.font = '48px serif';
    ctx.fillStyle = "black";
    ctx.fillText("x",to_3d_2d(N,0,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0]+10,to_3d_2d(N,0,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]+10);
    ctx.fillText("y",to_3d_2d(0,N,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0]+10,to_3d_2d(0,N,0,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]+10);
    ctx.fillText("z",to_3d_2d(0,0,N,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0]+10,to_3d_2d(0,0,N,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]+10);
}
function DrawRect(x,y,z,width,color1,color2,line){
    if((Math.abs(ytheta)>Math.PI/2)&&(Math.abs(ytheta)<Math.PI*3/2)){
    ctx.beginPath();//xy
    ctx.moveTo(to_3d_2d(x,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x+width,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x+width,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = line;
    ctx.stroke();
    }

    if((Math.abs(ytheta)<=Math.PI/2)||(Math.abs(ytheta)>=3*Math.PI/2)){
        ctx.beginPath();//xy//z
        ctx.moveTo(to_3d_2d(x,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.lineTo(to_3d_2d(x+width,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.lineTo(to_3d_2d(x+width,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.lineTo(to_3d_2d(x,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.fillStyle = color2;//2
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = line;
        ctx.stroke();
    }

    if((Math.abs(ytheta)<2*Math.PI)&&(Math.abs(ytheta)>Math.PI)){
    ctx.beginPath();//zy
    ctx.moveTo(to_3d_2d(x,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.fillStyle = color2;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = line;
    ctx.stroke();
    }

    if((Math.abs(ytheta)<=Math.PI)&&(Math.abs(ytheta)>=0)){
        ctx.beginPath();//zy//x
        ctx.moveTo(to_3d_2d(x+width,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.lineTo(to_3d_2d(x+width,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.lineTo(to_3d_2d(x+width,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.lineTo(to_3d_2d(x+width,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = line;
        ctx.stroke();
    }

    if((Math.abs(xtheta)>=Math.PI/2)||(Math.abs(xtheta)<=3*Math.PI/2)){
    ctx.beginPath();//xz
    ctx.moveTo(to_3d_2d(x,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x+width,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x+width,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = line;
    ctx.stroke();
    }

    if((Math.abs(ztheta)<Math.PI/2)||(Math.abs(ztheta)>3*Math.PI/2)){
    ctx.beginPath();//xz//y
    ctx.moveTo(to_3d_2d(x,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x+width,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y+width,z+width,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.lineTo(to_3d_2d(x+width,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(x+width,y+width,z,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1]);
    ctx.fillStyle = color2;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = line;
    ctx.stroke();
    }
}
function OperateDegree(){
    let m = 5;
    if(key[90]==1)degreeX+=m*Math.PI/360;
    if(key[88]==1)degreeY+=m*Math.PI/360;
    if(key[67]==1)degreeZ+=m*Math.PI/360;
    if(key[86]==1)degreeX+=Math.PI*2-m*Math.PI/360;
    if(key[66]==1)degreeY+=Math.PI*2-m*Math.PI/360;
    if(key[78]==1)degreeZ+=Math.PI*2-m*Math.PI/360;
    ////console.log("key[89]="+"%d",key[89]);
    //console.log("degreeY="+"%d"+"π",degreeY/Math.PI);
    let n=25;//25
    if(key[73]==1){
        /*
        MainDegreeX -= Math.PI*2-n*Math.PI/360;
        MainDegreeZ += Math.PI*2-n*Math.PI/360;
        */
        //MainDegreeX += Math.PI/6
        //MainDegreeZ += Math.PI/6
       //MainDegreeZ-=(Math.PI*2-n*Math.PI/360);//PlaneDegreeY += //(Math.PI*2-n*Math.PI/360)%(Math.PI/2);
       
       //if(0<py-SPEED-1)py -= parseInt(SPEED+1);
       if(parseInt(N/GRID_WIDTH)>py+SPEED){
        py += parseInt(SPEED);
        //ORN_Y += parseInt(SPEED)*GRID_WIDTH;
       }

    }
    if(key[74]==1){
        MainDegreeY = (MainDegreeY+(Math.PI*2-n*Math.PI/360))%(Math.PI*2);
        //degreeY -= Math.PI*2-n*Math.PI/360;
    }
    if(key[75]==1){
        /*
        MainDegreeX += Math.PI*2-n*Math.PI/360;
        MainDegreeZ -= Math.PI*2-n*Math.PI/360;
        */
       if(0<py-SPEED){
            py -= parseInt(SPEED);
            //ORN_Y -= parseInt(SPEED)*GRID_WIDTH;
       }
    }
    if(key[76]==1){
        MainDegreeY = (MainDegreeY+(Math.PI*2-n*Math.PI/360))%(Math.PI*2);
        //degreeY += Math.PI*2-n*Math.PI/360;
    }
}
function AutoOperatePlane(){
    xtheta = MainDegreeX%(Math.PI*2);
    ytheta = MainDegreeY%(Math.PI*2);
    ztheta = MainDegreeZ%(Math.PI*2);
    //console.log("ztheta = %d",ztheta);
    let xyz = new Array(3);
    //let xyz2 = new Array(3);

    //xyz2 = to_3d_2d(TopX+R,TopY,TopZ,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
     //xyz = to_3d_2d(xyz2[0],xyz2[1],xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
    /*
    if(px<parseInt(N/GRID_WIDTH)-1)if(key[81]==1)px++;
    if(px>0)if(key[65]==1)px--;
    if(py<parseInt(N/GRID_WIDTH)-1)if(key[87]==1)py++;
    if(py>0)if(key[83]==1)py--;
    if(pz<parseInt(N/GRID_WIDTH)-1)if(key[69]==1)pz++;
    if(pz>0)if(key[68]==1)pz--;
    */
    let cx,cy,cz;
    let xp=0,yp=0,zp=0;
    cz = pz-parseInt(SPEED*Math.sin(ytheta));
    cy = py+parseInt(SPEED*Math.sin(ztheta));
    cx = px+parseInt(SPEED*Math.cos(ytheta));
    //console.log("0--ornx,orny=%d,%d",ORN_X,ORN_Y);
    zp = pz;
    pz -= parseInt(SPEED*Math.sin(ytheta));
    yp = py;
    py += parseInt(SPEED*Math.sin(ztheta));
    //console.log("SPEED*Math.sin(ztheta)=%d",SPEED*Math.sin(ztheta));
    //console.log("yp=%d",yp);
    xp = px;
    px += parseInt(SPEED*Math.cos(ytheta));
    //console.log("2--ornx,orny=%d,%d",ORN_X,ORN_Y);
    if(px<0)px=0;
    if(py<0)py=0;
    if(pz<0)pz=0; 
    if(px>parseInt(N/GRID_WIDTH))px=parseInt(N/GRID_WIDTH);
    if(py>parseInt(N/GRID_WIDTH))py=parseInt(N/GRID_WIDTH);
    if(pz>parseInt(N/GRID_WIDTH))pz=parseInt(N/GRID_WIDTH);

    xyz = to_3d_2d(-(px-xp)*GRID_WIDTH,-(py-yp)*GRID_WIDTH,-(pz-zp)*GRID_WIDTH,degreeX,degreeY,degreeZ,0,0,0);
    console.log("1--xp,yp,zp=%d,%d,%d",xp,yp,zp);
    //console.log("1--ornx,orny=%d,%d",ORN_X,ORN_Y);
    console.log("theta=%d,%d,%d",xtheta,ytheta,ztheta);
    console.log("1--xyz[0],xyz[1]=%d,%d",xyz[0],xyz[1]);
    //ORN_X += xyz[0];
    //ORN_Y += xyz[1];

    if(key[87]==1)if(SPEED+SPEEDW<=MAX_SPEED)SPEED+=SPEEDW;//w
    if(key[83]==1)if(SPEED-SPEEDW>=0)SPEED-=SPEEDW;//s
    if((SPEED-0.05>=0)&&(key[87]!=1))SPEED-=0.05;
    else if((SPEED<=0.05)&&(key[87]!=1))SPEED = 0;
    //crash();
    //console.log("px,py,pz=%d,%d,%d",px,py,pz);
    if(py>0) if((key[73]!=1)||(SPEED==0)){
        py -= parseInt((tmr%11)*GRAVITY);
        //ORN_Y -= parseInt((tmr%11)*GRAVITY)*GRID_WIDTH;
    }
    TopX = px*GRID_WIDTH;
    TopY = py*GRID_WIDTH;
    TopZ = pz*GRID_WIDTH;
}
function msl(){
    let msls = 10;
    let ytheta = MainDegreeY % Math.PI*2;
    if(tmr%10==0){
        if(key[32]==1){
            PlaneMisselX[numP] = px*GRID_WIDTH;
            PlaneMisselY[numP] = py*GRID_WIDTH;
            PlaneMisselZ[numP] = pz*GRID_WIDTH;
            PlaneMisselXs[numP] = msls*Math.cos(ytheta);
            PlaneMisselYs[numP] = -3;
            PlaneMisselZs[numP] = msls*Math.sin(ytheta);
            console.log("numP=%d ytheta=%d---------------------------------------------msl=%d,%d,%d",numP,ytheta,PlaneMisselXs[numP],PlaneMisselYs[numP],PlaneMisselZs[numP]);
            PlaneMisselOn[numP] = 1;
            numP = (numP+1)%100;
        }
    }
    for(let i=0;i<numP;i++){
        if(PlaneMisselX[i]>N)PlaneMisselOn[i]=0;
        else {
            if(PlaneMisselOn[i]==1){
                PlaneMisselX[i] += PlaneMisselXs[i];
                PlaneMisselY[i] += PlaneMisselYs[i];
                PlaneMisselZ[i] += PlaneMisselZs[i];
                ctx.beginPath();
                ctx.arc(to_3d_2d(PlaneMisselX[i],PlaneMisselY[i],PlaneMisselZ[i],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[0],to_3d_2d(PlaneMisselX[i],PlaneMisselY[i],PlaneMisselZ[i],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0)[1],10,0,Math.PI*2,false);
                ctx.fillStyle = "orange";
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.lineWidth = 5;
                ctx.stroke();
            }
        }
    }
}
function hpgage(x,y){
    let i;
    let w=15,h=25,span=5;
    for(i=0;i<HP;i++){
        ctx.beginPath();
        ctx.rect(x+i*(w+span),y,w,h);
        ctx.fillStyle = "red";
        ctx.fill()
    }
    
    for(i=0;i<mainhp;i++){
        ctx.beginPath();
        ctx.rect(x+i*(w+span),y,w,h);
        ctx.fillStyle = "green";
        ctx.fill()
    }

    ctx.fillStyle = "green";
    ctx.font = "50pt serif";
    ctx.fillText("HP",x,y);    
}
function accell(x,y){
    let i;
    let w=20,h=100,span=5;
    let sp = SPEEDW*2;
    for(i=0;i<MAX_SPEED/sp;i++){
        ctx.beginPath();
        ctx.rect(x,y-i*(w+span),h,w);
        ctx.fillStyle = "gray";
        ctx.fill()
    }
    
    for(i=0;i<SPEED/sp;i++){
        ctx.beginPath();
        ctx.rect(x,y-i*(w+span),h,w);
        ctx.fillStyle = "red";
        ctx.fill()
    }
    ctx.fillStyle = "black";
    ctx.font = "50pt serif";
    ctx.fillText("Speed",x-100,y);  
}
function init_charactor(){
    //main_charactor
}
function charactor(x,y,z,id){
    let X,Y,xyz;
    xyz = new Array(3);
    xyz = to_3d_2d(x*GRID_WIDTH,y*GRID_WIDTH,z*GRID_WIDTH,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
    X = xyz[0];
    Y = xyz[1];

    //console.log("charactor x,y = "+"%d"+","+"%d",X,Y);

    if(id==1){//MainCharactor//
        /*
        ctx.beginPath();
        ctx.arc(X,Y,10,0,Math.PI*2,false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.stroke();
        */
        let xyz = new Array(3);
        let xyz2 = new Array(3);

        let thickness = 10;

        ctx.beginPath();
        xyz = to_3d_2d(TopX,TopY-R*Math.sin(PlaneDegreeY)-thickness/2,TopZ,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.arc(xyz[0],xyz[1],5,0,Math.PI*2,false);
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.beginPath();
        xyz = to_3d_2d(TopX,TopY-R*Math.sin(PlaneDegreeY),TopZ,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,0,-T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        //xyz = to_3d_2d(LeftX,LeftY,LeftZ,degreeX,degreeY,degreeZ);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,0,T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        //xyz = to_3d_2d(RightX,RightY,RightZ,degreeX,degreeY,degreeZ);
        ctx.lineTo(xyz[0],xyz[1]);

        ctx.fillStyle = "green";
        ctx.fill();
        //-------------------------------------------------------------------------//
        ctx.beginPath();
        xyz = to_3d_2d(TopX,TopY-thickness-R*Math.sin(PlaneDegreeY),TopZ,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,-thickness,-T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY-thickness+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,-thickness,T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY-thickness+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        ctx.fillStyle = "green";
        ctx.fill();
        //-------------------------------------------------------------------------//
        ctx.beginPath();
        xyz = to_3d_2d(TopX,TopY-R*Math.sin(PlaneDegreeY),TopZ,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz[0],xyz[1]);

        xyz = to_3d_2d(TopX,TopY-thickness-R*Math.sin(PlaneDegreeY),TopZ,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,-thickness,T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY-thickness+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,0,T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        ctx.fillStyle = "darkgreen";
        ctx.fill();
        //-------------------------------------------------------------------------//
        ctx.beginPath();
        xyz = to_3d_2d(TopX,TopY-R*Math.sin(PlaneDegreeY),TopZ,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz[0],xyz[1]);

        xyz = to_3d_2d(TopX,TopY-thickness-R*Math.sin(PlaneDegreeY),TopZ,degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,-thickness,-T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY-thickness+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,0,-T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        ctx.fillStyle = "darkgreen";
        ctx.fill();
        //-------------------------------------------------------------------------//
        ctx.beginPath();
        xyz2 = to_3d_2d(-R,0,-T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,0,T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1],TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,-thickness,T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1]-thickness,TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.lineTo(xyz[0],xyz[1]);

        xyz2 = to_3d_2d(-R,-thickness,-T,MainDegreeX,MainDegreeY,MainDegreeZ,0,0,0);
        xyz = to_3d_2d(TopX+xyz2[0],TopY+xyz2[1]-thickness,TopZ+xyz2[2],degreeX,degreeY,degreeZ,ORN_X,ORN_Y,0);
        ctx.moveTo(xyz[0],xyz[1]);

        ctx.fillStyle = "green";
        ctx.fill();
    }
    else if(id==2){
        ctx.beginPath();
        ctx.arc(X,Y,10,0,Math.PI*2,false);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    else{
        DrawRect(x*GRID_WIDTH,y*GRID_WIDTH,z*GRID_WIDTH,20,"green","seagreen",1);
    }
}
function crash(){
    if((px<=0)||(px>=parseInt(N/GRID_WIDTH))||(py<=0)||(py>=parseInt(N/GRID_WIDTH))||(pz<=0)||(pz>=parseInt(N/GRID_WIDTH))){
        if(tmr%5==0)mainhp--;
    }
}
function reflesh(){
    mainhp = HP;
    map[pz][py][px] = 0;
    px = 30;
    py = 30;
    pz = 30;
    map[pz][py][px] = 1;
    SPEED = 0;
    MainDegreeX = 0;
    MainDegreeY = 0;
    MainDegreeZ = 0;
    PlaneDegreeY = 0;
    degreeX = Math.PI+Math.PI/15;
    degreeY = Math.PI/4;
    degreeZ = Math.PI/15;
    
    DrawMainLine();
    charactor(px,py,pz,1);
    for(i=0;i<EnemyNum;i++){
        if(EnemyID[i]!=0){
            charactor(EnemyX[i],EnemyY[i],EnemyZ[i],EnemyID[i]);
        }
    }
}
function put_enemy(x,y,z,id){
    let DontPut = 0;
    for(let i=0;i<EnemyNum;i++){
        if(EnemyID[i]==0)break;
        if(x==EnemyX[i]){
            if(y==EnemyY[i]){
                if(z==EnemyZ[i]){
                    DontPut = 1;
                }
            }
        }
    }
    if(DontPut==0){
        EnemyID[Enemy] = id;
        EnemyX[Enemy] = x;
        EnemyY[Enemy] = y;
        EnemyZ[Enemy] = z;
        Enemy = (Enemy+1)%EnemyNum;
    }
}
function parameta(x,y,){
    let spanx = 60;
    let spany = 30;
    xtheta = MainDegreeX%(Math.PI*2);
    ytheta = MainDegreeY%(Math.PI*2);
    ztheta = MainDegreeZ%(Math.PI*2);
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.font = "30px serif";
    ctx.fillText("<parameta>",x-spanx-spanx/2,y-spany);
    ctx.fillText("x=",x-spanx,y);
    ctx.fillText(px*GRID_WIDTH,x,y);
    ctx.fillText("y=",x-spanx,y+spany);
    ctx.fillText(py*GRID_WIDTH,x,y+spany);
    ctx.fillText("z=",x-spanx,y+spany*2);
    ctx.fillText(py*GRID_WIDTH,x,y+spany*2);
    ctx.fillText("θ=",x-spanx-10,y+spany*3);
    ctx.fillText(Math.round(ytheta*100)/100,x+10,y+spany*3);
    ctx.fillText("speed=",x-spanx-10,y+spany*4);
    ctx.fillText((Math.round(SPEED*100))+"km/h",x+10*3,y+spany*4);

}
function alert(x,y){
    let a=10;
    if((px<a)||(px>parseInt(N/GRID_WIDTH)-a)||(py<a)||(py>parseInt(N/GRID_WIDTH)-a)||(pz<a)||(pz>parseInt(N/GRID_WIDTH)-a)){
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.font = "30px serif";
        ctx.fillText("Warning!",x,y);
    }
}
function mainloop(){
    let i,j,k,stime,ptime;
    stime = new Date().getTime();

    tmr++;

    cvw = window.innerWidth;
    cvh = window.innerHeight;
    cvs.width = cvw;
    cvs.height = cvh;

    if(tmr>=0){
        ctx.clearRect(0,0,N*N,N*N);
        OperateDegree();
        DrawMainLine();
        AutoOperatePlane();
        DrawMainLine();
        charactor(px,py,pz,1);
        for(i=0;i<EnemyNum;i++){
            if(EnemyID[i]!=0){
                charactor(EnemyX[i],EnemyY[i],EnemyZ[i],EnemyID[i]);
            }
        }
        msl();
        DrawLineInSpase();
        console.log("ytheta=%sπ",(Math.abs(ytheta/Math.PI)).toFixed(3));
        if(mainhp<=0){
            ctx.clearRect(0,0,N*N,N*N);
            reflesh();
            ctx.beginPath();
            ctx.font = "100pt serif";
            ctx.fillStyle = "blue";
            ctx.fillText("GameOver",window.innerWidth/2,innerHeight/2);
            ctx.font = "100pt serif";
            ctx.fillStyle = "red";
            ctx.fillText("GameOver",window.innerWidth/2+10,innerHeight/2+10);
            ctx.font = "100pt serif";
            ctx.fillStyle = "green";
            ctx.fillText("GameOver",window.innerWidth/2-10,innerHeight/2-10);
            tmr = -100;
        }
           hpgage(60,window.innerHeight-30);
           accell(window.innerWidth-150,window.innerHeight-50);
           parameta(100,100);
           alert(30,300);
    }
    ptime = new Date().getTime() - stime;
    setTimeout(mainloop,parseInt(1000/FPS)-ptime);
}
init();
canvas();
put_enemy(0,0,0,2);
put_enemy(0,30,30,3);
put_enemy(0,30,30,2);


/*
for(i=0;i<parseInt(N/GRID_WIDTH);i++){
    for(j=0;j<parseInt(N/GRID_WIDTH);j++){
            for(k=0;k<parseInt(N/GRID_WIDTH);k++){
            //console.log("map["+"%d"+"]["+"%d"+"]["+"%d"+"]="+"%d",i,j,k,map[i][j][k]);
        };
    };
};
*/
mainloop();
