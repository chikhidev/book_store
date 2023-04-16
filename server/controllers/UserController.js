const create = (req, res)=>{
    res.send("create")
}

const view = (req, res)=>{
    res.send("view")
}

const remove = (req, res)=>{
    res.send("delete")
}


module.exports = {
    create, view, remove
}