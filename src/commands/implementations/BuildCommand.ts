import { AbstractCommand } from '../AbstractCommand'

import { ICompiler } from '../../compiler/ICompiler'

import { TypeScriptCompiler } from '../../compiler/implementations/TypeScriptCompiler'

import { existsSync, rmdirSync } from 'fs'

export class BuildCommand extends AbstractCommand {
  private compiler: ICompiler

  constructor() {
    super('build', [], 'Build Zeraph application.')

    this.compiler = new TypeScriptCompiler()
  }

  public execute = (_: string[]) => {
    if (existsSync('dist')) {
      rmdirSync('dist', {
        recursive: true
      })
    }

    this.compiler.run()
  }
}