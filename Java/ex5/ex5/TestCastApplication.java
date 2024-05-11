class TestCastApplication{
    public static void main(String[] args){
        MovingPoint o1 = new MovingPoint(0,0);
        Point o2 = new MovingPoint(3,4);
        MovingPoint o3 = (MovingPoint)o2;

        o1.print();
        o2.print();
        o3.print();

        System.out.println(o2.getDistance(o1));
        System.out.println(o2.getDistance(o3));
    }
}