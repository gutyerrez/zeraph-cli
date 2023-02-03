import { IProvider } from '../IProvider'

import * as ts from 'typescript'

export class TypeScriptProvider implements IProvider<typeof ts> {
  protected provider!: typeof ts

  prepare = () => {
    try {
      const path = require.resolve('typescript', {
        paths: [process.cwd()]
      })
  
      this.provider = require(path) as typeof ts
    } catch {
      console.error('TypeScript cannot be found! Please install.')
    }
  }

  provide = () => this.provider
}