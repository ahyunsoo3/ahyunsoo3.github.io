---
title: ""
permalink: /projects/igm
author_profile: false
redirect_from:
  # - /about/
---

[A Solo-Developed 2D Idle Game Using the MapleStory IP]
======
Built on MapleStory Worlds, this 2D idle RPG was developed entirely by me. The game has attracted 7,800+ players, demonstrating strong engagement within the MapleStory Worlds platform. 

- It was also funded with ₩50,000,000 KRW (~$38,000 USD) by Nexon Korea.
- [Play the game](https://maplestoryworlds.nexon.com/en/play/cb9b0af77d444856a150cd4c876e0e01/)


Database Architecture Overview
------
**1. User Authentication**
- When a player enters the world, the server verifies legitimacy.
- Illegitimate users are automatically restricted from accessing the game for a predetermined duration.

**2. Character Slot Structure**
- Each account can have up to 10 characters.
- These characters are stored using a structure similar to a table + list hybrid (not a true 2D list, but effectively functioning as one).

**3. Character Access Flow**
- When the player double-clicks a character slot, the system validates ownership and grants access to the chosen character.

Key Feature: Union Ability System
------
The Union Ability system allows players to gain additional stat bonuses if the combined level of all their characters exceeds 1,000.
- **How It Works?** : Each time a user enters the world, the server retrieves all character levels, computes the total combined level, and applies corresponding Union stat bonuses to the selected character if the threshold is met.
