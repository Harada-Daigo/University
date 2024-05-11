public class BubbleSort implements Strategy{
    public void sort(int[] data){
        int len = data.length;
        int i,j,cur,v;
        for(i=0;i<data.length-1;i++){
            for(j=data.length-1;j>i;j--){
                if(data[j] < data[j-1]){
                    v = data[j];
                    data[j] = data[j-1];
                    data[j-1] = v;
                }
            }
        }
    }
}