import os
import re
import sys
from notion_client import Client
from typing import List, Dict, Any

# A generic Block from our parser
Block = Dict[str, Any]

def convert_blocks_to_notion_format(blocks: List[Block]) -> List[Dict[str, Any]]:
    """Converts a list of generic blocks to the Notion API block format."""
    notion_blocks = []
    for block in blocks:
        block_type = block.get("type")
        content = block.get("content", "")

        if block_type == "h2":
            notion_blocks.append({
                "type": "heading_2",
                "heading_2": {"rich_text": [{"type": "text", "text": {"content": content}}]}
            })
        elif block_type == "h3":
            notion_blocks.append({
                "type": "heading_3",
                "heading_3": {"rich_text": [{"type": "text", "text": {"content": content}}]}
            })
        elif block_type == "paragraph":
            notion_blocks.append({
                "type": "paragraph",
                "paragraph": {"rich_text": [{"type": "text", "text": {"content": content}}]}
            })
    return notion_blocks


def upload_blocks(metadata: Dict[str, Any], blocks: List[Block]):
    """
    Creates a new page in a Notion database with the given content.
    """
    NOTION_API_KEY = os.getenv("NOTION_API_KEY")
    DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

    if not NOTION_API_KEY or not DATABASE_ID:
        print("Error: Ensure NOTION_API_KEY and NOTION_DATABASE_ID environment variables are set.")
        return None

    notion = Client(auth=NOTION_API_KEY)

    title = metadata.get("title", "Untitled")
    slug = metadata.get("slug", "")
    content_type = metadata.get("type", "Note")

    notion_blocks = convert_blocks_to_notion_format(blocks)

    try:
        properties = {
            'Title': {'title': [{'text': {'content': title}}]},
            'Slug': {'rich_text': [{'text': {'content': slug}}]},
            'Status': {'select': {'name': 'Draft'}},
            'Content Type': {'select': {'name': content_type.capitalize()}}
        }

        response = notion.pages.create(
            parent={"database_id": DATABASE_ID},
            properties=properties,
            children=notion_blocks
        )
        page_id = response.get('id')
        print(f"Successfully created Notion page with ID: {page_id}")
        return page_id
    except Exception as e:
        print(f"Error creating Notion page: {e}")
        return None
