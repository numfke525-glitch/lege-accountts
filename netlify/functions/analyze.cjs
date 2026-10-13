const {gemini,reply,SYSTEM_EXTRACT}=require('./_gemini.cjs');
exports.handler=async(event)=>{
 if(event.httpMethod!=='POST')return reply(405,{error:'POST only'});
 try{
  const {image,mimeType}=JSON.parse(event.body||'{}');
  if(!['image/jpeg','image/png','image/webp'].includes(mimeType)||typeof image!=='string'||image.length>4_200_000||!image.length)return reply(400,{error:'Upload JPG, PNG or WebP under 3MB.'});
  const result=await gemini([{text:'Extract the complete accounting question, all dates, amounts, parties and required tasks. This is for user verification before solving.'},{inline_data:{mime_type:mimeType,data:image}}],SYSTEM_EXTRACT);
  return reply(200,result);
 }catch(e){return reply(500,{error:e.message})}
};
