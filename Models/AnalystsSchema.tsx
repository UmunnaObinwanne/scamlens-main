// Models/AnalystsSchema.ts
import mongoose, { Document, Model } from 'mongoose';

export interface IAnalyst extends Document {
  email: string;
  firstName: string;
  lastName: string;
  kindeId: string;
  createdAt: Date;
  role: string;
  hasSubmittedForm: boolean;
  status: string;
}

const AnalystSchema = new mongoose.Schema<IAnalyst>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  kindeId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String,
    required: true,
    default: 'user'
  },
  hasSubmittedForm: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String,
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

let Analyst: Model<IAnalyst>;

try {
  // Try to get existing model
  Analyst = mongoose.model<IAnalyst>('Analyst');
} catch {
  // Create new model if it doesn't exist
  Analyst = mongoose.model<IAnalyst>('Analyst', AnalystSchema);
}

export default Analyst;