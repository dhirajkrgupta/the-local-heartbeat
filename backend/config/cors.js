
const whitelist=['http://localhost:5173']; 

const cor_options={
    origin:(origin,callback)=>{
        if(whitelist.includes(origin)||!origin){
            callback(null,true);
        }else{
            callback(null,false);
        }
    },
    credentials: true // allow cookies
}

export default cor_options;