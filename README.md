<h1># BackEnd-Store-TS-TDD-SOLID-estudo </h1>

<p>#Tecnologias:</p>
  <ul>
    <li><b>NodeJS</b></li>
    <li><b>Typescript </b></li>
    <li><b>Jest </b></li>
    <li><b>Amazon S3 </b></li>
    <li> <b>Multer </b></li>
    <li><b>Express </b></li>
  <li><b>JSONWEBTOKEN </b></li>
  <li><b>NodeMailer</b></li>
</ul>
 
<h2>Este projeto é um cadastro de produtos, feito para praticar typescript e conceitos de TDD, clean Architeture and SOLID</h2>
O projeto conta com cadastro de usuario e autenticação para rotas que modificam os dados, além de verificação de conta por email. 
Tudo isso utilizando 

Segue na pasta raiz um arquivo example .env onde segue um exemplo das informações do arquivo .env

Para executar a aplicação. Execute os seguintes passos:

  <ul>
  <li>Configure um banco de dados POSTGRES</li>
    <li>Execute: git clone https://github.com/diego-nascimento/BackEnd-Store-TS-TDD-SOLID-estudo</li>
    <li>yarn install</li>
    <li>Configure o arquivo .env</li>
    <li>execute prisma migrate dev --preview-feature para que o prisma ORM crie as tabelas no banco</li>
    <li>yarn dev</li>
  </ul>
