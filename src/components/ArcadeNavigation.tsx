import {useRef} from 'react';
import {comingSoonGames,developerNotes,upcomingArcadeEvents} from '../data/arcadeHub';

export type ArcadeRoute='home'|'guess'|'connections'|'toon'|'bazinga'|'nine'|'pink'|'wallet'|'brave'|'noodles'|'passport'|'vault';

type Props={
 active:ArcadeRoute;
 onNavigate:(route:ArcadeRoute)=>void;
 onPreview:(name:string)=>void;
 onComingSoon:()=>void;
};
const liveGames:{route:ArcadeRoute;icon:string;name:string;subtitle:string}[]=[
 {route:'guess',icon:'🍓',name:'Guess Who?',subtitle:'Daily & practice riddles'},
 {route:'connections',icon:'🧩',name:'Little Connections',subtitle:'Hidden word groups'},
 {route:'toon',icon:'📺',name:'Toon Rewind',subtitle:'Cartoon nostalgia'},
 {route:'bazinga',icon:'⚛️',name:'Bazinga! Lab',subtitle:'Logic and seating'},
 {route:'nine',icon:'🕵️',name:'The 99 Files',subtitle:'Detective mysteries'},
 {route:'pink',icon:'🩷',name:'Pink Rush!',subtitle:'Musical memories'},
 {route:'brave',icon:'🏹',name:'Brave: The Wisps’ Trail',subtitle:'Six-chapter adventure'},
 {route:'noodles',icon:'🐼',name:'Noodles of Destiny',subtitle:'Eight cooking shifts + special reward'}
];
export default function ArcadeNavigation({active,onNavigate,onPreview,onComingSoon}:Props){
 const games=useRef<HTMLDetailsElement>(null);
 const future=useRef<HTMLDetailsElement>(null);
 const events=useRef<HTMLDetailsElement>(null);
 const notes=useRef<HTMLDetailsElement>(null);
 const menus=[games,future,events,notes];
 function closeMenus(){
  for(const menu of menus)if(menu.current)menu.current.open=false;
 }
 function nav(route:ArcadeRoute){closeMenus();onNavigate(route)}
 function peek(name:string){closeMenus();onPreview(name)}
 function jump(){closeMenus();onComingSoon()}
 const calendar=upcomingArcadeEvents();
 return <nav className="hub-nav" aria-label="Molly's Cozy Arcade navigation">
  <details className="hub-menu" ref={games} onToggle={e=>{
   if(e.currentTarget.open)for(const m of [future,events,notes])if(m.current)m.current.open=false;
  }}>
   <summary className={'hub-nav-trigger '+(['guess','connections','toon','bazinga','nine','pink','brave','noodles'].includes(active)?'is-active':'')}>
    <span className="hub-nav-icon" aria-hidden="true">🎮</span> Games <span className="hub-chevron" aria-hidden="true">⌄</span>
   </summary>
   <div className="hub-popover hub-popover-games">
    <div className="hub-popover-heading"><strong>Ready to play</strong><small>Eight playable titles</small></div>
    <div className="hub-popover-list">
     {liveGames.map(game=><button key={game.route} className={'hub-popover-item '+(active===game.route?'is-current':'')}
      onClick={()=>nav(game.route)}>
      <span className="hub-popover-emoji" aria-hidden="true">{game.icon}</span>
      <span><strong>{game.name}</strong><small>{game.subtitle}</small></span><span className="hub-item-arrow">↗</span>
     </button>)}
    </div>
   </div>
  </details>
  <button className={'hub-nav-trigger '+(active==='passport'?'is-active':'')} onClick={()=>nav('passport')}>
   <span className="hub-nav-icon" aria-hidden="true">📖</span> Passport
  </button>
  <button className={'hub-nav-trigger '+(active==='wallet'?'is-active':'')} onClick={()=>nav('wallet')}>
   <span className="hub-nav-icon" aria-hidden="true">🎟️</span> Wallet
  </button>
  <details className="hub-menu" ref={future} onToggle={e=>{
   if(e.currentTarget.open)for(const m of [games,events,notes])if(m.current)m.current.open=false;
  }}>
   <summary className="hub-nav-trigger">
    <span className="hub-nav-icon" aria-hidden="true">✨</span> Coming soon <span className="hub-chevron" aria-hidden="true">⌄</span>
   </summary>
   <div className="hub-popover hub-popover-future">
    <div className="hub-popover-heading"><strong>Dreams in the workshop</strong><small>No launch dates yet</small></div>
    {comingSoonGames.map(game=><button className="hub-popover-item" key={game.name} onClick={()=>peek(game.name)}>
     <span className="hub-popover-emoji" aria-hidden="true">{game.icon}</span>
     <span><strong>{game.name}</strong><small>{game.tag}</small></span><span className="hub-item-arrow">↗</span>
    </button>)}
    <button className="hub-menu-footer-link" onClick={jump}>Visit the future-game shelf ↗</button>
   </div>
  </details>
  <details className="hub-menu hub-events-menu" ref={events} onToggle={e=>{
   if(e.currentTarget.open)for(const m of [games,future,notes])if(m.current)m.current.open=false;
  }}>
   <summary className="hub-nav-trigger">
    <span className="hub-nav-icon" aria-hidden="true">🗓️</span> Events <span className="hub-chevron" aria-hidden="true">⌄</span>
   </summary>
   <div className="hub-popover hub-popover-events">
    <div className="hub-popover-heading"><strong>On the calendar</strong><small>Closest first · annual occasions</small></div>
    {calendar.map(event=><button className="hub-event-item" key={event.id} onClick={()=>nav(event.route)}>
     <div className="hub-event-date"><strong>{event.date.toLocaleDateString(undefined,{day:'numeric'})}</strong><small>{event.date.toLocaleDateString(undefined,{month:'short',year:'numeric'})}</small></div>
     <div><strong>{event.icon} {event.label}</strong><p>{event.summary}</p><span>{event.status==='playing'?'Game available now':'Birthday preview · not live'}</span></div>
    </button>)}
   </div>
  </details>
  <details className="hub-menu hub-mail-menu" ref={notes} onToggle={e=>{
   if(e.currentTarget.open)for(const m of [games,future,events])if(m.current)m.current.open=false;
  }}>
   <summary className="hub-nav-trigger hub-mail-trigger" aria-label="Developer postbox: read workshop notes" title="Developer postbox">
    <span className="hub-nav-icon" aria-hidden="true">✉️</span><span className="hub-mail-label">Postbox</span><span className="hub-mail-dot" aria-hidden="true"/>
   </summary>
   <div className="hub-popover hub-popover-mail">
    <div className="hub-popover-heading"><strong>✉️ Notes from the workshop</strong><small>Little letters from the developer</small></div>
    {developerNotes.map(note=><article className="hub-note" key={note.id}>
     <div className="hub-note-top"><strong>{note.icon} {note.title}</strong><small>{note.date}</small></div>
     <p>{note.message}</p>
    </article>)}
    <p className="hub-note-foot">This is a read-only noticeboard; no message is sent or collected.</p>
   </div>
  </details>
 </nav>;
}
