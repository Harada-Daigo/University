import java.util.Scanner;
class RobotSimulatorApplication{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        TwirlingRobot tr = new TwirlingRobot();
        tr.initialize(0, 0, 0);
        String commands = sc.next();
        for ( int i = 0; i < commands.length(); i++ ){
            char command = commands.charAt(i);
            if ( command == 'M' ) tr.move();
            else if ( command == 'R' ) tr.turnRight();
            else if ( command == 'L' ) tr.turnLeft();
        }
        tr.printLocation();
    }
}