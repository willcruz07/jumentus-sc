if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let f={};const d=e=>i(e,n),t={module:{uri:n},exports:f,require:d};a[n]=Promise.all(s.map((e=>t[e]||d(e)))).then((e=>(c(...e),f)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/V54gXSRHTmQd43R2TEGp0/_buildManifest.js",revision:"f16c795bc27c17f0e5c704c7f30d6496"},{url:"/_next/static/V54gXSRHTmQd43R2TEGp0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/190-76fb9cceb34b9566.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/286-a9462adaf4c7f251.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/32021791.25af83831410a47d.js",revision:"25af83831410a47d"},{url:"/_next/static/chunks/381-8ab472f5981d6b9b.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/614-a2d7e77a5fb52512.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/858-563e11cec7f3d530.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/906-c4ae799a800c7fb4.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/(authenticated)/history/page-bd5edd9f488f45f5.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/(authenticated)/home/page-ff1333d301475d41.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/(authenticated)/match-create/page-bc4766ae978fc579.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/(authenticated)/match-details/page-6ce0eea75e792a6c.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/(authenticated)/players/page-45bab0b1fd74224f.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/(without_auth)/sign-in/page-fde0dd695904427f.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/_not-found/page-8edc93bb819fcc66.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/app/layout-9ce00e6dc51e14be.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/bc9e92e6-8a4512261619c27b.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/bf19aa1e-f57e000f270b0379.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/fd9d1056-bff1410ead432980.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/main-5838bfa233f68b71.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/main-app-d79a1596c20b0102.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/pages/_app-b468b1ad3c44069c.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/pages/_error-08693dd1eeefb3cb.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c714d2aa2a5afcdd.js",revision:"V54gXSRHTmQd43R2TEGp0"},{url:"/_next/static/css/05d152d238cd8729.css",revision:"05d152d238cd8729"},{url:"/_next/static/css/f9d499f4fc22e882.css",revision:"f9d499f4fc22e882"},{url:"/_next/static/media/02205c9944024f15-s.p.woff2",revision:"4cf1e387b8e1c64a73ef01c8d1e14681"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/0c9f04b3a081fbe8-s.woff2",revision:"dbb600ebf3f75489e74697c0109d933d"},{url:"/_next/static/media/0e4fe491bf84089c-s.p.woff2",revision:"5e22a46c04d947a36ea0cad07afcc9e1"},{url:"/_next/static/media/1c57ca6f5208a29b-s.woff2",revision:"491a7a9678c3cfd4f86c092c68480f23"},{url:"/_next/static/media/2aae41578844343d-s.woff2",revision:"2efc5ed64bf29fedae0e9c7afc25d78d"},{url:"/_next/static/media/3511fdf6750b518d-s.woff2",revision:"e85775fd86060618bd4125d14654c36e"},{url:"/_next/static/media/37b0c0a51409261e-s.woff2",revision:"5ce748f413aee42a8d4723df0d18830b"},{url:"/_next/static/media/384d46444bc5fa8e-s.woff2",revision:"9460683c5ef0b2f1b43518df6c172d21"},{url:"/_next/static/media/3d8af05b1dbb5df8-s.woff2",revision:"94a5fb88423f24f3981739bfbf345680"},{url:"/_next/static/media/3dbd163d3bb09d47-s.woff2",revision:"93dcb0c222437699e9dd591d8b5a6b85"},{url:"/_next/static/media/42d52f46a26971a3-s.woff2",revision:"b44d0dd122f9146504d444f290252d88"},{url:"/_next/static/media/44c3f6d12248be7f-s.woff2",revision:"705e5297b1a92dac3b13b2705b7156a7"},{url:"/_next/static/media/46c894be853ec49f-s.woff2",revision:"47891b6adb3a947dd3c594bd5196850e"},{url:"/_next/static/media/4a8324e71b197806-s.woff2",revision:"5fba57b10417c946c556545c9f348bbd"},{url:"/_next/static/media/506bd11311670951-s.woff2",revision:"7976a92314c8770252603e7813da9f67"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/5647e4c23315a2d2-s.woff2",revision:"e64969a373d0acf2586d1fd4224abb90"},{url:"/_next/static/media/627622453ef56b0d-s.p.woff2",revision:"e7df3d0942815909add8f9d0c40d00d9"},{url:"/_next/static/media/71ba03c5176fbd9c-s.woff2",revision:"2effa1fe2d0dff3e7b8c35ee120e0d05"},{url:"/_next/static/media/7be645d133f3ee22-s.woff2",revision:"3ba6fb27a0ea92c2f1513add6dbddf37"},{url:"/_next/static/media/7c53f7419436e04b-s.woff2",revision:"fd4ff709e3581e3f62e40e90260a1ad7"},{url:"/_next/static/media/7d8c9b0ca4a64a5a-s.p.woff2",revision:"0772a436bbaaaf4381e9d87bab168217"},{url:"/_next/static/media/80a2a8cc25a3c264-s.woff2",revision:"2d3d8a78ef164ab6c1c62a3e57c2727b"},{url:"/_next/static/media/83e4d81063b4b659-s.woff2",revision:"bd30db6b297b76f3a3a76f8d8ec5aac9"},{url:"/_next/static/media/8db47a8bf03b7d2f-s.p.woff2",revision:"49003e0ff09f1efb8323cf35b836ba8f"},{url:"/_next/static/media/8fb72f69fba4e3d2-s.woff2",revision:"7a2e2eae214e49b4333030f789100720"},{url:"/_next/static/media/912a9cfe43c928d9-s.woff2",revision:"376ffe2ca0b038d08d5e582ec13a310f"},{url:"/_next/static/media/934c4b7cb736f2a3-s.p.woff2",revision:"1f6d3cf6d38f25d83d95f5a800b8cac3"},{url:"/_next/static/media/94300924a0693016-s.woff2",revision:"105927314bd3f089b99c0dda456171ed"},{url:"/_next/static/media/9e48537b1b020091-s.woff2",revision:"4b52fd954ca934c204d73ddbc640e5d4"},{url:"/_next/static/media/a50efca067c45ff7-s.woff2",revision:"0ea6e3886fc7639170a8e69463f4113e"},{url:"/_next/static/media/a5b77b63ef20339c-s.woff2",revision:"96e992d510ed36aa573ab75df8698b42"},{url:"/_next/static/media/a6d330d7873e7320-s.woff2",revision:"f7ec4e2d6c9f82076c56a871d1d23a2d"},{url:"/_next/static/media/af961b7eb9a15f7e-s.woff2",revision:"2bbd1a9c77461a3bfbff4c9b3a43a89e"},{url:"/_next/static/media/b0c2fa43e5e9d061-s.woff2",revision:"c635a10842bbaa362cd28882806dd3c0"},{url:"/_next/static/media/baf12dd90520ae41-s.woff2",revision:"8096f9b1a15c26638179b6c9499ff260"},{url:"/_next/static/media/bbdb6f0234009aba-s.woff2",revision:"5756151c819325914806c6be65088b13"},{url:"/_next/static/media/bd976642b4f7fd99-s.woff2",revision:"cc0ffafe16e997fe75c32c5c6837e781"},{url:"/_next/static/media/c0058a8df935bb33-s.woff2",revision:"815d6a78ad78085bd8593051c2631f4a"},{url:"/_next/static/media/c2e6efaf026ea7b6-s.p.woff2",revision:"b9438e2f493d622d47722bf73a8828e0"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/cff529cd86cc0276-s.woff2",revision:"c2b2c28b98016afb2cb7e029c23f1f9f"},{url:"/_next/static/media/d117eea74e01de14-s.woff2",revision:"4d1e5298f2c7e19ba39a6ac8d88e91bd"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/dbe242b5c3b9d8cb-s.woff2",revision:"29445a64b7a514e94024e97416f26ecd"},{url:"/_next/static/media/de9eb3a9f0fa9e10-s.woff2",revision:"7155c037c22abdc74e4e6be351c0593c"},{url:"/_next/static/media/dfa8b99978df7bbc-s.woff2",revision:"7a500aa24dccfcf0cc60f781072614f5"},{url:"/_next/static/media/e25729ca87cc7df9-s.woff2",revision:"9a74bbc5f0d651f8f5b6df4fb3c5c755"},{url:"/_next/static/media/eb52b768f62eeeb4-s.woff2",revision:"90687dc5a4b6b6271c9f1c1d4986ca10"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/f06116e890b3dadb-s.woff2",revision:"2855f7c90916c37fe4e6bd36205a26a8"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/icon/ball-2.svg",revision:"4f1c61ad2f3751959a770c13d0977834"},{url:"/icon/ball.svg",revision:"f858ba56bd291040bfb6ecbd075e8082"},{url:"/icon/campo.svg",revision:"5239f6fa8454b8b501727121615030a8"},{url:"/icon/medal.svg",revision:"5ce28b5b46ab593d74a2d0b570fcb92f"},{url:"/icon/stadium.svg",revision:"53ae07789e44c0ebd227e6ed7eb145f2"},{url:"/icon/trophy-2.svg",revision:"323aade8a66fec17606a60f8c73b3055"},{url:"/icon/trophy.svg",revision:"3a7d833036ff0042d19664801c362938"},{url:"/icons/android-chrome-192x192.png",revision:"ca16784dd6978e04f17f3ee3157dc9fc"},{url:"/icons/android-chrome-384x384.png",revision:"4633a278feeaae1e94e0ae3df9ec2ba5"},{url:"/icons/icon-512x512.png",revision:"77669d3038a316a0ac3631b6a09452c8"},{url:"/img/baranga.png",revision:"198bca98e62e799423191e189cc31a1c"},{url:"/img/favicon.ico",revision:"820f0a0eae5d7b82c1763cc92791b8b3"},{url:"/img/logo-2.png",revision:"bb992d64b3bdfd8a02912bf20ba43512"},{url:"/img/logo.png",revision:"27ee52dc980f7ced14c3d6ad0f35dccc"},{url:"/img/man-of-the-match.png",revision:"ec33e7361b5bdabb12edd6b9c5aa7f18"},{url:"/img/players/andin_vasconcelos.jpg",revision:"cdf6cb81b99d02a68a475a090e7ebe71"},{url:"/img/players/andre_oliveira.jpg",revision:"55e7395e7dda25876371f0b589a6b186"},{url:"/img/players/chico_junior.jpg",revision:"4b1c799863bde6b04ef31b59df06bd37"},{url:"/img/players/cristiano_cardoso.jpg",revision:"d9bc2601e80f3865824c8f83122a8c86"},{url:"/img/players/da_cruz.jpg",revision:"5093bc8fa274389ab8696877a7b7d402"},{url:"/img/players/danrley_matos.jpg",revision:"aab3a87e797c7ce0bf692906ea50994a"},{url:"/img/players/erly_junior.jpg",revision:"167bd1dc25ce849a6b65f1ce034351fe"},{url:"/img/players/felipe_morais.jpg",revision:"6340635f2a38c54a20fde14f26d7cf29"},{url:"/img/players/gabriel_carvalho.jpg",revision:"7ed1c4e7e079dd6078b2fecdb4d72ac3"},{url:"/img/players/gean_araujo.jpg",revision:"a4914f13c0edc86d0f47d203ccad9366"},{url:"/img/players/gustavo_cardoso.jpg",revision:"96413031c323babd3271ff9bc214e4c9"},{url:"/img/players/gustavo_ramos.jpg",revision:"24c9c183f8e7e4fd1e4f8f5b7134cf1b"},{url:"/img/players/luiz_guilherme.jpg",revision:"361090db84e027a2aeefe6cde3cbde24"},{url:"/img/players/nathan_nunes.jpg",revision:"177861681a9fb8958de90758dbd2d23a"},{url:"/img/players/ravel_freitas.jpg",revision:"c5d839dcd597682a73592cfbef557db6"},{url:"/img/players/reinaldo_alonso.jpg",revision:"af899717a755c4e0e786d4956fe7c695"},{url:"/img/players/renan_cardozo.jpg",revision:"16850824344e0d11dc7e7d22904bd25c"},{url:"/img/players/thiago_wayand.jpg",revision:"af13617c8f9e882448da2bb849e517c7"},{url:"/img/players/thomaz_queiroz.jpg",revision:"cffb652e39a13ec7c94d88f6ce73484e"},{url:"/img/players/will_cruz.jpg",revision:"79d366767bee052c3d84b7233dbad7f2"},{url:"/img/sign-in.jpg",revision:"8e87e3c4a781c60411d18c087e085a8e"},{url:"/manifest.json",revision:"11668b6adc00c9b9307a4855fcb62c40"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:i})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&i&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:i})=>"1"===e.headers.get("RSC")&&i&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
