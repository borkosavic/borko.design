export interface Project {
  title: string;
  description: string;
  image: string;
  color: string;
  slug: string;
  timeline?: string;
  technologies?: string[];
  content?: {
    about: string;
    challenge: string;
    solution: string;
    results: string;
  };
}