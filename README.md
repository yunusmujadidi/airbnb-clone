# RentSpace - Property Rental Platform

⚠️ Disclaimer: This is a personal portfolio project built for educational purposes.

This project is a property rental platform built with Next.js, TypeScript, and Prisma. It features user authentication, property listings, reservations, a map interface, and a filter search functionality using URL parameters.

## Features

- User authentication (Email/Password, Google, GitHub)
- Property listings with detailed information
- Reservation system with date range selection
- Interactive map for property locations using React Leaflet
- Favorite listings functionality
- Responsive design for mobile and desktop
- Filter search using URL parameters for efficient querying
- Server Actions for optimized server-side operations
- Image upload and management with Cloudinary
- Real-time updates using React Server Components

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) with MongoDB
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Zod](https://github.com/colinhacks/zod) for schema validation
- [React Leaflet](https://react-leaflet.js.org/) for maps
- [Cloudinary](https://cloudinary.com/) for image uploads
- [Zustand](https://github.com/pmndrs/zustand) for state management

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/yunusmujadidi/rentspace
   cd rentspace
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in the required variables

4. Set up the database:

   ```
   pnpm prisma db push
   ```

5. Run the development server:

   ```
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/`: Next.js app router and page components
- `components/`: Reusable React components
- `lib/`: Utility functions, custom hooks, and server actions
- `prisma/`: Prisma schema and database configuration
- `public/`: Static assets
- `styles/`: Global styles and Tailwind CSS configuration

## Key Components

- `components/navbar/`: Navigation and search components
- `components/modals/`: Modals for login, registration, and listing creation
- `components/listings/`: Listing card and details components
- `lib/actions/`: Server actions for data operations
- `app/(routes)/`: Page components for different routes

## Server Actions

Server actions in `lib/actions/` handle server-side operations:

- User authentication and profile management
- Listing creation, update, and deletion
- Reservation booking and management
- Favorite listing toggling

## Database Schema

The MongoDB database uses the following main models:

- User: Stores user information and authentication details
- Listing: Contains property listing information
- Reservation: Manages booking data

Refer to `prisma/schema.prisma` for the complete schema definition.

## Environment Variables

This project uses several environment variables for configuration. Create a `.env` file in the root directory and add the following variables:

```
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# Authentication
AUTH_GITHUB_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_client_secret"
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"
AUTH_SECRET="your_auth_secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
```

Replace the placeholder values with your actual credentials:

- `DATABASE_URL`: Your MongoDB connection string
- `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`: GitHub OAuth credentials
- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`: Google OAuth credentials
- `AUTH_SECRET`: A secret key for NextAuth.js (you can generate one using `openssl rand -base64 32`)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name for image uploads

**Note:** Never commit your `.env` file to version control. Add it to your `.gitignore` file to keep your secrets safe.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). Follow these steps:

1. Push your code to a GitHub repository
2. Create a new project on Vercel and import your repository
3. Configure environment variables in Vercel's project settings
4. Deploy the project

### Handling Prisma Client Generation on Vercel

To ensure Prisma Client is properly generated on each deployment and avoid caching issues, add the following to your `package.json`:

```
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && next build"
  }
}
```

Alternatively, update the Build Command in Vercel's UI settings to include `prisma generate`.

For more information on addressing Vercel caching issues with Prisma, refer to the [Prisma documentation](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/vercel-caching-issue).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
