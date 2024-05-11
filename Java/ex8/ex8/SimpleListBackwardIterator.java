public class SimpleListBackwardIterator implements Iterator{
    private SimpleList simpleList;
    private SimpleNode cur;
    public SimpleListBackwardIterator(SimpleList simpleList){
        this.simpleList = simpleList;
        cur = simpleList.getNil().getPrev();
    }
    public boolean hasNext(){
        return cur != simpleList.getNil();
    }
    public Object next(){
        Object target = cur;
        cur = cur.getPrev();
        return target;
    }
}
   