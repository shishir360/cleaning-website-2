import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { Separator } from "./separator";
import { Check, Flame } from "lucide-react";

export type PricingPlan = {
  plan_name: string;
  plan_descp: string;
  plan_price: string;
  plan_feature: string[];
  popular?: boolean;
};

export const PricingCard = ({
  plan_name,
  plan_descp,
  plan_price,
  plan_feature,
  popular
}: PricingPlan) => {
  return (
    <Card className="relative h-full rounded-2xl p-8 gap-8 border-0 ring-0 bg-inverted shadow-none flex flex-col">
      <CardHeader className="p-0">
        <div className="flex flex-col gap-3 self-stretch">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-serif text-primary">
              {plan_name}
            </CardTitle>
            {popular && (
              <Badge className="py-1 px-3 text-[10px] uppercase font-bold tracking-widest leading-5 w-fit h-7 flex items-center gap-1.5 [&>svg]:size-4!">
                <Flame size={14} className="text-primary" /> Recommended
              </Badge>
            )}
          </div>
          <CardDescription className="text-base font-normal max-w-2xl text-secondary">
            {plan_descp}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-8 p-0 mt-8">
        <div className="flex items-baseline gap-1">
          <span className="text-primary text-4xl sm:text-5xl font-serif font-bold">
            {plan_price}
          </span>
          {plan_price !== "Custom" && (
            <span className="text-secondary text-sm font-medium uppercase tracking-widest">
              / base
            </span>
          )}
        </div>

        <Separator />

        <ul className="flex flex-col gap-4 flex-1">
          {plan_feature.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm font-medium text-primary/80"
            >
              <Check className="size-4 text-tertiary shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
