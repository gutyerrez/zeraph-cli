import { CompilerOptions, ParseConfigFileHost, ProjectReference } from 'typescript'

import { IProvider } from '../IProvider'

import { join } from 'path'
import { existsSync } from 'fs'

import { TSConfigFileNotFoundException } from '../../exceptions/TSConfigFileNotFoundException'
import { ApplicationProvider } from '../../ApplicationProvider'

export class TSConfigProvider implements IProvider<{
  options: CompilerOptions;
  fileNames: string[];
  projectReferences?: readonly ProjectReference[];
}> {
  protected provider!: {
    options: CompilerOptions;
    fileNames: string[];
    projectReferences?: readonly ProjectReference[];
  }

  prepare = () => {
    const tsConfigPath = join(
      process.cwd(),
      'tsconfig.json'
    )

    if (!existsSync(tsConfigPath)) {
      throw new TSConfigFileNotFoundException()
    }

    const { options, fileNames, projectReferences } = ApplicationProvider.Compiler.TypeScript.provide().getParsedCommandLineOfConfigFile(
      tsConfigPath,
      undefined,
      ApplicationProvider.Compiler.TypeScript.provide().sys as unknown as ParseConfigFileHost
    )

    this.provider = { options, fileNames, projectReferences }
  }

  provide = () => this.provider
}