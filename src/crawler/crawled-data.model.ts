import { Schema, model, Document } from 'mongoose';

export interface CrawledDataDocument extends Document {
  url: string;
}

const CrawledDataSchema = new Schema<CrawledDataDocument>({
  url: { type: String, required: true },
});

export const CrawledDataModel = model<CrawledDataDocument>('CrawledData', CrawledDataSchema);