import React from 'react';
import {RUBRICS,CONTEXT_OPTIONS,OBS_STATUS} from './observation';

export function TaskContext({task,updateTask}){
 const rubric=RUBRICS[task.id];
 return <div className="task-context">
 <details className="rubric"><summary>查看本题原始评分依据 <span>{rubric?'已录入原材料':'待补充量规'}</span></summary>{rubric?<><small>{rubric.source}</small>{rubric.levels?<dl>{Object.entries(rubric.levels).map(([grade,text])=><div key={grade}><dt>{grade}</dt><dd>{text}</dd></div>)}</dl>:<ul>{rubric.items.map(item=><li key={item}>{item}</li>)}</ul>}</>:<p>提供的材料中尚未找到本题分级说明。保留观察，暂不自动推算等级。</p>}</details>
 {rubric?.levels&&<label>原始任务等级 <select value={task.grade} onChange={e=>updateTask('grade',e.target.value)}><option value="">待老师判断</option>{Object.keys(rubric.levels).map(g=><option key={g}>{g}</option>)}</select><span className="field-help">逐题依据原量规判断，与下方“完成情况”分别记录。</span></label>}
 <div className="context-grid"><label>听题语言<select value={task.directions} onChange={e=>updateTask('directions',e.target.value)}>{['中文','英语','中英切换','动作示范','其他 / 待确认'].map(v=><option key={v}>{v}</option>)}</select></label><label>作答方式<select value={task.response} onChange={e=>updateTask('response',e.target.value)}>{['中文 / 操作','英语 / 操作','中英混合','仅动作 / 指认','未回应'].map(v=><option key={v}>{v}</option>)}</select></label><label className="full-width">孩子是否理解了指令？<select value={task.comprehension} onChange={e=>updateTask('comprehension',e.target.value)}>{Object.entries(CONTEXT_OPTIONS).map(([key,value])=><option key={key} value={key}>{value[0]}</option>)}</select></label></div>
 {['unclear','rephrase'].includes(task.comprehension)&&<p className="context-alert">先核对语言与示范的影响，再解释本题表现。此题暂不触发学科补弱课程建议。</p>}
 <label>孩子用了什么办法？<input value={task.strategy} onChange={e=>updateTask('strategy',e.target.value)} placeholder="如：逐个配对、旋转尝试、排除、反向寻找"/></label>
 <details className="translation-editor"><summary>英文观察（可选，供英文报告使用）</summary><textarea aria-label="本题英文观察" value={task.noteEn} onChange={e=>updateTask('noteEn',e.target.value)} rows="3"/><p className="field-help">修改中文观察后会清空旧译文，避免错用过期翻译。未补译时，英文端保留老师原文并提示。</p></details>
 </div>
}

export function ObservationEditor({observations,setObservations,invalidate}){
 const change=(key,field,value)=>{setObservations(items=>items.map(o=>o.key===key?{...o,[field]:value,...(field==='note'?{noteEn:''}:{}),...(field==='next'?{nextEn:''}:{})}:o));invalidate()};
 return <section className="whole-child-editor"><div className="section-heading"><div><h2>补充：孩子怎样参与和学习</h2><p>保留具体行为、当时情境与有效支持，每个孩子可以不同。</p></div><span>不计入学科总分</span></div><div className="teacher-observation-grid">{observations.map(o=><details key={o.key}><summary><strong>{o.label}</strong><span>{OBS_STATUS[o.status][0]}</span></summary><label>{o.label} · 观察状态<select value={o.status} onChange={e=>change(o.key,'status',e.target.value)}>{Object.entries(OBS_STATUS).map(([key,value])=><option key={key} value={key}>{value[0]}</option>)}</select></label><label>{o.label} · 具体行为<textarea value={o.note} onChange={e=>change(o.key,'note',e.target.value)} rows="3"/></label><label>{o.label} · 下一步支持<textarea value={o.next} onChange={e=>change(o.key,'next',e.target.value)} rows="2"/></label><details className="translation-editor"><summary>英文呈现</summary><label>Observation<textarea value={o.noteEn} onChange={e=>change(o.key,'noteEn',e.target.value)} rows="2"/></label><label>Next step<textarea value={o.nextEn} onChange={e=>change(o.key,'nextEn',e.target.value)} rows="2"/></label></details></details>)}</div><p className="field-help">握笔记录描述实际动作与操作体验。单次表现不用于诊断或贴标签。</p></section>
}
