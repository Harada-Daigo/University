package Beta_and_Delta;
import Alpha_and_Gamma.Alpha;
import Beta_and_Delta.Beta;
import Alpha_and_Gamma.Gamma;
public class Delta{
 Alpha alpha = new Alpha();
 Beta beta = new Beta();
 Gamma gamma = new Gamma();
 public Delta(){
 alpha.show(gamma);
 beta.show(gamma);
 gamma.show(alpha);
 }
 public static void main(String[] args){
 new Delta();
 }
}
