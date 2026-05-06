---
title: Collectibles
---

# Collectible System

## Overview

The collectible system provides a data-driven way to define, place, collect, and track pickup items.

Use it for coins, gems, keys, tokens, quest items, or any item that needs to increase a stored amount when collected.

## Core Classes

- `PDA_CollectibleDefinition`
- `BP_BaseCollectible`
- `AC_CollectibleWallet`

## What The System Does

- Stores collectible definitions in data assets
- Lets level designers place collectibles without rebuilding logic
- Sends collected values into the player wallet component
- Supports different collectible types
- Supports variable collectible values
- Can connect to doors, UI, save data, quests, and mascot reactions later

## Setup

1. Add `AC_CollectibleWallet` to the player character.
2. Create a `PDA_CollectibleDefinition`.
3. Set the collectible name, icon, tag, value, and display colour.
4. Place `BP_BaseCollectible` in the level.
5. Assign the collectible data asset.
6. Press Play and overlap the collectible.
7. Check that the wallet amount updates.

## Runtime Flow

1. Player overlaps `BP_BaseCollectible`.
2. The collectible checks it has a valid `PDA_CollectibleDefinition`.
3. The collectible sends the definition and amount to `AC_CollectibleWallet`.
4. The wallet reads the collectible type.
5. The wallet adds the amount to the matching stored total.
6. The collectible hides, destroys itself, or marks itself collected.
7. UI, doors, save logic, and other systems can read the updated wallet value.

## Blueprint Tutorial

### Goal

Create one working collectible pickup that adds value to the player wallet.

### Before You Start

Create or confirm these assets exist:

- `PDA_CollectibleDefinition`
- `BP_BaseCollectible`
- `AC_CollectibleWallet`
- A player character Blueprint

### Step 1, Add The Wallet To The Player

1. Open the player character Blueprint.
2. Add `AC_CollectibleWallet` as an Actor Component.
3. Compile and save.

### Step 2, Create A Collectible Data Asset

1. Right click in the Content Browser.
2. Create a new `PDA_CollectibleDefinition`.
3. Name it something clear, for example `PDA_Gem_Red`.
4. Set the collectible display name.
5. Set the value.
6. Set the icon if the UI uses one.
7. Add gameplay tags if this collectible needs to connect to doors or quests.

### Step 3, Set Up The Collectible Actor

1. Drag `BP_BaseCollectible` into the level.
2. Select the actor.
3. Assign the collectible data asset.
4. Set the amount override only if this pickup needs a custom value.
5. Make sure collision is enabled for overlap.

### Step 4, Add The Collection Logic

Inside `BP_BaseCollectible`, use overlap logic like this:

1. `OnComponentBeginOverlap`
2. Cast or interface check the overlapping actor.
3. Get `AC_CollectibleWallet` from the player.
4. Call the wallet add function.
5. Pass in the collectible definition and amount.
6. Destroy or hide the collectible.

### Step 5, Test The Result

1. Press Play.
2. Walk into the collectible.
3. Confirm the collectible disappears.
4. Print the wallet value to screen or update the HUD.
5. Test another collectible with a different data asset.

## Photo Slots

Use these slots when adding screenshots to the documentation site.

### Collectible Data Asset

Image slot: collectible data asset.

### Collectible Actor In Level

Image slot: collectible actor in level.

### Wallet Component On Player

Image slot: collectible wallet component on player.

### Runtime Test

Image slot: collectible runtime test.

## Injected Blueprint Code Slots

Paste exported Unreal Blueprint node text into these blocks when the Blueprint is final.

### BP_BaseCollectible, Overlap Collection Logic

```text title="BP_BaseCollectible Collection Nodes"
Paste exported Blueprint node code here.
```

### AC_CollectibleWallet, Add Collectible Function

```text title="AC_CollectibleWallet Add Collectible Nodes"
Paste exported Blueprint node code here.
```

### UI Update Test

```text title="Collectible UI Update Nodes"
Paste exported Blueprint node code here.
```

## Extension Notes

- Add `OnCollectibleChanged` to `AC_CollectibleWallet` later for UI, save data, doors, quests, and mascot reactions
- Add collected world state saving for pickups that should not respawn
- Use collectible tags when other systems only need a category instead of a direct data asset reference
- Add VFX and SFX fields to the collectible data asset when polish begins

## Testing Checklist

- Player can collect one pickup
- Wallet amount increases correctly
- Different collectible data assets store separately
- Variable value pickups work
- Door checks can read the wallet value
- UI can display the stored amount
- Save data can restore collected progress later