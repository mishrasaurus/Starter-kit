import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
//import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Ollama } from "langchain/llms/ollama";
import { PromptTemplate } from "langchain/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
//import { HuggingFaceTransformersEmbeddings } from "langchain/embeddings/hf_transformers";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { formatDocumentsAsString } from "langchain/util/document";

export const getResults = async (text?: string) => {
  console.log("here");
  const loader = new CheerioWebBaseLoader(
    "https://en.wikipedia.org/wiki/India"
  );
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 0,
    chunkSize: 500,
  });

  const splitDocuments = await splitter.splitDocuments(docs);

  console.log("here2");

  const embeddings = new OllamaEmbeddings({
    model: "orca-mini",
    baseUrl: "http://localhost:11434",
  });

  const res = await embeddings.embedQuery("Hello world");

  console.log("here3", res);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocuments,
    embeddings
    //new HuggingFaceTransformersEmbeddings()
  );

  const retriever = vectorstore.asRetriever();

  // Prompt
  const prompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
  {context}

  Question: {question}`);

  const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "orca-mini",
  });

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const result = await chain.invoke(
    text ||
      `Extract following items:
    "History"
    "Modern India"
    "Indian subcontinent"`
  );

  console.log(result);

  return result;
};
