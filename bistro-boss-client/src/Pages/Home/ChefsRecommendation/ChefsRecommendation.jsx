import SectionTitle from "../../../Components/SectionHeading/SectionTitle";
import Card from "../../../Components/Card/Card";
import img from "../../../assets/home/slide1.jpg";

const ChefsRecommendation = () => {
  return (
    <section className="max-w-[1320px] mx-auto my-12">
      <SectionTitle subHeading={"Should try"} heading={"CHEF RECOMMENDS"} />
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Card
          img={img}
          title={"Caeser Salad"}
          description={
            "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          }
          btn={"add to cart"}
        />
        <Card
          img={img}
          title={"Caeser Salad"}
          description={
            "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          }
          btn={"add to cart"}
        />
        <Card
          img={img}
          title={"Caeser Salad"}
          description={
            "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          }
          btn={"add to cart"}
        />
      </div>
    </section>
  );
};

export default ChefsRecommendation;
