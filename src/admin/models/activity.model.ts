export interface ActivityModel {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  publicId: string;
}

export interface EventModel {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  activityId?: string;
  imageUrl?: string;
  publicId?: string;
}
