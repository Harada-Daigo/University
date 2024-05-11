#include <stdio.h>

int main(){
    char* str[100];
    printf("What is your name?\n");
    scanf("%s",str);
    printf("Hello, %s!\n",str);
    return 0;
}