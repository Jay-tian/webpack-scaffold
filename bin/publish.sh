#! /bin/bash
npm run build;
node bin/initIndex.js;
git add -A;
git commit -m "更新版本";
git push;
npm publish;