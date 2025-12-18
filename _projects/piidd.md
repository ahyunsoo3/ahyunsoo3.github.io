---
title: ""
permalink: /projects/piidd
author_profile: false
redirect_from:
  # - /about/
---

[Personal Identifiable Information Data Detection]
======
This work focuses on identifying text that contains Personally Identifiable Information (PII), including names, addresses, and contact numbers, within specific documents, thereby contributing to the protection of sensitive personal data.

Effective Methods
------
**1. Stride Adjustment**<br>
When the stride was configured so that it preserved the contextual continuity of the original document, performance consistently improved compared to using no stride. The optimal stride range was identified as 256–1024 tokens, with further tuning required based on the length of each document. This result suggests that the amount of context the model processes in a single pass significantly influences performance, indicating that the model benefits from understanding larger contextual segments rather than processing inputs strictly in a one-by-one manner.

**2. Combining Warm-up and Cosine Scheduling**<br>
Using a combination of warm-up and cosine learning rate scheduling resulted in more stable training and improved early-stage performance. This suggests that dynamic learning rate adjustment is more effective than fixed learning rates and may help guide the optimization process toward better local optima and improved global convergence.

**3. Using Stopwords to Guide Detection**<br>
By applying stopwords to prevent detection of specific terms, the model produced more accurate and filtered detection results, reducing noise.

Ineffective Methods
------
**1. Synthetic PII Injection Using Faker**<Br>
Synthetic PII augmentation was performed using Faker. While cross-validation indicated potential benefits, these gains did not generalize to unseen data. This suggests that distributional mismatches in writing style and vocabulary between synthetic and real data can adversely affect model performance.

**2. Freezing Selected Layers During Training**<br>
Freezing certain layers and continuing training did not lead to any meaningful performance improvements.

**3. Data Selection Using Cosine Similarity**<Br>
Cosine similarity was used as a criterion for data selection to improve dataset quality. Nevertheless, the reduced size of the resulting dataset adversely affected model performance. This finding indicates that data quality enhancements cannot fully compensate for insufficient data quantity, underscoring the necessity of adequate training data volume for robust learning.


**4. Applying Dropout to Hidden and Embedding Layers**<br>
Adding dropout to the hidden and embedding layers had minimal impact on performance, suggesting that these layers are less influential than other components of the model for this task.
<br>

[Code](https://www.kaggle.com/code/hyunsoolee1010/piidd-inftest)<br>
[Review](https://www.kaggle.com/competitions/pii-detection-removal-from-educational-data/discussion/497181)