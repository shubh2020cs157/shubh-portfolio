export type ReviewStatus = "pending" | "approved";

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  message: string;
  linkedin?: string;
  rating: number;
  status: ReviewStatus;
  createdAt: number;
  approvedAt?: number;
  googleVerified?: boolean;
}
