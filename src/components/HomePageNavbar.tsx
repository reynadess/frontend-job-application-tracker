import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { Separator } from "./ui/separator";
import { HeroParallax } from "./ui/hero-parallax";


export function NavbarHome() {
  const navItems = [
    {
      name: "Features",
      link: "features",
    },
    {
      name: "Pricing",
      link: "pricing",
    },
    {
      name: "Contact",
      link: "contact",
    },
  ];
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              onClick={() => navigate("/login")}
              variant="secondary"
            >
              Login
            </NavbarButton>
            <NavbarButton onClick={() => navigate("/signup")} variant="primary">
              Signup
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => {
                  navigate("/signup");
                  setIsMobileMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
              >
                Signup
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <HeroSection />
      <Separator />
      <JobTrackerHero />
      <Separator />
      <FeaturesImageCompo/>
      <Footer />
      {/* Navbar */}
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className=" sm:flex items-center justify-center container mx-auto  max-w-7xl">
      <div className="space-y-4">
        <h1 className="font-bold">Track Every Step. Own Your Journey.</h1>
        <p className="font-semibold text-slate-500">
          Apply, interview, get offers — all in one place. Post jobs, manage
          applications, and stay in control with a smart job tracker built for
          the modern workforce.
        </p>
      </div>
      <div>
        <img src="HeroImage.png" alt=""  />
      </div>
    </div>
  );
};

const JobTrackerHero = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Smart Job Tracker
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`job.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};


 const FeaturesImageCompo = () =>  {
  return <HeroParallax products={products} />;
}

//TODO :Move this to another file cleanup
const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "job.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "job.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "job.png",
  },
 
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "job.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "job.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "jobs.png",
  },
 
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "job.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "job.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "job.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "job.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "job.png",
  },
 
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "job.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "job.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "job.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "job.png",
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo and Name */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Startup</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/login" className="hover:underline">
            Jobs
          </Link>
          <Link to="/login" className="hover:underline">
            Post Link Job
          </Link>
          <Link to="/login" className="hover:underline">
            Tracker
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} Startup. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
