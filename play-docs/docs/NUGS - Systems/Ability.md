---
title: Ability And Power-Up NUG
description: Documentation for the PLA4Y Ability And Power-Up NUG, a modular Unreal Engine system for runtime power-up components, data asset driven setup, timers, unlocks, and reusable gameplay effects.
---

# Ability And Power-Up NUG

## Overview

The Ability And Power-Up NUG manages temporary power-ups, permanent unlocks, and reusable gameplay effects.

The current power-up pass uses a component-based lifecycle. The player only needs `AC_PowerupManager`. When a pickup grants a power-up, the manager reads a data asset, adds the correct power-up component at runtime, starts it through an interface, tracks it, and removes it when the effect ends.

This keeps the system modular. The manager does not know how Big, Small, Flame, Magnet, Speed, or any future effect works. Each effect lives in its own component.

## Core Components

- `AC_PowerupManager`
- `AC_PowerupBase`
- `BPI_PowerupEffect`
- `PDA_PowerupDefinition`
- `Struct_PowerupGrantSettings`
- `Struct_ActivePowerup`
- `BP_PowerupPickup`

## Current First Power-Up

The first implemented power-up is Size Shift.

Size Shift supports:

- Big only
- Small only
- Big and Small later
- Timed use
- Until removed use
- Runtime component creation
- Resetting the player scale when the power-up ends

Suggested class names:

- `AC_Powerup_SizeShift`
- `PDA_PowerupDefinition_SizeShift`
- `DA_Powerup_Big`
- `DA_Powerup_Small`

## Design Goal

The system is built around this rule:

```text
Manager handles lifecycle.
Data asset describes the power-up.
Effect component performs the power-up.
Pickup grants the power-up.
```

This avoids putting every power-up component on the player at once.

The player starts with:

- `AC_PowerupManager`

Power-up components are added only when needed.

## Base Data Asset

`PDA_PowerupDefinition` stores shared power-up data only.

Suggested variables:

| Variable | Type | Purpose |
| --- | --- | --- |
| `PowerupID` | Name | Exact power-up ID, such as `BigMode` or `SmallMode` |
| `PowerupGroup` | Name | Conflict group, such as `SizeShift` |
| `PowerupName` | Text | Player-facing name |
| `PowerupDescription` | Text | UI and documentation text |
| `EffectComponentClass` | Class Reference of `AC_PowerupBase` | Component class added by the manager |
| `DefaultDuration` | Float | Fallback duration when the pickup does not override it |
| `bCanBeTimed` | Boolean | Whether timed activation is supported |
| `DefaultGrantMode` | `E_PowerupGrantMode` | Default way this power-up is granted |
| `DefaultComponentLifetime` | `E_PowerupComponentLifetime` | Whether the component is temporary or kept |
| `Icon` | Texture2D | UI icon |
| `PickupMesh` | Static Mesh | Mesh used by the pickup actor |
| `bCanBeDisabled` | Boolean | Allows level rules to disable the power-up group |
| `bCanBeUnlocked` | Boolean | Allows permanent unlock behaviour |

Do not put effect-specific values in the base asset.

For example, do not put `TargetScale`, `FlameDamage`, or `MagnetRadius` in the base data asset. Those belong in child data assets.

## Size Shift Data Asset

`PDA_PowerupDefinition_SizeShift` is a child of `PDA_PowerupDefinition`.

Suggested variables:

| Variable | Type | Purpose |
| --- | --- | --- |
| `SizeShiftMode` | `E_SizeShiftMode` | Big only, Small only, or both |
| `DefaultSizeTarget` | `E_SizeShiftTarget` | Which size is applied when the effect starts |
| `BigScale` | Vector | Scale used for Big mode |
| `SmallScale` | Vector | Scale used for Small mode |
| `TransitionSpeed` | Float | Future value for smooth scale movement |
| `bResetScaleOnEnd` | Boolean | Resets the player to original scale when stopped |

Example `DA_Powerup_Big` values:

| Field | Value |
| --- | --- |
| `PowerupID` | `BigMode` |
| `PowerupGroup` | `SizeShift` |
| `PowerupName` | Big Mode |
| `EffectComponentClass` | `AC_Powerup_SizeShift` |
| `DefaultDuration` | 10 |
| `DefaultGrantMode` | Timed |
| `DefaultComponentLifetime` | ActiveOnly |
| `SizeShiftMode` | BigOnly |
| `DefaultSizeTarget` | Big |
| `BigScale` | 2, 2, 2 |
| `SmallScale` | 0.5, 0.5, 0.5 |
| `bResetScaleOnEnd` | true |

Example `DA_Powerup_Small` values:

| Field | Value |
| --- | --- |
| `PowerupID` | `SmallMode` |
| `PowerupGroup` | `SizeShift` |
| `PowerupName` | Small Mode |
| `EffectComponentClass` | `AC_Powerup_SizeShift` |
| `DefaultDuration` | 10 |
| `DefaultGrantMode` | Timed or UntilRemoved |
| `DefaultComponentLifetime` | ActiveOnly |
| `SizeShiftMode` | SmallOnly |
| `DefaultSizeTarget` | Small |
| `BigScale` | 2, 2, 2 |
| `SmallScale` | 0.5, 0.5, 0.5 |
| `bResetScaleOnEnd` | true |

Big and Small both use `PowerupGroup = SizeShift`, so they replace each other instead of stacking.

## Grant Settings

`Struct_PowerupGrantSettings` lives on pickups or grant actors.

Suggested variables:

| Variable | Type | Purpose |
| --- | --- | --- |
| `PowerupDefinition` | `PDA_PowerupDefinition` Object Reference | The power-up to grant |
| `GrantMode` | `E_PowerupGrantMode` | Timed, UntilRemoved, PermanentUnlock, LevelTemporary |
| `ComponentLifetime` | `E_PowerupComponentLifetime` | ActiveOnly, KeepWhileUnlocked, KeepUntilLevelEnd |
| `bOverrideDuration` | Boolean | Lets the pickup override the data asset duration |
| `OverrideDuration` | Float | Duration used when override is enabled |
| `bAutoActivate` | Boolean | Starts the power-up immediately after grant |
| `bRemoveOnLevelEnd` | Boolean | Marks the power-up for level cleanup later |

This lets designers use the same data asset in different ways.

Examples:

- Big for 10 seconds
- Small until removed by puzzle logic
- Flame unlocked permanently later
- A level-only ability that disappears when the level changes

## Active Power-Up Runtime Data

`Struct_ActivePowerup` lives inside `AC_PowerupManager`.

Suggested variables:

| Variable | Type | Purpose |
| --- | --- | --- |
| `PowerupDefinition` | `PDA_PowerupDefinition` Object Reference | Data asset used by the active effect |
| `PowerupID` | Name | Exact active power-up ID |
| `PowerupGroup` | Name | Group key used in the active map |
| `EffectComponent` | `AC_PowerupBase` Object Reference | Runtime component instance on the player |
| `GrantMode` | `E_PowerupGrantMode` | How the effect was granted |
| `ComponentLifetime` | `E_PowerupComponentLifetime` | How the component should be cleaned up |
| `Duration` | Float | Final duration used by the timer |
| `StartTime` | Float | Game time when the power-up started |
| `bManagerSpawnedComponent` | Boolean | True if the manager added the component at runtime |
| `bRemoveOnLevelEnd` | Boolean | Used later for level cleanup |

`EffectComponentClass` is the recipe.

`EffectComponent` is the actual component instance created on the player.

## Manager Variables

`AC_PowerupManager` should keep lifecycle data only.

Suggested variables:

| Variable | Type | Purpose |
| --- | --- | --- |
| `ActivePowerups` | Map, Name to `Struct_ActivePowerup` | Tracks active power-up groups |
| `UnlockedPowerups` | Map, Name to `PDA_PowerupDefinition` | Tracks owned power-ups |
| `DisabledPowerupGroups` | Array of Name | Blocks power-up groups by level or state |

`ActivePowerups` uses `PowerupGroup` as the key.

This allows multiple groups to run together, while stopping conflicts inside the same group.

Example:

- `SizeShift` active
- `Magnet` active
- `Invincibility` active

But not:

- Big and Small active at the same time

## Manager Functions

### `ApplyPowerupGrant`

Entry point from pickups.

Input:

- `GrantSettings`

Output:

- `Success`

Flow:

1. Validate `PowerupDefinition`.
2. Get `PowerupGroup`.
3. Check `DisabledPowerupGroups`.
4. Switch on `GrantMode`.
5. Timed and UntilRemoved call `ActivatePowerup`.
6. PermanentUnlock calls `UnlockPowerup`, then activates if `bAutoActivate` is true.
7. LevelTemporary unlocks and activates for this level.

### `ActivatePowerup`

Starts a power-up effect.

Flow:

1. Validate the data asset.
2. Get `PowerupID` and `PowerupGroup`.
3. If `ActivePowerups` already contains the group, call `EndPowerupByGroup`.
4. Call `FindOrCreatePowerupComponent`.
5. Call `InitialisePowerup` through `BPI_PowerupEffect`.
6. Call `StartPowerup` through `BPI_PowerupEffect`.
7. Work out the final duration.
8. Add the active power-up to `ActivePowerups`.
9. If the grant mode is Timed, start the lifetime timer on the component.
10. Broadcast `OnPowerupStarted`.

The active map should be updated before the lifetime timer can expire.

### `FindOrCreatePowerupComponent`

Adds or reuses the correct runtime component.

Flow:

1. Get `EffectComponentClass` from the data asset.
2. Check the owner for an existing component of that class.
3. If one exists, reuse it.
4. If none exists, use `Add Component by Class`.
5. Cast the result to `AC_PowerupBase`.
6. Return the component instance.

### `EndPowerupByGroup`

Stops one active power-up group.

Flow:

1. Check `ActivePowerups` contains the group.
2. Get the stored `Struct_ActivePowerup`.
3. Get `EffectComponent` from the struct.
4. Clear the component lifetime timer.
5. Call `StopPowerup` through `BPI_PowerupEffect` on the component.
6. If `bManagerSpawnedComponent` is true and lifetime is ActiveOnly, destroy the component.
7. Remove the group from `ActivePowerups`.
8. Broadcast `OnPowerupEnded`.

Call the interface on the stored component instance, not on the manager.

### `EndAllPowerups`

Stops every active power-up.

Useful for:

- Player death
- Level reset
- Debug reset
- Save and load cleanup

### `UnlockPowerup`

Adds a power-up to `UnlockedPowerups`.

Useful for future abilities such as:

- Flame
- Swim
- Double jump
- Wall climb

### `GetActivePowerups`

Returns the values from `ActivePowerups`.

Use this for UI rather than letting widgets read the map directly.

### `GetPowerupRemainingTimeByGroup`

Returns remaining time and progress for a power-up group.

Useful for:

- HUD icons
- Duration bars
- Radial timers
- Debug widgets

## Interface

`BPI_PowerupEffect` keeps the manager generic.

Suggested functions:

- `InitialisePowerup`
- `StartPowerup`
- `StopPowerup`
- `DisablePowerup`
- `EnablePowerup`

The manager calls these interface functions on the active effect component.

It should not cast to Size Shift, Flame, Magnet, or any other specific component.

## Power-Up Base Component

`AC_PowerupBase` is the parent for all effect components.

Suggested variables:

| Variable | Type | Purpose |
| --- | --- | --- |
| `PowerupDefinition` | `PDA_PowerupDefinition` Object Reference | Data asset used by this effect |
| `OwningManager` | `AC_PowerupManager` Object Reference | Manager that controls this effect |
| `PowerupID` | Name | Exact power-up ID |
| `PowerupGroup` | Name | Active group key |
| `bPowerupActive` | Boolean | True while the effect is active |
| `bPowerupDisabled` | Boolean | True when level rules block it |
| `LifetimeTimerHandle` | Timer Handle | Timer used for timed effects |

Suggested functions:

- `StartLifetimeTimer`
- `HandleLifetimeExpired`
- `ClearLifetimeTimer`

Timer flow:

1. Manager activates the power-up.
2. Manager stores the active struct in `ActivePowerups`.
3. Manager calls `StartLifetimeTimer` on the effect component.
4. When the timer expires, the component calls `EndPowerupByGroup` on the manager.
5. The manager stops and removes the component if needed.

## Size Shift Component

`AC_Powerup_SizeShift` is a child of `AC_PowerupBase`.

Suggested variables:

| Variable | Type | Purpose |
| --- | --- | --- |
| `OriginalScale` | Vector | Player scale before the effect starts |
| `CurrentSizeTarget` | `E_SizeShiftTarget` | Current size state |
| `SizeShiftData` | `PDA_PowerupDefinition_SizeShift` Object Reference | Casted size shift data asset |
| `bHasSavedOriginalScale` | Boolean | Prevents overwriting the original scale |

Suggested functions:

- `ApplyBig`
- `ApplySmall`
- `ReturnToNormal`

Start flow:

1. Cast `PowerupDefinition` to `PDA_PowerupDefinition_SizeShift`.
2. Save the owner actor scale as `OriginalScale`.
3. Read `DefaultSizeTarget`.
4. Apply Big or Small scale.
5. Set the current size target.

Stop flow:

1. Check `bResetScaleOnEnd`.
2. If true, set owner actor scale back to `OriginalScale`.
3. Set `bPowerupActive` to false.
4. Let the manager destroy the component if needed.

The Size Shift component handles scale logic. The manager does not.

## Runtime Flow

1. Player overlaps `BP_PowerupPickup`.
2. Pickup sends `Struct_PowerupGrantSettings` to `AC_PowerupManager`.
3. Manager validates the data asset and group.
4. Manager checks if another power-up in that group is already active.
5. If needed, manager ends the old group.
6. Manager reads `EffectComponentClass` from the data asset.
7. Manager adds or reuses the effect component.
8. Manager calls `InitialisePowerup` through `BPI_PowerupEffect`.
9. Manager calls `StartPowerup` through `BPI_PowerupEffect`.
10. Manager stores runtime data in `ActivePowerups`.
11. If timed, the component lifetime timer starts.
12. When the timer expires, the component asks the manager to end its group.
13. Manager calls `StopPowerup`, destroys the component if needed, and removes the group from `ActivePowerups`.

## Quick Setup

Use this section to test Big Mode.

1. Add `AC_PowerupManager` to the player character.
2. Do not add `AC_Powerup_SizeShift` manually.
3. Create `PDA_PowerupDefinition_SizeShift` as a child data asset class.
4. Create `DA_Powerup_Big` from that child class.
5. Set `EffectComponentClass` to `AC_Powerup_SizeShift`.
6. Set `PowerupGroup` to `SizeShift`.
7. Create or place `BP_PowerupPickup`.
8. Set the pickup `GrantSettings.PowerupDefinition` to `DA_Powerup_Big`.
9. Set `GrantMode` to Timed.
10. Set `ComponentLifetime` to ActiveOnly.
11. Enable `bOverrideDuration` and set `OverrideDuration` to 10.
12. Press Play.
13. Collect the pickup.
14. Check the player becomes big.
15. Wait for the timer.
16. Check the player returns to normal and the runtime component is removed.

## UI Support

Use manager helper functions for UI.

Suggested functions:

- `GetActivePowerups`
- `IsPowerupGroupActive`
- `GetActivePowerupByGroup`
- `GetPowerupRemainingTimeByGroup`

Recommended UI flow:

1. Widget gets the player.
2. Widget gets `AC_PowerupManager`.
3. Widget binds to `OnPowerupStarted` and `OnPowerupEnded`.
4. Widget calls `GetActivePowerups` when opened.
5. Widget reads display data from `PowerupDefinition`.
6. Widget calls `GetPowerupRemainingTimeByGroup` for duration display.

No extra UI data struct is needed for now.

## Future Manual Activation Plan

Manual activation is not part of the current build, but the system should support it later.

Future approach:

- Add `AddToInventory` to `E_PowerupGrantMode`.
- Add `HeldPowerups` to `AC_PowerupManager`.
- Store picked up but unused power-ups there.
- Add `UseHeldPowerupByID`.
- Add `ActivateUnlockedPowerup` for permanent unlocks.
- Route both functions into the existing `ActivatePowerup` flow.

This keeps manual activation inside the same manager instead of creating a second system.

Suggested future states:

| State | Meaning |
| --- | --- |
| Unlocked | The player owns the power-up |
| Held | The player has picked it up but has not used it yet |
| Active | The power-up is currently running |
| Disabled | The level or gameplay state blocks this group |

## Blueprint Tutorial

### Goal

Create a modular Size Shift power-up that is granted by a pickup, added as a runtime component, runs for a duration, and resets when finished.

### Before You Start

Create or confirm these assets exist:

- `AC_PowerupManager`
- `AC_PowerupBase`
- `BPI_PowerupEffect`
- `PDA_PowerupDefinition`
- `Struct_PowerupGrantSettings`
- `Struct_ActivePowerup`
- `BP_PowerupPickup`
- Player character Blueprint

### Step 1, Create Size Shift Enums

Create `E_SizeShiftMode`.

Values:

- BigOnly
- SmallOnly
- BigAndSmall

Create `E_SizeShiftTarget`.

Values:

- Normal
- Big
- Small

### Step 2, Create Size Shift Data

Create `PDA_PowerupDefinition_SizeShift` as a child of `PDA_PowerupDefinition`.

Add:

- `SizeShiftMode`
- `DefaultSizeTarget`
- `BigScale`
- `SmallScale`
- `TransitionSpeed`
- `bResetScaleOnEnd`

### Step 3, Create Size Shift Component

Create `AC_Powerup_SizeShift` as a child of `AC_PowerupBase`.

Add:

- `OriginalScale`
- `CurrentSizeTarget`
- `SizeShiftData`
- `bHasSavedOriginalScale`

Implement the interface start logic:

1. Cast `PowerupDefinition` to `PDA_PowerupDefinition_SizeShift`.
2. Save original owner scale.
3. Apply `BigScale` or `SmallScale` based on `DefaultSizeTarget`.

Implement the stop logic:

1. If `bResetScaleOnEnd` is true, call `ReturnToNormal`.
2. Set `bPowerupActive` false.

### Step 4, Create Big Mode Data Asset

Create `DA_Powerup_Big` from `PDA_PowerupDefinition_SizeShift`.

Set:

- `PowerupID = BigMode`
- `PowerupGroup = SizeShift`
- `PowerupName = Big Mode`
- `EffectComponentClass = AC_Powerup_SizeShift`
- `DefaultDuration = 10`
- `DefaultGrantMode = Timed`
- `DefaultComponentLifetime = ActiveOnly`
- `SizeShiftMode = BigOnly`
- `DefaultSizeTarget = Big`
- `BigScale = 2, 2, 2`
- `bResetScaleOnEnd = true`

### Step 5, Create The Pickup

Create `BP_PowerupPickup`.

Components:

- Scene root
- Static mesh
- Sphere collision

Add:

- `GrantSettings`, `Struct_PowerupGrantSettings`
- `bDestroyOnPickup`, Boolean

Overlap flow:

1. Get `AC_PowerupManager` from the overlapping actor.
2. Call `ApplyPowerupGrant`.
3. Pass `GrantSettings`.
4. If success and `bDestroyOnPickup` is true, destroy the pickup.

### Step 6, Test

1. Add only `AC_PowerupManager` to the player.
2. Place `BP_PowerupPickup` in the level.
3. Set the pickup grant settings to use `DA_Powerup_Big`.
4. Press Play.
5. Collect the pickup.
6. Confirm the manager adds `AC_Powerup_SizeShift` at runtime.
7. Confirm the player becomes big.
8. Confirm the timer expires.
9. Confirm the player returns to normal.
10. Confirm the component is removed when the effect ends.

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Power-Up Manager On Player

Image slot: `AC_PowerupManager` on the player Blueprint.

### Power-Up Base Component

Image slot: `AC_PowerupBase` variables and interface setup.

### Power-Up Definition Data Asset

Image slot: base `PDA_PowerupDefinition` variable list.

### Size Shift Data Asset

Image slot: `PDA_PowerupDefinition_SizeShift` child asset values.

### Big Mode Data Asset

Image slot: `DA_Powerup_Big` setup.

### Power-Up Pickup Setup

Image slot: `BP_PowerupPickup` grant settings.

### Runtime Component Test

Image slot: player with runtime `AC_Powerup_SizeShift` added during play.

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### AC_PowerupManager, ApplyPowerupGrant

```text title="AC_PowerupManager ApplyPowerupGrant Nodes"
Paste exported Blueprint node code here.
```

### AC_PowerupManager, ActivatePowerup

```text title="AC_PowerupManager ActivatePowerup Nodes"
Paste exported Blueprint node code here.
```

### AC_PowerupManager, FindOrCreatePowerupComponent

```text title="AC_PowerupManager FindOrCreatePowerupComponent Nodes"
Paste exported Blueprint node code here.
```

### AC_PowerupManager, EndPowerupByGroup

```text title="AC_PowerupManager EndPowerupByGroup Nodes"
Paste exported Blueprint node code here.
```

### AC_PowerupBase, Lifetime Timer

```text title="AC_PowerupBase Lifetime Timer Nodes"
Paste exported Blueprint node code here.
```

### AC_Powerup_SizeShift, StartPowerup

```text title="AC_Powerup_SizeShift StartPowerup Nodes"
Paste exported Blueprint node code here.
```

### AC_Powerup_SizeShift, StopPowerup

```text title="AC_Powerup_SizeShift StopPowerup Nodes"
Paste exported Blueprint node code here.
```

### BP_PowerupPickup, Overlap Logic

```text title="BP_PowerupPickup Overlap Logic Nodes"
Paste exported Blueprint node code here.
```

## Common Issues

### Power-Up Does Not Activate

Check that the pickup overlap is firing.

Then check the overlapping actor has `AC_PowerupManager`.

### Effect Component Does Not Spawn

Check `EffectComponentClass` on the data asset.

It must be a class reference to a child of `AC_PowerupBase`.

### Interface Call Targets Self

Call interface messages on the stored `EffectComponent`, not on `AC_PowerupManager`.

The manager starts and stops the effect component. It is not the effect component.

### Timer Does Not End The Power-Up

Check this order inside `ActivatePowerup`:

1. Create or find the component.
2. Start the effect.
3. Add the active struct to `ActivePowerups`.
4. Start the lifetime timer.

If the timer starts before the map is updated, `EndPowerupByGroup` may not find the group.

### Timer Never Fires

Check `HandleLifetimeExpired` has no inputs and no outputs.

Also check the timer is started on the effect component, not the manager.

### Player Does Not Return To Normal Scale

Check `bResetScaleOnEnd` on the Size Shift data asset.

Also check `OriginalScale` is saved before applying the new scale.

### Big And Small Stack Incorrectly

Check both data assets use:

```text
PowerupGroup = SizeShift
```

The manager replaces active power-ups that share the same group.

### UI Does Not Update

Check the UI binds to `OnPowerupStarted` and `OnPowerupEnded`.

Also call `GetActivePowerups` when the widget opens.

## Extension Notes

- Add VFX and SFX later after the core logic is stable
- Add manual activation later through held power-ups
- Add save support for permanent unlocks
- Add level cleanup for `LevelTemporary` grants
- Add disabled group support for level rules, such as Flame being blocked underwater
- Add more child data assets for Flame, Magnet, Speed, and Invincibility
- Keep the manager generic and avoid power-up-specific casts inside it

## Testing Checklist

- Player has `AC_PowerupManager`
- Player does not manually include `AC_Powerup_SizeShift`
- Pickup calls `ApplyPowerupGrant`
- Data asset has a valid `EffectComponentClass`
- Manager adds the effect component at runtime
- Interface start call fires on the effect component
- Big Mode changes player scale
- Active power-up is stored using `PowerupGroup`
- Timer expires correctly
- `EndPowerupByGroup` finds the active group
- Interface stop call fires on the effect component
- Player scale returns to normal
- Manager destroys ActiveOnly components it created
- Big and Small replace each other through the `SizeShift` group
- UI can read active power-ups through manager helper functions