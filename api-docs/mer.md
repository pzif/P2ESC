Modelo Entidade-Relacionamento (MER)

Entidades e Relacionamentos

1. Usuário

id (UUID, PK)

nome (string)

email (string, único)

senha (string)

role (enum: aluno, tutor, admin)

avatar (string - URL da imagem)

Relacionamentos:

Um usuário pode progredir em vários cursos (relacionamento com Progresso)

Um usuário pode criar notas e comentários

2. Curso

id (UUID, PK)

titulo (string)

descricao (text)

Relacionamentos:

Um curso possui vários módulos

Um curso está relacionado com o progresso de vários usuários

3. Módulo

id (UUID, PK)

curso_id (UUID, FK para Curso)

titulo (string)

conteudo (text)

arquivo_pdf (string - URL opcional)

video_url (string - URL opcional)

Relacionamentos:

Cada módulo pertence a um único curso

4. Progresso

id (UUID, PK)

usuario_id (UUID, FK para Usuário)

curso_id (UUID, FK para Curso)

porcentagem (inteiro)

atualizado_em (timestamp)

Relacionamentos:

Tabela intermediária entre Usuário e Curso

Resumo dos Relacionamentos

Usuário 1:N Progresso

Curso 1:N Progresso

Curso 1:N Módulo

Usuário N:M Curso (via tabela Progresso)

Este MER é compatível com o uso de um banco relacional (PostgreSQL).