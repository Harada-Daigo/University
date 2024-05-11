#include <iostream>
#include <string>
#include "sample.h"

using namespace std;

int main(){
    Sample obj;
    int num;
    num = 90;
    obj.set(num);
    cout << obj.get() << endl;
    return 0;
}