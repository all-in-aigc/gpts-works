import os
from llama_index.llms import AzureOpenAI
from llama_index.embeddings import OpenAIEmbedding
from llama_index import set_global_service_context, ServiceContext
from components.log import log

llm_engine = None


def init_llm():
    api_key = os.getenv("AZURE_API_KEY")
    api_base = os.getenv("AZURE_API_BASE")
    api_type = "azure"
    api_version = os.getenv("AZURE_API_VERSION")
    llm_model = os.getenv("AZURE_LLM_MODEL")
    embed_model = os.getenv("AZURE_EMBED_MODEL")

    llm_engine = AzureOpenAI(
        model=llm_model,
        engine=llm_model,
        api_key=api_key,
        api_base=api_base,
        api_type=api_type,
        api_version=api_version,
        log=False,
    )

    embed_engine = OpenAIEmbedding(
        model=embed_model,
        deployment_name=embed_model,
        api_key=api_key,
        api_base=api_base,
        api_type=api_type,
        api_version=api_version,
    )

    service_context = ServiceContext.from_defaults(
        llm=llm_engine,
        embed_model=embed_engine,
    )

    set_global_service_context(service_context)

    log.info("init llm ok")
