class SimpleNode{
    int key;
    SimpleNode next;
    SimpleNode prev;
    void SimpleNode(){
        next = new SimpleNode();
        prev = new SimpleNode();
    }
    void setNext(SimpleNode n){
        next = n;
    }
    void setPrev(SimpleNode n){
        prev = n;
    }
    //--addition--//
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