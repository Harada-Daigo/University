abstract class Shape{
    public void print(){
        System.out.print(this.getClass().getName() + ": ");
    }
    public abstract void move(int dx, int dy);
}
   