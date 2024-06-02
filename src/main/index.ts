export * from './context'

import * as path from 'node:path'

// adapter load
import * as AdapterSatori from '@satorijs/adapter-satori'

import { Context } from './context'
import { WindowService, isDarkTheme } from './windowManager'
import { SettingsManager } from './settingsManager'
import { IPCManager } from './ipcManager'
import { SystemManager } from './systemManager'
import { DevToolsManager } from './devToolsManager'

const app = new Context()

// TODO: loader
app.plugin<SettingsManager.Config>(SettingsManager, {})
app.plugin<IPCManager.Config>(IPCManager, {})
app.plugin<SystemManager.Config>(SystemManager, {})
app.plugin<WindowService.Config>(WindowService, {
  width: 1076,
  height: 653,
  titleBarStyle: 'hidden',
  titleBarOverlay: {
    symbolColor: isDarkTheme() ? '#ffffff' : '#000000',
    color: '#00000000',
    height: 44,
  },
  backgroundMaterial: 'mica',
  backgroundColor: '#00000000',
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
  },
})
app.plugin(DevToolsManager, {})
app.plugin(AdapterSatori, {
  endpoint: 'http://localhost:5500/satori',
  token: '8f69490142b1da3ed0968e8658aa12af49a3774fc5c9ccc65f1b31b0cb152f3b'
})

app.start()
