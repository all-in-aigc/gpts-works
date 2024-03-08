import { authMiddleware } from '@clerk/nextjs'

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({})

export const config = {
  matcher: ['/(dashboard)(.*)', '/api/(dashboard)(.*)'],
}
