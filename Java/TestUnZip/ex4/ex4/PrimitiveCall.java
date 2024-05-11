public class PrimitiveCall{
    public void test(){
            int x = 8;
            int y = 5;
            movePoint(x, y);
            System.out.println("(x, y) = (" + x + ", " + y + ")");
    }
    private void movePoint(int x, int y){
            x = 100;
            y = 120;
    }
    public static void main(String[] args){
        new PrimitiveCall().test();
    }
}