interface OpenList{
    final int N = 1000;
    int[] datas = new int[N];
    public int pop();
    public void push(int x);
    public boolean isEmpty();

}