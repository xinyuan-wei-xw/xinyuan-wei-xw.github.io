import {cpSync,mkdirSync,existsSync,rmSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=resolve(root,'../homepage_Xinyuan');
if(!existsSync(resolve(root,'dist/index.html')))throw new Error('Run npm run build first');
const target=resolve(site,'lab/under-review');
mkdirSync(target,{recursive:true});
// Only this generated game route is replaced; other Lab projects are untouched.
rmSync(resolve(target,'assets'),{recursive:true,force:true});
cpSync(resolve(root,'dist'),target,{recursive:true});
const source=resolve(site,'_tools/under_review');
mkdirSync(source,{recursive:true});
for(const file of ['src','tests','scripts','package.json','package-lock.json','tsconfig.json','vite.config.ts','index.html','README.md','SPECIFICATION.md','REVIEW_SOURCES.md','.gitignore']){
 cpSync(resolve(root,file),resolve(source,file),{recursive:true});
}
console.log('Staged game build and source archive in homepage_Xinyuan.');
