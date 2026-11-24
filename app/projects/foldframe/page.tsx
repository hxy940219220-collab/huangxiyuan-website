import { permanentRedirect } from "next/navigation";

export default function FoldframeRedirectPage() {
  permanentRedirect("/projects/postpilot");
}
