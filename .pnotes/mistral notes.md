https://mistral.ai/technology/#models

after supabase project setup do not forget to enable extension pgvector
then create tables

create table handbook_docs (
  id bigserial primary key,
  content text, -- corresponds to the "text chunk"
  embedding vector(1024) -- 1024 is the dimension of our embeddings
);

add query to supabase:
create or replace function match_handbook_docs (
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    handbook_docs.id,
    handbook_docs.content,
    1 - (handbook_docs.embedding <=> query_embedding) as similarity
  from handbook_docs
  where 1 - (handbook_docs.embedding <=> query_embedding) > match_threshold
  order by (handbook_docs.embedding <=> query_embedding) asc
  limit match_count;
$$;