rm -rf .git
echo node_modules/ > .gitignore
git init
git add .
git commit -m "Initial clean commit without node_modules"
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
