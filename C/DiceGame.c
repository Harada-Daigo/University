#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>
void printDice(int dg1,int dg2){
    printf("Rolling dice...\n");
    printf("Dice 1: %d\n",dg1);
    printf("Dice 2: %d\n",dg2);
    printf("Total value: %d\n",dg1+dg2);
}
void won_or_lost(bool t){
    if(t)printf("You won");
    else printf("You lost");
}
int main(){
    srand((unsigned int)(time(NULL)*1));
    int dg1 = rand() % 6 + 1;
    srand((unsigned int)(time(NULL)*2));
    int dg2 = rand() % 6 + 1;

    char str[100];
    printf("What is your name?\n");
    scanf("%s",str);
    printf("Hello, %s!\n",str);

    printDice(dg1,dg2);

    won_or_lost((dg1+dg2>7));

    return 0;
}