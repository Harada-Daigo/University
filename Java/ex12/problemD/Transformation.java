import java.util.Scanner;
public class Transformation{
    public String s;

    public Transformation(String s){
        this.s = s;
    }

    public void replace(int a, int b, String q){
        this.s = this.s.replace(s.substring(a,b+1),q);
    }
    
    public void reverse(int a, int b){
        StringBuilder sb = new StringBuilder();
        int i;

        for(i=b;i>=a;i--){
            sb.append(this.s.substring(i,i+1));
        }

        this.s = this.s.replace(this.s.substring(a,b+1),sb.toString());
    }
    public void print(int a, int b){
        System.out.println(s.substring(a,b+1));
    }
    public static void main(String[] args){
        int i;
        String order;

        Scanner sc = new Scanner(System.in);
        Transformation tf = new Transformation(sc.next());
        int N = sc.nextInt();

        for(i=0;i<N;i++){
            order = sc.next();
            if(order.equals("replace")){
                tf.replace(sc.nextInt(),sc.nextInt(),sc.next());
            }
            else if(order.equals("reverse")){
                tf.reverse(sc.nextInt(),sc.nextInt());
            }
            else {
                tf.print(sc.nextInt(), sc.nextInt());
            }
        }
    }
}