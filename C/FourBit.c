#include <stdio.h>

void Bit1( int Cin , int A , int B , int* save){
    save[0] = ( Cin + A + B ) % 2;
    save[1] = ( Cin + A + B ) / 2;
}

void Bit4( int* A , int* B , int Cin , int *S){
    int bit[2];

    Bit1( Cin , A[3] , B[3] , bit);
    S[0] = bit[0];

    Bit1( bit[1] , A[2] , B[2] , bit);
    S[1] = bit[0];

    Bit1( bit[1] , A[1] , B[1] , bit);
    S[2] = bit[0];

    Bit1( bit[1] , A[0] , B[0] , bit);
    S[3] = bit[0];

    S[4] = bit[1];
}
void Print(int a3, int a2, int a1, int a0, int b3, int b2, int b1, int b0, int Cin ){
    int i;
    int A[4],B[4],*S;
    
    A[0] = a3;
    A[1] = a2;
    A[2] = a1;
    A[3] = a0;

    B[0] = b3;
    B[1] = b2;
    B[2] = b1;
    B[3] = b0;
    
    Bit4( A , B , Cin , S );
    
    for( i = 0; i < 4 ; i++ )printf( "%d" , S[3-i] );
    printf( " %d\n" , S[4] );
}


int main(){
    int c,j;
    /*
    Print( 1,0,0,0 , 0,0,0,0 , 0 );
    Print( 1,0,0,0 , 0,1,1,0 , 0 );
    Print( 1,0,0,0 , 1,1,1,1 , 0 );
    Print( 1,0,0,0 , 0,0,0,0 , 1 );
    Print( 1,0,0,0 , 0,1,1,0 , 1 );
    Print( 1,0,0,0 , 1,1,1,1 , 1 );*/

    for(c=0;c<2;c++){
        //for(int i=0;i<=17;i++){
            for(j=0;j<=15;j++){
                printf("1000 %d %d %d %d  %d | ",j/2/2/2%2,j/2/2%2,j/2%2,j%2 , c );
                Print( 1,0,0,0 , j/2/2/2%2,j/2/2%2,j/2%2,j%2 , c );
            }
        //}
    }

    return 0;
}