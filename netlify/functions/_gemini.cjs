const SYSTEM_EXTRACT = `Read the accounting question in the image accurately. Return ONLY JSON object: {business:string,period:string,question:string,requirements:string[],transactions:[{date:string,description:string,amounts:[number],parties:string[],uncertain:boolean}],warnings:string[]}. Do not invent unclear text or amounts. Include all transactions. Mark uncertainty and warn. Use the same language as source question.`;
const SYSTEM_SOLVE = `You are an expert accounting teacher. Solve only the confirmed accounting question. Return ONLY JSON object {journal:[{date:string,debitAccount:string,creditAccount:string,debit:number,credit:number,narration:string,explanation:string}],extraEntries:[{date:string,lines:[{account:string,debit:number,credit:number}],narration:string}],tAccounts:[{account:string,debits:[{date:string,amount:number}],credits:[{date:string,amount:number}],balance:number,side:string}],trialBalance:[{account:string,debit:number,credit:number}],totalDebit:number,totalCredit:number,notes:string[],warnings:string[]}. For compound journal entries use extraEntries with multiple lines; journal for simple entries. Use standard accrual accounting and periodic inventory if purchases account is used. Do not record hiring alone. Return correct amounts, no invented transactions. Include T accounts and trial balance derived from entries. Validate debit=credit; flag inconsistent facts. Explain in easy Roman Urdu. Avoid duplicating entries in journal and extraEntries.`;
async function gemini(parts, instruction) {
 const key=process.env.GEMINI_API_KEY;
 if(!key)throw Error('GEMINI_API_KEY is missing in Netlify environment variables.');
 const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
 const url=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
 const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),26000);
 try {
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({systemInstruction:{parts:[{text:instruction}]},contents:[{role:'user',parts}],generationConfig:{responseMimeType:'application/json',temperature:0.1}}),signal:controller.signal});
  const body=await response.json();
  if(!response.ok)throw Error(body.error?.message||`Gemini error (${response.status})`);
  const output=body.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('');
  if(!output)throw Error('Gemini returned no answer. Try another photo.');
  return JSON.parse(output);
 } finally {clearTimeout(timer)}
}
const reply=(status,obj)=>({statusCode:status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(obj)});
module.exports={gemini,reply,SYSTEM_EXTRACT,SYSTEM_SOLVE};
