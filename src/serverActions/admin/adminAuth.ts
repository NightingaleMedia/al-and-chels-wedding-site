'use server';

/**
 * Server actions for admin JWT authentication
 */

import { SignJWT, jwtVerify } from 'jose';

const ADMIN_PIN = process.env.ADMIN_PIN;
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '30d';

function getSecretKey() {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not configured');
  }
  return new TextEncoder().encode(JWT_SECRET);
}

/**
 * Verify PIN and mint a JWT token valid for 30 days
 */
export async function mintAdminToken(pin: string): Promise<{ success: boolean; token?: string; error?: string }> {
  if (!ADMIN_PIN) {
    console.error('ADMIN_PIN environment variable is not configured');
    return { success: false, error: 'Server configuration error' };
  }

  if (pin !== ADMIN_PIN) {
    return { success: false, error: 'Invalid PIN' };
  }

  try {
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(getSecretKey());

    return { success: true, token };
  } catch (error) {
    console.error('Error minting token:', error);
    return { success: false, error: 'Failed to generate token' };
  }
}

/**
 * Verify a JWT token is valid and not expired
 */
export async function verifyAdminToken(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === 'admin';
  } catch {
    // Token is invalid or expired
    return false;
  }
}
