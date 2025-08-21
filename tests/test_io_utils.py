import unittest
import sys
import os
import json

# Add project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import io_utils

class TestIoUtils(unittest.TestCase):

    def setUp(self):
        """Set up a temporary directory and file paths for testing."""
        self.test_dir = "temp_test_dir_for_io"
        os.makedirs(self.test_dir, exist_ok=True)
        self.text_file_path = os.path.join(self.test_dir, "test.txt")
        self.json_file_path = os.path.join(self.test_dir, "test.json")

    def tearDown(self):
        """Clean up the temporary directory and files after tests."""
        if os.path.exists(self.text_file_path):
            os.remove(self.text_file_path)
        if os.path.exists(self.json_file_path):
            os.remove(self.json_file_path)
        if os.path.exists(self.test_dir):
            os.rmdir(self.test_dir)

    def test_write_and_read_file_roundtrip(self):
        """Tests writing to a file and reading it back."""
        content = "Hello, world!\\nThis is a test."
        io_utils.write_file(self.text_file_path, content)

        read_content = io_utils.read_file(self.text_file_path)
        self.assertEqual(content, read_content)

    def test_save_and_load_json_roundtrip(self):
        """Tests saving a dictionary to a JSON file and loading it back."""
        data = {"key": "value", "number": 123, "nested": {"a": "b"}}
        io_utils.save_json(self.json_file_path, data)

        loaded_data = io_utils.load_json(self.json_file_path)
        self.assertEqual(data, loaded_data)

    def test_read_nonexistent_file_returns_empty(self):
        """Tests that reading a non-existent file returns an empty string."""
        read_content = io_utils.read_file("nonexistent/path/file.txt")
        self.assertEqual(read_content, "")

    def test_load_nonexistent_json_returns_empty(self):
        """Tests that loading a non-existent JSON file returns an empty dictionary."""
        loaded_data = io_utils.load_json("nonexistent/path/file.json")
        self.assertEqual(loaded_data, {})

if __name__ == '__main__':
    unittest.main()
