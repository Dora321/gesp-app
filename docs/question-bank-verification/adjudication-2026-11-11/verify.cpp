#include <bits/stdc++.h>
using namespace std;

// Q3 2023-09-l1 第12题
void q3() {
    int n = 5; int cnt = 1;
    while (n >= 0) { cnt += 1; n -= 2; }
    cout << "Q3 -> " << cnt << " (expect 4, option B)\n";
}

// Q5 2025-12-l1 第7题
void q5() {
    int N = 10, M = 20;
    printf("Q5 -> ");
    printf("%%(N+M)=%d", N + M, int(N + M));   // 原卷第6行：两个参数
    printf("   (expect %%(N+M)=30)\n");
}

// Q6 2026-03-l1 第7题：|M-N| 恒 >=0，A 与 B 是否都为真
void q6() {
    bool aAlwaysPos = true, bAlwaysNonNeg = true;
    for (int M = -20; M <= 20; ++M)
        for (int N = -20; N <= 20; ++N) {
            int out = (N > M) ? (N - M) : (M - N);
            if (out < 0) bAlwaysNonNeg = false;
            // A 的前提：一个正数一个负数
            bool onePosOneNeg = (M > 0 && N < 0) || (M < 0 && N > 0);
            if (onePosOneNeg && !(out > 0)) aAlwaysPos = false;
        }
    cout << "Q6 -> A(一正一负必>0)=" << aAlwaysPos
         << "  B(恒>=0)=" << bAlwaysNonNeg << "  (both true => 双解)\n";
}

// Q8 2023-09-l2 第14题：金字塔前置空格数
void q8() {
    int lineCount = 9;
    cout << "Q8 -> 前置空格数(行i): ";
    for (int i = 0; i < lineCount; ++i) cout << (lineCount - i - 1) * 2 << " ";
    cout << " | 第i行数字个数: ";
    for (int i = 0; i < 4; ++i) cout << 2 * i + 1 << " ";
    cout << "(站内解析写 1/4/6/8 是错的)\n";
}

// Q12 2024-09-l2 第13题：首次输入负数 -> 0/0
void q12() {
    float Sum = 0; int cnt = 0;
    cout << "Q12 -> Sum/cnt = " << Sum / cnt << " (0/0 不是\"正确输出\")\n";
}

// Q13 2024-09-l2 第14题：num=1
void q13() {
    for (int num : {1, 2, 4, 17}) {
        int i; string out;
        for (i = 2; i < num; i++)
            if (num % i == 0) { out += "NO"; break; }
        if (i == num) out += "YES";
        cout << "Q13 -> num=" << num << " 输出=[" << out << "]\n";
    }
}

// Q17 2025-06-l2 第5题
void q17() {
    int a, b = (6, 28);
    volatile bool dummy = (b == a);   // 读取未初始化 a：UB
    (void)dummy;
    a = b;
    cout << "Q17 -> " << a << " " << b << " (实测 28 28，但读取未初始化 a 属 UB)\n";
}

// Q21 2025-09-l2 第19题
void q21() {
    int x = 5, y = 10; int z, result;
    x, y, z = 5, 10, 15;      // 只把 15 赋给 z
    result = x < y < z;
    cout << "Q21 -> z=" << z << " result=" << result
         << " (只 z 被赋值; 若补齐 int x=5,y=10,z=15 才是 1)\n";
}

// Q22 2026-06-l2 第11题
void q22() {
    int num = 1; string s;
    for (int i = 0; i < 35; i++) {
        s += to_string(num) + " ";
        if (num > 10) num /= 2; else num += 1;
    }
    cout << "Q22 -> " << s << "\n";
}

// Q10 2024-03-l2 乘法问题：station 版参考代码在 n=50,a=100 时是否溢出
void q10() {
    int n = 50, a = 100;
    long long res = 1; bool over = false;
    for (int i = 0; i < n; i++) { res *= a; if (res > 1000000) over = true; }
    cout << "Q10 -> n=50,a=100 站内版 res=" << res << " over=" << over
         << " (有符号溢出, UB)\n";
}

int main() {
    q3(); q5(); q6(); q8(); q10(); q12(); q13(); q17(); q21(); q22();
    return 0;
}
