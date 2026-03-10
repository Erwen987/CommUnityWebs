# How to Push CommUnity Web App to GitHub

## Problem
You're getting the error: `git: The term 'git' is not recognized`

This means Git is not installed on your Windows system.

## Solution: Install Git First

### Step 1: Install Git for Windows

1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Use default settings (just keep clicking "Next")
4. **IMPORTANT**: After installation, close and reopen VS Code

### Step 2: Verify Git is Installed

Open a new terminal in VS Code and run:
```bash
git --version
```

You should see something like: `git version 2.x.x`

## Method 1: Using VS Code UI (Easiest)

1. In VS Code, click the Source Control icon (left sidebar, looks like a branch)
2. Click "Initialize Repository" button
3. Click "Publish to GitHub" button
4. VS Code will ask you to sign in to GitHub
5. Choose a repository name (e.g., "CommUnity-Web")
6. Select "Public" or "Private"
7. Click "Publish"

Done! VS Code handles everything automatically.

## Method 2: Using Terminal Commands

### Step 1: Navigate to Your Project
```bash
cd c:/Users/Jv/Downloads/CommUnity-main/CommUnity-main/frontend
```

### Step 2: Initialize Git Repository
```bash
git init
```

### Step 3: Add All Files
```bash
git add .
```

### Step 4: Create First Commit
```bash
git commit -m "Initial commit - CommUnity web app"
```

### Step 5: Set Branch to Main
```bash
git branch -M main
```

### Step 6: Add GitHub Remote
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/CommUnity-Web.git
```

### Step 7: Push to GitHub

If the remote repository is empty:
```bash
git push -u origin main
```

If the remote repository already has content:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Important Notes

### Files That Won't Be Pushed (Protected by .gitignore)
- `node_modules/` - Dependencies (too large)
- `.env` files - Contains sensitive keys
- Build files
- Log files

### Your Supabase Keys
Your Supabase URL and anon key are currently hardcoded in `supabaseClient.js`. 

**For better security**, you should:
1. Create a `.env` file in the frontend folder
2. Move the keys there
3. Update `supabaseClient.js` to use environment variables

But for now, the anon key is safe to commit (it's meant to be public).

## Troubleshooting

### Error: "src refspec master does not match any"
- Use `main` instead of `master`
- Run: `git branch -M main`

### Error: "failed to push some refs"
- The remote repository has content
- Run: `git pull origin main --allow-unrelated-histories`
- Then: `git push -u origin main`

### Error: "git not recognized"
- Git is not installed
- Install from: https://git-scm.com/download/win
- Restart VS Code after installation

## Quick Reference

```bash
# Check Git status
git status

# Add specific files
git add filename.js

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push changes
git push

# Pull latest changes
git pull

# View commit history
git log --oneline
```

## Next Steps After Pushing

1. Go to your GitHub repository
2. Add a README.md with project description
3. Add collaborators if needed
4. Set up GitHub Pages if you want to host it online
5. Create a `.env.example` file showing what environment variables are needed

## Need Help?

If you still have issues:
1. Make sure Git is installed: `git --version`
2. Make sure you're in the right folder: `pwd`
3. Check if you're signed in to GitHub in VS Code
4. Try the VS Code UI method (Method 1) - it's easier!
