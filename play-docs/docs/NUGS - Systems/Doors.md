---
title: Door
---

# Door System

## Overview

The door system controls player progression using requirements from other systems.

Use it for locked doors, gates, barriers, collectible checks, ability checks, and demo-level progression examples.

## Components

- `BP_BaseDoor`
- `AC_DoorLock`

## What The System Does

- Checks whether a player meets door requirements
- Supports collectible requirements
- Supports optional collectible consumption
- Supports ability or power-up requirements
- Keeps door logic separate from collectible and ability logic
- Gives designers a clean place to configure progression rules

## Features

- Collectible requirements
- Optional consume-on-unlock behaviour
- Ability-based unlocking
- Reusable lock component
- Can feed requirement information into UI

## Runtime Flow

1. Player interacts with the door.
2. `BP_BaseDoor` calls into `AC_DoorLock`.
3. `AC_DoorLock` checks the player for required systems.
4. Collectible requirements are checked against `AC_CollectibleWallet`.
5. Ability requirements are checked against the player ability component.
6. If all requirements pass, the door opens.
7. If consume-on-unlock is enabled, the required collectible amount is removed.
8. If requirements fail, the door can show a UI prompt.

## Usage

Attach `AC_DoorLock` to a door actor and define the required unlock conditions.

## Blueprint Tutorial

### Goal

Create a door that opens only when the player has the required collectible amount.

### Before You Start

Create or confirm these assets exist:

- `BP_BaseDoor`
- `AC_DoorLock`
- `AC_CollectibleWallet`
- A collectible data asset
- A player character with a wallet component

### Step 1, Add The Door Lock Component

1. Open `BP_BaseDoor`.
2. Add `AC_DoorLock` as an Actor Component.
3. Compile and save.

### Step 2, Configure Requirements

1. Select `AC_DoorLock` in the Components panel.
2. Add a collectible requirement.
3. Assign the collectible data asset or collectible tag.
4. Set the required amount.
5. Enable consume-on-unlock only if the door should spend the collectible.

### Step 3, Add Interaction Logic

Inside `BP_BaseDoor`, connect your interaction event to the lock check:

1. Player interacts with the door.
2. Get `AC_DoorLock`.
3. Call the requirement check function.
4. If true, call the open door function.
5. If false, show the locked feedback.

### Step 4, Add Door Opening Logic

Use a simple first version before adding polish:

1. Store a closed location or rotation.
2. Store an open location or rotation.
3. Move or rotate the door when unlocked.
4. Add timeline or interpolation later if needed.

### Step 5, Test The Result

1. Press Play with zero collectibles.
2. Interact with the door.
3. Confirm it stays locked.
4. Collect the required amount.
5. Interact again.
6. Confirm the door opens.
7. Test consume-on-unlock if enabled.

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Door Actor Setup

![Door actor setup screenshot placeholder](./img/door-actor-placeholder.png)

### Door Lock Component Settings

![Door lock component screenshot placeholder](./img/door-lock-component-placeholder.png)

### Collectible Requirement Setup

![Door collectible requirement screenshot placeholder](./img/door-requirement-placeholder.png)

### Runtime Locked Feedback

![Door locked feedback screenshot placeholder](./img/door-locked-feedback-placeholder.png)

### Runtime Open Door Test

![Door open test screenshot placeholder](./img/door-open-test-placeholder.png)

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

### BP_BaseDoor, Open Door Function

```text title="BP_BaseDoor Open Door Nodes"
Paste exported Blueprint node code here.
```

### Locked UI Feedback

```text title="Door Locked UI Feedback Nodes"
Paste exported Blueprint node code here.
```

## Extension Notes

- Add support for multiple requirement groups later
- Add OR logic if a door can accept different unlock routes
- Add UI data output so the HUD can show missing requirements
- Add save support so unlocked doors stay open
- Add ability checks for charge, swim, shrink, grow, or other platformer states

## Testing Checklist

- Door remains locked when requirements are missing
- Door opens when requirements pass
- Consume-on-unlock removes the correct amount
- Check-only mode leaves the wallet value unchanged
- Locked feedback appears when the player fails the check
- Door state can be saved later
- Requirements can be changed by a designer without editing core logic