// * 配置完成后记得重启下
const CracoLessPlugin = require("craco-less");
const path = require("path");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
module.exports = {
  babel: {
    //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", {legacy: true}]]
  },
  webpack: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {"@primary-color": "#1DA57A"},
            javascriptEnabled: true,
          }
        }
      }
    }
  ]
};