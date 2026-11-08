# Security

React Hooks Snippets ships JSON snippet definitions only: no runtime code, no
dependencies, no network access. The realistic risks are impersonation and a
compromised release pipeline, not the snippets themselves.

## Official distribution

- VS Marketplace: [AlDuncanson.react-hooks-snippets](https://marketplace.visualstudio.com/items?itemName=AlDuncanson.react-hooks-snippets)
- Open VSX: [AlDuncanson/react-hooks-snippets](https://open-vsx.org/extension/AlDuncanson/react-hooks-snippets)
- GitHub: the `.vsix` attached to each [release](https://github.com/alDuncanson/react-hooks-snippets/releases) is the exact file published to both registries

Anything else using this name is not ours. Report it to the registry and open
an issue here.

## Verifying a release

Each release is built by GitHub Actions from its tag and attested. The
`.sigstore.json` next to the `.vsix` is the provenance bundle. To check a
downloaded package came from this repository:

```sh
gh attestation verify react-hooks-snippets-<version>.vsix --owner alDuncanson
```

## Reporting a vulnerability

Use [private vulnerability reporting](https://github.com/alDuncanson/react-hooks-snippets/security/advisories/new)
rather than a public issue. Expect an acknowledgement within a week.

## Supported versions

Only the latest release.
