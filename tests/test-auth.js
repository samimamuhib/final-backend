(async () => {
  try {
    const registerRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', email: 'test+copilot@example.com', password: 'password123' })
    });
    console.log('Register status:', registerRes.status);
    console.log('Register body:', await registerRes.text());

    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test+copilot@example.com', password: 'password123' })
    });
    console.log('Login status:', loginRes.status);
    console.log('Login body:', await loginRes.text());
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
