/*class SortingMachine{
    public void sort(Point[] p){
        Point r;
        int i,j,max;
        for(i=0;i<p.length-1;i++){
            max = i;
            for(j=i+1;j<p.length;j++){
                if(p[max].isSmallerThan(p[j])==false)max = j;
            }
            r = p[i];
            p[i] = p[max];
            p[max] = r;
        }
    }
}*/
class SortingMachine{
    public void sort(Rectangle[] p){
        Rectangle r;
        int i,j,max;
        for(i=0;i<p.length-1;i++){
            max = i;
            for(j=i+1;j<p.length;j++){
                if(p[max].isSmallerThan(p[j])==false)max = j;
            }
            r = p[i];
            p[i] = p[max];
            p[max] = r;
        }
    }
}