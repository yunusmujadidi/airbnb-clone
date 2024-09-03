# Airbnb Clone

This project is an Airbnb clone built with Next.js, TypeScript, and Prisma. It features user authentication, property listings, reservations, and a map interface.

## Features

- User authentication (Email/Password, Google, GitHub)
- Property listings with detailed information
- Reservation system
- Interactive map for property locations
- Favorite listings functionality
- Responsive design

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

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables in a `.env` file (see `.env.example` for required variables)
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/`: Next.js app router and page components
- `components/`: Reusable React components
- `lib/`: Utility functions and custom hooks
- `prisma/`: Prisma schema and database configuration

## Key Components

- User Authentication (auth.ts)
- Listing Modal (components/modals/listingmodal.tsx)
- Reservation Client (app/trips/reservationclient.tsx)

## API Routes

- Reservations (app/api/reservations/route.ts)

## Database Schema

The project uses a MongoDB database with Prisma ORM. The main models include User, Listing, and Reservation.

## Deployment

This project is designed to be easily deployed on [Vercel](https://vercel.com/). Follow their documentation for deploying Next.js applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
