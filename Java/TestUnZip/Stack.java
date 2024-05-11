class Stack{
    int[] array = new int[100];
    int x;
    int head =0;
    int prev = 0;
    void push(int x){
        array[head] = x;
        head = (head+1)%100;
    }
    void pop(int x){
        head = (head+99)%100;
        System.out.println(array[head]);
    }
}