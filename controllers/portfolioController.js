const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')


//transport

const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth:{
            api_key : process.env.API_SENDGRID 
        }
    })
)
const sendEmailController = (req,res)=>{
    try{
        const {name,email,msg} = req.body

        //validation
        if (!name || !email || !msg){
            return res.status(500).send({
                success : false,
                message: "PLease Provide All Feilds"
            })
        }

        // email matter
        transporter.sendMail({
            to:'rushikeshhandore99@gmail.com',
            from: 'rushikeshhandore99@gmail.com',
            subject: 'Regarding Mern Portfolio App',
            html:`
            <h5>Detail Information</h5>
            <ul>
                <li><p>Name : ${name}</p></li>
                <li><p>Email : ${email}</p></li>
                <li><p>Message : ${msg}</p></li>
            </ul>`
        })

        return res.status(200).send({
            success:true,
            message:'Your message send sucessesfully'
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'dend Email API Error'
        })
    }
};

module.exports = {sendEmailController}