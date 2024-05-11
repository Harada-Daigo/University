class Square extends Shape{
    public Point[] p = new Point[4];
    public int w;
    public Square(Point p, int w){
        this.p[0] = p;
        this.w = w;
    }
    public void print(){
        super.print();
        System.out.print("("+p[0].x+", "+p[0].y+")-");
        System.out.print("("+(p[0].x+w)+", "+p[0].y+")-");
        System.out.print("("+(p[0].x+w)+", "+(p[0].y+w)+")-");
        System.out.println("("+p[0].x+", "+(p[0].y+w)+")");

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