#include <bits/stdc++.h>
using namespace std;
string run(int c1,int c2,int c3){ // 1:> 2:>=   | 1:/= 2:%=  | 1:+= 2:=+
    int num=1; string s;
    for(int i=0;i<35;i++){
        s+=to_string(num)+" ";
        bool cond = (c1==1)? (num>10) : (num>=10);
        if(cond){ if(c2==1) num/=2; else num%=2; }
        else { if(c3==1) num+=1; else num=+1; }
    }
    return s;
}
int main(){
    cout<<"A(> /= +=) : "<<run(1,1,1)<<"\n\n";
    cout<<"B(>= %= +=): "<<run(2,2,1)<<"\n\n";
    cout<<"C(> /= =+) : "<<run(1,1,2)<<"\n\n";
    cout<<"D(>= %= =+) : "<<run(2,2,2)<<"\n";
}
