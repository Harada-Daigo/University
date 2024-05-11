var bgX=0;
var state=0;
var stateTmr=0;
var HP = 10;
var cvw = window.innerWidth;
var cvh = window.innerHeight;
var x=cvw/3;
var y=cvh/2-60;
var FPS = 30;
var tmr=0;
var auto = 0;
var score = 0;
var idx = 0
var SaveTmr;
//キーボード
var key = new Array(256);
document.addEventListener("keydown",onkey);
document.addEventListener("keyup",offKey);
//ミサイル
var mslMode = 0;
var mslSpX = 40;
var mslSpY = 0;
var MSL_MAX = 100;
var mslType = new Array(MSL_MAX);
var mslX = new Array(MSL_MAX);
var mslY = new Array(MSL_MAX);
var mslXp = new Array(MSL_MAX);
var mslYp = new Array(MSL_MAX);
var mslF = new Array(MSL_MAX);
var mslNum = 0;
var TheNumMsl=1;
//敵
var tmpo = 20;
var obj_MAX = 100;
var objHP = new Array(obj_MAX);
var typeObj = new Array(obj_MAX);
var imgObj = new Array(obj_MAX);
var objX = new Array(obj_MAX);
var objY = new Array(obj_MAX);
var objXp = new Array(obj_MAX);
var objYp = new Array(obj_MAX);
var objF = new Array(obj_MAX);
var objNum = 0;
//item
var item_MAX = 10;
var itemSp = 20;
var typeItem = new Array(item_MAX);
var imgItem = new Array(item_MAX);
var itemX = new Array(item_MAX);
var itemY = new Array(item_MAX);
var itemXp = new Array(item_MAX);
var itemYp = new Array(item_MAX);
var itemF = new Array(item_MAX);
var itemNum = 0;
//efect
var efect_MAX = 100;
var efectImg = new Array(efect_MAX);
var efectX = new Array(efect_MAX);
var efectY = new Array(efect_MAX);
var efectN = new Array(efect_MAX);
var efectNum = 0;
//画像
var ImageDirectory = "image\\";
var ImageMAX =100;
var img = new Array(ImageMAX);
var imgMsl = new Array(MSL_MAX);
var srcs = [
    "bg.png",
    "spaceship.png",
    "missile.png",
    "enemy1.png",//3
    "enemy2.png",//4
    "enemy3.png",//5
    "enemy4.png",//6
    "enemy0.png",//7
    "explode.png",
    "item0.png",
    "item1.png",
    "item2.png",
    "laser.png",//12
];

//画像を読み込む
function LoadImageObj(){
    for (let i=0;i<obj_MAX;i++){
        imgObj[i] = new Image();
    }
}
function LoadImageMsl(){
    for (let i=0;i<MSL_MAX;i++){
        imgMsl[i] = new Image();
    }
}
function LoadImage(){
    for (let i=0;i<ImageMAX;i++){
        img[i] = new Image();
    }
}
//-------
function main(){
    canvas();
    init();
    mainloop();
};
function canvas(){
    cvs = document.getElementById("canvas");
    ctx = cvs.getContext('2d');
    cvs.width = cvw;
    cvs.height = cvh;
}
function init(){
    clrKey();
    efect_init();
    initHP();
    LoadImage();
    LoadImageMsl();
    LoadImageObj();
    init_mslF();
    drawBG(1);
    ship();
    obj_init();
    initItem();
};

function mainloop(){
    switch(idx){
        case 0:
            var stime = new Date().getTime();
            tmr++

            screen();
            drawBG(1);

            ship();
            autoMsl(tmr)
            if(mslMode==1&&tmr-SaveTmr>100)mslMode=0;

            if(tmr-stateTmr>=150)state=0;
            if(tmpo==4)tmpo=26;
            if(tmr%500==0)tmpo--;
            if(tmr%tmpo==0){
                let OXp,Ohp;
                switch(parseInt(Math.random()*3.9+3)){
                    case 6:
                        OXp = -6;
                        Ohp=100;
                        break;
                    case 5:
                        Ohp=3;
                        OXp=-12;
                        break;
                    case 4:
                        Ohp=5;
                        OXp=-12;
                        break;
                    default:
                        OXp = -12;
                        Ohp=1;
                        break;
                }
                setObj(cvw,100+parseInt(Math.random()*(cvh-250)),OXp,0,Otype,Ohp);
            }
            //itemの設置
            if(Math.random()*100<=1) setItem(cvw,100+parseInt(Math.random()*(cvh-250)),-itemSp,0,9+parseInt(Math.random()*2.9));

            animate_efect();
            moveMSL();
            moveObj();
            moveItem();

            var ptime = new Date().getTime()-stime;

            if (parseInt(1000/FPS)>=ptime) ptime=0;
            if(HP <= 0) idx=1;
            break;
        case 1:
            ctx.font = "100px bold monospace";
            ctx.fillStyle = "red"
            ctx.textAlign = "center";
            ctx.fillText("Game Over",cvw/2,cvh/2);
            setTimeout(()=>{
                HP=10;
                idx=0;
                init();                
            },2000);
            break;
    }
    setTimeout(()=>{mainloop()},parseInt(1000/FPS)-ptime);

};
//-----
function drawBG(spd){
    bgX = (bgX + spd) % cvw;
    img[0].src = ImageDirectory + srcs[0];
    img[0].onload = function(){
        ctx.drawImage(img[0],0,0,img[0].naturalWidth,img[0].naturalHeight, -bgX,0,cvw,cvh);
        ctx.drawImage(img[0],0,0,img[0].naturalWidth,img[0].naturalHeight, cvw-bgX,0,cvw,cvh);

        drawHP();
        textbox("score:"+score,"48",50,50,"white");

        var autoText;
        if(auto==1)autoText="Auto";
        else autoText="Normal";

        textbox("Missile:"+autoText,"48",50+300,50,"white");

        textbox("Tmpo:"+tmpo,"48",50+300+400,50,"white");

        if(state==0)text="普通";
        else text = "無敵";
        textbox("状態:"+text,"48",50+300+400,cvh-25,"white");
    };
};
function ship(){
    var spd =25;
    var spdx=0;
    var spdy=0;

    //キーボードをよみ見とる
    if (key[65] > 0){spdx=-spd;}
    if (key[68] > 0){spdx=spd;}
    if (key[87] > 0){spdy=-spd;}
    if (key[83] > 0){spdy=spd;}
    if ((key[32] == 1)&&(auto==0)){
        for(let i=0;i<TheNumMsl;i++){
            setMSL(x+80,y+30+20*i-20*(TheNumMsl/2),mslSpX,mslSpY,2+mslMode*10);key[32]--;
        }
    }
    if (key[13] > 0){auto++;auto%=2;key[13]=0;};

    x+=spdx;
    y+=spdy;

    xyscope();

    img[1].src = ImageDirectory + srcs[1];
    img[1].onload = function(){
        ctx.drawImage(img[1],x,y);

        for (let j = 0;j<obj_MAX;j++){
            if((objF[j]==true)){
                //console.log("true通過！");
                if ( Math.sqrt((x+46-(objX[j]+imgObj[j].naturalWidth/2))*(x+46-(objX[j]+imgObj[j].naturalWidth/2))+(y+30-(objY[j]+imgObj[j].naturalHeight/2))*(y+30-(objY[j]+imgObj[j].naturalHeight/2))) < ((92+60)/4 + (imgObj[j].naturalWidth+imgObj[j].naturalHeight)/4))
                {
                    //console.log("xを通過！");)
                        objF[j]=false;

                        HP=HP-1+state;
                        TheNumMsl=1;
                        score+=100;
                        efect_set(objX[j],objY[j]);
                }
                    ///console.log("yを通過！");
            }
        }
    }
};

function xyscope(){
    wship=img[1].naturalWidth;
    hship=img[1].naturalHeight;

    if (x<=0){x=0;}
    if (x>=cvw-wship){x=cvw-wship;}
    if (y>=cvh-hship){y=cvh-hship;}
    if (y<=0){y=0;}
};

function init_mslF(){
    for (var i=0;i<MSL_MAX;i++){
        mslF[i]=false;
    };
};

function setMSL(x,y,xp,yp,type){
    //console.log("setMSl");
    mslX[mslNum] = x;
    mslY[mslNum] = y;
    mslXp[mslNum] = xp;
    mslYp[mslNum] = yp;
    mslType[mslNum] = type;
    mslF[mslNum] = true;
    //LOG
    /*console.log(
        mslNum+"\n"+
        mslX[mslNum]+"\n"+
        mslY[mslNum]+"\n"+
        mslXp[mslNum]+"\n"+
        mslYp[mslNum]+"\n"+
        mslF[mslNum]+"\n"
    );
    */
    //
    mslNum = (mslNum+1)%MSL_MAX;
};

function moveMSL(){
    for (let i = 0;i<MSL_MAX;i++){
        if (mslF[i] == true){

            mslX[i] += mslXp[i];
            mslY[i] += mslYp[i];

            imgMsl[i].onload = function(){
                //console.log("i="+i)
                //console.log("x="+mslX[i]+"y="+mslY[i]+"に画像を配置します。");
                ctx.drawImage(imgMsl[i],mslX[i],mslY[i]);
            };
            imgMsl[i].src = ImageDirectory + srcs[mslType[i]];

            if (mslX[i] > cvw) {mslF[i] = false;};
            for (let j = 0;j<obj_MAX;j++){
                if((mslF[i]==true)&&(objF[j]==true)){
                    let disX = ((objX[j]+imgObj[j].naturalWidth/2)-(mslX[i]+60));
                    let disY = ((objY[j]+imgObj[j].naturalHeight/2)-(mslY[i]+imgMsl[i].naturalHeight/2));
                    let r = (imgObj[j].naturalWidth+imgObj[j].naturalHeight)/4;
                    if(Math.sqrt(disX*disX+disY*disY)<=r){                /*
                    //console.log("true通過！");
                    if ((mslX[i]+60 >= objX[j])&&(mslX[i]+60 <= objX[j]+imgObj[j].naturalWidth)){
                        //console.log("xを通過！");
                        if((mslY[i]+12 > objY[j])&&(mslY[i]+12 < objY[j]+imgObj[j].naturalHeight))*/
                        objHP[j]--;
                        if(typeObj[j]!=6&&objHP[j]==0)objF[j]=false;
                        if(mslType[i]==2)mslF[i]=false;
                        score+=100;
                        efect_set(objX[j],objY[j]);
                        ///console.log("yを通過！");
                    //}
                    }
                }
            }
        };
    };
};
function autoMsl(timeA){
    //console.log(timeA);
    if ((auto == 1)&&(parseInt(timeA) % 8 == 0)){
        for(let i=0;i<TheNumMsl;i++){
            setMSL(x+80,y+30+20*i-20*(TheNumMsl/2),mslSpX,mslSpY,2+mslMode*10);
        }
        key[32]--;};
}

function clrKey() {
	for(let i = 0; i < 256; i++) key[i] = 0;
}
function onkey(e){
    key[e.keyCode]++;
    //console.log(e.code+":"+key[e.keyCode]);
}
function offKey(e){
    key[e.keyCode]=0;
    //console.log(e.code+":"+key[e.keyCode]);
}
function screen(){
    if (cvw != window.innerWidth){init();cvw=window.innerWidth;cvs.width = cvw;};
    if (cvh != window.innerHeight){init();cvw=window.innerHeight;cvs.height = cvh;};
}
function obj_init(){
    for(let i=0;i<obj_MAX;i++){
        objF[i] = false;
    }
}
function setObj(x,y,xp,yp,type,hp){
    objHP[objNum] = hp;
    typeObj[objNum] = type;
    objX[objNum] = x;
    objY[objNum] = y;
    objXp[objNum] = xp;
    objYp[objNum] = yp;
    objF[objNum] = true;
    objNum = (objNum + 1) % obj_MAX;
}
function moveObj(){
    for(let i=0;i<obj_MAX;i++){
        if(objF[i]==true){
            objX[i] += objXp[i];
            objY[i] += objYp[i];

            imgObj[i].src = ImageDirectory + srcs[typeObj[i]];
            imgObj[i].onload=function(){
                ctx.drawImage(imgObj[i],objX[i],objY[i]);
            }
            if (typeObj[i]==5&&Math.random()*100<3){setObj(objX[i],objY[i]+imgObj[i].naturalHeight/2,-mslSpX,0,7);};
            if (objX[i] < 0){objF[i]=false;};
        }
    }
}
function textbox(text,size,x,y,cal){
    ctx.beginPath();
    ctx.fillStyle=cal;
    ctx.font =size+"px bold monospace";
    ctx.fillText(text,x,y);
    ctx.closePath();
}
function efect_init(){
    for (let i=0;i<efect_MAX;i++){
        efectN[i]=0;
        efectImg[i]=new Image();
    }
}
function efect_set(x,y){
    efectX[efectNum] = x;
    efectY[efectNum] = y;
    efectN[efectNum]++;
    efectNum = (efectNum+1)%efect_MAX;
}
function animate_efect(){
    for (let i=0;i<efect_MAX;i++){
        if (efectN[i]>0){
            efectImg[i].src = ImageDirectory + srcs[8];
            efectImg[i].onload=function(){
                ctx.drawImage(efectImg[i],0+128*(efectN[i]-1),0,128,128,efectX[i],efectY[i],128,128);
                efectN[i]++
            }
        }
    }
}
function initHP(){
    for (let i=0;i<10;i++){
        ctx.fillStyle = "red";
        ctx.fillRect(20+i*30,cvh-60,20,40);
    }
}
function drawHP(){
    initHP();
    for (let i=0;i<HP;i++){
        ctx.fillStyle = "green";
        ctx.fillRect(20+i*30,cvh-60,20,40);
    }
    ctx.save();
}
function initItem(){
    for (let i=0;i<item_MAX;i++){
        itemF[i]=false;
        imgItem[i] = new Image();
    }
}
function setItem(x,y,xp,yp,type){
        itemX[itemNum] = x;
        itemY[itemNum] = y;
        itemXp[itemNum] = xp;
        itemYp[itemNum] = yp;
        typeItem[itemNum] = type;
        itemF[itemNum] = true;
        itemNum = (itemNum+1)%item_MAX;
}
function moveItem(){
    for(let i=0;i<item_MAX;i++){
        if (itemF[i]==true){
            itemX[i]+=itemXp[i];
            itemY[i]+=itemYp[i];
            imgItem[i].src = ImageDirectory + srcs[typeItem[i]];
            imgItem[i].onload = function(){
                ctx.drawImage(imgItem[i],itemX[i],itemY[i]);
            }
            if(itemX[i]<0) itemF[i]=false;

            let disX = (x+46-(itemX[i]+imgItem[i].naturalWidth/2));
            let disY = (y+30-(itemY[i]+imgItem[i].naturalHeight/2));
            let r = ((92+60)/4 + (imgItem[i].naturalWidth+imgItem[i].naturalHeight)/4);
            if ( Math.sqrt( disX*disX+disY*disY) <= r)
                {
                    //console.log("xを通過！");)
                        if(typeItem[i]==9){
                            if(HP<10) HP = HP+1;
                            else {state = 1;stateTmr=tmr;}
                        }
                        else if(typeItem[i]==10){
                            TheNumMsl+=1;
                            if (TheNumMsl>MSL_MAX)TheNumMsl=MSL_MAX;
                        }
                        else if(typeItem[i]==11){
                            mslMode=1;
                            SaveTmr = tmr;
                        };
                        itemF[i]=false;
                }
        }
    
    }
}
main();