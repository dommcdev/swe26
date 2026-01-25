# Git Workflow

## 1. Sync your local machine
Before starting anything new, make sure your local main is up to date with the remote main

```bash
git switch main
git pull origin main
```

## 2. Start a new task
Create a local branch and tell our GitHub repo it exists.

```bash
git switch -c feature/your-feature-name
git push -u origin feature/your-feature-name
```
**Note:** The `-u` only needs to be done once. After that, `git push` and `git pull` will know where to push to/pull from.

## 3. Work and commit
Do this often! Small commits are easier to debug.

```bash
# Make sure you are on your feature branch (run `git branch` to check)
git add .
git commit -m "description of changes"
git pull --rebase   # Usually optional
git push            # Send your work to your remote branch on GitHub
```

## 4. Stay updated with the team (integrate main branch)
If someone else merges code into main, you will (eventually) need to bring those changes into your branch to ensure you code still works with those changes applied.

```bash
# Pull down the latest changes from remote main
git switch main && git pull

# Bring those changes onto your own branch
git switch your-branch
git rebase main

# Fix any merge conflicts if they appear

git push --force-with-lease
```

```bash
# Alternative advanced method (doesn't update local main)
git switch your-branch && git pull origin main
```

## 5. Finish and open a PR
Merge your finished feature branch into the main branch so everyone can use/test it.

1. Integrate changes from main one last time.
2. Ensure your code builds locally!
2. Go to github.com and open a Pull Request.
