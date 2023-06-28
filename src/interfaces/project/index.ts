import { PortfolioInterface } from 'interfaces/portfolio';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  portfolio_id?: string;
  created_at?: any;
  updated_at?: any;

  portfolio?: PortfolioInterface;
  _count?: {};
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  portfolio_id?: string;
}
