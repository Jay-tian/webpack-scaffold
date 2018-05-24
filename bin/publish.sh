#! /bin/bash
npm run build;
md2html 'README.md' > 'README.html';
git commit -am "update";
git push