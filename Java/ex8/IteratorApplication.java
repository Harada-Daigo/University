import java.util.Scanner;
class IteratorApplication{
 public static void main(String[] args){
    new IteratorApplication().run();
 }
 void run(){
    Scanner sc = new Scanner(System.in);
    SimpleList list = new SimpleList();
    int Q = sc.nextInt();
    for ( int i = 0; i < Q; i++ ){
        String command = sc.next();
        int key = sc.nextInt();
        if ( command.equals("insert") ){
            list.insert(key);
        } else if ( command.equals("delete") ){
            list.delete(key);
        }
    }
    trace(list.forwardIterator());
    trace(list.backwardIterator());
 }
 private void trace(Iterator it){
    while( it.hasNext() ){
        SimpleNode node = (SimpleNode)it.next();
        System.out.print(node.getKey() + " ");
    }
    System.out.println();
    }
}
