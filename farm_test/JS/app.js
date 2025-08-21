// 연도
document.getElementById('y').textContent = new Date().getFullYear();

// 네비 스크롤 스타일
const navEl = document.getElementById('nav');
const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// (옵션) 히어로 이미지 로드 시 프리뷰 페이드아웃
(function preloadHero(){
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const img = new Image();
  img.src = 'img/SF7.png';
  img.onload = () => hero.classList.add('ready');
})();

// GSAP or 폴백
function bootGSAP(){
  if (!window.gsap) return false;
  gsap.registerPlugin(ScrollTrigger);
  const fadeUp = (sel, d, delay=0.1) => gsap.to(sel,{duration:d,opacity:1,y:0,delay});
  fadeUp('#brandMark', 1.1, .25);
  fadeUp('#headline',  .9, .2);
  fadeUp('#sub',       .9, .32);
  gsap.to('#cta', {duration:.7, opacity:1, y:0, scale:1, delay:.45});
  document.querySelectorAll('.section .content').forEach(el=>{
    gsap.from(el,{opacity:0,y:24,duration:.9,
      scrollTrigger:{trigger:el,start:'top 80%',toggleActions:'play none none reverse'}});
  });
  gsap.to('#cta',{scale:1.02,yoyo:true,repeat:-1,ease:'sine.inOut',duration:1.6,
    scrollTrigger:{trigger:'.hero-inner',start:'top 60%',end:'bottom top',toggleActions:'play pause resume pause'}});
  return true;
}

function bootFallback(){
  const targets = ['#brandMark','#headline','#sub','#cta',...Array.from(document.querySelectorAll('.section .content'))];
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.transition='opacity .8s ease, transform .8s ease';
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
        io.unobserve(e.target);
      }
    });
  },{ rootMargin:'0px 0px -10% 0px' });
  targets.forEach(sel=>{
    const el = typeof sel==='string'? document.querySelector(sel): sel;
    if(el){ el.style.opacity='0'; el.style.transform='translateY(16px)'; io.observe(el); }
  });
}
if (window.gsap) {
  gsap.from(".cta-btn", {
    opacity: 0,
    y: 30,
    duration: 0.5,
    delay: 0.1,
    scrollTrigger: {
      trigger: ".service",
      start: "top 80%"
    }
  });
}

if (!bootGSAP()) bootFallback();