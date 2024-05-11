class RangingPointApplication{
    public static void main(String[] args){
        Point p1 = new Point();
        Point p2 = new Point();
        Point.X_MIN = -100; // update of the static field
        Point.X_MAX = 100;
        Point.Y_MIN = -100;
        Point.Y_MAX = 100;
        p1.move(50, 50);
        p1.move(100, 100);
        p2.move(-100, -100);
        System.out.println("(" + p1.getX() + ", " + p1.getY() + ")");
        System.out.println("(" + p2.getX() + ", " + p2.getY() + ")");
        p2.X_MAX = 200;
        p2.Y_MAX = 200;
        p1.X_MIN = -200;
        p1.Y_MIN = -200;
        p1.move(100, 100);
        p2.move(-100, -100);
        System.out.println("(" + p1.getX() + ", " + p1.getY() + ")");
        System.out.println("(" + p2.getX() + ", " + p2.getY() + ")");
    }
}