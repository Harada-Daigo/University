import java.util.Random;
import java.util.Arrays;
class Judge{
    private int N;
    private int[] in, out;
    public Judge(int N){
        this.N = N;
        Random random = new Random();
        in = new int[N];
        for ( int i = 0; i < N; i++ )
        in[i] = random.nextInt(1000000000);//1000000000
        out = in.clone();
        Arrays.sort(out);
    }
    public void setData(int[] data){
        for ( int i = 0; i < N; i++ ) data[i] = in[i];
    }
    public void validate(int[] data){
        String res = "Yes";
        for ( int i = 0; i < N; i++ )
        if ( data[i] != out[i] ) res = "No";
        System.out.println(res);
    }
}
