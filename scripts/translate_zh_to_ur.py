import json
from googletrans import Translator
import sys

def translate_json(input_path, output_path, src='zh-cn', dest='ur'):
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    translator = Translator()

    def translate_item(item):
        if isinstance(item, str):
            return translator.translate(item, src=src, dest=dest).text
        elif isinstance(item, dict):
            return {k: translate_item(v) for k, v in item.items()}
        elif isinstance(item, list):
            return [translate_item(v) for v in item]
        else:
            return item

    translated = translate_item(data)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} input_json output_json")
        sys.exit(1)
    translate_json(sys.argv[1], sys.argv[2])
