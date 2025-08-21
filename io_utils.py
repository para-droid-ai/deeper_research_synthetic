import json
import os

def read_file(path: str) -> str:
    """Reads a file and returns its content as a string."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File not found at {path}")
        return ""
    except Exception as e:
        print(f"An error occurred while reading {path}: {e}")
        return ""

def write_file(path: str, content: str):
    """Writes content to a file."""
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully wrote to {path}")
    except Exception as e:
        print(f"An error occurred while writing to {path}: {e}")

def load_json(path: str) -> dict:
    """Loads a JSON file and returns its content as a dictionary."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: JSON file not found at {path}")
        return {}
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {path}")
        return {}
    except Exception as e:
        print(f"An error occurred while loading JSON from {path}: {e}")
        return {}

def save_json(path: str, data: dict):
    """Saves a dictionary to a JSON file."""
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully saved JSON to {path}")
    except Exception as e:
        print(f"An error occurred while saving JSON to {path}: {e}")
