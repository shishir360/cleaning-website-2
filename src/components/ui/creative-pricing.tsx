import { Button } from "./button";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
    ctaLabel?: string;
    ctaHref?: string;
}

function CreativePricing({
    tag = "Simple Pricing",
    title = "Choose Your Service",
    description = "Transparent investments for elite residential cleaning",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 relative">
            <div className="text-center space-y-6 mb-16">
                <div className="font-serif text-xl text-tertiary tracking-widest uppercase rotate-[-1deg]">
                    {tag}
                </div>
                <div className="relative inline-block">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary rotate-[-1deg]">
                        {title}
                        <span className="absolute -right-10 top-0 text-tertiary rotate-12 text-3xl">✦</span>
                        <span className="absolute -left-8 bottom-0 text-secondary -rotate-12 text-2xl">◆</span>
                    </h2>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-tertiary/20 rotate-[-1deg] rounded-full blur-sm" />
                </div>
                <p className="font-light text-xl text-secondary rotate-[-1deg] pt-4">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
                {tiers.map((tier, index) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative group",
                            "transition-all duration-300",
                            "sm:rotate-[-1deg]",
                            index === 0 && "sm:rotate-[-1deg]",
                            index === 1 && "sm:rotate-[1deg]",
                            index === 2 && "sm:rotate-[-2deg]"
                        )}
                    >
                        {/* Card shadow layer */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-white",
                                "border-2 border-primary/80",
                                "rounded-2xl shadow-[4px_4px_0px_0px] shadow-primary/30",
                                "transition-all duration-300",
                                "group-hover:shadow-[8px_8px_0px_0px] group-hover:shadow-tertiary/40",
                                "group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]",
                                tier.popular && "border-tertiary"
                            )}
                        />

                        <div className="relative p-8">
                            {tier.popular && (
                                <div className="absolute -top-3 -right-3 bg-tertiary text-primary font-bold px-3 py-1 rounded-full rotate-12 text-xs border-2 border-primary uppercase tracking-widest shadow-md">
                                    Most Popular
                                </div>
                            )}

                            {/* Icon + Name */}
                            <div className="mb-6">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full mb-4",
                                        "flex items-center justify-center",
                                        "border-2 border-primary/20",
                                        "bg-primary/5 text-primary"
                                    )}
                                >
                                    {tier.icon}
                                </div>
                                <h3 className="font-serif text-2xl text-primary mb-1">{tier.name}</h3>
                                <p className="text-secondary text-sm font-light">{tier.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6 pb-6 border-b border-primary/10 flex items-end gap-2">
                                <span className="font-serif text-5xl font-bold text-primary">${tier.price}</span>
                                <span className="text-secondary text-sm font-light pb-2">/visit</span>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                {tier.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full border-2 border-primary/30 bg-tertiary/10 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-primary text-sm font-light">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <a href={tier.ctaHref || "/booking"}>
                                <Button
                                    className={cn(
                                        "w-full h-12 text-sm font-bold uppercase tracking-[0.2em] relative rounded-none",
                                        "border-2 border-primary",
                                        "transition-all duration-300",
                                        "shadow-[4px_4px_0px_0px] shadow-primary/20",
                                        "hover:shadow-[6px_6px_0px_0px] hover:shadow-tertiary/30",
                                        "hover:translate-x-[-2px] hover:translate-y-[-2px]",
                                        tier.popular
                                            ? "bg-tertiary text-primary hover:bg-tertiary/80 border-tertiary"
                                            : "bg-primary text-inverted hover:bg-primary/90"
                                    )}
                                >
                                    {tier.ctaLabel || "Acquire Service"}
                                </Button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Background decorations */}
            <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none hidden sm:block">
                <div className="absolute top-40 left-8 text-4xl rotate-12 text-tertiary/20 select-none">✦</div>
                <div className="absolute bottom-20 right-8 text-4xl -rotate-12 text-primary/10 select-none">◆</div>
            </div>
        </div>
    );
}

export { CreativePricing };
export type { PricingTier };
