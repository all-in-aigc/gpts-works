import os
from llama_index.vector_stores import MilvusVectorStore
from llama_index import StorageContext


def get_vector_store(collection):
    uri = os.getenv("STORE_URI")
    token = os.getenv("STORE_TOKEN")
    dim = os.getenv("STORE_DIM")

    vector_store = MilvusVectorStore(
        uri=uri, token=token, collection_name=collection, dim=dim, overwrite=False
    )

    return vector_store


def get_storage_context():
    collection = os.getenv("STORE_COLLECTION")
    vector_store = get_vector_store(collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    return storage_context
