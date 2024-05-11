import java.util.Scanner;
class SortingRectangleApplication{
    public SortingRectangleApplication(){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Rectangle[] r = new Rectangle[n];
        for ( int i = 0; i < n; i++ ) {
            Point p1 = new Point(sc.nextInt(), sc.nextInt());
            Point p3 = new Point(sc.nextInt(), sc.nextInt());
            r[i] = new Rectangle(p1, p3); 
        }
        SortingMachine machine = new SortingMachine();
        machine.sort(r);
        for ( int i = 0; i < r.length; i++ )System.out.println(r[i].getArea());
    }
    public static void main(String[] args){
        new SortingRectangleApplication();
    }
}