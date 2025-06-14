from openai import OpenAI
import os
from dotenv import load_dotenv
import sys
from parse import parse_and_add
from flask import jsonify

def is_ollama_awake() -> bool:
    # Check if OpenAI API key is set
    if os.getenv("OPENAI_API_KEY"):
        print("OpenAI API key found. Ready to connect to OpenAI.")
        return True
    else:
        print("OpenAI API key not found. Set the OPENAI_API_KEY environment variable.")
        return False

def get_response(messages: list) -> str:
    """
    Get a response from OpenAI ChatGPT using the provided messages list.

    :param messages: List of messages (each a dict with 'role' and 'content').
    :return: The model's response as a string.
    """
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    return completion.choices[0].message.content


def replace_all_fields(fields: dict[str, str], prompt: str) -> str:
    for key, value in fields.items():
        prompt = prompt.replace("{" + key + "}", value)

    return prompt


def generate_response(fields: dict[str, str]) -> dict:
    prompt_types = [file.replace(".txt", "") for file in os.listdir("./prompts/")]

    formatted_prompts = {}
    for type in prompt_types:
        with open(f"./prompts/{type}.txt", "r", encoding="utf-8") as file:
            prompt = file.read()
            formatted_prompts[type] = replace_all_fields(fields, prompt)

    data = {}
    for type in prompt_types:
        if type != "system" and type != "global":
            context = [
                {'role': 'system', 'content': formatted_prompts["system"]},
                {'role': 'user', 'content': formatted_prompts["global"]},
                {'role': 'user', 'content': formatted_prompts[type]}
            ]

            parse_and_add(data, get_response(context), type)

    data["destination"] = fields["destination"]
    data["lat"] = fields["lat"]
    data["lon"] = fields["lon"]

    return data