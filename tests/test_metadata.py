import unittest
import sys
import os
from datetime import datetime

# Add project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from metadata import generate_slug, create_metadata

class TestMetadata(unittest.TestCase):

    def test_generate_slug(self):
        """Tests the slug generation with various titles."""
        self.assertEqual(generate_slug("A Simple Title"), "a-simple-title")
        self.assertEqual(generate_slug("Title with special chars!@#$"), "title-with-special-chars")
        self.assertEqual(generate_slug("  leading and trailing spaces  "), "leading-and-trailing-spaces")
        self.assertEqual(generate_slug("Multiple---dashes and   spaces"), "multiple-dashes-and-spaces")
        self.assertEqual(generate_slug("Title with numbers 123"), "title-with-numbers-123")
        self.assertEqual(generate_slug(""), "")

    def test_create_metadata(self):
        """Tests the creation of the metadata dictionary."""
        title = "Test Title"
        content_type = "report"
        source_path = "/path/to/source.md"
        tags = ["test", "metadata"]
        # Create text longer than 200 chars to test truncation
        long_text = "a" * 201
        short_text = "a" * 50

        # Test with long text for summary truncation
        meta_long = create_metadata(title, content_type, source_path, tags, long_text)
        self.assertEqual(meta_long['title'], title)
        self.assertEqual(meta_long['slug'], "test-title")
        self.assertEqual(meta_long['type'], content_type)
        self.assertEqual(meta_long['source'], source_path)
        self.assertEqual(meta_long['tags'], tags)
        self.assertTrue(meta_long['summary'].endswith("..."))
        self.assertEqual(len(meta_long['summary']), 203)

        # Test with short text (no truncation)
        meta_short = create_metadata(title, content_type, source_path, tags, short_text)
        self.assertEqual(meta_short['summary'], short_text)

        # Check date is a valid ISO 8601 date string
        self.assertTrue(isinstance(meta_long['date'], str))
        try:
            datetime.fromisoformat(meta_long['date'])
        except ValueError:
            self.fail("Date is not in valid ISO 8601 format.")

if __name__ == '__main__':
    unittest.main()
