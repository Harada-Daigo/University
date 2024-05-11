import java.util.Scanner;
class SortingApplicationPlus{
 private int N;
 public SortingApplicationPlus(){
 Scanner sc = new Scanner(System.in);
 N = sc.nextInt();
 String algorithm = sc.next();
 AdvancedSortingMachine machine = new AdvancedSortingMachine(new SelectionSort());
 if ( algorithm.equals("bubble") ){
 machine.setStrategy(new BubbleSort());
 } else if ( algorithm.equals("merge") ){
 machine.setStrategy(new MergeSort());
 }
 int[] data = new int[N];
 Judge judge = new Judge(N);
 judge.setData(data);
 machine.sort(data);
 judge.validate(data);
 }
 public static void main(String[] args){
 new SortingApplicationPlus();
 }
}
