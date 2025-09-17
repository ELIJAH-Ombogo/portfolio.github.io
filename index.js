js
// Simple in-memory data storage
const users = {};
let admin_balance = 0;

// Create or login user
function createUser(email, referrerEmail = null) {
  if (!users[email]) {
    users[email] = {
      email,
      account_balance: 0,
      referral_balance: 0,
      activated: false,
      referrer_email: referrerEmail,
    };
  }
  return users[email];
}

// Activate user with payment of 100 bob
function activateUser(email) {
  const user = users[email];
  if (!user) return 'User not found';
  if (user.activated) return 'User already activated';

  user.activated = true;
  admin_balance += 100;
  if (user.referrer_email && users[user.referrer_email]) {
    users[user.referrer_email].referral_balance += 50;
  }
  return 'User activated and payment processed';
}

// User completes a trivia question
function completeTrivia(email) {
  const user = users[email];
  if (!user ||!user.activated) return 'User not activated or not found';

  user.account_balance += 20;
  return 'Trivia completed, 20 bob added';
}

// User withdraws from referral balance
function withdrawReferral(email, amount) {
  const user = users[email];
  if (!user) return 'User not found';
  if (amount > user.referral_balance) return 'Insufficient referral balance';

  user.referral_balance -= amount;
  return `Withdrawal of ${amount} bob successful`;
}

// Export functions for use in a real app or API
module.exports = {
  createUser,
  activateUser,
  completeTrivia,
  withdrawReferral,
  users,
  getAdminBalance: () => admin_balance,
};


