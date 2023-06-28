import { ExperienceInterface } from 'interfaces/experience';
import { ProjectInterface } from 'interfaces/project';
import { SkillInterface } from 'interfaces/skill';
import { TestimonialInterface } from 'interfaces/testimonial';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PortfolioInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  experience?: ExperienceInterface[];
  project?: ProjectInterface[];
  skill?: SkillInterface[];
  testimonial?: TestimonialInterface[];
  user?: UserInterface;
  _count?: {
    experience?: number;
    project?: number;
    skill?: number;
    testimonial?: number;
  };
}

export interface PortfolioGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
