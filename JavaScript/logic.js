class Unit{
    constructor(id,name,type,value,x,y,n,tp){

        this.type = type;
        this.id = id;
        this.name = name;

        this.x = x;
        this.y = y;
        this.x1;
        this.y1;

        this.adpNum = n;

        this.prev = 0;
        this.next = 0;

        this.tp = tp;//tien
        this.tm = 0;//

        this.prevUnit = new Array(N);
        this.nextUnit = new Array(N);
        for(let i=0;i<n;i++)this.prevUnit[i]=null;
        for(let i=0;i<N;i++)this.nextUnit[i]=null;


        this.Image = new Image();

        this.value=value;   
    }
}

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext('2d');
var side = document.getElementById("side");
var r = 10;
var s = 3;
var N = 100;
var Damy = new Unit(N+1,"damy","DAMY",null,null,null,1,null);

cvs.width = window.innerWidth*0.7;
cvs.height = window.innerHeight;

class entity{
    constructor(N){
        this.ID = 0;
        this.Units = new Array(N+1);

        this.INP = new Array(N);
        this.OUP = new Array(N);
        this.inp = 0;
        this.oup = 0;

        this.Image = new Array(N);

        this.N = N;
        this.Line = new Array(N*4);
        for(let i=0;i<N;i++)this.Line[i] = new Array(4); 
        this.lineNum = 0;

        this.Units[N+1] = Damy;
    }
    add(name,type,value,x,y,adpNum,tp){//id,name,type,value,x,y,n,tp
        this.Units[this.ID] = new Unit(this.ID,name,type,value,x,y,adpNum,tp);  
        if(this.Units[this.ID].type == "INPUT") {this.INP[this.inp] = this.ID; this.inp++;}
        else if(this.Units[this.ID].type == "OUTPUT") {this.OUP[this.oup] = this.ID; this.oup++;}
        this.ID++;
    }
    connect(id1,id2){//port

        let id = this.ID;
        this.add(null,"LINE",null,0,0,1,0);  

        console.log("coneect0",this.Units[id].type);
        console.log("connect1",this.Units[id1].type);
        console.log("connect2",this.Units[id2].type);

        this.Units[id1].nextUnit[this.Units[id1].next] = this.Units[id];
        this.Units[id].prevUnit[0] = this.Units[id1];

        this.Units[id2].prevUnit[this.Units[id2].prev] = this.Units[id];
        this.Units[id].nextUnit[0] = this.Units[id2];

        this.Units[id1].next++;
        this.Units[id2].prev++;

        this.Line[this.lineNum] = id;
        this.lineNum = (this.lineNum+1)%(this.N*10);

        
    }
    modify(id , x , y,name,adpNum,tp){//id,name,type,value,x,y,n,tp
        if(this.Units[id]==null)return;
        this.Units[id].name = name;
        this.Units[id].n = adpNum;
        this.Units[id].tp = tp;
        this.Units[id].x = x;
        this.Units[id].y = y;
    }
    disconnect(id1,id2){
        console.log(id1,id2);
        for(let i=0;i<this.Units[id1].next;i++){
            if(this.Units[id1] == null) continue;
            if(this.Units[id1].nextUnit[i].nextUnit[0].id == id2){

                this.Units[this.Units[id1].nextUnit[i].id] = Damy;

                this.Units[id1].nextUnit[i] = Damy;
            }
        }
        for(let i=0;i<this.Units[id2].prev;i++){
            if(this.Units[id1] == null) continue;
            if(this.Units[id2].prevUnit[i].prevUnit[0].id == id1){

                this.Units[this.Units[id2].prevUnit[i].id] = Damy;

                this.Units[id2].prevUnit[i] = Damy;
            }
        }
    }
    display(){
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        for(let i=0;i<this.ID;i++){
            if(this.Units[i] == null) continue;
            ctx.fillStyle = "red";
            ctx.font = "10px";
            ctx.fillText(i+" "+this.Units[i].name,this.Units[i].x,this.Units[i].y);

            if(this.Units[i].type == "LINE"){
                let x1 = this.Units[i].prevUnit[0].x;
                let y1 = this.Units[i].prevUnit[0].y;
                let x2 = this.Units[i].nextUnit[0].x;
                let y2 = this.Units[i].nextUnit[0].y;

                let w0=120,h0=100,w1=120,h1=100;

                if(this.Units[i].prevUnit[0].type=="INPUT"||this.Units[i].prevUnit[0].type=="OUTPUT"){w0=60;h0=50}
                if(this.Units[i].nextUnit[0].type=="INPUT"||this.Units[i].nextUnit[0].type=="OUTPUT"){w1=60;h1=50;}

                ctx.beginPath()
                ctx.moveTo(x1+w0/s-1.5,y1+h0/s/2-1.5);
                ctx.lineTo(x2+3,y2+h1/s/2);
                ctx.lineWidth = 2;
                ctx.strokeStyle="balck";
                ctx.stroke();

                continue;
            }

            else if(this.Units[i].type == "INPUT") this.Units[i].Image.src="input.png";
 
            else if(this.Units[i].type == "OUTPUT") this.Units[i].Image.src="output.png";

            else if(this.Units[i].type == "AND") this.Units[i].Image.src="and.png";

            else if(this.Units[i].type == "OR" ) this.Units[i].Image.src="or.png";
 
            else if(this.Units[i].type == "INV") this.Units[i].Image.src="inv.png";

            else if(this.Units[i].type == "XOR") this.Units[i].Image.src="xor.png";

            this.Units[i].Image.onload =()=>{
                ctx.drawImage(this.Units[i].Image,0,0,125,100,this.Units[i].x,this.Units[i].y,125/s,100/s);
            }
        }
    }

    AND(id){
        for(let i=0;i<this.Units[id].prev;i++){
            if(this.Units[id].prevUnit[i].value == 0) return 0;
            if(this.Units[id].prevUnit[i].value == null) return -1;
            if(this.Units[id].prevUnit[i].value == Damy) return -1;
        }
        return 1;
    }
    OR(id){
        let nl = 0;
        for(let i=0;i<this.Units[id].prev;i++){
            if(this.Units[id].prevUnit[i].value == 1) return 1;
            if(this.Units[id].prevUnit[i].value == null) nl++;
            if(this.Units[id].prevUnit[i].value == Damy) nl++;
        }
        if(nl>=1) return -1;
        return 0;
    }
    XOR(id){ 
        if(this.Units[id].prevUnit[0].value == null || this.Units[id].prevUnit[1].value == null) return -1;
        if(this.Units[id].prevUnit[0].value == Damy || this.Units[id].prevUnit[1].value == Damy) return -1;  
        if(this.Units[id].prevUnit[0].value == this.Units[id].prevUnit[1].value) return 0;
        return 1;
    }
    INV(id){
        return (this.Units[id].prevUnit[i].value+1)%2;
    }
    longestTime(id){
        let lt = this.Units[id].prevUnit[0].tm;
        for(let i=1;i<this.Units[id].prev;i++){
            if(lt<this.Units[id].prevUnit[i].tm){
                lt = this.Units[id].prevUnit[i].tm;
            }
        }
        this.Units[id].tm = lt + this.Units[id].tp;
    }
    Simulate(InputArray){
        let n=0;
        for(let i=0;i<this.inp;i++){
            console.log(this.Units[this.INP[i]].name,this.Units[this.INP[i]].value,"\n");
            this.Print(i);
            this.Units[this.INP[i]].value = InputArray[n++];
            this.NextExplore(this.INP[i]);
        }
        this.GetOutput();
    }
    GetOutput(){
        for(let i=0;i<this.oup;i++){
            document.getElementById("res").insertAdjacentHTML("beforeend","・|value: "+this.Units[this.OUP[i]].value+"|Name: "+this.Units[this.OUP[i]].name+"|tm: "+this.Units[this.OUP[i]].tm+"|<br>");
        }
    }
    Print(i){
            document.getElementById("res").insertAdjacentHTML("beforeend","->|value: "+this.Units[i].value+"|Name: "+this.Units[i].name+"|tm: "+this.Units[i].tm+"|<br>");
    }
    NextExplore(id){
        let res = -1;        
        if(this.Units[id].type == "OUTPUT") {
            this.Units[id].value = this.Units[id].prevUnit[0].value;
            this.Units[id].tm = this.Units[id].prevUnit[0].tm;
        }
        else if(this.Units[id].type=="INPUT"){
            for(let i=0;i<this.Units[id].next;i++)this.NextExplore(this.Units[id].nextUnit[i].id);
        }
        else if(this.Units[id].type == "LINE"){
            this.Units[id].value = this.Units[id].prevUnit[0].value;
            this.longestTime(id);
            this.NextExplore(this.Units[id].nextUnit[0].id);
        }
        else if(this.Units[id].type=="AND") res = this.AND(id);
        else if(this.Units[id].type=="OR") res = this.OR(id);
        else if(this.Units[id].type=="XOR") res = this.XOR(id);
        else if(this.Units[id].type=="INV") res = this.INV(id);
        if(res == -1) return res;
        else{
            this.Units[id].value = res;
            for(let i=0;i<this.Units[id].next;i++){
                this.longestTime(id);
                this.NextExplore(this.Units[id].nextUnit[i].id);
            }
        }

    }
}
       
    function create(event){
        let vl;
        if(elm_value.value==-1)vl = null;
        else vl = elm_value.value;
        console.log("create",elm_x.value,elm_y.value);
        o.add(elm_name.value,
              elm_unit.value,
              vl,
              parseInt(elm_x.value),
              parseInt(elm_y.value),
              parseInt(elm_adpnum.value),
              parseInt(elm_tp.value)
             );
        o.display();
    }
    function connect(event){
        console.log("connect_e",parseInt(elm_id1.value),parseInt(elm_id2.value));
        o.connect(parseInt(elm_id1.value),parseInt(elm_id2.value));
        o.display();
    }
    function simulate(){
        let ar=elm_ipt.value.split(",");
        for(let i=0;i<ar.length;i++)ar[i] = parseInt(ar[i]);
        o.Simulate(ar);
    }
    function edit(event){//id , x , y,name,adpNum,tp
        console.log("edit0","Modify!");    
        o.modify(parseInt(elm_id.value),
                parseInt(elm_x2.value),
                parseInt(elm_y2.value),
                elm_name2.value,
                parseInt(elm_adpnum2.value),
                parseInt(elm_tp2.value)
                );
        console.log("edit1",o.Units[parseInt(elm_id.value)].x,o.Units[parseInt(elm_id.value)].y);
        o.display();
    }
   function disconnect(event){
            //o.disconnect(parseInt(elm_id2_1.value),parseInt(elm_id2_2.value));
        o.display();
   }

     

    var o = new entity(100);//name,type,value,x,y,aptnum,tp
    o.add("A","INPUT", 1 ,100,100,1,0);
    o.add("B","INPUT", 0 ,100,150,1,0);
    o.add("AND1","AND",null, 200,100,2,1);
    o.add("OR1","OR",null,200,150,2,1);
    o.add(null,"XOR",null,300,100,2,1);
    o.add("Cout","OUTPUT",null,400,100,1,1);


    o.connect(0,2,0);
    o.connect(0,3,0);
    o.connect(1,2,0);
    //o.connect(1,3,1);
    o.connect(2,4,0);
    o.connect(3,4,1);

    for(let i=0;i<o.ID;i++)console.log("space",o.Units[i].id);

    o.connect(4,5,0);
    inp = [1,0];
    o.Simulate(inp);
    o.display();


    elm_id1 = document.getElementById("id1");
    elm_id2 = document.getElementById("id2");

    elm_unit = document.getElementById("unit");
    elm_name =document.getElementById("name");
    elm_value = document.getElementById("value");
    elm_x = document.getElementById("x");

    elm_y = document.getElementById("y");

    elm_sbm1 = document.getElementById("sbm1");
    elm_sbm2 = document.getElementById("sbm2");
    elm_sbm3 = document.getElementById("sbm3");
    elm_sbm4 = document.getElementById("sbm4");
    elm_sbm5 = document.getElementById("sbm5");


    elm_adpnum = document.getElementById("adpNum");
    elm_tp = document.getElementById("tp");

    elm_ipt = document.getElementById("input");

    elm_x2 = document.getElementById("x2");
    elm_y2 = document.getElementById("y2");
    elm_id = document.getElementById("id");
    elm_adpnum2 = document.getElementById("adpNum2");
    elm_name2 = document.getElementById("name2");
    elm_tp2 = document.getElementById("tp2");

    elm_id2_1 = document.getElementById("id2_1");
    elm_id2_2 = document.getElementById("id2_2");

    
    elm_sbm1.addEventListener("click",create);
    elm_sbm2.addEventListener("click",connect);
    elm_sbm3.addEventListener("click",simulate);
    elm_sbm4.addEventListener("click",edit);
    elm_sbm5.addEventListener("click",disconnect);

