import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save message to database
    const savedMessage = await db.message.create({
      data: {
        name,
        email,
        subject,
        message
      }
    });

    // Send email using ZAI SDK
    try {
      const zai = await ZAI.create();
      
      // Create email content
      const emailContent = `
New Contact Form Submission from WebCraft Studio Portfolio

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent on: ${new Date().toLocaleString()}
      `;

      // Send notification (you can implement actual email sending here)
      console.log('Contact form submission:', emailContent);
      
      // For now, we'll just log it. In a real implementation, you would:
      // 1. Use a service like SendGrid, Nodemailer, or Resend
      // 2. Send to: subhendugupta133@gmail.com, dipendugupta123@gmail.com
      
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({
      message: 'Message sent successfully',
      id: savedMessage.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}