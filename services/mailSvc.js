const nodemailer = require('nodemailer');
const sendMailGunTransport = require('nodemailer-mailgun-transport');

const transporter = nodemailer.createTransport(sendMailGunTransport({
    auth: {
        domain: 'sandbox2a7a3465461948cb9f7a3b0c0af24d24.mailgun.org',
        api_key: 'c4a79aa8c461c85e084b5177b7c0eab6-324e0bb2-50dfb901'
    }
}));

const mailerService = {
    sendEmail: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const mailerOptions = {
                    to: data.email,
                    from: 'sainekkala@gmail.com',
                    html: `
                    Hi ${data.firstName} ${data.lastName},
                    <h4 style="color: blue;">Forgot your password?</h4>
                    <p>If you want to reset your password, click on the link below (or copy and paste the URL in your browser)</p>
                    <a href="http://localhost:3000/reset-password?email=${data.email}" target="_blank">http://localhost:3000/reset-password?email=${data.email}</a>
                    `
                };
                transporter.sendMail(mailerOptions, (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                    }
                })
            } catch(error) {
                reject(error);
            }
        });
    }
}

module.exports = mailerService;