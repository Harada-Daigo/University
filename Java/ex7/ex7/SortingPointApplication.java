import java.util.Scanner;
class SortingPointApplication{
    public SortingPointApplication(){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Point[] p = new Point[n];

        for ( int i = 0; i < n; i++ ){
            p[i] = new Point(sc.nextInt(), sc.nextInt());
        }

        SortingMachine machine = new SortingMachine();
        
        machine.sort(p);

        for ( int i = 0; i < p.length; i++ ) p[i].print();
    }
    public static void main(String[] args){
        new SortingPointApplication();
    }
}
