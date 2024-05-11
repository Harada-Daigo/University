class QuadrangleApplication{
    public static void main(String[] args){
        Quadrangle q = new Quadrangle(
            new Point(0, 0),
            new Point(4, 3),
            new Point(1, 5),
            new Point(0, 2)
        );
            q.move(8, 5);
            q.print();
    }
}