import datetime
import re
from typing import List, Dict, Any

def generate_slug(title: str) -> str:
    """Generates a URL-friendly slug from a title."""
    title = title.lower()
    # Replace spaces with hyphens
    title = title.replace(' ', '-')
    # Keep only alphanumeric characters and hyphens
    allowed_chars = 'abcdefghijklmnopqrstuvwxyz0123456789-'
    slug = ''.join(c for c in title if c in allowed_chars)
    # Remove consecutive hyphens
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def create_metadata(title: str, content_type: str, source_path: str, tags: List[str], full_text: str) -> Dict[str, Any]:
    """
    Generates a metadata dictionary for a piece of content.
    """
    slug = generate_slug(title)
    # Generate a summary from the first 200 characters of the text.
    summary = (full_text[:200] + '...') if len(full_text) > 200 else full_text

    metadata = {
        "title": title,
        "slug": slug,
        "type": content_type,
        "date": datetime.datetime.now().isoformat(),
        "source": source_path,
        "tags": tags,
        "summary": summary.strip().replace('\\n', ' ')
    }
    return metadata
