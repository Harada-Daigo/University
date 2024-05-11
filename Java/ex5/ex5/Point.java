class Point{
    int x;
    int y;
    Point(int x ,int y){
        this.x = x;
        this.y = y;
    }
    void print(){
        //super.print();
        System.out.println("("+this.x+","+this.y+")");
    }

    double getDistance(Point m2){
        double dx = m2.x - x;
        double dy = m2.y - y;
        double distance = Math.sqrt(dx*dx+dy*dy);
        return distance;
    }
}