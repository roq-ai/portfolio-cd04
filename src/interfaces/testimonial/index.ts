import { PortfolioInterface } from 'interfaces/portfolio';
import { GetQueryInterface } from 'interfaces';

export interface TestimonialInterface {
  id?: string;
  content: string;
  author: string;
  portfolio_id?: string;
  created_at?: any;
  updated_at?: any;

  portfolio?: PortfolioInterface;
  _count?: {};
}

export interface TestimonialGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  author?: string;
  portfolio_id?: string;
}
