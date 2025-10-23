# Admin Access Guide

## Admin User Configuration

**Admin Email:** `Alexsouthflow@gmail.com`

### How It Works

1. **Automatic Role Assignment**: When a user logs in with Kinde, the system checks their email address
2. **Admin Access**: If the email matches `Alexsouthflow@gmail.com` (case-insensitive), they are automatically granted `ADMIN` role
3. **Customer Access**: All other users are assigned `CUSTOMER` role by default

### Admin Features

Admin users (logged in as `Alexsouthflow@gmail.com`) have access to:

- **Dashboard**: `/dashboard` - Overview with metrics, orders, and analytics
- **Products Management**: `/dashboard/products` (coming soon)
- **Orders Management**: `/dashboard/orders` (coming soon)
- **Customer Management**: `/dashboard/customers` (coming soon)
- **Analytics**: `/dashboard/analytics` (coming soon)

### How to Access

1. Go to your site: `http://localhost:3000`
2. Click **Create account** or **Sign in**
3. Use the email: `Alexsouthflow@gmail.com`
4. Complete Kinde authentication
5. Once logged in, you'll see the **Dashboard** link in the navbar
6. Click **Dashboard** to access admin features

### Adding More Admins

To add more admin users, edit `src/lib/auth.ts`:

```typescript
// Find this line:
const isAdminEmail = kindeUser.email?.toLowerCase() === "alexsouthflow@gmail.com";

// Change to:
const adminEmails = ["alexsouthflow@gmail.com", "another@email.com"];
const isAdminEmail = adminEmails.includes(kindeUser.email?.toLowerCase() ?? "");
```

### Security Notes

- Admin access is controlled at the database and API level
- Non-admin users cannot access `/dashboard` routes (they see "Access Restricted")
- The role is automatically synced on every login
- Make sure to use environment variables for production admin lists

### Database Seed

The admin user has been seeded into the database with:
- Email: `Alexsouthflow@gmail.com`
- Name: `Alex Admin`
- Role: `ADMIN`

The seed also includes:
- **Eggs Category**: A-Grade Table Eggs, Jumbo Free-Range Eggs
- **Vegetables Category**: Spinach Bunch, Rainbow Bell Peppers

Run seed again anytime with:
```bash
npm run prisma:seed
```
