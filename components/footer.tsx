import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { categories } from "@/lib/products-data"

const footerLinks = {
  categories: categories.slice(0, 5).map((cat) => ({
    label: cat.name,
    href: `/kategorije/${cat.id}`,
    icon: cat.icon,
  })),
  company: [
    { label: "O Nama", href: "/o-nama" },
    { label: "Kako Funkcionira", href: "/kako-funkcionira" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Uvjeti Korištenja", href: "/uvjeti-koristenja" },
    { label: "Politika Privatnosti", href: "/politika-privatnosti" },
    { label: "Politika Povrata", href: "/politika-povrata" },
    { label: "GDPR", href: "/gdpr" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand - Updated brand name to mystery.hr */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image src="/mystery-hr-logo.png" alt="mystery.hr" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              Premium mystery boxovi s ekskluzivnim proizvodima. mystery.hr - tvoja destinacija za iznenađenja.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 font-medium text-foreground">Kategorije</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/kategorije"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sve kategorije →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 font-medium text-foreground">Tvrtka</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 font-medium text-foreground">Pravne Informacije</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Company Info - Updated with correct OIB and address */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary" />
                qube d.o.o., Ulica Josipa Huttlera 34, 31000 Osijek, Hrvatska
              </span>
              <span>OIB: 05419427342</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:qube.reach@gmail.com"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Mail className="h-3 w-3" />
                qube.reach@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - Updated to mystery.hr and qube d.o.o. */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-xs text-muted-foreground">
            © 2025 mystery.hr | qube d.o.o. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
