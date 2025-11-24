import pytest
import asyncio
from httpx import AsyncClient
from fastapi import status

# This test runs against the live Docker container.
# Ensure the container is running before executing the test.
BASE_URL = "http://localhost:8000"

@pytest.fixture(scope="module")
def event_loop():
    """Create an instance of the default event loop for each test module."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

# Use a fixture to create a test client for making requests
@pytest.fixture(scope="module")
async def async_client(event_loop):
    async with AsyncClient(base_url=BASE_URL) as client:
        yield client

@pytest.mark.asyncio
async def test_register_coordinator(async_client: AsyncClient):
    """
    Tests the successful registration of a coordinator user.
    """
    # --- Test Data ---
    # Using a unique email for each test run to avoid conflicts
    from datetime import datetime
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    coordinator_email = f"coord_test_{timestamp}@example.com"
    
    coordinator_data = {
        "nombre": "Test Coordinator",
        "email": coordinator_email,
        "password": "a_very_secure_password_123",
        "id_rol": 1,  # This is the key: 1 is the ID for the 'coordinador' role
        "telefono": "1234567890",
        "bio": "Soy un coordinador de pruebas."
    }

    # --- Make the API Request ---
    # The backend endpoint expects multipart/form-data, so we send data as 'data'
    response = await async_client.post("/api/v1/auth/register", data=coordinator_data)

    # --- Assertions ---
    # 1. Check for a successful status code
    assert response.status_code == status.HTTP_200_OK, f"Error: {response.text}"

    # 2. Parse the response JSON
    response_data = response.json()

    # 3. Verify the created user's data
    assert response_data["email"] == coordinator_email
    assert response_data["nombre"] == "Test Coordinator"
    assert "id_usuario" in response_data
    
    # 4. CRITICAL: Verify the role is correct
    assert response_data["id_rol"] == 1, "The user was not created with the coordinator role."

    print(f"\nSuccessfully registered coordinator: {response_data['email']} with ID: {response_data['id_usuario']}")

