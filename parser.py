from typing import List, Dict, Any

# A Block is a dictionary with a 'type' and 'content'.
Block = Dict[str, Any]

def parse_markdown_to_blocks(text: str) -> List[Block]:
    """
    Parses a string of markdown-like text and converts it into a list of block objects.
    Handles ## (H2), ### (H3), and paragraphs.
    Other markdown elements will be treated as paragraphs as a fallback.
    """
    blocks: List[Block] = []
    lines = text.split('\n')

    for line in lines:
        stripped_line = line.strip()
        if not stripped_line:
            continue

        if stripped_line.startswith('### '):
            blocks.append({
                "type": "h3",
                "content": stripped_line.replace('### ', '')
            })
        elif stripped_line.startswith('## '):
            blocks.append({
                "type": "h2",
                "content": stripped_line.replace('## ', '')
            })
        else:
            blocks.append({
                "type": "paragraph",
                "content": stripped_line
            })

    return blocks
