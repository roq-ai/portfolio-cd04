import axios from 'axios';
import queryString from 'query-string';
import { TestimonialInterface, TestimonialGetQueryInterface } from 'interfaces/testimonial';
import { GetQueryInterface } from '../../interfaces';

export const getTestimonials = async (query?: TestimonialGetQueryInterface) => {
  const response = await axios.get(`/api/testimonials${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTestimonial = async (testimonial: TestimonialInterface) => {
  const response = await axios.post('/api/testimonials', testimonial);
  return response.data;
};

export const updateTestimonialById = async (id: string, testimonial: TestimonialInterface) => {
  const response = await axios.put(`/api/testimonials/${id}`, testimonial);
  return response.data;
};

export const getTestimonialById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/testimonials/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTestimonialById = async (id: string) => {
  const response = await axios.delete(`/api/testimonials/${id}`);
  return response.data;
};
