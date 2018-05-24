#! /bin/bash
npm run build;
node bin/initIndex.js;
git add -A;
git commit -m "update";
git push;
npm publish;