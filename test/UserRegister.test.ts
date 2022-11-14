test('user should be able to register', function() {
  const input = {
    username: 'gabriel',
    password: 'Senha123'
  }

  const register = new Register();
  await register.run(input);
})