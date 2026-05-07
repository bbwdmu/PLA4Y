---
title: Interaction NUG
description: Documentation for the PLA4Y Interaction NUG, a modular Unreal Engine system for detecting interactable actors, showing prompts, and triggering interface-based interaction logic.
---

# Interaction NUG

## Overview

The Interaction NUG handles how the player finds, views, and triggers interactable objects in the world.

Use it for doors, pickups, switches, NPCs, signs, power-ups, terminals, chests, and any actor that needs player-triggered behaviour.

## Core Assets

- `AC_Interact`
- `BPI_Interactable`
- `WBP_InteractPrompt`

## What The System Does

- Finds interactable actors
- Checks whether actors implement the interaction interface
- Stores the current interactable target
- Shows or hides an interaction prompt
- Sends interaction input to the target actor
- Keeps player interaction logic separate from the object being used

## Quick Setup

Use this section to test one interactable object.

1. Add `AC_Interact` to the player character.
2. Add `BPI_Interactable` to the actor that should be interacted with.
3. Set the trace distance or detection range.
4. Set the object types the system should detect.
5. Assign the prompt widget.
6. Press Play.
7. Look at or move near the interactable actor.
8. Check that the prompt appears.
9. Press the interact input.
10. Confirm the actor runs its interaction logic.

## Runtime Flow

1. The player looks for interactable actors using the interaction component.
2. The component checks whether the detected actor implements `BPI_Interactable`.
3. If valid, the actor becomes the current interactable.
4. The prompt widget appears.
5. The player presses the interact input.
6. `AC_Interact` calls the interaction event on the target actor.
7. The target actor decides what happens next.

## Why This Is Modular

The Interaction NUG does not need to know what the target actor is.

A door can open.

A chest can reveal a reward.

A sign can show text.

A power-up can activate.

An NPC can start dialogue.

The interaction component only finds the actor and calls the interface. The actor owns the result.

## Blueprint Tutorial

### Goal

Create one working interactable actor that shows a prompt and reacts when the player presses the interact input.

### Before You Start

Create or confirm these assets exist:

- `AC_Interact`
- `BPI_Interactable`
- `WBP_InteractPrompt`
- A player character Blueprint
- A test actor Blueprint

### Step 1, Add The Interaction Component

1. Open the player character Blueprint.
2. Add `AC_Interact` as an Actor Component.
3. Set the trace or detection distance.
4. Set the object types the component should detect.
5. Assign the prompt widget class if the component owns prompt creation.
6. Compile and save.

### Step 2, Add The Interface To A Test Actor

1. Open the test actor Blueprint.
2. Add `BPI_Interactable` in Class Settings.
3. Compile and save.
4. Implement the interaction event from the interface.
5. Add a simple test action, such as print string, toggle visibility, or open door.

### Step 3, Connect The Input

1. Open the player character or input handling Blueprint.
2. Find the interact input action.
3. On input pressed, call the interact function on `AC_Interact`.
4. The component should use the current interactable target.
5. If the target is valid, call the interface event.

### Step 4, Add The Prompt

1. Create or open `WBP_InteractPrompt`.
2. Add clear prompt text, such as `Press Interact`.
3. Keep the prompt small and readable.
4. If the prompt is world-positioned, use the interactable actor or prompt target component as the location source.
5. If the prompt is screen-space, project the world location to screen.

### Step 5, Test The Result

1. Press Play.
2. Look at or move near the test actor.
3. Confirm the prompt appears.
4. Press the interact input.
5. Confirm the test actor reacts.
6. Move away or look away.
7. Confirm the prompt hides.

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Interaction Component On Player

Image slot: interaction component on player.

### Interface Added To Actor

Image slot: interface added to interactable actor.

### Trace Or Detection Settings

Image slot: interaction trace or detection settings.

### Prompt Widget Setup

Image slot: prompt widget setup.

### Runtime Prompt Test

Image slot: runtime prompt test.

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### AC_Interact, Find Interactable Function

```text title="AC_Interact Find Interactable Nodes"
Paste exported Blueprint node code here.
```

### AC_Interact, Interact Function

```text title="AC_Interact Interact Nodes"
Paste exported Blueprint node code here.
```

### BPI_Interactable, Actor Interaction Event

```text title="BPI_Interactable Interaction Event Nodes"
Paste exported Blueprint node code here.
```

### Prompt Widget Update

```text title="Interact Prompt Widget Nodes"
Paste exported Blueprint node code here.
```

## Common Issues

### Prompt Does Not Appear

Check that the target actor implements `BPI_Interactable`.

Also check that the trace or detection object types include the actor collision type.

### Actor Is Detected But Cannot Interact

Check that the interact input calls the interaction function on `AC_Interact`.

Also check that the current interactable reference is valid.

### Prompt Appears In The Wrong Place

Check whether the prompt is using the actor location, component location, or screen projection.

For world prompts, use the interactable actor or prompt target component as the location source.

### Prompt Is Stretched Or Squashed

Put the prompt content inside a ScaleBox or SizeBox.

Set a clear desired size.

### Interaction Fires Constantly

Only call the interaction event when the input is pressed.

Detection can update often, but interaction should be input-based.

### It Only Works From One Camera Angle

Check the trace start and direction.

If the game uses multiple cameras, make sure the trace uses the active camera or the intended view source.

## Extension Notes

- Add prompt target components for cleaner widget placement later
- Add support for interaction priority if multiple objects are detected
- Add icon support for different interaction types
- Add gamepad and keyboard prompt switching later
- Keep interaction logic interface-based so other NUGS can use it without hard dependencies

## Testing Checklist

- Player can detect an interactable actor
- Prompt appears when the actor is valid
- Prompt hides when the actor is no longer valid
- Interact input calls the target actor
- Non-interactable actors are ignored
- Door interaction works
- Power-up or collectible interaction can be added later
- Prompt location is readable in first-person and third-person views
- Interaction does not fire every tick
- The system still works when other NUGS are not installed
