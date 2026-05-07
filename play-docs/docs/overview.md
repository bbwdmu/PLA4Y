---
sidebar_position: 1
title: Overview
description: Start here for the PLA4Y documentation. Learn what PLA4Y is, what NUGS are, and how to choose the gameplay system that fits your project.
---

# Start Here

PLA4Y is a modular platformer toolkit for Unreal Engine 5.7.

It is built around small reusable gameplay systems called NUGS. Each NUG handles one focused part of platformer gameplay, such as interaction, collectibles, health, doors, abilities, UI, or mascot companion logic.

## What Does PLA4Y Mean?

PLA4Y stands for:

**Platformer Logic Assembled 4 You**

The goal is to reduce repeated setup work by giving developers clean gameplay building blocks that can be reused, expanded, or ignored depending on the project.

## What Are NUGS?

NUGS stands for:

**Neat Usable Game Systems**

A NUG is a focused gameplay system. Each NUG should work on its own where possible, but can also connect with other NUGS when needed.

For example:

- The Interaction NUG can detect usable world objects and trigger interface-based logic.
- The Collectible NUG can store pickup values.
- The Door NUG can check collectible or ability requirements.
- The Health NUG can send health changes to UI.
- The Mascot NUG can react to health or collectible states.

## Choose Your Starting Point

PLA4Y is not designed around one fixed setup order.

Each NUG is a separate gameplay building block. You can start with the system your project needs first, then add others when they become useful.

- Need prompts, object interaction, or player-triggered actions? Start with the Interaction NUG.
- Need pickups, gems, coins, or keys? Start with the Collectible NUG.
- Need damage, healing, lives, or death states? Start with the Health NUG.
- Need locked doors, gates, jars, rocks, or progression checks? Start with the Door And Unlock NUG.
- Need temporary effects, forms, boosts, or ability states? Start with the Ability And Power-Up NUG.
- Need a buddy, guide, or reactive companion? Start with the Mascot NUG.
- Need HUD widgets, prompts, or feedback? Start with the UI NUG.

There is no required order. PLA4Y is built so each NUG can stand alone where possible, then connect with other NUGS when the project needs it.

## How Each NUG Page Is Organised

Each NUG page follows a similar structure:

- Overview
- What the system does
- Quick Setup
- Runtime Flow
- Blueprint Tutorial
- Photo Slots
- Injected Blueprint Code Slots
- Common Issues
- Testing Checklist
- Extension Notes

This keeps each page consistent and easier to scan.

## Current NUGS

### Interaction NUG

Detects interactable actors, shows player prompts, and triggers interface-based gameplay logic.

[Open Interaction NUG](./NUGS%20-%20Systems/Interaction)

### Collectible NUG

Data-driven pickups, wallet values, and collectathon-style tracking.

[Open Collectible NUG](./NUGS%20-%20Systems/Collectible)

### Door And Unlock NUG

Reusable unlock logic for doors, gates, jars, rocks, rewards, and progression checks.

[Open Door And Unlock NUG](./NUGS%20-%20Systems/Doors)

### Health NUG

Damage, healing, lives, death checks, health states, and UI feedback hooks.

[Open Health NUG](./NUGS%20-%20Systems/Health)

### Ability And Power-Up NUG

Temporary power-ups, ability states, timers, action checks, and expandable effects.

[Open Ability And Power-Up NUG](./NUGS%20-%20Systems/Ability)

### Mascot NUG

A companion actor that follows the player, reacts to state, and supports platformer feedback.

[Open Mascot NUG](./NUGS%20-%20Systems/Mascot)

### UI NUG

HUD widgets, prompts, requirement feedback, display hooks, and player-facing information.

[Open UI NUG](./UI/UI)

## Project Status

The toolkit is still in development. Some systems are working prototypes, while others are planned or being refactored.

Use the documentation status page to see what is complete, what needs screenshots, and what still needs testing.

[View Documentation Status](./documentation-status)
