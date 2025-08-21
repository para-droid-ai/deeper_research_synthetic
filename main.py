import sys
import os
from datetime import datetime

# Import our new modules
import io_utils
import parser
import metadata
from integrations import notion_uploader, supabase_stub

def main():
    """
    Main function to orchestrate the content pipeline.
    """
    # 1. Get inputs from command line arguments
    # Usage: python main.py <source_file> <title> <content_type> <integration_name>
    if len(sys.argv) != 5:
        print("Usage: python main.py <source_file> \"<title>\" <content_type> <integration_name>")
        print("Example: python main.py \"data/reports/The Alaskan Gambit.md\" \"The Alaskan Gambit\" \"report\" \"supabase\"")
        print("Available integrations: notion, supabase")
        sys.exit(1)

    source_path = sys.argv[1]
    title = sys.argv[2]
    content_type = sys.argv[3]
    integration_name = sys.argv[4].lower()

    print("--- Starting Content Pipeline ---")
    print(f"Source: {source_path}, Title: {title}, Type: {content_type}, Integration: {integration_name}")

    # 2. Read source file content
    content_text = io_utils.read_file(source_path)
    if not content_text:
        print(f"Error: Could not read source file at {source_path}. Exiting.")
        sys.exit(1)

    # 3. Create metadata
    # Using a placeholder for tags as they are not passed via CLI for now.
    tags = ["generated", content_type]
    meta = metadata.create_metadata(title, content_type, source_path, tags, content_text)

    # 4. Define standardized output paths
    date_str = datetime.now().strftime('%Y-%m-%d')
    slug = meta['slug']
    filename_base = f"{date_str}_{slug}_{content_type}"

    output_txt_path = os.path.join("output", f"{filename_base}.txt")
    output_json_path = os.path.join("output", f"{filename_base}.json")

    print(f"Output content will be saved to: {output_txt_path}")
    print(f"Output metadata will be saved to: {output_json_path}")

    # 5. Save the content and metadata files using our I/O utility
    io_utils.write_file(output_txt_path, content_text)
    io_utils.save_json(output_json_path, meta)

    # 6. Parse content into generic blocks
    blocks = parser.parse_markdown_to_blocks(content_text)
    print(f"Content parsed into {len(blocks)} blocks.")

    # 7. Call the specified integration's upload function
    print(f"--- Calling Integration: {integration_name} ---")
    if integration_name == "notion":
        notion_uploader.upload_blocks(meta, blocks)
    elif integration_name == "supabase":
        supabase_stub.upload_blocks(meta, blocks)
    else:
        print(f"Error: Unknown integration '{integration_name}'. Please use 'notion' or 'supabase'.")
        sys.exit(1)

    print("--- Content Pipeline Finished Successfully ---")

if __name__ == "__main__":
    main()
