public interface Deque {
    void insertFront(int key);
    void insertBack(int key);
    void removeFront();
    void removeBack();
    int front();
    int back();
    int size();
    boolean empty();
}
   