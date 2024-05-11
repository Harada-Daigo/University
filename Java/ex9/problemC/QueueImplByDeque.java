class QueueImplByDeque implements Queue{
    private DequeImplByDLL list;
    QueueImplByDeque(){
        this.list = new DequeImplByDLL();
    }
    public void enqueue(int key){
        this.list.insertBack(key);
    }
    public int dequeue(){
        int front = front();
        this.list.removeFront();
        return front;
    }
    public int front(){
        int front = this.list.front();
        return front;
    }
    public int size(){
        int size = this.list.size();
        return size;
    }
    public boolean empty(){
        boolean b = this.list.empty();
        return b;
    }
}