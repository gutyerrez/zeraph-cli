import { TSConfigProvider } from './providers/implementations/TSConfigProvider'
import { TypeScriptProvider } from './providers/implementations/TypeScriptProvider'

export class ApplicationProvider {
  public static prepare = () => {
    ApplicationProvider.Compiler.TypeScript.prepare()
    ApplicationProvider.Compiler.TSConfig.prepare()
  }

  public static Compiler = class {
    public static TypeScript = new TypeScriptProvider()
    public static TSConfig = new TSConfigProvider()
  }
}