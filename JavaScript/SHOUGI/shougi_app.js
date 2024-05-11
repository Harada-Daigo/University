class App{
    constructor(){
        this.E = 1000;

        this.img = new Image();

        this.cv = document.getElementById( "canvas" );
        this.ctx = this.cv.getContext( "2d" );

        this.cv2 = document.getElementById( "sideCanvas1" );
        this.ctx2 = this.cv2.getContext( "2d" );

        this.cv3 = document.getElementById( "sideCanvas2" );
        this.ctx3 = this.cv3.getContext( "2d" );

        this.ww = window.innerWidth;
        this.wh = window.innerHeight;

        this.cv.width = 450;
        this.cv.height = 450;

        this.cw = this.cv.width;
        this.ch = this.cv.height;

        this.cv2.width = 40 * 4;
        this.cv2.height = 40 * 11;

        this.cv3.width = 40 * 4;
        this.cv3.height = 40 * 11;

        this.cw2 = this.cv2.width;
        this.ch2 = this.cv2.height;

        console.log( "->" , this.cw2 , this.ch2 );

        this.cv.style.position = "absolute";
        this.cv.style.left = ( this.ww / 2 - this.cw / 2 ) + "px";
        this.cv.style.top = ( this.wh / 2 - this.ch / 2 ) + "px";

        this.cv2.style.position = "absolute";
        this.cv2.style.backgroundColor = "#CD853F"; 
        this.cv2.style.left = ( this.ww / 2 + this.cw / 2 ) + 40 + "px";
        this.cv2.style.top = ( this.wh / 2 - this.ch / 2 ) + ( this.ch - this.ch2 ) / 2 + "px";

        this.cv3.style.position = "absolute";
        this.cv3.style.backgroundColor = "#CD853F"; 
        this.cv3.style.left = ( this.ww / 2 - this.cw / 2 ) - this.cv3.width - 40 + "px";
        this.cv3.style.top = ( this.wh / 2 - this.ch / 2 ) + ( this.ch - this.ch2 ) / 2 + "px";

        this.title = document.getElementById( "title" );
        this.title.style.position = "absolute";
        this.title.style.left = this.ww / 2 -  this.wh / 100 * 15  + "px";
        this.title.style.fontSize = "15vh";
        this.title.style.color = "white";

        this.they = document.getElementById( "they" );
        this.they.style.position = "absolute";
        this.they.style.left = ( this.ww / 2 - this.cw / 2 ) - this.cv3.width - 40 + this.cv3.width / 2 - this.wh / 100 * 4.5 + "px";
        this.they.style.top =  ( this.wh / 2 - this.ch / 2 ) + ( this.ch - this.ch2 ) / 2 - this.wh / 100 * 3 - 10 + "px";
        this.they.style.fontSize = "3vh";
        this.they.style.color = "white";

        this.you = document.getElementById( "you" );
        this.you.style.position = "absolute";
        this.you.style.left = ( this.ww / 2 - this.cw / 2 ) + this.cw + 40 + this.cw2 / 2 - this.wh / 100 * 4.5 + "px";
        this.you.style.top =  ( this.wh / 2 - this.ch / 2 ) + ( this.ch - this.ch2 ) / 2 - this.wh / 100 * 3 - 10 + "px";
        this.you.style.fontSize = "3vh";
        this.you.style.color = "white";

        this.map = [
            [ 107 , 106 , 105 , 104 , 101 , 104 , 105 , 106 , 107 ],
            [  0  , 102 ,  0  ,  0  ,  0  ,  0  ,  0  , 103 ,  0  ],
            [ 108 , 108 , 108 , 108 , 108 , 108 , 108 , 108 , 108 ],
            [  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ],
            [  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ],
            [  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ,  0  ],
            [  8  ,  8  ,  8  ,  8  ,  8  ,  8  ,  8  ,  8  ,  8  ],
            [  0  ,  3  ,  0  ,  0  ,  0  ,  0  ,  0  ,  2  ,  0  ],
            [  7  ,  6  ,  5  ,  4  ,  1  ,  4  ,  5  ,  6  ,  7  ]//王1飛2角3金4銀5佳6香7歩8　成る+50 相手+100
        ]
        this.Atmap = this.Generate_2d_List( 9 , 9 );
        for( let i = 0; i < 9; i++ ) for(let j = 0; j < 9; j++ ) this.Atmap[i][j] = 0;

        this.hu = [
            "normal",//normal specific mix
            [ 0 , 1 , 0 , 0 , 0 , 0 , 0 ,0 ]
        ];//xp,yp,xm,ym,xpyp,xpym,xmyp,xmym tokubatu
        this.kei = [
            "specific",
            [
                [ -1 , -2 ],
                [ 1 , -2 ]
            ]
        ];
        this.keisha = [
            "normal",
            [ 0 , 8 , 0 , 0 , 0 , 0 , 0 ,0 ]
        ];
        this.hisha = [
            "normal",
            [ 8 , 8 , 8 , 8 , 0 , 0 , 0 ,0 ]
        ];
        this.kaku = [
            "normal",
            [ 0 , 0 , 0 , 0 , 8 , 8 , 8 , 8 ]
        ];
        this.kin = [
            "normal",
            [ 1 , 1 , 1 , 1 , 1 , 0 , 1 , 0 ]
        ];
        this.gin = [
            "normal",
            [ 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 ]
        ];
        this.ou = [
            "normal",
            [ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
        ];

        this.PNG = new Array( 200 );
        for( let i = 0; i < 200; i++) this.PNG[i] = "無名駒.png";
        this.PNG[1] = "無名駒.png";
        this.IMAGE = new Array( 81 );
        for( let i = 0; i < 81; i++) {this.IMAGE[i] = new Image();}
        this.ImageNum = 0;
    }
    drawBan(){
        let i;
        this.ctx.beginPath();
        this.ctx.fillStyle = "orange";
        this.ctx.fillRect( 0 , 0 , this.cw , this.ch );

        this.ctx.beginPath();
        for( i = 0; i < 11; i++ ){
            this.ctx.moveTo( this.cw / 9 * i , 0 );
            this.ctx.lineTo( this.cw / 9 * i , this.cw );
            this.ctx.moveTo( 0 , this.ch / 9 * i );
            this.ctx.lineTo( this.ch ,this.ch / 9 * i );
        }
        this.ctx.stroke();

        this.ctx2.beginPath();
        for( i = 0; i < 6; i++ ){
            this.ctx2.moveTo( this.cw2 / 4 * i , 0 );
            this.ctx2.lineTo( this.cw2 / 4 * i , this.ch2 );
        }
        for( i = 0; i < 13; i++ ){
            this.ctx2.moveTo( 0 , this.ch2 / 11 * i );
            this.ctx2.lineTo( this.cw2 ,this.ch2 / 11 * i );
        }
        this.ctx2.stroke();

        this.ctx2.beginPath();
        for( i = 0; i < 6; i++ ){
            this.ctx3.moveTo( this.cw2 / 4 * i , 0 );
            this.ctx3.lineTo( this.cw2 / 4 * i , this.ch2 );
        }
        for( i = 0; i < 13; i++ ){
            this.ctx3.moveTo( 0 , this.ch2 / 11 * i );
            this.ctx3.lineTo( this.cw2 ,this.ch2 / 11 * i );
        }
        this.ctx3.stroke();
    }
    Generate_2d_List( x , y ){
        let j , array;
        array = new Array( y );
        for( j = 0; j < y; j++ ){
            array[j] = new Array( x );     
        }
        return array;
    }
    NormalAttack( koma , i , j , r ){
        let k;

        for( k = 1; k <= koma[0]; k++ ) {
            if( ( ( 0 <= j + r * k ) && ( j + r * k <= 8 ) ) ) {
                if( this.map[i][j + r * k] == 0 ) this.Atmap[i][j + r * k] = 1;
                else if( Math.abs( ( this.map[i][j + r * k] - ( this.map[i][j + r * k] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) ) >= 100 ) {
                    this.Atmap[i][j + r * k] = 1;
                    break;
                }
                else break;

            }
        }
        for( k = 1; k <= koma[1]; k++ ) {
            if( ( ( 0 <= i - r * k ) && ( i - r * k <= 8 ) )  ){
                if( this.map[i - r * k][j] == 0 )this.Atmap[i - r * k][j] = 1;
                else if( Math.abs( ( this.map[i - r * k][j] - ( this.map[i - r * k][j] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) ) >= 100 ){
                    this.Atmap[i - r * k][j] = 1;
                    break;
                }
                else break;
            }
        }
        for( k = 1; k <= koma[2]; k++ ) {
            if( ( ( 0 <= j - r * k ) && ( j - r * k <= 8 ) ) ) {
                if( this.map[i][j - r * k] == 0 )this.Atmap[i][j - r * k] = 1;
                else if( Math.abs( ( this.map[i][j - r * k] - ( this.map[i][j - r * k] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) )  >= 100 ){
                    this.Atmap[i][j - r * k] = 1;
                    break;
                }
                else break;
            }
        }
        for( k = 1; k <= koma[3]; k++ ) {
            if( ( ( 0 <= i + r * k ) && ( i + r * k <= 8 ) ) ) {
                if( this.map[i + r * k][j] == 0 ) this.Atmap[i + r * k][j] = 1;
                else if( Math.abs( ( this.map[i + r * k][j] - ( this.map[i + r * k][j] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) )  >= 100 ){
                    this.Atmap[i + r * k][j] = 1;
                    break;
                }
                else break;
            }
        }
        for( k = 1; k <= koma[4]; k++ ) {
            if( ( ( ( 0 <= i - r * k ) && ( i - r * k <= 8 ) ) && ( 0 <= j + r * k ) && ( j + r * k <= 8) ) ){
                if( this.map[i - r * k][j + r * k] == 0 ) this.Atmap[i - r * k][j + r * k] = 1;
                else if( Math.abs( ( this.map[i - r * k][j + r * k] - ( this.map[i - r * k][j + r * k] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) )  >= 100 ){
                    this.Atmap[i - r * k][j + r * k] = 1;
                    break;
                }
                else break;
            }
        }
        for( k = 1; k <= koma[5]; k++ ) {
            if( ( ( ( 0 <= i + r * k ) && ( i + r * k <= 8 ) ) && ( 0 <= j + r * k ) && ( j + r * k <= 8) ) ){
                if( this.map[i + r * k][j + r * k] == 0 ) this.Atmap[i + r * k][j + r * k] = 1;
                else if( Math.abs( ( this.map[i + r * k][j + r * k] - ( this.map[i + r * k][j + r * k] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) )  >= 100 ){
                    this.Atmap[i + r * k][j + r * k] = 1;
                    break;
                }
                else break;
            }
        }
        for( k = 1; k <= koma[6]; k++ ) {
            if( ( ( ( 0 <= i - r * k ) && ( i - r * k <= 8 ) ) && ( 0 <= j - r * k ) && ( j - r * k <= 8) ) ){
                if( this.map[i - r * k][j - r * k] == 0 ) this.Atmap[i - r * k][j - r * k] = 1;
                else if( Math.abs( ( this.map[i - r * k][j - r * k] - ( this.map[i - r * k][j - r * k] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) )  >= 100 ) {
                    this.Atmap[i - r * k][j - r * k] = 1;
                    break;
                }
                else break;
            }
        }
        for( k = 1; k <= koma[7]; k++ ) {
            if( ( ( ( 0 <= i + r * k ) && ( i + r * k <= 8 ) ) && ( 0 <= j - r * k ) && ( j - r * k <= 8) ) ){
                if ( this.map[i + r * k][j - r * k] == 0 ) this.Atmap[i + r * k][j - r * k] = 1;
                else if( Math.abs( ( this.map[i + r * k][j - r * k] - ( this.map[i + r * k][j - r * k] % 100 -1 ) ) - ( this.map[i][j] - ( this.map[i][j] % 100 -1 ) ) )  >= 100 ) {
                    this.Atmap[i + r * k][j - r * k] = 1;
                    break;
                }
                else break;
            }
        }
    }

    SpecificAttack( koma , i , j , r){
        let k;

        for( k = 1; k < koma.length - 1; k++){
            if( ( 0 <= i + r * koma[k][1] ) && ( i + r * koma[k][1] <= 8) && ( 0 <= j + r * koma[k][0] ) && ( j + r * koma[k][0] <= 8) ) {
                if( this.map[i + r * koma[k][1]][j + r * koma[k][0]] == 0 )this.Atmap[i + r * koma[k][1]][j + r * koma[k][0]] = 1;
                else if( Math.abs( ( this.map[i + r * koma[k][1]][j + r * koma[k][0]] - ( this.map[i + r * koma[k][1]][j + r * koma[k][0]] % 100 -1 ) ) - ( this.Atmap[i][j] - ( this.Atmap[i][j] % 100 -1 ) ) )  >= 100 ){
                    this.Atmap[i + r * koma[k][1]][j + r * koma[k][0]] = 1;
                }
            }
        }
    }

    SwichAt( koma , i , j ){
        switch( koma ){
            case 1:
                console.log(1);
                this.NormalAttack( this.ou[1] , i , j , 1 );
                break;
            case 51:
                console.log(51);
                break;

            case 2:
                console.log(2);
                this.NormalAttack( this.hisha[1] , i , j , 1 );
                break;
            case 52:
                console.log(52);
                this.NormalAttack( this.hisha[1] , i , j , 1 );
                this.NormalAttack( this.ou[1] , i , j , 1 );
                break;  

            case 3:
                console.log(3);
                this.NormalAttack( this.kaku[1] , i , j , 1 );
                break;
            case 53:
                console.log(53);
                this.NormalAttack( this.kaku[1] , i , j , 1 );
                this.NormalAttack( this.ou[1] , i , j , 1 );
                break;

            case 4:
                console.log(4);
                this.NormalAttack( this.kin[1] , i , j , 1 );
                break;
            case 54:
                console.log(54);
                break;

            case 5:
                console.log(5);
                this.NormalAttack( this.gin[1] , i , j , 1 );
                break;
            case 55:
                console.log(55);
                this.NormalAttack( this.kin[1] , i , j , 1 );
                break;
            
            case 6:
                console.log(6);
                this.SpecificAttack( this.kei[1] , i , j , 1 );
                break;
            case 56:
                console.log(56);
                this.NormalAttack( this.kin[1] , i , j , 1 );
                break;
            
            case 7:
                console.log(7);
                this.NormalAttack( this.keisha[1] , i , j , 1 );
                break;
            case 57:
                console.log(57);
                this.NormalAttack( this.kin[1] , i , j , 1 );
                break;

            case 8:
                console.log(8);
                this.NormalAttack( this.hu[1] , i , j , 1 );
                break;
            case 58:
                console.log(58);
                this.NormalAttack( this.kin[1] , i , j , 1 );
                break;

            case 101://this
                console.log(101);
                //this.NormalAttack( this.kaku[1] , i , j , -1 );
                this.NormalAttack( this.ou[1] , i , j , -1 );
                //this.NormalAttack( this.hisha[1] , i , j , -1 );
                break;
            case 151:
                console.log(151);
                break;

            case 102:
                console.log(102);///
                this.NormalAttack( this.hisha[1] , i , j , -1 );
                break;
            case 152:
                console.log(152);
                this.NormalAttack( this.hisha[1] , i , j , -1 );
                this.NormalAttack( this.ou[1] , i , j , -1 );
                break;  

            case 103:
                console.log(103);
                this.NormalAttack( this.kaku[1] , i , j , -1 );
                break;
            case 153:
                console.log(153);
                this.NormalAttack( this.kaku[1] , i , j , -1 );
                this.NormalAttack( this.ou[1] , i , j , -1 );
                break;

            case 104:
                console.log(104);
                this.NormalAttack( this.kin[1] , i , j , -1 );
                break;
            case 154:
                console.log(154);/////
                break;

            case 105:
                console.log(105);
                this.NormalAttack( this.gin[1] , i , j , -1 );
                break;
            case 155:
                console.log(155);
                this.NormalAttack( this.kin[1] , i , j , -1 );
                break;
            
            case 106:
                console.log(106);
                this.SpecificAttack( this.kei[1] , i , j , -1 );
                break;
            case 156:
                console.log(156);
                this.NormalAttack( this.kin[1] , i , j , -1 );//--safev
                break;
            
            case 107:
                console.log(107);
                this.NormalAttack( this.keisha[1] , i , j , -1 );
                break;
            case 157:
                console.log(157);
                this.NormalAttack( this.kin[1] , i , j , -1 );
                break;

            case 108:
                console.log(108);
                this.NormalAttack( this.hu[1] , i , j , -1 );
                break;
            case 158:
                console.log(158);
                this.NormalAttack( this.kin[1] , i , j , -1 );
                break;
        }
    }

    AttackMark( koma , i , j ){
        let u , v;
        for( u = 0; u < 9; u++){
            for( v = 0; v < 9; v++){
                if( koma == "p1" ){
                    if( this.map[u][v] >= 101 ) continue;
                }
                else if( koma == "p2" ){
                    if( this.map[u][v] <= 100 ) continue;
                }
                else { 
                    this.SwichAt( koma , i ,j ); break ;
                }
                this.SwichAt( this.map[u][v] , u , v );
            }
        }
    }
    drawAt(){
        for( let i = 0; i < 9; i++ ){
            console.log( 
                this.Atmap[i][0],
                this.Atmap[i][1],
                this.Atmap[i][2],
                this.Atmap[i][3],
                this.Atmap[i][4],
                this.Atmap[i][5],
                this.Atmap[i][6],
                this.Atmap[i][7],
                this.Atmap[i][8]
            );
            /*
            console.log( 
                this.map[i][0],
                this.map[i][1],
                this.map[i][2],
                this.map[i][3],
                this.map[i][4],
                this.map[i][5],
                this.map[i][6],
                this.map[i][7],
                this.map[i][8]
            );*/
            for( let j = 0; j < 9; j++ ){
                if( this.Atmap[i][j] == 1  ) this.ctx.fillStyle = "red";
                else if( this.Atmap[i][j] == 2  ) this.ctx.fillStyle = "blue";
                this.ctx.beginPath();
                this.ctx.arc( ( this.cw / 9 ) * ( i + 0.5 ) , ( this.ch / 9 ) * ( j + 0.5 ) , 5 , 0 , Math.PI * 2 , false );
            }
        }
    }

    display(){
        for( let i = 0; i < 9; i++){
            for( let j = 0; j < 9; j++){
                if( this.PNG[this.map[i][j]] != null ){
                    this.DrawIMG( this.PNG[this.map[i][j]] , this.ctx , j * this.cw / 9 , i * this.ch / 9);
                }
            }
        }
    }

    DrawIMG( src , ctx , x , y ){
        //this.image[this.ImageNum].src = src;
        this.IMAGE[this.ImageNum].src = src;
        console.log("src:",src , ".src" , this.IMAGE[this.ImageNum].src);
        this.IMAGE[this.ImageNum].onload = function(){
            ctx.drawImage( this.IMAGE[this.ImageNum] , x , y , this.cw / 9 , this.ch / 9 );
        }
        this.ImageNum++;
    }
}



app = new App();
app.drawBan();
//app.AttackMark( 101 , 4 , 0);
app.AttackMark( "p1" , 0 , 0 );
app.drawAt();
app.display();
//app.DrawImage( "無名駒.png" , app.ctx , 100 ,100 );
//console.log( app.IMAGE[0].src );

//app.IMAGE[0].onload = function(){
  //  app.ctx.drawImage( app.IMAGE[0] , 0 ,100 , app.cw / 9 , app.ch / 9 );
//}

for( let i = 0; i < 9; i++){
    for( let j = 0; j < 9; j++){
        console.log( app.IMAGE[i*j].src );
    }
}
