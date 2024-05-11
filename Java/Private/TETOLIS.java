import javax.swing.*;
import java.awt.Graphics;
import java.awt.Color;
import java.awt.*;
import java.awt.event.*;
public class TETOLIS extends JFrame implements ActionListener{
    public int[][] map;
    public int [][] piece;
    public int w,h;
    public int px,py;
    public boolean fl;
    public final int SIZE;
    public final int WIDTH; 
    public final int HEIGHT;
    public TETOLIS(){
        this.WIDTH = 12;
        this.HEIGHT = 22;
        this.px = 1;
        this.py = 1;
        this.SIZE = 25;
        this.fl = true;
        this.map = new int[HEIGHT][WIDTH];
        this.piece = new int[4][4];
    }
    public void initialize_map(){
        int i,j;
        //0deumeru
        for(i=0;i<HEIGHT;i++){
            for(j=0;j<WIDTH;j++){
                map[i][j] = 0;
            }
        }
        //kabe
        for(i=0;i<HEIGHT;i++){
            map[i][0] = 1;
            map[i][WIDTH-1] = 1;
        }
        for(j=0;j<WIDTH;j++){
            map[0][j] = 1;
            map[HEIGHT-1][j] = 1;
        }
    }
    public void getPiece(int x){
        switch (x) {
            /*
            * - - -
            * * - -
            - * - -
            - - - -
            */
            case 0:
                piece[0][0] = 3;
                piece[1][0] = 2;
                piece[1][1] = 2;
                piece[2][1] = 2;
                break;
            /*
            * * * *
            - - - -
            - - - -
            - - - -
            */
            case 1:
                piece[0][0] = 3;
                piece[0][1] = 2;
                piece[0][2] = 2;
                piece[0][3] = 2;
                break;
            /*
            * - - -
            * * * *
            - - - -
            - - - -
            */
            case 2:
                piece[0][0] = 3;
                piece[1][0] = 2;
                piece[1][1] = 2;
                piece[1][2] = 2;
                piece[1][3] = 2;
                break;
            /*
            * * * *
            * - - -
            - - - -
            - - - -
            */
            case 3:
                piece[0][0] = 3;
                piece[0][1] = 2;
                piece[0][2] = 2;
                piece[0][3] = 2;
                piece[1][0] = 2;
                break;
            /*
            * * - -
            * * - -
            - - - -
            - - - -
            */
            case 4:
                piece[0][0] = 3;
                piece[0][1] = 2;
                piece[1][0] = 2;
                piece[1][1] = 2;
                break;
             /*
            - * - -
            * * * -
            - - - -
            - - - -
            */
            case 5:
                piece[0][1] = 3;
                piece[1][0] = 2;
                piece[1][1] = 2;
                piece[1][2] = 2;
                break;
        }
    }
    public void spin(){//
        int[][] temp = new int[4][4];
        int i,j;
        for(i=0;i<4;i++){
            for(j=0;j<4;j++){
                temp[j][i] = piece[i][j];
            }
        }
        piece = temp;
    }

    public void xmove(int s){
        int i,j;
        px += s;
        if(false){//if(atarihantei()){
            px-=s;
            return;
        }
        for(i=py;i<py+4;i++){
            for(j=px;j<px+4;j++){
                if( (i>0)&&(j>0)&&(i<HEIGHT-1)&&(j<WIDTH-1) ) map[i][j] = piece[i-py][j-px];
            }
        }
    }
    public void ymove(int s){
        int i,j;
        py -= s;
        if(false){//atarihantei()){
            py+=s;
            return;
        }
        for(i=py;i<py+4;i++){
            for(j=px;j<px+4;j++){
                if( (i>0)&&(j>0)&&(i<HEIGHT-1)&&(j<WIDTH-1) ) map[i][j] = piece[i-py][j-px];
            }
        }
    }

    public void delete(){
        int i,j;
        for(i=py;i<py+4;i++){
            for(j=px;j<px+4;j++){
                if( (i>0)&&(j>0)&&(i<HEIGHT)&&(j<WIDTH) ) map[i][j] = 0;
            }
        }
    }
    
    public void downBrock(int i){
        int j,u;
        for(j=i;j>=1;j--){
            for(u=1;u<WIDTH-1;u++){
                if(j!=1)map[j][u] = map[j-1][u];
                else map[1][u] = 0; 
            }
        }
    }

    public void complete(){
        int i,j,u;
        int count = 0;

        for(i=1;i<HEIGHT-1;i++){
            for(j=1;j<WIDTH-1;j++) if(map[i][j]>=2)count++;
            if(count == WIDTH-2){
                for(u=1;u<WIDTH-1;u++) map[i][u]=4;
                count=0;
            }
        }

        for(i=HEIGHT-2;i>=1;i--){
            while(true){
                if(map[i][1]==4){
                    downBrock(i);
                }
                else break;
            }
        }
    }


    public boolean atarihantei(){
        int i,j,k;
        int x,y;


        x = 1-px;
        y = 1-py;
        //xs
        if(x>=0)for(i=0;i<4;i++)if(piece[i][x]>=2)return true;
        if(y>=0)for(i=0;i<4;i++)if(piece[y][i]>=2)return true;

        x = (WIDTH-1)-(px+3);
        y = (HEIGHT-1)-(py+3);

        if( (0<=3-x)&&(3-x<=3) )for(i=0;i<4;i++)if(piece[i][3-x]>=2)return true;
        if( (0<=3-x)&&(3-y<=3) )for(i=0;i<4;i++)if(piece[3-y][i]>=2)return true;
        
        return false;
    }
    public void print_map(){
        int i,j;
        for(i=0;i<HEIGHT;i++){
            System.out.printf("line %02d: ",i);
            for(j=0;j<WIDTH;j++){
                System.out.printf("%d ",map[i][j]);
            }
            System.out.println();
        }
        System.out.println();
    }

    public static void mainComponent(TETOLIS tl){
        JFrame frame = new JFrame("TETOLIS");
        frame.setBackground(Color.black);
        frame.add(new DrawCanvas(tl.map,tl.SIZE));
        frame.setBounds(500,50,(tl.SIZE*tl.WIDTH) ,(tl.SIZE*tl.HEIGHT) );//setting where window opens.
        frame.setSize(tl.SIZE*(tl.WIDTH)+10,tl.SIZE*(tl.HEIGHT)+30);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);//setting activity when close button was pushed.
        if(tl.fl)frame.setVisible(true);
        tl.fl = false;
        frame.repaint();
    }
    public static  void main(String[] args)throws InterruptedException{
        TETOLIS tl = new TETOLIS();
        Timer timer = new Timer(1000,this);
        
        tl.initialize_map();
        SwingUtilities.invokeLater(new Runnable(){
            public void run(){
                mainComponent(tl);
            }
        });
        timer.start();
    }
    public void actionPerformed(ActionEvent e){
        System.out.printf("||px=%d,py=%d||",tl.px,tl.py);
        tl.getPiece(4);
        tl.xmove(0);
        tl.delete();
        tl.ymove(-1);
    }
}



class DrawCanvas extends JPanel{
    int[][] map;
    final int SIZE;
    public DrawCanvas(int[][] map,int SIZE){
        this.map = map;
        this.SIZE = SIZE;
    }
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        int i,j;
        Color out,in;
        for(i=0;i<map.length;i++){
            for(j=0;j<map[0].length;j++){
                //System.out.printf("%d ",map[i][j]);
                if(map[i][j]>0){
                    switch(map[i][j]){
                        case 1:
                            //System.out.printf("|case 1| ");
                            g.setColor(Color.black);
                            break;
                        case 2:
                        case 3:
                            //System.out.printf("|case 2| ");
                            g.setColor(Color.red);
                            break;
                    }
                    g.fillRect(j*SIZE,i*SIZE,SIZE,SIZE);
                    g.setColor(Color.white);
                    g.drawRect(j*SIZE,i*SIZE,SIZE,SIZE);
                    g.setColor(Color.white);
                }
            }
            //System.out.println();
        }
    }
}
