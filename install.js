(()=>{
  let deferredPrompt=null;
  const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
  function hide(){
    const b=document.getElementById('installBtn'),banner=document.getElementById('installBanner');
    if(b)b.hidden=true;
    if(banner)banner.hidden=true;
  }
  function show(){
    if(standalone()){hide();return;}
    const b=document.getElementById('installBtn'),banner=document.getElementById('installBanner');
    if(b)b.hidden=false;
    if(banner)banner.hidden=false;
  }
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredPrompt=e;
    show();
  });
  window.addEventListener('appinstalled',()=>{deferredPrompt=null;hide();});
  async function install(){
    if(!deferredPrompt){
      if(!standalone()) alert('Per instal·lar Loreak, obre-la amb Chrome i utilitza l’opció «Instal·la l’aplicació» o «Afegeix a la pantalla d’inici».');
      return;
    }
    deferredPrompt.prompt();
    try{await deferredPrompt.userChoice;}catch(e){}
    deferredPrompt=null;
    hide();
  }
  ready(()=>{
    const b=document.getElementById('installBtn'),banner=document.getElementById('installBannerBtn');
    if(b)b.addEventListener('click',install);
    if(banner)banner.addEventListener('click',install);
    if(!standalone())setTimeout(show,1200);
  });
})();
