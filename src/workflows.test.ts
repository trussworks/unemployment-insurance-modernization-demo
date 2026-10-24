import { spawnSync } from 'child_process'
import { ESLint } from 'eslint'
import { readFileSync } from 'fs'
import path from 'path'
import { runInNewContext } from 'vm'

const root = path.resolve(__dirname, '..')
const workflows = ['test', 'storybook-deploy']

test('lint ignores generated Storybook JavaScript', async () => {
  const eslint = new ESLint({ cwd: root })
  expect(
    await eslint.isPathIgnored(path.join(root, 'storybook-static/iframe.js'))
  ).toBe(true)
})

describe('workflow runtime selection', () => {
  test.each(workflows)('%s uses and verifies the declared Node', (name) => {
    const source = readFileSync(
      path.join(root, '.github/workflows', `${name}.yml`),
      'utf8'
    )
    expect(source).toContain("node-version-file: '.tool-versions'")
    expect(source).not.toMatch(/matrix\.|node-version:/)
    const comparison = source.match(
      /run: (test "\$\(node --version\)"[^\n]+)/
    )?.[1]
    expect(comparison).toBeDefined()
    if (!comparison) throw new Error('Missing executable Node comparison')
    expect(spawnSync('bash', ['-c', comparison], { cwd: root }).status).toBe(0)
    expect(
      spawnSync('bash', ['-c', comparison], {
        cwd: path.join(__dirname, '__fixtures__/runtime-mismatch'),
      }).status
    ).toBe(1)
  })

  test('selects the incident-fixed Node release', () => {
    expect(readFileSync(path.join(root, '.tool-versions'), 'utf8')).toBe(
      'nodejs 22.23.4\n'
    )
  })
})

describe('Pages build eligibility', () => {
  const source = readFileSync(
    path.join(root, '.github/workflows/storybook-deploy.yml'),
    'utf8'
  )
  const condition = source.match(/ {2}build:\n {4}if: (.+)/)?.[1]

  test.each([
    ['workflow_dispatch', undefined, true],
    ['workflow_run', 'success', true],
    ['workflow_run', 'failure', false],
    ['workflow_run', 'cancelled', false],
    ['workflow_run', 'skipped', false],
    ['workflow_run', undefined, false],
  ])('%s with %s permits build: %s', (eventName, conclusion, allowed) => {
    expect(condition).toBeDefined()
    if (!condition) throw new Error('Missing Pages build condition')
    expect(
      runInNewContext(condition, {
        github: {
          event_name: eventName,
          event:
            eventName === 'workflow_dispatch'
              ? {}
              : { workflow_run: { conclusion } },
        },
      })
    ).toBe(allowed)
  })

  test('deployment requires the guarded build', () => {
    expect(source).toMatch(/ {2}deploy:\n {4}needs: build\n/)
  })
})
