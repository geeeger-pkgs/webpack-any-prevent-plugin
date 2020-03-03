/*
 * @Author: geeeger
 * @Date: 2020-03-03 11:12:25
 * @Last Modified by: geeeger
 * @Last Modified time: 2020-03-03 17:06:41
 */
'use strict'

const HookName = 'AnyPreventPlugin'

/**
 * 用于阻止文件落地的插件
 */
exports.AnyPreventPlugin = class {
  constructor(opts = {}) {
    this.opts = Object.assign(
      {
        exportExculde: [],
      },
      opts
    )
  }
  apply(compiler) {
    if (this.opts.exportExculde.length) {
      compiler.hooks.emit.tapAsync(HookName, (compilation, callback) => {
        compilation.chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            for (
              let index = 0;
              index < this.opts.exportExculde.length;
              index++
            ) {
              const element = this.opts.exportExculde[index]
              if (element.test(file)) {
                delete compilation.assets[file]
              }
            }
          })
        })
        callback()
      })
    }
  }
}
