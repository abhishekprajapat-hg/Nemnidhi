import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiAmazonwebservices,
  SiApple,
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiExpo,
  SiFirebase,
  SiGmail,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiRazorpay,
  SiReact,
  SiShopify,
  SiStripe,
  SiTerraform,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const stackIcons: Record<string, IconType> = {
  "AWS": SiAmazonwebservices,
  "Android": SiAndroid,
  "Cloudinary": SiCloudinary,
  "Docker": SiDocker,
  "Email": SiGmail,
  "Express": SiExpress,
  "Expo": SiExpo,
  "Firebase": SiFirebase,
  "iOS": SiApple,
  "Kubernetes": SiKubernetes,
  "LLMs": SiOpenai,
  "MongoDB": SiMongodb,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "PostgreSQL": SiPostgresql,
  "Python": SiPython,
  "RAG": SiOpenai,
  "Razorpay": SiRazorpay,
  "React": SiReact,
  "React Native": SiReact,
  "Shopify API": SiShopify,
  "Stripe": SiStripe,
  "Terraform": SiTerraform,
  "TypeScript": SiTypescript,
  "Vercel": SiVercel,
  "Vector DBs": SiMongodb,
};

type TechStackIconsProps = {
  items: string[];
  size?: "sm" | "md";
};

export default function TechStackIcons({ items, size = "sm" }: TechStackIconsProps) {
  const dimension = size === "md" ? "2.75rem" : "2.15rem";
  const iconSize = size === "md" ? "1.25rem" : "1rem";

  return (
    <div className="project-tech-icons" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
      {items.map((item) => {
        const Icon = stackIcons[item];

        if (!Icon) {
          return (
            <span key={item} className="project-tech-fallback" title={item}>
              {item.slice(0, 2).toUpperCase()}
            </span>
          );
        }

        return (
          <span
            key={item}
            className="project-tech-icon"
            title={item}
            aria-label={item}
            style={{ width: dimension, height: dimension }}
          >
            <Icon style={{ width: iconSize, height: iconSize }} aria-hidden />
          </span>
        );
      })}

      <style>{`
        .project-tech-icon,
        .project-tech-fallback {
          display: inline-grid;
          place-items: center;
          border: 1px solid var(--color-line);
          background: var(--color-bg-elevated);
          color: var(--color-text-muted);
          transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
        }

        .project-tech-icon:hover,
        .project-tech-fallback:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: rgba(103, 232, 249, 0.08);
        }

        .project-tech-fallback {
          width: 2.15rem;
          height: 2.15rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  );
}
