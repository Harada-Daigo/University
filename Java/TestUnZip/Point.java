class Point{
    int x = 0;
    int y = 0;

    static int X_MIN;
    static int X_MAX;
    static int Y_MIN;
    static int Y_MAX;

    public void setX(int input){
        x = input;
    }
    public void setY(int input){
        y = input;
    }
    public int getX(){
        return x;
    }
    public int getY(){
        return y;
    }
    public void move(int dx,int dy){
        if((Math.abs(x+dx)>=X_MIN)&&(Math.abs(x+dx)<=X_MAX)){
            x += dx;
            //System.out.println("x = " + x);
        }
        if((Math.abs(y+dy)>=Y_MIN)&&(Math.abs(y+dy)<=Y_MAX)){
            y += dy;
            //System.out.println("y = " + y);
        }
    }
}