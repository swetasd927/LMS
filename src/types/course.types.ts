export interface Instructor {
  id: string;
  name: string;
  title?: string;
}

export interface Lecture {
  id: string;
  title: string;
  duration: string; // "mm:ss"
  type: "video" | "article";
  isPreview?: boolean;
}

export interface CurriculumSection {
  title: string;
  lectures: Lecture[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  instructor: Instructor;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  bestseller?: boolean;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  lastUpdated: string;
  language: string;
  resourcesCount: number;
  hasCertificate: boolean;
  whatYouWillLearn: string[];
  requirements: string[];
  topics: string[];
  curriculum: CurriculumSection[];
}