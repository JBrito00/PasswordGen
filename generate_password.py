import random
import string
import sys
import json

def generate_password(length, use_uppercase, use_digits, use_special):
    characters = string.ascii_lowercase
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_digits:
        characters += string.digits
    if use_special:
        characters += string.punctuation

    password = ''.join(random.choice(characters) for _ in range(length))
    return password

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    length = int(data.get('length'))
    use_uppercase = data.get('use_uppercase')
    use_digits = data.get('use_digits')
    use_special = data.get('use_special')
    
    password = generate_password(length, use_uppercase, use_digits, use_special)
    print(password)
