package jp.co.trainocate.camp.samples.enums;

import java.util.Random;

public enum Hands{
    Rock("グー",0),
    Scissors("チョキ",1),
    Paper("パー",2);

    private final String display;
    private final int number;
    
    Hands(String display, int number){
        this.display = display;
        this.number = number;
    }

    public static Hands getRandomHand(){
        Random rand = new Random();
        return Hands.values()[rand.nextInt(3)];
    }

    public String getDisplay(){
        return this.display;
    }
    public int getNumber(){
        return this.number;
    }
}