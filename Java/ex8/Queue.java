class Queue implements OpenList{
    int head = 0;
    int tail = 0;
    public int pop(){
        int data;
        data = datas[head];
        head = (head+1)%N;
        return data;
    }
    public void push(int x){
        int next;
        next = (tail+1)%N;
        datas[tail] = x;
        tail = next;
    }
    public boolean isEmpty(){
        if(head==tail) return true;
        else return false;
    }
}