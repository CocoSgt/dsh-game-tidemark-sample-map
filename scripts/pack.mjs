#!/usr/bin/env node
/**
 * Copy the sample map from the game's working folder (read only) into mod/, check the package, and pack it.
 *   node scripts/pack.mjs [--source <game folder>] [--tarball]
 */
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const i = args.indexOf('--source')
const source = resolve(i >= 0 ? args[i + 1] : process.env.TIDEMARK_SOURCE ?? '/Users/admin/Documents/Codex/writing/2026-11-12-steel-tide-tactics')
const from = join(source, 'mods-examples/sample-map/mod.js')
if (!existsSync(from)) { console.error(`Not found: ${from}`); process.exit(1) }
rmSync(join(root, 'mod'), { recursive: true, force: true })
mkdirSync(join(root, 'mod'), { recursive: true })
cpSync(from, join(root, 'mod/mod.js'))
console.log('mod/mod.js copied')
const spec = resolve(root, '../dsh-game-store/lib/spec.mjs')
if (existsSync(spec)) {
  const { checkExtension } = await import(spec)
  const r = checkExtension(root)
  for (const w of r.warnings) console.warn(`warning: ${w}`)
  for (const e of r.errors) console.error(`error: ${e}`)
  if (!r.ok) process.exit(1)
  console.log('check    passes the game store spec')
}
if (args.includes('--tarball')) {
  const info = JSON.parse(execFileSync('npm', ['pack', '--json'], { cwd: root, encoding: 'utf8' }))[0]
  console.log(`tarball  ${info.filename}\n         integrity ${info.integrity}`)
}
