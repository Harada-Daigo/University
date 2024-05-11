class Rectangle implements Relatable{
    private int width, height;
    public Rectangle(Point p1, Point p3){
        this.width = Math.abs(p1.getX() - p3.getX());
        this.height = Math.abs(p1.getY() - p3.getY());
    }
    public int getArea(){
        return this.width*this.height;
    }

    public boolean isSmallerThan(Relatable other){
        Rectangle r = (Rectangle)other;
        if(this.getArea() < r.getArea()) return true;
        else if (this.getArea() == r.getArea()){
            if(this.getArea() < r.getArea()) return true;
            else return false;
        }
        else return false ;
    }


}