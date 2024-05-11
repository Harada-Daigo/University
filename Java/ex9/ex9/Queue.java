public interface Queue{
    void enqueue(int key);
    int dequeue();
    int front();
    int size();
    boolean empty();
}