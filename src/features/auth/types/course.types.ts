export interface Lecture{
    id: string;
    title: string;
    description?: string;
    videoUrl: string;
    duration: string;
    type: "video" | "article";
    isPreview?: boolean;
    order: number;
}

export interface CreateLectureInput{
    title: string;
    description?: string;
    videoUrl: string;
    duration?: string;
    type: "video" | "article";
    isPreview?: boolean;
}