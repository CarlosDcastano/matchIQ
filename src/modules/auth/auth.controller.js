import { validateRegister } from './auth.validation.js';
import { authService } from './auth.service.js';

async function registerCandidate(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    validateRegister({ email, password, confirmPassword });

    const result = await authService.register({
      email,
      password,
      role: 'candidate'
    });

    return res.status(201).json(result);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function registerCompany(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    validateRegister({ email, password, confirmPassword });

    const result = await authService.register({
      email,
      password,
      role: 'company'
    });

    return res.status(201).json(result);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const authController = {
  registerCandidate,
  registerCompany
};
