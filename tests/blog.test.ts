import test from 'node:test';
import assert from 'node:assert/strict';
import { toEditor, editorSchema, validContent, publicationIssues, toDatabase, toLocalDateTime } from '../lib/blog/editor';
import { articleHeadings, plainText, readingTime } from '../lib/blog/presentation';
import { markdownToRichText, richTextToMarkdown } from '../components/admin/markdownConversion';

test('blank drafts are valid but cannot be published',()=>{
 const doc=toEditor(); assert.equal(plainText(doc.content),'');assert.equal(editorSchema.safeParse(doc).success,true);assert.ok(publicationIssues(doc).content);assert.ok(publicationIssues(doc).title);
});
test('SEO overrides, indexing preference and cover metadata survive conversion',()=>{
 const doc={...toEditor(),seoTitle:'A precise engineering guide',seoCanonicalUrl:'https://example.com/original',seoNoIndex:true,seoOgImage:'/cover.png',coverAlt:'Pipe supports on a process skid',coverCaption:'Engineering design review'};
 const row=toDatabase(editorSchema.parse(doc));assert.equal(row.seo_no_index,true);assert.equal(row.seo_title,doc.seoTitle);assert.equal(row.seo_canonical_url,doc.seoCanonicalUrl);assert.equal(row.cover_alt,doc.coverAlt);
});
test('invalid links, images, headings and oversized nesting are rejected',()=>{
 assert.equal(validContent({type:'doc',content:[{type:'text',text:'click',marks:[{type:'link',attrs:{href:'javascript:alert(1)'}}]}]}),false);
 assert.equal(validContent({type:'doc',content:[{type:'image',attrs:{src:'javascript:x'}}]}),false);
 assert.equal(validContent({type:'doc',content:[{type:'heading',attrs:{level:1}}]}),false);
 assert.equal(validContent({type:'doc',content:[{type:'text',text:'safe',marks:[{type:'link',attrs:{href:'/services'}}]}]}),true);
});
test('whitespace, word counts and duplicate heading IDs are consistent',()=>{
 const heading={type:'heading',attrs:{level:2},content:[{type:'text',text:'Design basis'}]};
 assert.deepEqual(articleHeadings({type:'doc',content:[heading,heading]}).map((item)=>item.id),['design-basis','design-basis-2']);
 assert.equal(readingTime({type:'text',text:Array(440).fill('engineering').join('\n')}),2);
 assert.equal(plainText({type:'text',text:'a   b\nc'}),'a b c');
});
test('tables and strikethrough round-trip between visual documents and Markdown',()=>{
 const source='## Design criteria\n\n| Item | Value |\n| --- | --- |\n| Pressure | 10 bar |\n\n~~Superseded~~ **Updated**';
 const doc=markdownToRichText(source);assert.equal(validContent(doc),true);
 const output=richTextToMarkdown(doc);assert.match(output,/\| Pressure \| 10 bar \|/);assert.match(output,/~~Superseded~~/);
 assert.deepEqual(markdownToRichText(output),doc);
});
test('publication requires cover and inline image descriptions',()=>{
 const doc={...toEditor(),title:'An engineering guide',slug:'an-engineering-guide',excerpt:'A useful and sufficiently detailed engineering summary.',categories:['Engineering'],content:{type:'doc',content:[{type:'paragraph',content:[{type:'text',text:'Real article content.'}]},{type:'image',attrs:{src:'/plant.jpg',alt:''}}]},coverImage:'/plant.jpg'};
 assert.ok(publicationIssues(doc).coverAlt);assert.ok(publicationIssues(doc).content);
});
test('scheduled input uses local wall-clock time and round-trips to its instant',()=>{
 const iso='2026-11-20T11:30:00.000Z';assert.equal(new Date(toLocalDateTime(iso)).getTime(),Date.parse(iso));assert.equal(toLocalDateTime(null),'');
});

test('too many editorial tags are rejected instead of silently discarded',()=>{
 const doc={...toEditor(),tags:Array.from({length:9},(_,i)=>`Topic ${i}`)};assert.equal(editorSchema.safeParse(doc).success,false);
});
