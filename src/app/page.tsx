import { SiteFrame } from "@/components/layout/site-frame";
import { FoundationPreview } from "@/components/foundation-preview";
import { foundationContent as content } from "@/content/en-US/foundation";

export default function FoundationPage() {
  return (
    <SiteFrame>
      <div className="mb-9 max-w-2xl">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{content.title}</h1>
        <p className="mt-5 text-lg leading-8 text-muted">{content.description}</p>
      </div>
      <aside className="review-notice mb-8" aria-label="Review scope">
        <span className="notice-marker" aria-hidden="true" />
        <p>{content.notice}</p>
      </aside>
      <FoundationPreview />
    </SiteFrame>
  );
}
