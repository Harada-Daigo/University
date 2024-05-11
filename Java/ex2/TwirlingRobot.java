class TwirlingRobot{
    int x;
    int y;
    int dir;

    public void initialize(int rx, int ry, int d){
        x = rx;
        y = ry;
        dir = d;
    }
    public void turnLeft(){
        dir = (dir + 3) % 4;
    }
    public void turnRight(){
        dir = (dir + 1) % 4;
    }
    public void move(){
        if(dir%2 != 0) if(Math.abs(x+2-dir)<=4)x += (2 - dir);
        if(dir%2==0)if(Math.abs(y+(dir-1))<=4) y += (dir - 1);
    }
    public void printLocation(){
        System.out.println("("+x+", "+y+")");
    }
}