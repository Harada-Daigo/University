import java.util.Scanner;
class GasStation{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int order;
        int now=0;
        int j;
        int lane = 1;
        int lanes = sc.nextInt();
        int infos = sc.nextInt();

        int[] num = new int[lanes+1];//lane
        int[] cars = new int[infos+1];//lane
        int[] cartype = new int[infos+1];
        
        for(int i=0;i<infos;i++){
            order = sc.nextInt();
            if(order==1){
                lane = 1;
                for(j=1;j<=lanes;j++){
                    if(num[lane]>num[j])lane=j;
                    //System.out.println("--num["+j+"] = "+ num[j]);
                }
                //System.out.println("lane = "+lane);
                cars[now] = lane;
                cartype[now] = sc.nextInt();

                ////System.out.println("cars["+now+"] = "+cars[now]);
                //System.out.println("cartype["+now+"] = "+cartype[now]);

                num[lane]++;
                now++;

                //System.out.println("num["+lane+"] = "+num[lane]);
                //System.out.println();
            }
            else{
                lane = sc.nextInt();
                for(j=0;j<=now;j++){
                    if(cars[j]==lane){
                        System.out.println(cartype[j]);
                        cartype[j] = 0;
                        cars[j] = 0;
                        break;
                    }
                }
                if(j>now)System.out.println("Not Found!");
                num[lane]--;

            }
        }
    }
}