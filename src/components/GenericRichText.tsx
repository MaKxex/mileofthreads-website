import SectionHeader from "./ui/SectionHeader";
import RichText from "./ui/RichText";
import "@/app/[locale]/globals.css";
export default function GenericRichText(data: any) {

  return (
    <section>
      <SectionHeader title={data.sectionHeader} />
      <div className="prose prose-stone max-w-6xl dark:prose-invert lg:prose-lg my-10 mx-auto">
        <RichText content={data.richText} />
      </div>
    </section>
  );
}