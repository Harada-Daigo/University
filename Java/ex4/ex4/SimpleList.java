class SimpleList{
    private SimpleNode nil;
    SimpleList(){
        init();
    }
    void init(){
        nil = new SimpleNode();
        nil.setNext(nil);
        nil.setPrev(nil);
    }
    SimpleNode listSearch(int key){
        SimpleNode n;
        for(n = this.nil;n.next != this.nil;n = n.next){
            if(n.next.key == key){
                return n.next;
            }
        }
        return this.nil;
    }
    void printList(){
        SimpleNode n;
        //System.out.println();
        for(n = this.nil;n.next != this.nil;n = n.next){
            System.out.printf(n.next.key+" ");
        }
        System.out.println();
    }
    void delete(int key){
        SimpleNode n;
        n = listSearch(key);
        //System.out.println("\n-----n.key="+n.key);
        if(n == this.nil) return;
        //System.out.println("\n-----n.next.key="+n.next.key);
        //System.out.println("\n-----n.prev.key="+n.prev.key);
        n.next.setPrev(n.prev);
        n.prev.setNext(n.next);
        //System.out.println("\n-----n.next.prev.key="+n.next.prev.key);
        //System.out.println("\n-----n.prev.next.key="+n.prev.next.key);
    }
    void insert(int key){
        SimpleNode n = new SimpleNode();
        n.key = key;
        n.setPrev(this.nil);
        n.setNext(this.nil.next);
        this.nil.next.setPrev(n);
        this.nil.setNext(n);
        //System.out.println("\ninsert n.key="+n.key);
        //System.out.println("\n-----n.next.key="+n.next.key);
        //System.out.println("\n-----n.prev.key="+n.prev.key);
    }
}