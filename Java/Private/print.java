class print{
    public static void main(String[] args){
        while(true){
        RealTimePrint(500,"**********");
        RealTimePrint(500,"xxxxx\s\s\s\s\s");
        }
    }
    public static void RealTimePrint(int span, String s){
        int i;
        //Thread.sleep(span);
        try {
            System.out.print(s);
            for(i=0;i<s.length();i++)System.out.print("\b\b");
            Thread.sleep(span);
        } catch(InterruptedException e){
        }  
    }
}