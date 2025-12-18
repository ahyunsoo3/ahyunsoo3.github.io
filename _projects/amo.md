---
title: ""
permalink: /projects/amo
author_profile: false
redirect_from:
  # - /about/
---


[AI Mathematical Olympiad]
======
Employing innovative algorithms and sophisticated models to tackle Olympiad-level mathematical problems under predefined limitations.

Methods Applied to Improve LLM Performance Under Time-Constrained Problem Solving
------
The following strategies were implemented to maximize reasoning accuracy and efficiency when solving Olympiad-style problems under a strict 9-hour runtime limit.

**1. Loop Optimization Under Time Budget**<br>
Due to time constraints, each problem is assigned a predetermined number of answer loops to ensure full dataset coverage. Although higher loop counts improve stability, consistency, and accuracy, they reduce the time available for other problems. Therefore, determining an optimal loop count is essential. Empirical testing across loop counts from 7 to 21 showed that 14–16 loops provide the strongest balance between accuracy and full problem completion.

**2. Dynamic Loop Adjustment Based on Problem Length**<br>
Analysis of the datasets showed that LLMs’ reasoning ability degrades sharply as the textual length of Olympiad-style problems increases, reflecting limitations in context handling and logical integration, which motivates the use of a dertministic loop to improve model stability.

**3. Early Convergence Detection for Efficient Resource Allocation**<br>
If the model produced identical outputs across the initial reasoning loops, the problem was marked as low difficulty and the remaining loops were skipped, allowing the stable early answer to be accepted immediately and freeing computation time for more difficult problems, while loop counts were adaptively adjusted based on sequence length and complexity to ensure longer or more complex problems received additional iterations without exceeding time limits.

- If the first four loops produced the same answer, the problem was treated as solved, the answer was accepted immediately, and the remaining loop budget was reallocated to harder problems.

<br>

[Code](https://www.kaggle.com/code/hyunsoolee1010/piidd-inftest)