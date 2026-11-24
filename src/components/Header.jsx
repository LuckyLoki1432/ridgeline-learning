import {useEffect,useRef,useState} from 'react';
import styles from '../App.module.css';
const links=[['Why Ridgeline','#benefits'],['Programs','#programs'],['FAQs','#faq']];
export default function Header(){
 const [open,setOpen]=useState(false); const trigger=useRef(null);
 useEffect(()=>{if(!open)return;const onKey=e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[open]);
 const close=()=>setOpen(false);
 return <header className={styles.header} id="top">
  <a className={styles.brand} href="#top" aria-label="Ridgeline Learning home"><img src="/images/ridgeline_logo.svg" alt="Ridgeline Learning"/></a>
  <nav className={styles.desktopNav} aria-label="Main navigation">{links.map(([t,h])=><a key={h} href={h}>{t}</a>)}<a className={styles.navCta} href="#register">Get started</a></nav>
  <button ref={trigger} className={styles.menuButton} type="button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(v=>!v)}><span/><span/><span/></button>
  <nav id="mobile-navigation" className={open?styles.mobileNavOpen:styles.mobileNav} aria-label="Mobile navigation" aria-hidden={!open}>{links.map(([t,h])=><a key={h} href={h} onClick={close} tabIndex={open?0:-1}>{t}</a>)}<a href="#register" onClick={close} tabIndex={open?0:-1}>Get started</a></nav>
 </header>
}
