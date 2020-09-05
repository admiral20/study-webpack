// COMMONJS  模块化规范 导出使用 module.exports = {};
// 导入使用 require('./xxxxx');

const getCommon = function () {
  console.log('common')
}

// 两种写法都可以;

// module.exports = getCommon
module.exports = {
  getCommon
}
