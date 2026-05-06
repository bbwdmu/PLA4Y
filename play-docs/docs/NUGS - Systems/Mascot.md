---
title: Mascot
---

# Mascot System

## Overview

The mascot system provides a companion actor that follows the player and reacts to gameplay state.

Use it for a platformer buddy, a guide character, or a visual feedback helper for health, collectibles, and abilities.

## Components

- `AC_MascotFollower`
- `BP_MascotFollowerActor`

## What The System Does

- Spawns or references a mascot actor
- Makes the mascot follow the player
- Lets the mascot react to health state
- Lets the mascot react to abilities or power-ups
- Can point or look at important world objects
- Can support collectible search behaviour later

## Features

- Follow behaviour
- Health mood reactions
- Ability reactions
- Look-at target support
- Optional collectible helper logic
- Visual feedback through material, colour, animation, or enum states

## Runtime Flow

1. Player owns `AC_MascotFollower`.
2. The component spawns or stores `BP_MascotFollowerActor`.
3. The mascot updates its follow position around the player.
4. Gameplay systems send state changes to the mascot component.
5. The component updates the mascot mood, look target, material, animation, or visibility.
6. The mascot actor displays the reaction in the world.

## Usage

Attach `AC_MascotFollower` to the player and assign a mascot actor class.

## Blueprint Tutorial

### Goal

Create a mascot companion that follows the player and reacts to health changes.

### Before You Start

Create or confirm these assets exist:

- `AC_MascotFollower`
- `BP_MascotFollowerActor`
- `AC_Health`
- A mascot mood enum
- A player character Blueprint

### Step 1, Add The Mascot Component

1. Open the player character Blueprint.
2. Add `AC_MascotFollower` as an Actor Component.
3. Assign `BP_MascotFollowerActor` as the mascot actor class.
4. Set the follow offset.
5. Compile and save.

### Step 2, Spawn Or Assign The Mascot Actor

Inside `AC_MascotFollower`:

1. On BeginPlay, check if a mascot actor is already assigned.
2. If not, spawn `BP_MascotFollowerActor`.
3. Store the spawned actor as `MascotActorRef`.
4. Set the owning player reference on the mascot.

### Step 3, Follow The Player

Use a simple first pass:

1. Get the player location.
2. Add the follow offset.
3. Interp the mascot location toward that target.
4. Keep the mascot facing the player or camera.
5. Tune follow distance and speed in the component defaults.

### Step 4, React To Health

Connect `AC_Health` to the mascot:

1. Bind to the health changed dispatcher.
2. Read the health percent.
3. Convert health percent into a mood enum.
4. Call `SetMascotMood` on the mascot actor.
5. Update material, face, colour, or animation from the mood.

Suggested mood states:

- `Hidden`
- `Low`
- `Mid`
- `High`

### Step 5, Add Look At Target Support

Inside `BP_MascotFollowerActor`, create a function called `SetLookAtTarget`.

Suggested input:

- `TargetActor`, Actor Reference

Function flow:

1. Store the target actor.
2. Check the target is valid.
3. Find look-at rotation from mascot to target.
4. Interp the mascot head or actor rotation toward the target.
5. Clear the target when no longer needed.

### Step 6, Test The Result

1. Press Play.
2. Check that the mascot follows the player.
3. Damage the player.
4. Confirm the mascot mood changes.
5. Heal the player.
6. Confirm the mascot returns to the correct mood.
7. Test look-at logic with a collectible actor.

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Mascot Component On Player

<!-- ![Mascot component screenshot placeholder](./img/mascot-component-placeholder.png) -->

### Mascot Actor Blueprint

<!-- ![Mascot actor Blueprint screenshot placeholder](./img/mascot-actor-placeholder.png) -->

### Follow Logic Blueprint

<!-- ![Mascot follow logic screenshot placeholder](./img/mascot-follow-placeholder.png) -->

### Mood Reaction Setup

<!-- ![Mascot mood setup screenshot placeholder](./img/mascot-mood-placeholder.png) -->

### Look At Target Test

<!-- ![Mascot look at test screenshot placeholder](./img/mascot-look-at-placeholder.png) -->

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### AC_MascotFollower, BeginPlay Spawn Logic

```text title="AC_MascotFollower BeginPlay Nodes"
Paste exported Blueprint node code here.
```

### AC_MascotFollower, Follow Update Logic

```text title="AC_MascotFollower Follow Update Nodes"
Paste exported Blueprint node code here.
```

### BP_MascotFollowerActor, Set Mascot Mood Function

```text title="BP_MascotFollowerActor Set Mascot Mood Nodes"
Paste exported Blueprint node code here.
```

### BP_MascotFollowerActor, Set Look At Target Function

```text title="BP_MascotFollowerActor Set Look At Target Nodes"
Paste exported Blueprint node code here.
```

### Health To Mascot Binding

```text title="Health To Mascot Binding Nodes"
Paste exported Blueprint node code here.
```

## Extension Notes

- Add collectible look-at support using tags later
- Add a buddy magnet component for collectible guidance
- Add animation states for idle, alert, damaged, happy, and hidden
- Add material parameter support for colour and mood visuals
- Keep mascot logic optional so the toolkit works without it

## Testing Checklist

- Mascot spawns or assigns correctly
- Mascot follows the player at the correct offset
- Mascot does not jitter during movement
- Mascot reacts to low, mid, and high health
- Mascot can clear its look-at target
- Mascot can look at a collectible test actor
- System still works if the mascot actor is not assigned
- Designers can tune follow distance and speed without editing core logic