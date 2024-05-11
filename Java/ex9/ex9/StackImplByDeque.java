public class StackImplByDeque implements Stack{
    private DequeImplByDLL list;
    StackImplByDeque(){
        this.list = new DequeImplByDLL();
    }
    public void push(int x){
        this.list.insertFront(x);
    }
    public int pop(){
        int front = top(); 
        this.list.removeFront();
        return front;
    }
    public int top(){
        int front = this.list.front();
        return front;
    }
    public int size(){
        int size1 = this.list.size();
        return size1;
    }
    public boolean empty(){
        boolean b = this.list.empty();
        return b;
    }
}