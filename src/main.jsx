import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, MapPin, Menu as MenuIcon, Phone, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { restaurant } from "./data/restaurant";
import { dishes, mandiDishes } from "./data/dishes";
import { categories, menu } from "./data/menu";
import "./styles/globals.css";

gsap.registerPlugin(ScrollTrigger);

const imgFallback = (e, label) => {
  e.currentTarget.style.display = "none";
  e.currentTarget.parentElement.classList.add("image-fallback");
  const span = document.createElement("span");
  span.textContent = label || "ARABIAN DARBAR";
  e.currentTarget.parentElement.appendChild(span);
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Story", "Menu", "Mandi", "Reviews", "About", "Visit"];
  return (
    <header className="nav-wrap">
      <nav className="navbar">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span>ARABIAN</span><b>DARBAR</b>
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(x => <a key={x} href={`#${x.toLowerCase()}`} onClick={() => setOpen(false)}>{x}</a>)}
          <a className="nav-order" href="#order" onClick={() => setOpen(false)}>Order Now <ArrowRight size={15}/></a>
        </div>
        <button className="mobile-menu" aria-label="Open navigation" onClick={() => setOpen(!open)}>
          {open ? <X/> : <MenuIcon/>}
        </button>
      </nav>
    </header>
  );
}

function GoldPattern() {
  return <div className="pattern" aria-hidden="true"><span/><span/><span/><span/><span/></div>;
}

function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-kicker", { y: 25, opacity: 0, duration: .8 })
        .from(".hero-title span", { yPercent: 110, opacity: 0, stagger: .1, duration: 1 }, "-=.35")
        .from(".hero-sub", { y: 20, opacity: 0, duration: .7 }, "-=.5")
        .from(".hero-actions", { y: 20, opacity: 0, duration: .7 }, "-=.45")
        .from(".hero-scroll", { opacity: 0, duration: .8 }, "-=.3");
      gsap.to(".hero-orb", { y: -35, x: 20, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".hero-photo", { yPercent: 7, scale: 1.04, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true }});
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-bg">
        <div className="hero-photo" role="img" aria-label="Arabian Darbar storefront placeholder" />
        <div className="hero-veil"/>
        <div className="hero-orb"/>
      </div>
      <GoldPattern/>
      <div className="hero-content">
        <p className="hero-kicker">HAJI SAGEER SAHAB <span>•</span> CHEMBUR, MUMBAI</p>
        <h1 className="hero-title"><span>ARABIAN</span><span>DARBAR</span></h1>
        <p className="hero-sub">An exotic Indo-Arabian dining experience in the heart of Mumbai.</p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#menu">Enter the Darbar <ArrowRight size={17}/></a>
          <a className="btn btn-ghost" href="#story">Explore Story</a>
        </div>
      </div>
      <div className="hero-scroll"><span>SCROLL TO ENTER</span><ArrowDown size={16}/></div>
    </section>
  );
}

function Story() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-media", { clipPath: "inset(15% 15% 15% 15% round 24px)", scale: 1.08, duration: 1.3, scrollTrigger: { trigger: ref.current, start: "top 70%" }});
      gsap.from(".story-copy > *", { y: 30, opacity: 0, stagger: .12, duration: .8, scrollTrigger: { trigger: ref.current, start: "top 65%" }});
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="section story" id="story" ref={ref}>
      <div className="story-media image-frame"><div className="storefront-art"><div className="arch"/><div className="store-sign">ARABIAN<br/><b>DARBAR</b></div><div className="door"/></div></div>
      <div className="story-copy">
        <p className="eyebrow">01 / THE DARBAR</p>
        <h2>WELCOME<br/><em>TO THE DARBAR</em></h2>
        <p>Step away from the rush of Mumbai and into an atmosphere shaped by Arabian-inspired architecture, warm light and generous dining.</p>
        <p className="muted">Arabian Darbar is a Chembur restaurant spanning Arabic, Mandi, Turkish, Mughlai, North Indian and Chinese influences.</p>
        <a className="text-link" href="#mandi">Enter the flavour story <ArrowRight size={16}/></a>
      </div>
    </section>
  );
}

function MumbaiArabian() {
  return (
    <section className="cross-section">
      <div className="cross-word">MUMBAI</div>
      <div className="cross-center"><span>×</span><p>ARABIAN FLAVOURS<br/><small>INDIAN HOSPITALITY</small></p></div>
      <div className="cross-word right">DARBAR</div>
      <div className="lantern">✦</div>
    </section>
  );
}

function FoodExperience() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dish-card", { y: 50, opacity: 0, stagger: .08, duration: .7, scrollTrigger: { trigger: ref.current, start: "top 72%" }});
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="section food" id="food" ref={ref}>
      <div className="section-heading">
        <div><p className="eyebrow">02 / FOOD EXPERIENCE</p><h2>FLAVOURS<br/><em>OF THE DARBAR</em></h2></div>
        <p className="heading-note">Real dishes. Deep spices. Shared tables. Explore the signatures that define the experience.</p>
      </div>
      <div className="dish-grid">
        {dishes.map((dish, i) => (
          <article className={`dish-card ${i % 3 === 0 ? "tall" : ""}`} key={dish.name}>
            <div className="dish-image">
              <img src={dish.image} alt={dish.name} onError={(e) => imgFallback(e, dish.fallback)}/>
              <div className="dish-shade"/>
              <div className="dish-label"><span>{dish.tag}</span><h3>{dish.name}</h3><div className="dish-arrow">EXPLORE <ArrowRight size={15}/></div></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Mandi() {
  const track = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mandi-track", { x: () => -(track.current.scrollWidth - window.innerWidth + 80), ease: "none", scrollTrigger: { trigger: track.current, start: "top 10%", end: "+=1500", scrub: 1, pin: true, invalidateOnRefresh: true }});
    }, track);
    return () => ctx.revert();
  }, []);
  return (
    <section className="mandi" id="mandi" ref={track}>
      <div className="mandi-intro"><p className="eyebrow">03 / THE CENTERPIECE</p><h2>MANDI</h2><p>A table built for sharing.</p></div>
      <div className="mandi-track">
        {mandiDishes.map((dish, i) => (
          <div className="mandi-card" key={dish.name}>
            <div className="mandi-num">0{i+1}</div>
            <div className="mandi-image"><img src={dish.image} alt={dish.name} onError={(e)=>imgFallback(e, dish.name)}/></div>
            <h3>{dish.name}</h3><span>DISCOVER DISH <ArrowRight size={14}/></span>
          </div>
        ))}
        <div className="mandi-end"><span>THE DARBAR</span><strong>MADE<br/>TO SHARE</strong></div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const items = active === "All" ? menu.flatMap(x => x.items) : (menu.find(x => x.category === active)?.items || []);
  return (
    <section className="section menu-section" id="menu">
      <div className="section-heading">
        <div><p className="eyebrow">04 / THE MENU</p><h2>THE<br/><em>TABLE</em></h2></div>
        <p className="heading-note">A structured menu experience. Update prices and dishes centrally in <code>src/data/menu.js</code>.</p>
      </div>
      <div className="menu-tabs">
        {categories.map(cat => <button key={cat} className={active === cat ? "active" : ""} onClick={()=>setActive(cat)}>{cat}</button>)}
      </div>
      <div className="menu-list">
        {items.map((item, i) => (
          <button className="menu-row" key={`${item.name}-${i}`} onClick={()=>setSelected(item)}>
            <span className="menu-index">{String(i+1).padStart(2,"0")}</span>
            <span className="menu-thumb"><img src={item.image} alt="" onError={(e)=>imgFallback(e, item.name)}/></span>
            <span className="menu-name"><b>{item.name}</b><small>{item.vegetarian ? "VEG" : "NON-VEG"}</small></span>
            <span className="menu-price">{item.price}</span>
            <span className="menu-view">VIEW DISH <ArrowRight size={14}/></span>
          </button>
        ))}
      </div>
      {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}>
        <div className="dish-modal" onClick={e=>e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setSelected(null)}><X/></button>
          <div className="modal-image"><img src={selected.image} alt={selected.name} onError={(e)=>imgFallback(e, selected.name)}/></div>
          <div className="modal-copy"><p className="eyebrow">ARABIAN DARBAR</p><h3>{selected.name}</h3><p>Explore this dish as part of the Darbar dining experience.</p><strong>{selected.price}</strong><a href="#order" onClick={()=>setSelected(null)} className="btn btn-gold">Order the Darbar <ArrowRight size={16}/></a></div>
        </div>
      </div>}
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery-section">
      <div className="gallery-title"><p className="eyebrow">05 / VISUAL JOURNEY</p><h2>FROM THE<br/><em>KITCHEN</em></h2></div>
      <div className="gallery-grid">
        {[
          ["mutton-korma.jpg","MUTTON KORMA"],["chicken-mandi.jpg","CHICKEN MANDI"],["kunafa.jpg","KUNAFA"],["raan.jpg","LAZEEZ BUTTER TOSSED RAAN"],["tandoori-chicken.jpg","LAZEEZ TANDOORI CHICKEN"]
        ].map(([file,label],i)=><div className={`gallery-tile g${i+1}`} key={file}><img src={`/assets/food/${file}`} alt={label} onError={(e)=>imgFallback(e,label)}/><span>{label}</span></div>)}
      </div>
    </section>
  );
}

function Ratings() {
  return (
    <section className="ratings" id="reviews">
      <div><p className="eyebrow">06 / SOCIAL PROOF</p><h2>WHAT PEOPLE<br/><em>SEE</em></h2></div>
      <div className="rating-grid">
        {restaurant.ratings.map(r=><div className="rating-card" key={r.platform}><span>{r.platform}</span><strong>★ {r.score}</strong><small>{r.count}</small></div>)}
      </div>
      <p className="rating-note">Ratings and counts are dynamic and should be refreshed from their respective platforms before publication. Last configured: {restaurant.lastUpdated}.</p>
    </section>
  );
}

function Order() {
  return (
    <section className="order-section" id="order">
      <GoldPattern/>
      <div className="order-inner">
        <p className="eyebrow">07 / BRING THE DARBAR HOME</p>
        <h2>READY FOR<br/><em>THE DARBAR?</em></h2>
        <p>Bring the Darbar to your table.</p>
        <div className="order-buttons">
          <a className="btn btn-gold large" href={restaurant.orderLinks.swiggy} target="_blank" rel="noreferrer">Order on Swiggy <ExternalLink size={17}/></a>
          <a className="btn btn-ghost large" href={restaurant.orderLinks.zomato} target="_blank" rel="noreferrer">Order on Zomato <ExternalLink size={17}/></a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div><p className="eyebrow">08 / ABOUT</p><h2>MORE THAN<br/><em>A MEAL.</em></h2></div>
      <div className="about-copy"><p>Arabian Darbar is a Chembur, Mumbai restaurant offering a broad menu across Arabic, Mandi, Turkish, Mughlai, North Indian and Chinese influences.</p><p className="muted">This site intentionally avoids unsupported founding stories, awards, celebrity claims, biographies and other unverified restaurant history.</p></div>
    </section>
  );
}

function Location() {
  return (
    <section className="location" id="visit">
      <div className="location-map"><div className="map-grid"/><div className="map-pin"><MapPin size={23}/><span>ARABIAN DARBAR</span></div><div className="map-city">MUMBAI</div></div>
      <div className="location-copy">
        <p className="eyebrow">09 / FIND THE DARBAR</p><h2>CHEMBUR<br/><em>MUMBAI</em></h2>
        <p>{restaurant.address}</p>
        <a className="text-link" href={restaurant.mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={16}/></a>
        <div className="contact-line"><Phone size={16}/><a href={`tel:${restaurant.phone.replace(/\s/g,"")}`}>{restaurant.phone}</a></div>
        <div className="hours">
          <b>OPENING HOURS</b>
          {Object.entries(restaurant.hours).map(([day,time])=><div key={day}><span>{day}</span><span>{time}</span></div>)}
          <small>Hours may change — verify before visiting.</small>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer>
    <div className="footer-brand"><p>HAJI SAGEER SAHAB</p><h2>ARABIAN<br/><em>DARBAR</em></h2></div>
    <div className="footer-nav">{["Story","Menu","Mandi","Reviews","About","Visit"].map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div>
    <div className="footer-contact"><a href={`tel:${restaurant.phone.replace(/\s/g,"")}`}>{restaurant.phone}</a><span>Chembur, Mumbai</span><div><a href={restaurant.orderLinks.swiggy}>SWIGGY</a><a href={restaurant.orderLinks.zomato}>ZOMATO</a></div></div>
    <div className="footer-credit">DESIGNED & BUILT BY <a href="https://github.com/PythosXand" target="_blank" rel="noreferrer">PYTHOSX <ArrowRight size={14}/></a></div>
  </footer>
}

function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = e => gsap.to(ref.current, { x:e.clientX, y:e.clientY, duration:.25, ease:"power2.out" });
    window.addEventListener("pointermove", move);
    const hover = () => ref.current?.classList.add("cursor-hover");
    const leave = () => ref.current?.classList.remove("cursor-hover");
    const els = document.querySelectorAll("a,button,.dish-image,.gallery-tile");
    els.forEach(el=>{el.addEventListener("mouseenter",hover);el.addEventListener("mouseleave",leave)});
    return ()=>{window.removeEventListener("pointermove",move);els.forEach(el=>{el.removeEventListener("mouseenter",hover);el.removeEventListener("mouseleave",leave)})};
  },[]);
  return <div ref={ref} className="cursor" aria-hidden="true"/>;
}

function App() {
  useEffect(()=>{ document.documentElement.style.scrollBehavior = "smooth"; return ()=>{document.documentElement.style.scrollBehavior="auto"} },[]);
  return <>
    <Cursor/><Navbar/><main>
      <Hero/><Story/><MumbaiArabian/><FoodExperience/><Mandi/><MenuSection/><Gallery/><Ratings/><Order/><About/><Location/>
    </main><Footer/>
  </>;
}

createRoot(document.getElementById("root")).render(<App/>);
