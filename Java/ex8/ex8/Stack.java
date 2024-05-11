class Stack implements OpenList{
    int head = 0;
    int tail = 0;
    public int pop(){
        int data;
        data = datas[head];
        head--;
        return data;
    }
    public void push(int x){
        head++;
        datas[head] = x;
    }  
    public boolean isEmpty(){
        if(head ==  0) return true;
        else return false;
    }
}