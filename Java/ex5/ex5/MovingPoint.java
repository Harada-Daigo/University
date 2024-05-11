class MovingPoint extends Point{
    //int x,y;
    int vx;
    int vy;
    MovingPoint(int x ,int y){
        super(x,y);
        //this.x = x;
        //this.y = y;
    }
    
    void setVelocity(int vx, int vy){
        this.vx = vx;
        this.vy = vy;
    }
    
    void move(){
        this.x += this.vx;
        this.y += this.vy;
    }
    /*
    void print(){
        super.print();
        //System.out.println("("+this.x+", "+this.y+")");
    }*/
    /*
    double getDistance(MovingPoint m2){
        return super.getDistance((Point)m2);
        double dx = m2.x - x;
        double dy = m2.y - y;
        double distance = Math.sqrt(dx*dx+dy*dy);
        return distance;
    }
    */
}