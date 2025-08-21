from typing import List, Dict, Any

Block = Dict[str, Any]

def upload_blocks(metadata: Dict[str, Any], blocks: List[Block]) -> None:
    """
    Stub function for uploading content to Supabase.
    Prints the metadata and the number of blocks to be uploaded.
    """
    slug = metadata.get("slug", "no-slug")
    num_blocks = len(blocks)
    print("--- Supabase Stub ---")
    print(f"Uploading '{slug}' to Supabase...")
    print(f"Metadata: {metadata}")
    print(f"Content contains {num_blocks} blocks.")
    print("--- End Supabase Stub ---")
