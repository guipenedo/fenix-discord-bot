## Este projeto foi arquivado. Podem encontrar o seu sucessor, em Python, [aqui](https://github.com/guipenedo/aero-discord-bot). 
## This project is no longer maintained. [You may find its successor here](https://github.com/guipenedo/aero-discord-bot).
# FenixDiscordBot (FDB)

Um bot de discord para interagir com a plataforma [FénixEdu](https://fenixedu.org/). Desenvolvido originalmente para o servidor de discord de um dos anos do curso de [Engenharia Aeroespacial](https://fenix.tecnico.ulisboa.pt/cursos/meaer) no [Instituto Superior Técnico](https://tecnico.ulisboa.pt/).
Entre as features presentes até ao momento estão: horários do shuttle, menus da cantina (social) e a leitura automática dos anúncios de uma cadeira, e posterior envio dos mesmos para o discord, através dos feeds rss fornecidos pelo fénix.

## Instalação
* [Instalação via clone (usual)](#via-clone)
* [Instalação via deploy para o Heroku](deploy-para-o-heroku)
## Criação e adição do bot de discord
Para utilizar a app é necessário criar um bot de discord e adicioná-lo ao servidor onde se pretende que este corra. Instruções [aqui](https://github.com/guipenedo/fenix-discord-bot/wiki/Cria%C3%A7%C3%A3o-e-adi%C3%A7%C3%A3o-do-bot).
## Configuração
A configuração da aplicação é realizada em dois sítios diferentes:
* No ficheiro .env, para deployments feitos via git clone (copiar o ficheiro .env.default para .env e editá-lo)
* Nas config vars, para deployments para o heroku (Settings -> Config vars -> Reveal config vars)

Uma descrição detalhada das várias opções e seus valores pode ser encontrada [aqui](https://github.com/guipenedo/fenix-discord-bot/wiki/Configura%C3%A7%C3%A3o).

## Comandos
```
!shuttle [hoje/amanha/data] [hora] - Horário do shuttle
!social [hoje/amanha/data] - Ver o prato do social

[] - opcional <> - obrigatório
```
### Comandos de admin
```
!rss - lista de cadeiras do curso
!rss [acrónimo] - ativa ou desativa os anúncios de uma dada cadeira
```

## Anúncios do Fénix
Para ativar anúncios para uma dada cadeira, deve-se usar o comando `!rss [acrónimo]`. A lista de todas as cadeiras (e respetivos acrónimos), pode ser consultada com `!rss` (sem argumentos).
O formato da mensagem dos anúncios pode ser alterada na configuração. Mais info [aqui](https://github.com/guipenedo/fenix-discord-bot/wiki/Configura%C3%A7%C3%A3o#bot_announcement).

## Tecnologias e bibliotecas
+ [Node.js](https://nodejs.org/en/)
+ [discord.js](https://www.npmjs.com/package/discord.js)
+ [Mongoose](https://www.npmjs.com/package/mongoose)
+ [axios](https://www.npmjs.com/package/axios)
+ [feedparser](https://www.npmjs.com/package/feedparser)
+ [moment](https://momentjs.com/)
+ [html-to-text](https://www.npmjs.com/package/html-to-text)
+ [double-ended-queue](https://www.npmjs.com/package/double-ended-queue)
+ [dotenv](https://www.npmjs.com/package/dotenv)
