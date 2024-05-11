class Point{
    int x = 0;
    int y = 0;

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
        if(Math.abs(x+dx)<=100){
            x += dx;
            //System.out.println("x = " + x);
        }
        if(Math.abs(y+dy)<=100){
            y += dy;
            //System.out.println("y = " + y);
        }
    }
}