import { PortfolioInterface } from 'interfaces/portfolio';
import { GetQueryInterface } from 'interfaces';

export interface SkillInterface {
  id?: string;
  name: string;
  portfolio_id?: string;
  created_at?: any;
  updated_at?: any;

  portfolio?: PortfolioInterface;
  _count?: {};
}

export interface SkillGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  portfolio_id?: string;
}
