export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  acceptanceCriteria: string[];
  deliverableType: "url" | "code_repo" | "document" | "design";
  deliverableValue?: string;
  status: "pending_funding" | "funded" | "in_review" | "verified" | "disputed";
  paypalOrderId?: string;
  paypalCaptureId?: string;
  verificationReport?: {
    score: number;
    passed: boolean;
    findings: string[];
    verifiedAt: string;
  };
}

export interface Contract {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  freelancerName: string;
  freelancerEmail: string;
  totalAmount: number;
  currency: string;
  status: "draft" | "active" | "completed" | "disputed";
  createdAt: string;
  milestones: Milestone[];
}
