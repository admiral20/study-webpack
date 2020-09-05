// COMMONJS  模块化规范 导出使用 module.exports = {}; 或者 导入 具体一个值
// 导入使用 require('./xxxxx');

// 导出的如果是对象，则可以使用 es6 对象结构赋值语法；
// 导出的如果是具体的值， 则直接使用；
// es6 模块化语法规范：
// const es6 = function () {
//     console.log('es6')
// };
// export default es6;
import es6 from './es6-module'

import('./index.css')

const { getCommon } = require('./common.js')
const { aaa } = require('./require.js')

require('@babel/polyfill')

es6()
aaa()

const arrowFn = function () {
  const obj = {
    name: 'zs',
    like: [
      {
        name: 'football',
        player: [{
          name: 'messi'
        }, {
          name: 'C罗'
        }]
      }
    ]
  }
  console.log('arrow-funtion', obj && obj.like)
}

const _promise = new Promise((resolve, reject) => {
  resolve({ name: 'zs' })
})

function getHome () {
  console.log('home')
};

console.log(888)

getCommon()

setTimeout(() => {
  getHome()
  arrowFn()
  _promise.then(_ => {
    console.log(_, 'promise')
  })
}, 1000)

function wahaha () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('哇哈哈集团5秒后输出')
    }, 5000)
  })
}

async function asyncHAHA () {
  const nn = await wahaha()
  const pp = wahaha().then(res => {
    console.log(res, 'ppp')
  })
  console.log(nn, 'await')
  console.log(pp, 'promise then')
}

asyncHAHA()

// @log
class A {
  constructor (name) {
    this.name = name
  }

  sun () {
    console.log('sum')
  }

  // n=10;
  static fun () {
    console.log('fun')
  }

  // static m = 8888
}

function log (target) {
  console.log(target)
  target.name = 'zs'
}

log('32432')

console.log(A.name, '装饰器')

A.fun()

new A().sun()

console.log(A.n, '大A的n')
console.log(A.m, '大A class 的m')
console.log(new A().n, '实例A的n')

const flag = [1, 2, 3, 4, 5, 6].includes(2)
console.log(flag, 'flag')

const flatArr = [[1, 2, 3, 4], [5, 6, 7, 8]].flat(2)
console.log(flatArr, 'flatArr')
