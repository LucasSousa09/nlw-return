# NLW Return - The feedget Widget

**A oitava edição dessa semana maravilhosa que nos impulsiona para o próximo nível.**

## A Aplicação

**<del>A aplicação está disponível em https://nlw-return-tau-lilac.vercel.app/<del>**

Feedget o widget que te **ajuda a ajudar** os desenvolvedores a melhorarem seu site.

Por meio dele você pode enviar mensagens aos desenvolvedores do produto reportando problemas, enviando idéias ou simplesmente mandando outras mensagens como agradecimentos à um app nota 10.

- Selecione o tipo de feedback que você deseja enviar

![image](https://github.com/LucasSousa09/nlw-return/blob/main/nlw-return-images/1-feedbacktypes-dark.png)

- Escreva sua reclamação, idéia ou outro tipo de mensagem

![image](https://github.com/LucasSousa09/nlw-return/blob/main/nlw-return-images/3-feedbackcontent-dark.png)

- Sinta segurança ao saber que seu feedback foi enviado com sucesso

![image](https://github.com/LucasSousa09/nlw-return/blob/main/nlw-return-images/5-feedbacksuccess-dark.png)

## Levando a aplicação para o próximo nível

- Um tema light para as pessoas que preferem um sistema mais claro

![image](https://github.com/LucasSousa09/nlw-return/blob/main/nlw-return-images/6.5-light-theme.png)

- Um sistema de login simples com github para poder ver seus feedbacks e mandar feedback. *Obs: também possuí versão dark, para dar uma olhada acesse a pasta images/7-lp-dark.png*

![image](https://github.com/LucasSousa09/nlw-return/blob/main/nlw-return-images/8-lp-light.png)

- Visualize os seus feedbacks.*Obs: também possuí versão dark, para dar uma olhada acesse a pasta images/9-userfeedbacks-dark.png* 

![image](https://github.com/LucasSousa09/nlw-return/blob/main/nlw-return-images/9-userfeedbacks-light.png)

- Os Feedbacks são enviados por email utilizando o SendGrid

## Tecnologias

- Typescript
- React
- Prisma
- Express
- Axios
- SendGrid

## Aprendizados

- Fundamentos de Solid
- Revisão de React Components
- Revisão de estados, preservação de dados e carregamento de componentes no React
- Banco de dados com Prisma
- Envio de emails com SendGrid
- Deployment com Railway e Vercel

## Rodando a aplicação

- Instale as dependências com npm install
- Configure as variáveis ambiente conforme os arquivos ".env.example" e ".env.local.example"
- Entre no arquivo "migration_lock.toml" na pasta "migrations" dentro da pasta "prisma" e mude o provider de "postgresql" para "sqlite"
- Entre no arquivo "schema.prisma" dentro da pasta "prisma"  e troque o database provider de "postgresql" para "sqlite"
- Faça a migração do banco de dados com "prisma migrate run dev" 
- Rode o servidor dentro da pasta "nlw-return-server-main" com "npm run dev"
- Rode o front-end dentro da pasta "nlw-return-web-main" com "npm run dev"
