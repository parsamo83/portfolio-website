import { notFound } from "next/navigation";

// Any other path under /en or /de shows that language's 404 page.
export default function CatchAll() {
  notFound();
}
