class App{
    constructor(){
        this.CHUNK = 50;
        this.NUMCHUNK = 5; 
        this.BLOCKSIZE = 5;
        this.ENTITY_SIZE = 1000;
        this.FPS = 60;
        this.MAPUPDATE = 1;
        this.EntityNum=0;
        this.CHUNK_I = 0;
        this.CHUNK_J = 0;

        this.mx=0;
        this.my=0;

        this.cv = document.getElementById("canvas");
        this.ctx = this.cv.getContext("2d");

        this.size_block(0);
        this.magnification(1);

        this.cv.addEventListener("mousemove",this.mouse_point);
        //this.resize_canvas(CHUNK*NUMCHUNK*BLOCKSIZE,CHUNK*NUMCHUNK*BLOCKSIZE)

        this.map = this.chunk_0d_list(this.CHUNK,this.NUMCHUNK);
        this.objects = this.chunk_0d_list(this.CHUNK,this.NUMCHUNK);
        this.entities = this.chunk_1d_list(this.ENTITY_SIZE,this.NUMCHUNK);
    }
    delete_canvas(){
        this.ctx.clearRect(0,0,this.cv.width,this.cv.height);
    }
    navigate_entity(e,x,y){
        e.locx = x;
        e.locy = y;
    }
    which_chunks(object){
        let cx = parseInt(object.x/(this.CHUNK));
        let cy = parseInt(object.y/(this.CHUNK));
        let xy = [cx,cy];
        return xy;
    }
    create_entity(type,p){
        let i;
        let e = new entity(type,p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7]);
        let xy = this.which_chunks(e);
        for(i=0;(i<this.EntityNum);i++){
            if(this.entities[xy[1]][xy[0]][i]==null)break;
        }
        this.entities[xy[1]][xy[0]][i] = e;
        return e;
        //this.entities %= (this.ENTITY_SIZE*this.NUMCHUNK);
        //console.log("create entity to ("+e.x+","+e.y+") chunk=>("+xy[1]+" "+xy[0]+" "+i+")");
    }
    move_entity(chunk){
        let entity;
        for(let i=0;i<chunk.length;i++){
            entity = chunk[i]
            if(entity==null)continue;
            if(entity.locx==-1){
                //for(let i=0;i<this.ENTITY_SIZE;i++)console.log(chunk[i]);
                entity.directionTo(-1);
                entity.walk();
            }else{
                if((entity.x!=entity.lox)&&(entity.y!=entity.locy)){
                    if(Math.floor(Math.random()*2)) entity.directionTo(2-Math.floor((entity.locx - entity.x)/Math.abs(entity.locx-entity.x)));

                    else entity.directionTo(1+Math.floor((entity.locy - entity.y)/Math.abs(entity.locy-entity.y)));
                }
                else{
                    if(entity.lox != entity.x)entity.direction(2-Math.floor((entity.locx - entity.x)/Math.abs(entity.locx-entity.x)));
                    else entity.directionTo(1+Math.floor((entity.locy - entity.y)/Math.abs(entity.locy-entity.y)));
                }
                entity.run();
            }
        }
    }
    show_entities(chunk){
        let i;
        for(i=0;i<chunk.length;i++){
            if(chunk[i]!=null)this.draw_entity("test",chunk[i].x,chunk[i].y);
        }
    }
    show_map(){
        let i,j,u,v;
        let x,y;
        for(i=0;i<this.map.length;i++){
            for(j=0;j<this.map[i].length;j++){
                this.draw_block(this.map[i][j],j*this.BLOCKSIZE,i*this.BLOCKSIZE,this.BLOCKSIZE,this.BLOCKSIZE);
            }
        }
    }

    mouse_point(e){
        let tmr = 0;
        let x=e.clientX;
        let y=e.clientY;
        if(tmr%1==0)console.log("mouse x="+x+" y="+y);
        tmr=(tmr+1)%10;
    }
    resize_canvas(w,h){
        this.cv.width = w;
        this.cv.height = h;
    }
    magnification(mg){
        this.BLOCKSIZE *= mg;
    }
    size_block(w){
        //console.log("blocksieze=>"+this.cv.width/(this.CHUNK*this.NUMCHUNK));
        if(w==0)this.BLOCKSIZE = this.cv.width/(this.CHUNK*this.NUMCHUNK);
        else this.BLOCKSIZE = w;
    }
    setColor(c){
        this.ctx.fillStyle = c;
    }
    lineWidth(w){
        this.ctx.lineWidth=w;
    }
    draw_entity(type,x,y){
        if(type=="test"){
            this.setColor("red");
            this.ctx.beginPath();
            this.ctx.arc(x,y,5,0,2*Math.PI,false);
            this.ctx.fill();
        }
    }
    draw_block(type,x,y,w,h){
        if(type == null){
            this.ctx.beginPath();
            this.lineWidth(0.1);
            this.setColor("green");
            this.ctx.fillRect(x,y,w,h);
            this.setColor("black");
            this.ctx.strokeRect(x,y,w,h);
        }
    }
    chunk_1d_list(chunk_amount,num_chunk){
        let parent = this.chunk_0d_list(1,num_chunk);
        let chunk = new Array(chunk_amount);
        let i,j;
        for(i=0;i<chunk_amount;i++)chunk[i]=null;
        for(i=0;i<num_chunk;i++)for(j=0;j<num_chunk;j++)parent[i][j]=chunk;

        return parent;
    }
    chunk_0d_list(chunk_width,num_chunk){
        let i;
        let parent = new Array(num_chunk*chunk_width);

        for(i=0;i<num_chunk*chunk_width;i++){
            parent[i] = new Array(num_chunk);
            for(let j=0;j<num_chunk*chunk_width;j++){
                parent[i][j] = null;
            }
        }

        return parent;
    }
    chunk_list_printer(list,b){
        let i,j,u,v;
        if(b){
            for(i=0;i<list.length;i++){
                for(j=0;j<list[i].length;j++){
                    for(u=0;u<list[i][j].length;u++){
                        for(v=0;v<list[i][j][u].length;v++){
                            console.log(list[i][j][u][v]+" ");
                            console.log("\n");
                        }
                    }
                }
            }
        }
        else{
            for(i=0;i<list.length;i++){
                for(j=0;j<list[i].length;j++){
                    for(u=0;u<list[i][j].length;u++){
                        console.log(list[i][j][u]+" ");
                    }
                    console.log("\n");
                }
            }
        }
    }    
}
//["tester",100,20,10,10,30,30,0]
class entity{
    constructor(type,name,hp,attack,speed,attack_scope,x,y,direction){
        this.name = name
        this.type = type;
        this.hp = hp;
        this.attack = attack;
        this.speed = speed;
        this.attack_scope = attack_scope;
        this.x = x;
        this.y = y;
        this.direction = direction;//東西南北1302
        this.locx = -1;
        this.locy = -1;
    }
    walk(){
        this.x += ((1-this.direction)%2)*this.speed*0.6;
        this.y += ((2-this.direction)%2)*this.speed*0.6;
        console.log("x="+this.x+","+"y="+this.y);
    }
    run(){
        this.x += ((1-this.direction)%2)*this.speed;
        this.y += ((2-this.direction)%2)*this.speed;
    }
    be_attacked(damage){
        this.hp -= damage;
    }
    attack_charactor(list){
        for(i=0;i<list.length;i++){
            let x = list[i].x;
            let y = list[i].y;
            let d = Math.sqrt((x-this.x)*(x-this.x)+(y-this.y)*(y-this.y));
            if(d<=this.attack_scope)return i;
        }
    }
    directionTo(n){
        if(n==-1)this.direction=Math.floor(Math.random()*4);
        else this.direction = n;
        console.log("n->"+this.direction);

    }
}
var main = new App();
//main.chunk_list_printer(main.chunk_1d_list(5,2),false);
for(let p=0;p<1000;p++){
    let ee = main.create_entity("test",["tester",100,20,10,100,250,150,0]);
    main.navigate_entity(ee,0,0);

}
//main.create_entity("test",["tester",100,20,10,100,30,30,0]);
//main.chunk_list_printer(main.chunk_1d_list(main.ENTITY_SIZE,main.NUMCHUNK),false);
//main.chunk_list_printer(main.entities,false);
for(let p=0;p<main.NUMCHUNK;p++){
    for(let w=0;w<main.NUMCHUNK;w++){
        for(let t=0;t<main.ENTITY_SIZE;t++){
            if(main.entities[p][w][t]!=null){
                //console.log("--"+main.entities[p][w][t].name);
            }
        }
    }
}
function mainloop(){
    console.log("1");
    //main.delete_canvas();
    let stime = new Date().getTime();
    if(main.MAPUPDATE == 1) main.show_map();
    main.MAPUPDATE = 0;
    console.log("--"+main.CHUNK_I+"---"+Math.floor(main.CHUNK_I/main.NUMCHUNK)+"---"+main.NUMCHUNK+"----");
    main.move_entity(main.entities[Math.floor(main.CHUNK_I/main.NUMCHUNK)][main.CHUNK_I%main.NUMCHUNK]);
    main.show_entities(main.entities[Math.floor(main.CHUNK_I/main.NUMCHUNK)][main.CHUNK_I%main.NUMCHUNK]);
    main.CHUNK_I = (main.CHUNK_I+1)%(main.NUMCHUNK*main.CHUNK)
    let ptime = new Date().getTime() - stime;
    setTimeout(mainloop,parseInt(1000/main.FPS)-ptime);
}
mainloop();