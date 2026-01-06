# Git Workflow

## 1. Sync your local machine
Before starting anything new, make sure your local main is up to date.

```bash
git switch main
git pull origin main
```

## 2. Start a new task
Create your branch and tell the GitHub repo it exists.

```bash
git switch -c feature/your-feature-name
git push -u origin feature/your-feature-name
```
**Note:** The `-u` only needs to be done once. After that, `git push` and `git pull` will know where to push to/pull from.

## 3. Work and commit
Do this often! Small commits are easier to debug.

```bash
git add .
git commit -m "description"
git pull --rebase   # Sync with teammates working on this same branch
git push            # Send your work to GitHub
```

## 4. Stay updated with the team (integrate main)
If someone else merges unrelated changes into main, you should bring those changes into your branch to ensure your code still works with theirs.

```bash
# Make sure you are on your feature branch (run `git branch` to check)
git pull origin main
# Fix any merge conflicts if they appear
```

## 5. Finish and open a PR
Merge your finished feature branch into the main branch so everyone can use/test it.

1. Integrate changes from main one last time.
2. Ensure your code builds locally!
2. Go to github.com and open a Pull Request.
