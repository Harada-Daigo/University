import java.util.Scanner; // API to use the Scanner object
class Fahrenheit{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in); // A reference to a Scanner object
        int F = sc.nextInt(); // read an integer from the std. input
        double C = (5.0 / 9.0) * (F - 32);
        System.out.println(C);
    // you code
    }
}
