// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartDescriptive extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CoursePartDescriptive {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescriptive {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSubmissionSpecial extends CoursePartDescriptive {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSubmissionSpecial;
  