import Link from "next/link";
import { UnlockIcon } from "../interface/icons/unlockIcon";
export default function Header() {
  return (
    <header className="p-6">
      <Link href="/">
        <UnlockIcon className="w-10" />
      </Link>
    </header>
  );
}
