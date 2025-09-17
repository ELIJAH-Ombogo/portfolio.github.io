js
const express = require('express');
const app = express();
app.use(express.json());

const {
  createUser,
  activateUser,
  completeTrivia,
  withdrawReferral,
  users,
  getAdminBalance
} = require('./index');

// Signup or login user
app.post('/user', (req, res) => {
  const { email, referrer_email } = req.body;
  const user = createUser(email, referrer_email);
  res.json(user);
});

// Activate user (pay 100 bob)
app.post('/user/activate', (req, res) => {
  const { email } = req.body;
  const message = activateUser(email);
  res.json({ message, admin_balance: getAdminBalance() });
});

// Complete trivia question (+20 bob)
app.post('/user/trivia', (req, res) => {
  const { email } = req.body;
  const message = completeTrivia(email);
  res.json({ message, user_balance: users[email]?.account_balance || 0 });
});

// Withdraw from referral balance
app.post('/user/withdraw', (req, res) => {
  const { email, amount } = req.body;
  const message = withdrawReferral(email, amount);
  res.json({ message, referral_balance: users[email]?.referral_balance || 0 });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
