import { CommandOption } from './CommandOption'

export abstract class AbstractCommand {
  protected name!: string
  protected options?: CommandOption[]
  protected description?: string

  constructor(
    name: string,
    options?: CommandOption[],
    description?: string
  ) {
    this.name = name
    this.options = options
    this.description = description
  }

  public getName = () => this.name

  public getOptions = () => this.options

  public getDescription = () => this.description

  public getHelpMessage = () => {
    const message = [
      `Usage: zeraph ${this.getName()} [options]`,
      '',
      this.getDescription(),
      '',
      'Options:'
    ]

    for (const { name, aliases, description } of this.getOptions()) {
      let line = `  ${name}`

      if (aliases.length >= 1) {
        for (let i = 0; i < aliases.length; i++) {
          const alias = aliases[i]

          if (i + 1 <= aliases.length) {
            line += ', '
          }

          line += alias
        }
      }

      if (line.length < 50) {
        for (let i = line.length; i < 50; i++) {
          line += ' '
        }

        line += description
      }

      message.push(line)
    }

    return message.join('\n')
  }

  public abstract execute: (args: string[]) => void
}