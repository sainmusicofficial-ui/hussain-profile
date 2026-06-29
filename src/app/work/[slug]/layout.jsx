import { caseStudies } from "@/data/caseStudies";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project could not be found.",
    };
  }

  const title = `${project.title} — Case Study`;
  const description = `${project.description} Services: ${project.services.join(", ")}.`;
  const url = `https://hussainkhan.co.in/work/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | Hussain Khan`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Hussain Khan`,
      description,
    },
  };
}

export default function CaseStudyLayout({ children }) {
  return children;
}
