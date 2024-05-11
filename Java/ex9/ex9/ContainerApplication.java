import java.util.Scanner;
class ContainerApplication{
    public static void main(String[] args){
        new ContainerApplication().run();
    }
    public void run(){
        Scanner sc = new Scanner(System.in);
        Deque deque = new DequeImplByDLL();
        Queue queue = new QueueImplByDeque();
        Stack stack = new StackImplByDeque();
        while(true){
            String to = sc.next(); // target
            if ( to.equals("end") ) break;
            String com = sc.next(); // command
            if ( to.equals("deque") ){
            if ( com.equals("insertFront") ) {
                deque.insertFront(sc.nextInt());
            } else if ( com.equals("insertBack") ){
                deque.insertBack(sc.nextInt());
            } else if ( com.equals("removeFront") ){
                deque.removeFront();
            } else if ( com.equals("removeBack") ){
                deque.removeBack();
            } else if ( com.equals("front") ){
                System.out.println(deque.front() + " from the front of the deque.");
            } else if ( com.equals("back") ){
                System.out.println(deque.back() + " from the back of the deque.");
            }
            } else if ( to.equals("stack") ){
            if ( com.equals("push") ) {
                stack.push(sc.nextInt());
            } else if ( com.equals("pop") ){
                System.out.println(stack.pop() + " from the top of the stack.");
            }
            } else if ( to.equals("queue") ){
            if ( com.equals("enqueue") ) {
                queue.enqueue(sc.nextInt());
            } else if ( com.equals("dequeue") ){
                System.out.println(queue.dequeue() + " from the front of the queue.");
            }
            }
        }
    }
}
