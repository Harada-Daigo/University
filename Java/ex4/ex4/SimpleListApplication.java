import java.util.Scanner;
class SimpleListApplication{
    public static void main(String[] args){
        new SimpleListApplication().run();
    }
    void run(){
        SimpleList list = new SimpleList();
        Scanner sc = new Scanner(System.in);
        int Q = sc.nextInt();
        for ( int i = 0; i < Q; i++ ){
            String command = sc.next();
            if ( command.equals("insert") ){
                int key = sc.nextInt();
                list.insert(key);
            } else if ( command.equals("delete") ) {
                int key = sc.nextInt();
                list.delete(key);
            } else if ( command.equals("print") ) {
                list.printList();
            }
        }
    }
}