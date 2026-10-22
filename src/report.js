import {NOTE_EN, TASK_EN} from './observation.js';
export const STATUS = { independent: '独立完成', prompt: '提示后完成', supported: '需要支持', unseen: '尚未观察' };
export const TASKS = [
  [1,'天气统计','找出天气表中出现最多的天气','数据理解','independent','能从天气表中找到天数最多的天气。'],
  [2,'图形拼搭','用三角形拼成火箭','图形与空间','independent','独立完成拼搭，愿意调整三角形的方向。'],
  [3,'方位表达','摆放贴纸并描述兔子的位置','方位与表达','prompt','能摆放贴纸；描述前后位置时，需要重复一次提问。'],
  [4,'分橙子','给 Squary 补上橙子，让两组一样多','数量补足','prompt','面对 6 个和 2 个橙子，口头作答时不确定；逐个配对后，能补上 4 个。'],
  [5,'火箭里的图形','数一数不同图形，并写下数量','分类与计数','independent','能够分类点数；数量表达与书写分别观察。'],
  [6,'风扇叶片','按原题记录叶片数量任务','数量关系','independent','逐个数出缺少的风扇叶片，共 6 个。'],
  [7,'小鱼规律','找出规律并补上小鱼','规律推理','independent','能接着已有规律继续摆放小鱼。'],
  [8,'消失的帽子','找出缺失的帽子，说明排除理由','表达思路','supported','能选出帽子；说明为什么排除其他选项时，需要老师多次追问。'],
  [9,'寻找 Squary','沿路线找到 Squary','路径与空间','independent','能沿路径追踪到目标。'],
  [10,'狮子的蛋糕','根据线索选择蛋糕','条件推理','prompt','老师帮助排除巧克力蛋糕后，能从剩余选项中选出 B。'],
  [11,'外星人朋友','画三只眼睛，添加身体并介绍作品','创作与表达','independent','完成三只眼睛的创作，愿意介绍自己的角色。']
].map(([id,title,prompt,skill,status,note])=>({id,title,prompt,skill,status,note,noteEn:NOTE_EN[id],support:status==='prompt'?'一次口头或操作提示':status==='supported'?'多次追问或示范':status==='independent'?'无提示':'未观察'}));
export const INITIAL_PROFILE = {name:'小宇',age:'4岁8个月',date:'2026-10-22',mode:'校区现场',language:'中文为主，英语辅助',context:'校区现场；集体活动后进入测评室，逐人完成 11 项任务。示例观察。'};
export const PLANS = {
 practice:{key:'practice',title:'在熟悉任务里逐步减少提示',home:'让孩子先试一试',question:'你准备怎样做？需要我帮什么？',course:null,topic:null,source:'',reason:'本次还有需要支持的任务；先请老师明确活动目标，暂不自动匹配课程。',qualification:'结合下方原始观察选择相近活动，保留孩子自己的解决方法。',steps:['和老师选择一个与观察任务相近、材料熟悉的小活动。','先让孩子尝试，再提供必要提示，并记录具体帮助。','换一种材料再次尝试，与老师讨论是否调整目标。']},
 reasoning:{key:'reasoning',title:'把选择的理由说清楚',home:'玩具小侦探',question:'你为什么选它？也可以指一指线索。',course:null,topic:null,source:'',reason:'先了解孩子如何解释选择，再由老师核对长期班中是否有合适的比较、排除与表达活动。',qualification:'当前不把表达困难直接等同于逻辑能力不足。',steps:['摆出三个熟悉的玩具，按一个特征找出不同的一个。','问“你看到什么线索？”，允许指认或用熟悉的语言回答。','换一个特征，让孩子解释选择，并记录需要的提示。']},
 language:{key:'language',title:'先确认指令理解，再判断学习需要',home:'用熟悉的语言说一说',question:'你听到的任务是什么？也可以用动作告诉我。',course:null,topic:null,source:'',reason:'指令理解尚需核对，暂不依据该表现推荐数学补弱课程。',qualification:'先在孩子熟悉的语言与适当支持下补充观察，再讨论学习计划。',steps:['用孩子熟悉的语言简短说明要求，允许用动作回应。','在不提供解题方法的前提下，请孩子复述或示意要做什么。','记录理解指令后的表现，再与老师讨论学习目标。']},
 quantity:{key:'quantity',title:'把两组变得一样多',home:'给玩偶分积木',question:'还差几个，才能一样多？',course:'Insect World',topic:'Whole and Parts',source:'所提供 PreK Fall Syllabus · Topic 11',reason:'整体与部分的关系，可为理解“已有多少、还差多少”提供练习机会。',qualification:'属于相关能力支持，是否适合当前孩子与实际班型，仍需老师确认。',steps:['给两个玩偶各摆一组积木，鼓励孩子逐个配对。','换一组数量，减少提示，让孩子自己补齐。','用新的相似任务再试一次，记录需要多少帮助。']},
 pattern:{key:'pattern',title:'说清自己发现的规律',home:'一起找规律',question:'你发现了什么？为什么接下来是它？',course:'Unforgettable Trip',topic:'Pattern',source:'所提供 PreK Fall Syllabus · Topic 7',reason:'大纲包含寻找重复规律，可提供表达规律、解释选择的练习机会。',qualification:'表达观察需结合孩子熟悉的语言；课程安排由老师确认。',steps:['用两种玩具摆出重复规律，请孩子接着摆。','让孩子说说为什么这样摆，也可以用手指着解释。','换一组物品，听听孩子能否解释自己的规律。']},
 spatial:{key:'spatial',title:'说清物体的位置',home:'玩偶在哪里',question:'你能告诉我，它在什么位置吗？',course:'Lucky Ring',topic:'Left and Right',source:'所提供 PreK Fall Syllabus · Topic 14',reason:'方位词相关主题可提供位置描述机会；左右与前后并非同一知识点。',qualification:'这是相关主题候选，需老师确认具体活动是否覆盖本次观察的方位词。',steps:['把玩偶放在盒子前后，让孩子用熟悉的语言描述。','交换角色，由孩子描述位置，家长来摆放。','换一个新物品，看看是否能独立描述位置。']},
 extend:{key:'extend',title:'把方法用到新的任务里',home:'小小老师讲一讲',question:'你是怎样发现这个方法的？',course:null,topic:null,source:'',reason:'本次没有需要优先匹配课程的已观察项目。',qualification:'先进行日常迁移练习，再由老师补充观察。',steps:['请孩子选一个喜欢的任务，再讲一遍自己的办法。','更换物品或场景，尝试用同一个方法解决。','记录新的表现，与老师一起确认下一步。']},
 observe:{key:'observe',title:'先补充观察，再确定练习目标',home:'一起玩一次熟悉的游戏',question:'你想怎样试一试？',course:null,topic:null,source:'',reason:'目前没有足够观察支持课程匹配。',qualification:'尚未观察不代表能力较弱。',steps:['从孩子熟悉的材料和语言开始。','记录孩子怎样做，以及需要的帮助。','请老师依据新证据确认学习目标。']}
};
export function deriveReport(tasks,profile){
 const q=id=>tasks.find(x=>x.id===id); const observed=tasks.filter(t=>t.status!=='unseen');
 const needs=id=>['prompt','supported'].includes(q(id).status)&&!['unclear','rephrase'].includes(q(id).comprehension);
 const languageTask=tasks.find(t=>t.status!=='unseen'&&['unclear','rephrase'].includes(t.comprehension));
 const otherNeed=observed.find(t=>['prompt','supported'].includes(t.status));
 const key=languageTask?'language':needs(4)?'quantity':needs(8)?'reasoning':needs(7)?'pattern':needs(3)?'spatial':otherNeed?'practice':observed.length?'extend':'observe';
 const focusId=key==='language'?languageTask.id:key==='quantity'?4:key==='reasoning'?8:key==='pattern'?7:key==='spatial'?3:key==='practice'?otherNeed.id:observed[0]?.id;
 const evidence=q(focusId); const plan=PLANS[key];
 const strength=observed.find(t=>t.status==='independent'&&t.id===2)||observed.find(t=>t.status==='independent');
 const summary=key==='language'?'先确认孩子理解了指令，再区分语言支持与概念学习需要。':key==='observe'?'目前观察不足，先记录孩子的具体表现。':`${strength?strength.skill+'任务已能独立完成；':'本次观察中，'}${key==='extend'?'下一步尝试迁移到新场景。':plan.title+'是本周练习重点。'}`;
 const headlineEn=key==='language'?'First, make the directions accessible':key==='observe'?'Gather more observations before choosing a goal':`Our next step: ${PLAN_EN[key].title}`;
 const summaryEn=key==='language'?'Clarify directions before separating language needs from concept learning.':key==='observe'?'There is not enough observation evidence yet.':`${strength?'Completed the '+TASK_EN[strength.id][1].toLowerCase()+' task independently. ':''}${key==='extend'?'Try the idea in a new setting.':'This week’s goal is to '+PLAN_EN[key].title+'.'}`;
 return {plan,focusId,headlineEn,summaryEn,evidenceEn:evidence?.noteEn??NOTE_EN[evidence?.id]??'',headline:['observe','language'].includes(key)?plan.title:`这次，先练习${plan.title}`,summary,evidence: evidence?.note||'暂无观察记录，请老师补充证据。',observed:observed.length,strength:strength?.skill||'继续发现中',profile:{...profile},tasks:tasks.map(t=>({...t})),teacher:'',publishedAt:null};
}
export function validateEvidence(tasks){return tasks.filter(t=>t.status!=='unseen'&&!t.note.trim()).map(t=>t.id);}

export const PLAN_EN={
 practice:{title:'gradually reduce prompts in a familiar task',home:'Let your child try first',question:'How would you try? What help would you like?',reason:'An observed task still needs support. Ask the teacher to clarify the goal before matching a class.',qualification:'Choose a related activity from the recorded observation and preserve the child’s own approach.',steps:['Choose a familiar activity related to the observed task with the teacher.','Let the child try before offering and recording help.','Try new materials and discuss whether to adjust the goal.']},
 reasoning:{title:'explain a choice',home:'Be a toy detective',question:'Why did you choose it? You can point to the clues, too.',reason:'First explore how the child explains a choice. Then ask a teacher about suitable comparison, elimination and communication activities in an ongoing class.',qualification:'Difficulty explaining a choice does not by itself establish difficulty reasoning.',steps:['Compare three familiar toys and find one that differs.','Ask for the clue; accept pointing or a familiar language.','Change the feature and record the prompts needed.']},
 quantity:{title:'make two sets equal',home:'Share blocks with two toys',question:'How many more make the sets equal?',reason:'Exploring whole–part relationships can support thinking about how many there are and how many are missing.',qualification:'This is a related learning opportunity. A teacher still needs to confirm the activity and class fit.',steps:['Pair blocks one by one between two toys.','Try new quantities and gradually reduce prompts.','Try a similar new task and note how much help is needed.']},
 pattern:{title:'explain a pattern',home:'Find a pattern together',question:'What do you notice? Why does that come next?',reason:'The supplied syllabus includes repeating patterns, offering practice in noticing and explaining a choice.',qualification:'Observe explanations in a familiar language and confirm the class activity with the teacher.',steps:['Make a repeating pattern with two kinds of toys.','Let your child explain or point to the pattern.','Change the objects and listen to the explanation.']},
 spatial:{title:'describe where things are',home:'Where is the toy?',question:'Can you tell me where it is?',reason:'The theme practices position language. Left/right and in front/behind are related but different goals.',qualification:'A teacher should confirm that the activity covers the particular position words observed.',steps:['Place a toy in front of or behind a box.','Switch roles: your child gives directions.','Try a new object and observe independent descriptions.']},
 extend:{title:'try the strategy in a new setting',home:'Be the little teacher',question:'How did you find your way?',reason:'No priority course recommendation follows from these observations.',qualification:'Start with everyday opportunities and further observation.',steps:['Let your child explain a favorite task.','Change the materials or setting.','Record what happens and discuss the next step.']},
 observe:{title:'gather more observations',home:'Play a familiar game together',question:'How would you like to try?',reason:'There is not enough observation evidence for course matching.',qualification:'Not observed does not mean low ability.',steps:['Start with familiar language and materials.','Record the action and help provided.','Ask the teacher to confirm a goal from the new evidence.']},
 language:{title:'clarify directions before interpreting performance',home:'Use a familiar language',question:'What is the task asking? You can show me, too.',reason:'Direction comprehension needs clarification, so this performance does not trigger a math remediation recommendation.',qualification:'Observe again with accessible language before discussing a learning plan.',steps:['Explain briefly in a familiar language; allow a gesture or action.','Ask your child to show the task goal without giving a solution.','Record performance after understanding is established.']}
};
