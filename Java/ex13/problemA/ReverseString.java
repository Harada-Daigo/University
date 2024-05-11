import java.io.*;
public class ReverseString{
    private final int N;
    public File file;
    public int[] data;
    public int len;
    public ReverseString(String sin){
        this.N = 100000;
        this.file = new File(sin);
        this.data = new int[N];
        this.len = 0;
    }
    public void Read() throws IOException{
        FileReader filereader;
        int i;
        filereader = new FileReader(file);
        for(i=0;( data[i] = filereader.read() ) != -1;i++){
           // System.out.print((char)data[i]);
        }
        len = i;
    }
    public void Write(String s) throws IOException{
        FileWriter fileWritten;
        PrintWriter pw;
        fileWritten = new FileWriter(s);
        pw = new PrintWriter(new BufferedWriter(fileWritten));
        int i;
        for(i=len-1;i>=0;i--){
            if((char)data[i]=='\b')System.out.println("|\\b|");
            else if((char)data[i]=='\t')System.out.println("    |\\t|");
            else if((char)data[i]=='\n')System.out.println("        |\\n|");
            else if((char)data[i]=='\r')System.out.println("            |\\r|");
            else if((char)data[i]=='\f')System.out.println("                |\\f|");

            //System.out.print((char)data[i]);
            if(((char)data[i])!='\r')pw.print((char)data[i]);
        }
        pw.close();

    }
    public static void main(String[] args)throws IOException{
        ReverseString rs = new ReverseString("input.txt");
        rs.Read();
        rs.Write("output.txt");
        
    }

}