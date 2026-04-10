---
title: Collectibles
---

# Collectible System

## Overview

The collectible system provides a data-driven way to define, place, and track collectible items.

## Core Classes

- `PDA_CollectibleDefinition`
- `BP_BaseCollectible`
- `AC_CollectibleWallet`

## Setup

1. Add `AC_CollectibleWallet` to the player character.
2. Create a `PDA_CollectibleDefinition`.
3. Place `BP_BaseCollectible` in the level.
4. Assign the collectible data asset.

## Runtime Flow

When the player overlaps the collectible, the collectible passes its data asset to the wallet component. The wallet updates the stored total and can notify the UI.

## Extension Notes

- Supports multiple collectible types
- Supports variable values
- Can be connected to doors