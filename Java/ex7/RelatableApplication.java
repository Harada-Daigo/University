import java.util.Scanner;
class RelatableApplication{
    public RelatableApplication(){
        Scanner sc = new Scanner(System.in);
        Point p1 = new Point(sc.nextInt(), sc.nextInt());
        Point p2 = new Point(sc.nextInt(), sc.nextInt());
        System.out.print("(" + p1.getX() + ", " + p1.getY() + ") ");
        if ( p1.isSmallerThan(p2) ){
            System.out.print("is smaller than ");
        } else {
            System.out.print("is not smaller than ");
        }
        System.out.println("(" + p2.getX() + ", " + p2.getY() + ") ");
    }
    public static void main(String[] args){
        new RelatableApplication();
    }
}
