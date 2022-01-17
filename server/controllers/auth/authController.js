const {
  successResponse,
  errorResponse,
  validationErrorsResponse,
} = require('../../helpers/responses');

const { cookie_max_age } = require('../../config/constants');
const { generateToken, compareHashPassword, verifyToken } = require('../../utils/auth');

const UserRepository = require('../../repositories/user/userRepository');

async function checkAuthenticated(req, res) {
  const token = req.cookies.token;
  const isTokenValid = token ? await verifyToken(token) : false;
  successResponse(res, isTokenValid);
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const isUserExist = await UserRepository.getByEmail(email);
    const isPasswordSame = isUserExist
      ? await compareHashPassword(password, isUserExist.password)
      : false;

    if (isUserExist && isPasswordSame) {
      const token = await generateToken(isUserExist);
      res.cookie('token', token, { httpOnly: true, maxAge: cookie_max_age });
      successResponse('Logged in!');
    } else {
      validationErrorsResponse(res, {
        credentials: 'Invalid username or password',
      });
    }
  } catch (err) {
    errorResponse(res, err);
  }
}

async function logout(req, res) {
  res.clearCookie('token');
  successResponse(res, 'Logged out!');
}

module.exports = {
  checkAuthenticated,
  login,
  logout,
};
