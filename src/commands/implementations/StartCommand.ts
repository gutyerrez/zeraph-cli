import { AbstractCommand } from '../AbstractCommand'

import { ICompiler } from '../../compiler/ICompiler'

import { TypeScriptCompiler } from '../../compiler/implementations/TypeScriptCompiler'

export class StartCommand extends AbstractCommand {
  private compiler: ICompiler

  constructor() {
    super(
      'start',
      [
        {
          name: '--watch',
          aliases: ['-w'],
          description: 'watch file changes'
        }
      ],
      'Build Zeraph application.'
    )

    this.compiler = new TypeScriptCompiler()
  }

  public execute = (args: string[]) => {
    const watchChanges = args.every(arg => /-w|--watch/.test(arg))

    this.compiler.run(watchChanges)
  }
}