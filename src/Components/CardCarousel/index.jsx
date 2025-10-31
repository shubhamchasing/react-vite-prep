import CardCarousel from "./CardCarousel";

export default function CardCarouselParent() {
  const cards = [
    { title: "Card 1", description: "Description for Card 1" },
    { title: "Card 2", description: "Description for Card 2" },
    { title: "Card 3", description: "Description for Card 3" },
  ];

  return <CardCarousel cards={cards} />;
}