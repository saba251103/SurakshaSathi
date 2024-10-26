from flask import Flask, request, jsonify, render_template
import os
import replicate
import time
import threading
from dotenv import dotenv_values

config = dotenv_values(".env")
api_key = config.get("llama_key")

app = Flask(__name__)

# Ensure the Replicate API token is set
api_token = api_key
os.environ["REPLICATE_API_TOKEN"] = api_token

# Initialize the Replicate client with the API token
replicate_client = replicate.Client()

# Function to interact with the LLaMA model
def chat_with_llama(user_input):
    pre_prompt = (
        "You are a supportive assistant focused on women’s safety, empowerment, and resources. Provide direct, practical advice, tips, and local resources without unnecessary detail."
    )
    
    prompt_input = f"User: '{user_input}' Assistant:"

    # Retry logic
    max_retries = 3
    retry_delay = 2  # seconds

    for attempt in range(max_retries):
        try:
            output = replicate_client.run(  # Use the client instance here
                "a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
                input={
                    "prompt": f"{pre_prompt} {prompt_input}",
                    "temperature": 0.9,
                    "top_p": 0.85,
                    "max_length": 80,
                    "repetition_penalty": 1.1,
                },
            )

            # Convert output from generator to string
            output_text = "".join(output)
            return output_text.strip()

        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
            else:
                print("Max retries reached. Exiting.")
                return None  # Return None if max retries are reached

# Function to handle timeout
def get_response(user_input, result_container):
    result_container.append(chat_with_llama(user_input))

@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    if not user_input:
        return jsonify({"reply": "Please provide a message."}), 400

    result_container = []

    # Start a thread to get the response
    response_thread = threading.Thread(target=get_response, args=(user_input, result_container))
    response_thread.start()
    response_thread.join(timeout=60)

    if response_thread.is_alive():
        response = "Response taking too long. Please try again."
    else:
        response = result_container[0] if result_container else "No response received."

    return jsonify({"reply": response})

if __name__ == '__main__':
    app.run(debug=True)
