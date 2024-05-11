import java.util.Scanner;

class PointMovingApplication{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        Point pt = new Point();

        int Q = sc.nextInt();
        for ( int i = 0; i < Q; i++ ){
            int dx = sc.nextInt();
            int dy = sc.nextInt();
            pt.move(dx, dy);
        }

        System.out.println("(" + pt.getX() + ", " + pt.getY() + ")");
    }
}