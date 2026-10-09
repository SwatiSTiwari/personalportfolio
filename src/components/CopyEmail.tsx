"use client";

import Icon from "./Icon";
import { showSnackbar } from "./Snackbar";

export default function CopyEmail({ email }: { email: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          showSnackbar("Email copied to clipboard");
        } catch {
          showSnackbar(`Couldn't copy. The address is ${email}`);
        }
      }}
      className="state flex h-12 items-center gap-2 rounded-full border border-on-primary-container/30 px-6 font-medium"
    >
      <Icon name="copy" className="h-5 w-5" />
      Copy email
    </button>
  );
}
