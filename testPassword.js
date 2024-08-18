const bcrypt = require('bcrypt');

const plainPassword = 'Football12!';
const saltRounds = 10;

// Hash the password
bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Password:', hashedPassword);

  // Verify the hashed password
  bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    if (err) throw err;
    console.log('Password match:', result); // Should log `true` if the passwords match
  });
});
