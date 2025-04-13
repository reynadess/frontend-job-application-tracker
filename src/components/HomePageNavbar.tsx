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
import { useNavigate } from "react-router-dom";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { Separator } from "./ui/separator";


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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
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
          src={`/linear.webp`}
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
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/login" className="hover:underline">
            Jobs
          </a>
          <a href="/login" className="hover:underline">
            Post a Job
          </a>
          <a href="/login" className="hover:underline">
            Tracker
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} Startup. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
