---
title: ""
permalink: /projects/
author_profile: false
redirect_from:
  # - /about/
  # - /about.html
  # - /projects/
  # - /projects.html
---
<!-- About me
======
Looking back, I’ve always disliked repetitive and redundant tasks, which led me to create automation tools in both my development and research work. One key example is [Kaggle's result](https://www.kaggle.com). -->

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

<br><br><br><br><br>


[AI Mathematical Olympiad]
======
Employing innovative algorithms and sophisticated models to tackle Olympiad-level mathematical problems under predefined limitations.

Methods Applied to Improve LLM Performance Under Time-Constrained Problem Solving
------
The following strategies were implemented to maximize reasoning accuracy and efficiency when solving Olympiad-style problems under a strict 9-hour runtime limit.

**1. Loop Optimization Under a Fixed 9-Hour Time Budget**<br>
Due to the fixed 9-hour constraint, each problem must be assigned a predictable number of answer loops to guarantee full dataset coverage; although higher loop counts improve stability, consistency, and accuracy, they reduce time available for other problems, so determining the optimal loop count is essential—empirical testing across loop counts from 7 to 21 showed that 14–16 loops provides the strongest balance between accuracy and full problem completion.

**2. Dynamic Loop Adjustment Based on Problem Length**<br>
Analysis of the datasets showed that LLM reasoning difficulty increases sharply for longer Olympiad-style problems due to expanded context requirements and higher logical complexity.

**3. Early Convergence Detection for Efficient Resource Allocation**<br>
If the model produced identical outputs across the initial reasoning loops, the problem was marked as low difficulty and the remaining loops were skipped, allowing the stable early answer to be accepted immediately and freeing computation time for more difficult problems, while loop counts were adaptively adjusted based on sequence length and complexity to ensure longer or more complex problems received additional iterations without exceeding time limits.

**Strategy**
------
If the first four loops produced the same answer, the problem was treated as solved, the answer was accepted immediately, and the remaining loop budget was reallocated to harder problems.
<br>

[Code](https://www.kaggle.com/code/hyunsoolee1010/piidd-inftest)


<br><br><br><br><br>
 [Personal Identifiable Information Data Detection]
 ======
This work focuses on identifying text that contains Personally Identifiable Information (PII), including names, addresses, and contact numbers, within specific documents, thereby contributing to the protection of sensitive personal data.

Effective Methods
------
**1. Stride Adjustment**<br>
When the stride was set so that it did not disrupt the contextual flow of the original document, it consistently produced better performance compared to using no stride at all. The optimal stride range was found to be 256–1024, with additional tuning required depending on the reading length of each document.

**2. Combining Warm-up and Cosine Scheduling**<br>
Using a mixture of warm-up and cosine scheduling resulted in more stable training and better early-stage performance.

**3. Using Stopwords to Guide Detection**<br>
By applying stopwords to prevent detection of specific terms, the model produced more accurate and filtered detection results, reducing noise.

Methods That Did Not Work Well
------
**1. Synthetic PII Injection Using Faker**<Br>
I injected synthetic PII data into the documents using Faker. Although cross-validation showed promising results, it did not significantly improve performance on the test set. We believe this is because the writing style and key vocabulary of the test set differed from the synthetic data, causing the negative impact.

**2. Freezing Selected Layers During Training**<br>
Freezing certain layers and continuing training did not lead to any meaningful performance improvements.

**3. Data Selection Using Cosine Similarity**<Br>
We attempted to classify and select higher-quality data using cosine similarity. However, due to the insufficient overall dataset size, performance decreased. This shows that even if the filtered data is of higher quality, a lack of sufficient baseline training data can still lead to worse performance.

**4.Applying Dropout to Hidden and Embedding Layers**<br>
Adding dropout to the hidden and embedding layers had minimal impact on performance.
<br>

[Code](https://www.kaggle.com/code/hyunsoolee1010/piidd-inftest)<br>
[Review](https://www.kaggle.com/competitions/pii-detection-removal-from-educational-data/discussion/497181)


<br><br><br><br><br>
[Detect AI Generated Text]
