
module.exports = {
    helloworld: (req,res)=>{
        res.json({xinchao:'chao long'});
    },
    login: (req,res)=>{
        res.json({status: 'login success'});
    }
}