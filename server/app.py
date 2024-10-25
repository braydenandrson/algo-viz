import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Judge0 API configuration for Python3 execution
JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions"
JUDGE0_HEADERS = {
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    "x-rapidapi-key": os.getenv("JUDGE0_API_KEY"),  # Load the API key from .env
    "content-type": "application/json"
}

# Route to fetch LeetCode problem by title
@app.route('/problem/<string:title>', methods=['GET'])
def get_problem(title):
    # Define the GraphQL query to fetch problem data
    query = {
        "query": """
        query getProblem($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            title
            content
            difficulty
            likes
            dislikes
            exampleTestcases
          }
        }
        """,
        "variables": {"titleSlug": title}
    }

    # Send a POST request to the LeetCode GraphQL endpoint
    response = requests.post('https://leetcode.com/graphql', json=query)

    if response.status_code == 200:
        # Log the raw response data from LeetCode for debugging
        print("LeetCode response data:", response.json())

        # Return the problem data in JSON format
        data = response.json()
        return jsonify(data['data']['question'])
    else:
        # Log the error response for debugging
        print("Error fetching problem data:", response.text)
        return jsonify({'error': 'Unable to fetch problem data'}), response.status_code

# Route to run Python3 code using Judge0 API
@app.route('/run_code', methods=['POST'])
def run_code():
    try:
        # Extract the code from the request
        code = request.json['code']

        # Set the language_id for Python3
        language_id = 71  # Python3

        # Wrap the user code and tests into a main function
        wrapped_code = f"""
try:
    {code}
except AssertionError as e:
    print("Test failed:", e)
except Exception as e:
    print("Error:", str(e))
else:
    print("All test cases passed!")
"""

        # Prepare the payload for Judge0 API
        payload = {
            "language_id": language_id,
            "source_code": wrapped_code,
            "stdin": "",  # Optional: pass input if needed
            "expected_output": ""  # Optional: use if you're comparing outputs
        }

        # Send the code to Judge0 for execution
        response = requests.post(JUDGE0_API_URL, json=payload, headers=JUDGE0_HEADERS)

        # Check if the submission was successful
        if response.status_code == 201:
            # Get the submission token to retrieve the result
            submission_token = response.json()["token"]
            result_url = f"{JUDGE0_API_URL}/{submission_token}"

            # Retrieve the execution result
            result_response = requests.get(result_url, headers=JUDGE0_HEADERS)
            result = result_response.json()

            # Return the Judge0 result
            return jsonify(result)
        else:
            return jsonify({'error': 'Code execution failed'}), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
@app.route('/problems', methods=['GET'])
def get_all_problems():
    # GraphQL query to fetch all problems
    query = {
        "query": """
        query {
          allQuestions {
            titleSlug
            title
            difficulty
          }
        }
        """
    }

    # Send the request to LeetCode GraphQL API
    response = requests.post('https://leetcode.com/graphql', json=query)

    if response.status_code == 200:
        # Log the raw response data for debugging
        # print("LeetCode problems data:", response.json())

        # Return the list of problems in JSON format
        data = response.json()
        return jsonify(data['data']['allQuestions'])
    else:
        return jsonify({'error': 'Unable to fetch problem list'}), response.status_code


if __name__ == "__main__":
    app.run(debug=True)
