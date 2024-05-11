class MergeSort implements Strategy{
    public void sort(int[] data){
        mergeSort(data,0,data.length);
        //for(int i=0;i<data.length;i++)System.out.printf(data[i]+" ");
    }
    public void mergeSort(int[] data,int p, int r){
        int q;
        q = (p + r)/2;
        if(p>=q) return;

        //for(int i=p;i<r;i++)System.out.printf(data[i]+" ");
        //System.out.println();

        mergeSort(data,p,q);
        mergeSort(data,q, r);
        data = merge(data, p, q, r);
    }
    public int[] merge(int[] data, int p, int q, int r){
        int i;
        int[] temp = new int[data.length];
        int temp_pos = p;
        int left_end = q;
        int left = p;
        int mid = q;
        int right = r;

        //System.out.println("\nbefore!");
        //for(i=p;i<r;i++)System.out.printf(data[i]+" ");

        while ((left < left_end) && (mid < right)){
            if(data[left] <= data[mid]){
                temp[temp_pos] = data[left];
                temp_pos++;
                left++;
            }
            else{
                temp[temp_pos] = data[mid];
                temp_pos++;
                mid++;
            }
        }
        while(left < left_end){
            temp[temp_pos] = data[left];
            temp_pos++;
            left++;
        }
        while(mid < right){
            temp[temp_pos] = data[mid];
            temp_pos++;
            mid++;
        }

        for(i=p;i<r;i++){
            data[i] = temp[i];
        }
        //System.out.println("\nafter!");
        //for(i=p;i<r;i++)System.out.printf(data[i]+" ");
        return data;
    }
}