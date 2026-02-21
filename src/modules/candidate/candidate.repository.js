// src/modules/candidate/candidate.repository.js
import pool from '../../config/db.js';

async function updateProfile(userId, { experience_years, seniority, english_level }) {
    const result = await pool.query(
        `UPDATE candidate_profiles
     SET experience_years = $1, seniority = $2, english_level = $3
     WHERE user_id = $4
     RETURNING *`,
        [experience_years, seniority, english_level, userId]
    );
    return result.rows[0];
}

async function getProfileByUserId(userId) {
  const result = await pool.query(
    `SELECT 
      cp.*,
      array_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name)) AS categories,
      array_agg(DISTINCT jsonb_build_object('skill_id', cs.skill_id, 'name', s.name, 'level', cs.level)) AS skills
     FROM candidate_profiles cp
     LEFT JOIN candidate_categories cc ON cc.candidate_id = cp.id
     LEFT JOIN categories c ON c.id = cc.category_id
     LEFT JOIN candidate_skills cs ON cs.candidate_id = cp.id
     LEFT JOIN skills s ON s.id = cs.skill_id
     WHERE cp.user_id = $1
     GROUP BY cp.id`,
    [userId]
  );
  return result.rows[0];
}

async function setCategories(candidateId, categoryIds) {
    // Borra las anteriores y guarda las nuevas
    await pool.query(
        'DELETE FROM candidate_categories WHERE candidate_id = $1',
        [candidateId]
    );

    for (const categoryId of categoryIds) {
        await pool.query(
            'INSERT INTO candidate_categories (candidate_id, category_id) VALUES ($1, $2)',
            [candidateId, categoryId]
        );
    }
}

async function setSkills(candidateId, skills) {
    // skills es un array de { skill_id, level }
    await pool.query(
        'DELETE FROM candidate_skills WHERE candidate_id = $1',
        [candidateId]
    );

    for (const { skill_id, level } of skills) {
        await pool.query(
            'INSERT INTO candidate_skills (candidate_id, skill_id, level) VALUES ($1, $2, $3)',
            [candidateId, skill_id, level]
        );
    }
}

export const candidateRepository = {
    updateProfile,
    getProfileByUserId,
    setCategories,
    setSkills
};