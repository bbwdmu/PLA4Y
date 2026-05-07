---
sidebar_position: 2
title: Documentation Status
description: Track the current documentation, Blueprint tutorial, screenshot, and testing status for each PLA4Y NUG.
---

# Documentation Status

This page tracks the current state of the PLA4Y documentation.

It shows what has been written, what still needs screenshots, what needs testing, and what may change during development.

## Status Key

| Status | Meaning |
|---|---|
| Complete | Good enough for current project use |
| In Progress | Started but still needs work |
| Planned | Not started yet |
| Needs Review | Written, but needs checking against the current Blueprint setup |
| Needs Screenshots | Screenshot slots exist, but images still need adding |

## NUG Status Table

| NUG | Implementation | Documentation | Blueprint Tutorial | Screenshots | Testing | Notes |
|---|---|---|---|---|---|---|
| Interaction NUG | In Progress | In Progress | In Progress | Needs Screenshots | Partial | Core detection, prompt, and interface logic needs final screenshots |
| Collectible NUG | In Progress | In Progress | In Progress | Needs Screenshots | Partial | Core pickup and wallet logic is the current focus |
| Door And Unlock NUG | In Progress | In Progress | In Progress | Needs Screenshots | Partial | Current door logic may later split into collectible and ability unlock components |
| Health NUG | In Progress | In Progress | In Progress | Needs Screenshots | Partial | Physical material damage setup is planned later |
| Ability And Power-Up NUG | Early Prototype | In Progress | In Progress | Needs Screenshots | Planned | Scope is being kept small at first |
| Mascot NUG | Prototype | In Progress | In Progress | Needs Screenshots | Partial | Follow, mood, and look-at behaviour need more testing |
| UI NUG | Planned | Basic | Planned | Needs Screenshots | Planned | UI docs need to follow the working widgets |
| Save System | Planned | Planned | Planned | Planned | Planned | Save support will connect to other systems later |

## Current Documentation Goals

The current goal is to make every main NUG page include:

- A clear overview
- A Quick Setup section
- A Blueprint Tutorial
- Photo slots
- Injected Blueprint code slots
- Common Issues
- Testing Checklist
- Extension Notes

## Screenshot Priority

Screenshots should be added in this order:

1. Interaction NUG
2. Collectible NUG
3. Health NUG
4. Door And Unlock NUG
5. Ability And Power-Up NUG
6. Mascot NUG
7. UI NUG

## Testing Priority

Testing should focus on proving that each NUG can work alone first.

After that, test connections between systems.

Example connection tests:

- Interaction triggers a door.
- Door reads collectible wallet value.
- UI reads health value.
- Mascot reacts to health state.
- Door checks active power-up state.
- Collectibles update stored wallet values.

## Known Documentation Gaps

- Real screenshots need adding.
- Blueprint node exports need injecting.
- Common Issues sections need expanding after more testing.
- Some system names may change during refactoring.
- C++ documentation will be needed later if Blueprint systems are refactored.
