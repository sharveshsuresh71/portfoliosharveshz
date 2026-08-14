import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Download,
  MapPin,
  Code2,
  Gauge,
  Smartphone,
  Sparkles,
  GraduationCap,
  GitBranch,
  Layers,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";
import { Parallax3D } from "@/components/Parallax3D";
import { Tilt3D } from "@/components/Tilt3D";

import { Preloader } from "@/components/Preloader";
import { Button } from "@/components/ui/button";
import { SpaceMiniGame } from "@/components/SpaceMiniGame";

// Local Vercel-safe assets (no Lovable __l5e URLs).
const blackholeImg = "/blackhole-cinematic.jpg";
const starfieldImg = "/galaxy.jpg";
const mountainsImg = "/mountains.jpg";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sharvesh Suresh — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Sharvesh Suresh (Shark Coding) — aspiring full-stack developer building resilient, minimal, fast web experiences.",
      },
      { property: "og:title", content: "Sharvesh Suresh — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Projects, skills and learning journey of Sharvesh Suresh, an aspiring full-stack developer from India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const STACK = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "MongoDB",
  "Tailwind",
  "Git",
  "GitHub",
  "Docker",
];

const SKILLS = [
  { n: "01", name: "HTML5", note: "Semantic structure" },
  { n: "02", name: "CSS3", note: "Layout & motion" },
  { n: "03", name: "JavaScript", note: "Logic & interaction" },
  { n: "04", name: "Responsive Design", note: "Every screen size" },
  { n: "05", name: "Git", note: "Versioned workflows" },
  { n: "06", name: "GitHub", note: "Public presence" },
];

const TRAITS = [
  { icon: Code2, title: "Clean Code", note: "Quality over quantity" },
  { icon: Gauge, title: "Performance", note: "Optimized for speed" },
  { icon: Smartphone, title: "Responsive", note: "Perfect on any device" },
  { icon: Sparkles, title: "Always Learning", note: "Exploring new tech" },
];

const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    desc: "A modern, responsive portfolio built to showcase my skills, projects, and contact info.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Calculator App",
    desc: "A clean, functional calculator supporting basic arithmetic operations with a friendly UI.",
    tags: ["JavaScript", "CSS"],
  },
  {
    title: "To-Do List",
    desc: "A task manager with add, complete, and delete features and local persistence.",
    tags: ["JavaScript", "localStorage"],
  },
  {
    title: "Weather App",
    desc: "A weather application that fetches live data from an API and displays current conditions.",
    tags: ["API", "JavaScript"],
  },
];

const JOURNEY = [
  {
    icon: GraduationCap,
    title: "B.Tech Information Technology",
    stage: "Starting point",
    desc: "Began my studies in core computer science, programming fundamentals, and modern web technologies.",
  },
  {
    icon: Code2,
    title: "Front-End Fundamentals",
    stage: "Learning the basics",
    desc: "Mastered HTML5, CSS3, and JavaScript — building clean, responsive, accessible user interfaces.",
  },
  {
    icon: Layers,
    title: "Responsive Web Apps",
    stage: "Hands-on projects",
    desc: "Crafted small but real projects: landing pages, calculators, and interactive UI components.",
  },
  {
    icon: GitBranch,
    title: "Version Control & GitHub",
    stage: "In progress",
    desc: "Learning Git workflows and pushing work to GitHub to grow a public developer presence.",
  },
  {
    icon: Rocket,
    title: "Currently Exploring",
    stage: "Next steps",
    desc: "Moving toward React, Node.js, and full-stack development as I continue growing each day.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function Index() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [intro, setIntro] = useState(true);

  return (
    <div className="relative min-h-screen">
      {intro && <Preloader onDone={() => setIntro(false)} />}


      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-border/70 bg-background/60 px-5 py-3 backdrop-blur-xl">
          <a href="#home" className="font-mono text-xs tracking-[0.3em] text-foreground uppercase">
            SHARK<span className="text-primary">/</span>CODING
          </a>
          <ul className="hidden items-center gap-7 md:flex">
            {NAV.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full border border-primary/50 px-4 py-1.5 font-mono text-[11px] tracking-widest text-primary uppercase transition-colors hover:bg-primary/10"
          >
            Hire me
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-32 pb-20"
      >
        <Parallax3D
          src={blackholeImg}
          alt="Black hole with a glowing accretion disk"
          strength={16}
          className="absolute inset-0 -z-[1]"
          imgClassName="object-cover opacity-70 mix-blend-screen [mask-image:radial-gradient(120%_90%_at_70%_50%,#000_35%,transparent_75%)]"
        />



        <div className="relative max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <MapPin className="size-3.5 text-primary" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase">Based in India</span>
          </div>
          <SectionLabel>Full Stack Developer</SectionLabel>
          <h1 className="mt-4 text-5xl leading-[0.95] font-semibold sm:text-7xl">
            <span className="text-gradient">Sharvesh</span>
            <br />
            Suresh
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Building resilient digital systems with a focus on engineering excellence and minimalist
            aesthetics — working at the intersection of code and design.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="glow-ember rounded-full">
              <a href="#projects">Explore my work</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#resume">
                Download resume <Download className="ml-1 size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:sharveshsuresh71@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mt-16 grid max-w-2xl grid-cols-3 gap-4">
          {[
            ["Fresher", "Developer level"],
            ["50+", "Projects completed"],
            ["10+", "Technologies"],
          ].map(([v, l]) => (
            <Tilt3D key={l} max={12} lift={16}>
              <div className="panel h-full px-5 py-4">
                <p className="font-display text-2xl">{v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{l}</p>
              </div>
            </Tilt3D>
          ))}

        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-28">
        <SectionLabel>About me</SectionLabel>
        <div className="mt-4 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="max-w-lg text-4xl leading-tight font-semibold sm:text-5xl">
              Crafting solutions, <span className="text-gradient">building impact</span>
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              I&apos;m Sharvesh Suresh — an aspiring full-stack developer who loves turning ideas
              into real, functional products. I focus on clean architecture, fast performance, and
              delightful user experiences.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Whether it&apos;s a responsive web app, a game project, or learning a new framework,
              I&apos;m always up for the challenge and growing a little every single day.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {TRAITS.map(({ icon: Icon, title, note }) => (
              <Tilt3D key={title} max={10} lift={20}>
                <div className="panel h-full p-6">
                  <Icon className="size-5 text-primary" />
                  <p className="mt-4 font-display text-lg">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{note}</p>
                </div>
              </Tilt3D>
            ))}

          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
        <Parallax3D
          src={starfieldImg}
          alt="Deep blue starfield nebula"
          strength={8}
          className="absolute inset-0 -z-[1]"
          imgClassName="object-cover opacity-35 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]"
        />

        <SectionLabel>Skills</SectionLabel>
        <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">What I work with</h2>
        <div className="mt-12 divide-y divide-border border-y border-border [perspective:1200px]">
          {SKILLS.map((s) => (
            <div
              key={s.n}
              className="group flex items-center gap-6 py-6 transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(-6deg)_translateZ(24px)]"
            >
              <span className="font-mono text-xs text-primary/70">{s.n}</span>
              <span className="font-display text-2xl transition-transform group-hover:translate-x-2 sm:text-3xl">
                {s.name}
              </span>
              <span className="ml-auto text-sm text-muted-foreground">{s.note}</span>
            </div>
          ))}
        </div>

      </section>

      {/* Page 5 — playable space mini game */}
      <SpaceMiniGame />

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Projects</SectionLabel>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Some things I&apos;ve built</h2>
          </div>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs tracking-widest text-primary uppercase"
          >
            View all projects <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <Tilt3D key={p.title} max={8} lift={26}>
              <article className="panel group relative h-full overflow-hidden p-7">
                <div
                  className="absolute -top-24 -right-24 size-52 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: "var(--gradient-disk)" }}
                />
                <div className="relative flex items-center justify-between [transform:translateZ(28px)]">
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
                    <span className="size-1.5 rounded-full bg-primary" /> Live
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="relative mt-6 font-display text-2xl [transform:translateZ(38px)]">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-sm text-muted-foreground [transform:translateZ(20px)]">
                  {p.desc}
                </p>
                <div className="relative mt-6 flex flex-wrap gap-2 [transform:translateZ(26px)]">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="relative mt-6 flex gap-3 [transform:translateZ(18px)]">
                  <Button size="sm" variant="secondary" className="rounded-full" asChild>
                    <a href="https://github.com/" target="_blank" rel="noreferrer">
                      Code
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-full" asChild>
                    <a href="https://github.com/" target="_blank" rel="noreferrer">
                      Demo
                    </a>
                  </Button>
                </div>
              </article>
            </Tilt3D>
          ))}

        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28">
        <Parallax3D
          src={mountainsImg}
          alt="Pixel art mountains reflected in a still lake"
          strength={12}
          className="absolute inset-x-0 bottom-0 -z-[1] h-[28rem]"
          imgClassName="object-cover opacity-25 [mask-image:linear-gradient(to_top,#000,transparent_90%)]"
        />

        <SectionLabel>Experience</SectionLabel>
        <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">My learning journey</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          I&apos;m a fresher — no formal job experience yet — but here&apos;s how I got started and
          where I&apos;m headed.
        </p>

        <ol className="relative mt-14 border-l border-border pl-8">
          {JOURNEY.map(({ icon: Icon, title, stage, desc }) => (
            <li key={title} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[2.6rem] flex size-9 items-center justify-center rounded-full border border-primary/40 bg-background">
                <Icon className="size-4 text-primary" />
              </span>
              <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                {stage}
              </p>
              <h3 className="mt-2 font-display text-xl">{title}</h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Resume */}
      <section id="resume" className="mx-auto max-w-6xl px-6 py-16">
        <Tilt3D max={5} lift={18}>
          <div className="panel relative overflow-hidden px-8 py-14 text-center">
            <Parallax3D
              src={blackholeImg}
              alt="Black hole accretion disk"
              strength={9}
              className="absolute inset-0"
              imgClassName="object-cover opacity-25 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]"
            />

            <div className="relative [transform:translateZ(30px)]">
              <SectionLabel>Resume</SectionLabel>
              <h2 className="mt-4 text-4xl font-semibold">Grab my resume</h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
                A quick summary of my skills, projects, and experience — one click away.
              </p>
              <Button
                size="lg"
                className="glow-ember mt-8 rounded-full"
                onClick={() =>
                  toast("Resume download coming soon", {
                    description: "Hook this up to your PDF file.",
                  })
                }
              >
                Download resume <Download className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </Tilt3D>
      </section>


      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
        <Parallax3D
          src={blackholeImg}
          alt="Decorative black hole"
          strength={14}
          className="absolute -top-10 right-0 -z-[1] h-[38rem] w-[26rem]"
          imgClassName="object-contain opacity-30 mix-blend-screen [mask-image:radial-gradient(circle,#000,transparent_70%)]"
        />

        <SectionLabel>Contact</SectionLabel>
        <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Let&apos;s connect</h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Have a question, opportunity, or just want to say hi? Drop me a message.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            {[
              ["Full name", "Sharvesh Suresh"],
              ["Email address", "sharveshsuresh71@gmail.com"],
              ["Location", "India"],
              ["Tagline", "Coder · Web Developer · Junior Game Developer"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-border pb-4">
                <p className="eyebrow">{k}</p>
                <p className="mt-2 text-sm">{v}</p>
              </div>
            ))}
          </div>

          <form
            className="panel space-y-5 p-7"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message ready to send", {
                description: "Connect a backend to deliver it to your inbox.",
              });
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="eyebrow" htmlFor="name">
                  Full name
                </label>
                <Input
                  id="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="eyebrow" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <label className="eyebrow" htmlFor="subject">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="What's this about?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <label className="eyebrow" htmlFor="message">
                Message
              </label>
              <Textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me more..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full">
                Send message
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full"
                onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl">Sharvesh Suresh</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Shark Coding — aspiring software developer building the web, one project at a time.
            </p>
          </div>
          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 space-y-2">
              {NAV.slice(0, 4).map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Connect</p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Github, href: "https://github.com/", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:sharveshsuresh71@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="border-t border-border py-6 text-center font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          © 2026 Sharvesh Suresh · Shark Coding
        </p>
      </footer>
    </div>
  );
}
