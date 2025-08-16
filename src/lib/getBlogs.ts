export async function getBlogs() {
  const res = await fetch(`https://dev.to/api/articles?username=YOUR_USERNAME`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}
