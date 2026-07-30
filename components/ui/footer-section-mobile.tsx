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
			{ title: 'Cookie Policy', href: '/cookie' },
			{ title: 'Security', href: '/security' },
		],
	},
];

export function FooterMobile() {
	return (
		<footer
			className="relative w-full flex flex-col justify-start rounded-t-3xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] overflow-hidden"
			style={{ paddingTop: "38px", paddingBottom: "0px", paddingLeft: "20px", paddingRight: "20px" }}
		>
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="w-full max-w-2xl md:max-w-4xl mx-auto flex flex-col gap-8 px-2 sm:px-6">

				{/* Left CTA */}
				<AnimatedContainer delay={0.2} className="flex flex-col items-start sm:items-center text-left sm:text-center w-full">
					<h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight mb-3">
						Let's build something<br />
						amazing <span className="text-[#a78bfa]">together.</span>
					</h2>
					<p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-sm mb-0">
						We partner with ambitious businesses to design, build and scale digital products that drive real impact.
					</p>

					{/* Contact Info */}
					<div className="flex flex-col sm:flex-row w-full gap-4 sm:justify-center mt-5 mb-4">
						<a href="tel:8544005858" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
							<div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
								<Phone className="w-3.5 h-3.5 text-[#a78bfa]" />
							</div>
							<span className="text-xs tracking-wide">8544005858</span>
						</a>
						<a href="mailto:support@devoxatechnologies.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 w-full sm:w-auto overflow-hidden">
							<div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
								<Mail className="w-3.5 h-3.5 text-[#a78bfa]" />
							</div>
							<span className="text-xs tracking-wide truncate">support@devoxatechnologies.com</span>
						</a>
					</div>

					{/* Social Media Icons */}
					<div className="flex text-gray-400 gap-8 sm:gap-10 w-full justify-center items-center mt-4 mb-3">
						<a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all bg-white/5">
							<Youtube className="size-4" />
						</a>
						<a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all bg-white/5">
							<Twitter className="size-4" />
						</a>
						<a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all bg-white/5">
							<Instagram className="size-4" />
						</a>
						<a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-all bg-white/5">
							<Linkedin className="size-4" />
						</a>
					</div>
				</AnimatedContainer>

				{/* Middle Links Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
					{footerLinks.map((section: FooterSection, index: number) => (
						<AnimatedContainer key={section.label} delay={0.3 + index * 0.1}>
							<div>
								<h3 className="text-white text-[11px] font-semibold tracking-wider uppercase flex flex-col mb-3">
									{section.label}
									<div className="w-4 h-[2px] bg-[#a78bfa]/50 mt-1"></div>
								</h3>
								<LineSidebar
									items={section.links.map(link => link.title)}
									accentColor="#a78bfa"
									textColor="#9ca3af"
									markerColor="#4b5563"
									showIndex={false}
									showMarker={true}
									proximityRadius={60}
									maxShift={10}
									falloff="smooth"
									markerLength={16}
									markerGap={6}
									tickScale={0.5}
									scaleTick={true}
									itemGap={10}
									fontSize={0.75}
									smoothing={100}
									defaultActive={null}
									onItemClick={(index: number) => {
										window.location.href = section.links[index].href;
									}}
								/>
							</div>
						</AnimatedContainer>
					))}
				</div>

				{/* Bottom Watermark & Copyright */}
				<div className="w-full flex flex-col items-center justify-center pt-2 border-t border-white/5 pb-0">
					<AnimatedContainer delay={0.5} className="w-full flex justify-center items-center overflow-hidden pointer-events-none select-none my-1">
						<span className="text-[16vw] font-bold leading-[0.75] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-transparent">
							DEVOXA
						</span>
					</AnimatedContainer>

					<AnimatedContainer delay={0.7} className="w-full flex justify-center items-center pt-1 pb-0 mb-0">
						<p className="text-gray-500 text-[11px] text-center mb-0 pb-0">
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
	style?: React.CSSProperties;
	children: ReactNode;
};

function AnimatedContainer({ className, style, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className} style={style}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', opacity: 1 }}
			viewport={{ once: true, amount: 0.1, margin: "50px" }}
			transition={{ delay, duration: 0.8 }}
			className={className}
			style={style}
		>
			{children}
		</motion.div>
	);
}
