class SortingApplication{
    private static int N = 1000;
    public SortingApplication(){
        Judge judge = new Judge(N);
        int[] data = new int[N];
        SortingMachine machine = new SortingMachine(new SelectionSort());
        judge.setData(data);
        machine.sort(data);
        judge.validate(data);
        machine.setStrategy(new BubbleSort());
        judge.setData(data);
        machine.sort(data);
        judge.validate(data);
    }
    public static void main(String[] args){
        new SortingApplication();
    }
}
   