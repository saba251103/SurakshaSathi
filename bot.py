import os
import replicate
import time
import threading

# Ensure the Replicate API token is retrieved from the environment variable
# api_token = "your_actual_token_here"

api_token = os.environ.get("REPLICATE_API_TOKEN")
print("API token via os.environ:", api_token)
if api_token is None:
    raise ValueError("The environment variable REPLICATE_API_TOKEN is not set.")

# Function to interact with the LLaMA model
def chat_with_llama(user_input):
    pre_prompt = (
        "You are a helpful assistant dedicated to providing information and support related to women's safety, empowerment, and community resources. Your goal is to assist users by offering practical advice, safety tips, and local resources."
    )
    
    prompt_input = f"User: '{user_input}' Assistant:"

    # Retry logic
    max_retries = 3
    retry_delay = 2  # seconds

    for attempt in range(max_retries):
        try:
            output = replicate.run(
                "a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
                input={
                    "prompt": f"{pre_prompt} {prompt_input}",
                    "temperature": 0.9,
                    "top_p": 0.85,
                    "max_length": 50,
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

# Main loop to interact with the user
if __name__ == "__main__":
    print("Welcome to the Women's Safety and Empowerment Chatbot! You can ask any question related to safety, empowerment, or resources.")

    while True:
        user_input = input("You: ")

        # Create a container to hold the result
        result_container = []

        # Start a thread to get the response
        response_thread = threading.Thread(target=get_response, args=(user_input, result_container))
        response_thread.start()

        # Wait for the response with a timeout
        response_thread.join(timeout=10)  # Set a timeout of 10 seconds

        # Check if the response was generated
        if response_thread.is_alive():
            print("Response taking too long. Please try again.")
            response_thread.join()  # Ensure thread is completed
            response = "No response received."
        else:
            response = result_container[0] if result_container else "No response received."

        print(f"Assistant: {response}")