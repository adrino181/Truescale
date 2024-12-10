const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const jwt = require("jsonwebtoken");
const { HOST_URL } = require('../constants/slug');
const getTemplate = (data) => {
    if(data.type === 'email-confirm'){
     const emailToken = jwt.sign({ userId: data.uid }, process.env.JWT_KEY, { expiresIn: '1h' });
     const url = `${HOST_URL}/confirm/email?q=${emailToken}`;
      return (`
      <p>Please confirm your email address by clicking the link below:</p>
      <p><a href="${url}">Confirm Email</a></p>
      `)
    }
}

class emailService {

    constructor(accessKeyId,secretAccessKey, region){
        this.accessKeyId = accessKeyId;
        this.secretAccessKey = secretAccessKey;
        this.region = region;
        this.sendOtpEmail = this.sendOtpEmail.bind(this);
        this.setUpService = this.setUpService.bind(this);
        this.transporter = this.setUpService();
    }

    setUpService = () => {
       return nodemailer.createTransport(
            sesTransport({
              accessKeyId: this.accessKeyId,
              secretAccessKey: this.secretAccessKey,
              region: this.region,
            })
          );
    }
    
    async sendOtpEmail(params){
        // Generate email confirmation token
        // Send confirmation email using Amazon SES
        const htmlTemplate = getTemplate(params)
        const emailParams = {
            from: 'info@truescale.in',
            to:  params.email,
            subject: `Verification Email`,
            html: htmlTemplate,
          };
        await this.transporter.sendMail(emailParams);
    }

  async saveEmailToDb(params){

  }
}

module.exports = emailService;
