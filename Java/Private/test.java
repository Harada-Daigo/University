public class test{
    public static void main(String args[]) {
        System.out.println("aa");
        System.out.println(args[0]);
        int[] tests = {0,1,2,3,4};
        int datas[] = new int[3];
        datas[0] = 1;
        datas[1] = 0;
        datas[2] = 5;
        int result = datas[0]+datas[1]+datas[2];
        for(int i=0;i<5;i++){
            System.out.println(tests[i]);
            if(tests[i]<3) result++;
            
        }
        System.out.println(result);
    }
}