# OmniPath Agent System Map

This document explains how the OmniPath build system fits together.

## Mermaid

```mermaid
flowchart LR
    User[User prompt in VSCode]
    Manifest[Build manifest and profile]
    Engine[agentBuildEngine.js]
    Shared[Shared snippet catalog]
    Omni[OmniPath overlay catalog]
    Controller[agentController.js]
    Moses[MOSES]
    Ezra[EZRA]
    Dan[DAN]
    Gabe[GABE]
    Josh[JOSH]
    Mike[MIKE]
    Nate[NATE]
    Outputs[Build plan and matched assets]
    Scribe[Scribe inventory rules]
    Sync[./scripts/sync-agent-system.sh]
    GitMirror[.git/agents mirror]
    Drive[Google Drive workspace]

    User --> Manifest --> Engine
    Shared --> Engine
    Omni --> Engine
    Engine --> Controller
    Controller --> Moses --> Ezra --> Dan --> Gabe --> Josh --> Mike --> Nate --> Outputs
    Scribe --> Shared
    Scribe --> Omni
    Scribe --> Sync
    Sync --> GitMirror
    Sync --> Drive
```

## Notes

- `agentBuildEngine.js` reads the build manifest, matches template and catalog items, and hands the request to `agentController.js`.
- `agentController.js` runs the agent chain in order: `MOSES -> EZRA -> DAN -> GABE -> JOSH -> MIKE -> NATE`.
- Shared reusable assets live in `snippet_catalog/ui-snippets.json`.
- OmniPath-only reusable assets live in `snippet_catalog/omnipath-snippets.json`.
- `Scribe` owns inventory, numbering, and documentation consistency.
- `./scripts/sync-agent-system.sh` pushes the root package to `.git/agents` and the Google Drive workspace copy.
