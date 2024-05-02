after supabase project setup do not forget to enable extension pgvector
then create tables

create table handbook_docs (
  id bigserial primary key,
  content text, -- corresponds to the "text chunk"
  embedding vector(1024) -- 1024 is the dimension of our embeddings
);