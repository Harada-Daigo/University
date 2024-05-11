class Parallelogram extends Shape{
    public Point[] p = new Point[4];
    public int w;
    public Parallelogram(Point p1,Point p3,int w){
        this.p[0] = p1;
        this.p[2] = p3;
        this.w = w;
    }
    public void print(){
        super.print();
        System.out.print("("+p[0].x+", "+p[0].y+")-");
        System.out.print("("+(p[0].x+w)+", "+p[0].y+")-");
        System.out.print("("+p[2].x+", "+p[2].y+")-");
        System.out.println("("+(p[2].x-w)+", "+p[2].y+")");
    }
    public void move(int dx, int dy){
        for(int i=0;i<4;i++){
            if(p[i]!=null){
                p[i].x += dx;
                p[i].y += dy;
            }
        }
    }
}