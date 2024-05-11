class SortingPointMachine{
    PointComparator comparator;
    public SortingPointMachine(PointComparator comparator){
    this.comparator = comparator;
    }
    public void setComparator(PointComparator comparator){
    this.comparator = comparator;
    }
    public void sort(Point[] a){
    for ( int i = 0; i < a.length; i++ ){
    int mini = i;
    for ( int j = i+1; j < a.length; j++ ){
    if ( comparator.compare(a[j], a[mini]) < 0 ) mini = j;
    }
    Point t = a[mini];
    a[mini] = a[i];
    a[i] = t;
    }
    }
   }
   