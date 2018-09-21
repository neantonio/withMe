export class MathService{
 multiplyMatrix(A,B)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) {
        console.log('rowsB '+rowsB);
        console.log('colsA '+colsA);
        return false;
    }
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
          C[i][k] = t;
        }
     }
    return C;
}

    determinant(A)   // Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}
 adjugateMatrix(A)   // A - двумерный квадратный массив
{                                        
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[i] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[i][j] = sign*this.determinant(B);   // ФункциюdDeterminant см. выше
        }
     }
    return adjA;
}

inverseMatrix(A:any[])   // A - двумерный квадратный массив
{   
    var det = this.determinant(A);                // ФункциюdDeterminant см. выше
    if (det == 0) return false;
    var N = A.length, A = this.adjugateMatrix(A); // Функцию a см. выше
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[i][j] /= det; }
    return A;
}

 solve(A,B){             //А - коэффициенты левой части  В-правой
    return this.multiplyMatrix(this.inverseMatrix(A),B);
}

static searchString(text, pattern, k) {
    let result = -1;
    let m = pattern.length;
    let R = [];
    let patternMask = [128];
    let i, d;
 
 
    if (pattern == null) return 0;
    if (m > 31) {
    
      return -1; //Error: The pattern is too long!
    }

    R = [(k + 1) * 8];
    for (i = 0; i <= k; ++i)
      R[i] = ~1;

    for (i = 0; i <= 127; ++i)
      patternMask[i] = ~0;

    for (i = 0; i < m; ++i)
      patternMask[pattern[i]] &= ~(1 << i);

      console.log(patternMask);

    for (i = 0; i < text.Length; ++i) {
      let oldRd1 = R[0];

      R[0] |= patternMask[text[i]];
      R[0] <<= 1;

      for (d = 1; d <= k; ++d) {
        let tmp = R[d];

        R[d] = (oldRd1 & (R[d] | patternMask[text[i]])) << 1;
        oldRd1 = tmp;
      }

      if (0 == (R[k] & (1 << m))) {
        result = (i - m) + 1;
        break;
      }
    }

    return result;
  }

}