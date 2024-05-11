class ShapeApplication{
    public static void main(String[] args){
    Shape[] shapes = {
        new Circle(new Point(0, 0), 3),
        new Quadrangle(
        new Point(0, 0),
        new Point(4, 3),
        new Point(1, 5),
        new Point(0, 2)),
        new Parallelogram(new Point(5, 4), new Point(12, 7), 5),
        new Rectangle(new Point(3, 2), new Point(7, 5)),
        new Square(new Point(5, 6), 2)
    };
    for ( int i = 0; i < shapes.length; i++)
        shapes[i].move(8, 5);
    for ( int i = 0; i < shapes.length; i++)
        shapes[i].print();
    }
   }