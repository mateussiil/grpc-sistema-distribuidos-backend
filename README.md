Este projeto está dividido em duas partes:
- Servidor: onde o gRPC atende às chamadas remotas definidas no arquivo proto
- Cliente:  cliente Express / Node / para as operações do servidor.

Para executar este aplicativo, emita em duas janelas diferentes os comando separados:

- Dentro da pasta / client: `node index`
- Dentro da pasta / root: `npm start`

Em seguida, utilize um  http://localhost: 3000/ e teste-o.

É necessario um frontend, ou algo pra consumir esse servico.