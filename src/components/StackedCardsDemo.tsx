import { StackedCardsInteraction } from "./ui/stacked-cards-interaction"

const StackedCardsInteractionDemo = () => {
    return(
          <StackedCardsInteraction
    cards={[
      {
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=3270&auto=format&fit=crop",
        title: "Deep Cleaning Services",
        description: "Transform your home with our comprehensive deep cleaning solutions.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=3348&auto=format&fit=crop",
        title: "Eco-Friendly Products",
        description: "We use sustainable, non-toxic products safe for pets and children.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1628177142898-93e46e48dc8f?q=80&w=3270&auto=format&fit=crop",
        title: "Professional Staff",
        description: "Our certified professionals ensure top-quality service every time.",
      },
    ]}
  />
    )
}

export { StackedCardsInteractionDemo }
