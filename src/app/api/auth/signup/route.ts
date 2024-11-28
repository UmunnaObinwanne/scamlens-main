// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import Analyst from '../../../../../Models/AnalystsSchema';
import { connectToMongoDB } from '../../../../../Lib/db';

export async function POST(req: Request) {
  try {
    await connectToMongoDB();
    
    const { email, password, firstName, lastName } = await req.json();
    
    // Check if user already exists
    const existingAnalyst = await Analyst.findOne({ email });
    if (existingAnalyst) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    // Create new analyst - let the pre-save hook handle password hashing
    const analyst = await Analyst.create({
      email,
      password, // Plain password - will be hashed by pre-save hook
      firstName,
      lastName,
      role: 'user',
      status: 'pending',
      hasSubmittedForm: false
    });
    
    // Verify stored password
    const newAnalyst = await Analyst.findOne({ email });
    console.log('Registration completed:', {
      email: newAnalyst.email,
      hashedPassword: newAnalyst.password?.substring(0, 7) + '...'
    });
    
    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Error creating account' },
      { status: 500 }
    );
  }
}