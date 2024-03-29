import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listing = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listing.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
