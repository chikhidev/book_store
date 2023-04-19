const index = async (req, res) =>{

    try{
        console.log("Hello inside auth index")

    }catch{

    }


    return res.status(200).send(
        {
            suceses: true,
            data:{
                message: "hello inside auth"
            }
        }
    )
}


module.exports = {
    index
}