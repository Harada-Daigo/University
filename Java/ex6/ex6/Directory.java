public class Directory extends Entity{
    //private String name;
    private File[] fileList = new File[100];
    private Directory[] directoryList = new Directory[100];
    private int numberOfFile = 0;
    private int numberOfDirectory = 0;
    public Directory(String name){
        this.name = name;
    }
    //public String getName(){ return name; }
    //public void rename(String name){this.name = name;}
    public int getSize(){
        int total = 0;
        for ( int i = 0; i < numberOfFile; i++ ){
                total += fileList[i].getSize();
        }
        for ( int i = 0; i < numberOfDirectory; i++ ){
                total += directoryList[i].getSize();
        }
        return total;
    }
    public void add(File file){
        fileList[numberOfFile++] = file;
    }
    public void add(Directory directory){
        directoryList[numberOfDirectory++] = directory;
    }
    public void display(){
        for ( int i = 0; i < numberOfFile; i++ ){
                    System.out.print(fileList[i].getName() + " ");
        }
        for ( int i = 0; i < numberOfDirectory; i++ ){
                    System.out.print(directoryList[i].getName() + " ");
        }
        System.out.println();
        System.out.println(this.getSize() + " bytes");
    }
   }
   