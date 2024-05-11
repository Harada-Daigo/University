public class SimpleListForwardIterator implements Iterator{
    private SimpleList simpleList;
    private SimpleNode cur;
    public SimpleListForwardIterator(SimpleList simpleList){
        this.simpleList = simpleList;
        cur = simpleList.getNil().getNext();//next of nil
    }
    public boolean hasNext(){
        return cur != simpleList.getNil();//not nil
    }
    public Object next(){
        Object target = cur;
        cur = cur.getNext();
        return target;
    }
   }
   