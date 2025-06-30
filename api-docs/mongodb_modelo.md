Modelo de Documentos - MongoDB

Notas Colaborativas (Coleção: notes)

{
  "_id": ObjectId,
  "usuario_id": "uuid",
  "conteudo": "Texto livre da anotação compartilhada ou pessoal",
  "tags": ["resumo", "video aula"],
  "data_edicao": "2025-06-30T14:00:00.000Z"
}

Observações:

usuario_id: linka com a tabela relacional de usuários

tags: array de palavras-chave adicionadas pelo usuário

conteudo: pode conter texto longo e formatações simples

Fórum de Discussão (Coleção: forums)

{
  "_id": ObjectId,
  "curso_id": "uuid",
  "titulo": "Dúvida sobre useEffect",
  "autor_id": "uuid",
  "comentarios": [
    {
      "autor_id": "uuid",
      "mensagem": "O useEffect executa após renderização.",
      "votos": 4,
      "data": "2025-06-30T15:00:00.000Z"
    }
  ]
}

Observações:

Os comentários são embutidos como subdocumentos

curso_id: referencia curso relacionado

Pode-se adicionar um campo opcional resolvido: boolean futuramente

Estratégia

Dados dinâmicos e flexíveis vão para o MongoDB

Dados transacionais e relacionais permanecem no PostgreSQL

Este modelo reflete um uso adequado de bancos NoSQL para colaboração e interações.