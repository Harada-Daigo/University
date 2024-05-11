class Quadrangle extends Shape{
    protected Point[] P;
    public Quadrangle(Point p1, Point p2, Point p3, Point p4){
        P = new Point[5];
        P[1] = p1;
        P[2] = p2;
        P[3] = p3;
        P[4] = p4; 
    }
    public void print(){
            super.print();
            for(int i=1;i<=4;i++){
            System.out.print("("+P[i].x +", "+P[i].y+")");
            if(i<4) System.out.print("-");
        }
        System.out.println();
    }
    public void move(int dx, int dy){
        for(int i=1;i<=4;i++){
            P[i].x += dx;
            P[i].y += dy;
        }
    }
    
}
   