import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('text-dark', 'text-white')
    content = content.replace('text-background', 'text-white')
    content = content.replace('border-dark', 'border-white')
    content = content.replace("'#1A1A1A'", "'#FFFFFF'")
    content = content.replace("stroke=\"currentColor\"", "stroke=\"white\"")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filepath in glob.glob('src/**/*.tsx', recursive=True):
    replace_in_file(filepath)

for filepath in glob.glob('src/**/*.ts', recursive=True):
    replace_in_file(filepath)
