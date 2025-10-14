const mongoose = require('mongoose')


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String
    },
    tags: {
        type: String,
    },
    email: {
        type: String
    }
})

// post middleware
fileSchema.post('save', async function(doc) {
    try{
        console.log("DOC", doc) // jo bhi entry data base mein create ki hai usse hi doc bol rhe h

        // import transporter from emailService.js
        let {transporter} = require('../configs/emailService')

        // send mail
        let info = await transporter.sendMail({
            from: `ShivamCodes`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary!",
            html: `<h2>Hello jee</h2> <p>File Uploaded Successfully</p> click here: <a href="${doc.fileUrl}">${doc.fileUrl}</a>` // displayed in content section of email
        })

        console.log('INFO', info)

    } catch(e) {

    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;