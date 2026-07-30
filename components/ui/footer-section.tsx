'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Youtube, Twitter, Instagram, Linkedin, Phone, Mail } from 'lucide-react';
import LineSidebar from '../LineSidebar';

interface FooterLink {
	title: string;
	href: string;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Products',
		links: [
			{ title: 'Technology', href: '#' },
			{ title: 'Integrations', href: '#' },
			{ title: 'Releases', href: '#' },
			{ title: 'Status', href: '#' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '/about' },
			{ title: 'Careers', href: '#' },
			{ title: 'Blog', href: '/blog' },
			{ title: 'Contact Us', href: '#' },
		],
	},
	{
		label: 'Legal',
		links: [
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
			{ title: 'Cookie Policy', href: '#' },
			{ title: 'Security', href: '#' },
		],
	},
];

export function Footer() {
	return (
		<footer
			className="md:rounded-t-6xl relative w-full flex flex-col justify-start rounded-t-4xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 sm:px-8 pb-10"
			style={{ paddingTop: '0' }}
		>
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="w-full max-w-7xl mx-auto flex flex-col flex-1">
				{/* Middle Section */}
				<div className="flex flex-col lg:flex-row w-full justify-center gap-12 lg:gap-32 relative" style={{ paddingTop: '1.75rem', marginBottom: '0' }}>

					{/* Left CTA */}
					<AnimatedContainer delay={0.2} className="w-full lg:w-[400px] shrink-0 flex flex-col items-start pl-3 sm:pl-0">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-2 leading-tight">
							Let's build something<br />
							amazing <span className="text-[#a78bfa]">together.</span>
						</h2>
						<p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
							We partner with ambitious businesses to design, build and scale digital products that drive real impact.
						</p>

						{/* Contact Info */}
						<div className="flex flex-col w-full" style={{ marginTop: '1.25rem', gap: '1rem' }}>
							<a href="tel:8544005858" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
								<div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
									<Phone className="w-3.5 h-3.5 text-[#a78bfa]" />
								</div>
								<span className="text-xs sm:text-sm tracking-wide">8544005858</span>
							</a>
							<a href="mailto:support@devoxatechnologies.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 w-full overflow-hidden">
								<div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
									<Mail className="w-3.5 h-3.5 text-[#a78bfa]" />
								</div>
								<span className="text-xs sm:text-sm tracking-wide truncate">support@devoxatechnologies.com</span>
							</a>
						</div>
						
						{/* Social Media Icons */}
						<div className="flex text-gray-400 mt-5 gap-3 sm:gap-5">
							<a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all">
								<Youtube className="size-4" />
							</a>
							<a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all">
								<Twitter className="size-4" />
							</a>
							<a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all">
								<Instagram className="size-4" />
							</a>
							<a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all">
								<Linkedin className="size-4" />
							</a>
						</div>
					</AnimatedContainer>

					{/* Middle Links */}
					<div className="w-full lg:w-[600px] shrink-0 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 pt-4 lg:pt-2">
						{footerLinks.map((section: FooterSection, index: number) => (
							<AnimatedContainer key={section.label} delay={0.3 + index * 0.1}>
								<div className="mb-6 md:mb-0">
									<h3 className="text-white text-xs font-semibold tracking-wider uppercase flex flex-col mb-4">
										{section.label}
										<div className="w-4 h-[2px] bg-[#a78bfa]/50 mt-1.5"></div>
									</h3>
									<LineSidebar
										items={section.links.map(link => link.title)}
										accentColor="#a78bfa"
										textColor="#9ca3af"
										markerColor="#4b5563"
										showIndex={false}
										showMarker={true}
										proximityRadius={80}
										maxShift={12}
										falloff="smooth"
										markerLength={18}
										markerGap={8}
										tickScale={0.5}
										scaleTick={true}
										itemGap={12}
										fontSize={0.8}
										smoothing={100}
										defaultActive={null}
										onItemClick={(index) => {
											window.location.href = section.links[index].href;
										}}
									/>
								</div>
							</AnimatedContainer>
						))}
					</div>
				</div>

				{/* Bottom Wrapper */}
				<div className="mt-8 w-full flex flex-col relative">
					{/* Massive Watermark */}
					<AnimatedContainer delay={0.5} className="w-full flex justify-center items-center overflow-hidden pointer-events-none select-none my-2">
						<span className="text-[18vw] sm:text-[15vw] font-bold leading-[0.75] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-transparent">
							DEVOXA
						</span>
					</AnimatedContainer>

					{/* Copyright Row */}
					<AnimatedContainer delay={0.8} className="w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-2 pb-6">
						<p className="text-gray-500 text-xs sm:text-sm text-center">
							© {new Date().getFullYear()} Devoxa Technologies. All rights reserved.
						</p>
					</AnimatedContainer>
				</div>

			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
