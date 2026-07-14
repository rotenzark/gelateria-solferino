/* ===== GELATERIA SOLFERINO · main.js ===== */
(function(){
  'use strict';

  /* ---- INTRO ---- */
  var intro=document.getElementById('intro');
  function closeIntro(){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }
  if(intro){
    document.body.style.overflow='hidden';
    var skip=document.getElementById('intro-skip');
    if(skip) skip.addEventListener('click',closeIntro);
    setTimeout(closeIntro,1900);
  }
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }

  /* ---- HEADER scroll ---- */
  var header=document.getElementById('site-header');
  function onScroll(){ if(header) header.classList.toggle('scrolled',window.scrollY>18); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---- BURGER ---- */
  var burger=document.getElementById('burger'), nav=document.querySelector('.nav');
  if(burger&&nav){
    burger.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  }

  /* ---- REVEAL ---- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ---- LIGHTBOX ---- */
  var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img'),lbClose=document.getElementById('lb-close');
  document.querySelectorAll('.g-item').forEach(function(it){
    it.addEventListener('click',function(){
      var full=it.getAttribute('data-full'); if(!full)return;
      lbImg.src=full; var im=it.querySelector('img'); lbImg.alt=im?im.alt:''; lb.classList.add('open');
    });
  });
  function closeLb(){lb.classList.remove('open');setTimeout(function(){lbImg.src='';},300);}
  if(lbClose) lbClose.addEventListener('click',closeLb);
  if(lb) lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))closeLb();});

  /* ---- ORARI DINAMICI ---- */
  // getDay: 0=Dom..6=Sab. Aperti tutti i giorni 8:30–20 (Dom 9–20).
  var TABLE={0:[[9,20]],1:[[8.5,20]],2:[[8.5,20]],3:[[8.5,20]],4:[[8.5,20]],5:[[8.5,20]],6:[[8.5,20]]};
  function nowRome(){
    try{ var s=new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}); return new Date(s); }
    catch(e){ return new Date(); }
  }
  function fmt(h){var H=Math.floor(h),M=Math.round((h-H)*60);return H+':'+(M<10?'0'+M:''+M);}
  function updateLive(){
    var dot=document.getElementById('live-dot'), txt=document.getElementById('live-text');
    if(!dot||!txt)return;
    var d=nowRome(), day=d.getDay(), hr=d.getHours()+d.getMinutes()/60;
    var wins=TABLE[day]||[], openNow=false, closeAt=0, nextOpen=null;
    for(var i=0;i<wins.length;i++){ if(hr>=wins[i][0]&&hr<wins[i][1]){openNow=true;closeAt=wins[i][1];} if(hr<wins[i][0]&&nextOpen===null){nextOpen=wins[i][0];} }
    var LANG=document.documentElement.getAttribute('lang')||'it';
    if(openNow){
      dot.className='open';
      txt.textContent=(LANG==='en'?'Open now · until ':'Aperto ora · fino alle ')+fmt(closeAt);
    }else if(nextOpen!==null){
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed · opens at ':'Chiuso · apre alle ')+fmt(nextOpen);
    }else{
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed now':'Chiuso ora');
    }
  }
  updateLive(); setInterval(updateLive,60000);

  /* ---- I18N ---- */
  var EN={
    'intro.skip':'Enter →',
    'brand.sub':'Brera · from the heart of Milan',
    'nav.famiglia':'The family','nav.carta':'The flavours','nav.nonsolo':'Beyond gelato','nav.dove':'Find us',
    'cta.ig':'Instagram',
    'hero.eyebrow':'Via Solferino 18 · Brera, Milan',
    'hero.tag':'Premiata Gelateria di Zubelli · family-run',
    'hero.sub':'A small historic gelateria in the heart of Brera. <b>Artisan gelato made in-house</b>, fresh and <b>low in sugar</b>: the «out of this world» zabaione, the lemon cream you rarely find anymore, the fruit of the season. And gelato in a brioche.',
    'hero.cta1':'The flavours','hero.cta2':'Come to Solferino',
    'hero.live':'Checking hours…','hero.f2':'★ 4.6 · artisan gelato','hero.badge':'made<br>in-house',
    'famiglia.kicker':'The family',
    'famiglia.h2':'For over thirty years,<br>a family and its gelato.',
    'famiglia.p1':'On this street of old Milan, the <b>Zubelli family</b> has been making gelato for over thirty years. A small, genuine shop where <b>Rita</b> and her family welcome you with a smile and talk you through every flavour.',
    'famiglia.p2':'Gelato <em>made in-house</em>, fresh every day, creamy just right and low in sugar. The same quality as ever, in a <b>Premiata Gelateria</b> in the heart of Brera.',
    'carta.kicker':'The flavours','carta.h2':'What’s in today',
    'carta.sub':'The classics that are always here, and the season that keeps changing. Ask Rita for today’s flavour.',
    'carta.classici':'The classics','carta.stagione':'In season & new',
    'fl.1':'Egg custard cream','fl.2':'Zabaione with Marsala','fl.3':'Lemon cream','fl.4':'Dark chocolate','fl.5':'Pistachio','fl.6':'Fior di latte & Stracciatella','fl.7':'Coffee & Hazelnut',
    'fl.8':'Fruit of the season','fl.9':'Buffalo-milk gelato','fl.10':'Kefir chutney, mango & ginger','fl.11':'Coconut','fl.12':'Matcha tea','fl.13':'Malaga','fl.more':'…and many more, changing every day',
    'nonsolo.kicker':'…beyond gelato','nonsolo.h2':'Gelato, and much more',
    'ns.1t':'Gelato in a brioche','ns.1p':'Soft, faintly citrusy brioche filled with gelato: breakfast (or a snack) as they do in the South.',
    'ns.2t':'Semifreddi & desserts','ns.2p':'Puddings, coupes and semifreddi made by us, to finish on a sweet note.',
    'ns.3t':'Sorbets & fruit','ns.3p':'Real fruit sorbets, fresh and light. With or without cream, as you like.',
    'gallery.kicker':'The gelateria','gallery.h2':'A stop in Solferino',
    'rev.kicker':'The word','rev.h2':'4.6 ★ · «the zabaione is out of this world»',
    'dove.kicker':'Find us','dove.h2':'In the heart of Brera,<br>on Via Solferino.',
    'dove.addr':'Address','dove.addr2':'— Brera','dove.hours':'Hours','dove.hoursv':'Every day · 8:30–20:00 (Sun from 9:00)',
    'dove.phone':'Phone','dove.social':'Social','dove.route':'Get directions','dove.ig':'Follow us on Instagram',
    'faq.h2':'Frequently asked questions',
    'faq.q1':'Where is Gelateria Solferino?','faq.a1':'At Via Solferino 18, in the heart of Milan’s Brera. A small, historic, family-run gelateria.',
    'faq.q2':'What kind of gelato do you make?','faq.a2':'Artisan gelato made in-house, fresh and low in sugar. Among the classics, zabaione and lemon cream; then fruit of the season and new flavours like buffalo-milk gelato. And gelato in a brioche.',
    'faq.q3':'Do you do gelato in a brioche?','faq.a3':'Yes, and more: besides the cone and the cup you’ll find gelato in a brioche, semifreddi and spoon desserts.',
    'faq.q4':'When are you open?','faq.a4':'Every day, from 8:30 to 20:00 (from 9:00 on Sunday).',
    'foot.sub':'Artisan gelato of Brera · family-run',
    'foot.where':'Where','foot.hours':'Hours','foot.hours2':'Every day','foot.contact':'Contact',
    'foot.disclaimer':'Demo website. Content and photos gathered from public sources (Google Maps); hours, flavours and prices are indicative, to be confirmed with the gelateria.',
    'rev.g1':'Google review · <span>★★★★★</span>','rev.g2':'Google review · <span>★★★★★</span>',
    'ab.carta':'Flavours','ab.call':'Call','ab.route':'Directions'
  };
  var IT={};
  document.querySelectorAll('[data-i18n]').forEach(function(el){ IT[el.getAttribute('data-i18n')]=el.innerHTML; });
  function setLang(lang){
    var dict=lang==='en'?EN:IT;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'); if(dict[k]!=null) el.innerHTML=dict[k]; else if(IT[k]!=null) el.innerHTML=IT[k];
    });
    document.documentElement.setAttribute('lang',lang);
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===lang);});
    try{localStorage.setItem('solferino_lang',lang);}catch(e){}
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));}); });
  var saved='it'; try{saved=localStorage.getItem('solferino_lang')||'it';}catch(e){}
  if(saved==='en') setLang('en');

})();
