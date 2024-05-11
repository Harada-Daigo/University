class SimpleNode{
    int key;
    SimpleNode next;
    SimpleNode prev;
    void SimpleNode(){
        this.next = new SimpleNode();
        this.prev = new SimpleNode();
    }
    void setNext(SimpleNode n){
        this.next = n;
    }
    void setPrev(SimpleNode n){
        this.prev = n;
    }
    //--addition--//
    void setKey(int x){
        this.key = x;
    }
    SimpleNode getNext(){
        return this.next;
    }
    SimpleNode getPrev(){
        return this.prev;
    }
    int getKey(){
        return this.key;
    }
}