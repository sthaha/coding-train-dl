type EachFn = (x?:number, row?: number, column?: number) => number;

class Matrix {
  r : number
  c : number
  values : number[][]

  static fromValues(v : number[][]) : Matrix {
    let m = new Matrix(v.length, v[0].length)
    m.values = v
    return m
  }

  static initialize(rows: number, columns: number, initializer : number|EachFn) : Matrix {
    let fn : EachFn = typeof initializer == 'number' ? () => initializer : initializer

    let res : number[][] = []
    for (let i = 0; i < rows; i++) {
      res[i] = []
      for (let j = 0; j < columns; j++) {
        res[i][j] = fn(0, i, j)
      }
    }
    return Matrix.fromValues(res)

  }

  constructor(rows: number, columns: number) {
    this.r = rows
    this.c = columns
    this.values = []
    for (let i = 0;  i < rows; i++) {
     this.values[i]  = []
    }
  }

  get size() : {rows : number , columns: number} {
    return {rows: this.r, columns: this.c}
  }

  get rows() : number {
    return this.r
  }

  get columns() : number {
    return this.c
  }

  scale(n :number): Matrix {
    let res : number[][] = []
    for (let i = 0; i < this.r; i++) {
      res[i] = []
      for (let j = 0; j < this.c; j++) {
        res[i][j] = this.values[i][j] * n
      }
    }
    return Matrix.fromValues(res)
  }

  add(other : Matrix): Matrix {
    let res : number[][] = []

    for (let i = 0; i < this.r; i++) {
      res[i] = []
      for (let j = 0; j < this.c; j++) {
        res[i][j] = this.values[i][j] + other.values[i][j]
      }
    }
    return Matrix.fromValues(res)
  }

  multiply(other : Matrix): Matrix {
    let res : number[][] = []

    for (let i = 0; i < this.r; i++) {
      res[i] = []
      for (let j = 0; j < other.c; j++) {

        res[i][j] = 0
        for (let k = 0; k < this.c; k++) {
          res[i][j] += this.values[i][k] * other.values[k][j]
        }
      }
    }
    return Matrix.fromValues(res)
  }

  each(fn: EachFn) {
    let res : number[][] = []

    for (let i = 0; i < this.r; i++) {
      res[i] = []
      for (let j = 0; j < this.c; j++) {
        res[i][j] = fn(this.values[i][j], i, j)
      }
    }
    return Matrix.fromValues(res)
  }

  transpose(): Matrix {
    let res : number[][] = []
    for (let i = 0; i < this.c; i++) {
      res[i] = []
      for (let j = 0; j < this.r; j++) {
        res[i][j] = this.values[j][i]
      }
    }
    return Matrix.fromValues(res)
  }

  dump(txt: string = "Matrix") {
    console.log(txt)
    console.log(this.size)
    console.table(this.values)
  }
}
