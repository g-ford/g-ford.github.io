(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{161:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return y});var a=n(7),r=n.n(a),i=n(167),o=n.n(i),l=n(0),c=n.n(l),s=n(165),u=n(173),m=n(171),d=n(211),p=n(166);function f(){var e=o()(["\n    margin: 3rem 0 0;\n  "]);return f=function(){return e},e}var g=s.c.h3.withConfig({displayName:"pages__Title",componentId:"sc-1g3gvot-0"})(["font-weight:800;font-size:2.6rem;margin:6rem 0 0;",""],p.a.phone(f())),h=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges;return c.a.createElement(u.a,null,c.a.createElement(m.a,{title:"All Posts",keywords:["gatsby","blog","react"]}),c.a.createElement("main",null,c.a.createElement(g,null,"Latest Posts"),e.map(function(e){var t=e.node;return c.a.createElement(d.a,{key:t.id,node:t})})))},t}(l.Component);t.default=h;var y="1622534586"},166:function(e,t,n){"use strict";n(75),n(55),n(184);var a=n(165),r={desktop:992,tablet:768,phone:576},i=Object.keys(r).reduce(function(e,t){return e[t]=function(){return Object(a.b)(["@media (max-width:","em){","}"],r[t]/16,a.b.apply(void 0,arguments))},e},{});t.a=i},168:function(e,t,n){"use strict";var a=n(165),r=n(54),i=Object(a.c)(r.Link).withConfig({displayName:"styled-link__StyledLink",componentId:"evpd30-0"})(["text-decoration:none;color:rgba(0,0,0,0.8);"]);t.a=i},170:function(e){e.exports={data:{site:{siteMetadata:{title:"I wrote this"}}}}},171:function(e,t,n){"use strict";var a=n(172),r=n(0),i=n.n(r),o=n(3),l=n.n(o),c=n(185),s=n.n(c),u=n(54);function m(e){var t=e.description,n=e.lang,r=e.meta,o=e.keywords,l=e.title;return i.a.createElement(u.StaticQuery,{query:d,render:function(e){var a=t||e.site.siteMetadata.description;return i.a.createElement(s.a,{htmlAttributes:{lang:n},title:l,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:l},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:l},{name:"twitter:description",content:a}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:a})}m.defaultProps={lang:"en",meta:[],keywords:[]},m.propTypes={description:l.a.string,lang:l.a.string,meta:l.a.array,keywords:l.a.arrayOf(l.a.string),title:l.a.string.isRequired},t.a=m;var d="1025518380"},172:function(e){e.exports={data:{site:{siteMetadata:{title:"I wrote this",description:"Everything but nothing important",author:"Geoff Ford"}}}}},173:function(e,t,n){"use strict";var a=n(7),r=n.n(a),i=n(167),o=n.n(i),l=n(170),c=n(0),s=n.n(c),u=n(3),m=n.n(u),d=n(165),p=n(54),f=n(168),g=n(166);function h(){var e=o()(["\n    text-align: center;\n  "]);return h=function(){return e},e}var y=d.c.nav.withConfig({displayName:"header__Container",componentId:"q6n5p1-0"})(["box-shadow:0 4px 12px 0 rgba(0,0,0,0.05);height:6rem;display:flex;align-items:center;justify-content:center;"]),w=d.c.h1.withConfig({displayName:"header__Title",componentId:"q6n5p1-1"})(["font-size:1.6rem;font-weight:800;letter-spacing:0.1rem;text-transform:uppercase;margin:0;",""],g.a.phone(h())),v=function(e){var t=e.title;return s.a.createElement(y,null,s.a.createElement(f.a,{to:"/"},s.a.createElement(w,null,t)))};v.defaultProps={title:""},v.propTypes={title:m.a.string};var b=v;function E(){var e=o()(["\n    width: 80%;\n  "]);return E=function(){return e},e}function k(){var e=o()(["\n  @font-face {\n    font-family: system;\n    font-style: normal;\n    font-weight: 300;\n    src: local('.SFNSText-Light'), local('.HelveticaNeueDeskInterface-Light'),\n      local('.LucidaGrandeUI'), local('Ubuntu Light'), local('Segoe UI Light'),\n      local('Roboto-Light'), local('DroidSans'), local('Tahoma');\n  }\n\n  :root {\n    font-size: 10px;\n  }\n\n  body {\n    font-family: 'system';\n    margin: 0;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    color: rgba(0, 0, 0, 0.8);\n    min-height: 100vh;\n    position: relative;\n    font-size: 1.6rem;\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    font-family: 'Oswald', sans-serif;\n  }\n\n  h2 {\n    font-size: 2.5rem;\n  }\n\n  h3 {\n    font-size: 2.4rem;\n  }\n\n  h4 {\n    font-size: 1.6rem;\n  }\n\n  code {\n    font-family: Menlo,Monaco,\"Courier New\",Courier,monospace;\n    word-break: break-word;\n  }\n\n  pre code {\n    word-break: normal;\n  }\n\n  :not(pre) > code[class*=\"language-\"], pre[class*=\"language-text\"] {\n    background-color: transparent;\n    color: inherit;\n    font-size: medium;\n  }\n"]);return k=function(){return e},e}var x=Object(d.a)(k()),_=d.c.footer.withConfig({displayName:"layout__Footer",componentId:"sc-13bvcqm-0"})(["display:block;height:6rem;"]),C=d.c.div.withConfig({displayName:"layout__Content",componentId:"sc-13bvcqm-1"})(["width:60%;max-width:728px;margin:0 auto;",""],g.a.tablet(E())),I=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children;return s.a.createElement(p.StaticQuery,{query:"1044757290",render:function(t){return s.a.createElement(s.a.Fragment,null,s.a.createElement(b,{title:t.site.siteMetadata.title}),s.a.createElement(C,null,e),s.a.createElement(_,null),s.a.createElement(x,null))},data:l})},t}(c.Component);I.propTypes={children:m.a.node.isRequired};t.a=I},211:function(e,t,n){"use strict";var a=n(167),r=n.n(a),i=n(0),o=n.n(i),l=n(3),c=n.n(l),s=n(165),u=n(168),m=n(166);function d(){var e=r()(["\n    margin: 0.5rem 0;\n    padding: 0.4rem 0;\n  "]);return d=function(){return e},e}var p=s.c.div.withConfig({displayName:"post__Container",componentId:"sc-1wcetm6-0"})(["padding:1rem 0;margin:1rem 0;&:first-child{margin-top:0;}",""],m.a.phone(d())),f=s.c.h4.withConfig({displayName:"post__Title",componentId:"sc-1wcetm6-1"})(["margin-bottom:0.2rem;font-size:2.2rem;"]),g=function(e){var t=e.node;return o.a.createElement(u.a,{to:t.fields.slug},o.a.createElement(p,null,o.a.createElement(f,null,t.frontmatter.title),o.a.createElement("sub",null,o.a.createElement("span",null,"on ",t.frontmatter.date),o.a.createElement("span",null,"  -  "),o.a.createElement("span",null,t.fields.readingTime.text)),o.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.excerpt}})))};g.propTypes={node:c.a.shape({id:c.a.string.isRequired,frontmatter:c.a.shape({title:c.a.string.isRequired,date:c.a.string.isRequired}),fields:c.a.shape({slug:c.a.string.isRequired}),excerpt:c.a.string.isRequired})},t.a=g}}]);
//# sourceMappingURL=component---src-pages-index-js-851f15dca621cd3fae9b.js.map