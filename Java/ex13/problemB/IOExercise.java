import java.io.*;
public class IOExercise{
    public  double x;//
    public File file;//
    public BufferedReader br;//
    public DataInputStream dis;
    public DataOutputStream dos;
    public FileInputStream fis;
    public FileOutputStream fos;//
    public BufferedInputStream bis;
    public BufferedOutputStream bos;//
    public IOExercise()throws IOException{

        file = new File("number.data");
        
    }
    public void WriteFile(double x)throws IOException{
        fos = new FileOutputStream(file);
        bos = new BufferedOutputStream(fos);
        bos.write((byte)x);
    }
    public static void main(String[] args)throws IOException{
            IOExercise ioe = new IOExercise();
            ioe.br = new BufferedReader(new InputStreamReader(System.in));
            ioe.x = (double)ioe.br.read();
            System.out.println("Square root of "+ioe.x+" is "+Math.sqrt(ioe.x));
    }
}