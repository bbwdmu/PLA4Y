---
title: Ability
---

# Ability And Power-Up System

## Overview

The ability and power-up system manages temporary player states, unlockable abilities, and gameplay flags.

Use it for growth, shrinking, speed boosts, swim unlocks, charge states, temporary buffs, or other platformer-style powers.

## Component

- `AC_AbilityComponent`

## What The System Does

- Stores active ability or power-up states
- Supports temporary duration-based effects
- Supports simple ability flags
- Lets doors and other systems check ability state
- Gives designers a place to add modular power-up behaviour
- Keeps each power-up expandable without rebuilding the whole system

## Features

- Temporary power-ups
- Ability flags
- Duration handling
- Door requirement support
- UI display support
- Future modular data asset support

## Runtime Flow

1. Player collects or triggers a power-up.
2. The pickup calls into `AC_AbilityComponent`.
3. The component checks the power-up or ability type.
4. The component enables the matching state.
5. If the effect is temporary, a duration timer starts.
6. UI can show active power-up state and remaining time.
7. Doors, interactables, and hazards can check whether a state is active.
8. When the timer ends, the component disables the temporary state.

## Usage

Attach `AC_AbilityComponent` to the player and trigger abilities through pickups, interaction events, or gameplay events.

## Blueprint Tutorial

### Goal

Create a simple modular power-up that activates an ability state for a set duration.

### Before You Start

Create or confirm these assets exist:

- `AC_AbilityComponent`
- A power-up pickup actor
- An ability or power-up enum
- A player character Blueprint
- Optional UI widget for active power-up display

### Step 1, Add The Ability Component

1. Open the player character Blueprint.
2. Add `AC_AbilityComponent` as an Actor Component.
3. Add default values for active states.
4. Compile and save.

### Step 2, Create The Ability Type Enum

Create an enum for ability or power-up types.

Example values:

- `None`
- `Grow`
- `Shrink`
- `SpeedBoost`
- `Swim`
- `Charge`

Keep this small at first. Add more only when the base system works.

### Step 3, Create A Power-Up Pickup

1. Create a power-up pickup actor.
2. Add a collision sphere.
3. Add variables for ability type and duration.
4. On overlap, get the player ability component.
5. Call `ActivateAbility`.
6. Pass ability type and duration.
7. Hide or destroy the pickup.

### Step 4, Build Activate Ability

Inside `AC_AbilityComponent`, create a function called `ActivateAbility`.

Suggested inputs:

- `AbilityType`, Enum
- `Duration`, Float
- `SourceActor`, Actor Reference

Function flow:

1. Check the ability type is not `None`.
2. Set the matching ability state to active.
3. Broadcast active ability changed.
4. If duration is greater than zero, start a timer.
5. If duration is zero or less, treat it as a permanent unlock or manual state.

### Step 5, Build Deactivate Ability

Inside `AC_AbilityComponent`, create a function called `DeactivateAbility`.

Suggested input:

- `AbilityType`, Enum

Function flow:

1. Check which ability needs to end.
2. Set that ability state to inactive.
3. Clear any active timer for that ability.
4. Broadcast active ability changed.
5. Update UI if needed.

### Step 6, Test With A Door

1. Place a door that requires an ability state.
2. Try the door with no power-up active.
3. Confirm the door stays locked.
4. Collect the power-up.
5. Try the door again before the timer ends.
6. Confirm the door opens.
7. Let the timer end.
8. Confirm the ability state turns off.

## Data Asset Plan

This section is reserved for the next modular pass.

Future setup:

- Create `PDA_PowerUpDefinition`
- Store power-up name, icon, duration, colour, sound, VFX, and ability type
- Let pickups reference the data asset instead of manually setting every value
- Let UI read display data from the same asset
- Let designers add new power-ups without editing the core component

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Ability Component On Player

Image slot: ability component on player.

### Power-Up Pickup Setup

Image slot: power-up pickup setup.

### Activate Ability Blueprint

Image slot: activate ability Blueprint.

### Duration Timer Blueprint

Image slot: duration timer Blueprint.

### Ability Door Requirement Test

Image slot: ability door requirement test.

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### AC_AbilityComponent, Activate Ability Function

```text title="AC_AbilityComponent Activate Ability Nodes"
Paste exported Blueprint node code here.
```

### AC_AbilityComponent, Deactivate Ability Function

```text title="AC_AbilityComponent Deactivate Ability Nodes"
Paste exported Blueprint node code here.
```

### Power-Up Pickup, Overlap Logic

```text title="Power-Up Pickup Overlap Nodes"
Paste exported Blueprint node code here.
```

### Ability Duration Timer

```text title="Ability Duration Timer Nodes"
Paste exported Blueprint node code here.
```

### Door Ability Requirement Check

```text title="Door Ability Requirement Nodes"
Paste exported Blueprint node code here.
```

## Extension Notes

- Add data assets once the first Blueprint version works
- Add VFX and SFX options later
- Add UI icons and cooldown or duration bars
- Add save support for permanent unlocks
- Keep temporary power-ups separate from permanent core abilities if the scope grows
- Let enemies reuse the same style of ability component later if needed

## Testing Checklist

- Ability component exists on the player
- Power-up pickup activates the correct state
- Timed power-up ends after the duration
- Permanent unlock does not end unless manually cleared
- UI can show active state later
- Door can check ability state
- Multiple ability states do not break each other
- Designers can change duration without editing Blueprint logic