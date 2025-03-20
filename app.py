from flask import Flask, request, jsonify
import uuid

app = Flask(__name__)

# Dummy authentication data (store securely in production)
CLIENT_ID = "37bb493c-73d3-47ea-8675-21f66ef9b735"
CLIENT_SECRET = "HVIQBVbqmTGEmaED"
AUTHORIZED_TOKENS = {}

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask Server is Running"}), 200

@app.route("/register", methods=["POST"])
def register():
    """
    Endpoint to register a new user with company details.
    """
    data = request.get_json()
    required_fields = {"companyName", "ownerName", "rollNo", "ownerEmail"}
    
    if not data or not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    return jsonify({
        "companyName": data["companyName"],
        "clientID": CLIENT_ID,
        "clientSecret": CLIENT_SECRET,
        "ownerName": data["ownerName"],
        "ownerEmail": data["ownerEmail"],
        "rollNo": data["rollNo"]
    }), 201

@app.route("/auth", methods=["POST"])
def auth():
    """
    Endpoint for authentication using client ID and secret.
    """
    data = request.get_json()

    if not data or data.get("clientID") != CLIENT_ID or data.get("clientSecret") != CLIENT_SECRET:
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate a unique authentication token
    token = str(uuid.uuid4())
    AUTHORIZED_TOKENS[token] = True  # Store the token
    return jsonify({"accessToken": token}), 200

@app.route("/calculate-average", methods=["POST"])
def calculate_average():
    """
    Endpoint to calculate the average of numbers.
    Requires an Authorization token.
    """
    auth_header = request.headers.get("Authorization")

    # Ensure Authorization header is present
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization token missing or invalid format"}), 403

    # Extract token after "Bearer "
    token = auth_header.split("Bearer ")[1].strip()

    # Check if token is valid
    if token not in AUTHORIZED_TOKENS:
        return jsonify({"error": "Unauthorized"}), 403

    # Get data and validate
    data = request.get_json()
    numbers = data.get("numbers", [])

    if not isinstance(numbers, list) or not all(isinstance(num, (int, float)) for num in numbers):
        return jsonify({"error": "Invalid input, provide a list of numbers"}), 400

    average = sum(numbers) / len(numbers) if numbers else 0
    return jsonify({"average": average}), 200

if __name__ == "__main__":
    app.run(debug=True)
