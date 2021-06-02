/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import { CleanPlugin, ExmlPlugin } from 'built-in';

const isProduction = process.env.NODE_ENV === 'production';
const config: ResourceManagerConfig = {
  buildConfig: (params) => {
    const { command } = params;

    if (command == 'build') {
      const outputDir = '.';
      return {
        outputDir,
        commands: [
          // new EmitResConfigFilePlugin({
          //     output: "resource/default.res.json",
          //     typeSelector: config.typeSelector,
          //     nameSelector: p => path.basename(p).replace(/\./gi, "_"),
          //     groupSelector: p => "preload"
          // }),
          //   new CleanPlugin({ matchers: ['./libs/modules'] }),
          new ExmlPlugin('debug'), // 非 EUI 项目关闭此设置
          // new IncrementCompilePlugin(),
          // new WebpackDevServerPlugin(),//新的 Webpack 编译器
        ],
      };
    } else if (command == 'publish') {
      const outputDir = `bin-release/`;
      return {
        outputDir,
        commands: [
          new CleanPlugin({ matchers: ['./'] }),
          /**
           *  debug : 默认策略，用于开发环境
           *  contents : 将 EXML 的内容写入到主题文件中
           *  gjs : 将生成的JS文件写入到主题文件中
           *  commonjs : 将EXML合并为一个 CommonJS 风格的文件  default.thm.js  246 KB 
           *  commonjs2 : 将EXML合并为一个含有解析方法和皮肤定义的文件，且皮肤抽离为一份配置 default.thm.js  16 KB + gameEui.json 146k
           *  json : 将每个EXML文件生成一份配置
           */
        //   new ExmlPlugin('commonjs2'), // 非 EUI 项目关闭此设置
          // new UglifyPlugin([
          //   {
          //     sources: ['default.thm.js'],
          //     target: 'default.thm.js',
          //   },
          // ]),
        //   new RenamePlugin({
        //     verbose: true,
        //     hash: 'crc32',
        //     matchers: [{ from: '**/*.js', to: '[path][name]_[hash].[ext]' }],
        //   }),
        //   new ManifestPlugin({ output: 'manifest.json' }),
        ],
      };
    } else {
      throw `unknown command : ${params.command}`;
    }
  },

  mergeSelector: (path) => {
    if (path.indexOf('assets/bitmap/') >= 0) {
      return 'assets/bitmap/sheet.sheet';
    } else if (path.indexOf('armature') >= 0 && path.indexOf('.json') >= 0) {
      return 'assets/armature/1.zip';
    }
  },

  typeSelector: (path) => {
    const ext = path.substr(path.lastIndexOf('.') + 1);
    const typeMap = {
      jpg: 'image',
      png: 'image',
      webp: 'image',
      json: 'json',
      fnt: 'font',
      pvr: 'pvr',
      mp3: 'sound',
      zip: 'zip',
      sheet: 'sheet',
      exml: 'text',
    };
    let type = typeMap[ext];
    if (type == 'json') {
      if (path.indexOf('sheet') >= 0) {
        type = 'sheet';
      } else if (path.indexOf('movieclip') >= 0) {
        type = 'movieclip';
      }
    }
    return type;
  },
};

export = config;
