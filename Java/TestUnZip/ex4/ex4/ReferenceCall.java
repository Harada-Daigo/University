public class ReferenceCall{
public void test(){
Point point = new Point(8, 5);
movePoint(point);
int x = point.getX();
int y = point.getY();
System.out.println("(x, y) = (" + x + ", " + y + ")");
}
private void movePoint(Point p){
p.setX(100);
p.setY(120);
p = new Point(0, 0);
}
public static void main(String[] args){
new ReferenceCall().test();
}
}