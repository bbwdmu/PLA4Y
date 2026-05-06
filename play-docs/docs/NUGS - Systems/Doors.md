---
title: Door
---

# Door And Unlock System

## Overview

The door system controls player progression using requirements from other systems.

Use it for locked doors, gates, barriers, collectible checks, ability checks, power-up checks, and demo-level progression examples.

This system is currently documented around doors because doors are the clearest first example. Long term, the unlock logic should not be coupled to doors only. The same logic should also support jars, rocks, chests, reward containers, breakable objects, blocked paths, and any actor that can open, break, reveal, or change state after a requirement is met.

## Current Components

- `BP_BaseDoor`
- `AC_DoorLock`

## Planned Component Rename

`AC_DoorLock` is the current working name, but it is too tightly tied to doors.

Planned future split:

- `AC_CollectibleUnlock`
- `AC_AbilityUnlock`

This makes the system more modular. A door can use these components, but so can a jar, rock, gate, chest, shrine, hidden reward object, or level blocker.

## What The System Does

- Checks whether a player meets unlock requirements
- Supports collectible requirements
- Supports optional collectible consumption
- Supports active ability or power-up requirements
- Supports action-based unlocks from power-ups
- Keeps unlock logic separate from the actor that opens, breaks, or reveals content
- Gives designers a clean place to configure progression rules

## Features

- Collectible requirements
- Optional consume-on-unlock behaviour
- Ability-based unlocking
- Active power-up checks
- Power-up action checks
- Reusable unlock logic
- Requirement information for UI
- Works beyond doors when refactored into unlock components

## Unlock Examples

### Collectible Unlock

A door needs 10 gems before it opens.

A chest needs one silver key before it reveals a reward.

A gate checks whether the player has enough tokens, but does not consume them.

### Active Power-Up Unlock

A barrier only opens while the player has a temporary fire power-up active.

A magic gate only opens while the player is in a large form.

A timed shortcut only opens while a speed boost is active.

### Power-Up Action Unlock

A cracked rock opens when the player uses a charge action.

A sealed jar breaks when hit by a fire action.

A heavy switch activates when the player uses a grow or ground-pound style power-up.

A frozen object melts when the player uses fire, revealing contents.

## Runtime Flow

1. Player interacts with, hits, overlaps, or affects an unlockable actor.
2. The actor asks its unlock component to check requirements.
3. Collectible requirements are checked against `AC_CollectibleWallet`.
4. Ability requirements are checked against the player ability or power-up component.
5. Action requirements check what the player has just done, such as charge, fire, shrink, grow, or another power-up action.
6. If requirements pass, the actor runs its success behaviour.
7. Success behaviour could open a door, break a jar, move a barrier, reveal contents, enable a path, or trigger a reward.
8. If consume-on-unlock is enabled, the required collectible amount is removed.
9. If requirements fail, the actor can show locked feedback or ignore the action.

## Usage

For now, attach `AC_DoorLock` to a door actor and define the required unlock conditions.

Long term, use `AC_CollectibleUnlock` for currency, key, token, and item checks. Use `AC_AbilityUnlock` for active power-up checks and action-based unlocks.

The actor should own the result. The unlock component should only answer whether the player is allowed to unlock it.

## Blueprint Tutorial

### Goal

Create a door that opens only when the player has the required collectible amount, then extend the same pattern to ability or power-up checks.

### Before You Start

Create or confirm these assets exist:

- `BP_BaseDoor`
- `AC_DoorLock`
- `AC_CollectibleWallet`
- `AC_AbilityComponent`
- A collectible data asset
- A player character with wallet and ability components

### Step 1, Add The Door Lock Component

1. Open `BP_BaseDoor`.
2. Add `AC_DoorLock` as an Actor Component.
3. Compile and save.

### Step 2, Configure Collectible Requirements

1. Select `AC_DoorLock` in the Components panel.
2. Add a collectible requirement.
3. Assign the collectible data asset or collectible tag.
4. Set the required amount.
5. Enable consume-on-unlock only if the door should spend the collectible.

### Step 3, Configure Ability Or Power-Up Requirements

Use this when the actor should only unlock while the player has a certain power-up active.

1. Add an ability requirement to the unlock component.
2. Choose the required ability or power-up type.
3. Choose whether the ability must be active, permanently unlocked, or triggered by an action.
4. Use active checks for temporary states, such as fire active or speed boost active.
5. Use action checks for direct player actions, such as charge, fire shot, ground pound, shrink, or grow.

### Step 4, Add Interaction Or Action Logic

Inside `BP_BaseDoor`, or any unlockable actor, connect the event to the unlock check:

1. Player interacts with the actor, overlaps it, or hits it with an action.
2. Get the unlock component.
3. Pass in the player actor.
4. Pass in the action type if needed.
5. Call the requirement check function.
6. If true, run the actor success behaviour.
7. If false, show locked feedback or do nothing.

### Step 5, Add Success Behaviour

The actor decides what happens after the unlock succeeds.

Examples:

- Door opens
- Gate slides away
- Jar breaks
- Rock cracks open
- Chest reveals a reward
- Barrier disables collision
- Hidden collectible appears

### Step 6, Test The Result

1. Press Play with zero collectibles and no power-up active.
2. Try the locked actor.
3. Confirm it stays locked.
4. Collect the required amount or activate the required power-up.
5. Try again.
6. Confirm the actor unlocks.
7. Test action-based logic by using a power-up action, such as charge or fire.
8. Confirm the actor only unlocks from the correct action.
9. Test consume-on-unlock if enabled.

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Door Actor Setup

Image slot: door actor setup.

### Unlock Component Settings

Image slot: unlock component settings.

### Collectible Requirement Setup

Image slot: collectible unlock requirement setup.

### Ability Requirement Setup

Image slot: ability or power-up unlock requirement setup.

### Power-Up Action Unlock Test

Image slot: power-up action unlock test.

### Runtime Locked Feedback

Image slot: runtime locked feedback.

### Runtime Open Door Test

Image slot: runtime open door test.

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### BP_BaseDoor, Interact Event

```text title="BP_BaseDoor Interact Nodes"
Paste exported Blueprint node code here.
```

### AC_DoorLock, Requirement Check Function

```text title="AC_DoorLock Requirement Check Nodes"
Paste exported Blueprint node code here.
```

### Future AC_CollectibleUnlock, Requirement Check Function

```text title="AC_CollectibleUnlock Requirement Check Nodes"
Paste exported Blueprint node code here.
```

### Future AC_AbilityUnlock, Requirement Check Function

```text title="AC_AbilityUnlock Requirement Check Nodes"
Paste exported Blueprint node code here.
```

### BP_BaseDoor, Open Door Function

```text title="BP_BaseDoor Open Door Nodes"
Paste exported Blueprint node code here.
```

### Unlockable Actor, Break Or Reveal Function

```text title="Unlockable Actor Break Or Reveal Nodes"
Paste exported Blueprint node code here.
```

### Locked UI Feedback

```text title="Locked UI Feedback Nodes"
Paste exported Blueprint node code here.
```

## Refactor Plan

The current `AC_DoorLock` name should be treated as a temporary implementation name.

Long-term target:

- `AC_CollectibleUnlock` handles collectible, key, currency, and token checks
- `AC_AbilityUnlock` handles active power-up checks and action-based ability checks
- Doors, jars, rocks, chests, barriers, and other actors use these components without owning the requirement logic
- Each actor handles its own result, such as open, break, reveal, disable, move, or spawn reward

This reduces coupling and makes the toolkit easier to reuse across different platformer objects.

## Extension Notes

- Add support for multiple requirement groups later
- Add OR logic if an actor can accept different unlock routes
- Add UI data output so the HUD can show missing requirements
- Add save support so unlocked actors stay open, broken, or revealed
- Add ability checks for charge, fire, swim, shrink, grow, speed boost, and other platformer states
- Add action source data so unlocks can tell the difference between interact, overlap, charge, fire, or melee

## Testing Checklist

- Actor remains locked when collectible requirements are missing
- Actor unlocks when collectible requirements pass
- Consume-on-unlock removes the correct amount
- Check-only mode leaves the wallet value unchanged
- Actor remains locked when the required active power-up is missing
- Actor unlocks while the required active power-up is active
- Actor only unlocks from the correct action when action-based logic is enabled
- Locked feedback appears when the player fails the check
- Actor state can be saved later
- Requirements can be changed by a designer without editing core actor logic
- The same unlock logic can be reused on a door, jar, rock, chest, or barrier