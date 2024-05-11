public class Adder{
    String[] array;
    int sum;
    public Adder(String[] array){
        this.array = array;
    }
    public int Sum(){
        sum = 0;
        for(int i=0;i<array.length;i++){
            sum+=Integer.parseInt(array[i]);
        }
        return sum;
    }
    public static void main(String[] args){
        System.out.println((new Adder(args)).Sum());
    }
}