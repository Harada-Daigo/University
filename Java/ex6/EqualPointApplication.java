class EqualPointApplication{
    public static void main(String[] args){
        Point p1 = new Point(1, 2);
        Point p2 = new Point(1, 2);
        if ( p1 == p2 ) {
            System.out.println("p1 == p2");
        } else {
            System.out.println("p1 != p2");
        }
        if ( p1.equals(p2) ){
            System.out.println("p1 and p2 is equal");
        } else {
            System.out.println("p1 and p2 is not equal");
        }
    }
}
   