import { Exception } from './Exception'

export class TSConfigFileNotFoundException extends Exception {
  constructor() {
    super(      
      [
        '',
        `\u001b[101m\u001b[1m Error \u001b[0m tsconfig.json not found`,
        ''
      ].join('\n')
    )
  }
}