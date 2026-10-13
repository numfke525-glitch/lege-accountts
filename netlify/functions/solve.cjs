const {gemini,reply,SYSTEM_SOLVE}=require('./_gemini.cjs');
exports.handler=async(event)=>{
 if(event.httpMethod!=='POST')return reply(405,{error:'POST only'});
 try{
  if((event.body||'').length>150000)return reply(413,{error:'Question too long'});
  const q=JSON.parse(event.body||'{}');
  if(!Array.isArray(q.transactions)||q.transactions.length>80)return reply(400,{error:'Invalid question'});
  const result=await gemini([{text:JSON.stringify(q)}],SYSTEM_SOLVE);
  return reply(200,result);
 }catch(e){return reply(500,{error:e.message})}
};
