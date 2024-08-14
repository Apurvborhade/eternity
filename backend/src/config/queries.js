//* User Quesries
export const registerUserQuery = "INSERT INTO users (username,email,password_hash,roles) VALUES ($1,$2,$3,$4) RETURNING *;"
export const checkUsernameAlreadyExists = "SELECT u FROM users u WHERE u.username = $1"
export const checkEmailAlreadyExists = "SELECT u FROM users u WHERE u.email = $1"
export const getUserByEmail = "SELECT * FROM users  WHERE email = $1"