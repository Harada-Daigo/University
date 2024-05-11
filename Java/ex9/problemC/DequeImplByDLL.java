class DequeImplByDLL implements Deque{
    private SimpleDoublyLinkedList list;
    private int n; // the number of elements in the deque
    DequeImplByDLL(){
        this.list = new SimpleDoublyLinkedList();
        this.n = 0;
    }
    /* your codes */
    public void insertFront(int key){
        this.list.addFront(key);
        this.n++;
    }
    public void insertBack(int key){
        this.list.addBack(key);
        this.n++;
    }
    public void removeFront(){
        this.list.removeFront();
        this.n--;
    }
    public void removeBack(){
        this.list.removeBack();
        this.n--;
    }
    public int front(){
        int front = this.list.front();
        return front;
    }
    public int back(){
        int back = this.list.back();
        return back;
    }
    public int size(){
        return this.n;
    }
    public boolean empty(){
        if(this.n == 0)return true;
        else return false;
    }   
}
   