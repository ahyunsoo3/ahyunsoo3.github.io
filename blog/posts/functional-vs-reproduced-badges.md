The key is that **Functional evaluates the artifact itself**, while **Reproduced evaluates the paper's scientific claims**.

Think of the artifact as a *tool* and the paper as a *scientific argument*.

| Badge      | What reviewers are testing | Main question                                     |
| ---------- | -------------------------- | ------------------------------------------------- |
| Functional | The software/data/package  | "Does this thing work?"                           |
| Reproduced | The paper's results        | "Can this thing support the paper's conclusions?" |

## What reviewers do for Functional

Suppose a paper presents a new machine learning training framework.

Reviewers might:

1. Download the code.
2. Install dependencies.
3. Follow the README.
4. Run example commands.
5. Verify the outputs are sensible.
6. Check that scripts don't crash.

They are **not necessarily checking whether the published numbers are correct**.

For example:

```bash
python train.py --dataset mnist
```

runs successfully and produces:

```
Accuracy: 98.1%
```

The artifact works.

→ Functional.

But reviewers have not yet checked whether the paper's Table 3, Figure 5, and main claims can be recreated.

---

## What reviewers do for Reproduced

Now they try to validate the research.

The paper claims:

> Our method achieves 30% lower latency than prior work.

Reviewers:

1. Run the provided benchmark.
2. Configure the environment as described.
3. Execute experiments.
4. Collect measurements.
5. Compare against the paper.

Suppose the paper reports:

| System   | Latency |
| -------- | ------- |
| Baseline | 100 ms  |
| Ours     | 70 ms   |

The reviewers obtain:

| System   | Latency |
| -------- | ------- |
| Baseline | 102 ms  |
| Ours     | 72 ms   |

Not identical, but close enough that the claim holds.

→ Reproduced.

---

## Why Functional does NOT imply Reproduced

Many artifacts work perfectly but do not reproduce the paper.

### Case 1: Missing data

The code runs.

```bash
python experiment.py
```

But the dataset used in the paper isn't available.

Reviewers can verify the software works.

They cannot verify the published results.

→ Functional, not Reproduced.

---

### Case 2: Requires huge resources

The paper's results were obtained on:

* 256 GPUs
* 2 weeks of computation

Reviewers only have:

* 4 GPUs
* limited time

They can run toy examples and confirm functionality.

They cannot reproduce the actual experiments.

→ Functional, not Reproduced.

---

### Case 3: Results don't match

Everything installs and runs.

However:

Paper:

```
99.5% accuracy
```

Reviewer gets:

```
92.1% accuracy
```

The artifact clearly works.

But the paper's result is not reproduced.

→ Functional, not Reproduced.

---

## Why Reproduced almost always implies Functional

To reproduce results, the artifact must usually work first.

You can't reproduce experiments if:

* code doesn't run,
* scripts fail,
* data loaders crash.

So conceptually:

```
Available
    ↓
Functional
    ↓
Reproduced
```

Each badge is stronger than the previous one.

---

## A systems-paper example

Imagine a USENIX Security paper introducing a new fuzzing tool.

### Available

Authors publish:

* source code
* scripts
* documentation

Reviewers can access it.

---

### Functional

Reviewers:

```bash
./fuzzer test_program
```

The fuzzer finds crashes as described.

Everything works.

---

### Reproduced

The paper claims:

> We found 57 previously unknown vulnerabilities.

Reviewers rerun the evaluation.

They find approximately the same vulnerabilities and performance numbers reported in the paper.

Now the paper's evidence has been independently confirmed.

---

## The philosophical difference

A concise way to remember it:

**Functional asks whether the artifact is engineeringly sound.**

**Reproduced asks whether the paper's scientific evidence is trustworthy.**

An artifact can be excellent software yet fail to reproduce the paper's conclusions. That's why conferences like USENIX, ACM, and IEEE separate these badges rather than treating them as the same achievement.
