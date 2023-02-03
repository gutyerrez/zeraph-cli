import { AbstractCommand } from '../commands/AbstractCommand'

import { BuildCommand } from '../commands/implementations/BuildCommand'
import { StartCommand } from '../commands/implementations/StartCommand'

import { CommandNotFoundException } from '../exceptions/CommandNotFoundException'

export class CommandExecutor {
  private static COMMANDS: AbstractCommand[] = []

  static {
    CommandExecutor.COMMANDS.push(
      new BuildCommand(),
      new StartCommand()
    )
  }

  public static handle = (handlers: () => void) => {
    handlers()

    return this
  }

  public static invoke = (args: string[]) => {
    try {
      if (args.length < 1) {
        const message = [
          'Usage: zeraph <command> [options]',
          '',
          'Options:',
          '  -h, --help',
          '',
          'Commands:',
        ]

        for (const command of CommandExecutor.COMMANDS) {
          let line = `  ${command.getName()}`

          if (command.getOptions()) {
            line += ' [options]'
          }

          if (line.length < 50 && command.getDescription()) {
            for (let i = line.length; i < 50; i++) {
              line += ' '
            }

            line += command.getDescription()
          }

          message.push(line)
        }

        console.info(message.join('\n'))

        return process.exit(0)
      }
      
      const commandName = args[0].trim()

      const command = CommandExecutor.COMMANDS.find(command => command.getName() === commandName)
  
      if (!command) {
        throw new CommandNotFoundException(commandName)
      }

      const commandArgs = args.splice(1)

      if (commandArgs.length >= 1 && /-\S|--\S/.test(commandArgs[0])) {
        const optionNameOrAlias = commandArgs[0].trim()

        const option = command.getOptions().find(
          option => option.name === optionNameOrAlias || option.aliases.includes(optionNameOrAlias)
        )

        if (!option) {
          throw new CommandNotFoundException(commandName)
        } else if (optionNameOrAlias.match(/-h|--help/)) {
          console.info(command.getHelpMessage())

          return process.exit(1)
        }
      }

      command.execute(args.splice(1))
    } catch (exception: any) {
      console.error(exception.message)
    }
  }
}