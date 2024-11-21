const adminModel =require('../models/adminModel');
const bcrpty = require('bcrypt')
const { createToken } = require('../utils/tokenCreate')

class authControllers{
    admin_login = async(req,res) => {
        const {email,password} = req.body;
        try {
            const admin = await adminModel.findOne({email}).select('+password')
            // console.log(admin)
            if (admin) {
                const match = await bcrpty.compare(password, admin.password)
                // console.log(match)
                if (match) {
                    const token = await createToken({
                        id : admin.id,
                        role : admin.role
                    })
                    res.cookie('accessToken',token,{
                        expires : new Date(Date.now() + 7*24*60*60*1000 )
                    })
                    responseReture(res,200,{token,message: "Login Success"})
                } else {
                    responseReture(res,404,{error: "Password Wrong"})
                }
            } else {
                responseReture(res,500,{error: error.message})
                
            }

        } catch (error) {

        }
        
    }
}



module.exports = new authControllers();