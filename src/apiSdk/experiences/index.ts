import axios from 'axios';
import queryString from 'query-string';
import { ExperienceInterface, ExperienceGetQueryInterface } from 'interfaces/experience';
import { GetQueryInterface } from '../../interfaces';

export const getExperiences = async (query?: ExperienceGetQueryInterface) => {
  const response = await axios.get(`/api/experiences${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createExperience = async (experience: ExperienceInterface) => {
  const response = await axios.post('/api/experiences', experience);
  return response.data;
};

export const updateExperienceById = async (id: string, experience: ExperienceInterface) => {
  const response = await axios.put(`/api/experiences/${id}`, experience);
  return response.data;
};

export const getExperienceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/experiences/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExperienceById = async (id: string) => {
  const response = await axios.delete(`/api/experiences/${id}`);
  return response.data;
};
