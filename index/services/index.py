from llama_index import Document
from llama_index import VectorStoreIndex
from components.store import get_storage_context
from llama_index.node_parser import SimpleNodeParser


def build_index_for_gpts_list(gptsList):
    documents = []
    for gpts in gptsList:
        document = build_document_for_gpts(gpts=gpts)
        documents.append(document)

        print(
            "build index for gpts: ",
            gpts.name,
            gpts.uuid,
            len(documents),
        )

    nodes = build_nodes_for_documents(documents=documents)
    print("nodes count", len(nodes), len(documents))

    # index = VectorStoreIndex(nodes)
    # index.storage_context.persist(persist_dir="./storage")

    storage_context = get_storage_context()
    index = VectorStoreIndex(nodes=nodes, storage_context=storage_context)

    print("save index ok")

    return index


def build_document_for_gpts(gpts):
    document = Document(
        text=gpts.description,
        metadata={
            "uuid": gpts.uuid,
            "name": gpts.name,
            "author_name": gpts.author_name,
        },
        metadata_template="{key}: {value}",
        text_template="{metadata_str}\ndescription: {content}",
    )
    document.doc_id = gpts.uuid
    document.excluded_llm_metadata_keys = ["uuid"]
    document.excluded_embed_metadata_keys = ["uuid"]

    return document


def build_nodes_for_documents(documents):
    parser = SimpleNodeParser.from_defaults(chunk_size=1024, chunk_overlap=20)

    nodes = parser.get_nodes_from_documents(documents=documents, show_progress=True)

    return nodes
