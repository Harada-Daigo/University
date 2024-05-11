import java.util.Scanner;

class PointCreationApplication{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        Point p1 = new Point();
        Point p2 = new Point();
        p1.setX(sc.nextInt());
        p1.setY(sc.nextInt());
        p2.setX(sc.nextInt());
        p2.setY(sc.nextInt());
        System.out.println("(" + p1.getX() + ", " + p1.getY() + ")");
        System.out.println("(" + p2.getX() + ", " + p2.getY() + ")");
    }
}