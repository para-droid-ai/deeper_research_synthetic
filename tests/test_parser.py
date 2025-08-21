import unittest
import sys
import os

# Add project root to the Python path to allow importing our modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from parser import parse_markdown_to_blocks

class TestParser(unittest.TestCase):

    def test_parse_markdown_to_blocks_standard(self):
        """Tests parsing of standard markdown elements (h2, h3, paragraph)."""
        markdown_text = (
            "## This is a Heading 2\n"
            "This is a paragraph.\n\n"
            "### This is a Heading 3\n"
            "This is another paragraph with some *italic* text."
        )

        expected_blocks = [
            {'type': 'h2', 'content': 'This is a Heading 2'},
            {'type': 'paragraph', 'content': 'This is a paragraph.'},
            {'type': 'h3', 'content': 'This is a Heading 3'},
            {'type': 'paragraph', 'content': 'This is another paragraph with some *italic* text.'}
        ]

        result_blocks = parse_markdown_to_blocks(markdown_text)
        self.assertEqual(result_blocks, expected_blocks)

    def test_empty_input(self):
        """Tests that empty input string results in an empty list of blocks."""
        markdown_text = ""
        result_blocks = parse_markdown_to_blocks(markdown_text)
        self.assertEqual(result_blocks, [])

    def test_only_whitespace_and_newlines(self):
        """Tests that a string with only whitespace results in an empty list of blocks."""
        markdown_text = " \n\n \t "
        result_blocks = parse_markdown_to_blocks(markdown_text)
        self.assertEqual(result_blocks, [])

if __name__ == '__main__':
    unittest.main()
