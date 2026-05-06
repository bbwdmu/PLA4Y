---
title: Health
---

# Health System

## Overview

The health system handles damage, healing, death, and lives for actors that need health logic.

Use it for the player, enemies, hazards, destructible props, bosses, and test actors in the demo level.

## Component

- `AC_Health`

## What The System Does

- Stores current health and max health
- Applies damage
- Applies healing
- Handles lives if enabled
- Resets health after a life is lost
- Broadcasts health changes for UI and mascot reactions
- Supports future damage type logic through physical materials

## Features

- Damage handling
- Healing
- Lives system
- Health percentage output
- Optional death behaviour
- UI-friendly health state values

## Runtime Flow

1. Actor receives damage from a hazard, enemy, projectile, or gameplay event.
2. `AC_Health` subtracts the damage amount.
3. The component clamps health between zero and max health.
4. The component updates the health percentage.
5. UI or mascot logic can react to the new health state.
6. If health reaches zero, the component checks whether lives are enabled.
7. If lives remain, one life is removed and health resets.
8. If no lives remain, death logic runs.

## Usage

Attach `AC_Health` to any actor that requires health logic.

## Blueprint Tutorial

### Goal

Create a health component that can take damage, heal, lose lives, and update UI.

### Before You Start

Create or confirm these assets exist:

- `AC_Health`
- A player character or test actor
- A hazard actor for damage testing
- A UI widget if testing health display

### Step 1, Add The Health Component

1. Open the player character Blueprint.
2. Add `AC_Health` as an Actor Component.
3. Set max health.
4. Set current health to max health on BeginPlay.
5. Enable lives if the actor should respawn after health reaches zero.

### Step 2, Create The Take Damage Function

Inside `AC_Health`, create a function called `TakeDamage`.

Suggested inputs:

- `DamageAmount`, Float
- `DamageCauser`, Actor Reference
- `DamageSource`, Name or Gameplay Tag

Function flow:

1. Check that damage amount is greater than zero.
2. Subtract damage from current health.
3. Clamp current health from zero to max health.
4. Update health percent.
5. Broadcast health changed.
6. If health is zero, call the death or life lost check.

### Step 3, Create The Heal Function

Inside `AC_Health`, create a function called `Heal`.

Suggested inputs:

- `HealAmount`, Float
- `HealSource`, Actor Reference

Function flow:

1. Check that heal amount is greater than zero.
2. Add heal amount to current health.
3. Clamp current health from zero to max health.
4. Update health percent.
5. Broadcast health changed.

### Step 4, Add Lives Logic

When health reaches zero:

1. Check whether lives are enabled.
2. Check whether lives remaining is greater than zero.
3. Remove one life.
4. Reset current health to max health if `ResetHealthOnLifeLost` is true.
5. Broadcast lives changed.
6. If no lives remain, call death logic.

### Step 5, Test Damage With A Hazard

1. Place a hazard actor in the level.
2. Add an overlap box.
3. On overlap, get the player health component.
4. Call `TakeDamage`.
5. Print current health to screen.
6. Test until health reaches zero.
7. Confirm lives and reset health work.

## Physical Material Damage Plan

This section is reserved for the later damage and health polish pass.

Future setup:

- Use physical materials to define surface-based damage behaviour
- Let hazards or projectiles read hit physical material
- Map physical material to damage amount or damage type
- Document this setup on the website
- Document this setup in the in-game demo level

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Health Component On Player

![Health component screenshot placeholder](./img/health-component-placeholder.png)

### Take Damage Blueprint

![Take damage Blueprint screenshot placeholder](./img/health-take-damage-placeholder.png)

### Lives Logic Blueprint

![Lives logic Blueprint screenshot placeholder](./img/health-lives-placeholder.png)

### Health UI Runtime Test

![Health UI runtime screenshot placeholder](./img/health-ui-runtime-placeholder.png)

### Physical Material Damage Setup

![Physical material damage screenshot placeholder](./img/health-physical-material-placeholder.png)

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### AC_Health, Take Damage Function

```text title="AC_Health Take Damage Nodes"
Paste exported Blueprint node code here.
```

### AC_Health, Heal Function

```text title="AC_Health Heal Nodes"
Paste exported Blueprint node code here.
```

### AC_Health, Lives Lost Function

```text title="AC_Health Lives Lost Nodes"
Paste exported Blueprint node code here.
```

### Hazard Damage Test

```text title="Hazard Damage Test Nodes"
Paste exported Blueprint node code here.
```

### Physical Material Damage Logic

```text title="Physical Material Damage Nodes"
Paste exported Blueprint node code here.
```

## Extension Notes

- Add health state enum values such as Hidden, Low, Mid, and High for UI and mascot reactions
- Add dispatchers for health changed, death, and lives changed
- Add physical material support for damage and health logic
- Add save support if health or lives should persist
- Add designer-facing demo labels in the example level

## Testing Checklist

- Damage reduces health
- Healing restores health
- Health never goes below zero
- Health never goes above max health
- Life is removed when health reaches zero
- Health resets after life loss when enabled
- Death logic runs when no lives remain
- UI updates when health changes
- Mascot can react to health percentage or health state
- Physical material damage logic is documented later