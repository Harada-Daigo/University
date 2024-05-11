import java.util.Scanner;
import java.lang.String;
//import java.util.regex.Pattern;
//import java.util.regex.Matcher;
//import java.io.File;
//import java.io.FileReader;
class toukei{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double[] data;
        //double result;
        int order;
        int N,i,f=0;
        double memory;


        memory = 0;

        System.out.printf("The Number of Datas: ");
        N = sc.nextInt();
        data = new double[N];

        System.out.printf("Datas: ");
        for(i=0;i<N;i++){
            data[i] = sc.nextDouble();
        }
        //Main Function//
        while(true){
            System.out.println("    <-MENU-> | 0:dispersion(Bunsan) | 1:average | 2:sqrt | 3:stop |");
            System.out.printf("order: ");
            order = sc.nextInt();

            if(order==0){
                memory = bunsan(data,N);
                System.out.println("dispersion: "+ memory);
            }
            else if(order==1){
                memory =  heikin(data,N);
                System.out.println("average: "+memory);
            }
            else if(order==2){
                if(f==0){
                    System.out.println("    Error: No memory");
                    continue;
                }
                memory = Math.sqrt(memory);
                System.out.println("sqrt: "+memory);
            }
            else if(order==3)break;

            else continue;
            f++;
        }
    }
    public static double bunsan(double[] data,int N){
        double sum,heikin;
        int i;

        heikin = heikin(data,N);
    
        sum = 0;
        for(i=0;i<N;i++){sum += (data[i] - heikin)*(data[i] - heikin);}

        return (sum/((double)N));
    }
    public static double heikin(double[] data,int N){
        double sum1=0;
        double heikin;
        int i;
        for(i=0;i<N;i++){sum1 += data[i];}//average
        heikin = sum1/N;
        return heikin;
    }

}