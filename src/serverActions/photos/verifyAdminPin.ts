'use server';

/**
 * Server action to verify admin PIN for moderation access
 */

export async function verifyAdminPin(pin: string): Promise<boolean> {
  const adminPin = process.env.ADMIN_PIN;
  
  if (!adminPin) {
    console.error('ADMIN_PIN environment variable is not configured');
    return false;
  }

  return pin === adminPin;
}
