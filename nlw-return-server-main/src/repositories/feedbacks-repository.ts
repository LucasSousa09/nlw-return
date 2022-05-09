export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
    user_id: string
}

export interface FeedbacksRepository{
    create: (data: FeedbackCreateData) => Promise<void>
}