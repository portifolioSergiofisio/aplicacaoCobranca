const nodemailer = require('nodemailer');
const { MailtrapClient } = require('mailtrap');
const TratamentoDeErro = require('../../intermediarios/tratamentoDeErros/tratamentoDeErro.class');
const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');
const servicoUsuario = require('../../servicos/dbUsuario.servico');

module.exports = async function (req, res, next) {
  const email_req = req.body.email;
  const TOKEN = '2df0f880155e220f81040d45751d5259';
  const ENDPOINT = 'https://send.api.mailtrap.io/';
  try {
    if (!email_req) {
      throw new TratamentoDeErro('E-mail não informado.', 400);
    }

    const usuarioEncontrado = await servicoCompartilhado.obterUm({ email: email_req }, 'usuarios', 'id');

    if (!usuarioEncontrado) {
      throw new TratamentoDeErro('E-mail informado não encontrado.', 404);
    }

    const { resete_token, expira_em } = servicoUsuario.criarReseteToken();
    await servicoUsuario.cadastrarReseteSenha(usuarioEncontrado.id, resete_token, expira_em);

    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
      email: 'mailtrap@dev.d2x8d5awpyqt9n.amplifyapp.com',
      name: 'Mailtrap Test',
    };
    const recipients = [
      {
        email: 'wandersonfrost8@hotmail.com',
      },
    ];

    client
      .send({
        from: sender,
        to: recipients,
        subject: 'You are awesome!',
        text: 'Congrats for sending test email with Mailtrap!',
        category: 'Integration Test',
      })
      .then(console.log, console.error);

    /* var transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api',
        pass: '2df0f880155e220f81040d45751d5259',
      },
    });

    const mailOptions = {
      from: '"Desafio Cubos M05 " <desafio.cubos.m05@zoho.com>',
      to: 'emailtoresetar@usuario.com',
      subject: 'Redefinição de senha',
      html: `
          <p>Olá,</p>
          <p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
          <a href="http://localhost:3000/resetpassword/${resete_token}">http://localhost:3000/resetesenha/${resete_token}</a>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
    }); */
  } catch (erro) {
    next(erro);
  }
};
