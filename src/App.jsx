import React, {useState, useEffect, useRef} from 'react';
import {ArrowRight, ArrowLeft, CheckCircle, Circle, Sparkle, Plant, Shapes, ChatCircleDots, House, BookOpen, Info, CaretDown, CaretRight, X, PencilSimple, DownloadSimple, Printer, ClipboardText, Student, UsersThree, WarningCircle, Check, SpeakerHigh} from '@phosphor-icons/react';
import {TASKS, STATUS, INITIAL_PROFILE, deriveReport, validateEvidence,PLAN_EN} from './report';
import {Modal} from './ReportModal';
import {ParentReport,STATUS_EN} from './ParentReport';
import {RUBRICS,INITIAL_OBSERVATIONS,ensureTask,CONTEXT_OPTIONS,OBS_STATUS,languageReview} from './observation';
import {ROSTER,GROUP_INITIAL,FIT_INITIAL,SessionHeader,GroupStage,ReadinessEditor} from './SessionFlow';
import {ObservationEditor,TaskContext} from './TeacherObservations';

const STORAGE='think-campus-prototype-v2';
function readSaved(){try {return JSON.parse(localStorage.getItem(STORAGE))} catch{return null}}
const seed=readSaved();
function downloadJSON(data){const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})); const a=document.createElement('a');a.href=u;a.download='Think_Academy_Evaluation_Demo.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
const skillIcons=[Shapes,Plant,ChatCircleDots];
function Status({value}){return <span className={`status ${value}`}>{STATUS[value]}</span>}

export function App(){
 const [view,setView]=useState('parent');
 const [tasks,setTasks]=useState((seed?.tasks||TASKS).map(ensureTask));
 const [observations,setObservations]=useState(seed?.observations||INITIAL_OBSERVATIONS);
 const [lang,setLang]=useState('en');
 const en=lang==='en';
 const [profile,setProfile]=useState(seed?.profile||INITIAL_PROFILE);
 const [childId,setChildId]=useState(seed?.childId||'xiaoyu');
 const [records,setRecords]=useState(seed?.records||{});
 const [stage,setStage]=useState('group');
 const [group,setGroup]=useState(seed?.group||GROUP_INITIAL);
 const [fit,setFit]=useState(seed?.fit||FIT_INITIAL);
 const [report,setReport]=useState(seed?.report||null);
 const [approved,setApproved]=useState(seed?.approved||false);
 const [selected,setSelected]=useState(4);
 const [reviewed,setReviewed]=useState(false);
 const [teacher,setTeacher]=useState(seed?.report?.teacher||'');
 const [modal,setModal]=useState(null);
 const [toast,setToast]=useState('');
 const [storageOK,setStorageOK]=useState(true);
 const [busy,setBusy]=useState(false);
 const [allTasks,setAllTasks]=useState(false);
 const [formError,setFormError]=useState('');
 const editorRef=useRef(null);
 const generationRef=useRef(0);
 useEffect(()=>{document.documentElement.lang=lang==='en'?'en':'zh-CN'},[lang]);
 const current={...(report||deriveReport(tasks,profile)),observations:report?.observations||observations,group:report?.group||group,fit:report?.fit||fit};
 useEffect(()=>{try{localStorage.setItem(STORAGE,JSON.stringify({tasks,profile,report,approved,observations,childId,records,group,fit}));setStorageOK(true)}catch{setStorageOK(false)}},[tasks,profile,report,approved,observations,childId,records,group,fit]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),3500);return()=>clearTimeout(t)},[toast]);
 useEffect(()=>{const onKey=e=>{if(e.key==='Escape')setModal(null)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);
 const switchView=v=>{setView(v);setModal(null);window.scrollTo(0,0)};
 const invalidate=()=>{generationRef.current++;setBusy(false);setReport(null);setApproved(false);setReviewed(false);setFormError('')};
 const switchChild=id=>{if(id===childId)return;const currentRecord={tasks,profile,report,approved,observations,group,fit};setRecords(prev=>({...prev,[childId]:currentRecord}));const child=ROSTER.find(c=>c.id===id);const r=records[id]||{tasks:TASKS.map(t=>ensureTask({...t,status:'unseen',note:'',noteEn:'',support:'未观察',comprehension:'unobserved'})),profile:{...INITIAL_PROFILE,name:child.name,age:child.age,language:'To confirm with family'},report:null,approved:false,observations:INITIAL_OBSERVATIONS.map(o=>({...o,status:'unseen',note:'',noteEn:'',next:'',nextEn:''})),group:{...GROUP_INITIAL,participation:'Not observed',completion:'Not observed',collaboration:'Not observed',note:'',noteZh:'',support:'',supportZh:''},fit:{decision:'pending',reason:'',reasonZh:'',support:'',supportZh:''}};setChildId(id);setTasks(r.tasks);setProfile(r.profile);setReport(r.report);setApproved(r.approved);setObservations(r.observations);setGroup(r.group);setFit(r.fit);setReviewed(false);setTeacher(r.report?.teacher||'');setFormError('')};
 const updateTask=(key,value)=>{setTasks(ts=>ts.map(t=>t.id===selected?{...t,[key]:value,...(key==='note'?{noteEn:''}:{}),...(key==='status'?{support:value==='independent'?'无提示':value==='unseen'?'未观察':t.support==='无提示'||t.support==='未观察'?'请补充提示方式':t.support}:{})}:t));invalidate()};
 const updateProfile=(key,value)=>{setProfile(p=>({...p,[key]:value}));invalidate()};
 const generate=()=>{const missing=validateEvidence(tasks);if(!profile.name.trim()||!profile.age.trim()){setFormError('请先填写孩子称呼和年龄。');return}if(missing.length){setSelected(missing[0]);setFormError(`任务 ${missing.join('、')} 缺少观察证据，请补充后再整理。`);return}const missingWhole=observations.find(o=>o.status!=='unseen'&&(!o.note.trim()||!o.next.trim()));if(missingWhole){setFormError(missingWhole.label+'：请补充具体行为和下一步支持。');return}const generation=++generationRef.current;setBusy(true);setFormError('');setTimeout(()=>{if(generation!==generationRef.current)return;setReport({...deriveReport(tasks,profile),observations:observations.map(o=>({...o})),group:{...group},fit:{...fit}});setApproved(false);setReviewed(false);setBusy(false);setToast('已依据记录整理草稿，请老师核对并改写。');setTimeout(()=>editorRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),80)},650)};
 const updateReport=(key,value)=>{setReport(r=>({...r,[key]:value,...(['headline','summary','action'].includes(key)?{[key+'En']:''}:{})}));setApproved(false);setReviewed(false)};
 const publish=()=>{if(tasks.some(t=>t.status==='unseen')||!group.note.trim()||!group.observer.trim()){setFormError('Please complete the group note, observer and all 11 individual tasks before confirming.');return}if(fit.decision!=='pending'&&(!fit.reason.trim()||!fit.support.trim())){setFormError('Please add evidence and starting support for the class recommendation.');return}if(!report||!reviewed||!teacher.trim()){setFormError('请填写审核老师，并确认观察与建议。');return}setReport(r=>({...r,teacher:teacher.trim(),publishedAt:new Date().toISOString()}));setApproved(true);setFormError('');setToast('已在本机确认报告，可查看家长与学生版本。');switchView('parent')};
 const task=tasks.find(t=>t.id===selected);
 return <>
 <header className={`appbar ${en?'english':''}`}><div className="appbar-inner"><button className="brand-button" onClick={()=>switchView('parent')} aria-label="返回家长报告"><img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="Think Academy"/></button><span className="app-name">{en?'Growth Notes':'成长观察室'}</span><nav aria-label="切换使用视角">{[['parent',en?'Parent report':'家长报告',UsersThree],['teacher',en?'Teacher workspace':'老师工作台',ClipboardText],['student',en?'Little explorer':'孩子的冒险',Student]].map(([v,label,Icon])=><button key={v} className={view===v?'active':''} onClick={()=>switchView(v)}><Icon size={18}/><span>{label}</span></button>)}</nav><span className="demo-mark">{en?'Demo':'交互演示'}</span></div></header>
 <div className="workspace-note"><span><span className="live-dot"/> {en?'Fictional sample · Saved in this browser':'虚构学生数据 · 仅保存在当前浏览器'}</span><button onClick={()=>setModal('about')}>{en?'How it works':'流程与提效说明'} <Info size={14}/></button></div>
 {view==='parent'&&<ParentReport current={current} approved={approved} lang={lang} setLang={setLang} allTasks={allTasks} setAllTasks={setAllTasks} setModal={setModal} onExport={()=>downloadJSON({profile:current.profile,tasks:current.tasks,report:current,status:approved?'teacher_confirmed':'draft',demo:true})}/>}
 {view==='teacher'&&<main className="teacher-shell"><div className="page-title"><div><p className="eyebrow">TEACHER WORKSPACE</p><h1>把观察留下，让建议有依据。</h1><p>快速记录每一题，保留你的专业判断。</p></div><span className="save-state"><CheckCircle/>{storageOK?'已自动保存在本机':'本机存储不可用，请导出记录'}</span></div>
 <SessionHeader childId={childId} onChild={switchChild} stage={stage} setStage={setStage} tasks={tasks} group={group} records={records}/>
 {stage==='group'&&<GroupStage group={group} setGroup={g=>{setGroup(g);invalidate()}} onNext={()=>setStage('individual')}/>}
 {stage==='individual'&&<>
 <section className="profile-panel"><h2>测评信息</h2><div className="profile-fields"><label>孩子称呼<input value={profile.name} onChange={e=>updateProfile('name',e.target.value)}/></label><label>年龄<input value={profile.age} onChange={e=>updateProfile('age',e.target.value)}/></label><label>测评日期<input type="date" value={profile.date} onChange={e=>updateProfile('date',e.target.value)}/></label><label>现场测评<input value="In-person · Campus" readOnly/></label><label>孩子熟悉的语言<input value={profile.language} onChange={e=>updateProfile('language',e.target.value)}/></label></div><label className="context-field">情境补充 <span>记录现场环境、疲劳或成人帮助，不直接解释成能力问题。</span><input value={profile.context} onChange={e=>updateProfile('context',e.target.value)}/></label></section>
 <div className="teacher-grid"><aside className="task-navigation"><h2>任务记录 <span>{tasks.filter(t=>t.status!=='unseen').length}/11</span></h2>{tasks.map(t=><button className={selected===t.id?'selected':''} onClick={()=>setSelected(t.id)} key={t.id}><span className="task-index">{String(t.id).padStart(2,'0')}</span><span>{t.title}<small>{t.skill}</small></span>{t.status==='unseen'?<Circle size={15}/>:<CheckCircle size={15} weight="fill"/>}</button>)}</aside>
 <section className="task-editor"><div className="editor-heading"><div><span className="section-kicker">TASK {String(task.id).padStart(2,'0')} / 11</span><h2>{task.title}</h2><p>{task.prompt}</p></div><Status value={task.status}/></div>{task.id===4&&<div className="source-task"><img src={`${import.meta.env.BASE_URL}assets/oranges-task.png`} alt="测评原题：6个橙子与2个橙子"/><p>原题观察：需要补上 4 个。<br/>同时记录孩子如何得到答案。</p></div>}
 <fieldset><legend>本次完成情况</legend><div className="rating-options">{Object.entries(STATUS).map(([key,label])=><button key={key} aria-pressed={task.status===key} className={task.status===key?'chosen':''} onClick={()=>updateTask('status',key)}>{task.status===key?<CheckCircle weight="fill"/>:<Circle/>}{label}</button>)}</div><p className="field-help">独立完成：无解题提示；提示后完成：有限提示；需要支持：持续引导或尚未完成。记录完成时所需支持，不替代本题原始等级。</p></fieldset>
 <label>提供了什么帮助？<input value={task.support} onChange={e=>updateTask('support',e.target.value)} placeholder="例如：提示逐个配对，未直接告知答案"/></label>
 <label>你的观察 <span className="required">{task.status==='unseen'?'可补充未观察原因':'已观察任务必填'}</span><textarea rows="4" value={task.note} onChange={e=>updateTask('note',e.target.value)} placeholder="记录孩子做了什么、说了什么、提示后发生了什么。"/></label>
 <TaskContext task={task} updateTask={updateTask}/><div className="teacher-tip"><Info size={19}/><span>保持你的原话。AI 只依据已录入的观察整理建议；没有证据的结论不进入报告。</span></div><div className="task-pager"><button disabled={selected===1} onClick={()=>setSelected(selected-1)}><ArrowLeft/>上一题</button><button disabled={selected===11} onClick={()=>setSelected(selected+1)}>下一题<ArrowRight/></button></div></section></div>
 <ObservationEditor observations={observations} setObservations={setObservations} invalidate={invalidate}/><div className="stage-next"><span>Each child has an individual record.</span><button className="primary" onClick={()=>setStage('review')}>Review both settings <ArrowRight/></button></div></>}
 {stage==='review'&&<><ReadinessEditor fit={fit} setFit={f=>{setFit(f);invalidate()}} group={group} tasks={tasks}/>
 <div className="generate-panel"><div><h3>记录完成后，整理一份家长能读懂的报告。</h3><p>本演示采用本地规则模拟 AI，没有接入模型服务。</p></div><button className="primary" disabled={busy} onClick={generate}><Sparkle size={20}/>{busy?'正在整理观察…':'AI 整理报告（演示）'}</button></div>{formError&&<div className="form-error" role="alert"><WarningCircle/>{formError}</div>}
 {report&&<section className="review-panel" ref={editorRef}><div className="section-heading"><h2>老师确认与改写</h2><span>草稿 · 每句话都可以修改</span></div><p className="field-help">本地规则选中了「{report.plan.title}」。如结论不准确，请修改原始记录重新生成，或直接改写下面的呈现内容。</p><label>报告重点<input value={report.headline} onChange={e=>updateReport('headline',e.target.value)}/></label><label>给家长的一句话<textarea rows="2" value={report.summary} onChange={e=>updateReport('summary',e.target.value)}/></label><label>家庭练习提示<input value={report.action||report.plan.question} onChange={e=>updateReport('action',e.target.value)}/></label><details className="translation-editor"><summary>英文报告审核与改写</summary><label>Report focus<input value={report.headlineEn||''} onChange={e=>updateReport('headlineEn',e.target.value)}/></label><label>Summary<textarea value={report.summaryEn||''} onChange={e=>updateReport('summaryEn',e.target.value)} rows="2"/></label><label>Home activity prompt<input value={report.actionEn??(report.action?'':PLAN_EN[report.plan.key].question)} onChange={e=>updateReport('actionEn',e.target.value)}/></label></details><label>审核老师<input value={teacher} onChange={e=>{setTeacher(e.target.value);setReviewed(false)}} placeholder="请输入老师称呼"/></label><label className="checkbox-label"><input type="checkbox" checked={reviewed} onChange={e=>setReviewed(e.target.checked)}/>我已核对观察证据、表现描述和学习建议，确认适合本次报告。</label><div className="review-actions"><button className="secondary" onClick={()=>switchView('parent')}>预览家长报告</button><button className="primary" disabled={!reviewed||!teacher.trim()} onClick={publish}>确认并生成报告 <ArrowRight/></button></div><small>本机演示操作，不会发送给真实家长。修改观察后需要重新确认。</small></section>}
 </>}
 <div className="teacher-bottom"><button className="text-link" onClick={()=>{downloadJSON({profile,tasks,observations,group,fit,report,approved,demo:true});setToast('已导出结构化测评记录。')}}><DownloadSimple/>导出结构化记录</button><button className="text-link" onClick={()=>setModal('reset')}>恢复演示数据</button></div></main>}
 {view==='student'&&<StudentView report={current} onParent={()=>switchView('parent')}/>}
 {modal&&<Modal modal={modal} report={current} lang={lang} onClose={()=>setModal(null)} onReset={()=>{setChildId('xiaoyu');setRecords({});setGroup({...GROUP_INITIAL});setFit({...FIT_INITIAL});setTasks(TASKS.map(ensureTask));setObservations(INITIAL_OBSERVATIONS.map(o=>({...o})));setProfile({...INITIAL_PROFILE});setReport(null);setApproved(false);setTeacher('');setReviewed(false);setModal(null);setToast('已恢复虚构示例。')}}/>}
 {toast&&<div className="toast" role="status"><CheckCircle weight="fill"/>{toast}</div>}
 </>
}
function StudentView({report,onParent}){
 const [stage,setStage]=useState('welcome');const [answer,setAnswer]=useState(null);const [message,setMessage]=useState('');
 useEffect(()=>{setStage('welcome');setAnswer(null);setMessage('')},[report.plan.key]);
 const isQuantity=report.plan.key==='quantity',isPattern=report.plan.key==='pattern';
 const speak=()=>{if(!('speechSynthesis'in window)){setMessage('请家长帮你读一读上面的任务。');return}window.speechSynthesis.cancel();const text=stage==='welcome'?`${report.profile.name}，你好！今天我们来试试${report.plan.home}。`:isQuantity?'上面有六个橙子，下面有两个。还要给下面几个，才会一样多？':isPattern?'红色，蓝色，红色，蓝色，接下来是什么颜色？':report.plan.steps[0];const u=new SpeechSynthesisUtterance(text);u.lang='zh-CN';u.rate=.85;window.speechSynthesis.speak(u)};
 const choose=n=>{setAnswer(n);if(n===(isQuantity?4:'红色')){setStage('success');setMessage('')}else setMessage(isQuantity?'再试试：把上下的橙子一对一配好，看看还空着几个。':'再听听规律：红、蓝、红、蓝……可以请家长和你一起读。')};
 return <main className="student-shell"><div className="student-top"><span>小小探索家 · {report.profile.name}（示例）</span><button className="text-link" onClick={onParent}>家长查看<ArrowRight/></button></div><div className="student-stage"><img className="student-mascot" src={`${import.meta.env.BASE_URL}assets/mascot.png`} alt="学习伙伴"/><span className="student-kicker">每一次尝试，都很棒</span>{stage==='welcome'?<><h1>{report.profile.name}，<br/>来发现你的新本领！</h1><p>今天的任务：{report.plan.home}</p><img className="student-practice" src={`${import.meta.env.BASE_URL}assets/practice.png`} alt="和小熊一起玩积木"/><button className="primary" onClick={()=>setStage('question')}>开始小任务 <ArrowRight size={24}/></button></>:stage==='success'?<><CheckCircle className="celebrate-icon" size={74} weight="duotone"/><h1>{isQuantity||isPattern?'你找到办法了！':'你认真尝试了！'}</h1><p>你愿意尝试、认真观察，真棒。<br/>和家长说说：你是怎么想到的？</p><span className="effort-badge">今天的收获：勇于尝试</span><button className="primary" onClick={()=>{setStage('welcome');setAnswer(null)}}>再玩一次 <ArrowRight/></button><small>一次答对是探索的收获，不代表已稳定掌握。</small></>:<><h1>{isQuantity?'让橙子变得一样多':isPattern?'接下来是什么颜色？':report.plan.home}</h1>{isQuantity?<><img className="student-task-image" src={`${import.meta.env.BASE_URL}assets/oranges-task.png`} alt="上方6个橙子，下方2个橙子"/><p>还要给下面几个，才会一样多？</p><div className="answer-options">{[2,3,4].map(n=><button key={n} className={answer===n?'chosen':''} onClick={()=>choose(n)}>{n}</button>)}</div></>:isPattern?<><p className="pattern-words">红色 · 蓝色 · 红色 · 蓝色 · ?</p><div className="answer-options">{['红色','蓝色'].map(n=><button key={n} className={answer===n?'chosen':''} onClick={()=>choose(n)}>{n}</button>)}</div></>:<><img className="student-practice" src={`${import.meta.env.BASE_URL}assets/practice.png`} alt="小熊和积木"/><p>{report.plan.steps[0]}<br/>请家长陪你一起玩。</p><button className="primary" onClick={()=>setStage('success')}>我尝试过啦 <CheckCircle/></button></>}{message&&<p className="gentle-feedback" role="status">{message}</p>}</>}<button className="listen-button" onClick={speak}><SpeakerHigh size={20} weight="duotone"/>读给我听</button></div><p className="student-footer">与家长一起探索 · 鼓励努力，不作排名</p></main>
}
