package jp.co.trainocate.camp.samples.window;

import jp.co.trainocate.camp.samples.enums.Hands;
import jp.co.trainocate.camp.samples.enums.Status;

import javax.swing*;

public class MainWindow{
    private final JFrame frame;
    private final JLabel messageLabel;
    private final JButton rockButton;
    private final JButton scissorsButton;
    private final JButton paperButton;
    private Status playState;
    private Hands opponentHand;

    public MainWindow(){
        this.frame = new JFrame("じゃんけんゲーム！");
        this.frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.frame.setBounds(200,200,600,400);
        var pane = this.frame.getContentPane();
        var canvas = new JPanel();
        canvas.setLayout(null);

        this.messageLabel = new JLabel("じゃーんけん・・・");
        this.messageLabel.setBounds(20,20,400,30);
        canvas.add(this.messageLabel);

        this.rockButton = new JButton(Hands.Rock.getDisplay());
        this.rockButton.setBounds(100,100,100,40);
        this.rockButton.addActionListener((e)->this.selectHand(Hands.Rock));
        canvas.add(this.rockButton);

        this.scissorsButton = new JButton(Hands.Scissors.getDisplay());
        this.scissorsButton.setBounds(100,100,100,40);
        this.scissorsButton.addActionListener((e)->this.selectHand(Hands.Scissors));
        canvas.add(this.scissorsButton);
        
        this.paperButton = new JButton(Hands.Paper.getDisplay());
        this.paperButton.setBounds(100,100,100,40);
        this.paperButton.addActionListener((e)->this.selectHand(Hands.Paper));
        canvas.add(this.paperButton);

        pane.add(canvas);
    }
    public void show(){
        this.init();
        this.frame.setVisible(true);
    }
    public void init(){
        this.opponentHand = Hands.getRandomHand();
        this.playState = Status.Wait;
    }
    public void selectHand(Hands selected){
        if(this.playState != Status.Wait){
            return;
        }
    }
}