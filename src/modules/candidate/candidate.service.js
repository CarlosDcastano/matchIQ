// src/modules/candidate/candidate.service.js
import { candidateRepository } from './candidate.repository.js';

async function completeProfile(userId, { experience_years, seniority, english_level, categories, skills }) {
  // 1. Actualizar datos básicos del perfil
  const profile = await candidateRepository.updateProfile(userId, {
    experience_years,
    seniority,
    english_level
  });

  if (!profile) {
    throw new Error('Perfil no encontrado');
  }

  // 2. Guardar categorías si vienen
  if (categories && categories.length > 0) {
    await candidateRepository.setCategories(profile.id, categories);
  }

  // 3. Guardar skills si vienen
  if (skills && skills.length > 0) {
    await candidateRepository.setSkills(profile.id, skills);
  }

  // 4. Retornar perfil completo actualizado
  const updatedProfile = await candidateRepository.getProfileByUserId(userId);
  return updatedProfile;
}

async function getMyProfile(userId) {
  const profile = await candidateRepository.getProfileByUserId(userId);

  if (!profile) {
    throw new Error('Perfil no encontrado');
  }

  return profile;
}

export const candidateService = {
  completeProfile,
  getMyProfile
};