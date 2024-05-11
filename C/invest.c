#include <stdio.h>
#define YEARS 2

double power(float x, int r){
    double z;
    if(r == 1) return x;
    else if(r == 0) return 1;

    z = power(x*x,r/2+r%2);
    if(r%2 == 1) z/=x;
    return z;
}

int calc(float ic, float gw, float mr){
    static int f;
    float capital = ic;

    if(f == 12*YEARS) return 0;

    printf("O %d years / %d months / capital = %.3f\n", f/12 , f% 12, capital);
    printf("=================================================================\n");
    f++;

    capital = ic * mr;
    printf("=================================================================\n");
    printf("X %d years / %d months / captal = %.3f\n", f/12 , f% 12 ,capital);

    capital = ic * (1 + gw);

    calc(capital, gw, mr);
}

float calc2(float ic, float gw, float mr){
    float capital;
    capital = ic * power((1+gw),YEARS*12-1) * mr;
    return capital; 
}

int main(){
    float initial_capital = 100;//handred handred
    float growth = 0.05;
    float max_risk = 0.5;
    calc(initial_capital,growth,max_risk);
    printf("=================================================================\n");
    printf("%.3f\n",calc2(initial_capital,growth,max_risk));

    return 0;
}