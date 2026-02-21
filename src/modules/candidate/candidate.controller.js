// src/modules/candidate/candidate.controller.js
import { candidateService } from './candidate.service.js';

async function completeProfile(req, res) {
  try {
    // req.user.id viene del middleware authenticate
    const userId = req.user.id;

    const { experience_years, seniority, english_level, categories, skills } = req.body;

    if (!experience_years || !seniority || !english_level) {
      return res.status(400).json({ message: 'experience_years, seniority y english_level son obligatorios' });
    }

    const profile = await candidateService.completeProfile(userId, {
      experience_years,
      seniority,
      english_level,
      categories: categories || [],
      skills: skills || []
    });

    return res.json({ message: 'Perfil actualizado correctamente', profile });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function getMyProfile(req, res) {
  try {
    const userId = req.user.id;

    const profile = await candidateService.getMyProfile(userId);

    return res.json({ profile });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const candidateController = {
  completeProfile,
  getMyProfile
};