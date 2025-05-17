API_KEY = "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"

import httpx
from openai import OpenAI

# create an httpx client that does NOT verify certificates
httpx_client = httpx.Client(http2=True, verify=False)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=API_KEY,
    http_client=httpx_client
)


prompt = input("Enter the prompt: ")
response = client.chat.completions.create(
    model='qwen/qwen3-30b-a3b:free',
    messages=[
        {
            'role': 'user',
            'content': prompt
        }
    ]
)


# Print just the assistant’s reply text
print(response.choices[0].message.content)
