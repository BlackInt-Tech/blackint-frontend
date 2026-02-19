export async function getPublishedOfferings() {
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/offerings`);

    const data = await res.json();

    return data.filter(
        (item: any) =>
        item.status === "PUBLISHED" && item.isFeatured === true
    );
}

