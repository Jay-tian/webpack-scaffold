#! /bin/bash
npm run build;
md2html 'README.md' > 'README.html';
git add -A;
git commit -m "update";
git push