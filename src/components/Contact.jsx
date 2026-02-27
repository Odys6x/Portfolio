import { useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { id:'github', emoji:'🐙', label:'GitHub', ja:'ギットハブ', sub:'github.com/Odys6x', href:'https://github.com/Odys6x', bg:'linear-gradient(135deg, #e8f0ff, #d0e0ff)', border:'#92b4ff', shadow:'#5577ee', color:'#2244bb', tape:'rgba(180,200,255,0.85)', rotate:-1.5 },
  { id:'linkedin', emoji:'💼', label:'LinkedIn', ja:'リンクトイン', sub:'linkedin.com/in/owenwong', href:'https://linkedin.com/in/owenwong', bg:'linear-gradient(135deg, #e8fff4, #ccf5e4)', border:'#7ddaaa', shadow:'#3aaa70', color:'#1a7a48', tape:'rgba(180,255,210,0.85)', rotate:1 },
  { id:'email', emoji:'💌', label:'Email', ja:'メール', sub:'phoinexw@gmail.com', href:'mailto:phoinexw@gmail.com', bg:'linear-gradient(135deg, #fff0f5, #ffd6e8)', border:'#ffaacc', shadow:'#ee6699', color:'#cc2266', tape:'rgba(255,180,210,0.85)', rotate:-0.8 },
]


function LinkCard({ link, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a href={link.href} target={link.id!=='email'?'_blank':undefined} rel="noopener noreferrer"
      initial={{ opacity:0, y:40, rotate:link.rotate }} whileInView={{ opacity:1, y:0, rotate:link.rotate }} viewport={{ once:true }}
      transition={{ delay:index*0.12, duration:0.55, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-12, rotate:0, scale:1.05, zIndex:10 }}
      onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
      style={{ position:'relative', textDecoration:'none', display:'block' }}>
      <div style={{ position:'absolute', top:-10, left:'50%', transform:`translateX(-50%) rotate(${link.rotate*-1.5}deg)`, width:55, height:15, background:link.tape, borderRadius:3, boxShadow:'0 1px 4px rgba(0,0,0,0.1)', zIndex:2 }}/>
      <div style={{ background:link.bg, border:`2.5px solid ${link.border}`, borderRadius:20, padding:'28px 28px 22px', boxShadow:`3px 5px 0 ${link.shadow}, 0 8px 24px rgba(0,0,0,0.07)`, position:'relative', overflow:'hidden' }}>
        {Array.from({length:6}).map((_,i)=><div key={i} style={{ position:'absolute', left:0, right:0, top:24+i*22, height:1, background:link.border, opacity:0.2, pointerEvents:'none' }}/>)}
        <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:18 }}>
          <motion.div animate={{ rotate:hovered?[0,-15,15,-10,10,0]:0 }} transition={{ duration:0.5 }} style={{ fontSize: 56, lineHeight:1, flexShrink:0, filter:'drop-shadow(2px 3px 4px rgba(0,0,0,0.12))' }}>{link.emoji}</motion.div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:2 }}>
              <p style={{ fontFamily:"'Caveat', cursive", fontSize: 34, fontWeight:700, color:link.color, margin:0, lineHeight:1 }}>{link.label}</p>
              <span style={{ fontFamily:"'Caveat', cursive", fontSize: 18, fontWeight:600, color:link.color, opacity:0.5, letterSpacing:'0.05em' }}>{link.ja}</span>
            </div>
            <p style={{ fontFamily:"'Caveat', cursive", fontSize: 19, fontWeight:600, color:link.color, opacity:0.36, margin:0 }}>{link.sub}</p>
          </div>
          <motion.div animate={{ x:hovered?6:0 }} transition={{ type:'spring', stiffness:400 }} style={{ fontFamily:"'Caveat', cursive", fontSize: 34, fontWeight:700, color:link.color, opacity:0.5, flexShrink:0 }}>→</motion.div>
        </div>
      </div>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" style={{ background: 'transparent', position: 'relative', zIndex: 1, padding:'80px 24px 60px', overflow:'hidden' }}>
      <motion.div initial={{ opacity:0, y:-20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:50 }}>
        <p style={{ fontFamily:"'Caveat', cursive", fontSize: 22, fontWeight:700, color:'#7a9ab5', letterSpacing:'0.3em', margin:'0 0 6px' }}>連絡先 — contact</p>
        <h2 style={{ fontFamily:"'Caveat', cursive", fontSize: 60, fontWeight:700, color:'#2a3a50', margin:'0 0 14px', lineHeight:1 }}>Let's Connect!</h2>
        <svg viewBox="0 0 300 10" style={{ width:240, display:'block', margin:'0 auto 16px' }}>
          <path d="M0,5 C30,1 60,9 90,5 C120,1 150,9 180,5 C210,1 240,9 270,5 C285,1 296,8 300,5" fill="none" stroke="#ff9eb5" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
          style={{ display:'inline-block', background:'linear-gradient(135deg, #fffdf6, #fff8e8)', border:'2.5px solid #ffd93d', borderRadius:14, padding:'10px 24px', boxShadow:'2px 3px 0 #d4a800', position:'relative' }}>
          <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%) rotate(-3deg)', width:48, height:14, background:'rgba(255,211,70,0.8)', borderRadius:3 }}/>
          <p style={{ fontFamily:"'Caveat', cursive", fontSize: 22, fontWeight:600, color:'#7a5800', margin:0 }}>whether it's a job opp, collab, or just a chat — inbox always open</p>
        </motion.div>
      </motion.div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:32, maxWidth:1000, margin:'0 auto 60px', alignItems:'start' }}>
        {LINKS.map((link,i) => <LinkCard key={link.id} link={link} index={i}/>)}
      </div>
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.5 }} style={{ textAlign:'center' }}>
        <svg viewBox="0 0 400 10" style={{ width:'60%', maxWidth:500, display:'block', margin:'0 auto 16px' }}>
          <path d="M0,5 C40,1 80,9 120,5 C160,1 200,9 240,5 C280,1 320,9 360,5 C380,1 396,8 400,5" fill="none" stroke="#ffb3cc" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,4"/>
        </svg>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:8, ease:'linear' }} style={{ fontSize:16 }}>✦</motion.div>
          <motion.div animate={{ scale:[1,1.3,1] }} transition={{ repeat:Infinity, duration:1.5 }} style={{ fontSize:16 }}>♡</motion.div>
        </div>
      </motion.div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');`}</style>
    </section>
  )
}