# PLA4Y

**Platformer Logic Assembled 4 You**

PLA4Y is a modular platformer toolkit for Unreal Engine 5.7. It is built around small reusable gameplay systems called **NUGS**, which stands for **Neat Useable Game Systems**.

The aim is simple: give developers a clean starting point for common platformer mechanics, so they can spend less time rebuilding core systems and more time designing the game.

## Documentation Website

The full PLA4Y documentation website is available here:

https://bbwdmu.github.io/PLA4Y/

Use the website to browse the toolkit, read system documentation, and jump directly into each NUGS module.

## What The Website Includes

The documentation site includes:

- A home page overview explaining what PLA4Y is
- A NUGS selector for quickly opening each system page
- Setup notes for each gameplay system
- Blueprint tutorial sections
- Screenshot slots for future visual documentation
- Exported Blueprint code slots for later node examples
- Testing checklists for each system
- A support page for quick links and future troubleshooting notes

## Current NUGS Systems

### Collectibles

A data-driven pickup and wallet system for coins, gems, keys, tokens, and other collectible values.

### Door And Unlock System

A reusable unlock system for doors, gates, jars, rocks, chests, barriers, and reward objects. It currently uses `AC_DoorLock`, with a planned refactor toward `AC_CollectibleUnlock` and `AC_AbilityUnlock` to reduce coupling.

### Health

A health component for damage, healing, lives, death checks, UI updates, and future physical material based damage logic.

### Mascot

A companion system for a follower actor that can react to health, abilities, collectibles, and player state.

### Ability And Power-Up

A system for temporary power-ups, active ability states, duration timers, and action-based unlock checks.

### UI

A UI documentation section covering health displays, collectible displays, door requirement feedback, interaction prompts, and HUD updates.

## Documentation Structure

The docs are built with Docusaurus and live inside:

```text
play-docs/
```

Main documentation pages are inside:

```text
play-docs/docs/
```

React pages such as the home page, NUGS selector, and support page are inside:

```text
play-docs/src/pages/
```

## Project Status

PLA4Y is in active development as a modular platformer toolkit. The documentation is being expanded alongside the Blueprint systems.

Some sections contain planned placeholders for screenshots, Blueprint node exports, testing evidence, and future refactors.

## Design Goal

PLA4Y is designed to keep systems modular.

A system should work on its own where possible, but still connect cleanly with other systems when needed. For example, collectibles can feed unlock logic, unlock logic can feed UI, and health state can feed mascot reactions.

The long-term goal is a toolkit where developers can pick the pieces they need and ignore the rest.