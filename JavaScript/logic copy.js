var cvs = document.getElementById("canvas");
var ctx = cvs.getContext('2d');
var r = 10;
var s = 3;

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

class entity{
    constructor(N){
        this.N = N;
        this.NUM = 0;
        this.INP = 0;
        this.OUP = 0;

        this.Name = new Array(N);

        this.type = new Array(N);

        this.apt = new Array(N);
        this.next = new Array(N);

        this.aptNum = new Array(N);
        this.nextNum = new Array(N);
        this.num = new Array(N);

        this.x = new Array(N);
        this.y = new Array(N);

        this.img = new Array(N);

        this.Line = new Array(N*4);
        for(let i=0;i<N;i++)this.Line[i] = new Array(4); 
        this.lineNum = 0;

        this.init();
    }
    init(){
        for(let i=0;i<this.N;i++){
            this.Name[i] = null;

            this.type[i] = null;
            this.apt[i] = null;
            this.next[i] = null;

            this.img[i] = null;
        }
    }
    add(t,n,name,x,y){
        this.Name[this.NUM] = name;

        this.type[this.NUM] = t;

        this.apt[this.NUM] = new Array(n);
        this.next[this.NUM] = new Array(n);
        for(let i=0;i<this.N;i++){
            this.apt[this.NUM][i] = null;
            this.next[this.NUM][i] = null;
        }

        this.aptNum[this.NUM] = 0;
        this.nextNum[this.NUM] = 0;
        this.num[this.NUM] = n;

        this.x[this.NUM] = x;
        this.y[this.NUM] = y;

        this.img[this.NUM] = new Image();

        this.NUM = (this.NUM+1)%this.N;

        if(t=="INPUT")this.INP++;
        else if(t=="OUTPUT")this.OUP++;
    }
    connect(id1,id2,p2){//port
        let w0=125,h0=100,w1=125,h1=100;
        this.next[id1][this.nextNum[id1]] = id2;
        this.nextNum[id1] = (this.nextNum[id1]+1)%this.N;

        if(this.type[id1]=="INPUT"||this.type[id1]=="OUTPUT"){w0=60;h0=50}
        if(this.type[id2]=="INPUT"||this.type[id2]=="OUTPUT"){
            w1=60;h1=50;
            this.line(this.x[id1]+w0/s-1.5,
                  this.y[id1]+h0/s/2-1.5,
                  this.x[id2]+3,
                  this.y[id2]+h1/s/2
                 );
        }
        else{
            this.line(this.x[id1]+w0/s+3,
                  this.y[id1]+h0/s/2-1.5,
                  this.x[id2]-3,
                  this.y[id2]+1+(h1*0.9)/s/(this.num[id2]-1)*p2
                 );
            }
    }
    modify_move(id , x , y){
        this.x[id] = x;
        this.y[id] = y;
    }
    line(x0,y0,x1,y1){
        this.Line[this.lineNum][0] = x0;
        this.Line[this.lineNum][1] = y0;
        this.Line[this.lineNum][2] = x1;
        this.Line[this.lineNum][3] = y1;

        this.lineNum = (this.lineNum+1)%(this.N*10);
    }
    point1(x,y,n){
        for(let j=0;j<n;j++){
            ctx.rect(x-3,y+1+(100*0.9)/s/(n-1)*j,3,3);
        }
        ctx.rect(x+125/s-1.5,y+100/s/2-1.5,3,3);
        ctx.fillStyle = "purple";
        ctx.fill();
    }
    point2(x,y){
        ctx.rect(x-3,y+50/s/2,3,3);

        ctx.rect(x+60/s,y+50/s/2,3,3);
        ctx.fillStyle = "purple";
        ctx.fill()
    }
    display(){
        for(let i=0;i<this.NUM;i++){
            ctx.strokeStyle="black";
            ctx.fillStyle = "black";
            ctx.font = "10px";
            ctx.fillText(i+" "+this.Name[i],this.x[i],this.y[i]);

            if(this.type[i] == "INPUT"){
                this.img[i].src ="input.png";
                this.img[i].onload =()=>{
                    ctx.drawImage(this.img[i],0,0,60,50,this.x[i],this.y[i],60/s,50/s);
                }
                this.point2(this.x[i],this.y[i]);
            }
            else if(this.type[i] == "OUTPUT"){
                this.img[i].src ="output.png";
                this.img[i].onload =()=>{
                    ctx.drawImage(this.img[i],0,0,60,50,this.x[i],this.y[i],60/s,50/s);
                }
                this.point2(this.x[i],this.y[i]);
            }
            else if(this.type[i] == "AND"){
                this.img[i].src ="and.png";
                this.img[i].onload =()=>{
                    ctx.drawImage(this.img[i],0,0,125,100,this.x[i],this.y[i],125/s,100/s);
                }
                this.point1(this.x[i],this.y[i],this.num[i]);
            }
            else if(this.type[i] == "OR"){
                this.img[i].src ="or.png";
                this.img[i].onload =()=>{
                    ctx.drawImage(this.img[i],0,0,125,100,this.x[i],this.y[i],125/s,100/s);
                }
                this.point1(this.x[i],this.y[i],this.num[i]);
            }
            else if(this.type[i] == "INV"){
                this.img[i].src ="inv.png";
                this.img[i].onload =()=>{
                    ctx.drawImage(this.img[i],0,0,125,100,this.x[i],this.y[i],125/s,100/s);
                }
                this.point1(this.x[i],this.y[i],this.num[i]);
            }
            else if(this.type[i] == "XOR"){
                this.img[i].src ="xor.png";
                this.img[i].onload =()=>{
                    ctx.drawImage(this.img[i],0,0,125,100,this.x[i],this.y[i],125/s,100/s);
                }
                this.point1(this.x[i],this.y[i],this.num[i]);
            }
        }
        for(let j=0;j<this.lineNum;j++){
            ctx.beginPath()
            ctx.moveTo(this.Line[j][0],this.Line[j][1]);
            ctx.lineTo(this.Line[j][2],this.Line[j][3]);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    AND(id){
        for(let i=0;i<this.num[id];i++){
            if(this.apt[id][i] == 0) return 0;
            if(this.apt[id][i] == null) return -1;
        }
        return 1;
    }
    OR(id){
        let nl = 0;
        for(let i=0;i<this.num[id];i++){
            if(this.apt[id][i] == 1) return 1;
            if(this.apt[id][i] == null) nl++;
        }
        if(nl>=1) return -1;
        return 0;
    }
    XOR(id){ 
        if(this.apt[id][0] == null || this.apt[id][1] == null) return -1; 
        if(this.apt[id][0] == this.apt[id][1]) return 0;
        return 1;
    }
    INV(id){
        return (this.apt[id][0]+1)%2;
    }

    Simulate(InputArray){
        let n=0;
        for(let i=0;i<this.N;i++){
            if(this.type[i]=="INPUT"){
                this.apt[i][0] = InputArray[n];
                n++;
                this.NextExplore(i);
            }
        }
        this.GetOutput();
    }
    GetOutput(){
        for(let i=0;i<this.N;i++){
            if(this.type[i]=="OUTPUT"){
                console.log(this.Name[i],this.apt[i][0],"\n");
            }
        }
    }
    NextExplore(id){
        let res;
        if(this.type[id]=="OUTPUT") return 1;

        else if(this.type[id]=="INPUT"){
            for(let i=0;i<this.nextNum[id];i++){
                this.apt[this.next[id][i]][this.aptNum[this.next[id][i]]] = this.apt[id][0];
                this.aptNum[this.next[id][i]]++;
                this.NextExplore(this.next[id][i]);
            }
        }
        else if(this.type[id]=="AND"){
            res = this.AND(id);
            if(res == -1) return -1;

            for(let i=0;i<this.nextNum[id];i++){
                this.apt[this.next[id][i]][this.aptNum[this.next[id][i]]] = res;
                this.aptNum[this.next[id][i]]++;
                this.NextExplore(this.next[id][i]);
            }
        }

        else if(this.type[id]=="OR"){
            res = this.OR(id);
            if(res == -1) return -1;
            
            for(let i=0;i<this.nextNum[id];i++){
                this.apt[this.next[id][i]][this.aptNum[this.next[id][i]]] = res;
                this.aptNum[this.next[id][i]]++;
                this.NextExplore(this.next[id][i]);
            }
        }

        else if(this.type[id]=="XOR"){
            res = this.XOR(id);
            if(res == -1) return -1;
            
            for(let i=0;i<this.nextNum[id];i++){
                this.apt[this.next[id][i]][this.aptNum[this.next[id][i]]] = res;
                this.aptNum[this.next[id][i]]++;
                this.NextExplore(this.next[id][i]);
            }
        }

        else if(type[id]=="INV"){
            res = this.INV(id);
           
            for(let i=0;i<this.nextNum[id];i++){
                this.apt[next[id][i]][this.aptNum[this.next[id][i]]] = res;
                this.aptNum[this.next[id][i]]++;
                this.NextExplore(this.next[id][i]);
            }
        }

    }
}
    var o = new entity(100);
    o.add("INPUT",null,"A",100,100);
    o.add("INPUT",null,"B",100,150);
    o.add("AND",2,null,200,100);
    o.add("OR",2,null,200,150);
    o.add("XOR",2,null,300,100);
    o.add("OUTPUT",null,"Cout",400,100);

    o.connect(0,2,0);
    o.connect(1,2,1);
    o.connect(0,3,0);
    o.connect(1,3,1);
    o.connect(2,4,0);
    o.connect(3,4,1);

    o.connect(4,5,0);
    inp = [1,0];
    o.Simulate(inp);
    o.display();