(function(){"use strict";var t={4059:function(t,r,e){var o=e(9242),n=e(3396);const a={class:"page-wrap"};function s(t,r,e,o,s,c){const i=(0,n.up)("NavBar"),u=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(i,{user:s.user},null,8,["user"]),(0,n._)("div",a,[(0,n.Wm)(u,{user:s.user},null,8,["user"])])],64)}var c=e(1450);const i={class:"nav-bar"},u={class:"logo-wrap"},d=["src"],p={class:"nav-buttons-wrap"},l=(0,n._)("button",null,"Shopping Cart",-1);function m(t,r,e,o,a,s){const c=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",i,[(0,n.Wm)(c,{to:"/products",class:"products-link"},{default:(0,n.w5)((()=>[(0,n._)("div",u,[(0,n._)("img",{src:a.logo},null,8,d)])])),_:1}),(0,n._)("div",p,[e.user?((0,n.wg)(),(0,n.iD)("button",{key:0,onClick:r[0]||(r[0]=(...t)=>s.signOut&&s.signOut(...t))},"Sign Out")):(0,n.kq)("",!0),(0,n.Wm)(c,{to:"/cart"},{default:(0,n.w5)((()=>[l])),_:1})])])}var g=e.p+"img/logo-hexagon.d2768201.svg",f={name:"NavBar",props:["user"],data(){return{logo:g}},methods:{signOut(){const t=(0,c.v0)();(0,c.w7)(t)}}},v=e(89);const h=(0,v.Z)(f,[["render",m]]);var w=h,I={name:"App",components:{NavBar:w},data(){return{user:null}},created(){const t=(0,c.v0)();(0,c.Aj)(t,(t=>{this.user=t}))}};const y=(0,v.Z)(I,[["render",s]]);var k=y,b=e(2483);const _=(0,n._)("h1",null,"Shopping Cart",-1),C={key:0},D=(0,n._)("button",{class:"checkout-button"},"Proceed to Checkout",-1),P={key:1};function S(t,r,e,o,a,s){const c=(0,n.up)("ShoppingCartList");return(0,n.wg)(),(0,n.iD)(n.HY,null,[_,a.cartItems.length>0?((0,n.wg)(),(0,n.iD)("div",C,[(0,n.Wm)(c,{onRemoveFromCart:s.removeFromCart,products:a.cartItems},null,8,["onRemoveFromCart","products"]),D])):(0,n.kq)("",!0),0===a.cartItems.length?((0,n.wg)(),(0,n.iD)("div",P," You current have no items in your cart! ")):(0,n.kq)("",!0)],64)}var Z=e(7139);const $=["src"],O={class:"details-wrap"},F=["onClick"];function j(t,r,e,o,a,s){return(0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.products,(r=>((0,n.wg)(),(0,n.iD)("div",{class:"product-container",key:r.id},[(0,n._)("img",{class:"product-image",src:r.imageUrl},null,8,$),(0,n._)("div",O,[(0,n._)("h3",null,(0,Z.zw)(r.name),1),(0,n._)("p",null,(0,Z.zw)(r.price),1)]),(0,n._)("button",{onClick:e=>t.$emit("remove-from-cart",r.id),class:"remove-button"}," Remove from Cart ",8,F)])))),128)}var z={name:"ShoppingCartList",emits:["remove-from-cart"],props:["products"]};const W=(0,v.Z)(z,[["render",j]]);var A=W,B=e(4161),L={name:"ShoppingCartPage",props:["user"],components:{ShoppingCartList:A},data(){return{cartItems:[]}},watch:{async user(t){if(t){const r=await B.Z.get(`/api/users/${t.uid}/cart`),e=r.data;this.cartItems=e}}},methods:{async removeFromCart(t){const r=await B.Z.delete(`/api/users/${this.user.uid}/cart/${t}`),e=r.data;console.log("Updated cart: ",e),this.cartItems=e}},async created(){if(this.user){const t=await B.Z.get(`/api/users/${this.user.uid}/cart`),r=t.data;this.cartItems=r}}};const N=(0,v.Z)(L,[["render",S]]);var Y=N;const q=(0,n._)("h1",null,"Products",-1);function x(t,r,e,o,a,s){const c=(0,n.up)("ProductsList");return(0,n.wg)(),(0,n.iD)(n.HY,null,[q,(0,n.Wm)(c,{products:a.products},null,8,["products"])],64)}const R={class:"grid-wrap"},H=["src"],T={class:"product-name"},U={class:"product-price"},K=(0,n._)("button",null,"View Details",-1);function M(t,r,e,o,a,s){const c=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",R,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.products,(t=>((0,n.wg)(),(0,n.iD)("div",{class:"product-item",key:t.id},[(0,n._)("img",{src:t.imageUrl},null,8,H),(0,n._)("h3",T,(0,Z.zw)(t.name),1),(0,n._)("p",U,(0,Z.zw)(t.price),1),(0,n.Wm)(c,{to:"/products/"+t.id},{default:(0,n.w5)((()=>[K])),_:2},1032,["to"])])))),128))])}var E={name:"ProductsList",props:["products"]};const G=(0,v.Z)(E,[["render",M]]);var J=G,V={name:"ProductsPage",components:{ProductsList:J},data(){return{products:[]}},async created(){const t=await B.Z.get("/api/products"),r=t.data;this.products=r}};const Q=(0,v.Z)(V,[["render",x]]);var X=Q;const tt={key:0},rt=(0,n._)("button",{class:"back-button"},"Back",-1),et={class:"img-wrap"},ot=["src"],nt={class:"product-details"},at={class:"price"},st={key:1,class:"grey-button"},ct={key:1};function it(t,r,e,o,a,s){const c=(0,n.up)("router-link"),i=(0,n.up)("NotFoundPage");return a.product?((0,n.wg)(),(0,n.iD)("div",tt,[(0,n.Wm)(c,{to:"/products"},{default:(0,n.w5)((()=>[rt])),_:1}),(0,n._)("div",et,[(0,n._)("img",{src:a.product.imageUrl},null,8,ot)]),(0,n._)("div",nt,[(0,n._)("h1",null,(0,Z.zw)(a.product.name),1),(0,n._)("h3",at,(0,Z.zw)(a.product.price),1),e.user&&!s.isItemInCart?((0,n.wg)(),(0,n.iD)("button",{key:0,onClick:r[0]||(r[0]=(...t)=>s.addToCart&&s.addToCart(...t)),class:"add-to-cart"},"Add to cart")):(0,n.kq)("",!0),e.user&&s.isItemInCart?((0,n.wg)(),(0,n.iD)("button",st,"Item is already in cart")):(0,n.kq)("",!0),e.user?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:2,class:"sign-in",onClick:r[1]||(r[1]=(...t)=>s.signIn&&s.signIn(...t))},"Sign in to add to cart"))])])):((0,n.wg)(),(0,n.iD)("div",ct,[(0,n.Wm)(i)]))}function ut(t,r,e,o,a,s){return(0,n.wg)(),(0,n.iD)("h1",null,"404: Page Not Found")}var dt={name:"NotFoundPage"};const pt=(0,v.Z)(dt,[["render",ut]]);var lt=pt;const mt="https://fullstack-vue-deployment.onrender.com",gt={baseUrl:`${mt}`,productPage:`${mt}/products`};var ft=gt;const vt=ft.productPage;var ht={name:"ProductDetailPage",props:["user"],data(){return{product:{},cartItems:[]}},computed:{isItemInCart(){return console.log("is cartItems and array?",this.cartItems),this.cartItems.some((t=>t.id===this.$route.params.productId))}},watch:{async user(t){if(t){const r=await B.Z.get(`/api/users/${t.uid}/cart`),e=r.data;this.cartItems=e}}},methods:{async addToCart(){await B.Z.post(`/api/users/${this.user.uid}/cart`,{id:this.$route.params.productId}),alert("Successfully added item to cart")},async signIn(){const t=prompt("Please enter your E-Mail to sign in"),r=(0,c.v0)(),e={url:`${vt}/${this.$route.params.productId}`,handleCodeInApp:!0};await(0,c.oo)(r,t,e),alert("A login link was sent to the email you provided"),window.localStorage.setItem("emailForSignIn",t)}},components:{NotFoundPage:lt},async created(){const t=(0,c.v0)();if((0,c.JB)(t,window.location.href)){const r=window.localStorage.getItem("emailForSignIn");await(0,c.P6)(t,r,window.location.href),alert("You are successfully signed in"),window.localStorage.removeItem("emailForSignIn")}const r=await B.Z.get(`/api/products/${this.$route.params.productId}`),e=r.data;if(this.product=e,this.user){const t=await B.Z.get(`/api/users/${this.user.uid}/cart`),r=t.data;this.cartItems=r}}};const wt=(0,v.Z)(ht,[["render",it]]);var It=wt,yt=e(7795);const kt={apiKey:"AIzaSyBzSK2jrz9GjoPkJRDAsRRyifGIfAlwLfw",authDomain:"vue-ecommerce-app-37b11.firebaseapp.com",projectId:"vue-ecommerce-app-37b11",storageBucket:"vue-ecommerce-app-37b11.appspot.com",messagingSenderId:"1040888104838",appId:"1:1040888104838:web:fa07a64434ff13bbe08e07"};(0,yt.ZF)(kt),(0,o.ri)(k).use(b.p7({history:b.PO("/"),routes:[{path:"/",redirect:"/products"},{path:"/cart",component:Y},{path:"/products",component:X},{path:"/products/:productId",component:It},{path:"/:pathMatch(.*)*",component:lt}]})).mount("#app")}},r={};function e(o){var n=r[o];if(void 0!==n)return n.exports;var a=r[o]={exports:{}};return t[o].call(a.exports,a,a.exports,e),a.exports}e.m=t,function(){var t=[];e.O=function(r,o,n,a){if(!o){var s=1/0;for(d=0;d<t.length;d++){o=t[d][0],n=t[d][1],a=t[d][2];for(var c=!0,i=0;i<o.length;i++)(!1&a||s>=a)&&Object.keys(e.O).every((function(t){return e.O[t](o[i])}))?o.splice(i--,1):(c=!1,a<s&&(s=a));if(c){t.splice(d--,1);var u=n();void 0!==u&&(r=u)}}return r}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[o,n,a]}}(),function(){e.n=function(t){var r=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(r,{a:r}),r}}(),function(){e.d=function(t,r){for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)}}(),function(){e.p="/"}(),function(){var t={143:0};e.O.j=function(r){return 0===t[r]};var r=function(r,o){var n,a,s=o[0],c=o[1],i=o[2],u=0;if(s.some((function(r){return 0!==t[r]}))){for(n in c)e.o(c,n)&&(e.m[n]=c[n]);if(i)var d=i(e)}for(r&&r(o);u<s.length;u++)a=s[u],e.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return e.O(d)},o=self["webpackChunkfront_end"]=self["webpackChunkfront_end"]||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))}();var o=e.O(void 0,[998],(function(){return e(4059)}));o=e.O(o)})();
//# sourceMappingURL=app.3c6264ea.js.map