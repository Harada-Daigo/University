class AdvancedSortingMachine{
    protected Strategy strategy;
    public AdvancedSortingMachine(Strategy s){ strategy = s; }
    public void setStrategy(Strategy s){ strategy = s; }
    public void sort(int[] data){
        int s,t;
        System.out.println(strategy.getClass().getName());
        s = (int)System. currentTimeMillis();
        strategy.sort(data);
        t = (int)System.currentTimeMillis() - s;
        System.out.println("time: "+t);
    }
}