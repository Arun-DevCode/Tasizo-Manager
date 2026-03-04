export async function CreateUserAccount(formData) {
  try {
    const res = await fetch("http://localhost:4000/api/user/create-account", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData), // JSON Convert
    });
    const data = await res.json(); // conversion

    // Error Validation
    if (!data && data.error === true) {
      throw new Error(data);
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function UserLoginAction(credentials) {
  try {
    const res = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (data.error === true) {
      throw new Error(data);
    }

    return data;
  } catch (error) {
    return error;
  }
}

export const getUserProfile = async () => {
  const API_URL = "http://localhost:4000/api/user/get-user";
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    return null;
  }
};
