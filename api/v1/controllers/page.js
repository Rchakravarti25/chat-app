module.exports = {
    index : function(req,res,next){
        res.render("index",{"title":"Home"});
    },
    group : function(req,res,next){
        res.render("group",{"title":"Group"});
    }
}
