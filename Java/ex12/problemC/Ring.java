import java.util.Scanner;
public class Ring{
    StringBuilder ring;
    String x;
    public Ring(String s,String x){
        this.ring = new StringBuilder();
        this.ring.append(s);
        this.ring.append(s);
        this.x = x;
    }
    public boolean find(){
        int i;
        for(i=0;i<ring.length()/2;i++){
            if( x.substring(0,1).equals( Character.toString( ring.charAt(i) ) ) ){
                if( x.equals( ring.substring( i, i+( x.length() ) ) ) ){
                    return true;
                }
            }
        }
        return false;
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        //String s = sc.next();
        if( ( new Ring( sc.next(), sc.next() ) ).find() ){
            System.out.printf("Yes");
        }else System.out.printf("No");
    }
}