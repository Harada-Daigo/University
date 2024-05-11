var WIDTH = 90;
var CHUNKs = 8; 

var map = new Array((WIDTH+1)*4);

var red = "rgba(255,0,0,0.5)";
var green = "rgba(0,255,0,0.5)";
var blue = "rgba(0,0,255,0.5)";
var orange = "rgba(255,150,50,0.5)";

var soldierRed = "rgba(255,0,0,1)";
var soldierGreen = "rgba(0,255,0,1)";
var soldierBlue = "rgba(0,0,255,1)";
var soldierOrange = "rgba(255,150,50,1)";

var marginX = 300;
var marginY = 30;

var FPS = 30;
function init(){
    cv = document.getElementById("canvas");
    ctx = cv.getContext("2d");
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    let i;
    for(i=0;i<(WIDTH+1)*CHUNKs;i++){
        map[i] = new Array((WIDTH+1)*CHUNKs);
    }
    ctx.beginPath();
    ctx.rect(marginX,marginY,(WIDTH+1)*CHUNKs,(WIDTH+1)*CHUNKs);
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    create_array();
    
    set_flag(WIDTH/2, WIDTH/2, 1);//1red,2blue,3green,4orange
    flag_scope(WIDTH/2, WIDTH/2, red);
    set_flag(WIDTH/2+(WIDTH+1)*(CHUNKs-1), WIDTH/2, 2);
    flag_scope((WIDTH/2)+(WIDTH+1)*(CHUNKs-1), WIDTH/2, blue);
    set_flag(WIDTH/2, WIDTH/2+(WIDTH+1)*(CHUNKs-1), 3);
    flag_scope(WIDTH/2, (WIDTH/2)+(WIDTH+1)*(CHUNKs-1), green);
    set_flag(WIDTH/2+(WIDTH+1)*(CHUNKs-1), WIDTH/2+(WIDTH+1)*(CHUNKs-1), 4);
    flag_scope((WIDTH/2)+(WIDTH+1)*(CHUNKs-1), (WIDTH/2)+(WIDTH+1)*(CHUNKs-1), orange);
}
function create_array(){
  let i,j;
  for(i=0;i<(WIDTH+1)*CHUNKs;i++){
    for(j=0;j<(WIDTH+1)*CHUNKs;j++){
      map[i][j]=0
    }
  }
}
function set_flag(x,y,color){
  map[y][x] = color; //flag
}
function flag_scope(x,y,color){
  ctx.beginPath();
  ctx.rect(marginX+x-(WIDTH/2),marginY+y-(WIDTH/2),WIDTH+1,WIDTH+1);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 0;
}
function move_xy(){
  let i,j,span;
  span = parseInt(Math.random()*100);
  for(i=0;i<(WIDTH+1)+CHUNKs;i++){
    for(j=0;j<(WIDTH+1)+CHUNKs;j++){
      if(map[i][j]==soldierRed||map[i][j]==soldierGreen||map[i][j]==soldierBlue||map[i][j]==soldierOrange){
        if(parseInt(Math.round())==0){
          if(parseInt(Math.round())==0){
            //x++
            if(0<=map[i][j+span]<(WIDTH+1)*CHUNKs){
              if(map[i][j+span]==0){
                map[i][j+span]=map[i][j];
                map[i][j]=0;
              }
            }
          }
          else{
            //y++
            if(0<=map[i+span][j]<(WIDTH+1)*CHUNKs){
              if(map[i+span][j]==0){
                map[i+span][j]=map[i][j];
                map[i][j]=0;
              }
            }
          }
        }
        else{
          if(parseInt(Math.round())==0){
            //x--
            if(0<=map[i][j-span]<(WIDTH+1)*CHUNKs){
              if(map[i][j-span]==0){
                map[i][j-span]=map[i][j];
                map[i][j]=0;
              }
            }
          }
          else{
            //y--
            if(parseInt(Math.round())==0){
              if(0<=map[i-span][j]<(WIDTH+1)*CHUNKs){
                if(map[i-span][j]==0){
                  map[i-span][j]=map[i][j];
                  map[i][j]=0;
                }
              }
            }
          }
        }
      }
    }
  }
}

function put_soldier(x,y,soldier){//miss miss miss//
  if(map[y][x]==0) map[y][x] = soldier;
}

function draw_soldier(){
  let color;
  for(i=0;i<(WIDTH+1)*CHUNKs;i++){
    for(j=0;j<(WIDTH+1)*CHUNKs;j++){
      if(map[i][j] ==soldierRed)color=soldierRed;
      else if(map[i][j] ==soldierGreen)color=soldierGreen;
      else if(map[i][j] ==soldierBlue)color=soldierBlue;
      else if(map[i][j] ==soldierOrange)color=soldierOrange;
    }
  }
  ctx.beginPath();
  ctx.arc(marginX+j,marginY+i,10,0,Math.PI*2,0);
  ctx.fillStyle = color;
  ctx.fill();
}

function main(){
  let i,j;
  for(i=0;i<(WIDTH+1)*CHUNKs;i++){
    for(j=0;j<(WIDTH+1)*CHUNKs;j++){
      if(map[i][j]==red ||map[i][j]==green || map[i][j]==blue || map[i][j]==orange){
        flag_scope(j,i,map[j][i]);
      }
    }
  }
  //put_soldier(parseInt(Math.random()*((WIDTH+1)*CHUNKs)),parseInt(Math.random()*((WIDTH+1)*CHUNKs)),soldierRed);
  put_soldier(10,0,soldierBlue);
  move_xy();
  draw_soldier();

  setTimeout(main,parseInt(1000/FPS));
}

init();
put_soldier(100,0,soldierOrange);
draw_soldier();
move_xy();
main();
