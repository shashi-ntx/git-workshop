# Git for UX Designers — Must-Know Concepts

**Audience:** UX designers with zero Git knowledge  
**Duration:** 1.5 hours  
**Goal of this doc:** The concepts they _must_ leave with, how to explain them, and how to present them. Hands-on labs and slides come later.

This is a facilitator guide. Teach the mental model first. Commands are optional. The UI (GitHub Desktop or VS Code Source Control) is the primary tool.

---

## What success looks like

By the end of 90 minutes, every designer should be able to:

1. Explain Git vs GitHub in one sentence each.
2. Explain a commit as a named snapshot (not “saving”).
3. Explain a branch as a safe parallel copy of the work.
4. Do the daily loop once: clone → branch → edit → commit → push → open a pull request.
5. Know what to do when something looks scary (stop, don’t panic, ask / look at the cheatsheet).

If they can do those five things, the workshop succeeded. Everything else is bonus.

---

## Teaching stance

| Do                                             | Don’t                                        |
| ---------------------------------------------- | -------------------------------------------- |
| Use Figma, Google Docs, and folder analogies   | Start with the terminal                      |
| Show pictures of the same idea three times     | Dump a command list                          |
| Let them click through GitHub Desktop          | Assume they know “repo”, “HEAD”, or “remote” |
| Repeat the daily loop until it feels boring    | Cover rebase, stash, cherry-pick, force push |
| Normalize “I broke it” as a normal Git feeling | Let anyone feel stupid for asking            |

**Primary tool:** GitHub Desktop (visual, click-based).  
**Backup:** VS Code Source Control panel.  
**Avoid as the main path:** raw `git` commands. Show 1–2 commands only so they recognize what engineers say.

---

## The 7 must-know concepts

Teach these in this order. Each concept has: what it is, the designer analogy, what to say out loud, and how to present it.

### 1. Why Git exists (and why designers should care)

**What it is**  
Git is version history for files in a project — especially code, but also tokens, docs, and sometimes design-system files.

**Why designers care**

- Engineers live in Git. Designers who can read a PR, leave a comment, and ship a small change (copy, token, README, icon) collaborate faster.
- Design systems, tokens, and UI kits often live in the same repo as the product.
- “Can you push that?” and “open a PR” stop being mysterious.

**Analogy**  
Figma version history, but for a whole project folder, with names, authors, and a way to propose a change instead of overwriting the file.

**What to say**

> Git does not replace Figma. It is how the _built product_ is versioned. When your design becomes code, Git is the shared history of that code.

**How to present (3 min)**

- Show Figma’s version history next to GitHub’s commit list. Same idea: named moments in time.
- Show one real example from your team: a PR that changed a button label, a color token, or an icon. “This is a design change that lived in Git.”
- Ask: “Who has lost work because someone overwrote a file?” That is the problem Git solves.

**Do not cover yet:** distributed systems, hashing, how Git stores objects.

---

### 2. Git vs GitHub

This is the #1 confusion. Spend time here.

**What it is**

| Word                  | Meaning                                   | Analogy                                    |
| --------------------- | ----------------------------------------- | ------------------------------------------ |
| **Git**               | The version-control tool on your computer | Figma the app                              |
| **GitHub**            | The website where the shared copy lives   | Figma cloud / the file in the team library |
| **Repository (repo)** | One project’s folder + its entire history | One Figma file (plus all its versions)     |

Git can work with no internet. GitHub is the shared place the team agrees to use. (GitLab / Bitbucket are other “places.” Same idea.)

**What to say**

> Git is the camera. GitHub is the photo album in the cloud. A repo is one album.

**How to present (5 min)**

- Draw three boxes on a whiteboard:

  ```
  Your laptop          GitHub.com           Teammate's laptop
  (local copy)   ←→    (shared copy)   ←→   (their copy)
  ```

- Open github.com on a projector. Point at: repository name, files, commit history, Pull requests tab.
- Hold up: “If someone says ‘it’s in Git’, they usually mean ‘it’s in the GitHub repo’.”

**Check for understanding**  
“Is GitHub the same as Git?” Wait until someone says no, and can say why.

---

### 3. Local vs remote (two copies)

**What it is**  
There is a copy on GitHub (remote) and a copy on your machine (local). They are not magically in sync. You choose when to send and receive.

**Analogy**

- Google Docs: always in sync. Git is **not** Google Docs.
- Closer to: downloading a Figma file, editing locally, then publishing back to the team library.
- Or: Dropbox, but you decide when to upload (`push`) and download (`pull`).

**Key words**

| Word      | Meaning                               | Figma-ish                      |
| --------- | ------------------------------------- | ------------------------------ |
| **Clone** | First-time download of the whole repo | “Get a local copy of the file” |
| **Pull**  | Get latest changes from GitHub        | “Refresh / get updates”        |
| **Push**  | Send your commits to GitHub           | “Publish your version”         |

**What to say**

> Until you push, your work exists only on your laptop. Until you pull, you might be looking at yesterday’s project.

**How to present (5 min)**

- Live demo: clone a tiny workshop repo with GitHub Desktop. Point at the folder on disk. Then point at the same files on GitHub. Two copies.
- Change a file locally. Refresh GitHub. Nothing changed there. “See? Not Google Docs.”
- Then push. Refresh GitHub. Now it matches.

This demo is worth repeating. It is the entire mental model.

---

### 4. A commit is a snapshot, not a save

This is the heart of Git.

**What it is**  
A **commit** is a named snapshot of the project at one moment: who, when, and a short message explaining _why_.

Saving a file (Cmd+S) is not a commit. You can save 50 times and still have zero commits.

**The three places files live** (keep this visual, always)

```
1. Working folder     2. Staging area        3. Commit history
   (your files)          (what you've            (saved snapshots)
                          chosen to include)
```

Designer analogy for those three:

1. **Working folder** — the artboard you are editing.
2. **Staging** — you selected which layers go into this version. (`git add` = “include these files.”)
3. **Commit** — you named the version and locked it. (`git commit`)

**What to say**

> Cmd+S saves the file. A commit saves a _checkpoint of the project_ that you can come back to. Stage = choose what is in this checkpoint. Commit = take the photo.

**Commit message rule (keep it tiny)**  
Write what a teammate would need: `Fix primary button label on empty state` not `updates` or `asdf`.

**How to present (8 min)**

- In GitHub Desktop: edit a file → show it under “Changes” → check the box (stage) → type a message → Commit.
- Show the History tab: that line is the snapshot.
- Bad vs good messages on a slide (3 examples). Let them roast the bad ones.
- Optional: compare to naming a Figma version “Final_FINAL_v3” vs “Empty state — corrected CTA.”

**Do not cover:** amend, commit --amend, SHA internals. Mention “every commit has an ID” only if someone asks.

---

### 5. A branch is a safe parallel copy

**What it is**  
A **branch** is a line of work. `main` (sometimes `master`) is the shared, trusted line. You make a new branch so your experiment does not land on `main` until the team agrees.

**Analogy**

- Duplicate a Figma page / file to try a layout. The original stays. If the experiment is good, you bring it back.
- Not a separate repo. Same project, different timeline.

**What to say**

> Never edit `main` directly. Branch first, like duplicating a frame before you wreck it. `main` is production. Your branch is the draft.

**The picture they need**

```
main:     A --- B --- C
                   \
your-branch:        D --- E    ← you work here
```

Later, D and E can be merged into `main`.

**Branch naming for designers** (give them a recipe)

```
yourname/short-what
```

Examples: `shashi/empty-state-copy`, `priya/update-alert-icon`

**How to present (8 min)**

- In GitHub Desktop: Current branch → New branch → name it together.
- Make a commit on the branch. Switch back to `main`. The change disappears. Switch to the branch. It comes back. **This demo is magic. Do not skip it.**
- Say: “The files on disk change when you switch branches. That is normal. You did not delete your work.”

**Do not cover:** merge vs rebase, detached HEAD, deleting remote branches in depth.

---

### 6. Pull requests are how work gets in

**What it is**  
A **pull request (PR)** is a proposal: “Please take the commits on my branch and put them into `main`.” It is also the conversation: comments, screenshots, review, approve, merge.

**Analogy**  
Design critique / spec review. You don’t overwrite the production file. You present the change, people comment, then it gets accepted.

**The words they will hear**

| Word          | Meaning                                                   |
| ------------- | --------------------------------------------------------- |
| **Open a PR** | Create the proposal on GitHub                             |
| **Review**    | Someone looks at the diff and comments                    |
| **Approve**   | They’re okay merging it                                   |
| **Merge**     | The branch’s commits become part of `main`                |
| **Diff**      | The visual of what changed (red = removed, green = added) |

**What to say**

> A PR is not a technical ritual. It is a review step. For designers: attach a screenshot, write what you changed and why, then ask an engineer or design-system owner to review.

**How to present (8 min)**

- Push the branch (GitHub Desktop: “Publish branch” / “Push origin”).
- Click “Create Pull Request.” Fill: title, 2-sentence description, screenshot.
- Scroll the Files changed tab. Red/green. This is the diff. Designers can review copy and tokens here without running the app.
- Merge on the projector (or leave it open if you want them to merge their own in the lab).

**PR description template to hand them**

```
## What
One sentence: what changed.

## Why
One sentence: why it matters for the user / design.

## Screenshots
Before / after (if visual).
```

---

### 7. Conflicts are two edits to the same place

Keep this conceptual. Do not make them resolve a hairy conflict in the first workshop unless time is leftover.

**What it is**  
Git cannot guess whose change to keep when two people edited the **same lines** of the **same file**. That is a merge conflict. It is not data loss. It is Git asking a human to choose.

**Analogy**  
Two designers edited the same text layer in two copies of a file. When you try to combine them, someone has to pick the final sentence.

**What to say**

> If GitHub or GitHub Desktop says “conflict,” stop. You did not delete the repo. The two versions are both still there. Ask for help the first few times. Later you’ll pick “ours / theirs / mix” in the UI.

**How to present (4 min)**

- One slide with a tiny conflict marker example (so they recognize it), then immediately show GitHub Desktop’s conflict UI or GitHub’s web conflict editor — the friendly view, not the `<<<<<<<` dump as the main path.
- “Prevention: pull before you start, keep branches short, don’t both edit the same token file blindly.”

**Do not cover:** resolving via rebase, mergetool config.

---

## The one loop they must memorize

Write this on a poster / last slide / handout. Repeat it until they can recite it.

```
1. Pull          → get the latest main
2. Branch        → new branch from main
3. Edit          → change files (or paste an asset)
4. Commit        → snapshot with a real message
5. Push          → send the branch to GitHub
6. Pull request  → ask for review, then merge
```

If they remember only this, the workshop worked.

---

## Words they will hear (pocket glossary)

Print this. One page.

| They hear         | It means                                                          |
| ----------------- | ----------------------------------------------------------------- |
| repo              | the project                                                       |
| clone             | first download                                                    |
| origin            | the GitHub copy (the usual remote name)                           |
| main              | the trusted shared branch                                         |
| branch            | a draft line of work                                              |
| commit            | a named snapshot                                                  |
| stage / add       | pick files for the next snapshot                                  |
| push              | upload commits                                                    |
| pull              | download new commits                                              |
| fetch             | check what’s new, without applying it yet (mention only if asked) |
| PR / pull request | “please merge my branch”                                          |
| merge             | combine that branch into another                                  |
| diff              | what changed                                                      |
| conflict          | two edits, Git needs a human                                      |
| checkout / switch | move to a different branch                                        |

---

## What this 90-minute workshop will not cover

Say this out loud so they don’t worry they’re missing “real Git.”

- Terminal fluency
- Rebase, squash, cherry-pick, stash, tags, hooks
- Force push, rewriting history
- Git internals (blobs, trees, hashes)
- Git LFS / huge design files as a deep topic
- Forks (unless your org actually uses forks — most product teams do not)

**Parking lot:** “We’ll do a part 2 for conflicts, reviews, and design-system workflows.”

---

## 90-minute run of show

Assumes GitHub Desktop is pre-installed, they have a GitHub account, and they can access a tiny workshop repo.

| Time      | Block                      | What you do                                                                    |
| --------- | -------------------------- | ------------------------------------------------------------------------------ |
| 0:00–0:08 | Welcome + why this matters | Figma history vs GitHub history. One real PR from your team. Success criteria. |
| 0:08–0:18 | Concepts 1–3               | Git vs GitHub. Local vs remote. Clone demo. “Not Google Docs.”                 |
| 0:18–0:30 | Concepts 4–5               | Commit = snapshot. Stage vs save. Branch demo (switch branches, files change). |
| 0:30–0:50 | Lab 1 — the loop           | They clone, branch, edit a file, commit. You walk the room.                    |
| 0:50–0:55 | Break / catch-up           | Water. Help the stuck people. Do not introduce new concepts.                   |
| 0:55–1:08 | Concept 6                  | Push, open PR, read a diff, merge. Screenshot in the PR.                       |
| 1:08–1:22 | Lab 2 — ship it            | They push, open a PR, comment on a neighbor’s PR.                              |
| 1:22–1:28 | Concept 7 + fear reduction | Conflicts at a high level. “Stop and ask.” Common error translations.          |
| 1:28–1:30 | Recap + take-home          | The 6-step loop. Glossary. Where to ask for help.                              |

If the room is slower, **cut Lab 2 comments** and **cut Concept 7** to 2 minutes. Protect Lab 1. Doing the loop once with their own hands beats a perfect lecture.

---

## How to present (ideas that work for this audience)

### Visual first, always

- Whiteboard the three-box diagram (laptop / GitHub / teammate) and leave it up the whole time.
- Whiteboard the three-places diagram (working folder / staging / history) next to it.
- Use GitHub Desktop on the projector, not a terminal window, as the default view.
- Zoom in. Pointer. Narrate every click: “I am looking at Changes. This file is yellow because I edited it.”

### Analogies that land (and ones that lie)

| Use                            | Why it works         | Where it breaks — say this                                        |
| ------------------------------ | -------------------- | ----------------------------------------------------------------- |
| Figma version history          | Snapshots with names | Git versions the _whole project_, not one frame                   |
| Duplicate a file to experiment | Branches             | Switching branches changes files on disk                          |
| Design critique                | Pull requests        | Merge actually changes the shared copy                            |
| Dropbox with a Publish button  | Push / pull          | Nothing syncs until you click                                     |
| Google Docs                    | —                    | **Do not use as the main analogy.** Git is not live-collaborative |

### Make it a design problem, not a CS class

- The lab file should be something they care about: `EMPTY-STATE.md` copy, a color token JSON, an SVG icon, a screenshot folder. Not `foo.txt`.
- Review a **diff of copy** and a **diff of a token**. “You can review this without running the product.”
- Invite them to comment on PRs the way they comment in Figma: be specific, attach a screenshot.

### Room setup

- Tables of 2–3. Pair a more technical designer with a less technical one if you can.
- One “helper” floating (an engineer or a designer who already uses Git).
- A shared Slack/Teams thread: paste the repo URL, the branch naming recipe, the PR template.
- Pre-flight 24 hours before: GitHub account, GitHub Desktop installed, access to the org/repo. The workshop dies on account issues.

### Demo repo (prepare before the session)

Keep it tiny:

- `README.md` — what this workshop is
- `copy/empty-state.md` — placeholder copy they will edit
- `tokens/color.json` — one color they might change
- `CONTRIBUTING.md` — the 6-step loop in their language

Protect `main`. They only open PRs. You merge (or they merge if permissions allow).

### Handling the scared questions

| They say                                         | You say                                                           |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| “Will I break production?”                       | “Not if you never commit to `main`. Branch + PR is the seatbelt.” |
| “I don’t understand the terminal.”               | “You don’t need it today. Click in GitHub Desktop.”               |
| “It says conflict / rejected / diverged.”        | “Stop. Don’t click random buttons. We’ll look together.”          |
| “Where did my files go?”                         | “You switched branches. Switch back. They’re there.”              |
| “What’s the difference between save and commit?” | Redo the three-places diagram.                                    |

### Energy and pacing

- Live demos: you click, they watch, then they do the same click. Never demo three steps ahead of them.
- After every concept, 30-second “turn to your neighbor and explain it.”
- Celebrate the first PR on the projector. Clap. It sounds silly. It works.

### Optional props

- Physical sticky notes = commits. A stack of stickies = a branch. Two stacks merging = PR.
- A printed “panic card” on each table: the 6-step loop + “if you see conflict, stop.”

---

## Suggested slide skeleton (keep under 20 slides)

1. Title: Git for UX designers — you will open a PR today
2. What you will be able to do in 90 minutes (the 5 success bullets)
3. Git is Figma history for the whole project
4. Git vs GitHub vs repo
5. Two copies: local and remote
6. Clone / pull / push
7. Save ≠ commit
8. Three places: working / staging / history
9. Anatomy of a good commit message
10. Branch = duplicate to experiment; don’t edit `main`
11. The 6-step loop (poster slide — leave it up)
12. Lab 1 instructions
13. What a PR is (critique, not a ritual)
14. How to read a diff (red / green)
15. PR template
16. Lab 2 instructions
17. Conflicts: Git is asking, not deleting
18. Glossary
19. What we skipped (and that’s OK)
20. Where to get help this week

---

## Pre-work for attendees (send 2 days before)

Keep it under 15 minutes or people skip it.

1. Create / confirm a GitHub account.
2. Install [GitHub Desktop](https://desktop.github.com/).
3. Sign in to GitHub Desktop.
4. Join the workshop repo (you add them, or they accept an invite).
5. Optional: watch a 3-minute “Git vs GitHub” clip if you have an internal one.

Do **not** ask them to learn commands as pre-work.

---

## Facilitator checklist

**A week before**

- [ ] Tiny workshop repo created, `main` protected
- [ ] GitHub Desktop verified on a designer laptop (not only yours)
- [ ] Attendee list added to the repo / org
- [ ] Helper recruited
- [ ] Real example PR picked (copy or token)

**Day before**

- [ ] Access confirmed (the usual failure)
- [ ] Projector + zoom + GitHub Desktop font size large
- [ ] Printed glossary + 6-step loop
- [ ] Lab instructions in Slack

**Day of**

- [ ] Clone the repo yourself from scratch once (catch surprises)
- [ ] Whiteboard diagrams drawn before people sit
- [ ] Parking lot sticky for advanced questions

---

## Next (after this doc)

Once this concept set feels right, we can add:

1. Slide copy / speaker notes
2. Lab 1 and Lab 2 step-by-step (GitHub Desktop clicks)
3. One-page handout (glossary + loop)
4. Optional part-2 outline: reviewing PRs, tokens, conflicts, talking to engineers

Do not expand Part 1 beyond these 7 concepts. Depth beats coverage.
