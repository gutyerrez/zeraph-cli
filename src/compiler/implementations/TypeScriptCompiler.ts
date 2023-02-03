import { ApplicationProvider } from '../../ApplicationProvider'

import { ICompiler } from '../ICompiler'

export class TypeScriptCompiler implements ICompiler {
  public run = (watchChanges: boolean = false) => {
    const typescript = ApplicationProvider.Compiler.TypeScript.provide()

    const { options, fileNames: rootNames, projectReferences } = ApplicationProvider.Compiler.TSConfig.provide()

    if (watchChanges) {
      const programCreator = ApplicationProvider.Compiler.TypeScript.provide().createEmitAndSemanticDiagnosticsBuilderProgram

      const diagnosticReporter = (ApplicationProvider.Compiler.TypeScript.provide() as any).createDiagnosticReporter(
        ApplicationProvider.Compiler.TypeScript.provide().sys,
        true
      )
      const watchStatusReporter = (ApplicationProvider.Compiler.TypeScript.provide() as any).createWatchStatusReporter(
        ApplicationProvider.Compiler.TypeScript.provide().sys,
        true
      )

      const host = ApplicationProvider.Compiler.TypeScript.provide().createWatchCompilerHost(
        ApplicationProvider.Compiler.TypeScript.provide().findConfigFile(
          process.cwd(),
          ApplicationProvider.Compiler.TypeScript.provide().sys.fileExists,
          'tsconfig.json'
        ),
        {},
        ApplicationProvider.Compiler.TypeScript.provide().sys,
        programCreator,
        diagnosticReporter,
        watchStatusReporter
      )

      ApplicationProvider.Compiler.TypeScript.provide().createWatchProgram(host)
    } else {
      const programCreator = ApplicationProvider.Compiler.TypeScript.provide().createIncrementalProgram ?? ApplicationProvider.Compiler.TypeScript.provide().createProgram

      programCreator.call(typescript, {
        rootNames,
        projectReferences,
        options
      }).emit()
    }
  }
}