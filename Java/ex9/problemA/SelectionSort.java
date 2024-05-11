public class SelectionSort implements Strategy{
    public void sort(int[] data){
        int i,j,min,v;
        for(i=0;i<data.length;i++){
            min = minimum(data,i);
            v = data[i];
            data[i] = data[min]; 
            data[min] = v;
        }
    }

    private int minimum(int[] data, int s){
        int i,min=s;
        for(i = s+1;i < data.lengthAdvancedSortingMachine.java ; i++){
            if(data[i] < data[min]) min = i;
        }
        return min;
    }
}