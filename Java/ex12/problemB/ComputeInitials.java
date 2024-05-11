public class ComputeInitials{
    String s;
    public ComputeInitials(String s){
        this.s = s;
    }
    public void printInitials(){
        int i;
        System.out.printf("My initials are: ");
        System.out.printf(s.substring(0,1));
        for(i=0;s.substring(i,i+1).equals(" ")!=true;i++);
        System.out.println(s.substring(i+1,i+2));
    }
    public static void main(String[] args){
        (new ComputeInitials(args[0])).printInitials();
    }
}