---
title: UI NUG
slug: /UI/UI
description: Documentation for the PLA4Y UI NUG, a modular Unreal Engine UI system for HUD widgets, interaction prompts, collectible displays, health displays, and gameplay feedback.
---

# UI NUG

## Overview

The UI NUG displays gameplay information from the toolkit components.

Use it for collectible counts, health display, door requirements, power-up state, interaction prompts, and demo-level feedback.

## Widgets

- `WBP_CollectibleDisplay`
- `WBP_HealthDisplay`
- `WBP_DoorRequirement`
- `WBP_InteractPrompt`
- `WBP_PowerUpDisplay`

## What The System Does

- Shows values from gameplay components
- Updates when components broadcast changes
- Supports HUD widgets
- Supports world-space prompt widgets
- Gives designers visible feedback during testing
- Keeps UI separate from gameplay logic

## Quick Setup

Use this section to test one UI display.

1. Create or open the required widget.
2. Add the widget to the player HUD or viewport.
3. Bind the widget to the relevant component.
4. Trigger the gameplay system.
5. Check that the widget updates.
6. Test with print strings before debugging the widget layout.

## Features

- Dynamic updates
- World-space UI
- HUD display
- Door requirement feedback
- Health state display
- Collectible amount display
- Power-up state display

## Runtime Flow

1. Player owns gameplay components such as health, wallet, ability, or interact.
2. UI widgets bind to component events or read component values.
3. A component value changes during gameplay.
4. The component broadcasts an update event.
5. The widget receives the event.
6. The widget updates text, images, progress bars, colours, or visibility.

## Usage

Bind widgets to gameplay components instead of storing gameplay logic inside the widget.

## Blueprint Tutorial

### Goal

Create a simple HUD that displays health and collectible values from the player components.

### Before You Start

Create or confirm these assets exist:

- `AC_Health`
- `AC_CollectibleWallet`
- `WBP_HealthDisplay`
- `WBP_CollectibleDisplay`
- A player character Blueprint
- A player controller or HUD Blueprint

### Step 1, Create The Health Widget

1. Create `WBP_HealthDisplay`.
2. Add a text block, progress bar, or image.
3. Create a function called `UpdateHealthDisplay`.
4. Add inputs for current health, max health, and health percent.
5. Set the text or progress bar value from those inputs.

### Step 2, Create The Collectible Widget

1. Create `WBP_CollectibleDisplay`.
2. Add an icon image.
3. Add a text block for the amount.
4. Create a function called `UpdateCollectibleDisplay`.
5. Add inputs for collectible name, amount, and icon.
6. Set the text and icon from those inputs.

### Step 3, Add Widgets To The HUD

1. Open the player controller, HUD, or UI manager Blueprint.
2. On BeginPlay, create the health widget.
3. Add it to the viewport.
4. Create the collectible widget.
5. Add it to the viewport.
6. Store both widget references.

### Step 4, Bind Gameplay Components

1. Get the player character.
2. Get `AC_Health` from the player.
3. Bind to the health changed dispatcher.
4. Get `AC_CollectibleWallet` from the player.
5. Bind to the collectible changed dispatcher when that dispatcher is added.
6. Update each widget when the relevant component changes.

### Step 5, Add World-Space Prompt Support

For interact prompts or door requirement prompts:

1. Create a prompt widget.
2. Convert the target actor world location to screen position.
3. Add an offset above the actor.
4. Set widget position in viewport.
5. Hide the widget when the actor is no longer targeted.

### Step 6, Test The Result

1. Press Play.
2. Damage the player.
3. Confirm the health widget updates.
4. Collect a pickup.
5. Confirm the collectible widget updates.
6. Look at or interact with a door.
7. Confirm requirement feedback appears when needed.

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Health Widget Designer

Image slot: health widget designer.

### Collectible Widget Designer

Image slot: collectible widget designer.

### Door Requirement Widget

Image slot: door requirement widget.

### Interaction Prompt Runtime

Image slot: interaction prompt runtime.

### HUD Runtime Test

Image slot: HUD runtime test.

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### Create HUD Widgets

```text title="Create HUD Widgets Nodes"
Paste exported Blueprint node code here.
```

### Update Health Widget

```text title="Update Health Widget Nodes"
Paste exported Blueprint node code here.
```

### Update Collectible Widget

```text title="Update Collectible Widget Nodes"
Paste exported Blueprint node code here.
```

### Door Requirement Widget Update

```text title="Door Requirement Widget Nodes"
Paste exported Blueprint node code here.
```

### World-Space Prompt Positioning

```text title="World-Space Prompt Positioning Nodes"
Paste exported Blueprint node code here.
```

## Common Issues

### Widget Does Not Appear

Check that the widget is being created and added to viewport.

Also check that the owning player is valid.

### Widget Appears But Does Not Update

Check that the gameplay value changes first.

Then check that the widget is bound to the correct component or dispatcher.

### Prompt Is The Wrong Size

Wrap the prompt contents in a ScaleBox or SizeBox.

Set a clear desired size.

### Prompt Appears In The Wrong Place

Check whether the UI is screen-space or world-space.

If using world location, make sure the location comes from the interactable object, not the player.

### UI Updates Every Tick And Causes Issues

Use dispatchers or event-based updates where possible.

Only use tick for UI when it is actually needed.

### Widget Looks Different In Another Resolution

Use anchors, ScaleBox, SizeBox, and responsive layout containers.

Test the widget at more than one viewport size before assuming the logic is broken.

## Extension Notes

- Add Common UI support later if the toolkit needs controller-first menus
- Add ScaleBox support to prevent interact prompt images squishing
- Add global parameter colour support for interaction material feedback
- Keep UI widgets optional so gameplay systems can run without UI
- Add demo level labels showing which component feeds each widget

## Testing Checklist

- Health widget updates after damage
- Health widget updates after healing
- Collectible widget updates after pickup
- Door requirement widget shows missing requirements
- Prompt widget hides when no interactable is targeted
- World-space prompt stays readable on screen
- UI does not store gameplay authority logic
- Widgets can be replaced by designers without changing the component logic