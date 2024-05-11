public class SimpleDoublyLinkedList {
    private SimpleNode nil;
    SimpleDoublyLinkedList(){
        this.nil = new SimpleNode();
        nil.setNext(nil);
        nil.setPrev(nil);
    }
    private void deleteNode(SimpleNode t){
        t.getPrev().setNext(t.getNext());
        t.getNext().setPrev(t.getPrev());
    }
    public void removeFront(){ deleteNode(nil.getNext()); }
    public void removeBack(){ deleteNode(nil.getPrev()); }
    public int front(){ return nil.getNext().getKey(); }
    public int back(){ return nil.getPrev().getKey();}
    public void addFront(int key){
        SimpleNode x = new SimpleNode();
        x.setKey(key);
        x.setNext(nil.getNext());
        nil.getNext().setPrev(x);
        nil.setNext(x);
        x.setPrev(nil);
    }
    public void addBack(int key){
        SimpleNode x = new SimpleNode();
        x.setKey(key);
        x.setPrev(nil.getPrev());
        nil.getPrev().setNext(x);
        nil.setPrev(x);
        x.setNext(nil);
    }
}