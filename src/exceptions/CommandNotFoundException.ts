import { Exception } from './Exception'

export class CommandNotFoundException extends Exception {
  constructor(name: string) {
    super(      
      [
        '',
        `\u001b[101m\u001b[1m Error \u001b[0m Command not found: \u001b[91m${name}\u001b[0m`,
        'See \u001b[91m--help\u001b[0m for a list of available commands.',
        ''
      ].join('\n')
    )
  }
}