import { PortfolioInterface } from 'interfaces/portfolio';
import { GetQueryInterface } from 'interfaces';

export interface ExperienceInterface {
  id?: string;
  company_name: string;
  role: string;
  description?: string;
  portfolio_id?: string;
  created_at?: any;
  updated_at?: any;

  portfolio?: PortfolioInterface;
  _count?: {};
}

export interface ExperienceGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_name?: string;
  role?: string;
  description?: string;
  portfolio_id?: string;
}
