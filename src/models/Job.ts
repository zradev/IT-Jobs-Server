import mongoose, { Document, Schema } from "mongoose";

export interface IJob {
    title: string;
    description: string;
    tech_stack_tags: [string];
    posted_by: string;
    salary?: number;
    salary_from?: number;
    salary_to?: number;
}

export interface IJobModel extends IJob, Document {}

const JobSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech_stack_tags: { type: String, required: true },
    posted_by: { type: String, required: true },
    salary: { type: String, required: false },
    salary_from: { type: String, required: false },
    salary_to: { type: String, required: false }
});

export default mongoose.model<IJobModel>("Job", JobSchema);
