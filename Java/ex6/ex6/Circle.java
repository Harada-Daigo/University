class Circle extends Shape{
    public Point[] p = new Point[4];
    public int radius;
    public Circle(Point p,int radius){
        this.p[0] = p;
        this.radius = radius;
    }
    public void print(){
        super.print();
        System.out.print("("+this.p[0].x+", "+this.p[0].y+") ");
        System.out.println("radius = "+radius);        
    }
    @Override
    public void move(int dx, int dy){
        for(int i=0;i<4;i++){
            if(p[i]!=null){
                p[i].x += dx;
                p[i].y += dy;
            }
        }
    }
}