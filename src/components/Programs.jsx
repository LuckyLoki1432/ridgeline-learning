import styles from '../App.module.css';
export const programs=[
{name:'Foundations of Digital Work',level:'6 weeks · Beginner',description:'Build confident digital workflows and everyday problem-solving skills.',image:'/images/program_foundations.svg',alt:'A worksheet with a rising trend line'},
{name:'Creative Problem Solving',level:'8 weeks · All levels',description:'Turn open-ended challenges into practical, testable ideas.',image:'/images/program_creative.svg',alt:'A project checklist with a checkmark'},
{name:'Career-Ready Projects',level:'10 weeks · Intermediate',description:'Create a polished body of work with structured milestones.',image:'/images/program_career.svg',alt:'A project portfolio with a rising line'}
];
export default function Programs(){return <section id="programs" className={styles.section} aria-labelledby="programs-title"><div className={styles.sectionHeading}><h2 id="programs-title">Choose the next step that fits you</h2></div><div className={styles.programGrid}>{programs.map(p=><article className={styles.programCard} key={p.name}><img src={p.image} alt={p.alt} width="420" height="260" loading="lazy"/><p className={styles.programMeta}>{p.level}</p><h3>{p.name}</h3><p className={styles.programDescription}>{p.description}</p></article>)}</div></section>}
