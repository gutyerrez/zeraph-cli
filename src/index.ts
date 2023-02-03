#!/usr/bin/env node

import { CommandExecutor } from './executor/CommandExecutor'

import { ApplicationProvider } from './ApplicationProvider'

CommandExecutor.handle(
  () => {
    ApplicationProvider.prepare()
  }
).invoke(process.argv.splice(2))
