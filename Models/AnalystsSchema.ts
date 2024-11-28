
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAnalyst extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  role: string;
  hasSubmittedForm: boolean;
  status: string;
  comparePassword(password: string): Promise<boolean>;
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
  password: { 
    type: String,
    required: true
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

// Also modify the pre-save hook to log the hashing process
AnalystSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    console.log('Hashing new password');
    const salt = await bcrypt.genSalt(10);
    console.log('Salt generated:', salt);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (error) {
    console.error('Password hashing error:', error);
   next(error instanceof Error ? error : new Error('Unknown error during password hashing'));
  }
});

// In AnalystsSchema.ts - Let's modify just the comparePassword method
AnalystSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  try {
    console.log('Password comparison debug:', {
      enteredPassword: password,
      storedHash: this.password,
      hashStartsWith: this.password.substring(0, 7) // Should be "$2a$10$"
    });

    // Ensure we're working with strings
    const plainTextPassword = String(password);
    const storedHash = String(this.password);

    // Do the comparison
    const isMatch = await bcrypt.compare(plainTextPassword, storedHash);
    
    console.log('Comparison result:', {
      isMatch,
      enteredPassword: password,
      hashUsed: storedHash
    });

    return isMatch;
  } catch (error) {
    console.error('comparePassword error:', {
      message: error instanceof Error ? error.message : new Error ("Passwords do not match"),
      stack:  error instanceof Error ? error.stack : new Error ("Something wrong with the error stack"),
    });
    return false;
  }
};

// Safely initialize model
const Analyst = mongoose.models?.Analyst || mongoose.model<IAnalyst>('Analyst', AnalystSchema);

export default Analyst;
