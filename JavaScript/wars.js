class App{
    constructor( n ){
        this.tmr = 0;
        this.stop = 1;
        this.cv = document.getElementById( "canvas" );
        this.ctx = this.cv.getContext( "2d" );
        this.map = this.Generate2DList( 700 , 700 );
        this.cha = new Charactor( n );
        this.wep = new Weapon( n );
    }
    Generate2DList( x , y ){
        let i;
        let array = new Array( y );
        for( i = 0; i < y; i++ ){
            array[i] = new Array( x );
        }
        return array;
    }
    generate( type , g , x , y , sx , sy , hp , at , de , he ){
        if( type == "charactor" ){
            this.cha.generate( g , x,  y, sx , sy , hp , at , de , he );
        }
        if( type == "weapon" ){
            this.wep.generate( x , y , sx , sy , at );
        }
    }
    display(){
        this.cha.display( this.ctx );
        this.wep.display( this.ctx );
    }
    move(){
        this.cha.move();
        this.wep.move();
    }
    Attacked( i , j ){
        this.cha.DEFFENCE[i] -= this.wep.ATTACK[j];
        if( this.cha.DEFFENCE[i] < 0 ){
            this.cha.HP[i] += this.cha.DEFFENCE[i];
            this.cha.DEFFENCE[i] = 0;
        }
        if( this.cha.HP[i] <= 0 )this.cha.Delete(i);
        this.wep.delete(j);
    }
    crush( obj1 , obj2 ){
        let i , j;
        let x1 , y1 , x2 , y2;
        let x , y , d;
        let sxi , sxj , syi , syj;
        let R = 10;

        this.cha.crush();
        this.wep.crush();

        for( i = 0; i < obj1.N; i++ ){
            if( obj1.EXISTS[i] == 1 ){
                for( j = 0; j < obj2.N; j++ ){
                    if( obj2.EXISTS[j] == 1 ){

                        x1 = obj1.X[i];
                        y1 = obj1.Y[i];
                        x2 = obj2.X[j];
                        y2 = obj2.Y[j];

                        sxi = obj1.SPEEDX[i];
                        syi = obj1.SPEEDX[i];
                        sxj = obj2.SPEEDX[j];
                        syj = obj2.SPEEDY[j];

                        x = x1 - x2;
                        y = y1 - y2;
                        d = Math.sqrt( ( x * x ) + ( y * y ) );

                        if( d <= 2 * R + 1 ){
                            obj1.SPEEDX[i] = sxj;
                            obj1.SPEEDX[i] = syj;
                            obj2.SPEEDX[j] = sxi;
                            obj2.SPEEDY[j] = syi;
                            this.Attacked( i , j );

                        }
                    }
                    //else break;
                }
            }
            //else break;
        }
    }
}

class Charactor{
    constructor( n ){
        this.SexTmr = 0;

        this.HP = new Array( n );//100;
        this.DEFFENCE = new Array( n );//50; //h+a+d = 200;
        this.ATTACK = new Array( n );//50;
        this.HEEL = new Array( n );//0-10

        this.MaxHP = new Array( n );//100;
        this.MaxDEFFENCE = new Array( n );//50; //h+a+d = 200;

        this.Color = new Array( n );
        this.SEX = new Array( n );

        this.X = new Array( n );
        this.Y = new Array( n );

        this.SPEEDX = new Array( n );
        this.SPEEDY = new Array( n );
        this.EXISTS = new Array( n );

        this.G = new Array( n );

        this.N = n;
        this.NUM = 0;

        this.styl = [ "black" , "red" , "orange" , "blue" , "green" , "yellow" , "purple" ];
        for( let i = 0; i < this.N; i++ )this.SEX[i] = i * 50;
    }

    NaNDeffence(){
        for( let i = 0; i < this.N; i++ ) if( this.DEFFENCE[i] == NaN ) this.DEFFENCE[i] = 0;
    }

    generate( g , x , y , sx , sy , hp , at , de , he ){
        let error = 0;
        while( error <= this.N ){//g,c
            console.log( "charactor while cause" , x , y );
            if( this.EXISTS[this.NUM] != 1 ){
                
                this.HP[this.NUM] = hp;
                this.DEFFENCE[this.NUM] = de;
                this.ATTACK[this.NUM] = at;
                this.HEEL[this.NUM] = he;

                this.MaxHP[this.NUM] = hp;
                this.MaxDEFFENCE[this.NUM] = de;

                this.X[this.NUM] = x;
                this.Y[this.NUM] = y;
                this.SPEEDX[this.NUM] = sx;
                this.SPEEDY[this.NUM] = sy;

                this.G[i] = g;
                
                this.EXISTS[this.NUM] = 1;
                this.Color[this.NUM] = this.styl[this.NUM%7];
                this.SEX[this.NUM] = this.SexTmr;
                this.NUM = ( this.NUM + 1 ) % this.N;
                
                break;
            }
            this.NUM = ( this.NUM + 1 ) % this.N;
            error++;
        }
        if( error > this.N ) console.log( "Error!" );
    }
    move(){
        for(let i=0;i<this.NUM;i++){
            this.X[i]+=this.SPEEDX[i];
            this.Y[i]+=this.SPEEDY[i];

            if(this.X[i]<0){
                this.X[i]=0;
                this.SPEEDX[i]*=-1;
            }
            if(this.Y[i]<0){
                this.Y[i]=0;
                this.SPEEDY[i]*=-1;
            }
            if(this.X[i]>700){
                this.X[i]=700;
                this.SPEEDX[i]*=-1;
            }
            if(this.Y[i]>700){
                this.Y[i]=700;
                this.SPEEDY[i]*=-1;
            }
        }
    }
    display(ctx){
        let r = this.ATTACK[i] / 255 % 255;
        let g = this.MaxHP[i] / 255 % 255;
        let b = this.MaxDEFFENCE[i] / 255 % 255;

        for(let i=0;i<this.NUM;i++){
            if(this.EXISTS[i]==1){
                console.log(
                    " Id " , i ,
                    " G: " , this.G[i] ,
                    " At: ", this.ATTACK[i] ,
                    " mDe: ", this.MaxDEFFENCE[i] ,
                    " De: ", this.DEFFENCE[i] ,
                    " mHp: ", this.MaxHP[i] ,
                    " Hp: ", this.HP[i] ,
                    " Color: ", this.Color[i]
                );
                ctx.beginPath();
                ctx.fillStyle = 'rgb(${r},${g},${b})';
                ctx.arc(this.X[i],this.Y[i],10,0,Math.PI*2,false);
                ctx.fill();
            }
        }
    }
    sex(i,j){
        console.log("sex");
        let x , y;
        let hp = this.MaxHP[i] - this.MaxHP[j];
        let he = this.HEEL[i] - this.HEEL[j];
        let sx = this.SPEEDX[i] - this.SPEEDX[j];
        let sy = this.SPEEDY[i] - this.SPEEDY[j];
        let at = this.ATTACK[i] - this.ATTACK[j];
        let de = this.MaxDEFFENCE[i] - this.MaxDEFFENCE[j];
        let g  = Math.max( this.G[i] , this.G[j] ) + 1;

        let hpmax = Math.max( this.MaxHP[i] , this.MaxHP[j] ) + 100;
        let demax = Math.max( this.MaxDEFFENCE[i] , this.MaxDEFFENCE[j] ) + 100;
        let sxmax = Math.max( this.SPEEDX[i] , this.SPEEDX[j] ) + 10;
        let symax = Math.max( this.SPEEDY[i] , this.SPEEDY[j] ) + 10;

        let hpmin = Math.min( this.MaxHP[i] , this.MaxHP[j] ) - 100;
        let demin = Math.min( this.MaxDEFFENCE[i] , this.MaxDEFFENCE[j] ) - 100;
        let sxmin = Math.min( this.SPEEDX[i] , this.SPEEDX[j] ) - 10;
        let symin = Math.min( this.SPEEDY[i] , this.SPEEDY[j] ) - 10;

        if( hpmax > 1000) hpmax = 1000;
        if( hpmin < 0) hpmin = 0;

        if( demax > 1000 ) demax = 1000;
        if( demin < 0 ) demin = 0;

        if( sxmax > 10 ) sxmax = 10;
        if( sxmin < 0 ) sxmin = 0;

        if( symax > 10 ) symax = 10;
        if( symin < 0 ) symin = 0;

        let d = Math.sqrt( ( at * at ) + ( de * de ) + ( hp * hp ) + ( he * he ) + ( sx * sx ) + ( sy * sy ) );
        
        //console.log("d=>",d);

        if( ( ( this.SexTmr - this.SEX[j] >= 100 ) && ( this.SexTmr - this.SEX[j] >= 100 ) ) && ( ( 0 <= d ) && ( d<= 1500 ) ) ){
            hp = parseInt( Math.random() * ( hpmax - hpmin ) + hpmin );
            de = parseInt( Math.random() * ( demax - demin ) + demin );
            sx = Math.round( Math.random() * ( sxmax - sxmin ) + sxmin );
            sy = Math.round( Math.random() * ( symax - symin ) + symin );

            //hp = parseInt( ( hp + this.MaxHP[i] + this.MaxHP[j] ) / 3 );//2->3
            //de = parseInt( ( de + this.MaxDEFFENCE[i] + this.MaxDEFFENCE[j] ) / 3 );
            at = 1000 - de;
            he = parseInt( ( 1000 - hp ) / 10 );
            //sx = parseInt( ( sx + this.SPEEDX[i] + this.SPEEDX[j] ) / 3 );
            //sy = parseInt( ( sy + this.SPEEDY[i] + this.SPEEDY[j] ) / 3 );
            
            x = parseInt( ( this.X[i] + this.X[j] ) / 2 ) + 50;
            y = parseInt( ( this.Y[i] + this.Y[j] ) / 2 ) + 50;

            if( x < 0 ) x = 0;
            if( y < 0 ) y = 0;
            if( x > 700 ) x = 700;
            if( y > 700 ) y = 700;

            this.SEX[i] = this.SexTmr;
            this.SEX[j] = this.SexTmr;

            this.generate( g , x , y , sx , sy , hp , at , de , he );

            return 1;
        }
        return 0;
    }
    crush(){
        console.log("crush");
        let i,j;
        let x1,y1,x2,y2;
        let x,y,d;
        let sxi,sxj,syi,syj;
        let R = 10;

        for( i = 0; i < this.N; i++ ){
            if( this.EXISTS[i] == 1 ){
                for( j = i + 1; j < this.N; j++ ){
                    if( this.EXISTS[j] == 1 ){

                        x1 = this.X[i];
                        y1 = this.Y[i];
                        x2 = this.X[j];
                        y2 = this.Y[j];

                        sxi = this.SPEEDX[i];
                        syi = this.SPEEDX[i];
                        sxj = this.SPEEDX[j];
                        syj = this.SPEEDY[j];

                        x = x1 - x2;
                        y = y1 - y2;
                        d = Math.sqrt( ( x * x ) + ( y * y ) );

                        if( d <= 2 * R + 1 ){
                            this.SPEEDX[i] = sxj;
                            this.SPEEDX[i] = syj;
                            this.SPEEDX[j] = sxi;
                            this.SPEEDY[j] = syi;

                            console.log( this.SEX[i] , this.SEX[j] );
                            if( this.sex( i , j ) == 0 ) this.Attacked( i , j ); 
                        }

                        this.NaNDeffence();
                    }
                }
            }
            //else break;
        }
    }
    Attacked( i , j ){
        console.log( "Attacked" , i , j );
        if( this.DEFFENCE[i] == NaN ) this.DEFFENCE[i] = 0;
        if( this.DEFFENCE[j] == NaN ) this.DEFFENCE[j] = 0;

        this.DEFFENCE[i] -= this.ATTACK[j];
        this.DEFFENCE[j] -= this.ATTACK[i];

        if( this.DEFFENCE[i] < 0 ){
            this.HP[i] += this.DEFFENCE[i];
            this.DEFFENCE[i] = 0;
        }
        if( this.DEFFENCE[j] < 0 ){
            this.HP[j] += this.DEFFENCE[j];
            this.DEFFENCE[j] = 0;
        }

        if( this.HP[i] <= 0 ) this.Delete( i );
        if( this.HP[j] <= 0 ) this.Delete( j );
    }
    Delete( i ){
        this.EXISTS[i] = 0;
    }

    Heel(){
        if( this.SexTmr % 1000 == 0 ) for(let i = 0; i < this.N; i++) if( this.EXISTS[i] == 1 ) if( this.MaxHP[i] > this.HP[i] )this.HP[i] += this.HEEL[i];
        if( this.MaxHP[i] < this.HP[i] ) this.HP[i] = this.MaxHP[i];
    }
}
class Weapon{
    constructor( n ){
        this.ATTACK = new Array( n );
        this.N = n;
        this.IMAGE = new Array( n );
        this.X = new Array( n );
        this.Y = new Array( n );
        this.SPEEDX = new Array( n );
        this.SPEEDY = new Array( n );
        this.Theta = new Array( n );
        this.EXISTS = new Array( n );
        this.NUM = 0;

        this.AtInit();
    }
    AtInit(){ for(let i = 0; i < this.N; i++ ) this.ATTACK[i] = 10; }
    generate( x , y , sx , sy , at ){
        while( 1 ){
            //console.log("while cause");
            if( this.EXISTS[this.NUM] != 1 ){
                this.ATTACK[this.NUM] = at;

                this.IMAGE[this.NUM] = new Image();
                this.X[this.NUM] = x;
                this.Y[this.NUM] = y;
                this.SPEEDX[this.NUM] = sx;
                this.SPEEDY[this.NUM] = sy;
                this.EXISTS[this.NUM] = 1;
                this.NUM = (this.NUM+1) % this.N;
                break;
            }
            this.NUM = ( this.NUM + 1 ) % this.N;
        }
    }
    display(ctx){
        let x , y;
        let i;

        for( i = 0; i < this.N; i++ ){
            //console.log(i+":"+"IMAGE=>"+this.IMAGE[i]);
            x = this.X[i];
            y = this.Y[i];

            if( this.EXISTS[i] == 1) this.draw_image( this.IMAGE[i] , "wepon.png" , x , y , 200 , ctx );
        }
    }
    execute(){}
    Attacked( i ){ this.delete( i ); }
    delete( i ){
        this.EXISTS[i] = 0
    }
    move(){
        for( let i = 0; i < this.NUM; i++ ){
            this.X[i] += this.SPEEDX[i];
            this.Y[i] += this.SPEEDY[i];

            if(this.X[i] < 0){
                this.X[i] = 0;
                this.SPEEDX[i] *= -1;
            }
            if(this.Y[i] < 0){
                this.Y[i] = 0;
                this.SPEEDY[i] *= -1;
            }
            if(this.X[i] > 700){
                this.X[i] = 700;
                this.SPEEDX[i] *= -1;
            }
            if(this.Y[i] > 700){
                this.Y[i] = 700;
                this.SPEEDY[i] *= -1;
            }
        }
    }
    crush(){
        let i , j;
        let x1 , y1 , x2 , y2;
        let x , y , d;
        let sxi , sxj , syi , syj;
        let R = 10;

        for( i = 0; i < this.N; i++ ){
            if( this.EXISTS[i] == 1 ){
                for( j = i + 1; j < this.N; j++ ){
                    if( this.EXISTS[j] == 1 ){

                        x1 = this.X[i];
                        y1 = this.Y[i];
                        x2 = this.X[j];
                        y2 = this.Y[j];

                        sxi = this.SPEEDX[i];
                        syi = this.SPEEDX[i];
                        sxj = this.SPEEDX[j];
                        syj = this.SPEEDY[j];

                        x = x1 - x2;
                        y = y1 - y2;
                        d = Math.sqrt( ( x * x ) + ( y * y ) );

                        if( d <= 2 * R + 1 ){
                            this.SPEEDX[i] = sxj;
                            this.SPEEDX[i] = syj;
                            this.SPEEDX[j] = sxi;
                            this.SPEEDY[j] = syi;

                            this.Attacked( i );
                            this.Attacked( j );
                        }
                    }
                }
            }
            //else break;
        }
    }
    draw_image( img , src , x , y , w , ctx ){
        //console.log(this.IMAGE[i].src);
        /*
        img.onload=function(){
            //ctx.rotate(theta);
            ctx.drawImage(img,0,0,100,100,x,y,w,w);//画像の開始地点、元の画像の大きさ、キャンバスの開始時点、変更後の大きさ            
        } 
        img.src = src;*/
        ctx.beginPath();
        ctx.arc( x , y , 5 , 0 , Math.PI * 2 , false );
        ctx.fillStyle = "darkgray";
        ctx.fill();
    }
}
/*
cha = new Charactor(100);
test = new Weapon(100);
cha.generate(100,100,Math.round(10*Math.random()+1,2),Math.round(10*Math.random()+1,2));
cha.generate(100,100,Math.round(10*Math.random()+1,2),Math.round(10*Math.random()+1,2));
cha.generate(100,100,Math.round(10*Math.random()+1,2),Math.round(10*Math.random()+1,2));
cha.generate(100,100,Math.round(10*Math.random()+1,2),Math.round(10*Math.random()+1,2));
test.generate(0,0,Math.round(10*Math.random()+1,2),Math.round(10*Math.random()+1,2),Math.PI/4);
test.generate(220,250,Math.round(10*Math.random()+1,2),Math.round(10*Math.random()+1,2),Math.PI/6);
test.generate(320,220,Math.round(10*Math.random()+1,2),Math.round(10*Math.random()+1,2),Math.PI/4);
test.display(ctx);
*/
let i ,app,tmr=0,s=0;
app = new App( 1000 );
for( i = 0; i < 50; i++ )app.generate( "weapon" , 50 * i , 530 , Math.round( 10 * Math.random() + 1 , 2 ) , Math.round( 10 * Math.random() + 1 , 2 ) , 50 );
function mainloop(){
    if( app.stop == 1 ){
        app.ctx.clearRect( -100 , -100 , 1000 , 1000 );
        app.display();
        app.move();
        app.crush( app.cha , app.wep );
        app.cha.Heel();
        app.cha.SexTmr = ( app.cha.SexTmr + 1 ) % 1000 ;
        if( app.cha.SexTmr == 1000 ) s++;
        if( s != 10 ) if( app.cha.SexTmr % 10 == 0 ) for( i = 0; i < 10; i++ )app.generate( "charactor" , 0 , 700 - 300 * ( i % 2 ) - 300 * ( i % 3 ) - 200 * ( i % 5 ) , 700- 300 * ( i % 7 ) - 200 * ( i % 6 ) - 200 * ( i % 3 ) , Math.round( 10 * Math.random() + 1 , 2 ),Math.round( 10 * Math.random() + 1 , 2 ) , 500 , 1000 - 700 , 700 , 1000 - 500 );

        setTimeout( mainloop , 1000 / 30 );
    }
}
mainloop();

///sexsex