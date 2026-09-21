import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const pizzaSizes = [
  ['7"', 590], ['9"', 1250], ['12"', 1899], ['16"', 2599]
];

const menu = {
  pizzas: [
    ['Tikka Pizza', 'Chicken tikka, onion, capsicum and mozzarella.', pizzaSizes],
    ['Fajita Pizza', 'Fajita chicken, onion, capsicum and mozzarella.', pizzaSizes],
    ['Smoked Pizza', 'Smoked chicken, vegetables and mozzarella.', pizzaSizes],
    ['Cheese Lover Pizza', 'Extra cheesy, creamy and loaded with toppings.', pizzaSizes],
    ['Veggies Delight Pizza', 'Fresh vegetables with a cheesy finish.', pizzaSizes],
    ['Crown Crust Pizza', 'Signature crown crust pizza.', [['12"', 1899]]]
  ],
  burgers: [
    ['Zinger Burger', 'Classic crispy zinger burger', 529, 'burger'],
    ['Cheese Burger', 'Loaded with cheese and toppings', 579, 'burger'],
    ['Two Tower Burger', 'Double-layer signature burger', 799, 'burger']
  ],
  fries: [
    ['Regular Fries', 'Crispy fries served hot.', 269, 'fries'],
    ['Large Fries', 'A generous portion of crispy fries.', 549, 'fries']
  ],
  pastas: [
    ['Penne Pasta', 'Creamy penne pasta.', { regular: 490, large: 950 }, 'pasta'],
    ['Macaroni Pasta', 'Creamy macaroni pasta.', { regular: 490, large: 950 }, 'pasta'],
    ['Alfredo Pasta', 'Rich Alfredo-style pasta.', { regular: 490, large: 950 }, 'pasta']
  ],
  sides: [
    ['Chicken PC', '1pc Rs.299 • 2pc Rs.599', 299, 'chicken'],
    ['BBQ Wings', '6pc Rs.599 • 8pc Rs.2200', 599, 'chicken'],
    ['Molten Lava Cake', 'Warm chocolate cake with a molten center.', 450, 'cake'],
    ['Drinks — Coke & Sprite', 'Regular 350ml Rs.120 • 1L Rs.180 • 1.5L Rs.240', 120, 'drink'],
    ['Nuggets', '5pc', 420, 'chicken']
  ]
};

const categories = [
  ['home', 'Home'], ['pizzas', 'Pizzas'], ['burgers', 'Burgers & Fries'],
  ['pastas', 'Pastas'], ['sides', 'Sides & Drinks'], ['deals', 'Deals']
];

function Icon({ name, size = 20 }) {
  const paths = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/></>,
    fork: <><path d="M8 3v7M5 3v7M11 3v7M5 10c0 2 1 3 3 3v8M17 3v18M14 9c0-3 1.5-6 3-6s3 3 3 6-1.5 4-3 4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    flame: <path d="M12 22c4 0 7-2.8 7-7 0-3.4-2-5.8-4.8-8.4.1 2.1-.6 3.5-2 4.4.1-4.1-1.5-6.9-4.7-9C7.8 6.4 4 9.7 4 14.8 4 19.1 7.3 22 12 22Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.3-6 8-6s7.3 2 8 6"/></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    moon: <path d="M20 15.3A8.5 8.5 0 0 1 8.7 4 8.5 8.5 0 1 0 20 15.3Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    phone: <path d="M6.5 3.5 9 3l2 5-2 1.4a15 15 0 0 0 5.6 5.6L16 13l5 2-.5 2.5C20.2 19.3 18.8 20 17.4 20 9.6 20 4 14.4 4 6.6 4 5.2 4.7 3.8 6.5 3.5Z"/>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    cart: <><path d="M4 5h2l1.5 10h9.7L19 8H7"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Logo({ compact = false }) {
  return <div className={`brand ${compact ? 'compact' : ''}`} aria-label="Mickey's">
    <img src={`${import.meta.env.BASE_URL}mickeys-logo.svg`} alt="Mickey's" />
  </div>;
}

function FoodArt({ type = 'pizza', variant = 0 }) {
  const colors = ['#ffcf3a', '#ef4a39', '#5cae43', '#f7f0e4'];
  if (type === 'burger') return <div className="food-art burger-art"><div className="bun top"></div><div className="lettuce"></div><div className="patty"></div><div className="cheese"></div><div className="bun bottom"></div></div>;
  if (type === 'fries') return <div className="food-art fries-art"><div className="fries-sticks">{Array.from({length:9}).map((_,i)=><i key={i} style={{transform:`rotate(${i*4-16}deg) translateY(${i%3*2}px)`}} />)}</div><div className="fries-box"></div></div>;
  if (type === 'pasta') return <div className="food-art pasta-art"><div className="pasta-plate"></div>{Array.from({length:10}).map((_,i)=><span key={i} style={{left:`${23+i*5}%`, top:`${35+(i%3)*7}%`, transform:`rotate(${i*13}deg)`}} />)}</div>;
  if (type === 'chicken') return <div className="food-art chicken-art">{[0,1,2,3].map(i=><div key={i} className="chicken-piece" style={{left:`${22+i*15}%`, top:`${27+(i%2)*18}%`, transform:`rotate(${i*23-20}deg)`}} />)}<div className="greens"></div></div>;
  if (type === 'cake') return <div className="food-art cake-art"><div className="cake"></div><div className="lava"></div></div>;
  if (type === 'drink') return <div className="food-art drink-art"><div className="bottle"><span>COLA</span></div></div>;
  return <div className="food-art pizza-art"><div className="pizza"><div className="pizza-crust"></div>{Array.from({length:9}).map((_,i)=><b key={i} style={{left:`${25+(i*19)%50}%`,top:`${23+(i*29)%48}%`,background:colors[i%colors.length]}} />)}</div></div>;
}

function priceFrom(item) {
  if (Array.isArray(item[2])) return item[2][0][1];
  if (typeof item[2] === 'object') return item[2].regular;
  return item[2];
}

function buildProducts() {
  const products = [];
  menu.pizzas.forEach((p, i) => products.push({id:`pizza-${i}`, name:p[0], desc:p[1], price:p[2][0][1], sizes:p[2], type:'pizza', category:'pizzas'}));
  menu.burgers.forEach((p, i) => products.push({id:`burger-${i}`, name:p[0], desc:p[1], price:p[2], type:p[3], category:'burgers'}));
  menu.fries.forEach((p, i) => products.push({id:`fries-${i}`, name:p[0], desc:p[1], price:p[2], type:p[3], category:'burgers'}));
  menu.pastas.forEach((p, i) => products.push({id:`pasta-${i}`, name:p[0], desc:p[1], price:p[2].regular, sizes:[['Regular',p[2].regular],['Large',p[2].large]], type:p[3], category:'pastas'}));
  menu.sides.forEach((p, i) => products.push({id:`side-${i}`, name:p[0], desc:p[1], price:p[2], type:p[3], category:'sides'}));
  return products;
}

const products = buildProducts();

const deals = [
  {id:'deal-1', name:'Deal 1', desc:'1 Regular Pizza + 1 Regular Pasta + 1 Regular Drink', price:1050, type:'pizza', badge:'DEAL 1'},
  {id:'deal-2', name:'Deal 2', desc:'1 Extra Large Pizza (16 inch) + 1 Regular Pizza FREE', price:2550, type:'pizza', badge:'DEAL 2'}
];

function Sidebar({ active, setActive, dark, setDark, openCart, cartCount, openSearch, openAccount, openLocation, menuOpen, setMenuOpen }) {
  return <aside className={`sidebar ${menuOpen ? 'expanded' : ''}`}>
    <button className="icon-btn menu-btn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name="menu" size={24}/><span>Menu</span></button>
    <div className="side-nav">
      <button className={active==='home'?'active':''} onClick={()=>setActive('home')}><Icon name="home"/><span>Home</span></button>
      <button className={active==='pizzas'?'active':''} onClick={()=>setActive('pizzas')}><Icon name="fork"/><span>Menu</span></button>
      <button onClick={openSearch}><Icon name="search"/><span>Search</span></button>
      <button className={active==='deals'?'active':''} onClick={()=>setActive('deals')}><Icon name="flame"/><span>Deals</span></button>
      <button onClick={openLocation}><Icon name="pin"/><span>Delivery</span></button>
      <button onClick={()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}><Icon name="spark"/></button>
      <button onClick={openAccount}><Icon name="user"/><span>Account</span></button>
      <button onClick={openCart} className="cart-side"><Icon name="bag"/>{cartCount>0&&<span>{cartCount}</span>}</button>
      <button onClick={()=>setDark(!dark)}><Icon name={dark?'sun':'moon'}/></button>
    </div>
  </aside>
}

function Header({ openCart, cartCount, dark, setDark, openSearch, openAccount, openLocation }) {
  return <header className="topbar">
    <button className="mobile-menu" onClick={openSearch} aria-label="Open search"><Icon name="search" size={23}/></button>
    <Logo />
    <button className="delivery" onClick={openLocation}><span className="pin-circle"><Icon name="pin" size={22}/></span><div><small>DELIVERING TO</small><strong>Park View City</strong></div><span className="chevron">⌄</span></button>
    <div className="header-actions">
      <button className="order-pill" onClick={()=>window.location.href='tel:03336425397'}><span><Icon name="phone" size={18}/></span><div><small>ORDER NOW</small><b>0333-MICKEY'S</b></div></button>
      <button className="hot-pill" onClick={()=>document.getElementById('deals')?.scrollIntoView({behavior:'smooth'})}><Icon name="flame" size={17}/> HOT DEALS<i></i></button>
      <button className="account-btn" onClick={openAccount}><Icon name="user" size={20}/><span>SIGN IN</span></button>
      <button className="bag-btn" onClick={openCart}><Icon name="bag" size={21}/>{cartCount>0&&<em>{cartCount}</em>}</button>
      <button className="theme-mobile" onClick={()=>setDark(!dark)}><Icon name={dark?'sun':'moon'} /></button>
    </div>
  </header>
}

function FormField({ label, name, value, onChange, type='text', required=true, placeholder }) {
  return <label className="form-field"><span>{label}{required && ' *'}</span><input name={name} type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} required={required}/></label>;
}

function Modal({ title, eyebrow, close, children }) {
  return <><div className="modal-backdrop" onClick={close}></div><section className="modal" role="dialog" aria-modal="true" aria-label={title}><button className="modal-close" onClick={close}><Icon name="close"/></button><small>{eyebrow}</small><h2>{title}</h2>{children}</section></>;
}

function AccountModal({ close, user, setUser, order, onDelivery }) {
  const [form, setForm] = useState({name:user?.name || '', mobile:user?.mobile || '', code:''});
  const [step, setStep] = useState(user ? 2 : 1);
  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));
  const submit=e=>{e.preventDefault();if(step===1){setStep(2);return}setUser({name:form.name,mobile:form.mobile});};
  return <Modal title={user ? `Hi, ${user.name}` : 'Sign in to Mickey\'s'} eyebrow={user ? 'YOUR ACCOUNT' : 'WELCOME BACK'} close={close}>
    {!user && step===1 ? <form onSubmit={submit} className="modal-form"><FormField label="Full name" name="name" value={form.name} onChange={v=>update('name',v)} placeholder="Your name"/><FormField label="Mobile number" name="mobile" value={form.mobile} onChange={v=>update('mobile',v)} type="tel" placeholder="03XX XXXXXXX"/><button className="modal-submit">SEND VERIFICATION CODE <Icon name="arrow" size={16}/></button></form> : user ? <div className="account-panel"><p>You are signed in with <b>{user.mobile}</b>.</p><button className="modal-submit" onClick={onDelivery}>CONFIRM DELIVERY ADDRESS <Icon name="pin" size={16}/></button>{order && <OrderStatus order={order}/>}<button className="text-button" onClick={()=>setUser(null)}>Sign out</button></div> : <form onSubmit={submit} className="modal-form"><p className="verify-copy">We sent a 6-digit code to <b>{form.mobile}</b>.</p><FormField label="Verification code" name="code" value={form.code} onChange={v=>update('code',v)} type="text" placeholder="123456"/><button className="modal-submit">VERIFY & SIGN IN <Icon name="arrow" size={16}/></button></form>}
  </Modal>;
}

function DeliveryModal({ close, user, setOrder }) {
  const [form,setForm]=useState({location:'Park View City',street:'',house:'',mobile:user?.mobile || ''});
  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));
  const submit=e=>{e.preventDefault();setOrder({...form,eta:'40–50 minutes',status:0});close();};
  return <Modal title="Confirm delivery" eyebrow="WHERE SHOULD WE DELIVER?" close={close}><form onSubmit={submit} className="modal-form"><FormField label="Location / area" name="location" value={form.location} onChange={v=>update('location',v)} placeholder="Park View City"/><FormField label="Street number" name="street" value={form.street} onChange={v=>update('street',v)} placeholder="Street 12"/><FormField label="House number" name="house" value={form.house} onChange={v=>update('house',v)} placeholder="House 24"/><FormField label="Mobile number" name="mobile" value={form.mobile} onChange={v=>update('mobile',v)} type="tel" placeholder="03XX XXXXXXX"/><button className="modal-submit">CONFIRM DELIVERY <Icon name="arrow" size={16}/></button></form></Modal>;
}

function OrderStatus({ order }) {
  const steps=['Baking','Dispatched','Delivered'];
  return <div className="order-status"><div className="status-head"><span>ORDER STATUS</span><b>{steps[order.status] || steps[0]}</b></div><div className="status-track">{steps.map((step,index)=><div className={index<=order.status?'done':''} key={step}><i>{index<order.status?'✓':index+1}</i><small>{step}</small></div>)}</div><p>Your order is being prepared and will reach you in <b>{order.eta}</b>.</p></div>;
}

function CategoryBar({ active, setActive }) {
  return <nav className="category-bar">{categories.map(([id,label])=><button key={id} className={active===id?'selected':''} onClick={()=>setActive(id)}>{label}</button>)}</nav>;
}

function Hero({ slide, setSlide }) {
  const slides = [
    {eyebrow:'MICKEY\'S SPECIAL', title:'10% OFF', big:'ENTIRE MENU', text:'DINE-IN • DELIVERY • TAKEAWAY', price:'Everyday', art:'pizza'},
    {eyebrow:'DEAL 1', title:'PIZZA + PASTA', big:'+ DRINK', text:'1 REGULAR PIZZA • 1 REGULAR PASTA • 1 REGULAR DRINK', price:'Rs. 1050', art:'pasta'},
    {eyebrow:'DEAL 2', title:'EXTRA LARGE', big:'PIZZA', text:'16 INCH + 1 REGULAR PIZZA FREE', price:'Rs. 2550', art:'pizza'},
  ];
  const s=slides[slide];
  return <section className="hero-wrap">
    <div className="hero">
      <div className="hero-copy">
        <span className="hero-eyebrow">{s.eyebrow}</span>
        <h1>{s.title}<strong>{s.big}</strong></h1>
        <p>{s.text}</p>
        <div className="hero-price"><small>ONLY</small><b>{s.price}</b></div>
        <button className="hero-btn" onClick={()=>document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}>ORDER NOW <Icon name="arrow" size={18}/></button>
      </div>
      <div className="hero-art"><FoodArt type={s.art} variant={slide}/><div className="burst">HOT<br/>FRESH<br/>FAST</div></div>
      <div className="hero-dots">{slides.map((_,i)=><button key={i} className={i===slide?'on':''} onClick={()=>setSlide(i)} />)}</div>
    </div>
  </section>
}

function SectionHeader({ title, count, onAll }) {
  return <div className="section-head"><div><h2>{title}</h2><span>{count} Items</span></div><button onClick={onAll}>ALL <Icon name="arrow" size={15}/></button></div>;
}

function ProductCard({ item, addToCart }) {
  const [sizeIndex,setSizeIndex]=useState(0);
  const sizes=item.sizes || [];
  const activePrice=sizes.length ? sizes[sizeIndex][1] : item.price;
  return <article className="card">
    <div className="card-image">
      {item.name.includes('Deal') && <span className="save">SPECIAL</span>}
      <FoodArt type={item.type}/>
    </div>
    <div className="card-body">
      <h3>{item.name}</h3>
      <p>{item.desc}</p>
      {sizes.length>0 && <div className="size-row">{sizes.map((s,i)=><button key={s[0]} className={i===sizeIndex?'active':''} onClick={()=>setSizeIndex(i)}>{s[0]}</button>)}</div>}
      <div className="card-bottom"><div className="price"><small>Rs.</small> {activePrice.toLocaleString()}</div><button className="plus" onClick={()=>addToCart({...item,price:activePrice, selectedSize:sizes[sizeIndex]?.[0]})}><Icon name="plus" size={21}/></button></div>
    </div>
  </article>
}

function ProductSection({ title, count, items, id, addToCart, setActive }) {
  return <section className="menu-section" id={id}><SectionHeader title={title} count={count || items.length} onAll={()=>setActive(id)}/><div className="product-grid">{items.map(item=><ProductCard key={item.id} item={item} addToCart={addToCart}/>)}</div></section>
}

function Deals({ addToCart }) {
  return <section className="menu-section deals-section" id="deals"><SectionHeader title="DEALS & OFFERS" count={2} onAll={()=>{}}/><div className="deal-grid">{deals.map(item=><ProductCard key={item.id} item={item} addToCart={addToCart}/>)}</div></section>
}

function CartDrawer({ open, close, cart, setCart }) {
  const total=cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  const update=(id,delta)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i));
  return <><div className={`drawer-backdrop ${open?'show':''}`} onClick={close}></div><aside className={`cart-drawer ${open?'open':''}`}>
    <div className="drawer-head"><div><small>YOUR ORDER</small><h2>Cart <span>{cart.reduce((n,i)=>n+i.qty,0)}</span></h2></div><button onClick={close}><Icon name="close"/></button></div>
    <div className="cart-list">{cart.length===0?<div className="empty"><div className="empty-icon"><Icon name="bag" size={34}/></div><h3>Your cart is empty</h3><p>Add something delicious from Mickey's.</p></div>:cart.map(item=><div className="cart-item" key={item.id}><FoodArt type={item.type}/><div><h4>{item.name}</h4><p>{item.selectedSize || item.desc}</p><b>Rs. {(item.price*item.qty).toLocaleString()}</b><div className="qty"><button onClick={()=>update(item.id,-1)}>-</button><span>{item.qty}</span><button onClick={()=>update(item.id,1)}>+</button></div></div></div>)}</div>
    <div className="checkout"><div><span>Subtotal</span><b>Rs. {total.toLocaleString()}</b></div><button disabled={!cart.length} onClick={()=>alert('Checkout is ready to connect to your preferred ordering system.')}>CHECKOUT <Icon name="arrow" size={17}/></button><small>Delivery charges calculated at checkout.</small></div>
  </aside></>
}

function Footer() {
  return <footer id="about"><div className="footer-brand"><Logo compact/><p>Fresh food, bold flavours and everyday value. Mickey's brings pizza, burgers, paratha pad and more to your table.</p><span>FOLLOW US</span><div className="socials"><button>f</button><button>◎</button><button>◉</button></div></div><div><h4>COMPANY</h4><a href="#about">About Us</a><a href="#menu">Our Menu</a><a href="#deals">Deals</a><a href="#">Careers</a></div><div><h4>SUPPORT</h4><a href="#">Contact Us</a><a href="#">Feedback</a><a href="#">Locations</a><a href="#">Privacy Policy</a><a href="#">FAQs</a></div><div><h4>CONTACT OFFICE</h4><p>Park View City, Gate 2</p><p>📞 0333-6425397</p><p>📱 0333-MICKEY'S</p><p>🕐 1:00 PM – 1:00 AM</p></div><div className="footer-bottom"><span>© 2026 Mickey's. All rights reserved.</span><b>MADE WITH ♥ FOR GOOD FOOD</b></div></footer>
}

function App() {
  const [dark,setDark]=useState(true);
  const [active,setActive]=useState('home');
  const [slide,setSlide]=useState(0);
  const [cartOpen,setCartOpen]=useState(false);
  const [cart,setCart]=useState([]);
  const [searchOpen,setSearchOpen]=useState(false);
  const [query,setQuery]=useState('');
  const [menuOpen,setMenuOpen]=useState(false);
  const [modal,setModal]=useState(null);
  const [user,setUser]=useState(null);
  const [order,setOrder]=useState(null);
  const [notice,setNotice]=useState('');

  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%3),5500);return()=>clearInterval(t)},[]);
  useEffect(()=>{document.documentElement.classList.toggle('light',!dark)},[dark]);
  useEffect(()=>{if(!order || order.status>=2)return;const timer=setTimeout(()=>setOrder(prev=>({...prev,status:prev.status+1})),12000);return()=>clearTimeout(timer)},[order]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)setActive(v.target.id)}, {rootMargin:'-30% 0px -55% 0px',threshold:[.1,.4,.8]});
    ['menu','pizzas','burgers','pastas','sides','deals'].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)});return()=>observer.disconnect();
  },[]);

  const addToCart=item=>setCart(prev=>{const found=prev.find(i=>i.id===item.id && i.selectedSize===item.selectedSize);return found?prev.map(i=>i===found?{...i,qty:i.qty+1}:i):[...prev,{...item,qty:1}]});
  const cartCount=cart.reduce((n,i)=>n+i.qty,0);
  const filtered=useMemo(()=>{
    if(!query.trim()) return products;
    return products.filter(p=>`${p.name} ${p.desc}`.toLowerCase().includes(query.toLowerCase()));
  },[query]);
  const scrollTo=(id)=>{const el=document.getElementById(id);if(el){el.scrollIntoView({behavior:'smooth',block:'start'});setActive(id)}};
  const openSearch=()=>{setSearchOpen(true);setMenuOpen(false)};
  const openAccount=()=>setModal('account');
  const openLocation=()=>setModal('delivery');
  const confirmOrder=details=>{setOrder(details);setModal(null);setNotice(`Delivery confirmed. Your order will reach ${details.location}, Street ${details.street}, House ${details.house} in ${details.eta}.`);setTimeout(()=>setNotice(''),7000)};

  return <div className="app">
    <Sidebar active={active} setActive={id=>{setActive(id);if(id==='home')window.scrollTo({top:0,behavior:'smooth'});else scrollTo(id)}} dark={dark} setDark={setDark} openCart={()=>setCartOpen(true)} cartCount={cartCount} openSearch={openSearch} openAccount={openAccount} openLocation={openLocation} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <Header openCart={()=>setCartOpen(true)} cartCount={cartCount} dark={dark} setDark={setDark} openSearch={openSearch} openAccount={openAccount} openLocation={openLocation}/>
    <main>
      <div className="main-inner">
        <Hero slide={slide} setSlide={setSlide}/>
        <CategoryBar active={active} setActive={id=>id==='home'?window.scrollTo({top:0,behavior:'smooth'}):scrollTo(id)}/>
        <div className="welcome" id="menu"><div><span>WELCOME TO MICKEY'S</span><h2>Big taste. <em>Everyday value.</em></h2></div><button onClick={()=>setSearchOpen(true)}>FIND YOUR FAVOURITE <Icon name="search" size={16}/></button></div>
        {searchOpen && <div className="search-panel"><div className="search-input"><Icon name="search"/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search pizza, burger, pasta..."/><button onClick={()=>{setQuery('');setSearchOpen(false)}}><Icon name="close"/></button></div>{query && <p>{filtered.length} result{filtered.length!==1?'s':''} found</p>}</div>}
        {query ? <section className="menu-section"><SectionHeader title="SEARCH RESULTS" count={filtered.length} onAll={()=>{}}/><div className="product-grid">{filtered.map(item=><ProductCard key={item.id} item={item} addToCart={addToCart}/>)}</div></section> : <>
          <ProductSection id="pizzas" title="PIZZAS" items={products.filter(p=>p.category==='pizzas')} addToCart={addToCart} setActive={setActive}/>
          <ProductSection id="burgers" title="BURGERS & FRIES" items={products.filter(p=>p.category==='burgers')} addToCart={addToCart} setActive={setActive}/>
          <ProductSection id="pastas" title="PASTAS" items={products.filter(p=>p.category==='pastas')} addToCart={addToCart} setActive={setActive}/>
          <ProductSection id="sides" title="SIDES & DRINKS" items={products.filter(p=>p.category==='sides')} addToCart={addToCart} setActive={setActive}/>
          <Deals addToCart={addToCart}/>
        </>}
        <section className="promise"><div className="promise-art"><FoodArt type="pizza"/></div><div><span>WHY MICKEY'S?</span><h2>Freshly made. <strong>Seriously tasty.</strong></h2><p>From our 7-inch pizzas to loaded burgers, creamy pastas and sides, every item is built around the menu printed on Mickey's own takeaway card.</p><div className="promise-stats"><b>10%<small>OFF ENTIRE MENU</small></b><b>1–1 AM<small>OPEN DAILY</small></b><b>40–50<small>MIN DELIVERY</small></b></div></div></section>
      </div>
      <Footer/>
    </main>
    <div className="mobile-nav"><button className={active==='home'?'active':''} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><Icon name="home"/><small>Home</small></button><button className={active==='pizzas'?'active':''} onClick={()=>scrollTo('pizzas')}><Icon name="fork"/><small>Menu</small></button><button onClick={()=>setSearchOpen(true)}><Icon name="search"/><small>Search</small></button><button className={cartCount?'has-cart':''} onClick={()=>setCartOpen(true)}><Icon name="bag"/><small>Cart {cartCount?`(${cartCount})`:''}</small></button></div>
    <CartDrawer open={cartOpen} close={()=>setCartOpen(false)} cart={cart} setCart={setCart}/>
    {notice && <div className="notice" role="status"><Icon name="spark" size={18}/><span>{notice}</span><button onClick={()=>setNotice('')}><Icon name="close" size={16}/></button></div>}
    {modal==='account' && <AccountModal close={()=>setModal(null)} user={user} setUser={setUser} order={order} onDelivery={openLocation}/>} 
    {modal==='delivery' && <DeliveryModal close={()=>setModal(null)} user={user} setOrder={confirmOrder}/>} 
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
